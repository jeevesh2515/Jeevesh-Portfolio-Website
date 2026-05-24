import { useRef, useEffect } from 'react';

interface MatrixRainProps {
  active: boolean;
  duration?: number;
  onComplete?: () => void;
}

export default function MatrixRain({ active, duration = 3000, onComplete }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.opacity = '1';

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*'.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#fbbf24';
      ctx.font = fontSize + 'px "Share Tech Mono"';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    intervalRef.current = setInterval(draw, 33);

    const timer = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      canvas.style.opacity = '0';
      setTimeout(() => {
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        onComplete?.();
      }, 500);
    }, duration);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, duration, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-500"
      style={{ background: 'rgba(0,0,0,0.8)' }}
    />
  );
}
