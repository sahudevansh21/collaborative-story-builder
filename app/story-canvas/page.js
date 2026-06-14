"use client";

import { useState, useEffect, useRef } from 'react';

export default function StoryCanvasPage() {
  const [elements, setElements] = useState([]);
  const [newElementType, setNewElementType] = useState('plot');
  const [newElementTitle, setNewElementTitle] = useState('');
  const [newElementDescription, setNewElementDescription] = useState('');
  const [draggingId, setDraggingId] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Load elements from local storage on mount
    const savedElements = localStorage.getItem('storyCanvasElements');
    if (savedElements) {
      setElements(JSON.parse(savedElements));
    }
  }, []);

  useEffect(() => {
    // Save elements to local storage whenever they change
    localStorage.setItem('storyCanvasElements', JSON.stringify(elements));
  }, [elements]);

  const addElement = () => {
    if (!newElementTitle.trim()) return;

    const newElement = {
      id: Date.now().toString(),
      type: newElementType,
      title: newElementTitle.trim(),
      description: newElementDescription.trim(),
      x: 50 + Math.random() * 100, // Initial random position
      y: 50 + Math.random() * 100,
    };
    setElements((prev) => [...prev, newElement]);
    setNewElementTitle('');
    setNewElementDescription('');
  };

  const handleMouseDown = (e, id) => {
    setDraggingId(id);
    const element = elements.find((el) => el.id === id);
    const offsetX = e.clientX - element.x;
    const offsetY = e.clientY - element.y;

    const handleMouseMove = (event) => {
      if (draggingId === id) {
        let newX = event.clientX - offsetX;
        let newY = event.clientY - offsetY;

        // Keep element within canvas bounds
        if (canvasRef.current) {
          const canvasRect = canvasRef.current.getBoundingClientRect();
          const elementDiv = document.getElementById(`element-${id}`);
          if (elementDiv) {
            const elementRect = elementDiv.getBoundingClientRect();
            newX = Math.max(0, Math.min(newX, canvasRect.width - elementRect.width));
            newY = Math.max(0, Math.min(newY, canvasRect.height - elementRect.height));
          }
        }

        setElements((prev) =>
          prev.map((el) =>
            el.id === id ? { ...el, x: newX, y: newY } : el
          )
        );
      }
    };

    const handleMouseUp = () => {
      setDraggingId(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const deleteElement = (id) => {
    setElements((prev) => prev.filter(el => el.id !== id));
  };

  return (
    <div className="container">
      <h1 style={{ color: 'var(--text-light)', textAlign: 'center', marginBottom: '2rem' }}>Story Canvas</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Drag and drop elements to build your story visually.
      </p>

      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--accent-purple)', marginBottom: '1rem' }}>Add New Element</h3>
        <div className="flex-group" style={{ alignItems: 'flex-end' }}>
          <div style={{ flex: '1' }}>
            <label htmlFor="elementType" style={{ display: 'block', marginBottom: '0.5rem' }}>Type</label>
            <select
              id="elementType"
              className="glass-select"
              value={newElementType}
              onChange={(e) => setNewElementType(e.target.value)}
            >
              <option value="plot">Plot Point</option>
              <option value="character">Character</option>
              <option value="setting">Setting</option>
              <option value="item">Key Item</option>
            </select>
          </div>
          <div style={{ flex: '2' }}>
            <label htmlFor="elementTitle" style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
            <input
              id="elementTitle"
              type="text"
              className="glass-input"
              value={newElementTitle}
              onChange={(e) => setNewElementTitle(e.target.value)}
              placeholder="e.g., Hero Meets Mentor, Magic Sword"
            />
          </div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="elementDescription" style={{ display: 'block', marginBottom: '0.5rem' }}>Description (Optional)</label>
          <textarea
            id="elementDescription"
            className="glass-textarea"
            value={newElementDescription}
            onChange={(e) => setNewElementDescription(e.target.value)}
            placeholder="Brief description of this element"
            rows="3"
          ></textarea>
        </div>
        <button className="glass-button" onClick={addElement} style={{ marginTop: '1.5rem', width: '100%' }}>
          Add Element
        </button>
      </div>

      <div ref={canvasRef} className="canvas-container">
        {elements.map((el) => (
          <div
            key={el.id}
            id={`element-${el.id}`}
            className="story-element"
            style={{ left: el.x, top: el.y }}
            onMouseDown={(e) => handleMouseDown(e, el.id)}
            onDoubleClick={() => deleteElement(el.id)} // Example of interaction: double click to delete
          >
            <h4 style={{ color: el.type === 'character' ? 'var(--accent-purple)' : el.type === 'setting' ? 'var(--accent-blue)' : 'var(--text-light)' }}>
              {el.title}
            </h4>
            {el.description && <p>{el.description}</p>}
            <small style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>({el.type})</small>
            <span
              style={{
                position: 'absolute',
                top: '5px',
                right: '8px',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.8rem',
                zIndex: 11
              }}
              onClick={(e) => { e.stopPropagation(); deleteElement(el.id); }}
              title="Delete element"
            >
              &#x2715;
            </span>
          </div>
        ))}
        {elements.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            Your canvas is empty. Add your first story element above!
          </p>
        )}
      </div>
    </div>
  );
}
