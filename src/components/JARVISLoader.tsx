import { useEffect, useState, useRef } from 'react';

interface Props {
  onComplete: () => void;
}

const BOOT_LOGS = [
  'INITIALIZING COGNITIVE PROTOCOLS...',
  'ESTABLISHING VECTOR RETRIEVAL PIPELINES...',
  'RESOLVING GRAPH TRAVERSAL ENGINES...',
  'COMMENCING AGENTIC RAG SCHEMAS...',
  'CALIBRATING ARC REACTOR INHIBITORS...',
  'ARC REACTOR VOLTAGE STABLE AT 1.21 GW',
  'NEURAL CORE SYNAPTIC PATHS OPERATIONAL.',
  'SYSTEM SECURE // ALL SYSTEMS ONLINE.'
];

export default function JARVISLoader({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [flickerOut, setFlickerOut] = useState(false);
  const logIndexRef = useRef(0);

  useEffect(() => {
    // ── Smooth diagnostic progress loading ──
    const startTime = performance.now();
    const duration = 950; // Snappy 0.95s loading time

    let animFrame: number;
    
    const update = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(1, elapsed / duration);
      
      // Variable speed loading trick: slows down slightly at 82% to simulate diagnostic checks
      let displayPct = pct;
      if (pct > 0.6 && pct < 0.85) {
        displayPct = 0.6 + (pct - 0.6) * 0.4;
      } else if (pct >= 0.85) {
        displayPct = 0.7 + (pct - 0.85) * 2.0;
      }
      
      const currentProgress = Math.floor(Math.min(displayPct, 1) * 100);
      setProgress(currentProgress);

      // Print log lines based on current progress milestones
      const expectedLogIndex = Math.min(
        BOOT_LOGS.length - 1,
        Math.floor((currentProgress / 100) * BOOT_LOGS.length)
      );

      if (expectedLogIndex >= logIndexRef.current) {
        setVisibleLogs(prev => [
          ...prev, 
          BOOT_LOGS[logIndexRef.current]
        ]);
        logIndexRef.current++;
      }

      if (pct < 1) {
        animFrame = requestAnimationFrame(update);
      } else {
        // Complete loading
        setProgress(100);
        setTimeout(() => {
          setFlickerOut(true);
          setTimeout(() => {
            onComplete();
          }, 450); // duration of flicker-out transition
        }, 300);
      }
    };

    animFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animFrame);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#03060a] flex flex-col items-center justify-center font-terminal transition-all duration-500 ease-in-out ${flickerOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}>
      
      {/* Volumetric background radar scan */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      {/* Center Charging Reactor */}
      <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
        {/* Outer segmented charging ring */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="80"
            className="stroke-glass-border fill-none"
            strokeWidth="2"
          />
          <circle
            cx="96"
            cy="96"
            r="80"
            className="stroke-primary fill-none transition-all duration-100 ease-out"
            strokeWidth="3.5"
            strokeDasharray={2 * Math.PI * 80}
            strokeDashoffset={2 * Math.PI * 80 * (1 - progress / 100)}
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.6))',
            }}
          />
        </svg>

        {/* Rotating inner mechanical details */}
        <div 
          className="absolute w-36 h-36 border border-dashed border-secondary-container/20 rounded-full animate-[spin_10s_linear_infinite]"
          style={{ animationDuration: `${6 - (progress / 100) * 4.5}s` }} // spins faster as it charges
        />
        <div 
          className="absolute w-28 h-28 border border-glass-border border-double rounded-full animate-[spin_6s_linear_infinite_reverse]"
          style={{ animationDuration: `${5 - (progress / 100) * 4}s` }}
        />

        {/* Glowing circular core */}
        <div 
          className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-container flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-transform duration-300"
          style={{
            transform: `scale(${0.8 + (progress / 100) * 0.3})`,
            boxShadow: `0 0 ${20 + (progress / 100) * 40}px rgba(251,191,36,${0.3 + (progress / 100) * 0.5})`
          }}
        >
          {/* Inner core white highlight */}
          <div className="w-6 h-6 rounded-full bg-white opacity-90 shadow-[0_0_10px_#fff]" />
        </div>
      </div>

      {/* Progress Value */}
      <div className="text-primary text-xl font-bold tracking-[0.2em] mb-8 select-none">
        [ CHARGING: {progress}% ]
      </div>

      {/* Diagnostic Terminal Logs Box */}
      <div className="w-[90%] max-w-lg h-36 bg-[#060a0f] border border-glass-border p-4 rounded-md overflow-hidden text-left relative shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
        <div className="absolute top-2 right-4 text-[9px] text-outline tracking-wider font-bold animate-pulse">// SYSTEM CONSOLE</div>
        <div className="space-y-1.5 h-full overflow-y-auto pr-2 scrollbar-none font-terminal text-[10px] text-on-surface-variant">
          {visibleLogs.map((log, index) => (
            <div key={index} className="flex gap-2.5 items-start">
              <span className="text-[#39ff14] font-bold">[OK]</span>
              <span className="text-on-surface select-all leading-relaxed font-semibold">{log}</span>
            </div>
          ))}
          {progress < 100 && (
            <div className="flex gap-2.5 items-center">
              <span className="text-primary font-bold animate-pulse">&gt;</span>
              <span className="w-1.5 h-3 bg-primary animate-blink" />
            </div>
          )}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-6 font-terminal text-[9px] text-outline tracking-[0.25em] uppercase">
        MARK-X COGNITIVE SHELL // SECURE BOOT
      </div>
    </div>
  );
}
