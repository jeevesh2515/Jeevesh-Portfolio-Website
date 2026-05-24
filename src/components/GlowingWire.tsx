import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ChipTrigger {
  scrollProgress: number;
  chipId: string;
}

interface GlowingWireProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  chipTriggers: ChipTrigger[];
}

export default function GlowingWire({ sectionRef, chipTriggers }: GlowingWireProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const basePathRef = useRef<SVGPathElement>(null);
  const activePathRef = useRef<SVGPathElement>(null);
  const [pathD, setPathD] = useState('');
  const triggeredRef = useRef<Set<string>>(new Set());

  const buildPath = useCallback(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;
    const cards = section.querySelectorAll('[data-chip-id]');
    if (cards.length === 0) return;

    const sectionRect = section.getBoundingClientRect();
    const sectionTop = sectionRect.top + window.scrollY;
    void sectionRect.height; // used for relative positioning context

    // Collect card center positions
    const points: { x: number; y: number; chipId: string }[] = [];
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const chipId = card.getAttribute('data-chip-id');
      if (chipId) {
        points.push({
          x: rect.left + rect.width / 2 - sectionRect.left,
          y: rect.top + rect.height / 2 - sectionTop,
          chipId,
        });
      }
    });

    if (points.length < 2) return;

    // Build serpentine path: left→right on row 1, arc down, right→left on row 2
    const cols = Math.ceil(points.length / 2);
    const row1 = points.slice(0, cols);
    const row2 = points.slice(cols).reverse();
    const ordered = [...row1, ...row2];

    let d = `M ${ordered[0].x} ${ordered[0].y - 40}`;

    for (let i = 0; i < ordered.length; i++) {
      const pt = ordered[i];
      if (i === 0) {
        d = `M ${pt.x} ${pt.y - 60}`;
        d += ` L ${pt.x} ${pt.y}`;
      } else {
        const prev = ordered[i - 1];
        const midY = (prev.y + pt.y) / 2;
        // Smooth bezier curve between points
        d += ` C ${prev.x} ${midY}, ${pt.x} ${midY}, ${pt.x} ${pt.y}`;
      }
    }

    // Extend past last point
    const last = ordered[ordered.length - 1];
    d += ` L ${last.x} ${last.y + 60}`;

    setPathD(d);

    // Update chip trigger scroll positions
    const totalLen = ordered.length;
    ordered.forEach((pt, i) => {
      const progress = (i + 0.5) / totalLen;
      const trigger = chipTriggers.find((t) => t.chipId === pt.chipId);
      if (trigger) {
        trigger.scrollProgress = progress;
      }
    });
  }, [sectionRef, chipTriggers]);

  useEffect(() => {
    // Delay to ensure cards are rendered
    const timer = setTimeout(buildPath, 100);
    window.addEventListener('resize', buildPath);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', buildPath);
    };
  }, [buildPath]);

  useEffect(() => {
    if (!activePathRef.current || !pathD || !sectionRef.current) return;

    const path = activePathRef.current;
    const length = path.getTotalLength();

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        path.style.strokeDashoffset = `${length * (1 - progress)}`;

        // Trigger chips
        chipTriggers.forEach((trigger) => {
          if (progress >= trigger.scrollProgress && !triggeredRef.current.has(trigger.chipId)) {
            triggeredRef.current.add(trigger.chipId);
            window.dispatchEvent(
              new CustomEvent('chip-activate', { detail: { chipId: trigger.chipId } })
            );
          }
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [pathD, chipTriggers, sectionRef]);

  if (!pathD) return null;

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
      style={{ zIndex: 0 }}
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="wireGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Base layer - dim wire */}
      <path
        ref={basePathRef}
        d={pathD}
        fill="none"
        stroke="#8B6914"
        strokeWidth="1.5"
        opacity="0.2"
      />
      {/* Active layer - glowing wire */}
      <path
        ref={activePathRef}
        d={pathD}
        fill="none"
        stroke="#FFD700"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#wireGlow)"
      />
    </svg>
  );
}
