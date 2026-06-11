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

  useEffect(() => {
    // hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.style.cursor = 'none';

    const onMove = e => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onHoverIn = () => setHovered(true);
    const onHoverOut = () => setHovered(false);

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], .project-card, .service-card, .cert-card, .stat-card, .skill-pill')
        .forEach(el => {
          el.addEventListener('mouseenter', onHoverIn);
          el.addEventListener('mouseleave', onHoverOut);
        });
    };

    addHoverListeners();
    const mo = new MutationObserver(addHoverListeners);
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = '';
      cancelAnimationFrame(raf.current);
      mo.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, []);

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
    </>
  );
}
