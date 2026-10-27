import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';
import StarBackground from '../components/StarBackground';
import FloatingHearts from '../components/FloatingHearts';
import { romanticMessages } from '../data/content';

export default function LoveMessages({ onContinue }) {
  const [index, setIndex] = useState(0);
  const isLast = index === romanticMessages.length - 1;

  function next() {
    if (isLast) { onContinue(); return; }
    setIndex(i => i + 1);
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 20px', position:'relative', overflow:'hidden' }}>
      <StarBackground />
      <FloatingHearts count={10} />

      {/* Big bloom */}
      <div aria-hidden="true" style={{ position:'fixed', top:'20%', left:'50%', transform:'translateX(-50%)', width:'700px', height:'600px', background:'radial-gradient(ellipse, rgba(255,45,120,0.14) 0%, rgba(196,23,82,0.06) 45%, transparent 70%)', pointerEvents:'none', zIndex:0 }} />

      <div style={{ width:'100%', maxWidth:'640px', textAlign:'center', position:'relative', zIndex:1 }}>

        {/* Top badge */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ marginBottom:'36px' }}>
          <p style={{ fontFamily:'var(--font-script)', fontSize:'clamp(1.3rem,3vw,1.8rem)', color:'var(--pink-vivid)', textShadow:'0 0 20px rgba(255,91,160,0.4)' }}>
            Things I Want You To Know 💌
          </p>
        </motion.div>

        {/* Message */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity:0, y:50, scale:0.97 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:-30, scale:0.97 }}
            transition={{ duration:0.55, ease:[0.32,0.72,0,1] }}
            style={{ marginBottom:'48px' }}
          >
            {/* Quote card */}
            <div className="glass-card-dark" style={{ padding:'clamp(28px,5vw,48px) clamp(24px,5vw,44px)', position:'relative', overflow:'hidden' }}>
              {/* Decorative corner bloom */}
              <div aria-hidden="true" style={{ position:'absolute', top:-40, right:-40, width:160, height:160, background:'radial-gradient(ellipse, rgba(255,45,120,0.12), transparent)', borderRadius:'50%', pointerEvents:'none' }} />
              <div aria-hidden="true" style={{ position:'absolute', bottom:-40, left:-40, width:120, height:120, background:'radial-gradient(ellipse, rgba(255,91,160,0.08), transparent)', borderRadius:'50%', pointerEvents:'none' }} />

              {/* Big quote mark */}
              <div style={{ fontFamily:'var(--font-display)', fontSize:'5rem', lineHeight:0.7, color:'var(--pink-hot)', opacity:0.18, marginBottom:'24px', userSelect:'none' }}>"</div>

              <p style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:'clamp(1.2rem,3.2vw,1.9rem)', color:'var(--white)', lineHeight:1.55, position:'relative', zIndex:1 }}>
                {romanticMessages[index].text}
              </p>

              <div style={{ marginTop:'24px', display:'flex', justifyContent:'center' }}>
                <div className="pink-divider" style={{ width:'50px' }} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div style={{ display:'flex', justifyContent:'center', gap:'8px', marginBottom:'36px' }}>
          {romanticMessages.map((_,i) => (
            <div key={i} style={{ width: i===index ? 22 : 7, height:7, borderRadius:4, background: i===index ? 'var(--pink-hot)' : 'rgba(255,91,160,0.2)', transition:'all 0.4s ease', boxShadow: i===index ? '0 0 8px rgba(255,45,120,0.6)' : 'none' }} />
          ))}
        </div>

        <motion.button
          className="btn-primary"
          onClick={next}
          id="btn-next-message"
          style={{ padding:'15px 44px', fontSize:'1rem' }}
          whileHover={{ scale:1.04 }}
          whileTap={{ scale:0.97 }}
        >
          {isLast ? <><Heart size={16} fill="rgba(255,255,255,0.4)" /> Continue</> : <>Next <ChevronRight size={16} /></>}
        </motion.button>
      </div>
    </div>
  );
}
