import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GLOW_COLORS, type GlowColor } from '@/types';

interface MicrochipCardProps {
  title: string;
  subtitle?: string;
  glowColor: GlowColor;
  children: React.ReactNode;
  className?: string;
  chipId?: string;
}

export default function MicrochipCard({ title, subtitle, glowColor, children, className = '', chipId }: MicrochipCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const glow = GLOW_COLORS[glowColor];

  useEffect(() => {
    if (!chipId) return;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail.chipId === chipId) {
        setIsActive(true);
      }
    };
    window.addEventListener('chip-activate', handler);
    return () => window.removeEventListener('chip-activate', handler);
  }, [chipId]);

  const pins = Array.from({ length: 8 }, (_, i) => i);

  return (
    <motion.div
      ref={cardRef}
      data-chip-id={chipId}
      className={`relative bg-bgSurface rounded-xl border border-[var(--border-subtle)] inner-glow overflow-hidden ${className}`}
      style={{
        borderLeft: `4px solid ${glow.color}`,
        boxShadow: isActive ? glow.shadow : 'inset 0 0 30px rgba(212, 175, 55, 0.05)',
      }}
      whileHover={{ y: -4, boxShadow: glow.shadow }}
      transition={{ duration: 0.3 }}
    >
      {/* Top pin strip */}
      <div className="flex justify-around px-4 py-1.5 gap-1">
        {pins.map((i) => (
          <div
            key={`top-${i}`}
            className="w-0.5 h-2 rounded-sm transition-opacity duration-500"
            style={{
              backgroundColor: glow.color,
              opacity: isActive ? 0.8 : 0.3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="px-5 pb-4">
        <h3 className="font-heading text-lg font-semibold text-textPrimary tracking-wider">
          {title}
        </h3>
        {subtitle && (
          <p className="font-mono-tech text-xs text-textSecondary mt-0.5 tracking-wide">
            {subtitle}
          </p>
        )}
        <div className="mt-3">{children}</div>
      </div>

      {/* Bottom pin strip */}
      <div className="flex justify-around px-4 py-1.5 gap-1">
        {pins.map((i) => (
          <div
            key={`bottom-${i}`}
            className="w-0.5 h-2 rounded-sm transition-opacity duration-500"
            style={{
              backgroundColor: glow.color,
              opacity: isActive ? 0.8 : 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
