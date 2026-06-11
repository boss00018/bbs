const STATS = [
  { value: '4+', label: 'Hackathons' },
  { value: '10+', label: 'Projects' },
  { value: '2', label: 'Leadership Roles' },
  { value: '∞', label: 'Curiosity' },
];

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="section__inner">
        <h2 className="section__title">About <span className="accent">Me</span></h2>
        <div className="about__grid">
          <div className="about__text">
            <p>
              I'm a 3rd-year Computer Science student at <strong>VBIT, Hyderabad</strong> (B.Tech '23–'27) with a deep passion for building
              products that sit at the intersection of design and technology.
            </p>
            <p>
              As <strong>Vice Chairperson of CSI VBIT</strong> and <strong>Design Lead at Abhedya Forum</strong>, I've led
              teams, organized tech events, and mentored peers — all while shipping real projects in fintech and AI agents.
            </p>
            <p>
              I freelance in web development and UI/UX design, and I'm currently levelling up with <strong>NextWave certifications</strong>.
              Hackathons are my playground — I love the chaos, the collaboration, and the crunch.
            </p>
            <div className="about__tags">
              {['Fintech', 'AI Agents', 'UI/UX', 'React', 'Next.js', 'Freelancer', 'NextWave Student'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="about__stats">
            {STATS.map(s => (
              <div key={s.label} className="stat-card">
                <span className="stat-card__value accent">{s.value}</span>
                <span className="stat-card__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
