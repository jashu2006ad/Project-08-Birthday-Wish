import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import StarBackground from '../components/StarBackground';
import FloatingHearts from '../components/FloatingHearts';
import { HER_NAME, BIRTHDAY_DATE } from '../data/content';

function pad(n) { return String(n).padStart(2,'0'); }
function getTimeLeft() {
  const diff = BIRTHDAY_DATE - new Date();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  };
}

export default function BirthdayCelebration({ onContinue }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  useEffect(() => { const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000); return () => clearInterval(id); }, []);
  const isBirthday = timeLeft === null;

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 20px', position:'relative', overflow:'hidden' }}>
      <StarBackground />
      <FloatingHearts count={16} />

      {/* Pink aurora */}
      <div aria-hidden="true" style={{ position:'fixed', top:'15%', left:'50%', transform:'translateX(-50%)', width:'800px', height:'600px', background:'radial-gradient(ellipse, rgba(255,45,120,0.18) 0%, rgba(196,23,82,0.08) 40%, transparent 70%)', pointerEvents:'none', zIndex:0 }} />
      <div aria-hidden="true" style={{ position:'fixed', bottom:0, left:0, width:'400px', height:'400px', background:'radial-gradient(ellipse at bottom left, rgba(255,91,160,0.1) 0%, transparent 60%)', pointerEvents:'none', zIndex:0 }} />

      <div style={{ width:'100%', maxWidth:'680px', textAlign:'center', position:'relative', zIndex:1 }}>
        {isBirthday ? (
          <>
            <motion.div initial={{ opacity:0, scale:0.5 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.1, type:'spring', stiffness:120 }} style={{ marginBottom:'24px' }}>
              <span style={{ fontSize:'4rem' }}>🎂</span>
            </motion.div>
            <motion.p
              style={{ fontFamily:'var(--font-script)', fontSize:'clamp(1.2rem,3vw,1.8rem)', color:'var(--pink-vivid)', marginBottom:'12px', textShadow:'0 0 20px rgba(255,91,160,0.5)' }}
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.25 }}
            >
              Today is your special day ✨
            </motion.p>
            <motion.h1
              style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2.2rem,7vw,4.5rem)', color:'var(--white)', lineHeight:1.1, marginBottom:'8px', fontWeight:700 }}
              initial={{ scale:0.7, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ delay:0.4, type:'spring', stiffness:100 }}
            >
              Happy Birthday,
            </motion.h1>
            <motion.h1
              style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:'clamp(2.2rem,7vw,4.5rem)', lineHeight:1.1, marginBottom:'32px', fontWeight:700,
                background:'linear-gradient(135deg, var(--pink-hot), var(--pink-soft), var(--pink-vivid))',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
                textShadow:'none', filter:'drop-shadow(0 0 20px rgba(255,45,120,0.5))' }}
              initial={{ scale:0.7, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ delay:0.55, type:'spring', stiffness:100 }}
            >
              {HER_NAME} 💕
            </motion.h1>
            <div className="pink-divider" style={{ marginBottom:'28px' }} />
            <motion.p style={{ fontFamily:'var(--font-body)', fontSize:'1.05rem', color:'var(--white-dim)', lineHeight:1.8, maxWidth:'480px', margin:'0 auto 44px' }} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.75 }}>
              Your answers have been saved 💕 Now let's celebrate you — exactly as you deserve!
            </motion.p>
            <motion.button className="btn-primary" style={{ fontSize:'1rem', padding:'16px 48px' }} onClick={onContinue} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9 }} id="btn-continue-celebration">
              <Sparkles size={18} /> Continue Your Surprise
            </motion.button>
          </>
        ) : (
          <>
            <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
              <span style={{ fontSize:'3rem' }}>💌</span>
              <p style={{ fontFamily:'var(--font-script)', fontSize:'clamp(1.2rem,3vw,1.8rem)', color:'var(--pink-vivid)', marginTop:'12px', marginBottom:'16px' }}>
                Your answers are safely saved ✨
              </p>
              <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.6rem,5vw,3rem)', color:'var(--white)', marginBottom:'12px', lineHeight:1.2 }}>
                The surprise unlocks in...
              </h1>
              <p style={{ fontFamily:'var(--font-body)', color:'var(--white-muted)', marginBottom:'44px' }}>
                Come back on <strong style={{ color:'var(--pink-soft)' }}>28 October 2026</strong> for your full birthday celebration 🎂
              </p>
            </motion.div>

            {/* Countdown */}
            <motion.div
              style={{ display:'flex', justifyContent:'center', gap:'clamp(12px,4vw,36px)', marginBottom:'52px' }}
              initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
            >
              {[{value:timeLeft.days,label:'Days'},{value:timeLeft.hours,label:'Hours'},{value:timeLeft.minutes,label:'Mins'},{value:timeLeft.seconds,label:'Secs'}].map(({value,label}) => (
                <div key={label} style={{ textAlign:'center' }}>
                  <div style={{ background:'rgba(255,45,120,0.1)', border:'1px solid rgba(255,91,160,0.3)', borderRadius:'16px', padding:'16px 20px', marginBottom:'8px', backdropFilter:'blur(10px)', minWidth:'70px' }}>
                    <span className="countdown-digit">{pad(value)}</span>
                  </div>
                  <span className="countdown-label">{label}</span>
                </div>
              ))}
            </motion.div>

            <motion.button className="btn-primary" onClick={onContinue} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }} id="btn-peek-surprise">
              <Heart size={16} fill="rgba(255,255,255,0.4)" /> Peek at the Surprise
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}
