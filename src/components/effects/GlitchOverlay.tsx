import { useEffect, useRef, useState } from 'react';

interface GlitchOverlayProps {
  active: boolean;
  duration?: number;
  onComplete?: () => void;
}

export default function GlitchOverlay({ active, duration = 2200, onComplete }: GlitchOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!active) {
      setShouldRender(false);
      return;
    }
    setShouldRender(true);

    const timer = setTimeout(() => {
      setShouldRender(false);
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animRef.current);
    };
  }, [active, duration, onComplete]);

  useEffect(() => {
    if (!shouldRender) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);
    startRef.current = performance.now();

    const ERROR_MESSAGES = [
      'SYSTEM_CORRUPT: DATA_STREAM_INTERRUPT',
      'WARNING: VOLTAGE LOCK FAILURE',
      'CRC_CHECK: ERROR [0x00A3]',
      'SIGNAL_LOSS: -48.2 dB',
      'JARVIS: UPLINK FLICKER',
      'ALERT: BUFFER OVERRUN',
      'DECRYPT_FAIL: SYNTACTIC KEY INVALID'
    ];

    function draw(time: number) {
      if (!ctx || !canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // ── 1. Apply physical Screen Shake Jitter to the container ──
      const shakeChance = Math.random();
      if (shakeChance > 0.35) {
        const shakeX = (Math.random() - 0.5) * 14;
        const shakeY = (Math.random() - 0.5) * 14;
        container.style.transform = `translate(${shakeX}px, ${shakeY}px)`;
      } else {
        container.style.transform = 'translate(0px, 0px)';
      }

      // ── 2. Full-Screen Volumetric Signal Noise / Tint ──
      if (Math.random() > 0.72) {
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0, 229, 255, 0.05)' : 'rgba(255, 0, 127, 0.05)';
        ctx.fillRect(0, 0, w, h);
      }

      // ── 3. High-Frequency Horizontal Jitter Bars (Digital Glitch Slices) ──
      const sliceCount = 8 + Math.floor(Math.random() * 12);
      for (let i = 0; i < sliceCount; i++) {
        const sliceH = 2 + Math.floor(Math.random() * 32);
        const sliceY = Math.random() * h;
        const sliceXOffset = (Math.random() - 0.5) * 70;
        
        // Random neon color for each horizontal slice
        const colors = [
          'rgba(0, 229, 255, 0.28)',  // Neon Cyan
          'rgba(255, 0, 127, 0.24)',  // Neon Pink/Magenta
          'rgba(251, 191, 36, 0.30)', // Cyber Gold
          'rgba(184, 71, 255, 0.22)'  // Cyber Purple
        ];
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

        // Sometimes draw solid blocks, sometimes draw digital line segments
        if (Math.random() > 0.45) {
          ctx.fillRect(
            Math.random() * (w * 0.3) + sliceXOffset, 
            sliceY, 
            w * (0.1 + Math.random() * 0.65), 
            sliceH
          );
        } else {
          // Draw thin high-voltage horizontal trace lines
          ctx.beginPath();
          ctx.moveTo(0, sliceY);
          ctx.lineTo(w, sliceY + (Math.random() - 0.5) * 6);
          ctx.strokeStyle = ctx.fillStyle;
          ctx.lineWidth = 1 + Math.random() * 2.5;
          ctx.stroke();
        }
      }

      // ── 4. CRT Horizontal Scanlines ──
      ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
      const scanlineSpacing = 6;
      for (let y = 0; y < h; y += scanlineSpacing) {
        ctx.fillRect(0, y, w, 1.2);
      }

      // ── 5. Dynamic Digital "Snow" Static Bands ──
      const staticBandY = (time * 0.3) % (h * 1.5) - (h * 0.25);
      const bandH = 90;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      for (let i = 0; i < 50; i++) {
        const py = staticBandY + (Math.random() - 0.5) * bandH;
        const px = Math.random() * w;
        const pSize = 1 + Math.random() * 2.5;
        ctx.fillRect(px, py, pSize, pSize);
      }

      // ── 6. Monospace Diagnostic System Warnings ──
      if (Math.random() > 0.7) {
        const errorText = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];
        ctx.font = '600 12px "Share Tech Mono", monospace';
        ctx.fillStyle = Math.random() > 0.5 ? '#00e5ff' : '#ff007f';
        ctx.shadowBlur = 6;
        ctx.shadowColor = ctx.fillStyle;
        
        const tx = 40 + Math.random() * (w - 380);
        const ty = 50 + Math.random() * (h - 100);
        
        ctx.fillText(errorText, tx, ty);
        
        // Draw decorative bracket HUD outlines around the error text
        const textWidth = ctx.measureText(errorText).width;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Left bracket
        ctx.moveTo(tx - 6, ty - 12);
        ctx.lineTo(tx - 12, ty - 12);
        ctx.lineTo(tx - 12, ty + 4);
        ctx.lineTo(tx - 6, ty + 4);
        // Right bracket
        ctx.moveTo(tx + textWidth + 6, ty - 12);
        ctx.lineTo(tx + textWidth + 12, ty - 12);
        ctx.lineTo(tx + textWidth + 12, ty + 4);
        ctx.lineTo(tx + textWidth + 6, ty + 4);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // ── 7. Horizontal analog CRT tear displacement ──
      if (Math.random() > 0.88) {
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillRect(0, Math.random() * h, w, 2);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      if (container) {
        container.style.transform = 'translate(0px, 0px)';
      }
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden transition-all duration-75"
    >
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
    </div>
  );
}
