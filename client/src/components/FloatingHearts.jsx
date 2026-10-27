import { useEffect, useRef } from 'react';

const HEARTS = ['🌸', '💕', '💗', '🌷', '💖', '🌺', '💓', '✿'];

export default function FloatingHearts({ count = 10 }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    c.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const h = document.createElement('span');
      h.className = 'floating-heart';
      h.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      h.style.cssText = `
        left:${Math.random()*95}%;
        --duration:${Math.random()*7+7}s;
        --delay:${Math.random()*9}s;
        --size:${Math.random()*14+10}px;
        font-size:${Math.random()*14+10}px;
        opacity:${Math.random()*0.3+0.15};
      `;
      c.appendChild(h);
    }
  }, [count]);
  return <div ref={ref} aria-hidden="true" style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0 }} />;
}
