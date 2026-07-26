import { useReveal } from '@/hooks/useReveal';
import { Mail, Linkedin, Github, FileText, MessageCircle, ArrowRight } from 'lucide-react';

// ────────────────────────────────────────────────────────────
// CONFIG — update these two values before deploying
// ────────────────────────────────────────────────────────────
const RESUME_URL = '/Jeevesh%20Singale%20Resume%20AI%20Engineer.pdf';  // Updated resume
const RESUME_LAST_UPDATED = 'Jul 2026';
// ────────────────────────────────────────────────────────────

const PRIMARY_CTAS = [
  {
    icon: <FileText size={20} />,
    label: 'Download Résumé',
    sublabel: `PDF · updated ${RESUME_LAST_UPDATED}`,
    href: RESUME_URL,
    download: true,
    color: 'primary',
  },
  {
    icon: <MessageCircle size={20} />,
    label: 'Message on LinkedIn',
    sublabel: 'Fastest response · DM open',
    href: 'https://www.linkedin.com/in/jeevesh-singale07/',
    color: 'secondary',
  },
  {
    icon: <Mail size={20} />,
    label: 'Email Directly',
    sublabel: 'jeevesh2515@gmail.com',
    href: 'mailto:jeevesh2515@gmail.com',
    color: 'tertiary',
  },
];

const SECONDARY_LINKS = [
  { icon: <Github size={18} />, label: 'GITHUB', value: 'jeevesh2515', href: 'https://github.com/jeevesh2515' },
  { icon: <Linkedin size={18} />, label: 'LINKEDIN', value: 'jeevesh-singale07', href: 'https://www.linkedin.com/in/jeevesh-singale07/' },
];

const COLOR_CLASSES: Record<string, { border: string; text: string; glow: string }> = {
  primary: {
    border: 'border-primary/40 hover:border-primary',
    text: 'text-primary hover:text-primary',
    glow: 'hover:shadow-[0_0_25px_rgba(251,191,36,0.35)]',
  },
  secondary: {
    border: 'border-secondary-container/40 hover:border-secondary-container',
    text: 'text-secondary-container hover:text-secondary-container',
    glow: 'hover:shadow-[0_0_25px_rgba(0,229,255,0.35)]',
  },
  tertiary: {
    border: 'border-cyber-purple/40 hover:border-cyber-purple',
    text: 'text-cyber-purple hover:text-cyber-purple',
    glow: 'hover:shadow-[0_0_25px_rgba(184,71,255,0.35)]',
  },
};

export default function ContactSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="contact" className="relative py-section-gap">
      <div className="max-w-5xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
        {/* Section Label */}
        <div className="flex items-center justify-center gap-4 mb-12 reveal-up">
          <div className="w-12 h-px bg-glass-border" />
          <div className="w-2 h-2 rounded-full bg-primary led-indicator" />
          <span className="font-terminal text-label-mono text-on-surface-variant tracking-widest uppercase">// 06 — COMMUNICATION PORT</span>
          <div className="w-12 h-px bg-glass-border" />
          <div className="w-2 h-2 rounded-full bg-primary led-indicator" />
        </div>

        <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4 reveal-up" style={{ transitionDelay: '0.1s' }}>
          LET&apos;S <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-cyber-purple">BUILD</span> SOMETHING
        </h2>
        <p className="font-body text-body-md text-on-surface-variant mb-10 max-w-2xl mx-auto reveal-up" style={{ transitionDelay: '0.2s' }}>
          I&apos;m currently <span className="text-neon-green font-semibold">open to AI Engineer roles</span> in the UK — production LLM systems, RAG platforms, agentic workflows, and ML/data engineering.
          Open to opportunities alongside my current role at Risidio (London) — recruiters, hiring managers, founders welcome. Fastest response is LinkedIn DM.
        </p>

        {/* Primary CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 reveal-up" style={{ transitionDelay: '0.3s' }}>
          {PRIMARY_CTAS.map((cta) => {
            const c = COLOR_CLASSES[cta.color];
            return (
              <a
                key={cta.label}
                href={cta.href}
                {...(cta.download ? { download: true } : {})}
                target={cta.href.startsWith('http') ? '_blank' : undefined}
                rel={cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`glass-panel p-6 rounded-md flex flex-col items-center gap-2 border ${c.border} ${c.glow} transition-all duration-300 hover:-translate-y-1 group`}
              >
                <span className={c.text}>{cta.icon}</span>
                <span className={`font-label text-[11px] tracking-widest uppercase ${c.text}`}>{cta.label}</span>
                <span className="font-terminal text-[11px] text-on-surface-variant">{cta.sublabel}</span>
                <ArrowRight size={14} className={`${c.text} opacity-0 group-hover:opacity-100 transition-opacity mt-1`} />
              </a>
            );
          })}
        </div>

        {/* Secondary links */}
        <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto mb-10 reveal-up" style={{ transitionDelay: '0.5s' }}>
          {SECONDARY_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel px-4 py-3 rounded-md flex items-center gap-3 border border-outline-variant/40 hover:border-primary/40 transition-all group"
            >
              <span className="text-on-surface-variant group-hover:text-primary transition-colors">{link.icon}</span>
              <div className="text-left min-w-0">
                <div className="font-label text-[9px] text-on-surface-variant tracking-widest uppercase">{link.label}</div>
                <div className="font-terminal text-xs text-on-surface truncate">{link.value}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Status + location */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 reveal-up" style={{ transitionDelay: '0.7s' }}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse led-indicator" />
            <p className="font-terminal text-xs text-on-surface-variant">
              Based in London, UK · open to on-site, hybrid, and remote UK roles
            </p>
          </div>
        </div>

        <p className="font-terminal text-[10px] text-outline mt-6 reveal-up" style={{ transitionDelay: '0.8s' }}>
          Right to work: UK Graduate visa (PSW) · Seeking Sponsorship
        </p>
      </div>
    </section>
  );
}
