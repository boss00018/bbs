import { useEffect, useRef, useState } from 'react';
import './Intro.css';

/* ─── SVG signature paths for "BSB" — hand-crafted bezier strokes ─── */
const STROKES = [
  /* B — left vertical stem */
  'M 52 28 L 52 92',
  /* B — top bowl */
  'M 52 28 C 72 28, 84 34, 84 47 C 84 60, 72 60, 52 60',
  /* B — bottom bowl */
  'M 52 60 C 76 60, 90 67, 90 78 C 90 89, 76 92, 52 92',
  /* S — top arc */
  'M 112 36 C 108 28, 98 24, 88 28 C 78 32, 78 44, 92 50 C 106 56, 116 62, 112 74 C 108 86, 96 90, 84 86',
  /* B2 — left vertical stem */
  'M 136 28 L 136 92',
  /* B2 — top bowl */
  'M 136 28 C 156 28, 168 34, 168 47 C 168 60, 156 60, 136 60',
  /* B2 — bottom bowl */
  'M 136 60 C 160 60, 174 67, 174 78 C 174 89, 160 92, 136 92',
  /* underline flourish */
  'M 40 104 C 80 114, 140 114, 180 104',
];

const GLYPHS = '01ΔΞ$█▓[]/\\<>!?@#%&*+-=§±';
const NAME_TEXT = 'Bhanu Shree Bollam';

const STROKE_DURATION = 350; // ms per path stroke
const STROKE_STAGGER = 240;  // ms between strokes starting

export default function Intro({ onComplete }) {
  const [phase, setPhase] = useState('singularity'); // singularity -> drawing -> cipher -> ready -> warping -> done
  const [strokesActive, setStrokesActive] = useState([]);
  const [displayName, setDisplayName] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [warpClickPos, setWarpClickPos] = useState(null);

  const canvasRef = useRef(null);
  const svgRef = useRef(null);
  const timelineRef = useRef({ start: 0, lastLogsUpdate: 0 });
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // ── Timing State Machine ──
  useEffect(() => {
    timelineRef.current.start = performance.now();

    // Stagger paths drawing
    const strokeTimers = STROKES.map((_, i) => {
      return setTimeout(() => {
        setStrokesActive(prev => [...prev, i]);
      }, 1200 + i * STROKE_STAGGER);
    });

    // Enter cipher phase when monogram is nearly done
    const cipherTimer = setTimeout(() => {
      setPhase('cipher');
    }, 1200 + STROKES.length * STROKE_STAGGER - 200);

    // Enter ready state (display gate)
    const readyTimer = setTimeout(() => {
      setPhase('ready');
      setPercentage(100);
    }, 5200);

    // Auto-proceed backup safety gate
    const autoProceedTimer = setTimeout(() => {
      triggerWarp(null);
    }, 8500);

    return () => {
      strokeTimers.forEach(clearTimeout);
      clearTimeout(cipherTimer);
      clearTimeout(readyTimer);
      clearTimeout(autoProceedTimer);
    };
  }, []);

  // ── Name Cipher Reveal Effect ──
  useEffect(() => {
    if (phase !== 'cipher' && phase !== 'ready' && phase !== 'warping') return;

    let frame = 0;
    const maxFrames = 35;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / maxFrames;
      const revealCount = Math.floor(NAME_TEXT.length * progress);

      let result = '';
      for (let i = 0; i < NAME_TEXT.length; i++) {
        if (NAME_TEXT[i] === ' ') {
          result += ' ';
        } else if (i < revealCount) {
          result += NAME_TEXT[i];
        } else {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayName(result);
      if (frame >= maxFrames) {
        setDisplayName(NAME_TEXT);
        clearInterval(interval);
      }
    }, 38);

    return () => clearInterval(interval);
  }, [phase]);

  // ── Percent & Console Log Simulators ──
  useEffect(() => {
    const start = performance.now();
    const interval = setInterval(() => {
      const elapsed = performance.now() - start;

      // Map elapsed time to percentages
      let currentPct = 0;
      if (elapsed < 1200) {
        currentPct = Math.min(15, Math.floor((elapsed / 1200) * 15));
      } else if (elapsed < 3200) {
        currentPct = Math.min(65, 15 + Math.floor(((elapsed - 1200) / 2000) * 50));
      } else if (elapsed < 5200) {
        currentPct = Math.min(99, 65 + Math.floor(((elapsed - 3200) / 2000) * 34));
      } else {
        currentPct = 100;
      }

      setPercentage(currentPct);

      // Dynamically add logs corresponding to the boot progress
      const logsList = [
        { pct: 0, text: 'SYS.INIT: INITIALIZING QUANTUM CORE...', highlight: false },
        { pct: 8, text: 'VECTORS: RESOLVING 300 NODE CODES...', highlight: false },
        { pct: 15, text: 'MONOGRAM: LOADING VECTOR PATH COORDINATES', highlight: true },
        { pct: 25, text: 'SHADERS: COMPILE ACTIVE [NEON_CYAN_GLOW]', highlight: false },
        { pct: 45, text: 'GRAPHICS: SYNCING 3D LANYARD ANCHOR RIG', highlight: false },
        { pct: 60, text: 'IDENTITY: INJECTING CIPHER CHARACTER PACKET', highlight: true },
        { pct: 78, text: 'DECRYPTING: BHANU SHREE BOLLAM KEY', highlight: false },
        { pct: 90, text: 'CORE: ESTABLISHING INTEGRATED PIPELINE...', highlight: false },
        { pct: 100, text: 'SYSTEM: ALL MODULES FULLY CALIBRATED.', highlight: true, accent: true },
      ];

      const activeLogs = logsList.filter(l => currentPct >= l.pct);
      setConsoleLogs(activeLogs);

      if (currentPct === 100) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // ── Warp Exit Trigger ──
  const triggerWarp = (e) => {
    if (phase === 'warping' || phase === 'done') return;

    let clickX = window.innerWidth / 2;
    let clickY = window.innerHeight / 2;

    if (e) {
      clickX = e.clientX;
      clickY = e.clientY;
    }

    setWarpClickPos({ x: clickX, y: clickY });
    setPhase('warping');

    // Proceed to unmount after warp drive anim completes
    setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 1100);
  };

  // ── Canvas Particle Simulation (Swirling Vortex, Constellations, Hover & Warp Streak) ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    let particles = [];
    let sparks = [];
    let shockwaveRadius = 0;
    let currentWarpStrength = 1.0;

    const COLORS = ['#a78bfa', '#0ea5e9', '#e2e8f0'];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      particles = [];
      const density = Math.min(220, Math.floor((W * H) / 6000));

      for (let i = 0; i < density; i++) {
        // Particles start distributed in coordinates
        const angle = Math.random() * Math.PI * 2;
        const orbitRadius = 150 + Math.random() * Math.max(W, H);
        particles.push({
          x: W / 2 + Math.cos(angle) * orbitRadius,
          y: H / 2 + Math.sin(angle) * orbitRadius,
          ox: W / 2 + (Math.random() - 0.5) * (W * 0.95), // target position for grid floating
          oy: H / 2 + (Math.random() - 0.5) * (H * 0.95),
          vx: 0,
          vy: 0,
          size: 0.8 + Math.random() * 1.6,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 0,
          targetAlpha: 0.1 + Math.random() * 0.38,
          orbitRadius,
          orbitSpeed: 0.008 + Math.random() * 0.012,
          angle,
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    const animate = (now) => {
      const elapsed = now - timelineRef.current.start;
      const currentPhase = phaseRef.current;

      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;

      // ── Spawn sparks along drawing paths tip ──
      if (currentPhase === 'drawing' || currentPhase === 'singularity') {
        const strokeIdx = Math.floor((elapsed - 1200) / STROKE_STAGGER);
        if (strokeIdx >= 0 && strokeIdx < STROKES.length && svgRef.current) {
          const pathElements = svgRef.current.querySelectorAll('.intro__stroke');
          const activePath = pathElements[strokeIdx];
          if (activePath) {
            try {
              const strokeElapsed = (elapsed - 1200) - strokeIdx * STROKE_STAGGER;
              const progress = Math.min(1, strokeElapsed / STROKE_DURATION);
              const pathLength = activePath.getTotalLength();
              const point = activePath.getPointAtLength(progress * pathLength);

              const svgRect = svgRef.current.getBoundingClientRect();
              const canvasRect = canvas.getBoundingClientRect();
              const scaleX = svgRect.width / 220;
              const scaleY = svgRect.height / 120;
              const tipX = svgRect.left - canvasRect.left + point.x * scaleX;
              const tipY = svgRect.top - canvasRect.top + point.y * scaleY;

              if (progress > 0 && progress < 1) {
                for (let k = 0; k < 3; k++) {
                  sparks.push({
                    x: tipX,
                    y: tipY,
                    vx: (Math.random() - 0.5) * 4.5,
                    vy: (Math.random() - 0.5) * 4.5 - 1.2,
                    size: 1 + Math.random() * 2,
                    life: 1.0,
                    decay: 0.02 + Math.random() * 0.035,
                    color: `rgba(${Math.floor(167 + Math.random() * 88)}, ${Math.floor(139 + Math.random() * 80)}, 255, `,
                  });
                }
              }
            } catch (err) {
              // Graceful fallback for browsers
            }
          }
        }
      }

      // Draw and update sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = s.color + s.life + ')';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Update and draw Starfield Particles ──
      particles.forEach((p) => {
        // Phase 1: Swirling vortex attraction in Singularity state
        if (currentPhase === 'singularity') {
          p.angle += p.orbitSpeed;
          // contract radius down to core
          const factor = 1 - Math.min(1, elapsed / 1200);
          const currentRadius = p.orbitRadius * Math.max(0.02, factor);

          const targetX = cx + Math.cos(p.angle) * currentRadius;
          const targetY = cy + Math.sin(p.angle) * currentRadius;

          p.x += (targetX - p.x) * 0.1;
          p.y += (targetY - p.y) * 0.1;

          // Fade particles in
          p.alpha += (p.targetAlpha - p.alpha) * 0.05;
        }
        // Phase 2: Drawing, Cipher and Ready Constellations
        else if (currentPhase === 'drawing' || currentPhase === 'cipher' || currentPhase === 'ready') {
          // Slow floating drift towards grid targets
          p.vx += (p.ox - p.x) * 0.003;
          p.vy += (p.oy - p.y) * 0.003;

          // Damping/friction
          p.vx *= 0.93;
          p.vy *= 0.93;

          p.x += p.vx;
          p.y += p.vy;

          // Subtle noise floating drift
          p.x += Math.sin(elapsed * 0.001 + p.ox) * 0.08;
          p.y += Math.cos(elapsed * 0.0012 + p.oy) * 0.08;

          p.alpha += (p.targetAlpha - p.alpha) * 0.02;

          // Mouse gravity displacement
          if (mouseRef.current.active) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
              const force = (130 - dist) / 130;
              const pushAngle = Math.atan2(dy, dx);
              p.x += Math.cos(pushAngle) * force * 1.8;
              p.y += Math.sin(pushAngle) * force * 1.8;
            }
          }
        }
        // Phase 3: Hyper-Space Warp Exit
        else if (currentPhase === 'warping') {
          const originX = warpClickPosRef.current?.x || cx;
          const originY = warpClickPosRef.current?.y || cy;

          // Velocity outward from warp origin point
          const dx = p.x - originX;
          const dy = p.y - originY;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          const dirX = dx / dist;
          const dirY = dy / dist;

          // Accelerate outward exponentially
          p.vx += dirX * currentWarpStrength * 0.9;
          p.vy += dirY * currentWarpStrength * 0.9;

          p.x += p.vx;
          p.y += p.vy;

          // Fade out as they fly off
          p.alpha -= 0.008;
        }

        // Draw connections in standard phases
        if (currentPhase === 'drawing' || currentPhase === 'cipher' || currentPhase === 'ready') {
          particles.forEach((other) => {
            if (p === other) return;
            const dx = p.x - other.x;
            const dy = p.y - other.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 85) {
              const lineAlpha = (1 - d / 85) * 0.09 * p.alpha;
              ctx.strokeStyle = `rgba(124, 58, 237, ${lineAlpha})`;
              ctx.lineWidth = 0.55;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          });
        }

        // Draw particle dot or motion trail lines
        if (p.alpha > 0) {
          if (currentPhase === 'warping') {
            // Motion trails streak lines
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.lineWidth = p.size * 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x - p.vx * 1.8, p.y - p.vy * 1.8);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          } else {
            // Circular nodes
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // ── Update Shockwave ──
      if (currentPhase === 'warping') {
        shockwaveRadius += 32;
        currentWarpStrength += 0.45;

        const originX = warpClickPosRef.current?.x || cx;
        const originY = warpClickPosRef.current?.y || cy;

        ctx.strokeStyle = `rgba(14, 165, 233, ${Math.max(0, 1 - shockwaveRadius / (W * 1.2))})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(originX, originY, shockwaveRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1.0;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // Use refs inside loop to prevent animation refetching lag
  const phaseRef = useRef(phase);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const warpClickPosRef = useRef(warpClickPos);
  useEffect(() => {
    warpClickPosRef.current = warpClickPos;
  }, [warpClickPos]);

  return (
    <div
      className={`intro ${
        phase === 'warping' || phase === 'done' ? 'intro--exit-animation' : ''
      }`}
    >
      {/* background particle canvas */}
      <canvas ref={canvasRef} className="intro__canvas" />

      {/* ambient floating color nodes */}
      <div className="intro__orb intro__orb--1" />
      <div className="intro__orb intro__orb--2" />

      {/* Singularity Pulse visual */}
      {phase === 'singularity' && <div className="intro__singularity" />}

      {/* Center content stage */}
      <div className="intro__center">
        {/* Layered neon glowing BSB monogram */}
        <svg
          ref={svgRef}
          className="intro__sig"
          viewBox="0 0 220 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft, wide ambient neon glow */}
            <filter id="sigGlowSoft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Tight bright neon core */}
            <filter id="sigGlowBright" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="sigGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="60%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* Underlay glow strokes */}
          <g filter="url(#sigGlowSoft)" opacity="0.65">
            {STROKES.map((d, i) => (
              <path
                key={`glow-${i}`}
                d={d}
                stroke="url(#sigGrad)"
                strokeWidth={i === STROKES.length - 1 ? 2.5 : 5.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`intro__stroke ${
                  strokesActive.includes(i) ? 'intro__stroke--draw' : ''
                }`}
                style={{
                  transitionDuration: `${STROKE_DURATION}ms`,
                  opacity: strokesActive.includes(i) ? 1 : 0,
                }}
              />
            ))}
          </g>

          {/* Foreground hot core strokes */}
          <g filter="url(#sigGlowBright)">
            {STROKES.map((d, i) => (
              <path
                key={`core-${i}`}
                d={d}
                stroke="#ffffff"
                strokeWidth={i === STROKES.length - 1 ? 1.0 : 1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`intro__stroke ${
                  strokesActive.includes(i) ? 'intro__stroke--draw' : ''
                }`}
                style={{
                  transitionDuration: `${STROKE_DURATION}ms`,
                  opacity: strokesActive.includes(i) ? 1 : 0,
                }}
              />
            ))}
          </g>
        </svg>

        {/* Cyber Decrypting Name Text */}
        <div className="intro__name">
          {displayName.split('').map((ch, i) => {
            const isCipher = GLYPHS.includes(ch);
            return (
              <span
                key={i}
                className={isCipher ? 'intro__letter-cipher' : 'intro__letter-normal'}
              >
                {ch}
              </span>
            );
          })}
        </div>

        {/* Minimalist Dashboard status logs and percentage scanner */}
        <div
          className={`intro__status-panel ${
            phase !== 'singularity' ? 'intro__status-panel--visible' : ''
          }`}
        >
          {consoleLogs.slice(-2).map((log, index) => (
            <div
              key={index}
              className={`intro__status-line ${
                log.highlight ? 'intro__status-line--highlight' : ''
              } ${log.accent ? 'intro__status-line--accent' : ''}`}
            >
              <span>{log.text}</span>
              <span>{percentage}%</span>
            </div>
          ))}

          {/* Micro progress line */}
          <div className="intro__bar-wrap">
            <div className="intro__bar" style={{ width: `${percentage}%` }} />
          </div>
        </div>

        {/* Entry Interactive Gate Trigger */}
        <div
          className={`intro__gate-btn-container ${
            phase === 'ready' ? 'intro__gate-btn-container--visible' : ''
          }`}
        >
          <button className="intro__gate-btn" onClick={triggerWarp}>
            Initialize Neural Link
          </button>
        </div>
      </div>

      {/* Warp background wipe */}
      <div className="intro__curtain-wipe" />
    </div>
  );
}
