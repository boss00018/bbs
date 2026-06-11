const SKILLS = {
  'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  'Backend': ['Node.js', 'Express', 'Python', 'FastAPI', 'Supabase'],
  'AI & Agents': ['LangChain', 'OpenAI API', 'RAG', 'Function Calling', 'LlamaIndex'],
  'Design': ['Figma', 'Adobe XD', 'Design Systems', 'Prototyping', 'Branding'],
  'Fintech': ['UPI APIs', 'Payment Gateways', 'Financial Modeling', 'Data Viz'],
  'Tools': ['Git', 'Docker', 'Vercel', 'Firebase', 'Postman'],
};

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="section__inner">
        <h2 className="section__title">Skills &amp; <span className="accent">Stack</span></h2>
        <p className="section__sub">Technologies I work with across the full product lifecycle.</p>
        <div className="skills__grid">
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} className="skill-group">
              <h4 className="skill-group__title">{cat}</h4>
              <div className="skill-group__pills">
                {items.map(s => <span key={s} className="skill-pill">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
