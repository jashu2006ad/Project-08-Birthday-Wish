import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Send, CheckCircle2, Edit3 } from 'lucide-react';
import StarBackground from '../components/StarBackground';
import { submitAnswers } from '../services/api';

const QUESTIONS = [
  { id:1, key:'question1', text:'When was our first met?', type:'textarea', maxLength:1000, emoji:'💫' },
  { id:2, key:'question2', text:'When was our friends gathered date?', type:'textarea', maxLength:1000, emoji:'🗓️' },
  { id:3, key:'question3', text:'What is your favourite memory with me?', type:'textarea', maxLength:1000, emoji:'💕' },
  { id:4, key:'question4', text:"What's the most embarrassing thing you've done in front of me?", type:'textarea', maxLength:1000, emoji:'😳' },
  { id:5, key:'question5', text:"What's one gift you've always wanted but never received?", type:'textarea', maxLength:1000, emoji:'🎁' },
  { id:6, key:'question6', text:'What do you wish our friendship will look like five years from now?', type:'textarea', maxLength:1000, emoji:'🌱' },
  { id:7, key:'question7', text:'If you could celebrate your birthday anywhere in the world, where would you go?', type:'textarea', maxLength:1000, emoji:'🌍' },
  { id:8, key:'question8', text:"What's one thing you wish for yourself this year?", type:'textarea', maxLength:1000, emoji:'✨' },
  { id:9, key:'question9', text:'Have I ever hurt you without realizing it?', type:'textarea', maxLength:1000, emoji:'💌' },
  { id:10, key:'question10', text:'When was our last meet?', type:'textarea', maxLength:1000, emoji:'📸' },
];

const slide = {
  enter: d => ({ x: d > 0 ? 70 : -70, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   d => ({ x: d > 0 ? -70 : 70, opacity: 0 }),
};

export default function QuestionForm({ onSuccess }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState(() => Object.fromEntries(QUESTIONS.map(({ key }) => [key, ''])));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const isReview = current === QUESTIONS.length;
  const q = QUESTIONS[current];
  const progress = isReview ? 100 : ((current + 1) / QUESTIONS.length) * 100;

  function validate(idx) {
    const key = QUESTIONS[idx].key;
    if (!answers[key] || !answers[key].trim()) {
      setErrors(e => ({ ...e, [key]: 'Please share your answer ✨' }));
      return false;
    }
    setErrors(e => ({ ...e, [key]: '' }));
    return true;
  }

  function goNext() {
    if (isReview) return;
    if (!validate(current)) return;
    setDirection(1); setCurrent(c => c + 1);
  }

  function goPrev() {
    if (current === 0) return;
    setDirection(-1); setCurrent(c => c - 1);
  }

  async function handleSubmit() {
    if (submitting) return;
    setSubmitError('');
    setSubmitting(true);
    try {
      await submitAnswers(answers);
      onSuccess();
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong while emailing your answers. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'32px 16px', position:'relative' }}>
      <StarBackground />

      {/* Top glow */}
      <div aria-hidden="true" style={{ position:'fixed', top:0, left:'50%', transform:'translateX(-50%)', width:'600px', height:'300px', background:'radial-gradient(ellipse at top, rgba(255,45,120,0.12) 0%, transparent 70%)', pointerEvents:'none', zIndex:0 }} />

      <div style={{ width:'100%', maxWidth:'600px', position:'relative', zIndex:1 }}>

        {/* Header */}
        <motion.div style={{ textAlign:'center', marginBottom:'28px' }} initial={{ opacity:0 }} animate={{ opacity:1 }}>
          <p style={{ fontFamily:'var(--font-script)', fontSize:'1.4rem', color:'var(--pink-vivid)', marginBottom:'8px' }}>
            {isReview ? '📝 Review Your Answers' : `${q.emoji} Question ${q.id} of ${QUESTIONS.length}`}
          </p>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'10px' }}>
            <div className="progress-bar" style={{ flex:1 }}>
              <motion.div className="progress-fill" style={{ width:`${progress}%` }} layout />
            </div>
            <span style={{ fontFamily:'var(--font-body)', fontSize:'0.75rem', color:'var(--pink-soft)', minWidth:'32px', textAlign:'right' }}>{Math.round(progress)}%</span>
          </div>
          {/* Step dots */}
          <div style={{ display:'flex', justifyContent:'center', gap:'8px' }}>
            {QUESTIONS.map((_,i) => (
              <div key={i} style={{ width: i === current ? 20 : 8, height:8, borderRadius:4, background: i < current ? 'var(--pink-hot)' : i === current ? 'var(--pink-vivid)' : 'rgba(255,91,160,0.2)', transition:'all 0.4s ease', boxShadow: i === current ? '0 0 8px rgba(255,45,120,0.6)' : 'none' }} />
            ))}
          </div>
        </motion.div>

        {/* Card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={isReview ? 'review' : current}
            className="glass-card-dark"
            style={{ padding:'clamp(24px,5vw,40px) clamp(20px,5vw,40px)' }}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration:0.32, ease:[0.32,0.72,0,1] }}
          >
            {isReview
              ? <ReviewPanel answers={answers} onEdit={idx => { setDirection(-1); setCurrent(idx); }} />
              : <QuestionPanel q={q} answers={answers} setAnswers={setAnswers} errors={errors} setErrors={setErrors} />
            }
          </motion.div>
        </AnimatePresence>

        {submitError && (
          <motion.div className="error-banner" initial={{ opacity:0 }} animate={{ opacity:1 }}>
            {submitError}
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div
          style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'20px', gap:'12px' }}
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
        >
          <button
            className="btn-outline"
            onClick={goPrev}
            disabled={current === 0}
            style={{ opacity: current === 0 ? 0.3 : 1 }}
            id="btn-prev-question"
          >
            <ChevronLeft size={16} /> Back
          </button>

          {isReview ? (
            <button className="btn-primary" onClick={handleSubmit} disabled={submitting} id="btn-submit-answers">
              {submitting ? (<><span className="spinner" /> Saving…</>) : (<><Send size={16} /> Submit Answers</>)}
            </button>
          ) : (
            <button className="btn-primary" onClick={goNext} id="btn-next-question">
              {current === QUESTIONS.length - 1 ? 'Review ✨' : 'Next'} <ChevronRight size={16} />
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function QuestionPanel({ q, answers, setAnswers, errors, setErrors }) {
  const val = answers[q.key];
  const err = errors[q.key];
  return (
    <>
      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
        <div style={{ width:44, height:44, borderRadius:'50%', background:'rgba(255,45,120,0.12)', border:'1px solid rgba(255,91,160,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', flexShrink:0 }}>
          {q.emoji}
        </div>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.1rem,3vw,1.6rem)', color:'var(--white)', lineHeight:1.3, fontWeight:600 }}>
          {q.text}
        </h2>
      </div>

      {q.type === 'textarea' && (
        <>
          <textarea
            className={`input-field${err ? ' error' : ''}`}
            rows={5}
            maxLength={q.maxLength}
            value={val}
            onChange={e => { setAnswers(a => ({...a, [q.key]: e.target.value})); if(err) setErrors(er => ({...er, [q.key]:''})); }}
            placeholder="Share your thoughts here..."
            aria-label={q.text}
            id={`textarea-${q.key}`}
          />
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:'8px' }}>
            {err
              ? <p style={{ fontFamily:'var(--font-body)', fontSize:'0.8rem', color:'#ff8888' }}>{err}</p>
              : <span />
            }
            <span style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', color:'rgba(255,179,204,0.4)' }}>{val.length}/{q.maxLength}</span>
          </div>
        </>
      )}

      {q.type === 'choice' && (
        <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
          {q.options.map(opt => (
            <button
              key={opt}
              className={`option-card${val === opt ? ' selected' : ''}`}
              onClick={() => { setAnswers(a => ({...a, [q.key]:opt})); setErrors(er => ({...er, [q.key]:''})); }}
              id={`option-${opt.replace(/\s+/g,'-').toLowerCase()}`}
              aria-pressed={val === opt}
            >
              <div className="option-radio"><div className="option-radio-dot" /></div>
              <span style={{ fontFamily:'var(--font-body)', fontSize:'0.95rem', color:'var(--white)' }}>{opt}</span>
            </button>
          ))}
          {err && <p style={{ fontFamily:'var(--font-body)', fontSize:'0.8rem', color:'#ff8888', marginTop:'4px' }}>{err}</p>}
        </div>
      )}
    </>
  );
}

function ReviewPanel({ answers, onEdit }) {
  return (
    <>
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
        <CheckCircle2 size={22} color="var(--pink-hot)" />
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', color:'var(--white)' }}>Review Your Answers</h2>
      </div>
      <p style={{ fontFamily:'var(--font-body)', fontSize:'0.84rem', color:'var(--white-muted)', marginBottom:'20px', lineHeight:1.6 }}>
        Everything look good? Once you submit, your answers will be emailed to kowshikkayala29@gmail.com. 💕
      </p>
      <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
        {QUESTIONS.map((q,idx) => (
          <div key={q.key} style={{ background:'rgba(255,45,120,0.05)', border:'1px solid rgba(255,91,160,0.15)', borderRadius:'14px', padding:'14px 16px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
              <span style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--pink-vivid)', opacity:0.8 }}>{q.emoji} Q{q.id}</span>
              <button onClick={() => onEdit(idx)} style={{ background:'none', border:'none', color:'var(--pink-soft)', fontSize:'0.75rem', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px', fontFamily:'var(--font-body)' }}>
                <Edit3 size={12} /> Edit
              </button>
            </div>
            <p style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'var(--white-dim)', margin:0, lineHeight:1.6, whiteSpace:'pre-wrap' }}>
              {answers[q.key] || <em style={{ opacity:0.4 }}>No answer</em>}
            </p>
          </div>
        ))}
      </div>
      <div style={{ marginTop:'16px', padding:'12px 16px', background:'rgba(255,45,120,0.07)', border:'1px solid rgba(255,91,160,0.2)', borderRadius:'12px' }}>
        <p style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem', color:'var(--white-muted)', margin:0, lineHeight:1.6 }}>
          ✉️ By submitting, you agree your answers will be sent by email and will not be stored in a database.
        </p>
      </div>
    </>
  );
}
