import { useState } from 'react';
import Navigation from '@/sections/Navigation';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import SkillsSection from '@/sections/SkillsSection';
import ExperienceSection from '@/sections/ExperienceSection';
import ProjectsSection from '@/sections/ProjectsSection';
import EducationSection from '@/sections/EducationSection';
import ContactSection from '@/sections/ContactSection';
import Footer from '@/sections/Footer';
import DataFluxBackground from '@/components/DataFluxBackground';
import CircuitBoardBackground from '@/components/CircuitBoardBackground';
import ArcReactorHero from '@/components/ArcReactorHero';
import JARVISChatbot from '@/components/JARVISChatbot';
import JARVISLoader from '@/components/JARVISLoader';
import OpenToWork from '@/components/OpenToWork';
import CyberneticScrollHUD from '@/components/CyberneticScrollHUD';
import VoiceWaveformScrubber from '@/components/VoiceWaveformScrubber';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [revealContent, setRevealContent] = useState(false);

  const handleLoaderComplete = () => {
    setLoading(false);
    setTimeout(() => {
      setRevealContent(true);
    }, 500);
  };

  return (
    <>
      {loading && <JARVISLoader onComplete={handleLoaderComplete} />}

      {/* Background Arc Reactor with scroll velocity overdrive */}
      <ArcReactorHero />

      {/* Holographic content and structural grids fade in around the reactor */}
      <div
        className="relative min-h-screen antialiased selection:bg-primary-container/30 selection:text-primary overflow-x-hidden transition-opacity ease-in-out"
        style={{
          opacity: revealContent ? 1 : 0,
          transitionDuration: '1400ms',
        }}
      >
        {/* Background visual components */}
        <DataFluxBackground />
        <CircuitBoardBackground />

        {/* Global Cybernetic Scroll HUD Telemetry Rail */}
        <CyberneticScrollHUD />

        {/* Navigation */}
        <Navigation />

        {/* Persistent "Open to Work" banner (dismissible) */}
        <OpenToWork />

        {/* Skip-to-content for accessibility */}
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-background focus:rounded focus:font-label focus:text-sm"
        >
          Skip to content
        </a>

        {/* Main Content */}
        <main className="relative z-10">
          <HeroSection />

          {/* VoxFlow Scroll-Driven Audio PCM Spectrogram Scrubber */}
          <VoiceWaveformScrubber />

          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <EducationSection />
          <ContactSection />
        </main>

        <Footer />

        {/* JARVIS Chatbot */}
        <JARVISChatbot />
      </div>
    </>
  );
}
