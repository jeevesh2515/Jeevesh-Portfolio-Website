import { useState, useEffect } from 'react';

interface ConsoleLine {
  text: string;
  color?: 'gold' | 'cyan' | 'amber' | 'default';
}

interface JARVISConsoleProps {
  title: string;
  lines: ConsoleLine[];
  typingSpeed?: number;
  showCursor?: boolean;
  className?: string;
}

const COLOR_MAP: Record<string, string> = {
  gold: 'var(--gold-primary)',
  cyan: 'var(--cyan-glow)',
  amber: 'var(--amber-glow)',
  default: 'var(--text-secondary)',
};

export default function JARVISConsole({
  title,
  lines,
  typingSpeed = 30,
  showCursor = true,
  className = '',
}: JARVISConsoleProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentLineText, setCurrentLineText] = useState('');
  const [, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (visibleLines >= lines.length) return;

    const line = lines[visibleLines];
    if (!line) return;

    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex++;
      setCurrentLineText(line.text.slice(0, charIndex));
      setCurrentLineIndex(charIndex);

      if (charIndex >= line.text.length) {
        clearInterval(interval);
        setTimeout(() => {
          setVisibleLines((prev) => prev + 1);
          setCurrentLineText('');
        }, 200);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [visibleLines, lines, typingSpeed]);

  return (
    <div
      className={`rounded-xl overflow-hidden border border-[var(--border-subtle)] ${className}`}
      style={{ background: 'rgba(10, 10, 15, 0.9)', backdropFilter: 'blur(8px)' }}
    >
      {/* Window chrome */}
      <div className="flex items-center justify-between px-4 py-2 bg-bgElevated">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-crimsonGlow" />
          <div className="w-2 h-2 rounded-full bg-amberGlow" />
          <div className="w-2 h-2 rounded-full bg-emeraldGlow" />
        </div>
        <span className="font-mono-tech text-xs text-textSecondary uppercase tracking-wider">
          {title}
        </span>
        <div className="flex items-end gap-0.5">
          {[4, 6, 8, 10].map((h, i) => (
            <div
              key={i}
              className="w-0.5 rounded-sm"
              style={{ height: h, backgroundColor: 'var(--gold-dim)' }}
            />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 font-mono-tech text-sm leading-7 min-h-[200px]">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ color: COLOR_MAP[line.color || 'default'] }}>
            {line.text}
          </div>
        ))}
        {visibleLines < lines.length && (
          <div style={{ color: COLOR_MAP[lines[visibleLines]?.color || 'default'] }}>
            {currentLineText}
            {showCursor && <span className="animate-blinkCursor">_</span>}
          </div>
        )}
        {visibleLines >= lines.length && showCursor && (
          <span className="animate-blinkCursor text-textSecondary">_</span>
        )}
      </div>
    </div>
  );
}
