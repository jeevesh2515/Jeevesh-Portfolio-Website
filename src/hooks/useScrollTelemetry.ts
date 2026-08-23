import { useState, useEffect, useRef } from 'react';

export interface ScrollTelemetry {
  scrollY: number;
  scrollProgress: number;
  velocity: number;
  rawVelocity: number;
  direction: 'up' | 'down' | 'idle';
  activeSectionId: string;
  activeSubsystem: string;
  isOverdrive: boolean;
}

const SECTION_SUBSYSTEMS: Record<string, { label: string; code: string }> = {
  hero: { label: 'ORBITAL HERO', code: '[00_ORBITAL_CORE]' },
  about: { label: 'SYSTEM PROFILE', code: '[01_SYSTEM_PROFILE]' },
  skills: { label: 'SKILL MATRIX', code: '[02_SKILL_MATRIX]' },
  experience: { label: 'LOGIC PROCESSORS', code: '[03_LOGIC_MODULES]' },
  projects: { label: 'SHIPPED SYSTEMS', code: '[04_SHIPPED_SYSTEMS]' },
  education: { label: 'KNOWLEDGE BASE', code: '[05_ACADEMIA]' },
  contact: { label: 'COMM PORT', code: '[06_COMM_PORT]' },
};

export function useScrollTelemetry(): ScrollTelemetry {
  const [telemetry, setTelemetry] = useState<ScrollTelemetry>({
    scrollY: 0,
    scrollProgress: 0,
    velocity: 0,
    rawVelocity: 0,
    direction: 'idle',
    activeSectionId: 'hero',
    activeSubsystem: '[00_ORBITAL_CORE]',
    isOverdrive: false,
  });

  const lastScrollY = useRef(0);
  const lastTime = useRef(performance.now());
  const smoothedVelocity = useRef(0);
  const idleTimeout = useRef<number | null>(null);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    lastTime.current = performance.now();

    const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];

    const handleScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const dt = Math.max((now - lastTime.current) / 1000, 0.01);
      const dy = currentY - lastScrollY.current;

      const rawVel = Math.abs(dy / dt);
      // Exponential moving average smoothing for velocity
      smoothedVelocity.current = smoothedVelocity.current * 0.7 + rawVel * 0.3;

      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(currentY / maxScroll, 0), 1);

      let dir: 'up' | 'down' | 'idle' = dy > 1 ? 'down' : dy < -1 ? 'up' : 'idle';

      // Detect active section based on midpoint of viewport
      const viewportMid = currentY + window.innerHeight * 0.38;
      let currentSection = 'hero';

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (viewportMid >= top && viewportMid <= top + height) {
            currentSection = id;
            break;
          }
        }
      }

      const subsystem = SECTION_SUBSYSTEMS[currentSection]?.code || '[SYSTEM_ONLINE]';
      const isOverdrive = smoothedVelocity.current > 450;

      setTelemetry({
        scrollY: currentY,
        scrollProgress: progress,
        velocity: Math.round(smoothedVelocity.current),
        rawVelocity: Math.round(rawVel),
        direction: dir,
        activeSectionId: currentSection,
        activeSubsystem: subsystem,
        isOverdrive,
      });

      lastScrollY.current = currentY;
      lastTime.current = now;

      // Reset to idle direction after scrolling pauses
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = window.setTimeout(() => {
        smoothedVelocity.current *= 0.2;
        setTelemetry((prev) => ({
          ...prev,
          direction: 'idle',
          velocity: 0,
          isOverdrive: false,
        }));
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
    };
  }, []);

  return telemetry;
}
