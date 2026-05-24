import { useRef, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Path {
  points: Point[];
  pulses: { progress: number; speed: number; size: number }[];
}

export default function CircuitBoardBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Generate Connected Circuit Paths ──
    const paths: Path[] = [];
    
    const generatePaths = () => {
      paths.length = 0;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      // Create 8 main branches radiating outwards from the center (Arc Reactor area)
      const branchCount = 10;
      for (let i = 0; i < branchCount; i++) {
        const angle = (i / branchCount) * Math.PI * 2 + Math.random() * 0.2;
        const distStart = Math.min(window.innerWidth, window.innerHeight) * 0.15; // start just outside the reactor core
        
        const startX = cx + Math.cos(angle) * distStart;
        const startY = cy + Math.sin(angle) * distStart;

        const points: Point[] = [{ x: startX, y: startY }];

        let curX = startX;
        let curY = startY;

        // Generate 3-5 connected segments for each branch with 45-degree turns
        const segmentCount = Math.floor(Math.random() * 3) + 3;
        let dirAngle = angle;

        for (let j = 0; j < segmentCount; j++) {
          const len = Math.random() * 120 + 80;
          
          // enforce 45-degree or 90-degree increments
          const snapAngles = [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI, -(3 * Math.PI) / 4, -Math.PI / 2, -Math.PI / 4];
          // Find snap angle closest to our current radiating direction
          const nextAngle = snapAngles.reduce((prev, curr) => 
            Math.abs(curr - dirAngle) < Math.abs(prev - dirAngle) ? curr : prev
          );
          
          curX += Math.cos(nextAngle) * len;
          curY += Math.sin(nextAngle) * len;
          points.push({ x: curX, y: curY });

          // slightly divert the next segment's direction by 45 degrees
          dirAngle += (Math.random() > 0.5 ? 1 : -1) * (Math.PI / 4);
        }

        // Add 1-2 pulses traveling on this path
        const pulses = [
          { progress: 0, speed: Math.random() * 0.003 + 0.002, size: Math.random() * 2 + 2 },
          { progress: -Math.random() * 0.5, speed: Math.random() * 0.003 + 0.002, size: Math.random() * 2 + 2 }
        ];

        paths.push({ points, pulses });
      }

      // Add a couple of peripheral horizontal/vertical paths along the margins
      const marginPathsCount = 6;
      for (let i = 0; i < marginPathsCount; i++) {
        const isLeft = Math.random() > 0.5;
        const startX = isLeft ? Math.random() * 150 + 50 : window.innerWidth - (Math.random() * 150 + 50);
        const startY = Math.random() * (window.innerHeight - 200) + 100;

        const points: Point[] = [{ x: startX, y: startY }];
        let curX = startX;
        let curY = startY;

        // Trace downwards vertically or horizontally with 45-degree jogs
        const segmentCount = 3;
        for (let j = 0; j < segmentCount; j++) {
          const isVertical = j % 2 === 0;
          if (isVertical) {
            curY += 150;
          } else {
            // jog slightly inward or outward at 45 degrees
            const jog = 50;
            curX += (isLeft ? 1 : -1) * jog;
            curY += jog;
          }
          points.push({ x: curX, y: curY });
        }

        paths.push({
          points,
          pulses: [{ progress: -Math.random() * 0.5, speed: Math.random() * 0.004 + 0.003, size: 3 }]
        });
      }
    };

    generatePaths();
    window.addEventListener('resize', generatePaths);

    // ── Animation Loop ──
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Styles
      const WIRE_COLOR = 'rgba(0, 229, 255, 0.06)';
      const GLOW_COLOR = 'rgba(77, 217, 255, 0.15)';
      const PULSE_COLOR = '#00e5ff';
      const NODE_COLOR = 'rgba(0, 229, 255, 0.25)';

      // ── Draw Circuit Traces ──
      paths.forEach((path) => {
        if (path.points.length < 2) return;

        // Base wire line
        ctx.beginPath();
        ctx.moveTo(path.points[0].x, path.points[0].y);
        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y);
        }
        ctx.strokeStyle = WIRE_COLOR;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Subtle glowing backing wire
        ctx.strokeStyle = GLOW_COLOR;
        ctx.lineWidth = 3;
        ctx.stroke();

        // ── Draw Node Terminals / Vias ──
        path.points.forEach((pt, idx) => {
          // Only draw circles on endpoints or major bends
          if (idx === 0 || idx === path.points.length - 1 || Math.random() > 0.85) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, idx === 0 || idx === path.points.length - 1 ? 3 : 2, 0, Math.PI * 2);
            ctx.fillStyle = NODE_COLOR;
            ctx.fill();

            // outer ring for endpoints
            if (idx === 0 || idx === path.points.length - 1) {
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
              ctx.strokeStyle = 'rgba(0, 229, 255, 0.12)';
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });

        // ── Animate and Draw Signals/Pulses along Wires ──
        if (!prefersReduced) {
          path.pulses.forEach((pulse) => {
            pulse.progress += pulse.speed;
            if (pulse.progress > 1) {
              pulse.progress = 0;
              pulse.speed = Math.random() * 0.003 + 0.002;
            }

            if (pulse.progress >= 0) {
              // Interpolate position along multi-segment path
              const totalSegments = path.points.length - 1;
              const currentSegmentFloat = pulse.progress * totalSegments;
              const segIdx = Math.floor(currentSegmentFloat);
              const segProgress = currentSegmentFloat - segIdx;

              if (segIdx < totalSegments) {
                const p1 = path.points[segIdx];
                const p2 = path.points[segIdx + 1];

                const px = p1.x + (p2.x - p1.x) * segProgress;
                const py = p1.y + (p2.y - p1.y) * segProgress;

                // Pulsing dot
                ctx.beginPath();
                ctx.arc(px, py, pulse.size, 0, Math.PI * 2);
                ctx.fillStyle = PULSE_COLOR;
                ctx.shadowBlur = 10;
                ctx.shadowColor = PULSE_COLOR;
                ctx.fill();
                ctx.shadowBlur = 0;

                // Glowing tail
                const tailGrad = ctx.createRadialGradient(px, py, 1, px, py, pulse.size * 3);
                tailGrad.addColorStop(0, 'rgba(0, 229, 255, 0.4)');
                tailGrad.addColorStop(1, 'rgba(0, 229, 255, 0)');
                ctx.fillStyle = tailGrad;
                ctx.beginPath();
                ctx.arc(px, py, pulse.size * 3, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          });
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', generatePaths);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
}
