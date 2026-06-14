"use client";

import { useState, useEffect } from 'react';

export default function CharacterEditorPage() {
  const [characters, setCharacters] = useState([]);
  const [newCharacterName, setNewCharacterName] = useState('');
  const [newCharacterDescription, setNewCharacterDescription] = useState('');
  const [newCharacterRole, setNewCharacterRole] = useState('');
  const [editingCharId, setEditingCharId] = useState(null);

  useEffect(() => {
    const savedCharacters = localStorage.getItem('storyCharacters');
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('storyCharacters', JSON.stringify(characters));
  }, [characters]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCharacterName.trim()) return;

    if (editingCharId) {
      // Update existing character
      setCharacters(prevChars =>
        prevChars.map(char =>
          char.id === editingCharId
            ? { ...char, name: newCharacterName.trim(), description: newCharacterDescription.trim(), role: newCharacterRole.trim() }
            : char
        )
      );
      setEditingCharId(null);
    } else {
      // Add new character
      const newChar = {
        id: Date.now().toString(),
        name: newCharacterName.trim(),
        description: newCharacterDescription.trim(),
        role: newCharacterRole.trim(),
      };
      setCharacters((prev) => [...prev, newChar]);
    }
    setNewCharacterName('');
    setNewCharacterDescription('');
    setNewCharacterRole('');
  };

  const handleEdit = (char) => {
    setEditingCharId(char.id);
    setNewCharacterName(char.name);
    setNewCharacterDescription(char.description);
    setNewCharacterRole(char.role);
  };

  const handleDelete = (id) => {
    setCharacters((prev) => prev.filter((char) => char.id !== id));
  };

  return (
    <div className="container">
      <h1 style={{ color: 'var(--text-light)', textAlign: 'center', marginBottom: '2rem' }}>Character Editor</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Create and manage your story's cast of characters.
      </p>

      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--accent-blue)', marginBottom: '1rem' }}>{editingCharId ? 'Edit Character' : 'Add New Character'}</h3>
        <form onSubmit={handleSubmit} className="flex-group" style={{ flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="charName" style={{ display: 'block', marginBottom: '0.5rem' }}>Character Name</label>
            <input
              id="charName"
              type="text"
              className="glass-input"
              value={newCharacterName}
              onChange={(e) => setNewCharacterName(e.target.value)}
              placeholder="e.g., Elara, The Whispering Sorceress"
              required
            />
          </div>
          <div>
            <label htmlFor="charRole" style={{ display: 'block', marginBottom: '0.5rem' }}>Role</label>
            <input
              id="charRole"
              type="text"
              className="glass-input"
              value={newCharacterRole}
              onChange={(e) => setNewCharacterRole(e.target.value)}
              placeholder="e.g., Protagonist, Antagonist, Mentor"
            />
          </div>
          <div>
            <label htmlFor="charDescription" style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
            <textarea
              id="charDescription"
              className="glass-textarea"
              value={newCharacterDescription}
              onChange={(e) => setNewCharacterDescription(e.target.value)}
              placeholder="A brief background, personality traits, and motivations."
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="glass-button" style={{ width: '100%' }}>
            {editingCharId ? 'Update Character' : 'Add Character'}
          </button>
          {editingCharId && (
            <button
              type="button"
              className="glass-button"
              onClick={() => {
                setEditingCharId(null);
                setNewCharacterName('');
                setNewCharacterDescription('');
                setNewCharacterRole('');
              }}
              style={{ background: 'linear-gradient(45deg, #d92828, #e00000)', marginTop: '0.5rem', width: '100%' }}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <div className="grid-cols-2">
        {characters.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No characters added yet. Start creating your cast!
          </p>
        ) : (
          characters.map((char) => (
            <div key={char.id} className="glass-card">
              <h3 style={{ color: 'var(--accent-purple)', marginBottom: '0.5rem' }}>{char.name}</h3>
              {char.role && <p style={{ fontStyle: 'italic', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Role: {char.role}</p>}
              <p>{char.description}</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button
                  className="glass-button"
                  onClick={() => handleEdit(char)}
                  style={{ background: 'linear-gradient(45deg, #00bcd4, #0097a7)', padding: '0.6rem 1rem', fontSize: '0.9rem' }}
                >
                  Edit
                </button>
                <button
                  className="glass-button"
                  onClick={() => handleDelete(char.id)}
                  style={{ background: 'linear-gradient(45deg, #e00000, #c62828)', padding: '0.6rem 1rem', fontSize: '0.9rem' }}
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
