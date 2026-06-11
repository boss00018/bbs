import '../components/Marquee.css';

const ITEMS = [
  'React', 'Next.js', 'Python', 'FastAPI', 'Figma', 'LLMs', 'UI/UX Design',
  'Fintech', 'Multi-Agent AI', 'Framer Motion', 'Node.js', 'Tailwind CSS',
  'OpenAI', 'Design Systems', 'Hackathons',
];

export default function Marquee() {
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
