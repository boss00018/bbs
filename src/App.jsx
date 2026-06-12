import { useEffect, useState } from 'react';
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Experience from './components/Experience';
import Contact from './components/Contact';
import AnimatedBackground from './components/AnimatedBackground';
import CustomCursor from './components/CustomCursor';
import './App.css';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    if (!introComplete) return;
    const els = document.querySelectorAll('.section');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('reveal', 'visible'); obs.unobserve(e.target); }
      }),
      { threshold: 0.08 }
    );
    els.forEach(el => { el.classList.add('reveal'); obs.observe(el); });
    return () => obs.disconnect();
  }, [introComplete]);

  return (
    <>
      <Intro onComplete={() => setIntroComplete(true)} />

      {introComplete && (
        <>
          <CustomCursor />
          <Navbar />
        </>
      )}

      <div className={`app-content ${introComplete ? 'app-content--visible' : ''}`}>
        <AnimatedBackground />
        <main style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <Marquee />
          <About />
          <div className="section-divider" />
          <Services />
          <div className="section-divider" />
          <Projects />
          <div className="section-divider" />
          <Skills />
          <div className="section-divider" />
          <Certifications />
          <div className="section-divider" />
          <Experience />
          <div className="section-divider" />
          <Contact />
        </main>
        <footer className="footer" style={{ position: 'relative', zIndex: 1 }}>
          <p>Designed &amp; Built by <span className="accent">Bhanu Sree Bollam</span> · VBIT Hyderabad · {new Date().getFullYear()}</p>
        </footer>
      </div>
    </>
  );
}
