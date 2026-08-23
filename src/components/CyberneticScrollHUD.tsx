import React from 'react';
import { useScrollTelemetry } from '@/hooks/useScrollTelemetry';
import { Zap, Activity, ArrowUp, ArrowDown } from 'lucide-react';

const SECTIONS = [
  { id: 'hero', label: '00 CORE', short: 'HERO' },
  { id: 'about', label: '01 PROFILE', short: 'ABOUT' },
  { id: 'skills', label: '02 MATRIX', short: 'SKILLS' },
  { id: 'experience', label: '03 LOGIC', short: 'EXP' },
  { id: 'projects', label: '04 SYSTEMS', short: 'PROJECTS' },
  { id: 'education', label: '05 ACADEMIA', short: 'EDU' },
  { id: 'contact', label: '06 COMM', short: 'CONTACT' },
];

export default function CyberneticScrollHUD() {
  const { scrollProgress, velocity, direction, activeSectionId, activeSubsystem, isOverdrive } = useScrollTelemetry();

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const progressPercent = Math.round(scrollProgress * 100);

  return (
    <>
      {/* ── Desktop Right-Margin Cybernetic HUD ── */}
      <aside
        aria-label="System telemetry and navigation HUD"
        className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 pointer-events-none select-none"
      >
        {/* Telemetry Capsule */}
        <div
          className={`pointer-events-auto glass-panel px-3 py-2 rounded-md border transition-all duration-300 backdrop-blur-xl ${
            isOverdrive
              ? 'border-neon-cyan shadow-[0_0_25px_rgba(0,229,255,0.4)] bg-[#0d222d]/90'
              : 'border-outline-variant/40 bg-black/60 hover:border-primary-container/60'
          }`}
        >
          <div className="flex items-center gap-2 border-b border-white/10 pb-1.5 mb-1.5">
            <div className="relative flex items-center justify-center">
              <span className={`w-2 h-2 rounded-full ${isOverdrive ? 'bg-neon-cyan animate-ping' : 'bg-primary animate-pulse'}`} />
              <Zap size={12} className={`relative ${isOverdrive ? 'text-neon-cyan' : 'text-primary'}`} />
            </div>
            <span className="font-terminal text-[10px] text-primary tracking-widest uppercase font-bold">
              SYS_TELEMETRY
            </span>
          </div>

          <div className="space-y-1 font-terminal text-[10px] text-on-surface-variant">
            <div className="flex items-center justify-between gap-4">
              <span className="text-outline">NODE:</span>
              <span className="text-on-surface font-semibold text-secondary-container">{activeSubsystem}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-outline">VELOCITY:</span>
              <span className={`font-bold ${velocity > 300 ? 'text-neon-cyan' : 'text-on-surface'}`}>
                {velocity} <span className="text-[9px] font-normal text-outline">px/s</span>
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-outline">VECTOR:</span>
              <span className="flex items-center gap-1">
                {direction === 'down' && (
                  <span className="text-neon-green flex items-center gap-0.5">
                    <ArrowDown size={10} /> DSC
                  </span>
                )}
                {direction === 'up' && (
                  <span className="text-secondary-container flex items-center gap-0.5">
                    <ArrowUp size={10} /> ASC
                  </span>
                )}
                {direction === 'idle' && <span className="text-outline">● IDL</span>}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 pt-1 border-t border-white/5">
              <span className="text-outline">PROGRESS:</span>
              <span className="text-primary font-bold">{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Vertical Rail + Section Nodes */}
        <div className="flex items-center gap-2 pointer-events-auto pr-1">
          {/* Section labels */}
          <div className="flex flex-col gap-3.5 items-end">
            {SECTIONS.map((sec) => {
              const isActive = activeSectionId === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={(e) => handleNavClick(e, sec.id)}
                  className={`group flex items-center gap-2 transition-all duration-300 font-terminal text-[10px] tracking-wider uppercase cursor-pointer ${
                    isActive ? 'text-primary font-bold' : 'text-outline hover:text-on-surface'
                  }`}
                  aria-label={`Jump to section ${sec.label}`}
                >
                  <span
                    className={`transition-opacity duration-200 ${
                      isActive ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-100 text-outline'
                    }`}
                  >
                    {sec.short}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-sm border transition-all duration-300 ${
                      isActive
                        ? 'bg-primary border-primary shadow-[0_0_10px_rgba(251,191,36,0.8)] scale-125'
                        : 'border-outline-variant/60 bg-surface-container hover:border-primary/60'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Laser Rail Track */}
          <div className="relative w-1 h-36 bg-surface-container rounded-full overflow-hidden border border-outline-variant/30">
            {/* Background Rail Glow */}
            <div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-cyber-purple to-secondary-container transition-all duration-150 rounded-full"
              style={{ height: `${progressPercent}%` }}
            />
            {/* Glowing Photon Head */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-150 ${
                isOverdrive ? 'bg-neon-cyan shadow-[0_0_12px_#00e5ff] scale-150' : 'bg-primary shadow-[0_0_8px_#fbbf24]'
              }`}
              style={{ top: `calc(${progressPercent}% - 4px)` }}
            />
          </div>
        </div>
      </aside>

      {/* ── Mobile Condensed Telemetry Strip ── */}
      <div
        className="lg:hidden fixed top-16 right-3 z-40 pointer-events-auto"
        aria-hidden="true"
      >
        <div className="glass-panel px-2.5 py-1 rounded-full border border-primary-container/30 bg-black/75 backdrop-blur-md flex items-center gap-2 shadow-lg">
          <Activity size={11} className={`${isOverdrive ? 'text-neon-cyan animate-spin' : 'text-primary animate-pulse'}`} />
          <span className="font-terminal text-[9px] text-secondary-container font-semibold">
            {activeSubsystem.replace(/[[\]]/g, '')}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="font-terminal text-[9px] text-primary font-bold">{progressPercent}%</span>
        </div>
      </div>
    </>
  );
}
