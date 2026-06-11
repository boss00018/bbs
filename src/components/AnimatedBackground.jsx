import './AnimatedBackground.css';

export default function AnimatedBackground() {
  return (
    <div className="anim-bg" aria-hidden="true">
      {/* dot grid */}
      <div className="anim-bg__grid" />

      {/* drifting orbs */}
      <div className="anim-bg__orb anim-bg__orb--1" />
      <div className="anim-bg__orb anim-bg__orb--2" />
      <div className="anim-bg__orb anim-bg__orb--3" />
      <div className="anim-bg__orb anim-bg__orb--4" />

      {/* noise overlay for texture */}
      <div className="anim-bg__noise" />
    </div>
  );
}
