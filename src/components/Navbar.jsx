import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = ['About', 'Services', 'Projects', 'Skills', 'Experience', 'Contact'];

const Logo = () => (
  <img src="/logo.png" alt="BSB Logo" width="42" height="42" style={{ borderRadius: '10px', display: 'block', objectFit: 'cover' }} />
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection Observer for scroll spy
  useEffect(() => {
    const sections = links.map(l => document.getElementById(l.toLowerCase()));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '-25% 0px -55% 0px' // Focus on the upper-mid region of the screen
      }
    );

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <span className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <Logo />
        <span className="navbar__logo-text">Bhanu Shree<span className="accent">.</span></span>
      </span>
      <ul className="navbar__links">
        {links.map(l => (
          <li 
            key={l} 
            className={activeSection === l.toLowerCase() ? 'navbar__link--active' : ''}
            onClick={() => scrollTo(l)}
          >
            {l}
          </li>
        ))}
      </ul>
      <button className="navbar__burger" onClick={() => setOpen(!open)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open && (
        <div className="navbar__mobile">
          {links.map(l => (
            <span 
              key={l} 
              className={activeSection === l.toLowerCase() ? 'navbar__link--active' : ''}
              onClick={() => scrollTo(l)}
            >
              {l}
            </span>
          ))}
        </div>
      )}
    </nav>
  );
}
