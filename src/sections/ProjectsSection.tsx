import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { ExternalLink, Github, Star, Terminal, Users, Sparkles, Play, CheckCircle2 } from 'lucide-react';

interface ProjectStat {
  label: string;
  value: string;
}

interface PipelineStep {
  name: string;
  detail: string;
  code: string;
  latency: string;
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
  steps: PipelineStep[];
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
    steps: [
      {
        name: 'VAD Trigger',
        detail: 'Silero speech boundary detection',
        latency: '<10ms',
        code: `# 1. Silero VAD Audio Framing
vad = SileroVAD(threshold=0.5)
if vad.is_speech(pcm_frame):
    tts.interrupt() # Instant barge-in`,
      },
      {
        name: 'Streaming STT',
        detail: 'Deepgram Nova-2 WebSocket stream',
        latency: '85ms',
        code: `# 2. Deepgram Nova-2 STT
stt = DeepgramStreamingClient(model="nova-2")
partial_transcript = await stt.send(pcm_frame)`,
      },
      {
        name: 'LLM Inference',
        detail: 'Groq Llama 3.3 70B token stream',
        latency: '120ms',
        code: `# 3. Groq Llama 3.3 70B Stream
async for token in groq_llm.stream(partial_transcript):
    yield token`,
      },
      {
        name: 'PCM Audio Out',
        detail: 'ElevenLabs chunked synthesis',
        latency: '165ms',
        code: `# 4. ElevenLabs 16kHz PCM Output
audio_chunk = await tts.synthesize(token)
await websocket.send_bytes(audio_chunk)`,
      },
    ],
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
    steps: [
      {
        name: 'Safety Routing',
        detail: 'Stateful LangGraph emergency gate',
        latency: '8ms',
        code: `# 1. Emergency Safety Filter
if state["risk_tier"] == SafetyTier.EMERGENCY:
    return "immediate_triage_refusal"`,
      },
      {
        name: 'OKF Retrieval',
        detail: 'Dense + BM25 sparse hybrid search',
        latency: '45ms',
        code: `# 2. Hybrid Cohere + BM25 Retrieval
docs = await hybrid_retriever.search(query)
reranked = cohere.rerank(docs, top_k=3)`,
      },
      {
        name: 'Deterministic Calc',
        detail: 'eGFR, MAP, and BMI calculators',
        latency: '<2ms',
        code: `# 3. Deterministic eGFR Calculator
egfr = 142 * (min(scr / 0.9, 1) ** -0.302) * (0.9938 ** age)
verify_dosage_threshold(egfr)`,
      },
      {
        name: 'Ragas Evaluation',
        detail: 'LangSmith golden benchmark suite',
        latency: 'Pass',
        code: `# 4. LangSmith Evals (0.98 Faithfulness)
eval_result = ragas_evaluator.evaluate(state)
assert eval_result.faithfulness >= 0.98`,
      },
    ],
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
    steps: [
      {
        name: 'Vault Parser',
        detail: 'Markdown AST & Wikilink extraction',
        latency: '15ms',
        code: `# 1. Obsidian Vault AST Parser
vault_graph = nx.DiGraph()
for note in vault.iter_markdown():
    vault_graph.add_edges_from(note.wikilinks)`,
      },
      {
        name: 'LanceDB Index',
        detail: 'Zero-cloud local vector search',
        latency: '22ms',
        code: `# 2. Local LanceDB Dense Query
hits = table.search(query).limit(5).to_arrow()`,
      },
      {
        name: 'Graph Traversal',
        detail: 'NetworkX multi-hop expansion',
        latency: '8ms',
        code: `# 3. NetworkX Multi-Hop Subgraph
subgraph = nx.ego_graph(vault_graph, hits[0].id, radius=2)`,
      },
      {
        name: 'MCP Server',
        detail: 'Model Context Protocol tool dispatch',
        latency: '0ms Egress',
        code: `# 4. MCP Native Protocol Tool
@mcp.tool()
async def query_vault(q: str):
    return ollama.generate("llama3:8b", context)`,
      },
    ],
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
    steps: [
      {
        name: 'AST Parsing',
        detail: 'Zero-dependency markdown lexer',
        latency: '3ms',
        code: `# 1. Zero-Dependency Markdown AST
ast = MarkdownASTParser.parse(readme_content)`,
      },
      {
        name: 'Badge Audit',
        detail: 'CI status & license badge schema',
        latency: '<1ms',
        code: `# 2. Badge & Metadata Schema Lint
report.assert_badge_schema(ast.badges)`,
      },
      {
        name: 'Section Check',
        detail: 'Installation & Architecture verification',
        latency: '<1ms',
        code: `# 3. Required Section Validation
report.assert_section_exists(ast, "Installation")`,
      },
      {
        name: 'Pre-Commit Gate',
        detail: 'Atomic Git hook execution',
        latency: '100% Pass',
        code: `# 4. Pre-Commit Interceptor
exit_code = 0 if report.is_clean else 1
sys.exit(exit_code)`,
      },
    ],
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
    steps: [
      {
        name: 'Query Analyzer',
        detail: 'Constraint & HyDE expansion',
        latency: '35ms',
        code: `# 1. Query Analyzer & HyDE
state["hyde_doc"] = await generate_hyde(query)`,
      },
      {
        name: 'Hybrid Search',
        detail: 'ChromaDB vector retrieval',
        latency: '28ms',
        code: `# 2. Vector Searcher
hits = chroma.similarity_search(state["hyde_doc"])`,
      },
      {
        name: 'Graph Expander',
        detail: 'Multi-hop NetworkX traversal',
        latency: '18ms',
        code: `# 3. NetworkX Graph Expander
experts = expand_expert_network(hits, radius=2)`,
      },
      {
        name: '3D D3 Graph',
        detail: 'Interactive WebGL visualization',
        latency: '60 FPS',
        code: `# 4. Grounded Summarizer & D3 Render
return d3_force_layout.render(experts)`,
      },
    ],
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
    steps: [
      {
        name: 'Script Writer',
        detail: 'Groq viral retention generation',
        latency: '450ms',
        code: `// 1. Viral Script Generation
const script = await groq.createScript(prompt);`,
      },
      {
        name: 'Voiceover Synthesis',
        detail: 'Edge TTS natural audio',
        latency: '1.2s',
        code: `// 2. Speech Synthesis
const audio = await edgeTTS.synthesize(script);`,
      },
      {
        name: 'SRT Subtitles',
        detail: 'Whisper word-level alignment',
        latency: '800ms',
        code: `// 3. Subtitle Alignment
const srt = await alignTimestamps(audio);`,
      },
      {
        name: 'FFmpeg Render',
        detail: '1080x1920 60FPS composition',
        latency: '18s',
        code: `// 4. FFmpeg Video Compositing
return await ffmpeg.render({ audio, srt, fps: 60 });`,
      },
    ],
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
    steps: [
      {
        name: 'Stage 1-2',
        detail: 'LLM Foundations & Tool Calling',
        latency: '8 Stages',
        code: `// Stage 1 & 2: Fundamentals
{ stage: 1, topic: "Tokenization & Embeddings" },
{ stage: 2, topic: "Structured Tool Calling" }`,
      },
      {
        name: 'Stage 3-4',
        detail: 'RAG & Stateful LangGraph Agents',
        latency: 'Production',
        code: `// Stage 3 & 4: Retrieval & Workflows
{ stage: 3, topic: "Hybrid Dense/Sparse Vector RAG" },
{ stage: 4, topic: "LangGraph Multi-Agent Meshes" }`,
      },
      {
        name: 'Stage 5-6',
        detail: 'Evals & Low-Latency Voice AI',
        latency: 'Real-Time',
        code: `// Stage 5 & 6: Reliability & Voice
{ stage: 5, topic: "Ragas & LangSmith Observability" },
{ stage: 6, topic: "PCM WebSockets & Silero VAD" }`,
      },
      {
        name: 'Stage 7-8',
        detail: 'Deployment & Edge Inference',
        latency: 'Zero Cost',
        code: `// Stage 7 & 8: Production Deployment
{ stage: 7, topic: "Docker & Kubernetes CI/CD" },
{ stage: 8, topic: "Edge Ollama & MCP Servers" }`,
      },
    ],
  },
];

export default function ProjectsSection() {
  const sectionRef = useReveal<HTMLElement>();
  const [activeSteps, setActiveSteps] = useState<Record<string, number>>({});

  const handleStepChange = (projectName: string, stepIdx: number) => {
    setActiveSteps((prev) => ({ ...prev, [projectName]: stepIdx }));
  };

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
          {PROJECTS.map((project, i) => {
            const currentStepIdx = activeSteps[project.name] ?? 0;
            const currentStep = project.steps[currentStepIdx] || project.steps[0];

            return (
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

                <div className="grid md:grid-cols-[1fr_360px] gap-0 relative z-20">
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

                  {/* Right column: Interactive Runtime Execution Simulator */}
                  <div className="hidden md:flex bg-black/85 border-l border-surface-variant p-4 flex-col justify-between font-terminal text-[12px] text-on-surface-variant leading-relaxed">
                    <div>
                      {/* Terminal Header */}
                      <div className="flex items-center justify-between border-b border-surface-variant pb-2.5 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-error/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-primary-container/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-neon-green/80" />
                          <span className="ml-2 text-surface-variant font-label text-[10px] uppercase tracking-widest">
                            {project.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.{project.language === 'Python' ? 'py' : 'ts'}
                          </span>
                        </div>
                        <div className="font-terminal text-[10px] text-neon-green flex items-center gap-1">
                          <Play size={10} className="text-neon-green animate-pulse" /> RUNTIME
                        </div>
                      </div>

                      {/* Interactive Step Selectors */}
                      <div className="grid grid-cols-4 gap-1 mb-3">
                        {project.steps.map((_, sIdx) => {
                          const isActive = currentStepIdx === sIdx;
                          return (
                            <button
                              key={sIdx}
                              onClick={() => handleStepChange(project.name, sIdx)}
                              className={`px-1.5 py-1 rounded text-[10px] font-terminal uppercase tracking-tight text-center transition-all cursor-pointer border ${
                                isActive
                                  ? 'border-primary bg-primary/15 text-white font-bold shadow-[0_0_8px_rgba(251,191,36,0.3)]'
                                  : 'border-outline-variant/40 text-outline hover:text-on-surface hover:bg-surface/50'
                              }`}
                            >
                              0{sIdx + 1}
                            </button>
                          );
                        })}
                      </div>

                      {/* Active Stage Indicator */}
                      <div className="bg-surface/40 p-2 rounded border border-outline-variant/30 mb-3 flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] text-primary font-bold block truncate">
                            NODE 0{currentStepIdx + 1}: {currentStep.name}
                          </span>
                          <span className="text-[9px] text-on-surface-variant block truncate">
                            {currentStep.detail}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-secondary-container bg-secondary-container/10 px-2 py-0.5 rounded border border-secondary-container/30 shrink-0 ml-2">
                          {currentStep.latency}
                        </span>
                      </div>

                      {/* Syntax Code Preview */}
                      <pre className="overflow-x-auto text-[11px] leading-relaxed text-gray-300 max-h-[170px] scrollbar-thin bg-black/60 p-2.5 rounded border border-white/5 font-mono">
                        <code>{currentStep.code}</code>
                      </pre>
                    </div>

                    <div className="border-t border-surface-variant pt-3 space-y-1 mt-3">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-outline uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 size={11} className="text-neon-green" /> INTEGRITY
                        </span>
                        <span className="text-neon-green font-bold">100% VERIFIED</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-outline uppercase tracking-wider">LATENCY TIER</span>
                        <span className="text-primary font-bold">{project.stats[0]?.value}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
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
