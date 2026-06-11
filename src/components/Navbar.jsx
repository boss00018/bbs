import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = ['About', 'Services', 'Projects', 'Skills', 'Experience', 'Contact'];

const Logo = () => (
  <img src="/logo.png" alt="BSB Logo" width="42" height="42" style={{ borderRadius: '10px', display: 'block', objectFit: 'cover' }} />
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <span className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <Logo />
        <span className="navbar__logo-text">Bhanu Sree<span className="accent">.</span></span>
      </span>
      <ul className="navbar__links">
        {links.map(l => <li key={l} onClick={() => scrollTo(l)}>{l}</li>)}
      </ul>
      <button className="navbar__burger" onClick={() => setOpen(!open)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open && (
        <div className="navbar__mobile">
          {links.map(l => <span key={l} onClick={() => scrollTo(l)}>{l}</span>)}
        </div>
      )}
    </nav>
  );
}
