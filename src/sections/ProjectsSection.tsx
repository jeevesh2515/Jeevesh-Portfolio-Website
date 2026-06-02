import { useReveal } from '@/hooks/useReveal';
import { ExternalLink, Github, Star, Terminal } from 'lucide-react';

interface ProjectStat {
  label: string;
  value: string;
}

interface Project {
  name: string;
  tagline: string;
  taglineColor: string;
  description: string;
  problem: string;
  approach: string;
  result: string;
  techStack: string[];
  stats: ProjectStat[];
  link: string;
  demo?: string;
  dateRange: string;
  status?: 'ONGOING' | 'SHIPPED';
  featured?: boolean;
  language: string;
}

const PROJECTS: Project[] = [
  {
    name: 'ExpertIQ Copilot',
    tagline: 'AI Expert Discovery & Retrieval Platform',
    taglineColor: 'text-cyber-purple',
    description:
      'A 3-layer AI retrieval system combining semantic vector search (sentence-transformers + ChromaDB), multi-hop knowledge graph traversal (NetworkX), and a 6-node LangGraph multi-agent workflow (Groq Llama 3.1 70B) for re-ranking, reasoning, and C-suite executive summary generation.',
    problem:
      'Traditional RAG pipelines return surface-level results and miss the expert connections that matter for strategic decisions.',
    approach:
      'Hybrid fusion scoring across vector similarity, graph centrality, and agent re-ranking — orchestrated via LangGraph.',
    result:
      'End-to-end LLM/RAG system with 6 specialised agents producing executive-grade synthesis from heterogeneous knowledge sources.',
    techStack: ['Next.js 14', 'LangGraph', 'ChromaDB', 'NetworkX', 'Groq (Llama 3.1 70B)', 'FastAPI', 'Docker', 'GitHub Actions'],
    stats: [
      { label: 'RETRIEVAL LAYERS', value: '3' },
      { label: 'AGENTS', value: '6' },
      { label: 'SCORING', value: 'HYBRID' },
    ],
    link: 'https://github.com/jeevesh2515/expertiq-copilot',
    dateRange: 'APR — JUN 2026',
    status: 'ONGOING',
    featured: true,
    language: 'Python',
  },
  {
    name: 'AI Job Agent',
    tagline: 'LLM-Powered Job Search Automation',
    taglineColor: 'text-primary-container',
    description:
      'An agentic job-search assistant that scrapes, classifies, ranks, and tailors applications against live listings using an LLM-driven workflow.',
    problem:
      'Manual job hunting across 20+ boards is slow, repetitive, and produces low-quality, generic applications.',
    approach:
      'Agent pipeline: scrape → classify (fit score) → tailor CV/cover letter via LLM → track in dashboard.',
    result:
      'Reduces end-to-end job application time from ~30 min to under 3 min per role with personalised output.',
    techStack: ['TypeScript', 'LLM APIs', 'Web Scraping', 'Agent Workflow'],
    stats: [
      { label: 'TIME SAVED / ROLE', value: '~90%' },
      { label: 'PIPELINE STAGES', value: '4' },
      { label: 'TYPE', value: 'AGENTIC' },
    ],
    link: 'https://github.com/jeevesh2515/job-agent',
    dateRange: 'MAY 2026',
    language: 'TypeScript',
  },
  {
    name: 'AI Engineering Roadmap',
    tagline: 'Free Curated Learning Platform',
    taglineColor: 'text-neon-green',
    description:
      'A web app aggregating the best free AI/ML resources into a single structured learning path — MIT-licensed open source.',
    problem:
      'Quality AI engineering learning is fragmented across blogs, YouTube, papers, and courses. Beginners don\'t know what to read first.',
    approach:
      'Curated roadmap with progress tracking, resource ratings, and topic-based filtering — built as a public good.',
    result:
      'Shipped as MIT-licensed open source; live learning platform for aspiring AI engineers.',
    techStack: ['TypeScript', 'React', 'Roadmap Engine', 'MIT License'],
    stats: [
      { label: 'LICENSE', value: 'MIT' },
      { label: 'TYPE', value: 'OPEN SOURCE' },
      { label: 'TOPIC COVERAGE', value: 'AI / ML' },
    ],
    link: 'https://github.com/jeevesh2515/AI-Engineering-roadmap',
    dateRange: 'MAY 2026',
    language: 'TypeScript',
  },
  {
    name: 'Creative Rights Tracker',
    tagline: 'Web3 Revenue & Rights Dashboard',
    taglineColor: 'text-error',
    description:
      'Production dashboard at Risidio for tracking creative revenue and automating multi-party royalty distribution via smart contract integration.',
    problem:
      'Royalty splits across collaborators were manual, opaque, and prone to disputes in the Web3 creative economy.',
    approach:
      'Next.js dashboard aggregating on-chain events, automating splits, and exposing transparent history per contributor.',
    result:
      'Live production tool at Risidio; removed manual reconciliation and provided auditable royalty history.',
    techStack: ['Next.js', 'TypeScript', 'Web3 / Smart Contracts', 'Dashboard'],
    stats: [
      { label: 'STATUS', value: 'IN PRODUCTION' },
      { label: 'EMPLOYER', value: 'RISIDIO' },
      { label: 'LICENSE', value: 'MIT' },
    ],
    link: 'https://github.com/jeevesh2515/creative-rights-tracker',
    dateRange: 'SEP 2025 — PRESENT',
    language: 'TypeScript',
  },
  {
    name: 'AI Client Onboarding Automation',
    tagline: 'Intelligent Process Automation',
    taglineColor: 'text-neon-green',
    description:
      'End-to-end client onboarding automation: input a company URL → generate business insights, tailored proposals, and resource estimates via AI.',
    problem:
      'Agencies and consultancies lose days per engagement on manual research and proposal drafting for new clients.',
    approach:
      'URL → scrape → LLM extraction (business model, scale, signals) → tailored proposal template generation.',
    result:
      '60% reduction in client onboarding SLA · 35% throughput improvement · 25% higher CSAT in pilot.',
    techStack: ['Python', 'AI / LLM Processing', 'Web Scraping', 'RPA', 'REST API', 'Docker'],
    stats: [
      { label: 'SLA REDUCTION', value: '60%' },
      { label: 'THROUGHPUT', value: '+35%' },
      { label: 'CSAT', value: '+25%' },
    ],
    link: 'https://github.com/jeevesh2515/ai-onboarding-automation',
    dateRange: 'AUG 2025',
    language: 'Python',
  },
  {
    name: 'Telecom Churn Prediction',
    tagline: 'End-to-End MLOps Pipeline',
    taglineColor: 'text-error',
    description:
      'Production ML pipeline on 1M+ telecom customer records. Ensemble of Random Forest + XGBoost + LSTM, with SHAP/LIME explainability and full data governance documentation.',
    problem:
      'Telecom churn was being identified too late, with no model interpretability for regulated stakeholders.',
    approach:
      'Ensemble model + SHAP/LIME explanations + ETL on AWS/Azure + MLOps monitoring and observability stack.',
    result:
      '96% prediction accuracy — 12% above industry benchmark — projecting £2.3M in annual savings.',
    techStack: ['Python', 'XGBoost', 'LSTM', 'Random Forest', 'SHAP', 'LIME', 'AWS', 'Azure'],
    stats: [
      { label: 'ACCURACY', value: '96%' },
      { label: 'SAVINGS', value: '£2.3M' },
      { label: 'RECORDS', value: '1M+' },
    ],
    link: 'https://github.com/jeevesh2515/Customer-CHURN-Prediction-and-Retention-Strategy',
    dateRange: 'JUN — SEP 2024',
    language: 'Python',
  },
];

export default function ProjectsSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="projects" className="relative py-section-gap">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Label */}
        <div className="flex items-center justify-end gap-4 mb-12 reveal-up">
          <span className="font-terminal text-label-mono text-on-surface-variant tracking-widest uppercase">// 04 — SHIPPED SYSTEMS</span>
          <div className="w-12 h-px bg-glass-border" />
          <div className="w-2 h-2 rounded-full bg-cyber-purple led-indicator" />
        </div>

        <div className="text-center mb-4 reveal-up" style={{ transitionDelay: '0.1s' }}>
          <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-primary-container">PROJECTS</span>
          </h2>
          <p className="font-body text-body-md text-on-surface-variant mt-3 max-w-2xl mx-auto">
            Production-deployed systems with real code, real data, and measurable outcomes. <a href="https://github.com/jeevesh2515?tab=repositories&sort=updated" target="_blank" rel="noopener noreferrer" className="text-primary-container hover:text-primary underline underline-offset-4">View all 18 repos on GitHub →</a>
          </p>
        </div>

        {/* Section Title */}
        <div className="reveal-up flex items-center justify-end gap-4 mb-8">
          <span className="font-display text-lg text-on-surface uppercase tracking-wider">COMPILED SYSTEMS</span>
          <Terminal size={20} className="text-cyber-purple" />
        </div>

        <div className="space-y-8">
          {PROJECTS.map((project, i) => (
            <article
              key={project.name}
              className={`reveal-up glass-panel rounded-sm p-0 overflow-hidden group border relative transition-all duration-300 hover:shadow-[0_10px_40px_rgba(184,71,255,0.15)] ${
                project.featured
                  ? 'border-primary-container/60 shadow-[0_0_25px_rgba(184,71,255,0.12)]'
                  : 'border-outline-variant hover:border-primary-container'
              }`}
              style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
            >
              {/* Featured ribbon */}
              {project.featured && (
                <div className="absolute top-0 right-0 z-30 flex items-center gap-1.5 bg-gradient-to-r from-primary-container to-cyber-purple text-background font-label text-[10px] tracking-widest uppercase px-3 py-1 rounded-bl-md">
                  <Star size={11} fill="currentColor" /> Flagship
                </div>
              )}

              {/* Scanning Line */}
              <div className="scanning-line" />

              <div className="grid md:grid-cols-[1fr_320px] gap-0 relative z-20">
                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-between md:pl-10">
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4 flex-wrap gap-2 pr-20">
                      <h3 className="font-display text-headline-lg text-on-surface tracking-wide">{project.name}</h3>
                      {project.status && (
                        <div className="font-label text-[11px] text-neon-green flex items-center gap-2 bg-neon-green/5 border-neon-green/20 px-3 py-1 rounded-sm border">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" /> {project.status}
                        </div>
                      )}
                    </div>
                    <h4 className={`font-label text-label-mono ${project.taglineColor} mb-4 uppercase flex items-center gap-2`}>
                      <span className={`w-1 h-4 ${project.taglineColor.replace('text-', 'bg-')}`} /> {project.tagline}
                    </h4>
                    <p className="font-body text-body-md text-on-surface-variant mb-6 leading-relaxed">{project.description}</p>

                    {/* Mini case study — Problem / Approach / Result */}
                    <details className="mb-6 group/case">
                      <summary className="cursor-pointer font-label text-[11px] text-primary-container tracking-widest uppercase hover:text-primary transition-colors list-none flex items-center gap-2">
                        <span className="w-3 h-3 border border-primary-container/50 rotate-45 group-open/case:rotate-[225deg] transition-transform duration-300" />
                        Case study: Problem → Approach → Result
                      </summary>
                      <div className="mt-4 space-y-3 font-body text-sm text-on-surface-variant border-l-2 border-primary-container/30 pl-4">
                        <div>
                          <span className="font-label text-[10px] text-error tracking-widest uppercase block mb-1">Problem</span>
                          {project.problem}
                        </div>
                        <div>
                          <span className="font-label text-[10px] text-primary-container tracking-widest uppercase block mb-1">Approach</span>
                          {project.approach}
                        </div>
                        <div>
                          <span className="font-label text-[10px] text-neon-green tracking-widest uppercase block mb-1">Result</span>
                          {project.result}
                        </div>
                      </div>
                    </details>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="tech-tag font-label text-[11px] px-3 py-1.5 border border-surface-variant rounded-sm text-on-surface cursor-default bg-surface/50">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 mb-6">
                      {project.stats.map((stat, j) => (
                        <div key={j} className="text-center">
                          <div className="font-terminal text-primary text-lg font-bold">{stat.value}</div>
                          <div className="font-label text-[10px] text-on-surface-variant tracking-wider uppercase">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Links + Date */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-outline-variant/30">
                    <div className="flex items-center gap-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-label text-label-mono text-primary-container hover:text-primary transition-colors btn-border-draw pb-1"
                        aria-label={`View ${project.name} source code on GitHub`}
                      >
                        <Github size={14} /> Source <ExternalLink size={12} />
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-label text-label-mono text-neon-green hover:text-neon-green/80 transition-colors btn-border-draw pb-1"
                        >
                          Live demo <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-terminal text-[10px] text-outline uppercase tracking-wider px-2 py-0.5 border border-outline-variant/40 rounded-sm">
                        {project.language}
                      </span>
                      <span className="font-terminal text-xs text-on-surface-variant">{project.dateRange}</span>
                    </div>
                  </div>
                </div>

                {/* Right column: code preview / stats card */}
                <div className="hidden md:flex bg-black/80 border-l border-surface-variant p-5 flex-col gap-4 font-terminal text-[12px] text-on-surface-variant leading-relaxed">
                  <div className="flex items-center gap-2 border-b border-surface-variant pb-3">
                    <span className="w-3 h-3 rounded-sm bg-error/80" />
                    <span className="w-3 h-3 rounded-sm bg-primary-container/80" />
                    <span className="w-3 h-3 rounded-sm bg-neon-green/80" />
                    <span className="ml-3 text-surface-variant font-label text-[10px] uppercase tracking-widest">
                      {project.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.py
                    </span>
                  </div>

                  {/* Pseudo-code preview per project */}
                  <pre className="overflow-x-auto text-[11px] flex-1">
                    <code>{`# ${project.name}
# Stack: ${project.techStack.slice(0, 4).join(' · ')}
# Result: ${project.stats.map(s => `${s.value} ${s.label}`).join(' · ')}

def run(input):
  """${project.tagline}"""
  ${project.problem.length < 60 ? '# ' + project.problem.split('.')[0] : '# ' + project.problem.slice(0, 60) + '...'}
  ...
  return output`}</code>
                  </pre>

                  <div className="border-t border-surface-variant pt-3 space-y-1">
                    {project.stats.map((s, k) => (
                      <div key={k} className="flex justify-between text-[10px]">
                        <span className="text-outline uppercase tracking-wider">{s.label}</span>
                        <span className="text-primary font-bold">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View all on GitHub CTA */}
        <div className="text-center mt-12 reveal-up">
          <a
            href="https://github.com/jeevesh2515?tab=repositories&sort=updated"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary-container/50 text-primary-container font-label text-label-mono tracking-widest uppercase rounded transition-all hover:bg-primary-container/10 hover:border-primary-container hover:shadow-[0_0_20px_rgba(184,71,255,0.3)]"
          >
            <Github size={16} /> View all 18 repositories on GitHub <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
