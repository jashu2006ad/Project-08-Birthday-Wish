import { useEffect, useRef } from 'react';

export default function StarBackground() {
  const containerRef = useRef(null);
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    c.innerHTML = '';
    for (let i = 0; i < 130; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const sz = Math.random() * 2.5 + 0.5;
      s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;--duration:${Math.random()*4+2}s;--delay:${Math.random()*6}s;`;
      c.appendChild(s);
    }
  }, []);
  return <div ref={containerRef} className="stars-bg" aria-hidden="true" />;
}
