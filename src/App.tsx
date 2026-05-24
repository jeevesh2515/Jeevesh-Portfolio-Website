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

export default function App() {
  const [loading, setLoading] = useState(true);
  const [revealContent, setRevealContent] = useState(false);

  const handleLoaderComplete = () => {
    setLoading(false);
    // Wait 500ms so only the glowing Arc Reactor is visible in the dark first,
    // then smoothly fade in all holographic HUD elements around it!
    setTimeout(() => {
      setRevealContent(true);
    }, 500);
  };

  return (
    <>
      {loading && <JARVISLoader onComplete={handleLoaderComplete} />}
      
      {/* Background Arc Reactor remains fully visible, lighting up first in the dark! */}
      <ArcReactorHero />

      {/* Holographic content and structural grids fade in around the reactor */}
      <div 
        className="relative min-h-screen antialiased selection:bg-primary-container/30 selection:text-primary overflow-x-hidden transition-opacity ease-in-out"
        style={{
          opacity: revealContent ? 1 : 0,
          transitionDuration: '1400ms'
        }}
      >
        {/* Background visual components */}
        <DataFluxBackground />
        <CircuitBoardBackground />

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="relative z-10">
          <HeroSection />
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
