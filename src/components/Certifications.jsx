import { BadgeCheck } from 'lucide-react';
import './Certifications.css';

const CERTS = [
  { title: 'Full Stack Development', issuer: 'NextWave / NASSCOM', year: '2025', accent: '#7c3aed' },
  { title: 'AI & Machine Learning Specialisation', issuer: 'NextWave / NASSCOM', year: '2025', accent: '#6366f1' },
  { title: 'Responsive Web Design', issuer: 'freeCodeCamp', year: '2024', accent: '#0ea5e9' },
  { title: 'Python for Data Science', issuer: 'NPTEL / Coursera', year: '2024', accent: '#10b981' },
  { title: 'UI/UX Design Fundamentals', issuer: 'Google / Coursera', year: '2023', accent: '#f59e0b' },
];

export default function Certifications() {
  return (
    <section id="certifications" className="section certifications">
      <div className="section__inner">
        <h2 className="section__title">Certifi<span className="accent">cations</span></h2>
        <p className="section__sub">Credentials that complement hands-on experience.</p>
        <div className="certs__list">
          {CERTS.map(c => (
            <div key={c.title} className="cert-card" style={{ '--c-accent': c.accent }}>
              <BadgeCheck size={22} className="cert-card__icon" />
              <div className="cert-card__body">
                <span className="cert-card__title">{c.title}</span>
                <span className="cert-card__meta">{c.issuer} · {c.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
