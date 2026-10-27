import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Heart } from 'lucide-react';
import StarBackground from '../components/StarBackground';
import FloatingHearts from '../components/FloatingHearts';
import { photos } from '../data/content';

function PhotoCard({ photo, index, onClick }) {
  const rotations = [-2.5, 1.8, -1.5, 2.2];
  const rot = rotations[index % rotations.length];
  return (
    <motion.div
      className="polaroid"
      style={{ transform: `rotate(${rot}deg)`, cursor:'pointer' }}
      initial={{ opacity:0, y:60, rotate: rot }}
      animate={{ opacity:1, y:0 }}
      transition={{ delay: index * 0.12, duration:0.7, ease:[0.22,1,0.36,1] }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View: ${photo.caption}`}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      whileHover={{ scale:1.05, rotate:0, zIndex:10 }}
    >
      <div style={{ position:'relative', overflow:'hidden', aspectRatio:'3/4' }}>
        <img
          src={`/photos/${photo.src}`}
          alt={photo.caption}
          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
        />
        {/* Pink overlay on hover */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(255,45,120,0.15), transparent)', opacity:0.6 }} />
      </div>
      <p className="polaroid-caption">{photo.caption}</p>
    </motion.div>
  );
}

export default function PhotoGallery({ onContinue }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ minHeight:'100vh', padding:'60px 20px 80px', position:'relative' }}>
      <StarBackground />
      <FloatingHearts count={8} />

      {/* Top glow */}
      <div aria-hidden="true" style={{ position:'fixed', top:0, left:'50%', transform:'translateX(-50%)', width:'600px', height:'350px', background:'radial-gradient(ellipse at top, rgba(255,45,120,0.15) 0%, transparent 70%)', pointerEvents:'none', zIndex:0 }} />

      <div style={{ maxWidth:'960px', margin:'0 auto', position:'relative', zIndex:1 }}>

        {/* Header */}
        <motion.div style={{ textAlign:'center', marginBottom:'60px' }} initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'8px 20px', background:'rgba(255,45,120,0.1)', border:'1px solid rgba(255,91,160,0.3)', borderRadius:'60px', marginBottom:'20px' }}>
            <Camera size={14} color="var(--pink-vivid)" />
            <span style={{ fontFamily:'var(--font-body)', fontSize:'0.75rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--pink-soft)' }}>Our Little Universe</span>
          </div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(2rem,6vw,3.5rem)', marginBottom:'12px', lineHeight:1.15,
            background:'linear-gradient(135deg, var(--white) 0%, var(--pink-soft) 60%, var(--pink-vivid) 100%)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            A Gallery of You
          </h1>
          <div className="pink-divider" style={{ marginBottom:'16px' }} />
          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.95rem', color:'var(--white-muted)', maxWidth:'380px', margin:'0 auto' }}>
            Tap any photo to see it full-size ✨
          </p>
        </motion.div>

        {/* Scattered polaroid grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'40px 32px', alignItems:'start', justifyItems:'center' }}>
          {photos.map((photo, idx) => (
            <PhotoCard key={photo.id} photo={photo} index={idx} onClick={() => setSelected(photo)} />
          ))}
        </div>

        {/* Hearts row */}
        <motion.div style={{ textAlign:'center', marginTop:'56px', fontSize:'1.5rem', letterSpacing:'12px' }} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}>
          🌸 💕 🌷 💖 🌺
        </motion.div>

        {/* Continue */}
        <motion.div style={{ textAlign:'center', marginTop:'32px' }} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}>
          <button className="btn-primary" onClick={onContinue} id="btn-gallery-continue" style={{ padding:'15px 44px' }}>
            <Heart size={16} fill="rgba(255,255,255,0.4)" /> Continue
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            style={{ position:'fixed', inset:0, background:'rgba(15,5,10,0.95)', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', zIndex:200 }}
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              style={{ maxWidth:'480px', width:'90%' }}
              initial={{ scale:0.82, opacity:0, y:30 }}
              animate={{ scale:1, opacity:1, y:0 }}
              exit={{ scale:0.82, opacity:0 }}
              transition={{ type:'spring', stiffness:220, damping:22 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="polaroid">
                <div style={{ position:'relative', overflow:'hidden', aspectRatio:'3/4', maxHeight:'65vh' }}>
                  <img src={`/photos/${selected.src}`} alt={selected.caption} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(255,45,120,0.15), transparent)' }} />
                </div>
                <p className="polaroid-caption" style={{ fontSize:'1rem', padding:'0 4px' }}>{selected.caption}</p>
              </div>
            </motion.div>
            <button
              onClick={() => setSelected(null)}
              aria-label="Close photo"
              style={{ position:'fixed', top:'20px', right:'20px', background:'rgba(255,45,120,0.2)', border:'1px solid rgba(255,91,160,0.4)', borderRadius:'50%', width:'44px', height:'44px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'white', backdropFilter:'blur(8px)' }}
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
