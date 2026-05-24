import { useEffect } from 'react';
import { useReveal } from '@/hooks/useReveal';

const FLOATING_WORDS = [
  { text: 'LangChain', top: '10%', delay: '0s', duration: '35s', direction: 'right', color: 'text-cyan-float' },
  { text: 'ETL Pipeline', top: '17%', delay: '2s', duration: '45s', direction: 'left', color: 'text-amber-float' },
  { text: 'FastAPI', top: '26%', delay: '5s', duration: '40s', direction: 'right', color: 'text-cyan-float' },
  { text: 'Databricks', top: '20%', delay: '0s', duration: '30s', direction: 'left', color: 'text-amber-float' },
  { text: 'TensorFlow', top: '13%', delay: '1s', duration: '50s', direction: 'right', color: 'text-cyan-float' },
  { text: 'SHAP Explainability', top: '36%', delay: '3s', duration: '38s', direction: 'left', color: 'text-cyan-float' },
  { text: 'Power BI', top: '40%', delay: '0s', duration: '42s', direction: 'right', color: 'text-amber-float' },
  { text: 'REST API', top: '56%', delay: '6s', duration: '32s', direction: 'right', color: 'text-cyan-float' },
  { text: 'PyTorch', top: '50%', delay: '2s', duration: '48s', direction: 'left', color: 'text-green-float' },
  { text: 'Knowledge Graphs', top: '66%', delay: '0s', duration: '55s', direction: 'right', color: 'text-amber-float' },
  { text: 'Semantic Retrieval', top: '70%', delay: '4s', duration: '36s', direction: 'left', color: 'text-cyan-float' },
  { text: 'Data Engineering', top: '80%', delay: '0s', duration: '40s', direction: 'right', color: 'text-cyan-float' },
  { text: 'LLM Engineer', top: '84%', delay: '1s', duration: '34s', direction: 'left', color: 'text-green-float' },
  { text: 'ChromaDB', top: '90%', delay: '7s', duration: '45s', direction: 'right', color: 'text-amber-float' },
  { text: 'Kubernetes', top: '87%', delay: '0s', duration: '30s', direction: 'left', color: 'text-green-float' },
  { text: 'CI/CD', top: '93%', delay: '5s', duration: '50s', direction: 'right', color: 'text-green-float' },
  { text: '96% Accuracy', top: '15%', delay: '3s', duration: '44s', direction: 'left', color: 'text-amber-float' },
  { text: 'RAG Pipeline', top: '33%', delay: '1s', duration: '39s', direction: 'right', color: 'text-green-float' },
  { text: 'Apache Spark', top: '44%', delay: '4s', duration: '47s', direction: 'left', color: 'text-cyan-float' },
  { text: 'Docker', top: '48%', delay: '2s', duration: '33s', direction: 'right', color: 'text-green-float' },
  { text: 'Groq Llama 3.1', top: '62%', delay: '6s', duration: '41s', direction: 'left', color: 'text-amber-float' },
  { text: 'Next.js', top: '74%', delay: '0s', duration: '37s', direction: 'right', color: 'text-green-float' },
  { text: 'Multi-Agent', top: '95%', delay: '3s', duration: '43s', direction: 'left', color: 'text-cyan-float' },
  { text: 'Vector Search', top: '78%', delay: '5s', duration: '46s', direction: 'right', color: 'text-amber-float' },
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
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop pt-24 pb-12 md:py-0">
      {/* Floating Text — higher opacity for better visibility */}
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

      {/* Core Content — z-30 ensures it renders on top of everything */}
      <div className="relative z-30 text-center flex flex-col items-center parallax-layer w-full max-w-5xl animate-fade-in" data-depth="-0.1">

        {/* Name — large, bright white, strong glow for maximum visibility */}
        <h1
          className="font-display text-[clamp(26px,7.5vw,96px)] tracking-tighter leading-none mb-2 sm:mb-3 reveal-up whitespace-nowrap"
          style={{
            color: '#ffffff',
            textShadow: '0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(0, 212, 255, 0.25), 0 0 100px rgba(0, 212, 255, 0.15), 0 2px 4px rgba(0, 0, 0, 0.8)',
            transitionDelay: '0.2s',
          }}
        >
          JEEVESH SINGALE
        </h1>

        {/* Horizontal decorative line */}
        <div className="flex items-center gap-3 mb-4 sm:mb-5 reveal-up" style={{ transitionDelay: '0.4s' }}>
          <div className="h-px w-10 md:w-16 bg-gradient-to-r from-transparent to-neon-cyan/40" />
          <div className="w-1.5 h-1.5 rotate-45 border border-neon-cyan/50" />
          <div className="h-px w-20 md:w-32 bg-gradient-to-r from-neon-cyan/40 via-primary/30 to-transparent" />
          <div className="w-1.5 h-1.5 rotate-45 border border-primary/50" />
          <div className="h-px w-10 md:w-16 bg-gradient-to-l from-transparent to-neon-cyan/40" />
        </div>

        <h2
          className="font-label text-label-mono md:text-[18px] tracking-[0.2em] uppercase mb-12 sm:mb-20 md:mb-36 lg:mb-40 reveal-up text-[10px] sm:text-sm"
          style={{
            color: '#fbbf24',
            textShadow: '0 0 20px rgba(251, 191, 36, 0.3)',
            transitionDelay: '0.5s',
          }}
        >
          AI-FIRST SOFTWARE ENGINEER & DATA ENGINEER
        </h2>

        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 glass-panel p-5 md:p-8 rounded-xl w-full max-w-3xl reveal-up border-t border-l border-white/10" style={{ transitionDelay: '0.7s' }}>
          <div className="flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-glass-border pb-3 md:pb-0 md:pr-4">
            <span className="font-label text-[12px] text-outline uppercase tracking-wider mb-2">Location</span>
            <span className="font-terminal text-primary text-[16px]">LONDON, UK</span>
          </div>
          <div className="flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-glass-border pb-3 md:pb-0 md:px-4">
            <span className="font-label text-[12px] text-outline uppercase tracking-wider mb-2">Focus</span>
            <span className="font-terminal text-primary text-[16px]">AGENTIC AI / ML</span>
          </div>
          <div className="flex flex-col items-center text-center pt-3 md:pt-0 md:pl-4">
            <span className="font-label text-[12px] text-outline uppercase tracking-wider mb-2">Experience</span>
            <span className="font-terminal text-primary text-[16px]">3+ YEARS</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 md:mb-24 reveal-up" style={{ transitionDelay: '0.85s' }}>
          {[
            { value: '96%', label: 'Model Accuracy', color: 'border-primary/20 hover:border-primary/50 shadow-[0_0_15px_rgba(251,191,36,0.1)]' },
            { value: '1M+', label: 'Records Processed', color: 'border-secondary-container/20 hover:border-secondary-container/50 shadow-[0_0_15px_rgba(0,240,255,0.1)]' },
            { value: '6', label: 'Agent Nodes', color: 'border-primary/20 hover:border-primary/50 shadow-[0_0_15px_rgba(251,191,36,0.1)]' },
            { value: '£2.3M', label: 'Projected Savings', color: 'border-secondary-container/20 hover:border-secondary-container/50 shadow-[0_0_15px_rgba(0,240,255,0.1)]' },
          ].map((m, i) => (
            <div key={i} className={`glass-panel px-4 py-2.5 md:px-6 md:py-3 rounded-md flex items-center gap-3 border transition-colors ${m.color}`}>
              <span className="font-terminal text-primary text-lg sm:text-xl font-bold">{m.value}</span>
              <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider w-16 text-left leading-tight">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 flex flex-col items-center z-30 reveal-up" style={{ transitionDelay: '1s' }}>
        <span className="font-label text-[10px] text-outline tracking-widest uppercase mb-4">Scroll to Initialize</span>
        <div className="w-px h-10 bg-gradient-to-b from-primary/50 to-transparent relative">
          <div className="absolute top-0 left-[-2px] w-[5px] h-[5px] bg-primary rounded-full animate-scroll-down shadow-[0_0_8px_rgba(251,191,36,1)]" />
        </div>
      </div>
    </section>
  );
}
