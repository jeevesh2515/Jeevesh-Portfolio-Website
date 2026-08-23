import { useEffect } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { Github, Linkedin, Sparkles, ArrowRight } from 'lucide-react';

const FLOATING_WORDS = [
  { text: 'LangGraph', top: '10%', delay: '0s', duration: '35s', direction: 'right', color: 'text-cyan-float' },
  { text: 'Silero VAD', top: '16%', delay: '2s', duration: '45s', direction: 'left', color: 'text-amber-float' },
  { text: 'Deepgram Nova-2', top: '24%', delay: '5s', duration: '40s', direction: 'right', color: 'text-cyan-float' },
  { text: '<380ms Latency', top: '19%', delay: '0s', duration: '30s', direction: 'left', color: 'text-green-float' },
  { text: 'LanceDB Graph-RAG', top: '13%', delay: '1s', duration: '50s', direction: 'right', color: 'text-cyan-float' },
  { text: 'MCP Protocol', top: '34%', delay: '3s', duration: '38s', direction: 'left', color: 'text-cyan-float' },
  { text: 'Groq Llama 3.3 70B', top: '39%', delay: '0s', duration: '42s', direction: 'right', color: 'text-amber-float' },
  { text: '16kHz PCM Stream', top: '54%', delay: '6s', duration: '32s', direction: 'right', color: 'text-green-float' },
  { text: 'Cohere Rerank v3.5', top: '48%', delay: '2s', duration: '48s', direction: 'left', color: 'text-cyan-float' },
  { text: 'NetworkX Graph', top: '64%', delay: '0s', duration: '55s', direction: 'right', color: 'text-amber-float' },
  { text: '0.98 Faithfulness', top: '68%', delay: '4s', duration: '36s', direction: 'left', color: 'text-green-float' },
  { text: 'Ragas & LangSmith', top: '78%', delay: '0s', duration: '40s', direction: 'right', color: 'text-cyan-float' },
  { text: '258 Tests Passing', top: '82%', delay: '1s', duration: '34s', direction: 'left', color: 'text-green-float' },
  { text: 'FastAPI WebSockets', top: '88%', delay: '7s', duration: '45s', direction: 'right', color: 'text-amber-float' },
  { text: 'Deterministic Evals', top: '85%', delay: '0s', duration: '30s', direction: 'left', color: 'text-green-float' },
  { text: 'Next.js 16 + React 19', top: '92%', delay: '5s', duration: '50s', direction: 'right', color: 'text-green-float' },
  { text: 'Multi-Agent Mesh', top: '15%', delay: '3s', duration: '44s', direction: 'left', color: 'text-amber-float' },
  { text: 'Dockerized FFmpeg', top: '31%', delay: '1s', duration: '39s', direction: 'right', color: 'text-green-float' },
  { text: 'Zero-Lag Barge-in', top: '43%', delay: '4s', duration: '47s', direction: 'left', color: 'text-cyan-float' },
  { text: 'Local-First Privacy', top: '47%', delay: '2s', duration: '33s', direction: 'right', color: 'text-green-float' },
  { text: '100% Safety Refusal', top: '60%', delay: '6s', duration: '41s', direction: 'left', color: 'text-amber-float' },
  { text: 'D3 3D Force Graph', top: '72%', delay: '0s', duration: '37s', direction: 'right', color: 'text-green-float' },
  { text: 'AST Markdown Linter', top: '94%', delay: '3s', duration: '43s', direction: 'left', color: 'text-cyan-float' },
  { text: 'Open-Source Architect', top: '76%', delay: '5s', duration: '46s', direction: 'right', color: 'text-amber-float' },
  { text: 'Stateful DAGs', top: '57%', delay: '8s', duration: '52s', direction: 'left', color: 'text-cyan-float' },
  { text: 'ElevenLabs Streaming', top: '28%', delay: '9s', duration: '38s', direction: 'right', color: 'text-green-float' },
];

export default function HeroSection() {
  const sectionRef = useReveal<HTMLDivElement>();

  // Mouse parallax
  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      const layers = container.querySelectorAll<HTMLElement>('.parallax-layer');
      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth || '0.1');
        layer.style.transform = `translate(${x * depth * 15}px, ${y * depth * 15}px)`;
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop pt-40 md:pt-44 pb-20 md:pb-24">
      {/* Floating Text Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60 z-[1]">
        {FLOATING_WORDS.map((w, i) => (
          <div
            key={i}
            className={`floating-text ${w.color} ${w.direction === 'right' ? 'animate-float-right' : 'animate-float-left'}`}
            style={{
              top: w.top,
              animationDelay: w.delay,
              ['--duration' as string]: w.duration,
            }}
          >
            {w.text}
          </div>
        ))}
      </div>

      {/* Core Content */}
      <div className="relative z-30 text-center flex flex-col items-center parallax-layer w-full max-w-5xl animate-fade-in" data-depth="-0.1">

        {/* Quick Social Badges */}
        <div className="flex items-center gap-3 mb-4 reveal-up" style={{ transitionDelay: '0.1s' }}>
          <a
            href="https://github.com/jeevesh2515"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-outline-variant/60 bg-surface/60 backdrop-blur-md font-terminal text-[11px] text-on-surface-variant hover:text-white hover:border-primary-container transition-all"
          >
            <Github size={13} className="text-primary-container" /> github.com/jeevesh2515
          </a>
          <a
            href="https://www.linkedin.com/in/jeevesh-singale07/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-outline-variant/60 bg-surface/60 backdrop-blur-md font-terminal text-[11px] text-on-surface-variant hover:text-white hover:border-secondary-container transition-all"
          >
            <Linkedin size={13} className="text-secondary-container" /> jeevesh-singale07
          </a>
        </div>

        {/* Name Header */}
        <h1
          className="font-display text-[clamp(28px,7.5vw,94px)] tracking-tighter leading-none mb-4 sm:mb-5 reveal-up whitespace-nowrap"
          style={{
            color: '#ffffff',
            textShadow: '0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(0, 212, 255, 0.25), 0 0 100px rgba(0, 212, 255, 0.15), 0 2px 4px rgba(0, 0, 0, 0.8)',
            transitionDelay: '0.2s',
          }}
        >
          JEEVESH SINGALE
        </h1>

        {/* Horizontal decorative line */}
        <div className="flex items-center gap-3 mb-5 sm:mb-6 reveal-up" style={{ transitionDelay: '0.35s' }}>
          <div className="h-px w-10 md:w-16 bg-gradient-to-r from-transparent to-neon-cyan/40" />
          <div className="w-1.5 h-1.5 rotate-45 border border-neon-cyan/50" />
          <div className="h-px w-20 md:w-32 bg-gradient-to-r from-neon-cyan/40 via-primary/30 to-transparent" />
          <div className="w-1.5 h-1.5 rotate-45 border border-primary/50" />
          <div className="h-px w-10 md:w-16 bg-gradient-to-l from-transparent to-neon-cyan/40" />
        </div>

        {/* Updated Title and Positioning */}
        <h2
          className="font-label text-label-mono md:text-[17px] tracking-[0.2em] uppercase mb-4 sm:mb-5 reveal-up text-[11px] sm:text-sm font-bold"
          style={{
            color: '#fbbf24',
            textShadow: '0 0 20px rgba(251, 191, 36, 0.35)',
            transitionDelay: '0.45s',
          }}
        >
          SENIOR AI SYSTEMS ENGINEER & OPEN-SOURCE ARCHITECT
        </h2>

        {/* Value Proposition Description */}
        <p
          className="font-body text-sm sm:text-base text-on-surface-variant max-w-3xl mb-8 sm:mb-10 reveal-up leading-relaxed"
          style={{ transitionDelay: '0.55s' }}
        >
          Architecting <span className="text-on-surface font-semibold">stateful agentic workflows</span> (LangGraph),{' '}
          <span className="text-secondary-container font-semibold">sub-second streaming voice AI</span> (&lt;380ms WebSockets),{' '}
          <span className="text-primary font-semibold">local-first Graph-RAG & MCP servers</span>, and{' '}
          <span className="text-neon-green font-semibold">deterministic safety evaluation suites</span>.
          <span className="block mt-1 text-on-surface-variant/90 text-xs sm:text-sm">
            MSc Information Systems (Nottingham) · currently @ Risidio (London) · Open to Senior AI & Agentic roles in the UK.
          </span>
        </p>

        {/* Status Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10 glass-panel p-4 md:p-5 rounded-xl w-full max-w-4xl reveal-up border-t border-l border-white/10" style={{ transitionDelay: '0.65s' }}>
          <div className="flex flex-col items-center text-center md:border-r border-glass-border md:pr-2">
            <span className="font-label text-[10px] text-outline uppercase tracking-wider mb-1">Location</span>
            <span className="font-terminal text-primary text-[14px] md:text-[15px]">LONDON, UK</span>
          </div>
          <div className="flex flex-col items-center text-center md:border-r border-glass-border md:pr-2">
            <span className="font-label text-[10px] text-outline uppercase tracking-wider mb-1">Focus</span>
            <span className="font-terminal text-primary text-[14px] md:text-[15px]">AGENTIC AI & VOICE</span>
          </div>
          <div className="flex flex-col items-center text-center md:border-r border-glass-border md:pr-2">
            <span className="font-label text-[10px] text-outline uppercase tracking-wider mb-1">Experience</span>
            <span className="font-terminal text-primary text-[14px] md:text-[15px]">3+ YEARS</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="font-label text-[10px] text-outline uppercase tracking-wider mb-1">Availability</span>
            <span className="font-terminal text-neon-green text-[14px] md:text-[15px] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" /> OPEN (UK VISA)
            </span>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 md:mb-10 reveal-up" style={{ transitionDelay: '0.75s' }}>
          {[
            { value: '<380ms', label: 'Voice Latency', color: 'border-secondary-container/30 hover:border-secondary-container/60 shadow-[0_0_15px_rgba(0,240,255,0.1)]' },
            { value: '258', label: 'Tests Passing', color: 'border-primary/30 hover:border-primary/60 shadow-[0_0_15px_rgba(251,191,36,0.1)]' },
            { value: '0.98', label: 'RAG Faithfulness', color: 'border-neon-green/30 hover:border-neon-green/60 shadow-[0_0_15px_rgba(57,255,20,0.1)]' },
            { value: '100%', label: 'Local MCP Privacy', color: 'border-cyber-purple/30 hover:border-cyber-purple/60 shadow-[0_0_15px_rgba(184,71,255,0.1)]' },
          ].map((m, i) => (
            <div key={i} className={`glass-panel px-4 py-2.5 md:px-6 md:py-3 rounded-md flex items-center gap-3 border transition-colors ${m.color}`}>
              <span className="font-terminal text-primary text-lg sm:text-xl font-bold">{m.value}</span>
              <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider w-20 text-left leading-tight">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 md:mb-12 reveal-up" style={{ transitionDelay: '0.85s' }}>
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-container via-cyber-purple to-secondary-container text-background font-label text-label-mono tracking-widest uppercase rounded font-bold transition-all hover:shadow-[0_0_30px_rgba(184,71,255,0.6)] hover:scale-[1.02]"
          >
            <Sparkles size={16} /> Explore 7 Shipped AI Systems <ArrowRight size={15} />
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-container/60 text-primary-container font-label text-label-mono tracking-widest uppercase rounded transition-all hover:bg-primary-container/10 hover:border-primary-container font-semibold"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
