import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef(null);
  
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    // Hide on mobile/touchscreen devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.style.cursor = 'none';

    const onMove = e => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      
      // Dynamic delegated hover checking for high performance
      const target = e.target;
      if (target) {
        const isInteractive = target.closest('a, button, [role="button"], li, input, textarea, select, canvas, .project-card, .service-card, .cert-card, .stat-card, .navbar__logo, .intro__gate-btn');
        setHovered(!!isInteractive);
      }
    };

    const onDown = e => {
      setClicked(true);
      const newRipple = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    };

    const onUp = () => setClicked(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    const animate = () => {
      // Elastic easing tracking calculation (0.22 speeds up follow time)
      ring.current.x += (pos.current.x - ring.current.x) * 0.22;
      ring.current.y += (pos.current.y - ring.current.y) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = '';
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, []); // Run exactly once on mount

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${visible ? 'cursor--visible' : ''} ${clicked ? 'cursor--clicked' : ''} ${hovered ? 'cursor--hovered' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${visible ? 'cursor--visible' : ''} ${clicked ? 'cursor--clicked' : ''} ${hovered ? 'cursor--hovered' : ''}`}
      />
      {ripples.map(r => (
        <div
          key={r.id}
          className="cursor-ripple"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </>
  );
}
