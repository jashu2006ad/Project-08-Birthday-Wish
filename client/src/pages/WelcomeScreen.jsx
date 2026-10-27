import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';
import StarBackground from '../components/StarBackground';
import FloatingHearts from '../components/FloatingHearts';

export default function WelcomeScreen({ onAgree, onDecline }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', position: 'relative', overflow: 'hidden' }}>
      <StarBackground />
      <FloatingHearts count={12} />

      {/* Big background bloom */}
      <div aria-hidden="true" style={{ position: 'fixed', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', background: 'radial-gradient(ellipse, rgba(255,45,120,0.15) 0%, rgba(196,23,82,0.06) 50%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div aria-hidden="true" style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(255,91,160,0.1) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

      <motion.div
        style={{ width: '100%', maxWidth: '560px', position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', background: 'rgba(255,45,120,0.12)', border: '1px solid rgba(255,91,160,0.35)', borderRadius: '60px', backdropFilter: 'blur(10px)' }}>
            <Sparkles size={14} color="var(--pink-vivid)" />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--pink-soft)' }}>
              A Surprise Just For You
            </span>
            <Sparkles size={14} color="var(--pink-vivid)" />
          </div>
        </motion.div>

        {/* Card */}
        <div className="glass-card-dark" style={{ padding: 'clamp(28px,6vw,52px) clamp(20px,6vw,48px)', textAlign: 'center' }}>

          {/* Icon ring */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 180 }}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(255,45,120,0.2), rgba(196,23,82,0.3))', border: '1.5px solid rgba(255,91,160,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(255,45,120,0.35)' }}>
                <Heart size={34} color="var(--pink-hot)" fill="rgba(255,45,120,0.3)" strokeWidth={1.5} />
              </div>
              {/* Orbit dots */}
              {[0,60,120,180,240,300].map((deg,i) => (
                <div key={i} style={{ position: 'absolute', width: 6, height: 6, borderRadius: '50%', background: 'var(--pink-vivid)', top: '50%', left: '50%', transformOrigin: '3px 3px', transform: `rotate(${deg}deg) translateX(46px)`, opacity: 0.6 }} />
              ))}
            </div>
          </motion.div>

          {/* Script heading */}
          <motion.p
            style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(1.4rem,3.5vw,2rem)', color: 'var(--pink-vivid)', marginBottom: '10px', textShadow: '0 0 20px rgba(255,91,160,0.4)' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            Hello, Mounii ✨
          </motion.p>

          <motion.h1
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,4vw,2.3rem)', color: 'var(--white)', marginBottom: '12px', lineHeight: 1.25, fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
          >
            Before your birthday surprise begins...
          </motion.h1>

          <motion.p
            style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--white-dim)', marginBottom: '28px', lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
          >
            I have five little questions for you — your answers will make this day even more special 💕
          </motion.p>

          <div className="pink-divider" style={{ marginBottom: '28px' }} />

          {/* Privacy notice */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            style={{ background: 'rgba(255,45,120,0.07)', border: '1px solid rgba(255,91,160,0.2)', borderRadius: '16px', padding: '18px 20px', marginBottom: '32px', textAlign: 'left' }}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,45,120,0.15)', border: '1px solid rgba(255,91,160,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <ShieldCheck size={16} color="var(--pink-vivid)" />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--pink-soft)', marginBottom: '6px' }}>Privacy Note</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--white-muted)', lineHeight: 1.7, margin: 0 }}>
                  When you submit, your answers will be sent by email to <strong style={{ color: 'var(--white-dim)' }}>kowshikkayala29@gmail.com</strong>. They are not stored in a database. 🔒
                </p>
              </div>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <button className="btn-primary" onClick={onAgree} id="btn-agree-begin" style={{ width: '100%', fontSize: '1rem', padding: '16px' }}>
              <Heart size={17} fill="rgba(255,255,255,0.4)" /> I Understand — Let's Begin!
            </button>
            <button className="btn-outline" onClick={onDecline} id="btn-not-now" style={{ width: '100%' }}>
              Not Now
            </button>
          </motion.div>
        </div>

        {/* Bottom hearts */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.2rem', letterSpacing: '6px' }}
        >
          🌸 💕 🌷 💖 🌺
        </motion.p>
      </motion.div>
    </div>
  );
}
