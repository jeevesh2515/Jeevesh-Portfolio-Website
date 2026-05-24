import { useRef, useEffect } from 'react';

interface ArcReactorPulseProps {
  active: boolean;
  onComplete?: () => void;
}

export default function ArcReactorPulse({ active, onComplete }: ArcReactorPulseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.opacity = '1';

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    let startTime = Date.now();

    function draw() {
      if (!ctx || !canvas) return;
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / 3, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background flash
      ctx.fillStyle = `rgba(0, 240, 255, ${0.15 * (1 - progress)})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Expanding rings
      for (let i = 0; i < 5; i++) {
        const ringProgress = Math.max(0, Math.min(1, (progress - i * 0.1) * 2));
        const radius = ringProgress * Math.max(canvas.width, canvas.height) * 0.6;
        const alpha = 1 - ringProgress;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = i % 2 === 0
          ? `rgba(251, 191, 36, ${alpha * 0.6})`
          : `rgba(0, 240, 255, ${alpha * 0.5})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Central glow
      const glowRadius = 50 + progress * 100;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
      gradient.addColorStop(0, `rgba(251, 191, 36, ${0.8 * (1 - progress)})`);
      gradient.addColorStop(0.3, `rgba(0, 240, 255, ${0.4 * (1 - progress)})`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Core
      const coreSize = 20 + Math.sin(elapsed * 10) * 10;
      ctx.beginPath();
      ctx.arc(cx, cy, coreSize, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.shadowBlur = 60;
      ctx.shadowColor = '#fbbf24';
      ctx.fill();
      ctx.shadowBlur = 0;

      if (progress < 1) {
        animRef.current = requestAnimationFrame(draw);
      } else {
        canvas.style.opacity = '0';
        setTimeout(() => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          onComplete?.();
        }, 500);
      }
    }

    animRef.current = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animRef.current);
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-500"
    />
  );
}
