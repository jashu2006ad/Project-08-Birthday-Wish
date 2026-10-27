import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';
import StarBackground from '../components/StarBackground';
import FloatingHearts from '../components/FloatingHearts';
import { HER_NAME, finalLetter } from '../data/content';

export default function FinalMessage({ onReplay }) {
  const [showLetter, setShowLetter] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', position: 'relative' }}>
      <StarBackground />
      <FloatingHearts count={14} />

      {/* Deep glow */}
      <div aria-hidden="true" style={{ position: 'fixed', top: '25%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(98,42,67,0.15) 0%, rgba(216,183,119,0.05) 50%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ width: '100%', maxWidth: '660px', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Stars decoration */}
        <motion.div
          style={{ fontSize: '2rem', marginBottom: '28px', letterSpacing: '12px', opacity: 0.6 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5 }}
        >
          ✦ ✦ ✦
        </motion.div>

        <motion.p
          style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--champagne-gold)', marginBottom: '20px' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          A Message For You
        </motion.p>

        <motion.h1
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 5vw, 3rem)', color: 'var(--warm-ivory)', marginBottom: '20px', lineHeight: 1.2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          If there's one thing I hope you remember today, it's how special you are to me.
        </motion.h1>

        <div className="gold-divider" style={{ margin: '28px auto' }} />

        <motion.p
          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: 'var(--champagne-gold)', marginBottom: '32px', lineHeight: 1.5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Happy Birthday, {HER_NAME}. ❤️
        </motion.p>

        {/* Toggle letter */}
        {!showLetter ? (
          <motion.button
            className="btn-ghost"
            onClick={() => setShowLetter(true)}
            style={{ marginBottom: '48px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            id="btn-show-letter"
          >
            Read the full letter ↓
          </motion.button>
        ) : (
          <motion.div
            className="glass-card"
            style={{ padding: '36px 32px', marginBottom: '48px', textAlign: 'left' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.6 }}
          >
            <p
              style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: 'var(--warm-ivory)', lineHeight: 1.9, whiteSpace: 'pre-line' }}
            >
              {finalLetter}
            </p>
          </motion.div>
        )}

        {/* Replay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ delay: i * 0.2, duration: 1.5, repeat: Infinity }}
                style={{ color: 'var(--champagne-gold)', fontSize: '1.1rem' }}
              >
                ♥
              </motion.div>
            ))}
          </div>

          <button
            className="btn-ghost"
            onClick={onReplay}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            id="btn-replay-surprise"
          >
            <RotateCcw size={15} />
            Replay Your Surprise
          </button>
        </motion.div>
      </div>
    </div>
  );
}
