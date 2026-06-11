import { useEffect, useRef, useState, Suspense } from 'react';
import { Mail, ChevronDown } from 'lucide-react';
import Lanyard from './Lanyard';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ROLES = ['Web Developer', 'UI/UX Designer', 'Freelancer', 'Fintech Builder', 'AI Agent Dev'];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const timeout = useRef(null);

  useEffect(() => {
    const current = ROLES[roleIdx];
    if (typing) {
      if (displayed.length < current.length) {
        timeout.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
      } else {
        timeout.current = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIdx((roleIdx + 1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout.current);
  }, [displayed, typing, roleIdx]);

  return (
    <section id="hero" className="hero">
      <div className="hero__grid">
        <div className="hero__text">
          <p className="hero__greeting">Hey there, I'm</p>
          <h1 className="hero__name">
            Bhanu Sree<br /><span className="accent">Bollam</span>
          </h1>
          <p className="hero__role">
            <span className="typewriter">{displayed}<span className="cursor">|</span></span>
          </p>
          <p className="hero__sub">
            B.Tech CSE '23–'27 @ VBIT Hyderabad &nbsp;·&nbsp; Vice Chairperson, CSI VBIT
            &nbsp;·&nbsp; Design Lead, Abhedya Forum · 2026
          </p>
          <div className="hero__cta">
            <a href="#projects" className="btn btn--primary"
              onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
              View Projects
            </a>
            <a href="#contact" className="btn btn--ghost"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Get in Touch
            </a>
          </div>
          <div className="hero__socials">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="social-btn" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
            <a href="mailto:bhanusreebollam@gmail.com" className="social-btn" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="hero__lanyard">
          <Suspense fallback={
            <div className="lanyard-loader">
              <div className="lanyard-loader__spinner" />
              <span>Loading 3D...</span>
            </div>
          }>
            <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} frontImage="/logo.png" backImage="/image.jpeg" />
          </Suspense>
        </div>
      </div>

      <button className="hero__scroll" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <ChevronDown size={26} />
      </button>
    </section>
  );
}
