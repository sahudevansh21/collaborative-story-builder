"use client";

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container">
      <section className="glass-card" style={{ textAlign: 'center', marginBottom: '3rem', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '3rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent', margin: '0 0 1rem 0' }}>
          Collaborative Story Builder
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 2rem auto', color: 'var(--text-light)' }}>
          Unleash your creativity. Build compelling narratives, characters, and plotlines with ease.
        </p>
        <Link href="/story-canvas" className="glass-button">
          Start Your Story Now!
        </Link>
      </section>

      <section className="grid-cols-2" style={{ marginBottom: '3rem' }}>
        <div className="glass-card">
          <h2 style={{ color: 'var(--accent-blue)' }}>Problem</h2>
          <p>
            Aspiring writers often struggle with writer's block or need a simple tool to collaboratively build story plots and characters without needing complex shared documents or external services. They require a quick way to outline and connect ideas in a structured yet flexible manner.
          </p>
        </div>
        <div className="glass-card">
          <h2 style={{ color: 'var(--accent-purple)' }}>Solution</h2>
          <p>
            Our website provides an intuitive canvas where users can create interconnected story elements like characters, settings, and plot points. Leveraging local storage, your progress is always saved. It facilitates brainstorming and organizing narrative structures through a visual, drag-and-drop interface, helping you build a full story outline.
          </p>
        </div>
      </section>

      <section className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <h2 style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>Features at a Glance</h2>
        <div className="flex-group" style={{ justifyContent: 'center' }}>
          <div className="glass-card" style={{ flexBasis: '250px', padding: '1.5rem', transform: 'none' }}>
            <h3 style={{ color: 'var(--accent-blue)' }}>Story Canvas</h3>
            <p>Visually outline your plot with drag-and-drop elements.</p>
          </div>
          <div className="glass-card" style={{ flexBasis: '250px', padding: '1.5rem', transform: 'none' }}>
            <h3 style={{ color: 'var(--accent-purple)' }}>Character Editor</h3>
            <p>Flesh out detailed characters and save their profiles.</p>
          </div>
          <div className="glass-card" style={{ flexBasis: '250px', padding: '1.5rem', transform: 'none' }}>
            <h3 style={{ color: 'var(--accent-blue)' }}>Plotline Overview</h3>
            <p>Organize key events and track your narrative flow.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
