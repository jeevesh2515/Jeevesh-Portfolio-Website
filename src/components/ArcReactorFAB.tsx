import { useEffect, useRef } from 'react';

/**
 * ArcReactorFAB — A miniature revolving arc reactor matching the main Tony Stark design.
 * Renders a small canvas with a central inverted triangle, 10-segmented outer ring,
 * and a pulsing core in cyan/light-blue translucent tones.
 */
interface ArcReactorFABProps {
  onClick: () => void;
  size?: number;
}

export default function ArcReactorFAB({ onClick, size = 68 }: ArcReactorFABProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    startRef.current = performance.now();

    // ── Color palette ──
    const CORE_CYAN = '#00e5ff';
    const ICE_WHITE = '#e0f7ff';
    const DARK_STRUCT = '#0a2a3a';

    function drawOuterHalo(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, t: number) {
      const glowGrad = ctx.createRadialGradient(cx, cy, r * 0.4, cx, cy, r * 1.25);
      glowGrad.addColorStop(0, `rgba(0, 229, 255, ${0.2 + 0.08 * Math.sin(t * 2.5)})`);
      glowGrad.addColorStop(0.6, `rgba(0, 180, 220, ${0.05 + 0.03 * Math.sin(t * 1.5)})`);
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.25, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawSegmentedRing(
      ctx: CanvasRenderingContext2D,
      cx: number, cy: number,
      innerR: number, outerR: number,
      segments: number, rotation: number, t: number
    ) {
      const segAngle = (Math.PI * 2) / segments;
      const gapAngle = segAngle * 0.12;

      for (let i = 0; i < segments; i++) {
        const startA = rotation + i * segAngle + gapAngle / 2;
        const endA = rotation + (i + 1) * segAngle - gapAngle / 2;
        const pulseAlpha = 0.6 + 0.25 * Math.sin(t * 2 + i * 0.8);

        ctx.beginPath();
        ctx.arc(cx, cy, outerR, startA, endA);
        ctx.arc(cx, cy, innerR, endA, startA, true);
        ctx.closePath();

        const grad = ctx.createRadialGradient(cx, cy, innerR, cx, cy, outerR);
        grad.addColorStop(0, `rgba(0, 229, 255, ${pulseAlpha * 0.7})`);
        grad.addColorStop(0.5, `rgba(77, 217, 255, ${pulseAlpha * 0.5})`);
        grad.addColorStop(1, `rgba(0, 180, 220, ${pulseAlpha * 0.3})`);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = `rgba(200, 240, 255, ${pulseAlpha * 0.25})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Structural inner/outer rings
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
      ctx.strokeStyle = DARK_STRUCT;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
      ctx.strokeStyle = DARK_STRUCT;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function drawInnerTriangle(
      ctx: CanvasRenderingContext2D,
      cx: number, cy: number, r: number, rotation: number, t: number
    ) {
      const triR = r * 0.56;
      const points: [number, number][] = [];
      for (let i = 0; i < 3; i++) {
        const angle = rotation + (i * Math.PI * 2) / 3 + Math.PI / 2;
        points.push([
          cx + Math.cos(angle) * triR,
          cy + Math.sin(angle) * triR,
        ]);
      }

      const pulseA = 0.55 + 0.25 * Math.sin(t * 2.5);

      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      ctx.lineTo(points[1][0], points[1][1]);
      ctx.lineTo(points[2][0], points[2][1]);
      ctx.closePath();

      const triGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, triR);
      triGrad.addColorStop(0, `rgba(224, 247, 255, ${pulseA * 0.9})`);
      triGrad.addColorStop(0.4, `rgba(0, 229, 255, ${pulseA * 0.6})`);
      triGrad.addColorStop(1, `rgba(0, 180, 220, ${pulseA * 0.2})`);
      ctx.fillStyle = triGrad;
      ctx.fill();

      ctx.strokeStyle = DARK_STRUCT;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Smaller inner inverted triangle
      const innerTriR = triR * 0.45;
      const innerPoints: [number, number][] = [];
      for (let i = 0; i < 3; i++) {
        const angle = rotation + (i * Math.PI * 2) / 3 + Math.PI / 2;
        innerPoints.push([
          cx + Math.cos(angle) * innerTriR,
          cy + Math.sin(angle) * innerTriR,
        ]);
      }

      ctx.beginPath();
      ctx.moveTo(innerPoints[0][0], innerPoints[0][1]);
      ctx.lineTo(innerPoints[1][0], innerPoints[1][1]);
      ctx.lineTo(innerPoints[2][0], innerPoints[2][1]);
      ctx.closePath();
      ctx.strokeStyle = `rgba(200, 240, 255, ${0.4 + 0.2 * Math.sin(t * 2)})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function drawCoreGlow(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, t: number) {
      const intensity = 0.5 + 0.3 * Math.sin(t * 2.5);
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.3);
      coreGrad.addColorStop(0, `rgba(224, 247, 255, ${intensity})`);
      coreGrad.addColorStop(0.3, `rgba(0, 229, 255, ${intensity * 0.5})`);
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.3, 0, Math.PI * 2);
      ctx.fill();

      const dotR = r * 0.04 + r * 0.015 * Math.sin(t * 4);
      ctx.beginPath();
      ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
      ctx.fillStyle = ICE_WHITE;
      ctx.shadowBlur = 12;
      ctx.shadowColor = CORE_CYAN;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    function draw(time: number) {
      if (!ctx || !canvas) return;
      const t = (time - startRef.current) / 1000;
      const cx = size / 2;
      const cy = size / 2;
      const baseR = size * 0.42;

      ctx.clearRect(0, 0, size, size);

      const globalRotation = t * 0.12;

      // Outer Glow Halo
      drawOuterHalo(ctx, cx, cy, baseR, t);

      // Outer Ring (10 segments)
      drawSegmentedRing(ctx, cx, cy, baseR * 0.68, baseR * 0.95, 10, globalRotation, t);

      // Inner Ring (6 segments)
      drawSegmentedRing(ctx, cx, cy, baseR * 0.52, baseR * 0.63, 6, -globalRotation * 1.5, t);

      // Inverted center triangle (fixed, matching main core)
      drawInnerTriangle(ctx, cx, cy, baseR * 0.5, 0, t);

      // Pulse Core Glow
      drawCoreGlow(ctx, cx, cy, baseR, t);

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [size]);

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 group cursor-pointer"
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle, rgba(0,229,255,0.18) 0%, rgba(10,24,30,0.96) 75%)',
        boxShadow: '0 0 25px rgba(0, 229, 255, 0.45), inset 0 0 15px rgba(0, 229, 255, 0.18)',
        border: '1px solid rgba(0, 229, 255, 0.35)',
      }}
      aria-label="Open JARVIS chat assistant"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 rounded-full pointer-events-none"
        aria-hidden="true"
      />
      {/* Pulse ring animation */}
      <div
        className="absolute inset-0 rounded-full animate-ping"
        style={{
          background: 'transparent',
          border: '1px solid rgba(0, 229, 255, 0.25)',
          animationDuration: '3s',
        }}
      />
    </button>
  );
}
