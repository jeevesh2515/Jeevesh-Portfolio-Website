import { useEffect, useRef } from 'react';

/**
 * ArcReactorHero — Iron Man Mark I style arc reactor with physics-based
 * scroll velocity overdrive coupling.
 * Features: central inverted triangle, segmented outer ring,
 * light blue / cyan glowing aesthetic, outer radiance halo,
 * and dynamic scroll-accelerated rotation & flare.
 */
export default function ArcReactorHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const velocityRef = useRef(0);
  const rotationOffsetRef = useRef(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let canvasSize = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const scaleFactor = window.innerWidth < 768 ? 0.85 : 0.55;
      canvasSize = Math.min(window.innerWidth * scaleFactor, 550);
      canvas.width = canvasSize * dpr;
      canvas.height = canvasSize * dpr;
      canvas.style.width = `${canvasSize}px`;
      canvas.style.height = `${canvasSize}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);
    startRef.current = performance.now();

    // Scroll handler for shrink + fade + velocity tracking
    const onScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const dt = Math.max((now - lastTime.current) / 1000, 0.01);
      const dy = currentY - lastScrollY.current;

      const rawVel = Math.abs(dy / dt);
      velocityRef.current = velocityRef.current * 0.7 + rawVel * 0.3;

      scrollRef.current = currentY;
      const progress = Math.min(scrollRef.current / 600, 1);
      const scale = 1 - progress * 0.72; // Shrinks to 28%
      const opacity = 0.45 - progress * 0.35; // Fades to 10%

      canvas.style.transform = `scale(${scale})`;
      canvas.style.opacity = `${opacity}`;

      lastScrollY.current = currentY;
      lastTime.current = now;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ── Color palette ──
    const CORE_CYAN = '#00e5ff';
    const ICE_WHITE = '#e0f7ff';
    const DARK_STRUCT = '#0a2a3a';

    function drawOuterHalo(
      ctx: CanvasRenderingContext2D,
      cx: number, cy: number, r: number, t: number, overdrive: number
    ) {
      const rayCount = 16;
      const boost = 1 + overdrive * 0.8;

      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2;
        const pulseA = (0.04 + 0.025 * Math.sin(t * 1.5 + i * 0.7)) * boost;
        const x1 = cx + Math.cos(angle) * r * 0.95;
        const y1 = cy + Math.sin(angle) * r * 0.95;
        const x2 = cx + Math.cos(angle) * r * (1.35 + overdrive * 0.2);
        const y2 = cy + Math.sin(angle) * r * (1.35 + overdrive * 0.2);

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, `rgba(0, 229, 255, ${pulseA * 2})`);
        grad.addColorStop(0.5, `rgba(77, 217, 255, ${pulseA})`);
        grad.addColorStop(1, 'rgba(0, 229, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = grad;
        ctx.lineWidth = r * 0.06 * boost;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      ctx.lineCap = 'butt';

      const haloGrad = ctx.createRadialGradient(cx, cy, r * 0.85, cx, cy, r * (1.3 + overdrive * 0.2));
      haloGrad.addColorStop(0, `rgba(0, 229, 255, ${0.08 + 0.04 * Math.sin(t * 2) + overdrive * 0.1})`);
      haloGrad.addColorStop(0.5, `rgba(100, 80, 200, ${0.03 + 0.02 * Math.sin(t * 1.5)})`);
      haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * (1.3 + overdrive * 0.2), 0, Math.PI * 2);
      ctx.fill();
    }

    function drawSegmentedRing(
      ctx: CanvasRenderingContext2D,
      cx: number, cy: number,
      innerR: number, outerR: number,
      segments: number, rotation: number, t: number, overdrive: number
    ) {
      const segAngle = (Math.PI * 2) / segments;
      const gapAngle = segAngle * 0.12;

      for (let i = 0; i < segments; i++) {
        const startA = rotation + i * segAngle + gapAngle / 2;
        const endA = rotation + (i + 1) * segAngle - gapAngle / 2;
        const pulseAlpha = Math.min((0.6 + 0.25 * Math.sin(t * 2 + i * 0.8)) * (1 + overdrive * 0.5), 1);

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

        ctx.strokeStyle = `rgba(200, 240, 255, ${pulseAlpha * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
      ctx.strokeStyle = DARK_STRUCT;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
      ctx.strokeStyle = DARK_STRUCT;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function drawInnerTriangle(
      ctx: CanvasRenderingContext2D,
      cx: number, cy: number, r: number, rotation: number, t: number, overdrive: number
    ) {
      const triR = r * 0.55;
      const points: [number, number][] = [];
      for (let i = 0; i < 3; i++) {
        const angle = rotation + (i * Math.PI * 2) / 3 + Math.PI / 2;
        points.push([
          cx + Math.cos(angle) * triR,
          cy + Math.sin(angle) * triR,
        ]);
      }

      const pulseA = Math.min((0.5 + 0.3 * Math.sin(t * 2.5)) * (1 + overdrive * 0.6), 1);

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
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.7;
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.strokeStyle = `rgba(0, 229, 255, ${0.3 + 0.2 * Math.sin(t * 3) + overdrive * 0.3})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

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
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    function drawCoreGlow(
      ctx: CanvasRenderingContext2D,
      cx: number, cy: number, r: number, t: number, overdrive: number
    ) {
      const intensity = Math.min((0.5 + 0.3 * Math.sin(t * 2.5)) * (1 + overdrive * 0.8), 1);

      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * (0.35 + overdrive * 0.1));
      coreGrad.addColorStop(0, `rgba(224, 247, 255, ${intensity})`);
      coreGrad.addColorStop(0.3, `rgba(0, 229, 255, ${intensity * 0.5})`);
      coreGrad.addColorStop(0.7, `rgba(0, 180, 220, ${intensity * 0.15})`);
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, r * (0.35 + overdrive * 0.1), 0, Math.PI * 2);
      ctx.fill();

      const dotR = (r * 0.04 + r * 0.015 * Math.sin(t * 4)) * (1 + overdrive * 0.5);
      ctx.beginPath();
      ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
      ctx.fillStyle = ICE_WHITE;
      ctx.shadowBlur = 25 + overdrive * 25;
      ctx.shadowColor = CORE_CYAN;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    function draw(time: number) {
      if (!ctx || !canvas) return;
      const elapsed = (time - startRef.current) / 1000;
      const t = prefersReduced ? 0 : elapsed;

      // Decay velocity smoothly
      velocityRef.current *= 0.94;
      const overdrive = Math.min(velocityRef.current / 600, 1.0);

      // Accelerate rotation based on scroll velocity
      rotationOffsetRef.current += overdrive * 0.04;
      const globalRotation = t * 0.08 + rotationOffsetRef.current;

      const w = canvasSize;
      const h = canvasSize;
      const cx = w / 2;
      const cy = h / 2;
      const baseR = Math.min(w, h) * 0.42;

      ctx.clearRect(0, 0, w, h);

      drawOuterHalo(ctx, cx, cy, baseR, t, overdrive);
      drawSegmentedRing(ctx, cx, cy, baseR * 0.68, baseR * 0.95, 10, globalRotation, t, overdrive);
      drawSegmentedRing(ctx, cx, cy, baseR * 0.52, baseR * 0.63, 6, -globalRotation * 1.5, t, overdrive);
      drawInnerTriangle(ctx, cx, cy, baseR * 0.5, 0, t, overdrive);
      drawCoreGlow(ctx, cx, cy, baseR, t, overdrive);

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="pointer-events-none transition-transform duration-75 ease-out"
        style={{ opacity: 0.45 }}
        aria-hidden="true"
      />
    </div>
  );
}
