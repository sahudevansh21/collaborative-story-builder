"use client";

import { useState, useEffect } from 'react';

export default function PlotlineOverviewPage() {
  const [plotPoints, setPlotPoints] = useState([]);
  const [newPlotTitle, setNewPlotTitle] = useState('');
  const [newPlotDescription, setNewPlotDescription] = useState('');
  const [editingPlotId, setEditingPlotId] = useState(null);

  useEffect(() => {
    const savedPlotPoints = localStorage.getItem('storyPlotPoints');
    if (savedPlotPoints) {
      setPlotPoints(JSON.parse(savedPlotPoints));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('storyPlotPoints', JSON.stringify(plotPoints));
  }, [plotPoints]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPlotTitle.trim()) return;

    if (editingPlotId) {
      setPlotPoints(prevPlots =>
        prevPlots.map(plot =>
          plot.id === editingPlotId
            ? { ...plot, title: newPlotTitle.trim(), description: newPlotDescription.trim() }
            : plot
        )
      );
      setEditingPlotId(null);
    } else {
      const newPlot = {
        id: Date.now().toString(),
        title: newPlotTitle.trim(),
        description: newPlotDescription.trim(),
        order: plotPoints.length + 1, // Simple ordering
      };
      setPlotPoints((prev) => [...prev, newPlot]);
    }
    setNewPlotTitle('');
    setNewPlotDescription('');
  };

  const handleEdit = (plot) => {
    setEditingPlotId(plot.id);
    setNewPlotTitle(plot.title);
    setNewPlotDescription(plot.description);
  };

  const handleDelete = (id) => {
    setPlotPoints((prev) => prev.filter((plot) => plot.id !== id));
  };

  // Reorder plot points (simple up/down)
  const movePlotPoint = (id, direction) => {
    const index = plotPoints.findIndex(p => p.id === id);
    if (index === -1) return;

    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= plotPoints.length) return;

    const updatedPlots = [...plotPoints];
    const [movedPlot] = updatedPlots.splice(index, 1);
    updatedPlots.splice(newIndex, 0, movedPlot);

    // Update order property (optional, but good for display)
    const finalPlots = updatedPlots.map((plot, i) => ({ ...plot, order: i + 1 }));

    setPlotPoints(finalPlots);
  };

  return (
    <div className="container">
      <h1 style={{ color: 'var(--text-light)', textAlign: 'center', marginBottom: '2rem' }}>Plotline Overview</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Organize and sequence the key events of your story.
      </p>

      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--accent-purple)', marginBottom: '1rem' }}>{editingPlotId ? 'Edit Plot Point' : 'Add New Plot Point'}</h3>
        <form onSubmit={handleSubmit} className="flex-group" style={{ flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="plotTitle" style={{ display: 'block', marginBottom: '0.5rem' }}>Plot Point Title</label>
            <input
              id="plotTitle"
              type="text"
              className="glass-input"
              value={newPlotTitle}
              onChange={(e) => setNewPlotTitle(e.target.value)}
              placeholder="e.g., Inciting Incident, Climax, Resolution"
              required
            />
          </div>
          <div>
            <label htmlFor="plotDescription" style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
            <textarea
              id="plotDescription"
              className="glass-textarea"
              value={newPlotDescription}
              onChange={(e) => setNewPlotDescription(e.target.value)}
              placeholder="What happens in this plot point? How does it advance the story?"
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="glass-button" style={{ width: '100%' }}>
            {editingPlotId ? 'Update Plot Point' : 'Add Plot Point'}
          </button>
          {editingPlotId && (
            <button
              type="button"
              className="glass-button"
              onClick={() => {
                setEditingPlotId(null);
                setNewPlotTitle('');
                setNewPlotDescription('');
              }}
              style={{ background: 'linear-gradient(45deg, #d92828, #e00000)', marginTop: '0.5rem', width: '100%' }}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <div className="flex-group" style={{ flexDirection: 'column' }}>
        {plotPoints.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            No plot points added yet. Start outlining your story arc!
          </p>
        ) : (
          plotPoints.map((plot, index) => (
            <div key={plot.id} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
              <div style={{
                background: 'var(--accent-gradient)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: 'white'
              }}>
                {plot.order}
              </div>
              <div style={{ flexGrow: 1 }}>
                <h3 style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>{plot.title}</h3>
                <p>{plot.description}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
                <button
                  className="glass-button"
                  onClick={() => movePlotPoint(plot.id, -1)}
                  disabled={index === 0}
                  style={{ background: 'linear-gradient(45deg, #5c28d9, #4a00e0)', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                >
                  &#x25B2; {/* Up arrow */}
                </button>
                <button
                  className="glass-button"
                  onClick={() => movePlotPoint(plot.id, 1)}
                  disabled={index === plotPoints.length - 1}
                  style={{ background: 'linear-gradient(45deg, #5c28d9, #4a00e0)', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                >
                  &#x25BC; {/* Down arrow */}
                </button>
                <button
                  className="glass-button"
                  onClick={() => handleEdit(plot)}
                  style={{ background: 'linear-gradient(45deg, #00bcd4, #0097a7)', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                >
                  Edit
                </button>
                <button
                  className="glass-button"
                  onClick={() => handleDelete(plot.id)}
                  style={{ background: 'linear-gradient(45deg, #e00000, #c62828)', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
