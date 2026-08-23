import { useState, useEffect } from 'react';
import { Briefcase, X, ArrowRight } from 'lucide-react';

/**
 * Persistent, dismissible "Open to Work" ribbon.
 * Stored in localStorage so the dismissal sticks across sessions.
 * Renders fixed below the navigation on every screen width.
 */
export default function OpenToWork() {
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setDismissed(localStorage.getItem('otw_dismissed') === '1');
    } catch {
      // localStorage unavailable — default to visible
    }
  }, []);

  if (!mounted || dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem('otw_dismissed', '1');
    } catch {
      // ignore
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    handleDismiss();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      role="region"
      aria-label="Open to work status"
      className="fixed top-16 left-0 right-0 z-40 backdrop-blur-md border-b border-neon-green/30 shadow-[0_0_15px_rgba(57,255,20,0.15)]"
      style={{
        background: 'linear-gradient(90deg, rgba(57,255,20,0.10) 0%, rgba(0,229,255,0.10) 50%, rgba(184,71,255,0.10) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <span className="shrink-0 relative flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-neon-green/30 animate-ping" />
            <Briefcase size={14} className="relative text-neon-green" />
          </span>
          <p className="font-terminal text-[11px] sm:text-xs text-on-surface truncate">
            <span className="text-neon-green font-bold">OPEN TO WORK</span>
            <span className="text-on-surface-variant hidden sm:inline"> · </span>
            <span className="text-on-surface-variant">Senior AI Systems & Agentic roles · London / Remote UK</span>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="hidden sm:inline-flex items-center gap-1 font-label text-[10px] tracking-widest uppercase text-neon-green hover:text-white transition-colors"
          >
            Contact <ArrowRight size={12} />
          </a>
          <button
            onClick={handleDismiss}
            aria-label="Dismiss open to work banner"
            className="text-on-surface-variant hover:text-white transition-colors p-1"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
