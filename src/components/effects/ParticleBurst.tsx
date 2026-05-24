import { useRef, useEffect } from 'react';

interface ParticleBurstProps {
  active: boolean;
  onComplete?: () => void;
}

export default function ParticleBurst({ active, onComplete }: ParticleBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.opacity = '1';

    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; color: string; alpha: number; life: number;
    }[] = [];

    const colors = ['#fbbf24', '#00f0ff', '#39ff14', '#b847ff', '#ffe1a7'];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Create particles
    for (let i = 0; i < 200; i++) {
      const angle = (Math.PI * 2 * i) / 200 + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 15 + 5;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 1,
      });
    }

    let frame = 0;
    const maxFrames = 120;

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = 0;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= 0.008;
        p.alpha = Math.max(0, p.life);

        if (p.life > 0) {
          alive++;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      frame++;
      if (frame < maxFrames && alive > 0) {
        requestAnimationFrame(animate);
      } else {
        canvas.style.opacity = '0';
        setTimeout(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          onComplete?.();
        }, 500);
      }
    }

    requestAnimationFrame(animate);
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-500"
    />
  );
}
