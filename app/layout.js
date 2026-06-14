import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Collaborative Story Builder',
  description: 'A simple tool to collaboratively build story plots and characters.',
};

export default function RootLayout({ children }) {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Story Canvas', href: '/story-canvas' },
    { name: 'Character Editor', href: '/character-editor' },
    { name: 'Plotline Overview', href: '/plotline-overview' },
  ];

  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <Link href="/" className="navbar-brand">
            Collaborative Story Builder
          </Link>
          <div className="nav-links">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="nav-link">
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
        <main style={{ flex: 1 }}>{children}</main>
        {/* Simple Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '2rem',
          color: 'var(--text-secondary)',
          borderTop: '1px solid var(--glass-border-color)',
          marginTop: 'auto'
        }}>
          &copy; {new Date().getFullYear()} Collaborative Story Builder. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
