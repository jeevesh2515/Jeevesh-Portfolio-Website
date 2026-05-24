interface OrbitalRingProps {
  size: number;
  glowColor: string;
  dotCount?: number;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export default function OrbitalRing({
  size,
  glowColor,
  dotCount = 3,
  speed = 12,
  reverse = false,
  className = '',
}: OrbitalRingProps) {
  const dots = Array.from({ length: dotCount }, (_, i) => ({
    id: i,
    delay: (i / dotCount) * speed,
  }));

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Ring border */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${glowColor}`,
          opacity: 0.2,
        }}
      />

      {/* Orbiting dots */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          className={reverse ? 'animate-orbit-reverse' : 'animate-orbit'}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 0,
            height: 0,
            ['--orbit-r' as string]: `${size / 2}px`,
            ['--orbit-duration' as string]: `${speed}s`,
            animationDelay: `${-dot.delay}s`,
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: 4,
              height: 4,
              backgroundColor: glowColor,
              opacity: 0.6,
              boxShadow: `0 0 6px ${glowColor}`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      ))}
    </div>
  );
}
