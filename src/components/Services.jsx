import { Code2, Palette, BrainCircuit, Rocket } from 'lucide-react';
import './Services.css';

const SERVICES = [
  {
    icon: <Code2 size={26} />,
    title: 'Web Development',
    desc: 'Full-stack web apps and landing pages with React, Next.js and Node.js — fast, accessible, and production-ready.',
    accent: '#7c3aed',
  },
  {
    icon: <Palette size={26} />,
    title: 'UI/UX Design',
    desc: 'End-to-end product design in Figma — wireframes, prototypes, design systems, and brand identities that convert.',
    accent: '#0ea5e9',
  },
  {
    icon: <BrainCircuit size={26} />,
    title: 'AI Agent Development',
    desc: 'Building multi-agent pipelines, RAG systems, and LLM-powered tools using LangChain, FastAPI, and Ollama.',
    accent: '#6366f1',
  },
  {
    icon: <Rocket size={26} />,
    title: 'Freelance & Consulting',
    desc: 'Helping startups and small businesses ship MVPs, revamp UX, and integrate AI — on time and on budget.',
    accent: '#10b981',
  },
];

export default function Services() {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const tiltMax = 8;
    const rx = -((y - yc) / yc) * tiltMax;
    const ry = ((x - xc) / xc) * tiltMax;
    
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  };

  return (
    <section id="services" className="section services">
      <div className="section__inner">
        <h2 className="section__title">What I <span className="accent">Do</span></h2>
        <p className="section__sub">From pixels to pipelines — here's how I can help.</p>
        <div className="services__grid">
          {SERVICES.map(s => (
            <div 
              key={s.title} 
              className="service-card" 
              style={{ '--s-accent': s.accent }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Reflective glare overlay */}
              <div className="card-glare" />
              <div className="service-card__icon">{s.icon}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
