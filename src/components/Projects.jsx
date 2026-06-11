import { ExternalLink, BrainCircuit, BarChart3, FileSpreadsheet, ShoppingBag, Store, Video, Landmark } from 'lucide-react';

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const PROJECTS = [
  {
    icon: <Landmark size={20} />,
    title: 'Zobot — Intelligent Wealth OS',
    desc: 'AI-powered wealth management platform for Indian retail banking. Replaces traditional DSAs with a deterministic financial intelligence engine backed by a local LLM, real-time market data, and enterprise-grade security.',
    tags: ['LLM', 'Fintech', 'Python', 'FastAPI', 'Banking'],
    accent: '#7c3aed',
    github: 'https://github.com/',
    live: '#',
  },
  {
    icon: <BrainCircuit size={20} />,
    title: 'NirvanaX',
    desc: 'A trust-first, explainable, multi-agent governed financial intelligence platform for Indian retail banking — with real-time market data, ethical AI governance, and advanced hallucination prevention.',
    tags: ['Multi-Agent', 'LLM', 'Fintech', 'Python', 'FastAPI'],
    accent: '#6366f1',
    github: 'https://github.com/',
    live: '#',
  },
  {
    icon: <BarChart3 size={20} />,
    title: 'FinSight AI — Autonomous CFO OS',
    desc: 'Next-generation autonomous financial intelligence platform. Unified single-page cockpit with real-time bank gateway ledger ingestion, anomaly detection, and a sequential multi-agent pipeline powered by Ollama.',
    tags: ['Ollama', 'Multi-Agent', 'FastAPI', 'React', 'Fintech'],
    accent: '#0ea5e9',
    github: 'https://github.com/',
    live: '#',
  },
  {
    icon: <FileSpreadsheet size={20} />,
    title: 'SheetGenie AI',
    desc: 'AI-powered Excel automation engine. Describe what you want in plain English — SheetGenie transforms, styles, filters, and analyses spreadsheets instantly using a local LLM.',
    tags: ['Local LLM', 'Python', 'Excel', 'NLP', 'Automation'],
    accent: '#10b981',
    github: 'https://github.com/',
    live: '#',
  },
  {
    icon: <ShoppingBag size={20} />,
    title: 'CLIQTRIX — E-Commerce Zobot',
    desc: 'Complete e-commerce conversational assistant (MAX) built for Zoho SalesIQ using Deluge scripting. End-to-end shopping experience from product discovery to order fulfilment and returns.',
    tags: ['Zoho SalesIQ', 'Deluge', 'Chatbot', 'E-Commerce'],
    accent: '#f59e0b',
    github: 'https://github.com/',
    live: '#',
  },
  {
    icon: <Store size={20} />,
    title: 'VendorHub',
    desc: 'Production-grade AI-assisted hyperlocal multi-vendor e-commerce marketplace with real-time decision intelligence — helps local vendors price smarter, manage inventory, and grow faster.',
    tags: ['React', 'Node.js', 'AI', 'E-Commerce', 'Marketplace'],
    accent: '#ec4899',
    github: 'https://github.com/',
    live: '#',
  },
  {
    icon: <Video size={20} />,
    title: 'Video Editor Tools',
    desc: 'Lightweight web app built with Flask and OpenCV providing a frame extractor and watermark remover — runs entirely locally with no third-party uploads.',
    tags: ['Flask', 'OpenCV', 'Python', 'Computer Vision'],
    accent: '#14b8a6',
    github: 'https://github.com/',
    live: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="section__inner">
        <h2 className="section__title">Featured <span className="accent">Projects</span></h2>
        <p className="section__sub">Things I've shipped — from hackathon nights to polished freelance work.</p>
        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <div key={p.title} className="project-card" style={{ '--card-accent': p.accent }}>
              <div className="project-card__top">
                <div className="project-card__icon-wrap" style={{ background: `${p.accent}1a`, color: p.accent }}>
                  {p.icon}
                </div>
                <div className="project-card__links">
                  <a href={p.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                    <GithubIcon />
                  </a>
                  <a href={p.live} target="_blank" rel="noreferrer" aria-label="Live Demo">
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
              <div className="project-card__num">0{i + 1}</div>
              <h3 className="project-card__title">{p.title}</h3>
              <p className="project-card__desc">{p.desc}</p>
              <div className="project-card__tags">
                {p.tags.map(t => <span key={t} className="tag tag--sm">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
