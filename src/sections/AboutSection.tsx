import { useState, useEffect, useRef } from 'react';
import { useReveal } from '@/hooks/useReveal';
import NeuralNetworkHologram from '@/components/NeuralNetworkHologram';
import { Github, Linkedin, ExternalLink } from 'lucide-react';

const HIGHLIGHT_TERMS: Record<string, string> = {
  'Senior AI Systems Engineer & Open-Source Architect': 'text-primary font-bold',
  'stateful agentic workflows': 'text-secondary-container font-semibold',
  'sub-second streaming voice AI': 'text-neon-green font-semibold',
  'hybrid Graph-RAG': 'text-cyber-purple font-semibold',
  'deterministic safety evaluation': 'text-primary font-semibold',
  '<380ms glass-to-glass': 'text-secondary-container font-bold',
  '0.98 Faithfulness': 'text-neon-green font-bold',
  '258 passing tests': 'text-secondary-container font-bold',
  'VoxFlow Voice Agent': 'text-secondary-container',
  'Clinical RAG Agent': 'text-primary',
  'Cortex': 'text-cyber-purple',
  'ExpertIQ Copilot': 'text-primary',
  'Model Context Protocol (MCP)': 'text-secondary-container',
  'MSc Information Systems': 'text-primary',
  'LangGraph': 'text-secondary-container',
};

const SPECIALIZATIONS = [
  { label: 'STATEFUL AGENTS (LANGGRAPH)', color: 'border-secondary-container/30 text-secondary-container' },
  { label: 'STREAMING VOICE AI (<380ms)', color: 'border-neon-green/30 text-neon-green' },
  { label: 'HYBRID RAG & GRAPH-RAG (MCP)', color: 'border-cyber-purple/30 text-cyber-purple' },
  { label: 'SAFETY EVALS & GUARDRAILS (RAGAS)', color: 'border-primary/30 text-primary' },
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

  // Scroll progress calculation
  useEffect(() => {
    const handleScroll = () => {
      const section = scrollRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

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
    <section
      ref={(el) => {
        if (el) {
          (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
          (scrollRef as React.MutableRefObject<HTMLElement | null>).current = el;
        }
      }}
      id="about"
      className="relative py-section-gap"
    >
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-12 reveal-up">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary led-indicator shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            <div className="w-12 h-px bg-glass-border" />
          </div>
          <span className="font-terminal text-label-mono text-on-surface-variant tracking-widest uppercase">// 01 &mdash; SYSTEM ARCHITECTURE PROFILE</span>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Neural Network Hologram */}
          <div className="lg:col-span-2 flex justify-center items-center mb-10 lg:mb-0 lg:block">
            <div className="sticky top-24 md:top-32 reveal-scale w-full max-w-[320px] xs:max-w-[360px] md:max-w-[400px] aspect-square">
              <NeuralNetworkHologram scrollProgress={scrollProgress} />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-3">
            <h2 className="reveal-up font-display text-headline-lg-mobile lg:text-headline-lg text-on-surface mb-6">
              ARCHITECTING PRODUCTION AI SYSTEMS
            </h2>

            <div
              className="reveal-up module-housing rounded-xl p-6 lg:p-8 relative overflow-hidden group"
              style={{ transitionDelay: '0.15s' }}
            >
              <div className="heatsink-pattern absolute inset-0 opacity-20 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-50" />
              <div className="flex justify-between items-start border-b border-glass-border pb-4 mb-6">
                <h3 className="font-display text-headline-lg-mobile text-primary uppercase">Engineering Profile</h3>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse led-indicator" />
              </div>
              <div className="font-body text-body-md text-on-surface-variant leading-relaxed space-y-4 relative z-10">
                <p>
                  <HighlightText text="Senior AI Systems Engineer & Open-Source Architect with 3+ years of experience designing and shipping production-grade LLM pipelines, real-time agentic workflows, and distributed data systems. Specializing in stateful agentic workflows (LangGraph) and sub-second streaming voice AI with <380ms glass-to-glass latency." />
                </p>
                <p>
                  <HighlightText text="Creator of open-source flagship architectures: VoxFlow Voice Agent (bi-directional PCM streaming with instant barge-in), Clinical RAG Agent (evidence-based hypertension care achieving 0.98 Faithfulness across 258 passing tests), Cortex (local-first LanceDB + NetworkX Graph-RAG Model Context Protocol (MCP) server), and ExpertIQ Copilot (6-node multi-agent research intelligence)." />
                </p>
                <p>
                  <HighlightText text="MSc Information Systems, University of Nottingham. Currently engineering production AI platforms and Web3 systems at Risidio (London). Committed to deterministic safety evaluation, zero-hallucination grounding, and sub-second response architectures." />
                </p>
              </div>

              {/* Profile Quick Links */}
              <div className="flex flex-wrap items-center gap-4 pt-4 mt-6 border-t border-glass-border/60 relative z-10">
                <a
                  href="https://github.com/jeevesh2515"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-label text-label-mono text-primary-container hover:text-primary transition-colors text-xs"
                >
                  <Github size={14} /> github.com/jeevesh2515 <ExternalLink size={11} />
                </a>
                <a
                  href="https://www.linkedin.com/in/jeevesh-singale07/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-label text-label-mono text-secondary-container hover:text-secondary transition-colors text-xs"
                >
                  <Linkedin size={14} /> linkedin.com/in/jeevesh-singale07 <ExternalLink size={11} />
                </a>
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
                <div
                  key={i}
                  className={`px-4 py-2 border ${spec.color} rounded-md font-label text-xs tracking-widest uppercase bg-surface-container/50 font-semibold`}
                >
                  {spec.label}
                </div>
              ))}
            </div>

            {/* Current Focus */}
            <div className="flex items-center gap-3 mt-8 reveal-up" style={{ transitionDelay: '0.45s' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse led-indicator" />
              <p className="font-terminal text-sm text-on-surface-variant">
                Core Focus: Real-time low-latency voice pipelines, multi-agent LangGraph orchestration, hybrid vector + knowledge graph retrieval (MCP), and automated Ragas evaluation suites.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
