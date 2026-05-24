import { useReveal } from '@/hooks/useReveal';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';

const CONTACTS = [
  { icon: <Mail size={22} />, label: 'EMAIL', value: 'jeevesh2515@gmail.com', href: 'mailto:jeevesh2515@gmail.com', color: 'text-primary hover:text-primary-container' },
  { icon: <Phone size={22} />, label: 'DIRECT LINE', value: '+44 7436 357330', href: 'tel:+447436357330', color: 'text-neon-green hover:text-neon-green' },
  { icon: <Linkedin size={22} />, label: 'LINKEDIN', value: 'jeevesh-singale07', href: 'https://linkedin.com/in/jeevesh-singale07', color: 'text-secondary-container hover:text-secondary' },
  { icon: <Github size={22} />, label: 'GITHUB', value: 'jeevesh2515', href: 'https://github.com/jeevesh2515', color: 'text-cyber-purple hover:text-cyber-purple' },
];

export default function ContactSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="contact" className="relative py-section-gap">
      <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
        {/* Section Label */}
        <div className="flex items-center justify-center gap-4 mb-12 reveal-up">
          <div className="w-12 h-px bg-glass-border" />
          <div className="w-2 h-2 rounded-full bg-primary led-indicator" />
          <span className="font-terminal text-label-mono text-on-surface-variant tracking-widest uppercase">// 06 — COMMUNICATION PORT</span>
          <div className="w-12 h-px bg-glass-border" />
          <div className="w-2 h-2 rounded-full bg-primary led-indicator" />
        </div>

        <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4 reveal-up glitch-reveal" style={{ transitionDelay: '0.1s' }}>
          INITIATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-cyber-purple">CONTACT</span>
        </h2>
        <p className="font-body text-body-md text-on-surface-variant mb-12 reveal-up" style={{ transitionDelay: '0.2s' }}>
          Ready to architect the next intelligent system. Let&apos;s connect.
        </p>

        {/* CTA Button */}
        <div className="reveal-up mb-12" style={{ transitionDelay: '0.3s' }}>
          <a href="mailto:jeevesh2515@gmail.com"
            className="inline-flex items-center justify-center gap-3 px-12 py-4 border-2 border-primary text-primary font-display text-label-mono tracking-[0.15em] uppercase rounded transition-all duration-300 hover:bg-primary/10 hover:shadow-glow-lg hover:text-primary-fixed hover:scale-[1.02] animate-data-pulse"
            style={{ borderRadius: '9999px' }}>
            <Send size={18} /> SEND TRANSMISSION
          </a>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-2 gap-4">
          {CONTACTS.map((contact, i) => (
            <a key={i} href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`reveal-up glass-panel p-6 rounded-md flex flex-col items-center gap-3 border border-outline-variant/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 group ${contact.color}`}
              style={{ transitionDelay: `${(i + 4) * 0.1}s` }}>
              <span className="transition-transform duration-300 group-hover:scale-110">{contact.icon}</span>
              <span className="font-label text-[10px] text-on-surface-variant tracking-[0.15em]">{contact.label}</span>
              <span className="font-terminal text-xs text-on-surface group-hover:text-inherit transition-colors">{contact.value}</span>
            </a>
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-3 mt-12 reveal-up" style={{ transitionDelay: '0.8s' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse led-indicator" />
          <p className="font-terminal text-xs text-on-surface-variant">
            System online in London, UK · Open to collaborative research & enterprise architecture inquiries
          </p>
        </div>
      </div>
    </section>
  );
}
