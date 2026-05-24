interface SectionLabelProps {
  number: string;
  name: string;
  className?: string;
}

export default function SectionLabel({ number, name, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 mb-8 ${className}`}>
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{
          backgroundColor: 'var(--gold-primary)',
          boxShadow: '0 0 6px var(--gold-primary)',
        }}
      />
      <div
        className="w-10 h-px"
        style={{ borderTop: '1px dashed var(--border-subtle)' }}
      />
      <span className="font-rajdhani text-xs font-semibold tracking-[0.15em] text-textSecondary uppercase">
        // {number} — {name}
      </span>
    </div>
  );
}
