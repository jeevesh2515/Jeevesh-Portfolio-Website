import { useRef, useEffect } from 'react';

export default function DataFluxBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const particles: HTMLDivElement[] = [];
    const count = 40;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.style.position = 'absolute';
      p.style.borderRadius = '50%';
      p.style.pointerEvents = 'none';

      const size = Math.random() * 3 + 1;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = '50%';
      p.style.top = '50%';

      const isGold = Math.random() > 0.6;
      p.style.background = isGold ? '#fbbf24' : '#00f0ff';
      p.style.boxShadow = isGold
        ? '0 0 5px #fbbf24, 0 0 10px #fbbf24'
        : '0 0 5px #00f0ff, 0 0 10px #00f0ff';

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 800 + 200;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      const duration = Math.random() * 10 + 5;
      const delay = Math.random() * 10;

      p.style.setProperty('--tx', `${tx}px`);
      p.style.setProperty('--ty', `${ty}px`);
      p.style.setProperty('--duration', `${duration}s`);
      p.style.setProperty('--delay', `${delay}s`);
      p.style.animation = `flux ${duration}s ease-out ${delay}s infinite`;

      container.appendChild(p);
      particles.push(p);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
}
