import { useEffect, useRef, useState } from 'react';
import { useScrollTelemetry } from '@/hooks/useScrollTelemetry';
import { Mic, Activity, Cpu, Volume2, Sparkles, RefreshCw } from 'lucide-react';

interface PipelineStage {
  id: number;
  name: string;
  sub: string;
  latency: string;
  icon: typeof Mic;
  color: string;
  activeColor: string;
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 0,
    name: 'Silero VAD',
    sub: 'Microsecond Voice Trigger',
    latency: '<10ms',
    icon: Mic,
    color: 'border-secondary-container/40 text-secondary-container',
    activeColor: 'bg-secondary-container text-background shadow-[0_0_15px_rgba(0,229,255,0.5)]',
  },
  {
    id: 1,
    name: 'Deepgram Nova-2',
    sub: '16kHz Streaming STT',
    latency: '85ms',
    icon: Activity,
    color: 'border-primary/40 text-primary',
    activeColor: 'bg-primary text-background shadow-[0_0_15px_rgba(251,191,36,0.5)]',
  },
  {
    id: 2,
    name: 'Groq Llama 3.3',
    sub: '70B Streaming Tokens',
    latency: '120ms',
    icon: Cpu,
    color: 'border-cyber-purple/40 text-cyber-purple',
    activeColor: 'bg-cyber-purple text-background shadow-[0_0_15px_rgba(184,71,255,0.5)]',
  },
  {
    id: 3,
    name: 'ElevenLabs PCM',
    sub: 'Instant Barge-in Audio',
    latency: '165ms',
    icon: Volume2,
    color: 'border-neon-green/40 text-neon-green',
    activeColor: 'bg-neon-green text-background shadow-[0_0_15px_rgba(57,255,20,0.5)]',
  },
];

export default function VoiceWaveformScrubber() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedStage, setSelectedStage] = useState<number>(0);
  const [manualOverride, setManualOverride] = useState(false);
  const { scrollProgress, velocity, isOverdrive } = useScrollTelemetry();

  // Calculate active stage from scroll if not manually overridden
  useEffect(() => {
    if (!manualOverride) {
      // Map scroll progress to 4 stages
      const stageIdx = Math.min(Math.floor(scrollProgress * 4), 3);
      setSelectedStage(stageIdx);
    }
  }, [scrollProgress, manualOverride]);

  // Canvas Waveform Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);
      time += 0.03 + (velocity / 2000);

      // Base grid line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      ctx.stroke();

      const stage = selectedStage;
      const velFactor = Math.min(1 + velocity / 300, 3.5);

      if (stage === 0) {
        // ── Stage 0: Silero VAD (Pulse Spikes) ──
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 2;
        ctx.beginPath();

        const numPoints = Math.floor(w / 4);
        for (let i = 0; i <= numPoints; i++) {
          const x = (i / numPoints) * w;
          const distFromCenter = Math.abs(x - w / 2) / (w / 2);
          const envelope = Math.exp(-distFromCenter * 3);
          const pulse = Math.sin(time * 8 + i * 0.4) * Math.cos(time * 3 + i * 0.2);
          const spike = Math.pow(Math.sin(time * 5 + i * 0.15), 5);
          const y = cy + (pulse * 18 + spike * 35 * velFactor) * envelope;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Glow pass
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.25)';
        ctx.lineWidth = 6;
        ctx.stroke();

      } else if (stage === 1) {
        // ── Stage 1: Deepgram Nova-2 (FFT Spectral Bars) ──
        const barCount = Math.floor(w / 8);
        const barWidth = 4;

        for (let i = 0; i < barCount; i++) {
          const x = i * 8 + 4;
          const freq = Math.sin(i * 0.25 + time * 6) * Math.cos(i * 0.1 - time * 2);
          const barHeight = Math.abs(freq) * (28 * velFactor) + 4;

          const grad = ctx.createLinearGradient(x, cy - barHeight, x, cy + barHeight);
          grad.addColorStop(0, '#fbbf24');
          grad.addColorStop(0.5, 'rgba(251, 191, 36, 0.4)');
          grad.addColorStop(1, '#fbbf24');

          ctx.fillStyle = grad;
          ctx.fillRect(x - barWidth / 2, cy - barHeight, barWidth, barHeight * 2);
        }

      } else if (stage === 2) {
        // ── Stage 2: Groq Llama 3.3 (Step Token Wave) ──
        ctx.strokeStyle = '#b847ff';
        ctx.lineWidth = 2.5;
        ctx.beginPath();

        const stepCount = 24;
        const stepWidth = w / stepCount;

        for (let i = 0; i < stepCount; i++) {
          const x = i * stepWidth;
          const tokenVal = Math.sin(i * 0.8 + Math.floor(time * 4)) * (26 * velFactor);
          const y = cy + tokenVal;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, cy + Math.sin((i - 1) * 0.8 + Math.floor(time * 4)) * (26 * velFactor));
            ctx.lineTo(x, y);
          }
          ctx.lineTo(x + stepWidth, y);
        }
        ctx.stroke();

        ctx.strokeStyle = 'rgba(184, 71, 255, 0.25)';
        ctx.lineWidth = 7;
        ctx.stroke();

      } else {
        // ── Stage 3: ElevenLabs 16kHz PCM Harmonic Waves ──
        const waves = [
          { freq: 0.02, amp: 24, speed: 4, color: '#39ff14', alpha: 0.9 },
          { freq: 0.04, amp: 14, speed: 7, color: '#00e5ff', alpha: 0.5 },
          { freq: 0.06, amp: 8, speed: 10, color: '#b847ff', alpha: 0.3 },
        ];

        waves.forEach((wv) => {
          ctx.strokeStyle = wv.color;
          ctx.globalAlpha = wv.alpha;
          ctx.lineWidth = 2;
          ctx.beginPath();

          for (let x = 0; x <= w; x += 3) {
            const y = cy + Math.sin(x * wv.freq + time * wv.speed) * wv.amp * velFactor;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        });
        ctx.globalAlpha = 1;
      }

      // Live Scanning Head Photon
      const headX = (Math.sin(time * 2) * 0.45 + 0.5) * w;
      ctx.beginPath();
      ctx.arc(headX, cy, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#00e5ff';
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [selectedStage, velocity]);

  return (
    <section
      ref={containerRef}
      aria-label="VoxFlow Voice Pipeline Telemetry"
      className="relative max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop my-10 md:my-16"
    >
      <div className="module-housing rounded-xl p-5 md:p-6 border border-secondary-container/30 bg-[#09151e]/80 backdrop-blur-xl relative overflow-hidden group shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="heatsink-pattern absolute inset-0 opacity-15 pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-glass-border relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary-container/10 border border-secondary-container/30 flex items-center justify-center text-secondary-container">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm md:text-base font-bold text-on-surface uppercase tracking-wider">
                  VOXFLOW LIVE PCM WAVEFORM SCRUBBER
                </h3>
                <span className="font-terminal text-[10px] text-neon-green bg-neon-green/10 border border-neon-green/30 px-2 py-0.5 rounded-sm animate-pulse">
                  &lt;380ms TURNAROUND
                </span>
              </div>
              <p className="font-label text-[11px] text-on-surface-variant">
                Scroll-driven bi-directional audio spectrum · 16kHz raw PCM WebSockets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-terminal text-xs text-on-surface-variant">
              PIPELINE_LATENCY: <span className="text-primary font-bold">{PIPELINE_STAGES[selectedStage].latency}</span>
            </span>
            {manualOverride && (
              <button
                onClick={() => setManualOverride(false)}
                className="font-terminal text-[10px] text-secondary-container hover:text-white px-2 py-1 border border-secondary-container/30 rounded flex items-center gap-1 transition-colors"
                title="Sync with scroll"
              >
                <RefreshCw size={10} /> Sync Scroll
              </button>
            )}
          </div>
        </div>

        {/* Interactive Waveform Canvas */}
        <div className="relative h-28 md:h-32 w-full bg-black/60 rounded-lg border border-outline-variant/30 overflow-hidden mb-4">
          <canvas ref={canvasRef} className="w-full h-full block" />
          
          {/* Overdrive visual overlay */}
          {isOverdrive && (
            <div className="absolute top-2 right-2 font-terminal text-[9px] text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/30 px-2 py-0.5 rounded uppercase tracking-widest animate-pulse">
              OVERDRIVE HARMONICS
            </div>
          )}
        </div>

        {/* 4 Pipeline Stage Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 relative z-10">
          {PIPELINE_STAGES.map((stage) => {
            const isSelected = selectedStage === stage.id;
            const Icon = stage.icon;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  setSelectedStage(stage.id);
                  setManualOverride(true);
                }}
                className={`p-3 rounded-lg border text-left transition-all duration-300 flex flex-col justify-between gap-1.5 cursor-pointer ${
                  isSelected
                    ? `${stage.activeColor} border-transparent`
                    : `${stage.color} bg-surface/30 hover:bg-surface-container/60 hover:border-white/20`
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-terminal text-[10px] opacity-75 font-bold uppercase">STAGE 0{stage.id + 1}</span>
                  <Icon size={14} />
                </div>
                <div>
                  <div className="font-display text-xs font-bold truncate">{stage.name}</div>
                  <div className={`font-label text-[10px] truncate ${isSelected ? 'opacity-90 text-black' : 'text-on-surface-variant'}`}>
                    {stage.sub}
                  </div>
                </div>
                <div className="font-terminal text-[10px] font-bold mt-1">{stage.latency}</div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
