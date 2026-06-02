import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    const activeSections = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          activeSections.set(entry.target.id, entry.isIntersecting);
        });

        // Find the last section in DOM order that is currently intersecting the detection zone
        const currentActive = sections.reduce((active, id) => activeSections.get(id) ? id : active, '');
        setActiveSection(currentActive);
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
      scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-glass-border shadow-[0_0_15px_rgba(251,191,36,0.1)]' : 'bg-transparent'
    }`}>
      <div className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between">
        {/* Logo */}
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
           className="font-display text-headline-lg-mobile md:text-headline-lg text-primary tracking-tighter hover:glow-gold transition-all">
          <span className="text-primary-container">&lt;</span>JS<span className="text-primary-container">/&gt;</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <button key={link.label} onClick={() => handleClick(link.href)}
                className={`font-label text-label-mono transition-all duration-300 hover:text-primary hover:bg-glass-border px-3 py-1 rounded ${
                  isActive ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant'
                }`}>
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Status + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 font-label text-[12px]">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse led-indicator" />
            <span className="text-on-surface-variant">SYSTEM ONLINE</span>
          </div>
          <button className="md:hidden text-primary" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background/98 backdrop-blur-xl md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {NAV_LINKS.map((link, i) => (
              <button key={link.label} onClick={() => handleClick(link.href)}
                className="font-display text-xl text-on-surface hover:text-primary transition-colors tracking-widest"
                style={{ animationDelay: `${i * 100}ms` }}>
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
