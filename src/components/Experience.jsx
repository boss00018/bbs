const TIMELINE = [
  {
    year: '2026 – 2027',
    role: 'Vice Chairperson',
    org: 'CSI VBIT Chapter',
    desc: 'Leading one of the largest technical clubs at VBIT — organising hackathons, workshops, and industry speaker sessions for 500+ students.',
    type: 'leadership',
  },
  {
    year: '2026 – 2027',
    role: 'Design Lead',
    org: 'Abhedya Forum, VBIT',
    desc: 'Heading all visual design outputs — event branding, social media, UI for club products, and maintaining a cohesive design system.',
    type: 'leadership',
  },
  {
    year: '2023 – 2026',
    role: 'Freelance Web Developer & Designer',
    org: 'Independent',
    desc: 'Building client websites, landing pages and dashboards. Specialising in React + Next.js with a strong focus on UX and performance.',
    type: 'work',
  },
  {
    year: '2024',
    role: 'Hackathon Finalist',
    org: 'Smart India Hackathon & Regional Events',
    desc: 'Competed in 4+ hackathons with a focus on fintech and AI. Reached finals in multiple editions, delivering MVPs under 36-hour sprints.',
    type: 'achievement',
  },
  {
    year: '2026 – 2027',
    role: 'NextWave Certification Student',
    org: 'NextWave / NASSCOM',
    desc: 'Pursuing full-stack and AI specialisation certifications to formalise skills and stay current with industry standards.',
    type: 'education',
  },
];

const TYPE_COLOR = {
  leadership: '#7c3aed',
  work: '#0ea5e9',
  achievement: '#f59e0b',
  education: '#10b981',
};

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="section__inner">
        <h2 className="section__title">Experience &amp; <span className="accent">Journey</span></h2>
        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <div key={i} className="timeline__item">
              <div 
                className="timeline__dot" 
                style={{ 
                  background: TYPE_COLOR[item.type],
                  boxShadow: `0 0 10px ${TYPE_COLOR[item.type]}` 
                }} 
              />
              <div className="timeline__content" style={{ '--item-accent': TYPE_COLOR[item.type] }}>
                <div className="timeline__meta">
                  <span className="timeline__year">{item.year}</span>
                  <span className="timeline__type-tag" style={{ color: TYPE_COLOR[item.type], borderColor: `${TYPE_COLOR[item.type]}40`, background: `${TYPE_COLOR[item.type]}08` }}>
                    {item.type}
                  </span>
                </div>
                <h3 className="timeline__role">{item.role}</h3>
                <span className="timeline__org" style={{ color: TYPE_COLOR[item.type] }}>{item.org}</span>
                <p className="timeline__desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
