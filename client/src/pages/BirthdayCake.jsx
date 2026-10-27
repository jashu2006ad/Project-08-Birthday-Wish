import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarBackground from '../components/StarBackground';

const CANDLE_COUNT = 5;

function Particle({ x, y, color }) {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 80 + 40;
  const dx = Math.cos(angle) * speed;
  const dy = Math.sin(angle) * speed - 60;

  return (
    <motion.div
      style={{ position: 'absolute', left: x, top: y, width: 6, height: 6, borderRadius: '50%', background: color, zIndex: 10, pointerEvents: 'none' }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x: dx, y: dy, opacity: 0, scale: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    />
  );
}

const PARTICLE_COLORS = ['#D8B777', '#C9B6E4', '#F3EDE2', '#622A43', '#ffffff', '#FFD700'];

function Candle({ lit, onClick, index }) {
  const colors = ['#D8B777', '#C9B6E4', '#ff8080', '#80d4ff', '#a8e6a3'];
  const color = colors[index % colors.length];

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: lit ? 'pointer' : 'default', userSelect: 'none' }}
      onClick={lit ? onClick : undefined}
      onTouchEnd={lit ? (e) => { e.preventDefault(); onClick(); } : undefined}
      role={lit ? 'button' : undefined}
      aria-label={lit ? `Blow out candle ${index + 1}` : `Candle ${index + 1} out`}
      tabIndex={lit ? 0 : undefined}
      onKeyDown={lit ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {/* Flame */}
      <AnimatePresence>
        {lit && (
          <motion.div
            className="candle-flame"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ width: 14, height: 24, borderRadius: '50% 50% 30% 30%', background: `radial-gradient(ellipse at 50% 80%, #fff 0%, #FFD700 40%, ${color} 70%, transparent 100%)`, filter: 'blur(0.5px)', boxShadow: `0 0 12px 4px ${color}55, 0 0 4px 2px #FFD700`, marginBottom: -2 }}
          />
        )}
      </AnimatePresence>

      {/* Wick */}
      <div style={{ width: 2, height: 8, background: '#333', borderRadius: 1 }} />

      {/* Candle body */}
      <div style={{ width: 18, height: 60, background: `linear-gradient(135deg, ${color}dd, ${color}88)`, borderRadius: '4px 4px 2px 2px', boxShadow: lit ? `0 0 10px ${color}55` : 'none', transition: 'box-shadow 0.4s', border: '1px solid rgba(0,0,0,0.15)' }} />
    </div>
  );
}

function CakeSVG({ candlesLit, onCandleClick }) {
  return (
    <svg viewBox="0 0 320 260" style={{ width: '100%', maxWidth: '320px', overflow: 'visible' }} aria-hidden="true">
      {/* Plate */}
      <ellipse cx="160" cy="248" rx="150" ry="12" fill="rgba(216,183,119,0.15)" />

      {/* Bottom tier */}
      <rect x="30" y="170" width="260" height="75" rx="14" fill="#3D1A2B" />
      <rect x="30" y="170" width="260" height="20" rx="14" fill="#4D2038" />
      {/* Frosting drips */}
      {[55, 95, 135, 175, 215, 255].map((x) => (
        <ellipse key={x} cx={x} cy="170" rx="12" ry="8" fill="#F3EDE2" opacity="0.85" />
      ))}
      {/* Decoration */}
      {[60, 100, 140, 180, 220, 260].map((x, i) => (
        <circle key={i} cx={x} cy="210" r="5" fill={['#D8B777', '#C9B6E4', '#ff8080', '#D8B777', '#C9B6E4', '#ff8080'][i]} opacity="0.9" />
      ))}

      {/* Middle tier */}
      <rect x="60" y="105" width="200" height="70" rx="12" fill="#4D2038" />
      <rect x="60" y="105" width="200" height="18" rx="12" fill="#5C2B45" />
      {/* Frosting drips middle */}
      {[80, 120, 160, 200, 240].map((x) => (
        <ellipse key={x} cx={x} cy="105" rx="10" ry="7" fill="#F3EDE2" opacity="0.85" />
      ))}
      {/* Heart decoration */}
      <text x="160" y="150" textAnchor="middle" fontSize="22" fill="#D8B777" opacity="0.9">❤️</text>

      {/* Top tier */}
      <rect x="100" y="55" width="120" height="55" rx="10" fill="#5C2B45" />
      <rect x="100" y="55" width="120" height="16" rx="10" fill="#6D3352" />
      {/* Frosting drips top */}
      {[115, 145, 175, 205].map((x) => (
        <ellipse key={x} cx={x} cy="55" rx="8" ry="6" fill="#F3EDE2" opacity="0.9" />
      ))}

      {/* Candle slots (foreign objects positioned above top tier) */}
      {Array.from({ length: CANDLE_COUNT }).map((_, i) => {
        const x = 108 + i * 26 - 9;
        return (
          <foreignObject key={i} x={x} y={-55} width="28" height="70">
            <div xmlns="http://www.w3.org/1999/xhtml">
              <Candle lit={candlesLit[i]} onClick={() => onCandleClick(i)} index={i} />
            </div>
          </foreignObject>
        );
      })}
    </svg>
  );
}

export default function BirthdayCake({ onContinue }) {
  const [candlesLit, setCandlesLit] = useState(Array(CANDLE_COUNT).fill(true));
  const [particles, setParticles] = useState([]);
  const [wishMade, setWishMade] = useState(false);
  const [allBlownOut, setAllBlownOut] = useState(false);
  const particleId = useRef(0);
  const cakeRef = useRef(null);

  const blownCount = candlesLit.filter((l) => !l).length;

  function blowOutCandle(index) {
    if (!candlesLit[index]) return;

    // Spawn particles
    const rect = cakeRef.current?.getBoundingClientRect();
    const cakeLeft = rect ? rect.left : 0;
    const cakeTop = rect ? rect.top : 0;
    const relX = 100 + index * 26;
    const relY = 5;
    const newParticles = Array.from({ length: 10 }).map(() => ({
      id: particleId.current++,
      x: relX,
      y: relY,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }));
    setParticles((p) => [...p, ...newParticles]);
    setTimeout(() => setParticles((p) => p.filter((pp) => !newParticles.find((np) => np.id === pp.id))), 1200);

    const next = [...candlesLit];
    next[index] = false;
    setCandlesLit(next);
    if (next.every((l) => !l)) {
      setTimeout(() => setAllBlownOut(true), 400);
    }
  }

  function blowAllOut() {
    if (allBlownOut) return;
    setCandlesLit(Array(CANDLE_COUNT).fill(false));
    const newParticles = Array.from({ length: 25 }).map(() => ({
      id: particleId.current++,
      x: 100 + Math.random() * 120,
      y: -20 + Math.random() * 40,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    }));
    setParticles((p) => [...p, ...newParticles]);
    setTimeout(() => {
      setParticles((p) => p.filter((pp) => !newParticles.find((np) => np.id === pp.id)));
      setAllBlownOut(true);
    }, 1200);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative' }}>
      <StarBackground />

      <div style={{ width: '100%', maxWidth: '500px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.p
          style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--champagne-gold)', marginBottom: '16px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Your Birthday Cake 🎂
        </motion.p>

        <motion.h1
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', color: 'var(--warm-ivory)', marginBottom: '8px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {allBlownOut ? 'Your wish has been made ✨' : 'Make a Wish!'}
        </motion.h1>

        <motion.p
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--warm-ivory-dim)', marginBottom: '44px', lineHeight: 1.6 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {allBlownOut
            ? 'May your wish come true. 💕'
            : blownCount > 0
            ? `${blownCount} of ${CANDLE_COUNT} candles blown out... keep going!`
            : 'Tap each candle to blow it out, or use the button below.'}
        </motion.p>

        {/* Cake */}
        <motion.div
          ref={cakeRef}
          style={{ position: 'relative', display: 'inline-block', marginBottom: '48px' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
        >
          <CakeSVG candlesLit={candlesLit} onCandleClick={blowOutCandle} />
          {/* Particles overlay */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {particles.map((p) => (
              <Particle key={p.id} x={p.x} y={p.y} color={p.color} />
            ))}
          </div>
        </motion.div>

        {/* Make a wish button */}
        {!allBlownOut && (
          <motion.div style={{ marginBottom: '24px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <button className="btn-rose" onClick={blowAllOut} id="btn-make-wish">
              🎂 Make a Wish — Blow them all out!
            </button>
          </motion.div>
        )}

        {/* Continue */}
        <AnimatePresence>
          {allBlownOut && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button className="btn-primary" style={{ fontSize: '1rem', padding: '14px 40px' }} onClick={onContinue} id="btn-cake-continue">
                Continue ✨
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
