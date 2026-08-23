import { useReveal } from '@/hooks/useReveal';
import { ExternalLink, Github, Star, Terminal, Users, Sparkles } from 'lucide-react';

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
  community?: boolean;
  language: string;
  codeSnippet?: string;
}

const PROJECTS: Project[] = [
  {
    name: 'VoxFlow Voice Agent',
    tagline: 'Ultra-Low Latency Conversational Voice Agent (<380ms Glass-to-Glass)',
    taglineColor: 'text-secondary-container',
    description:
      'Real-time bi-directional streaming voice agent pipeline orchestrating Silero VAD, Deepgram Nova-2 streaming STT, Groq Llama 3.3 70B inference, and ElevenLabs / Amazon Polly TTS over raw PCM WebSockets with zero-lag barge-in interruption handling.',
    problem:
      'Standard conversational voice bots introduce 1.5s–3s of latency and break on user interruptions (barge-in), making natural voice interaction feel sluggish and jarring in production contact centers.',
    approach:
      'Engineered a full-duplex bi-directional raw PCM WebSocket pipeline: Silero VAD detects speech boundaries in <10ms → Deepgram Nova-2 streams partial transcriptions → Groq Llama 3.3 70B streams response tokens → ElevenLabs / Polly synthesizes chunked PCM audio with atomic cancellation queues for instant interruption.',
    result:
      'Sub-380ms glass-to-glass turnaround, full barge-in cancellation within 40ms, resilient 4-tier fallback hierarchy, and enterprise Amazon Connect telephony integration.',
    techStack: [
      'Python 3.12',
      'FastAPI',
      'LangGraph',
      'Deepgram Nova-2',
      'Groq',
      'ElevenLabs',
      'WebSockets',
      'Amazon Connect',
      'Next.js 14',
    ],
    stats: [
      { label: 'GLASS-TO-GLASS', value: '<380ms' },
      { label: 'PCM STREAMING', value: '16kHz' },
      { label: 'FALLBACK ROUTING', value: '4-Tier' },
    ],
    link: 'https://github.com/jeevesh2515/voxflow-voice-agent',
    dateRange: 'JUL — AUG 2026',
    status: 'SHIPPED',
    featured: true,
    language: 'Python',
    codeSnippet: `# VoxFlow Real-Time Voice Pipeline
async def stream_voice_session(websocket: WebSocket):
    vad = SileroVAD(threshold=0.5)
    stt = DeepgramStreamingClient(model="nova-2")
    tts = ElevenLabsChunkedStreamer(voice="aria")
    
    async for pcm_frame in websocket.iter_bytes():
        if vad.is_speech(pcm_frame):
            tts.interrupt() # Instant atomic barge-in
            partial_text = await stt.send(pcm_frame)
            async for token in groq_llm.stream(partial_text):
                audio_chunk = await tts.synthesize(token)
                await websocket.send_bytes(audio_chunk)`,
  },
  {
    name: 'Clinical RAG Agent',
    tagline: 'Production-Grade Agentic RAG for Chronic Hypertension Care',
    taglineColor: 'text-secondary-container',
    description:
      'Zero-hallucination clinical workflow assistant combining hybrid Cohere dense + BM25 sparse retrieval, a 27-concept OKF knowledge spine, LangGraph stateful safety routing, deterministic medical calculators (eGFR, MAP, BMI), and a 55-question golden LangSmith evaluation suite.',
    problem:
      'Generic AI chatbots cannot safely operate in clinical environments: standard vector RAG suffers semantic noise, unconstrained LLMs hallucinate drug dosages, ignore contraindications, and give hazardous emergency advice.',
    approach:
      'OKF Fast Path bypasses embedding latency for canonical facts → hybrid Cohere embed-v3 + BM25 retrieval with Cohere rerank-v3.5 → LangGraph stateful DAG enforces safety routing (unsafe queries refused before retrieval or LLM call) → deterministic eGFR / MAP / BMI calculators → LangSmith & Ragas evaluators across 55 golden cases.',
    result:
      '258 passing tests · 0.98 Faithfulness (+21% vs GPT-4o) · 100% safety refusal accuracy on emergency contraindications · Deployed with complete citation provenance on Vercel at $0/month.',
    techStack: [
      'Python 3.12',
      'FastAPI',
      'LangGraph',
      'Cohere Embed v3',
      'BM25',
      'LangSmith',
      'Ragas',
      'React 18',
      'TypeScript',
      'Tailwind v4',
    ],
    stats: [
      { label: 'PASSING TESTS', value: '258' },
      { label: 'FAITHFULNESS', value: '0.98' },
      { label: 'SAFETY REFUSAL', value: '100%' },
    ],
    link: 'https://github.com/jeevesh2515/clinical-rag-agent',
    demo: 'https://clinical-workflows.vercel.app',
    dateRange: 'JUN — JUL 2026',
    status: 'SHIPPED',
    featured: true,
    language: 'Python',
    codeSnippet: `# Clinical RAG Agent Graph
class ClinicalSafetyState(TypedDict):
    query: str
    risk_level: SafetyTier
    grounded_citations: list[Citation]

def route_query(state: ClinicalSafetyState) -> str:
    if state["risk_level"] == SafetyTier.EMERGENCY:
        return "immediate_triage_refusal"
    return "hybrid_retrieve_and_calculate"`,
  },
  {
    name: 'Cortex',
    tagline: 'Local-First Graph-RAG & Second Brain MCP for Obsidian Vaults',
    taglineColor: 'text-primary-container',
    description:
      'Privacy-first knowledge management system integrating local LanceDB vector search with NetworkX Wikilink graph traversal. Exposes a Model Context Protocol (MCP) server for Claude Desktop and local Ollama inference with zero cloud egress.',
    problem:
      'Note-taking tools like Obsidian store rich personal knowledge in Markdown files, but standard LLM tools require transmitting sensitive personal notes to third-party cloud APIs.',
    approach:
      'Architected local-first vector indexing via LanceDB combined with dynamic NetworkX graph expansion of [[Wikilinks]] and frontmatter metadata. Implemented native Model Context Protocol (MCP) server tools allowing Claude Desktop and local Ollama instances to query notes semantically and topologically.',
    result:
      '100% local privacy guarantee with zero cloud egress, sub-50ms local retrieval, and seamless integration as an MCP server with Claude Desktop and Ollama.',
    techStack: [
      'Python 3.11+',
      'LanceDB',
      'NetworkX',
      'Ollama',
      'Model Context Protocol (MCP)',
      'FastAPI',
      'Obsidian API',
    ],
    stats: [
      { label: 'LOCAL PRIVACY', value: '100%' },
      { label: 'CLOUD EGRESS', value: '0ms' },
      { label: 'SERVER SPEC', value: 'MCP Native' },
    ],
    link: 'https://github.com/jeevesh2515/cortex',
    dateRange: 'MAY — JUN 2026',
    status: 'SHIPPED',
    featured: true,
    language: 'Python',
    codeSnippet: `# Cortex Local Graph-RAG MCP Server
@mcp.tool()
async def query_second_brain(query: str, depth: int = 2) -> str:
    dense_hits = await lancedb_table.search(query).limit(5).to_arrow()
    graph_subgraph = nx.ego_graph(vault_graph, n=dense_hits[0].id, radius=depth)
    context = synthesize_graph_context(dense_hits, graph_subgraph)
    return ollama.generate(model="llama3:8b", prompt=context)`,
  },
  {
    name: 'README Guardian',
    tagline: 'Zero-Dependency CLI & Pre-Commit Linter for Technical Documentation',
    taglineColor: 'text-neon-green',
    description:
      'Developer tool that parses README markdown files into an AST to validate badge schemas, installation blocks, license clarity, and test coverage before committing. Includes GitHub Actions CI and Homebrew-ready distribution.',
    problem:
      'Open-source documentation quickly decays with broken badges, missing installation steps, outdated license references, and missing architecture diagrams.',
    approach:
      'Built a zero-external-dependency Markdown AST parser in Python with Typer & Rich CLI interfaces, validating required documentation blocks, license badges, quickstarts, and schema rules via pre-commit hooks and GitHub Actions.',
    result:
      '15/15 unit & integration tests passing (100%), sub-10ms execution time, zero external runtime dependencies, full Ruff linter compliance, and automated pre-commit integration.',
    techStack: [
      'Python 3.11+',
      'Typer',
      'Rich',
      'Pytest',
      'GitHub Actions CI',
      'Pre-commit',
    ],
    stats: [
      { label: 'TESTS PASSING', value: '15/15 (100%)' },
      { label: 'EXTERNAL DEPS', value: '0' },
      { label: 'LINTER COMPLIANCE', value: 'Ruff Pass' },
    ],
    link: 'https://github.com/jeevesh2515/readme-guardian',
    dateRange: 'MAY 2026',
    status: 'SHIPPED',
    language: 'Python',
    codeSnippet: `# README Guardian AST Linter
class ReadmeLinter:
    def lint(self, markdown_content: str) -> LintReport:
        ast = MarkdownASTParser.parse(markdown_content)
        report = LintReport()
        report.assert_badge_schema(ast.badges)
        report.assert_section_exists(ast, "Installation")
        report.assert_valid_license(ast.license_block)
        return report`,
  },
  {
    name: 'ExpertIQ Copilot',
    tagline: 'Enterprise-Grade Expert Discovery & Research Intelligence',
    taglineColor: 'text-cyber-purple',
    description:
      '6-node LangGraph hybrid-retrieval platform (Query Analyzer → Vector Searcher → Graph Expander → Reranker → Grounded Summarizer) over ChromaDB and NetworkX, fronted by a Next.js 16 client with a 3D force-directed D3 knowledge graph and 1-command Docker deployment.',
    problem:
      'Naive single-vector RAG misses multi-hop expert connections, hallucinates on constrained queries ("Fintech, 15+ yrs, available"), and lacks the observability needed for production enterprise use.',
    approach:
      'Parent-child semantic chunking + Hypothetical Document Embeddings (HyDE) + self-querying metadata filters → vector + multi-hop graph retrieval → LLM-scored reranking → grounded summarization. Wrapped in FastAPI, SQLAlchemy 2.0 with auto-migrations, Redis caching, LangSmith tracing, and 3 automated evaluators.',
    result:
      'A 47-test-covered, containerized production system with a 3D expert graph UI. Demonstrates end-to-end LLM engineering: retrieval quality (HyDE + reranker), constraint precision, hallucination guards, and observability.',
    techStack: [
      'Next.js 16',
      'React 19',
      'FastAPI',
      'LangGraph',
      'ChromaDB',
      'NetworkX',
      'Redis',
      'Docker Compose',
    ],
    stats: [
      { label: 'AGENT NODES', value: '6 Nodes' },
      { label: 'AUTOMATED TESTS', value: '47' },
      { label: 'GRAPH UI', value: '3D D3.js' },
    ],
    link: 'https://github.com/jeevesh2515/expertiq-copilot',
    dateRange: 'APR — JUN 2026',
    status: 'SHIPPED',
    featured: true,
    language: 'Python',
    codeSnippet: `# ExpertIQ 6-Node LangGraph Architecture
workflow = StateGraph(ExpertDiscoveryState)
workflow.add_node("query_analyzer", analyze_intent_and_constraints)
workflow.add_node("vector_searcher", hyde_chroma_retrieval)
workflow.add_node("graph_expander", networkx_multi_hop_expand)
workflow.add_node("cross_reranker", cohere_rerank_scoring)
workflow.add_node("grounded_summarizer", verify_and_summarize)
workflow.set_entry_point("query_analyzer")`,
  },
  {
    name: 'Shorty',
    tagline: 'Autonomous AI YouTube Shorts Generator & Video Automation Engine',
    taglineColor: 'text-error',
    description:
      'Automated pipeline that ingests prompts or articles, writes viral retention-optimized scripts via Groq, generates AI voiceovers, synchronizes word-level subtitles, and stitches final MP4 videos with FFmpeg in a containerized environment on port 8787.',
    problem:
      'Producing high-retention short-form video content requires hours of manual scriptwriting, voice recording, subtitle alignment, asset gathering, and video editing.',
    approach:
      'Engineered an end-to-end automation engine combining Groq Llama 3 for viral script generation, Edge TTS for natural speech synthesis, Whisper-aligned word-level SRT timestamps, and dynamic FFmpeg compositing with audio ducking and motion effects.',
    result:
      '1-click end-to-end generation from prompt to 1080x1920 60FPS MP4 video under 45 seconds, packaged in a single Docker container with web UI and REST API.',
    techStack: [
      'TypeScript',
      'Next.js',
      'FastAPI',
      'FFmpeg',
      'Groq',
      'Edge TTS',
      'Docker',
    ],
    stats: [
      { label: 'PIPELINE RUN', value: '1-Click' },
      { label: 'OUTPUT RESOLUTION', value: '1080x1920 60FPS' },
      { label: 'DEPLOYMENT', value: 'Dockerized' },
    ],
    link: 'https://github.com/jeevesh2515/shorty',
    dateRange: 'MAR — APR 2026',
    status: 'SHIPPED',
    language: 'TypeScript',
    codeSnippet: `// Shorty Autonomous Video Pipeline
export async function generateShortVideo(prompt: string): Promise<VideoResult> {
  const script = await groq.chat.completions.create({ model: "llama-3.3-70b", messages: [prompt] });
  const audioPath = await edgeTTS.synthesize(script.voiceoverText);
  const srtSubtitles = await alignWordTimestamps(audioPath);
  return await ffmpeg.composite({
    audio: audioPath,
    subtitles: srtSubtitles,
    resolution: "1080x1920",
    fps: 60
  });
}`,
  },
  {
    name: 'AI Engineering Roadmap',
    tagline: 'Interactive Full-Stack Curriculum for Modern AI & Agent Systems',
    taglineColor: 'text-neon-green',
    description:
      'Comprehensive interactive roadmap covering 8 progressive stages of AI engineering: LLM fundamentals, Prompt Engineering, RAG & Vector Databases, Stateful LangGraph Agents, Evaluation/Guardrails, and Production Deployment.',
    problem:
      'Quality AI engineering learning is fragmented across disjointed blogs, papers, and courses with no clear end-to-end progression from basic prompts to production agent architectures.',
    approach:
      'Curated a comprehensive 8-stage interactive roadmap featuring 2,500+ vetted resources, interactive stage completion tracking, topic filtering, and architecture diagrams built with React 19 and Framer Motion.',
    result:
      '2,500+ curated resources across 8 structured milestones with interactive progress tracking, shipped as an MIT-licensed open-source learning platform on Vercel.',
    techStack: [
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Vercel',
    ],
    stats: [
      { label: 'CURATED RESOURCES', value: '2,500+' },
      { label: 'LEARNING TRACK', value: '8-Stage' },
      { label: 'INTERACTIVE UI', value: 'React 19' },
    ],
    link: 'https://github.com/jeevesh2515/AI-Engineering-roadmap',
    demo: 'https://ai-journey-guide.vercel.app',
    dateRange: 'FEB — MAY 2026',
    status: 'SHIPPED',
    community: true,
    language: 'TypeScript',
    codeSnippet: `// AI Engineering Roadmap Interactive Engine
export const STAGES: RoadmapStage[] = [
  { id: 1, title: "LLM Fundamentals & Tokenization" },
  { id: 2, title: "Structured Prompting & Tool Calling" },
  { id: 3, title: "Production RAG & Hybrid Vector Search" },
  { id: 4, title: "Stateful Multi-Agent Workflows (LangGraph)" },
  { id: 5, title: "Evaluation, Ragas & Guardrails" },
  { id: 6, title: "Voice AI & Low-Latency Streaming" },
  { id: 7, title: "Observability & LangSmith Tracing" },
  { id: 8, title: "Cloud Deployment & Edge Inference" }
];`,
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple via-primary-container to-neon-green">FLAGSHIP PROJECTS</span>
          </h2>
          <p className="font-body text-body-md text-on-surface-variant mt-3 max-w-2xl mx-auto">
            Production AI systems, low-latency streaming agents, Graph-RAG architectures, and open-source developer tooling.{' '}
            <a
              href="https://github.com/jeevesh2515?tab=repositories&sort=updated"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-container hover:text-primary underline underline-offset-4 font-semibold"
            >
              Explore all repositories on GitHub →
            </a>
          </p>
        </div>

        {/* Section Title */}
        <div className="reveal-up flex items-center justify-end gap-4 mb-8">
          <span className="font-display text-lg text-on-surface uppercase tracking-wider">PRODUCTION ARCHITECTURES</span>
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
              style={{ transitionDelay: `${(i + 1) * 0.08}s` }}
            >
              {/* Featured / Community badge */}
              {project.featured && (
                <div className="absolute top-0 right-0 z-30 flex items-center gap-1.5 bg-gradient-to-r from-primary-container to-cyber-purple text-background font-label text-[10px] tracking-widest uppercase px-3 py-1 rounded-bl-md font-bold shadow-md">
                  <Star size={11} fill="currentColor" /> Flagship
                </div>
              )}
              {project.community && !project.featured && (
                <div className="absolute top-0 right-0 z-30 flex items-center gap-1.5 bg-gradient-to-r from-neon-green to-secondary-container text-background font-label text-[10px] tracking-widest uppercase px-3 py-1 rounded-bl-md font-bold shadow-md">
                  <Users size={11} /> Community
                </div>
              )}

              {/* Scanning Line */}
              <div className="scanning-line" />

              <div className="grid md:grid-cols-[1fr_340px] gap-0 relative z-20">
                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-between md:pl-10">
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3 flex-wrap gap-2 pr-20">
                      <div className="flex items-center gap-3">
                        <h3 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-wide">{project.name}</h3>
                        {project.community && (
                          <span className="font-label text-[10px] text-neon-green uppercase tracking-widest px-2 py-0.5 border border-neon-green/30 bg-neon-green/10 rounded-sm">
                            Open Source
                          </span>
                        )}
                      </div>
                      {project.status && (
                        <div className="font-label text-[11px] text-neon-green flex items-center gap-2 bg-neon-green/5 border-neon-green/20 px-3 py-1 rounded-sm border">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" /> {project.status}
                        </div>
                      )}
                    </div>
                    <h4 className={`font-label text-label-mono ${project.taglineColor} mb-4 uppercase flex items-center gap-2 text-xs md:text-sm`}>
                      <span className={`w-1 h-4 ${project.taglineColor.replace('text-', 'bg-')}`} /> {project.tagline}
                    </h4>
                    <p className="font-body text-body-md text-on-surface-variant mb-6 leading-relaxed">{project.description}</p>

                    {/* Mini case study — Problem / Approach / Result */}
                    <details className="mb-6 group/case">
                      <summary className="cursor-pointer font-label text-[11px] text-primary-container tracking-widest uppercase hover:text-primary transition-colors list-none flex items-center gap-2 font-semibold">
                        <span className="w-3 h-3 border border-primary-container/50 rotate-45 group-open/case:rotate-[225deg] transition-transform duration-300" />
                        System Architecture: Problem → Approach → Outcome
                      </summary>
                      <div className="mt-4 space-y-3 font-body text-sm text-on-surface-variant border-l-2 border-primary-container/30 pl-4">
                        <div>
                          <span className="font-label text-[10px] text-error tracking-widest uppercase block mb-1 font-bold">Challenge</span>
                          {project.problem}
                        </div>
                        <div>
                          <span className="font-label text-[10px] text-primary-container tracking-widest uppercase block mb-1 font-bold">Engineering Approach</span>
                          {project.approach}
                        </div>
                        <div>
                          <span className="font-label text-[10px] text-neon-green tracking-widest uppercase block mb-1 font-bold">Production Outcome</span>
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
                        aria-label={`View ${project.name} repository on GitHub`}
                      >
                        <Github size={14} /> Repository <ExternalLink size={12} />
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-label text-label-mono text-neon-green hover:text-neon-green/80 transition-colors btn-border-draw pb-1"
                          aria-label={`Open live interactive demo for ${project.name}`}
                        >
                          <Sparkles size={13} /> Live System <ExternalLink size={12} />
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
                <div className="hidden md:flex bg-black/85 border-l border-surface-variant p-5 flex-col justify-between font-terminal text-[12px] text-on-surface-variant leading-relaxed">
                  <div>
                    <div className="flex items-center gap-2 border-b border-surface-variant pb-3 mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-error/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-primary-container/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-neon-green/80" />
                      <span className="ml-3 text-surface-variant font-label text-[10px] uppercase tracking-widest">
                        {project.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.{project.language === 'Python' ? 'py' : 'ts'}
                      </span>
                    </div>

                    {/* Syntax Code Preview */}
                    <pre className="overflow-x-auto text-[11px] leading-relaxed text-gray-300 max-h-[260px] scrollbar-thin">
                      <code>{project.codeSnippet || `# ${project.name}\n# Stack: ${project.techStack.slice(0, 4).join(' · ')}\n\nasync def execute():\n    """${project.tagline}"""\n    return {"status": "${project.status}"}`}</code>
                    </pre>
                  </div>

                  <div className="border-t border-surface-variant pt-3 space-y-1.5 mt-3">
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
            <Github size={16} /> View all open-source repositories on GitHub <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
