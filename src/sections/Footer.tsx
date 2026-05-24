export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/30 w-full px-margin-mobile md:px-margin-desktop py-6 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="font-terminal text-sm text-outline flex items-center gap-2">
        <span className="w-2 h-2 bg-neon-green rounded-sm animate-pulse" />
        &copy; 2026 Jeevesh Singale // All systems operational
      </div>

      {/* Center golden trace (absolutely centered to stay precisely in the middle) */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-px bg-primary-dim/30 overflow-hidden">
        <div className="absolute top-0 left-0 w-3 h-full bg-primary/50 animate-shimmer" />
      </div>
    </footer>
  );
}
