import { useState, useEffect, useRef } from 'react';

const SKILLS_DATA = {
  'Frontend': [
    { name: 'React', level: 92 },
    { name: 'Next.js', level: 88 },
    { name: 'TypeScript', level: 84 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Framer Motion', level: 80 }
  ],
  'Backend': [
    { name: 'Node.js', level: 86 },
    { name: 'Express', level: 85 },
    { name: 'Python', level: 88 },
    { name: 'FastAPI', level: 87 },
    { name: 'Supabase', level: 82 }
  ],
  'AI & Agents': [
    { name: 'LangChain', level: 85 },
    { name: 'OpenAI API', level: 90 },
    { name: 'RAG Systems', level: 88 },
    { name: 'Function Calling', level: 86 },
    { name: 'LlamaIndex', level: 78 }
  ],
  'Design': [
    { name: 'Figma', level: 90 },
    { name: 'Adobe XD', level: 75 },
    { name: 'Design Systems', level: 85 },
    { name: 'Prototyping', level: 88 },
    { name: 'Branding', level: 80 }
  ],
  'Fintech': [
    { name: 'UPI APIs', level: 85 },
    { name: 'Payment Gateways', level: 88 },
    { name: 'Financial Modeling', level: 80 },
    { name: 'Data Viz', level: 85 }
  ],
  'Tools': [
    { name: 'Git', level: 90 },
    { name: 'Docker', level: 75 },
    { name: 'Vercel', level: 88 },
    { name: 'Firebase', level: 80 },
    { name: 'Postman', level: 85 }
  ],
};

export default function Skills() {
  const containerRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section skills">
      <div className="section__inner" ref={containerRef}>
        <h2 className="section__title">Skills &amp; <span className="accent">Stack</span></h2>
        <p className="section__sub">Technologies I work with across the full product lifecycle.</p>
        <div className="skills__grid">
          {Object.entries(SKILLS_DATA).map(([cat, items]) => (
            <div key={cat} className="skill-group">
              <h4 className="skill-group__title">{cat}</h4>
              <div className="skill-group__items">
                {items.map(s => (
                  <div key={s.name} className="skill-item">
                    <div className="skill-item__header">
                      <span className="skill-item__name">{s.name}</span>
                      <span className="skill-item__pct">{s.level}%</span>
                    </div>
                    <div className="skill-item__bar-wrap">
                      <div 
                        className="skill-item__bar" 
                        style={{ 
                          width: animated ? `${s.level}%` : '0%',
                          transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
                        }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
