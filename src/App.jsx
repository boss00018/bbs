import { useEffect } from 'react';
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
  useEffect(() => {
    const els = document.querySelectorAll('.section');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('reveal', 'visible'); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    els.forEach(el => { el.classList.add('reveal'); obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Certifications />
        <Experience />
        <Contact />
      </main>
      <footer className="footer" style={{ position: 'relative', zIndex: 1 }}>
        <p>Designed &amp; Built by <span className="accent">Bhanu Sree Bollam</span> · VBIT Hyderabad · {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
