import { useReveal } from '@/hooks/useReveal';
import { Cpu } from 'lucide-react';

const EXPERIENCES = [
  {
    role: 'AI-First Software Engineer & Data Analyst',
    company: 'RISIDIO',
    location: 'LONDON, UK',
    dateRange: 'SEP 2025 — PRESENT',
    isCurrent: true,
    glowColor: 'border-neon-green/40',
    dotColor: 'bg-neon-green',
    ledColor: 'shadow-[0_0_10px_#39ff14]',
    achievements: [
      'Built and shipped a Web3 Creative Revenue & Rights Dashboard in Next.js, integrating smart contract logic for automated multi-party royalty distribution',
      'Engineered automated ETL pipelines aggregating multi-source royalty and financial data into a centralised dashboard',
      'Contributed to building the AI-First Academy — internal LLM and MLOps upskilling curriculum',
      'Implemented JWT authentication, bcrypt, rate limiting, and Bandit static analysis; maintained CI/CD via GitHub Actions',
    ],
  },
  {
    role: 'Web Data Analyst & Web Developer',
    company: 'JAVISH JEWELLERY',
    location: 'MUMBAI, INDIA',
    dateRange: 'APR 2025 — SEP 2025',
    isCurrent: false,
    glowColor: 'border-primary/40',
    dotColor: 'bg-primary-container',
    ledColor: 'shadow-[0_0_10px_#fbbf24]',
    achievements: [
      'Architected multi-source ETL/ELT pipelines using Databricks and Apache Spark, cutting manual reporting time by 50%',
      'Built ML models for customer segmentation and demand forecasting, improving inventory efficiency by 25%',
      'Designed Power BI and Tableau dashboards with A/B-tested KPI frameworks',
    ],
  },
  {
    role: 'Data Science Apprentice',
    company: 'GLOBAL EDUTECH',
    location: 'PUNE, INDIA',
    dateRange: 'JUN 2022 — MAR 2025',
    isCurrent: false,
    glowColor: 'border-secondary-container/40',
    dotColor: 'bg-secondary-container',
    achievements: [
      'Built and productionised end-to-end ML pipelines on 1M+ records using XGBoost and LSTM, achieving 96% prediction accuracy — 12% above industry benchmark',
      'Engineered ETL workflows across AWS and Azure with 99%+ uptime; implemented MLOps monitoring and SHAP/LIME explainability',
      'Supported deployment of 5+ ML models with full observability stack',
    ],
  },
];

export default function ExperienceSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="experience" className="relative py-section-gap">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-12 reveal-up">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary led-indicator" />
            <div className="w-12 h-px bg-glass-border" />
          </div>
          <span className="font-terminal text-label-mono text-on-surface-variant tracking-widest uppercase">// 03 — PROCESSOR MODULES</span>
        </div>

        <div className="text-center mb-12 reveal-up" style={{ transitionDelay: '0.1s' }}>
          <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface glitch-reveal">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-neon-green">EXPERIENCE</span>
          </h2>
          <p className="font-body text-body-md text-on-surface-variant mt-3">Production deployments across AI, Data, and Web3.</p>
        </div>

        {/* Experience Cards */}
        <div className="relative space-y-8">
          {/* System Bus Line */}
          <div className="absolute left-[20px] top-12 bottom-0 system-bus-line hidden md:block z-0">
            <div className="data-line-flow h-full w-full" />
          </div>

          {/* Section Title */}
          <div className="reveal-up flex items-center gap-4 relative z-10 mb-8">
            <Cpu size={20} className="text-primary-container" />
            <span className="font-display text-lg text-on-surface uppercase tracking-wider">LOGIC MODULES</span>
          </div>

          {EXPERIENCES.map((exp, i) => (
            <article key={i} className={`reveal-up glass-panel rounded-md p-6 md:p-8 ml-0 md:ml-12 relative group transition-all duration-300 hover:translate-y-[-4px] border ${exp.glowColor} z-10`}
              style={{ transitionDelay: `${(i + 2) * 0.1}s` }}>
              {/* Bus Node */}
              <div className={`absolute -left-[54px] top-10 w-6 h-6 rounded-sm border-2 border-${exp.isCurrent ? 'neon-green' : 'surface-variant'} bg-background ${exp.ledColor} hidden md:flex items-center justify-center z-20`}>
                <div className={`w-2 h-2 ${exp.dotColor} rounded-sm ${exp.isCurrent ? 'animate-pulse' : ''}`} />
              </div>
              {/* Bus Connector */}
              <div className="bus-connector absolute -left-[30px] top-[48px] w-8 h-1 bg-surface-variant hidden md:block transition-all duration-300 z-10 group-hover:bg-primary-container group-hover:shadow-[0_0_12px_#fbbf24]" />

              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h3 className="font-display text-headline-lg-mobile text-on-surface mb-1">{exp.role}</h3>
                  <div className="font-label text-label-mono text-primary-container uppercase tracking-widest">
                    {exp.company} <span className="text-surface-variant mx-2">|</span> {exp.location}
                  </div>
                </div>
                <div className={`font-label text-[11px] ${exp.isCurrent ? 'text-neon-green bg-neon-green/5 border-neon-green/30' : 'text-on-surface-variant border-surface-variant bg-surface-container/50'} px-3 py-1 rounded border flex items-center gap-2`}>
                  {exp.isCurrent && <span className="w-1.5 h-1.5 rounded-sm bg-neon-green animate-pulse" />}
                  {exp.dateRange}
                </div>
              </div>

              {/* Achievements */}
              <ul className="font-body text-body-md text-on-surface-variant space-y-3">
                {exp.achievements.map((ach, j) => (
                  <li key={j} className="flex gap-3">
                    <span className={`${exp.isCurrent ? 'text-neon-green' : 'text-primary-container'} mt-1 font-terminal`}>&gt;</span>
                    {ach}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
