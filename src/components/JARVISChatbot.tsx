import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, User } from 'lucide-react';
import MatrixRain from './effects/MatrixRain';
import GlitchOverlay from './effects/GlitchOverlay';
import ArcReactorPulse from './effects/ArcReactorPulse';
import ParticleBurst from './effects/ParticleBurst';
import ArcReactorFAB from './ArcReactorFAB';
import type { ChatMessage } from '@/types';

const BOT_RESPONSES: Record<string, string> = {
  who: 'Jeevesh Singale is a Senior AI Systems Engineer & Open-Source Architect based in London, UK. He has 3+ years of experience designing and shipping stateful agentic workflows (LangGraph), low-latency streaming voice AI (<380ms WebSockets), hybrid Graph-RAG MCP systems, and enterprise data platforms. He holds an MSc in Information Systems from the University of Nottingham.',
  what: 'Jeevesh specializes in Stateful Multi-Agent Workflows (LangGraph), Sub-Second Streaming Voice AI (Silero VAD, Deepgram Nova-2, Groq, ElevenLabs), Local-First Graph-RAG (LanceDB, NetworkX, Model Context Protocol), and Deterministic Evaluation & Safety Guardrails (Ragas, LangSmith, Pytest).',
  skills: 'Core Stack: LangGraph, LangChain, LangSmith, Silero VAD, Deepgram Nova-2, Groq (Llama 3.3), ElevenLabs, WebSockets, LanceDB, ChromaDB, NetworkX, Model Context Protocol (MCP), Python 3.12, FastAPI, Pytest, Ragas, React 19, Next.js 16, TypeScript, Docker Compose.',
  experience: 'Current: AI-First Software Engineer at Risidio (London) — building Web3 revenue dashboards and AI learning platforms. Previous: Web Data Analyst at Javish Jewellery (Mumbai) — ETL pipelines cutting reporting time by 50%. Data Science Apprentice at Global EduTech (Pune) — ML models achieving 96% accuracy on 1M+ records.',
  projects: '7 Flagship Repositories:\n1. 🎙️ VoxFlow Voice Agent (<380ms Glass-to-Glass PCM WebSocket Voice AI)\n2. 🏥 Clinical RAG Agent (0.98 Faithfulness, 258 passing tests, chronic hypertension care)\n3. 🧠 Cortex (Local-First LanceDB + NetworkX Graph-RAG & Obsidian Second Brain MCP)\n4. 🛡️ README Guardian (Zero-Dependency AST Markdown Linter & Pre-Commit hook)\n5. 🔍 ExpertIQ Copilot (6-Node Multi-Agent Research Platform with 3D D3 Graph)\n6. 🎬 Shorty (Autonomous AI YouTube Shorts Generator via FFmpeg)\n7. 🗺️ AI Engineering Roadmap (2,500+ Curated Resources, 8-Stage Interactive Track on React 19)',
  voxflow: '🎙️ VoxFlow Voice Agent is an ultra-low latency conversational voice pipeline with <380ms glass-to-glass latency over 16kHz PCM WebSockets, combining Silero VAD, Deepgram Nova-2, Groq Llama 3.3 70B, ElevenLabs/Polly TTS, and instant barge-in cancellation. GitHub: github.com/jeevesh2515/voxflow-voice-agent',
  clinical: '🏥 Clinical RAG Agent is a zero-hallucination workflow assistant for hypertension care with hybrid Cohere + BM25 retrieval, 27 OKF concepts, deterministic medical calculators, 258 passing tests, and 0.98 Faithfulness (+21% vs GPT-4o). Live demo: clinical-workflows.vercel.app | GitHub: github.com/jeevesh2515/clinical-rag-agent',
  cortex: '🧠 Cortex is a local-first Graph-RAG and Second Brain MCP server for Obsidian vaults using LanceDB vector search and NetworkX Wikilink graph traversal with 100% privacy and zero cloud egress. GitHub: github.com/jeevesh2515/cortex',
  education: 'MSc Information Systems & Operations Management, University of Nottingham (2023-2024). BEng Information Technology, Mumbai University (2019-2023) with 9.2/10 GPA. Certifications: Databricks Generative AI, RAG & Advanced Retrieval (DeepLearning.AI), OpenAI API, Power BI.',
  contact: 'Email: jeevesh2515@gmail.com | Phone: +44 7436 357330 | LinkedIn: linkedin.com/in/jeevesh-singale07 | GitHub: github.com/jeevesh2515 | Location: London, UK (Graduate visa / Open to sponsorship).',
  help: 'Available commands: /matrix (Matrix rain), /arc (Arc reactor pulse), /glitch (Screen glitch), /particles (Particle burst), /system-check (Diagnostics), /analytics (Telemetry), /optimize (Toggle overdrive), /scan (Security scan). Or ask me about VoxFlow, Clinical RAG, Cortex, ExpertIQ, or Jeevesh\'s background!',
  default: 'I can help you explore Jeevesh\'s 7 flagship AI projects (VoxFlow, Clinical RAG, Cortex, ExpertIQ, etc.), technical stack, experience, or contact details. Try asking "what are his flagship projects?", "tell me about VoxFlow", or type /help for commands.',
};

const SYSTEM_STATS = [
  'CPU: 42% | MEM: 16GB/32GB | NET: OK',
  'MODULES_LOADED: [VOICE_AI, GRAPH_RAG, LANGGRAPH_AGENTS, RAGAS_EVALS]',
  'STATUS: OPTIMAL — ALL 7 SYSTEMS SHIPPED',
  'UPTIME: 99.9% | LATENCY: <380ms',
];

export default function JARVISChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [booted, setBooted] = useState(false);
  const [typing, setTyping] = useState(false);
  const [, setOptimode] = useState(false);

  // Effect states
  const [matrixActive, setMatrixActive] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [arcActive, setArcActive] = useState(false);
  const [particleActive, setParticleActive] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  // Boot sequence
  useEffect(() => {
    if (!isOpen || booted) return;
    const bootSequence = [
      { text: '[SYSTEM] Uplink established. Secure channel verified.', color: 'dim' as const, delay: 300 },
      { text: '> Initializing JARVIS neural interface...', color: 'gold' as const, delay: 800 },
      {
        text: "JARVIS: Greetings. I am the virtual assistant for Jeevesh Singale's portfolio. How may I assist you regarding his 7 flagship AI systems, voice agents, or Graph-RAG architectures today?",
        color: 'cyan' as const,
        delay: 1600,
      },
    ];

    bootSequence.forEach((msg) => {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString() + Math.random(), text: msg.text, color: msg.color, isUser: false },
        ]);
      }, msg.delay);
    });

    setTimeout(() => setBooted(true), 2000);
  }, [isOpen, booted]);

  const addMessage = (text: string, color: ChatMessage['color'], isUser: boolean) => {
    setMessages((prev) => [...prev, { id: Date.now().toString() + Math.random(), text, color, isUser }]);
  };

  const handleCommand = useCallback((cmd: string) => {
    const lowerCmd = cmd.toLowerCase().trim();

    switch (lowerCmd) {
      case '/matrix':
        addMessage('Initializing Matrix protocol...', 'gold', false);
        setMatrixActive(true);
        setTimeout(() => {
          addMessage('Matrix protocol disengaged.', 'dim', false);
          setMatrixActive(false);
        }, 6500);
        return;

      case '/arc':
        addMessage('Activating Arc Reactor core pulse...', 'cyan', false);
        setArcActive(true);
        setTimeout(() => {
          addMessage('Arc reactor sequence complete.', 'dim', false);
          setArcActive(false);
        }, 3500);
        return;

      case '/glitch':
        addMessage('Triggering system glitch...', 'purple', false);
        setGlitchActive(true);
        setTimeout(() => {
          addMessage('Glitch effect terminated.', 'dim', false);
          setGlitchActive(false);
        }, 2200);
        return;

      case '/particles':
        addMessage('Launching particle burst sequence...', 'green', false);
        setParticleActive(true);
        setTimeout(() => {
          addMessage('Particle burst complete.', 'dim', false);
          setParticleActive(false);
        }, 3500);
        return;

      case '/system-check':
        addMessage('Running full system diagnostics...', 'gold', false);
        SYSTEM_STATS.forEach((stat, idx) => {
          setTimeout(() => addMessage(`  ${stat}`, idx === 2 ? 'green' : 'dim', false), (idx + 1) * 400);
        });
        return;

      case '/analytics':
        addMessage('Fetching telemetry data...', 'gold', false);
        setTimeout(() => {
          addMessage('  VISITORS: 1,842 | ENGAGEMENT: 96% | AVG_SESSION: 3m 48s', 'cyan', false);
          addMessage('  TOP_REFERRER: github.com / linkedin.com | REPOS_SHIPPED: 7 Flagship', 'cyan', false);
        }, 600);
        return;

      case '/optimize':
        setOptimode((prev) => {
          const newState = !prev;
          addMessage(`Overdrive mode ${newState ? 'ACTIVATED' : 'DEACTIVATED'}.`, newState ? 'green' : 'gold', false);
          if (newState) {
            document.body.classList.add('optimized');
          } else {
            document.body.classList.remove('optimized');
          }
          return newState;
        });
        return;

      case '/scan':
        addMessage('Initiating security scan...', 'cyan', false);
        const threats = [
          'No anomalies detected.',
          'Safety Evaluators: ACTIVE (0.98 Faithfulness)',
          'MCP Server: LOCAL_ISOLATED (0ms Egress)',
          'Voice Pipeline: <380ms Latency',
          'Threat Level: ZERO',
        ];
        threats.forEach((t, i) => {
          setTimeout(() => addMessage(`  [PASS] ${t}`, 'green', false), (i + 1) * 300);
        });
        return;

      case '/help':
        addMessage(BOT_RESPONSES['help'], 'gold', false);
        return;

      default:
        // Natural language processing
        const query = lowerCmd;
        let response = BOT_RESPONSES['default'];
        if (query.includes('voxflow') || query.includes('voice') || query.includes('speech')) {
          response = BOT_RESPONSES['voxflow'];
        } else if (query.includes('clinical') || query.includes('hypertension') || query.includes('medical')) {
          response = BOT_RESPONSES['clinical'];
        } else if (query.includes('cortex') || query.includes('obsidian') || query.includes('mcp')) {
          response = BOT_RESPONSES['cortex'];
        } else if (query.includes('who') || query.includes('name') || query.includes('about')) {
          response = BOT_RESPONSES['who'];
        } else if (query.includes('skill') || query.includes('tech') || query.includes('stack')) {
          response = BOT_RESPONSES['skills'];
        } else if (query.includes('experience') || query.includes('work') || query.includes('job') || query.includes('career')) {
          response = BOT_RESPONSES['experience'];
        } else if (query.includes('project') || query.includes('expertiq') || query.includes('repo') || query.includes('copilot') || query.includes('shorty')) {
          response = BOT_RESPONSES['projects'];
        } else if (query.includes('education') || query.includes('degree') || query.includes('university') || query.includes('certif')) {
          response = BOT_RESPONSES['education'];
        } else if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('reach')) {
          response = BOT_RESPONSES['contact'];
        } else if (query.includes('what')) {
          response = BOT_RESPONSES['what'];
        }

        addMessage(`JARVIS: ${response}`, 'cyan', false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    addMessage(`> ${input}`, 'gold', true);
    setTyping(true);
    setTimeout(() => {
      handleCommand(input);
      setTyping(false);
    }, 300);
    setInput('');
  };

  const colorMap: Record<string, string> = {
    gold: 'text-primary',
    cyan: 'text-secondary-container',
    green: 'text-neon-green',
    red: 'text-error',
    dim: 'text-on-surface-variant',
    purple: 'text-cyber-purple',
    default: 'text-on-surface',
  };

  return (
    <>
      {/* Effect Overlays */}
      <MatrixRain active={matrixActive} duration={6000} />
      <GlitchOverlay active={glitchActive} />
      <ArcReactorPulse active={arcActive} />
      <ParticleBurst active={particleActive} />

      {/* Arc Reactor FAB Button */}
      {!isOpen && <ArcReactorFAB onClick={() => setIsOpen(true)} size={68} />}

      {/* Chat Terminal */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-48px)] flex flex-col rounded-lg overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(10, 24, 30, 0.96), rgba(6, 14, 18, 0.98))',
            border: '1px solid rgba(0, 229, 255, 0.35)',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.85), 0 0 25px rgba(0, 229, 255, 0.22)',
          }}
        >
          {/* Header with mini arc reactor */}
          <div className="flex items-center justify-between p-3 border-b border-neon-cyan/20 bg-[#0d1f27]/90 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              {/* Mini arc reactor indicator */}
              <div className="relative w-7 h-7 flex items-center justify-center bg-black/40 rounded-full p-1 border border-neon-cyan/20">
                <div className="absolute inset-0.5 rounded-full border border-dashed border-neon-cyan/30 animate-[spin_8s_linear_infinite]" />
                <div className="absolute inset-1.5 rounded-full border border-neon-cyan/50 animate-[spin_4s_linear_infinite_reverse]" />
                <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[5px] border-t-neon-cyan shadow-[0_0_6px_#00e5ff] animate-pulse" />
              </div>
              <span className="font-terminal text-xs text-[#00e5ff] uppercase tracking-widest font-bold">
                JARVIS.AI // REACTOR_ONLINE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 h-5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="wave-bar" style={{ height: 4 + Math.random() * 12, backgroundColor: '#00e5ff' }} />
                ))}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#00e5ff]/70 hover:text-white transition-colors ml-2"
                aria-label="Close assistant terminal"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-terminal text-sm bg-black/40 relative">
            <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none" />

            {messages.map((msg) => (
              <div key={msg.id} className={`${colorMap[msg.color] || 'text-on-surface'} break-words`}>
                {msg.isUser ? (
                  <div className="flex items-start gap-2">
                    <User size={14} className="text-[#00e5ff] mt-0.5 shrink-0" />
                    <span>{msg.text}</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <Bot size={14} className="text-secondary-container mt-0.5 shrink-0" />
                    <span className="whitespace-pre-line">{msg.text}</span>
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-2 text-[#00e5ff]">
                <Bot size={14} />
                <span className="terminal-cursor bg-neon-cyan" style={{ backgroundColor: '#00e5ff' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Command Shortcuts */}
          <div className="px-4 py-2 border-t border-neon-cyan/20 flex flex-wrap gap-1.5 bg-black/60">
            {['/matrix', '/arc', '/glitch', '/particles', '/scan', '/system-check', '/optimize', '/help'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInput(cmd);
                  inputRef.current?.focus();
                }}
                className="text-[10px] font-terminal text-[#00e5ff]/70 uppercase bg-[#0d1f27]/40 px-2 py-0.5 rounded cursor-pointer border border-neon-cyan/20 hover:border-[#00e5ff] hover:text-white transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-3 p-3 border-t border-neon-cyan/20 bg-black/60">
            <span className="text-[#00e5ff] font-terminal text-lg font-bold">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query systems (e.g., VoxFlow, Clinical RAG, Cortex)..."
              className="flex-1 bg-transparent border-none text-on-surface font-terminal text-sm focus:ring-0 p-0 placeholder-on-surface-variant/30 outline-none"
              autoComplete="off"
            />
            <button type="submit" className="text-[#00e5ff] hover:text-white transition-colors" aria-label="Send message">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
