import { GLOW_COLORS, type GlowColor } from '@/types';

interface SkillTagProps {
  skill: string;
  glowColor: GlowColor;
}

export default function SkillTag({ skill, glowColor }: SkillTagProps) {
  const glow = GLOW_COLORS[glowColor];
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-md font-mono-tech text-xs"
      style={{
        backgroundColor: `${glow.color}14`,
        border: `1px solid ${glow.color}33`,
        color: glow.color,
        opacity: 0.85,
      }}
    >
      {skill}
    </span>
  );
}
