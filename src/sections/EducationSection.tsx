import { useState, useEffect, useRef } from 'react';
import { useReveal } from '@/hooks/useReveal';

const CONSOLE_LINES = [
  { text: '$ cat education.log', color: 'text-primary' },
  { text: '', color: 'text-on-surface-variant' },
  { text: '[2023-09-01 → 2024-09-01]', color: 'text-on-surface-variant' },
  { text: '> MSc Information Systems & Operations Management', color: 'text-secondary-container' },
  { text: '  University of Nottingham, UK', color: 'text-on-surface-variant' },
  { text: '  Modules: Data Management · Business Intelligence & Analytics', color: 'text-on-surface-variant' },
  { text: '           Management Science · Information Systems Design', color: 'text-on-surface-variant' },
  { text: '', color: 'text-on-surface-variant' },
  { text: '[2019-08-01 → 2023-06-01]', color: 'text-on-surface-variant' },
  { text: '> BEng Information Technology', color: 'text-secondary-container' },
  { text: '  Mumbai University, India', color: 'text-on-surface-variant' },
  { text: '  GPA: 9.2 / 10', color: 'text-primary' },
  { text: '  Capstone: Share Market Prediction using Machine Learning', color: 'text-primary-fixed-dim' },
];

const CERTIFICATIONS = [
  { name: 'RAG & Advanced Retrieval — DeepLearning.AI', year: '2026', status: 'complete' as const },
  { name: 'Databricks Generative AI Fundamentals', year: '2025', status: 'complete' as const },
  { name: 'Working with OpenAI API — DataCamp', year: '2025', status: 'complete' as const },
  { name: 'Microsoft Power BI — Copilot & Dashboarding', year: '2025', status: 'complete' as const },
  { name: 'Google Data Foundations', year: '2024', status: 'complete' as const },
  { name: 'Python Specialization — University of Michigan', year: '2023', status: 'complete' as const },
  { name: 'Azure Fundamentals AZ-900', status: 'in-progress' as const },
  { name: 'Anthropic MCP & Advanced Topics', status: 'in-progress' as const },
];

function JARVISTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) {
      setVisibleLines(CONSOLE_LINES.length);
      return;
    }
    hasAnimated.current = true;

    let lineIdx = 0;
    const showNextLine = () => {
      if (lineIdx < CONSOLE_LINES.length) {
        setVisibleLines(lineIdx + 1);
        lineIdx++;
        setTimeout(showNextLine, 150);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(showNextLine, 300);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const el = document.getElementById('edu-terminal');
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div id="edu-terminal" className="module-housing rounded-xl overflow-hidden flex flex-col h-full min-h-[400px] relative">
      <div className="heatsink-pattern absolute inset-0 opacity-20 pointer-events-none" />
      <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="bg-surface-container-highest/80 border-b border-glass-border p-3 flex items-center justify-between z-20 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-error/80 led-indicator" />
            <div className="w-3 h-3 rounded-full bg-primary-container/80 led-indicator" />
            <div className="w-3 h-3 rounded-full bg-neon-green/80 led-indicator animate-pulse" />
          </div>
          <span className="font-terminal text-[12px] text-primary uppercase tracking-widest">education.log</span>
        </div>
        <div className="flex items-end gap-0.5">
          {[4, 6, 8, 10].map((h, i) => (
            <div key={i} className="w-0.5 rounded-sm bg-primary-dim" style={{ height: h, backgroundColor: '#4f4633' }} />
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-5 font-terminal text-sm leading-7 overflow-y-auto z-20 bg-black/40">
        {CONSOLE_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={line.color}>{line.text}</div>
        ))}
        {visibleLines >= CONSOLE_LINES.length && (
          <span className="inline-block w-2 h-4 bg-neon-green animate-blink align-middle ml-1" />
        )}
      </div>
    </div>
  );
}

export default function EducationSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="education" className="relative py-section-gap">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-12 reveal-up">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-green led-indicator" />
            <div className="w-12 h-px bg-glass-border" />
          </div>
          <span className="font-terminal text-label-mono text-on-surface-variant tracking-widest uppercase">// 05 — SYSTEM LOGS</span>
        </div>

        <div className="text-center mb-12 reveal-up" style={{ transitionDelay: '0.1s' }}>
          <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface">
            EDUCATION & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-primary-container">CERTIFICATIONS</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Terminal */}
          <div className="reveal-up" style={{ transitionDelay: '0.2s' }}>
            <JARVISTerminal />
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            {CERTIFICATIONS.map((cert, i) => (
              <div key={i} className="reveal-up flex items-center gap-3 px-4 h-12 rounded-md glass-panel border border-outline-variant/50 transition-all duration-300 hover:border-primary/40 hover:shadow-glow"
                style={{ transitionDelay: `${(i + 2) * 0.05}s` }}>
                <div className={`w-2 h-2 rounded-full shrink-0 ${cert.status === 'complete' ? 'bg-neon-green led-indicator' : 'bg-primary-container animate-pulse led-indicator'}`} />
                <span className="font-body text-sm text-on-surface flex-1 truncate">{cert.name}</span>
                {cert.status === 'complete' ? (
                  <span className="font-terminal text-xs text-on-surface-variant shrink-0">{cert.year}</span>
                ) : (
                  <span className="font-terminal text-xs text-primary-container tracking-wider shrink-0">IN PROGRESS</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
