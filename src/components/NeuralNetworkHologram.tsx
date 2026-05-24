import { useRef, useEffect, useCallback } from 'react';

interface Props {
  scrollProgress: number;
}

// ── Node definitions ──
const DOMAIN_NODES = [
  { id: 'ai-ml',    label: 'AI / ML',        stat: '96% accuracy',    angle: -90,  color: '#00e5ff', statColor: '#00e5ff' },
  { id: 'data-eng', label: 'DATA ENG',        stat: '1M+ records',     angle: -18,  color: '#fbbf24', statColor: '#fbbf24' },
  { id: 'rag',      label: 'RAG',             stat: '6 agents',        angle: 54,   color: '#b847ff', statColor: '#b847ff' },
  { id: 'cloud',    label: 'CLOUD',           stat: 'CI/CD',           angle: 126,  color: '#39ff14', statColor: '#39ff14' },
  { id: 'web',      label: 'FULL-STACK',      stat: 'React + FastAPI', angle: 198,  color: '#ff6464', statColor: '#ff6464' },
];

// ── Helpers ──
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(t: number) {
  return Math.max(0, Math.min(1, t));
}

function phase(progress: number, inLo: number, inHi: number) {
  return clamp01((progress - inLo) / (inHi - inLo));
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

// ══════════════════════════════════════════════════════════
// Canvas-drawn Arc Reactor (inspired by reference image)
// ══════════════════════════════════════════════════════════
const CORE_CYAN = '#00e5ff';
const ICE_WHITE = '#e0f7ff';
const DARK_STRUCT = '#0a2a3a';

function drawArcReactor(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  baseR: number,
  time: number,        // performance.now() for animations (accumulated with boost)
  sparking: boolean,  // true if flickering/sparking
  corePower: number,   // brightness/power factor for core & teeth (0 to 1)
  outerPower: number   // brightness/power factor for outer rings & brackets (0 to 1)
) {
  const elapsed = time / 1000;
  const t = elapsed;

  // ── 0. Ambient Volumetric Glow Bloom (Massive background light emission) ──
  // Volumetric bloom grows larger and more opaque in perfect sync with outerPower (when outer rings light up!)
  if (outerPower > 0.4) {
    const bloomIntensity = (outerPower - 0.4) / 0.6; // 0 to 1
    const bloomRadius = baseR * 2.3;
    const bloomGrad = ctx.createRadialGradient(cx, cy, baseR * 0.15, cx, cy, bloomRadius);
    bloomGrad.addColorStop(0, `rgba(0, 229, 255, ${bloomIntensity * 0.38})`);
    bloomGrad.addColorStop(0.35, `rgba(0, 229, 255, ${bloomIntensity * 0.15})`);
    bloomGrad.addColorStop(0.7, `rgba(0, 160, 240, ${bloomIntensity * 0.05})`);
    bloomGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.save();
    ctx.fillStyle = bloomGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, bloomRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // ── 1. Outer mechanical tabs/brackets (6 brackets projecting outwards) ──
  const tabCount = 6;
  ctx.save();
  ctx.translate(cx, cy);
  for (let i = 0; i < tabCount; i++) {
    const angle = (i * Math.PI * 2) / tabCount - Math.PI / 2; // top bracket vertical, others at 60deg steps
    ctx.rotate(angle);
    
    // mechanical bracket base shape
    ctx.fillStyle = `rgba(10, 42, 58, ${0.85 * outerPower})`;
    ctx.fillRect(baseR * 0.95, -baseR * 0.08, baseR * 0.22, baseR * 0.16);
    
    // glowing details inside the bracket
    ctx.strokeStyle = `rgba(0, 229, 255, ${0.7 * outerPower})`;
    ctx.lineWidth = 1.2;
    ctx.strokeRect(baseR * 0.98, -baseR * 0.05, baseR * 0.15, baseR * 0.1);
    
    // glowing outer tip dot
    ctx.fillStyle = `rgba(0, 229, 255, ${0.5 * outerPower})`;
    ctx.fillRect(baseR * 1.13, -baseR * 0.02, baseR * 0.04, baseR * 0.04);
    
    ctx.rotate(-angle);
  }
  ctx.restore();

  // Outer dark backing circle for depth
  ctx.beginPath();
  ctx.arc(cx, cy, baseR * 1.02, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(8, 12, 18, ${0.9 * Math.max(corePower, outerPower)})`;
  ctx.fill();

  // ── 2. Main thick mechanical ring (10 segments like reference) ──
  const outerR = baseR * 0.95;
  const innerR = baseR * 0.72;
  const segments = 10;
  const segAngle = (Math.PI * 2) / segments;
  const gapAngle = segAngle * 0.12;

  for (let i = 0; i < segments; i++) {
    const startA = i * segAngle + gapAngle / 2;
    const endA = (i + 1) * segAngle - gapAngle / 2;
    const pulseAlpha = (0.55 + 0.2 * Math.sin(t * 2 + i * 0.8)) * outerPower;

    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startA, endA);
    ctx.arc(cx, cy, innerR, endA, startA, true);
    ctx.closePath();

    const grad = ctx.createRadialGradient(cx, cy, innerR, cx, cy, outerR);
    grad.addColorStop(0, `rgba(0, 229, 255, ${pulseAlpha * 0.8})`);
    grad.addColorStop(0.5, `rgba(77, 217, 255, ${pulseAlpha * 0.55})`);
    grad.addColorStop(1, `rgba(0, 180, 220, ${pulseAlpha * 0.3})`);
    
    // Fill with a gorgeous glow shadow
    ctx.save();
    ctx.shadowBlur = 8 * outerPower;
    ctx.shadowColor = CORE_CYAN;
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = `rgba(200, 240, 255, ${pulseAlpha * 0.35})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Dark mechanical structural borders
  ctx.strokeStyle = DARK_STRUCT;
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.65 * outerPower;
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Thin intermediate mechanical line (Glows as a delicate electric thread)
  ctx.strokeStyle = `rgba(0, 229, 255, ${0.65 * outerPower})`;
  ctx.save();
  ctx.shadowBlur = 6 * outerPower;
  ctx.shadowColor = CORE_CYAN;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(cx, cy, baseR * 0.70, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // ── 3. Secondary inner ring (6 segments, counter-rotating) ──
  const innerOuterR = baseR * 0.65;
  const innerInnerR = baseR * 0.50;
  const innerSegments = 6;
  const innerSegAngle = (Math.PI * 2) / innerSegments;
  const innerGapAngle = innerSegAngle * 0.15;
  const rotation = -t * 0.12;

  for (let i = 0; i < innerSegments; i++) {
    const startA = rotation + i * innerSegAngle + innerGapAngle / 2;
    const endA = rotation + (i + 1) * innerSegAngle - innerGapAngle / 2;
    const pulseAlpha = (0.6 + 0.2 * Math.sin(t * 3.5 + i * 1.2)) * outerPower;

    ctx.beginPath();
    ctx.arc(cx, cy, innerOuterR, startA, endA);
    ctx.arc(cx, cy, innerInnerR, endA, startA, true);
    ctx.closePath();

    const grad = ctx.createRadialGradient(cx, cy, innerInnerR, cx, cy, innerOuterR);
    grad.addColorStop(0, `rgba(0, 229, 255, ${pulseAlpha * 0.8})`);
    grad.addColorStop(0.5, `rgba(77, 217, 255, ${pulseAlpha * 0.45})`);
    grad.addColorStop(1, `rgba(0, 160, 200, ${pulseAlpha * 0.2})`);
    
    ctx.save();
    ctx.shadowBlur = 6 * outerPower;
    ctx.shadowColor = CORE_CYAN;
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = `rgba(200, 240, 255, ${pulseAlpha * 0.4})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  // ── 4. Ring of 12 inward-pointing triangular teeth (from reference image!) ──
  const teethR = baseR * 0.45;
  const teethCount = 12;
  ctx.save();
  ctx.translate(cx, cy);
  for (let i = 0; i < teethCount; i++) {
    const angle = (i * Math.PI * 2) / teethCount;
    ctx.rotate(angle);
    
    // draw triangular teeth pointing inwards
    ctx.beginPath();
    ctx.moveTo(teethR, -baseR * 0.035);
    ctx.lineTo(teethR, baseR * 0.035);
    ctx.lineTo(teethR - baseR * 0.07, 0);
    ctx.closePath();
    
    ctx.fillStyle = `rgba(0, 229, 255, ${0.85 * corePower})`;
    ctx.shadowBlur = 10 * corePower;
    ctx.shadowColor = CORE_CYAN;
    ctx.fill();
    ctx.shadowBlur = 0;
    
    ctx.strokeStyle = DARK_STRUCT;
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.rotate(-angle);
  }
  ctx.restore();

  // ── 5. Circular Core Glow & Solid White/Blue Core ──
  // The central glowing core physically swells slightly and becomes significantly brighter
  // as corePower reaches its peak (corePower > 0.8).
  const glowSizeFactor = 1.0 + (corePower > 0.8 ? (corePower - 0.8) * 1.6 : 0);
  const coreIntensity = (0.6 + 0.35 * Math.sin(t * 2.5)) * corePower;
  const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 0.32 * glowSizeFactor);
  coreGlow.addColorStop(0, `rgba(224, 247, 255, ${coreIntensity})`);
  coreGlow.addColorStop(0.35, `rgba(0, 229, 255, ${coreIntensity * 0.8})`);
  coreGlow.addColorStop(0.75, `rgba(0, 160, 200, ${coreIntensity * 0.4})`);
  coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = coreGlow;
  ctx.beginPath();
  ctx.arc(cx, cy, baseR * 0.32 * glowSizeFactor, 0, Math.PI * 2);
  ctx.fill();

  const dotR = (baseR * 0.16 + baseR * 0.015 * Math.sin(t * 4.5)) * corePower * glowSizeFactor;
  if (dotR > 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
    ctx.fillStyle = ICE_WHITE;
    // Boost shadow glow radius at peak power
    ctx.shadowBlur = (20 + (corePower > 0.8 ? (corePower - 0.8) * 85 : 0)) * corePower;
    ctx.shadowColor = CORE_CYAN;
    ctx.fill();
    ctx.shadowBlur = 0;

    // bright white center highlight
    ctx.beginPath();
    ctx.arc(cx, cy, dotR * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * corePower})`;
    ctx.fill();
  }

  // ── 6. Sparking electric arcs (for real kickstart feeling!) ──
  if (sparking) {
    ctx.strokeStyle = `rgba(224, 250, 255, 0.95)`;
    ctx.lineWidth = 1.8;
    ctx.shadowBlur = 18;
    ctx.shadowColor = CORE_CYAN;
    
    const arcCount = 2 + Math.floor(Math.random() * 2);
    for (let a = 0; a < arcCount; a++) {
      ctx.beginPath();
      let curX = cx + (Math.random() - 0.5) * baseR * 0.15;
      let curY = cy + (Math.random() - 0.5) * baseR * 0.15;
      ctx.moveTo(curX, curY);
      
      const steps = 6;
      const targetAngle = Math.random() * Math.PI * 2;
      const targetR = baseR * 0.95;
      const endX = cx + Math.cos(targetAngle) * targetR;
      const endY = cy + Math.sin(targetAngle) * targetR;
      
      for (let s = 1; s <= steps; s++) {
        const tStep = s / steps;
        const idealX = lerp(curX, endX, tStep);
        const idealY = lerp(curY, endY, tStep);
        const jitter = (Math.random() - 0.5) * baseR * 0.12 * (1 - tStep);
        const nextX = idealX + jitter;
        const nextY = idealY + jitter;
        
        ctx.lineTo(nextX, nextY);
      }
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
  }
}

export default function NeuralNetworkHologram({ scrollProgress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  // Time accumulators to prevent visual jumps on speed boost
  const lastTimeRef = useRef<number>(0);
  const accumTimeRef = useRef<number>(0);

  // Interactive click overcharge impulses
  const clickImpulse = useRef<number>(0);
  const rippleRadius = useRef<number>(0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dist = Math.hypot(x - cx, y - cy);

    // Only allow clicking if scrollProgress is loaded and within reactor boundaries
    if (dist < rect.width * 0.15 && scrollProgress >= 0.8) {
      clickImpulse.current = 1.0;
      rippleRadius.current = rect.width * 0.08;
    }
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Size canvas to container (retina-ready)
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.34;

    // Decay the overcharge click impulse
    clickImpulse.current = Math.max(0, clickImpulse.current - 0.015);

    // Speed boost multiplier for ring rotations & traveling photons
    const speedBoost = 1.0 + clickImpulse.current * 8.0;

    const lastTime = lastTimeRef.current;
    const now = performance.now();
    if (lastTime > 0) {
      const delta = now - lastTime;
      accumTimeRef.current += delta * speedBoost;
    } else {
      accumTimeRef.current = now;
    }
    lastTimeRef.current = now;

    const accumTime = accumTimeRef.current;

    // ── Phase calculations ──
    const p1 = easeOut(phase(scrollProgress, 0.0,  0.25));  // core + nodes appear
    const p2 = easeOut(phase(scrollProgress, 0.25, 0.55));  // wires trace
    const p3 = easeOut(phase(scrollProgress, 0.55, 0.80));  // labels + stats
    const p4 = easeOut(phase(scrollProgress, 0.80, 1.00));  // full activation glow

    // ── Ambient grid ──
    if (p1 > 0) {
      ctx.save();
      ctx.globalAlpha = p1 * 0.06;
      ctx.strokeStyle = '#fbbf24';
      const gridSize = 30;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      ctx.restore();
    }

    // ═══════════════════════════════════════════════════════
    // PHASE 1: Arc Reactor Core + domain nodes
    // ═══════════════════════════════════════════════════════
    if (p1 > 0) {
      // Reactor stays at a constant mechanical proportion, but is unlit/dead when scroll is 0
      const reactorRadius = Math.min(w, h) * 0.08;

      // ── Flicker / Ignition sequence based on scrollProgress ──
      // Scroll progress runs from 0.0 to 1.0.
      // If scrollProgress is 0, it is totally dead.
      // Between 0.01 and 0.40, the system "flickers" like a high voltage bulb kickstarting.
      // Above 0.40, it is stably activated and fully loaded.
      let corePower = 0;
      let sparking = false;

      if (scrollProgress > 0) {
        if (scrollProgress <= 0.45) {
          // Sparking / flickering startup phase!
          const flickVal = Math.floor(scrollProgress * 100);
          
          // Flick on and arc at specific scroll progress intervals:
          // [3-6], [11-15], [20-26], [32-45]
          if (flickVal >= 3 && flickVal <= 6) {
            corePower = 0.40;
            sparking = true;
          } else if (flickVal >= 11 && flickVal <= 15) {
            corePower = 0.55;
            sparking = true;
          } else if (flickVal >= 20 && flickVal <= 26) {
            corePower = 0.70;
            sparking = true;
          } else if (flickVal >= 32) {
            // Ignition stabilizes and starts loading
            const tIgnite = (scrollProgress - 0.32) / 0.13; // 0 to 1
            corePower = lerp(0.35, 0.85, easeOut(tIgnite));
            sparking = Math.random() < 0.15; // light random spark while loading
          } else {
            // Totally dead mechanical shell
            corePower = 0.05;
            sparking = false;
          }
        } else {
          // Fully powered up, loading up to 100% brightness as scroll goes to 1.0
          const tFull = (scrollProgress - 0.45) / 0.55;
          corePower = lerp(0.85, 1.0, tFull);
          sparking = false;
        }
      }

      // Outer mechanical parts/layers of the reactor remain dark during the flickering
      // startup and wires tracing, and only start glowing when the letters starts to appear
      // (scrollProgress >= 0.55 onwards, coinciding with phase 3 / letters appearance).
      let outerPower = 0.05;
      if (scrollProgress >= 0.55) {
        const tOuter = (scrollProgress - 0.55) / 0.45;
        outerPower = lerp(0.05, 1.0, easeOut(tOuter));
      }

      // Add clickable overcharge impulses
      const currentCorePower = Math.min(1.0, corePower + clickImpulse.current * 0.4);
      const currentOuterPower = Math.min(1.0, outerPower + clickImpulse.current * 0.95);

      // Draw the procedural Arc Reactor (with sparking and independent core & outer power factors)
      drawArcReactor(ctx, cx, cy, reactorRadius, accumTime, sparking || clickImpulse.current > 0.6, currentCorePower, currentOuterPower);

      // ── Expanding shockwave ripple when reactor is clicked ──
      if (clickImpulse.current > 0) {
        rippleRadius.current += 6 * (1.0 + clickImpulse.current * 2.0);
        
        ctx.save();
        ctx.strokeStyle = `rgba(0, 229, 255, ${clickImpulse.current * 0.75})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(cx, cy, rippleRadius.current, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(0, 229, 255, ${clickImpulse.current * 0.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, rippleRadius.current * 1.35, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // "CORE" label
      if (p1 > 0.5) {
        const labelAlpha = clamp01((p1 - 0.5) * 2);
        ctx.font = '600 9px "Share Tech Mono", monospace';
        ctx.textAlign = 'center';
        
        if (scrollProgress >= 0.85) {
          ctx.fillStyle = clickImpulse.current > 0 
            ? `rgba(57, 255, 20, ${labelAlpha * 0.95})` 
            : `rgba(0, 229, 255, ${labelAlpha * 0.8})`;
          ctx.fillText(clickImpulse.current > 0 ? 'SYSTEM OVERCHARGED' : 'CLICK TO OVERCHARGE', cx, cy + reactorRadius + 18);
        } else {
          ctx.fillStyle = `rgba(0, 229, 255, ${labelAlpha * 0.7})`;
          ctx.fillText('CORE', cx, cy + reactorRadius + 18);
        }
      }

      // ── Domain nodes ──
      DOMAIN_NODES.forEach((node, i) => {
        const nodeDelay = i * 0.15;
        const nodeP = easeOut(clamp01((p1 - nodeDelay) / (1 - nodeDelay)));
        if (nodeP <= 0) return;

        const angleRad = (node.angle * Math.PI) / 180;
        const nx = cx + Math.cos(angleRad) * radius * nodeP;
        const ny = cy + Math.sin(angleRad) * radius * nodeP;
        const nodeRadius = lerp(0, 10, nodeP);
        
        // click impulse boosts the node breathing pulse
        const nodeBreathe = Math.sin(accumTime * 0.004 + i) * (2 + clickImpulse.current * 4) * nodeP;

        // Node outer glow
        const nodeGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, nodeRadius * 2.5);
        nodeGrad.addColorStop(0, `${node.color}33`);
        nodeGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = nodeGrad;
        ctx.beginPath();
        ctx.arc(nx, ny, nodeRadius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Node ring
        ctx.strokeStyle = node.color;
        ctx.globalAlpha = nodeP * 0.7;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(nx, ny, nodeRadius + nodeBreathe * 0.3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Node center dot
        ctx.beginPath();
        ctx.arc(nx, ny, 3, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 8 + clickImpulse.current * 10;
        ctx.shadowColor = node.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // ═══════════════════════════════════════════════════════
        // PHASE 2: Wire tracing from reactor edge → node
        // ═══════════════════════════════════════════════════════
        if (p2 > 0 && nodeP > 0.3) {
          const wireDelay = i * 0.12;
          const wireP = clamp01((p2 - wireDelay) / (1 - wireDelay));

          if (wireP > 0) {
            // Wire starts from the reactor outer edge
            const wireStartDist = reactorRadius + 6;
            const wx = cx + Math.cos(angleRad) * wireStartDist;
            const wy = cy + Math.sin(angleRad) * wireStartDist;

            const midFactor = 0.5;
            const midX = wx + (nx - wx) * midFactor;
            const midY = wy + (ny - wy) * 0.15;

            const segments: { x1: number; y1: number; x2: number; y2: number }[] = [
              { x1: wx, y1: wy, x2: midX, y2: midY },
              { x1: midX, y1: midY, x2: nx, y2: ny },
            ];

            let totalLen = 0;
            const segLens: number[] = [];
            for (const s of segments) {
              const len = Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
              segLens.push(len);
              totalLen += len;
            }

            const targetLen = totalLen * wireP;

            // Ghost path
            ctx.strokeStyle = `${node.color}12`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(wx, wy);
            ctx.lineTo(midX, midY);
            ctx.lineTo(nx, ny);
            ctx.stroke();

            // Active traced portion
            ctx.beginPath();
            ctx.moveTo(segments[0].x1, segments[0].y1);
            let accum = 0;
            let tipX = wx, tipY = wy;

            for (let si = 0; si < segments.length; si++) {
              const s = segments[si];
              const segLen = segLens[si];
              if (accum + segLen <= targetLen) {
                ctx.lineTo(s.x2, s.y2);
                accum += segLen;
                tipX = s.x2;
                tipY = s.y2;
              } else {
                const remaining = targetLen - accum;
                const ratio = remaining / segLen;
                tipX = s.x1 + (s.x2 - s.x1) * ratio;
                tipY = s.y1 + (s.y2 - s.y1) * ratio;
                ctx.lineTo(tipX, tipY);
                break;
              }
            }

            ctx.strokeStyle = `${node.color}88`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Traveling photon
            if (wireP > 0 && wireP < 1) {
              ctx.beginPath();
              ctx.arc(tipX, tipY, 3, 0, Math.PI * 2);
              ctx.fillStyle = node.color;
              ctx.shadowBlur = 10;
              ctx.shadowColor = node.color;
              ctx.fill();
              ctx.shadowBlur = 0;
            }

            // Data pulses along completed wires (sped up by overcharge speedBoost)
            if (wireP >= 1 && p4 > 0) {
              const baseSpeed = 0.0015;
              const pulseT = ((accumTime * baseSpeed + i * 0.3) % 1);
              let pulseAccum = 0;
              const pulseDist = totalLen * pulseT;
              let px = wx, py = wy;

              for (const s of segments) {
                const sLen = Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
                if (pulseAccum + sLen >= pulseDist) {
                  const r = (pulseDist - pulseAccum) / sLen;
                  px = s.x1 + (s.x2 - s.x1) * r;
                  py = s.y1 + (s.y2 - s.y1) * r;
                  break;
                }
                pulseAccum += sLen;
                px = s.x2;
                py = s.y2;
              }

              ctx.beginPath();
              ctx.arc(px, py, 2.5, 0, Math.PI * 2);
              ctx.fillStyle = node.color;
              ctx.globalAlpha = (0.6 + clickImpulse.current * 0.4) * p4;
              ctx.shadowBlur = 8 + clickImpulse.current * 10;
              ctx.shadowColor = node.color;
              ctx.fill();
              ctx.shadowBlur = 0;
              ctx.globalAlpha = 1;
            }
          }
        }

        // ═══════════════════════════════════════════════════════
        // PHASE 3: Labels + stats
        // ═══════════════════════════════════════════════════════
        if (p3 > 0 && nodeP > 0.5) {
          const labelDelay = i * 0.1;
          const labelP = clamp01((p3 - labelDelay) / (1 - labelDelay));

          if (labelP > 0) {
            const labelChars = Math.ceil(node.label.length * labelP);
            const visibleLabel = node.label.slice(0, labelChars);

            ctx.font = '600 10px "Share Tech Mono", monospace';
            ctx.textAlign = 'center';
            ctx.fillStyle = clickImpulse.current > 0 
              ? `rgba(255, 255, 255, ${labelP * 0.95})` 
              : `rgba(229, 225, 228, ${labelP * 0.9})`;
            ctx.fillText(visibleLabel, nx, ny + nodeRadius + 18);

            const statP = clamp01((labelP - 0.3) / 0.7);
            if (statP > 0) {
              const statChars = Math.ceil(node.stat.length * statP);
              const visibleStat = node.stat.slice(0, statChars);
              ctx.font = '500 8px "Share Tech Mono", monospace';
              
              if (clickImpulse.current > 0) {
                ctx.fillStyle = `#00e5ff${Math.round(statP * 255).toString(16).padStart(2, '0')}`;
              } else {
                ctx.fillStyle = `${node.statColor}${Math.round(statP * 180).toString(16).padStart(2, '0')}`;
              }
              ctx.fillText(visibleStat, nx, ny + nodeRadius + 30);
            }

            if (labelP < 1) {
              const cursorBlink = Math.sin(now * 0.008) > 0;
              if (cursorBlink) {
                const textWidth = ctx.measureText(visibleLabel).width;
                ctx.fillStyle = node.color;
                ctx.fillRect(nx + textWidth / 2 + 2, ny + nodeRadius + 10, 1.5, 10);
              }
            }
          }
        }

        // PHASE 4: Activation pulse on nodes
        if (p4 > 0) {
          const pulseRadius = nodeRadius + 6 + Math.sin(accumTime * 0.005 + i * 1.2) * 4;
          ctx.beginPath();
          ctx.arc(nx, ny, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `${node.color}${Math.round(p4 * (60 + clickImpulse.current * 100)).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // ── Phase 4: "SYSTEM INITIALIZED" badge ──
      if (p4 > 0.3) {
        const badgeP = clamp01((p4 - 0.3) / 0.7);
        const badgeY = cy + radius + 55;
        
        // Change text in hypercharged mode!
        const badgeText = clickImpulse.current > 0 ? 'HYPERDRIVE ENGAGED' : 'SYSTEM INITIALIZED';
        const badgeChars = Math.ceil(badgeText.length * badgeP);
        const visibleBadge = badgeText.slice(0, badgeChars);

        if (clickImpulse.current > 0) {
          ctx.fillStyle = `rgba(57, 255, 20, 0.12)`;
          ctx.strokeStyle = `rgba(57, 255, 20, 0.7)`;
        } else {
          ctx.fillStyle = `rgba(0, 229, 255, ${badgeP * 0.08})`;
          ctx.strokeStyle = `rgba(0, 229, 255, ${badgeP * 0.4})`;
        }
        
        const badgeW = clickImpulse.current > 0 ? 150 : 140;
        const badgeH = 22;
        ctx.beginPath();
        ctx.roundRect(cx - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH, 3);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = '600 10px "Share Tech Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        if (clickImpulse.current > 0) {
          ctx.fillStyle = `rgba(57, 255, 20, 0.95)`;
        } else {
          ctx.fillStyle = `rgba(0, 229, 255, ${badgeP * 0.9})`;
        }
        ctx.fillText(visibleBadge, cx, badgeY);
        ctx.textBaseline = 'alphabetic';

        if (badgeP < 1 && Math.sin(now * 0.008) > 0) {
          const tw = ctx.measureText(visibleBadge).width;
          ctx.fillStyle = '#00e5ff';
          ctx.fillRect(cx + tw / 2 + 2, badgeY - 5, 1.5, 10);
        }

        if (badgeP >= 1) {
          const ledPulse = 0.5 + Math.sin(now * 0.004) * 0.5;
          ctx.beginPath();
          ctx.arc(cx - badgeW / 2 + 10, badgeY, 2.5, 0, Math.PI * 2);
          
          if (clickImpulse.current > 0) {
            ctx.fillStyle = `rgba(57, 255, 20, ${ledPulse})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#39ff14';
          } else {
            ctx.fillStyle = `rgba(57, 255, 20, ${ledPulse})`;
            ctx.shadowBlur = 6;
            ctx.shadowColor = '#39ff14';
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // ── Outer hexagonal frame ──
      if (p1 > 0.6) {
        const frameP = clamp01((p1 - 0.6) / 0.4);
        const frameRadius = radius + 30;
        ctx.save();
        
        if (clickImpulse.current > 0) {
          ctx.globalAlpha = clickImpulse.current * 0.35;
          ctx.strokeStyle = '#00e5ff';
          ctx.lineWidth = 1.5;
        } else {
          ctx.globalAlpha = frameP * 0.12;
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 1;
        }
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * 60 - 30) * Math.PI / 180;
          const fx = cx + Math.cos(angle) * frameRadius;
          const fy = cy + Math.sin(angle) * frameRadius;
          if (i === 0) ctx.moveTo(fx, fy);
          else ctx.lineTo(fx, fy);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
    }

    animRef.current = requestAnimationFrame(draw);
  }, [scrollProgress]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full select-none ${scrollProgress >= 0.8 ? 'cursor-pointer' : 'cursor-default'}`} 
      onClick={handleClick}
    >
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
    </div>
  );
}
