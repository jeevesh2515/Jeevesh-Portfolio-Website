import { useReveal } from '@/hooks/useReveal';
import { ExternalLink, Terminal } from 'lucide-react';

const PROJECTS = [
  {
    name: 'ExpertIQ Copilot',
    tagline: 'AI Expert Discovery & Retrieval Platform',
    taglineColor: 'text-cyber-purple',
    description: 'A 3-layer AI retrieval system combining semantic vector search (sentence-transformers + ChromaDB), multi-hop knowledge graph traversal (NetworkX), and a 6-node LangGraph multi-agent workflow (Groq Llama 3.1 70B) for re-ranking, reasoning, and C-suite executive summary generation.',
    techStack: ['Next.js 14', 'LangGraph', 'ChromaDB', 'D3.js', 'Docker', 'JWT', 'GitHub Actions'],
    stats: [
      { label: 'LAYERS', value: '3' },
      { label: 'AGENTS', value: '6' },
      { label: 'SCORING', value: 'HYBRID FUSION' },
    ],
    link: 'https://github.com/jeevesh2515/expertiq-copilot',
    dateRange: 'APR 2026 — ONGOING',
    status: 'ONGOING',
    codeSnippet: `def execute_search(query):
  vector_res = chroma.query(query)
  graph_res = nx.traverse(query)
  
  # Multi-agent synthesis
  agents = LangGraph.init(6)
  summary = agents.reason(
    vectors=vector_res,
    nodes=graph_res
  )
  return summary`,
  },
  {
    name: 'Telecom Customer Churn Prediction',
    tagline: 'End-to-End MLOps Pipeline',
    taglineColor: 'text-error',
    description: 'End-to-end MLOps pipeline on 1M+ rows; ensemble model (Random Forest, XGBoost, LSTM) achieved 96% accuracy — 12% above industry benchmark — projecting £2.3M in annual savings with full SHAP/LIME explainability and data governance documentation.',
    techStack: ['XGBoost', 'LSTM', 'Random Forest', 'SHAP', 'LIME', 'AWS', 'Azure'],
    stats: [
      { label: 'ACCURACY', value: '96%' },
      { label: 'SAVINGS', value: '£2.3M' },
      { label: 'RECORDS', value: '1M+' },
    ],
    dateRange: 'JUN — SEP 2024',
    codeSnippet: `def churn_predict(features):
  ensemble = VotingClassifier([
    ('rf', RandomForest()),
    ('xgb', XGBoost()),
    ('lstm', LSTM())
  ])
  pred = ensemble.predict(features)
  explain = shap.explain(pred)
  return pred, explain`,
  },
  {
    name: 'AI Client Onboarding Automation',
    tagline: 'Intelligent Process Automation',
    taglineColor: 'text-neon-green',
    description: 'Reduced client onboarding SLA by 60% via AI and RPA integration for real-time document processing, delivering 35% throughput improvement and 25% higher customer satisfaction.',
    techStack: ['RPA', 'AI Processing', 'REST API', 'Docker'],
    stats: [
      { label: 'SLA REDUCTION', value: '60%' },
      { label: 'THROUGHPUT', value: '35%' },
      { label: 'SATISFACTION', value: '25%' },
    ],
    dateRange: 'AUG 2025',
    codeSnippet: `def onboard(client_doc):
  extracted = ocr.extract(client_doc)
  verified = ai.verify(extracted)
  if verified.confidence > 0.95:
    auto_approve(verified)
  return Status.COMPLETE`,
  },
];

export default function ProjectsSection() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="projects" className="relative py-section-gap">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Label */}
        <div className="flex items-center justify-end gap-4 mb-12 reveal-up">
          <span className="font-terminal text-label-mono text-on-surface-variant tracking-widest uppercase">// 04 — INTEGRATED CIRCUITS</span>
          <div className="w-12 h-px bg-glass-border" />
          <div className="w-2 h-2 rounded-full bg-cyber-purple led-indicator" />
        </div>

        <div className="text-center mb-12 reveal-up" style={{ transitionDelay: '0.1s' }}>
          <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface glitch-reveal">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-primary-container">PROJECTS</span>
          </h2>
          <p className="font-body text-body-md text-on-surface-variant mt-3">Where modules converge into systems.</p>
        </div>

        {/* Section Title */}
        <div className="reveal-up flex items-center justify-end gap-4 mb-8">
          <span className="font-display text-lg text-on-surface uppercase tracking-wider">COMPILED SYSTEMS</span>
          <Terminal size={20} className="text-cyber-purple" />
        </div>

        <div className="space-y-10">
          {PROJECTS.map((project, i) => (
            <article key={i} className={`reveal-up project-card glass-panel rounded-sm p-0 overflow-hidden group border border-outline-variant relative transition-all duration-300 hover:shadow-[0_10px_40px_rgba(184,71,255,0.15)] hover:border-primary-container`}
              style={{ transitionDelay: `${(i + 1) * 0.15}s` }}>
              {/* Scanning Line */}
              <div className="scanning-line" />

              {/* Expansion Bus */}
              <div className="absolute left-0 top-0 bottom-0 w-4 border-r border-surface-variant bg-surface-container-highest z-20 hidden md:block">
                <div className="expansion-bus w-full h-full" />
              </div>

              <div className="grid md:grid-cols-[1fr_280px] gap-0 relative z-20">
                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-between md:pl-10">
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                      <h3 className="font-display text-headline-lg text-on-surface tracking-wide">{project.name}</h3>
                      {project.status && (
                        <div className="font-label text-[11px] text-neon-green flex items-center gap-2 bg-neon-green/5 border-neon-green/20 px-3 py-1 rounded-sm border">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" /> ONGOING
                        </div>
                      )}
                    </div>
                    <h4 className={`font-label text-label-mono ${project.taglineColor} mb-4 uppercase flex items-center gap-2`}>
                      <span className={`w-1 h-4 ${project.taglineColor.replace('text-', 'bg-')}`} /> {project.tagline}
                    </h4>
                    <p className="font-body text-body-md text-on-surface-variant mb-6">{project.description}</p>

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

                  {/* Link */}
                  <div className="flex items-center justify-between">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-label text-label-mono text-primary-container hover:text-primary transition-colors btn-border-draw pb-1">
                        View on GitHub <ExternalLink size={14} />
                      </a>
                    )}
                    <span className="font-terminal text-xs text-on-surface-variant">{project.dateRange}</span>
                  </div>
                </div>

                {/* Code Snippet */}
                <div className="hidden md:flex bg-black/80 border-l border-surface-variant p-6 flex-col justify-center font-terminal text-[13px] text-on-surface-variant leading-relaxed terminal-flicker">
                  <div className="flex items-center gap-2 mb-4 border-b border-surface-variant pb-3">
                    <span className="w-3 h-3 rounded-sm bg-error/80" />
                    <span className="w-3 h-3 rounded-sm bg-primary-container/80" />
                    <span className="w-3 h-3 rounded-sm bg-neon-green/80" />
                    <span className="ml-3 text-surface-variant font-label text-xs">agent_workflow.py</span>
                  </div>
                  <pre className="overflow-x-auto">
                    <code>{project.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
