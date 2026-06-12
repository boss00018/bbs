import { useEffect, useState } from 'react';
import './AnimatedBackground.css';

const HUD_WIDGETS = [
  { id: 1, text: '[ + ]', style: { top: '12%', left: '6%', animationDelay: '0s' } },
  { id: 2, text: '┌  ┐\n└  ┘', style: { top: '32%', right: '8%', animationDelay: '-4s', whiteSpace: 'pre' } },
  { id: 3, text: 'SYS_ACTIVE // 0x7E2A', style: { top: '55%', left: '5%', animationDelay: '-2s' } },
  { id: 4, text: '[ + ]', style: { top: '78%', right: '6%', animationDelay: '-6s' } },
  { id: 5, text: 'LOC: VBIT // HYD // 2026', style: { top: '92%', left: '12%', animationDelay: '-1s' } },
  { id: 6, text: '┌──┐\n└──┘', style: { top: '68%', right: '15%', animationDelay: '-3s', whiteSpace: 'pre' } },
  { id: 7, text: '01011001 01010100', style: { top: '22%', left: '15%', animationDelay: '-5s', opacity: 0.08 } },
];

export default function AnimatedBackground() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Track coordinates for background spotlight grid lens
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="anim-bg" aria-hidden="true">
      {/* dot grid with mouse spotlight lens overlay */}
      <div className="anim-bg__grid" />

      {/* drifting neon orbs */}
      <div className="anim-bg__orb anim-bg__orb--1" />
      <div className="anim-bg__orb anim-bg__orb--2" />
      <div className="anim-bg__orb anim-bg__orb--3" />
      <div className="anim-bg__orb anim-bg__orb--4" />

      {/* Parallax drifting HUD vector elements */}
      {HUD_WIDGETS.map(hud => (
        <div key={hud.id} className="anim-bg__hud-item" style={hud.style}>
          {hud.text}
        </div>
      ))}

      {/* noise overlay for premium paper/screen texture */}
      <div className="anim-bg__noise" />
    </div>
  );
}
