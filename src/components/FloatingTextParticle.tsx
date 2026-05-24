interface FloatingTextParticleProps {
  text: string;
  delay: number;
  duration: number;
  yPosition: number;
  opacity: number;
  color?: string;
}

export default function FloatingTextParticle({
  text,
  delay,
  duration,
  yPosition,
  opacity,
  color,
}: FloatingTextParticleProps) {
  return (
    <span
      className="absolute font-mono-tech text-xs pointer-events-none whitespace-nowrap animate-floatText"
      style={{
        top: `${yPosition}%`,
        left: '-200px',
        opacity,
        color: color || 'var(--text-secondary)',
        ['--float-duration' as string]: `${duration}s`,
        animationDelay: `${delay}s`,
        zIndex: 2,
      }}
    >
      {text}
    </span>
  );
}
