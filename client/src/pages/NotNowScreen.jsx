import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import StarBackground from '../components/StarBackground';

export default function NotNowScreen({ onReturn }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative' }}>
      <StarBackground />
      <motion.div
        className="content-box glass-card"
        style={{ padding: '52px 44px', textAlign: 'center', position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '24px' }}>💛</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--warm-ivory)', marginBottom: '16px' }}>
          No worries at all.
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--warm-ivory-dim)', lineHeight: 1.75, marginBottom: '36px' }}>
          Whenever you're ready, your birthday surprise will be right here waiting for you. 🌙
        </p>
        <button
          className="btn-primary"
          onClick={onReturn}
          id="btn-return-welcome"
        >
          <Heart size={16} />
          Take me back
        </button>
      </motion.div>
    </div>
  );
}
