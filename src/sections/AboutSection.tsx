import { useState, useEffect, useRef } from 'react';
import { useReveal } from '@/hooks/useReveal';
import NeuralNetworkHologram from '@/components/NeuralNetworkHologram';

const HIGHLIGHT_TERMS: Record<string, string> = {
  '96% accuracy': 'text-secondary-container',
  '1M+ record datasets': 'text-secondary-container',
  'LLM/RAG engineering': 'text-secondary-container',
  'semantic vector search': 'text-secondary-container',
  'knowledge graph traversal': 'text-cyber-purple',
  '6-node LangGraph': 'text-neon-green',
  'MSc Information Systems': 'text-primary',
  'ExpertIQ Copilot': 'text-primary',
  'Web3 revenue distribution': 'text-primary',
  '96%': 'text-secondary-container font-bold',
  '1M+': 'text-secondary-container font-bold',
  'multi-party royalty': 'text-primary',
};

const SPECIALIZATIONS = [
  { label: 'LLM & RAG SYSTEMS', color: 'border-secondary-container/30 text-secondary-container' },
  { label: 'DATA ENGINEERING', color: 'border-error/30 text-error' },
  { label: 'MLOps & CI/CD', color: 'border-cyber-purple/30 text-cyber-purple' },
  { label: 'FULL-STACK AI', color: 'border-neon-green/30 text-neon-green' },
];

function HighlightText({ text }: { text: string }) {
  const parts: { text: string; className?: string }[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    let found = false;
    for (const [term, className] of Object.entries(HIGHLIGHT_TERMS)) {
      if (remaining.startsWith(term)) {
        parts.push({ text: term, className });
        remaining = remaining.slice(term.length);
        found = true;
        break;
      }
    }
    if (!found) {
      let nextSpecial = remaining.length;
      for (const term of Object.keys(HIGHLIGHT_TERMS)) {
        const idx = remaining.indexOf(term);
        if (idx > 0 && idx < nextSpecial) nextSpecial = idx;
      }
      parts.push({ text: remaining.slice(0, nextSpecial) });
      remaining = remaining.slice(nextSpecial);
    }
  }

  return (
    <>
      {parts.map((p, i) =>
        p.className ? <span key={i} className={p.className}>{p.text}</span> : <span key={i}>{p.text}</span>
      )}
    </>
  );
}

export default function AboutSection() {
  const sectionRef = useReveal<HTMLElement>();
  const scrollRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress calculation — same proven pattern as SkillsSection
  useEffect(() => {
    const handleScroll = () => {
      const section = scrollRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Progress starts when top of section reaches 80% of viewport,
      // completes when top reaches -20% (section scrolled well past)
      const start = vh * 0.80;
      const end = vh * -0.20;
      const total = start - end;
      const current = start - rect.top;

      setScrollProgress(Math.max(0, Math.min(1, current / total)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={(el) => {
      // Share ref between useReveal and scroll tracking
      if (el) {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
        (scrollRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }
    }} id="about" className="relative py-section-gap">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-12 reveal-up">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary led-indicator shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            <div className="w-12 h-px bg-glass-border" />
          </div>
          <span className="font-terminal text-label-mono text-on-surface-variant tracking-widest uppercase">// 01 &mdash; SYSTEM OVERVIEW</span>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Neural Network Hologram (Fully visible and responsive across all screens) */}
          <div className="lg:col-span-2 flex justify-center items-center mb-10 lg:mb-0 lg:block">
            <div className="sticky top-24 md:top-32 reveal-scale w-full max-w-[320px] xs:max-w-[360px] md:max-w-[400px] aspect-square">
              <NeuralNetworkHologram scrollProgress={scrollProgress} />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-3">
            <h2 className="reveal-up font-display text-headline-lg-mobile lg:text-headline-lg text-on-surface mb-6">
              ARCHITECTING INTELLIGENT SYSTEMS
            </h2>

            <div className="reveal-up module-housing rounded-xl p-6 lg:p-8 relative overflow-hidden group"
              style={{ transitionDelay: '0.15s' }}>
              <div className="heatsink-pattern absolute inset-0 opacity-20 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-50" />
              <div className="flex justify-between items-start border-b border-glass-border pb-4 mb-6">
                <h3 className="font-display text-headline-lg-mobile text-primary uppercase">System Profile</h3>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse led-indicator" />
              </div>
              <div className="font-body text-body-md text-on-surface-variant leading-relaxed space-y-4 relative z-10">
                <p>
                  <HighlightText text="AI Engineer and Data Engineer with 3+ years of experience building and shipping ML pipelines, data platforms, and AI-powered systems. Delivered production-grade ML models achieving 96% accuracy on 1M+ record datasets." />
                </p>
                <p>
                  <HighlightText text="Built Web3 revenue distribution systems and AI-powered learning platforms at an active London AI startup. Flagship personal project — ExpertIQ Copilot — demonstrates end-to-end LLM/RAG engineering: semantic vector search, knowledge graph traversal, and 6-node LangGraph multi-agent orchestration." />
                </p>
                <p>
                  <HighlightText text="MSc Information Systems, University of Nottingham. Databricks Generative AI certified." />
                </p>
              </div>
              {/* Corner Decorations */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-primary/50 transition-all duration-300 group-hover:border-primary" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary/50 transition-all duration-300 group-hover:border-primary" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-primary/50 transition-all duration-300 group-hover:border-primary" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-primary/50 transition-all duration-300 group-hover:border-primary" />
            </div>

            {/* Specializations */}
            <div className="flex flex-wrap gap-3 mt-6 reveal-up" style={{ transitionDelay: '0.3s' }}>
              {SPECIALIZATIONS.map((spec, i) => (
                <div key={i} className={`px-4 py-2 border ${spec.color} rounded-md font-label text-xs tracking-widest uppercase bg-surface-container/50`}>
                  {spec.label}
                </div>
              ))}
            </div>

            {/* Current Focus */}
            <div className="flex items-center gap-3 mt-8 reveal-up" style={{ transitionDelay: '0.45s' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse led-indicator" />
              <p className="font-terminal text-sm text-on-surface-variant">
                Focus Area: Designing production-grade LLM agents, scalable RAG architectures, and real-time distributed data pipelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
