import { useState, useEffect, useRef } from 'react';
import { Brain, BarChart3, Database, Cloud, Globe, PieChart } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

const CLUSTERS = [
  { id: 'llm-rag', title: 'LLM & RAG', subtitle: 'Language Models & Retrieval', color: 'border-secondary-container/40 shadow-[0_0_15px_rgba(0,240,255,0.1)]', dot: 'bg-secondary-container', icon: <Brain size={18} />, startProgress: 0.05, endProgress: 0.30, skills: ['LangChain', 'LangGraph', 'Multi-Agent Systems', 'Semantic Search', 'RAG Pipelines', 'Vector Embeddings', 'ChromaDB', 'Prompt Engineering', 'OpenAI API', 'Groq (Llama 3.1 70B)', 'Claude API', 'Ollama', 'MCP'] },
  { id: 'ml-ds', title: 'ML & DATA SCIENCE', subtitle: 'Modeling & Analysis', color: 'border-primary/40 shadow-[0_0_15px_rgba(251,191,36,0.1)]', dot: 'bg-primary', icon: <BarChart3 size={18} />, startProgress: 0.15, endProgress: 0.40, skills: ['scikit-learn', 'XGBoost', 'LSTM', 'TensorFlow', 'PyTorch', 'A/B Testing', 'SHAP/LIME', 'Knowledge Graphs', 'Sentence-Transformers'] },
  { id: 'data-eng', title: 'DATA ENGINEERING', subtitle: 'Pipelines & Infrastructure', color: 'border-error/40 shadow-[0_0_15px_rgba(255,100,100,0.1)]', dot: 'bg-error', icon: <Database size={18} />, startProgress: 0.25, endProgress: 0.50, skills: ['Python', 'SQL', 'Apache Spark', 'Databricks', 'ETL/ELT', 'Airflow', 'dbt', 'Azure Data Factory', 'PostgreSQL', 'MongoDB'] },
  { id: 'cloud-devops', title: 'CLOUD & DEVOPS', subtitle: 'Deployment & Operations', color: 'border-cyber-purple/40 shadow-[0_0_15px_rgba(184,71,255,0.1)]', dot: 'bg-cyber-purple', icon: <Cloud size={18} />, startProgress: 0.45, endProgress: 0.70, skills: ['Azure', 'AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD (GitHub Actions)', 'MLOps', 'Model Monitoring'] },
  { id: 'web-apis', title: 'WEB & APIs', subtitle: 'Interfaces & Integration', color: 'border-neon-green/40 shadow-[0_0_15px_rgba(57,255,20,0.1)]', dot: 'bg-neon-green', icon: <Globe size={18} />, startProgress: 0.55, endProgress: 0.80, skills: ['FastAPI', 'Next.js (React 19)', 'TypeScript', 'JavaScript', 'REST API Design', 'Smart Contract Integration', 'JWT', 'bcrypt'] },
  { id: 'viz', title: 'VISUALIZATION', subtitle: 'Insights & Dashboards', color: 'border-tertiary/40 shadow-[0_0_15px_rgba(182,237,255,0.1)]', dot: 'bg-tertiary', icon: <PieChart size={18} />, startProgress: 0.65, endProgress: 0.95, skills: ['D3.js', 'Power BI', 'Tableau', 'R'] },
];

// Helper to generate a clean circuit path from Start to End with 45-degree angle snapping
function getCircuitPath(start: Point, end: Point): Point[] {
  const points: Point[] = [start];
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  
  if (Math.abs(dx) > Math.abs(dy)) {
    // Mostly horizontal step first, then 45-degree jog to destination
    const jogX = start.x + Math.sign(dx) * (Math.abs(dx) - Math.abs(dy));
    points.push({ x: jogX, y: start.y });
    points.push({ x: end.x, y: end.y });
  } else {
    // Mostly vertical step first, then 45-degree jog to destination
    const jogY = start.y + Math.sign(dy) * (Math.abs(dy) - Math.abs(dx));
    points.push({ x: start.x, y: jogY });
    points.push({ x: end.x, y: end.y });
  }
  return points;
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCards, setActiveCards] = useState<Record<string, boolean>>({});

  // 1. Calculate Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Tracing starts when the top of the section reaches 70% of screen height
      // and completes fully when it reaches -5% of screen height.
      // This ensures wires only grow as the user actively scrolls through the section content.
      const start = viewportHeight * 0.70;
      const end = viewportHeight * -0.05;
      const total = start - end;
      const current = start - rect.top;
      
      const progress = Math.max(0, Math.min(1, current / total));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRef]);

  // 2. Trigger Active Card States when wires make connection
  useEffect(() => {
    const newActive: Record<string, boolean> = {};
    CLUSTERS.forEach((cluster) => {
      const startP = cluster.startProgress;
      const endP = cluster.endProgress;
      const wireProgress = Math.max(0, Math.min(1, (scrollProgress - startP) / (endP - startP)));
      if (wireProgress >= 1.0) {
        newActive[cluster.id] = true;
      }
    });
    setActiveCards(newActive);
  }, [scrollProgress]);

  // 3. Dynamic Canvas Path Drawing Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const draw = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      
      // Sync canvas dimensions
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Core center calculation
      const cx = canvas.width / 2;
      const grid = section.querySelector('.grid');
      let cy = canvas.height / 2;
      if (grid) {
        const gridRect = grid.getBoundingClientRect();
        cy = (gridRect.top + gridRect.height / 2) - rect.top;
      }

      // ── A. Draw Skills Core (Mini Reactor Core) ──
      const rotation = performance.now() * 0.001;
      const pulse = Math.sin(performance.now() * 0.004) * 3;

      // Glow backing
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
      coreGrad.addColorStop(0, 'rgba(0, 229, 255, 0.15)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 50, 0, Math.PI * 2);
      ctx.fill();

      // Outer rings
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 25, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(0, 229, 255, 0.15)';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating inner segmented rings
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 2.5;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(0, 0, 16, i * Math.PI / 2, i * Math.PI / 2 + Math.PI / 4);
        ctx.stroke();
      }
      ctx.restore();

      // Center glowing point
      ctx.beginPath();
      ctx.arc(cx, cy, 5.5 + pulse * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = '#e0f7ff';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#00e5ff';
      ctx.fill();
      ctx.shadowBlur = 0;

      // ── B. Tracing Glowing Wires from Core to Nodes ──
      const nodes = section.querySelectorAll('.skill-icon-node');
      nodes.forEach((node) => {
        const id = node.getAttribute('data-skill-id');
        if (!id) return;

        const nodeRect = node.getBoundingClientRect();
        const nx = (nodeRect.left + nodeRect.width / 2) - rect.left;
        const ny = (nodeRect.top + nodeRect.height / 2) - rect.top;

        // Trace paths with 45-degree angle snapping
        const pathPoints = getCircuitPath({ x: cx, y: cy }, { x: nx, y: ny });

        // Calculate segment list and total length
        let totalLen = 0;
        const segments: { p1: Point; p2: Point; len: number }[] = [];
        for (let i = 0; i < pathPoints.length - 1; i++) {
          const p1 = pathPoints[i];
          const p2 = pathPoints[i + 1];
          const len = Math.hypot(p2.x - p1.x, p2.y - p1.y);
          segments.push({ p1, p2, len });
          totalLen += len;
        }

        const cluster = CLUSTERS.find((c) => c.id === id);
        if (!cluster) return;

        const startP = cluster.startProgress;
        const endP = cluster.endProgress;
        const wireProgress = Math.max(0, Math.min(1, (scrollProgress - startP) / (endP - startP)));
        const targetLen = totalLen * wireProgress;

        ctx.beginPath();
        ctx.moveTo(pathPoints[0].x, pathPoints[0].y);

        let currentLen = 0;
        let px = pathPoints[0].x;
        let py = pathPoints[0].y;

        for (const seg of segments) {
          if (currentLen + seg.len <= targetLen) {
            ctx.lineTo(seg.p2.x, seg.p2.y);
            currentLen += seg.len;
            px = seg.p2.x;
            py = seg.p2.y;
          } else {
            const remaining = targetLen - currentLen;
            const ratio = remaining / seg.len;
            px = seg.p1.x + (seg.p2.x - seg.p1.x) * ratio;
            py = seg.p1.y + (seg.p2.y - seg.p1.y) * ratio;
            ctx.lineTo(px, py);
            currentLen = targetLen;
            break;
          }
        }

        // Draw Base dimmed tracing backing line
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.08)';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Draw active glowing path tracing outwards
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Draw traveling glowing signal tip (photon)
        if (wireProgress > 0 && wireProgress < 1.0) {
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#00e5ff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00e5ff';
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (wireProgress >= 1.0) {
          // Pulsating indicator surrounding the fully connected card icon
          ctx.beginPath();
          ctx.arc(nx, ny, 11 + 2 * Math.sin(performance.now() * 0.006), 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(0, 229, 255, 0.25)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, [scrollProgress, sectionRef]);

  return (
    <section ref={sectionRef} id="skills" className="relative py-section-gap overflow-hidden">
      {/* Circuit Trace Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary-container led-indicator" />
            <div className="w-12 h-px bg-glass-border" />
          </div>
          <span className="font-terminal text-label-mono text-on-surface-variant tracking-widest uppercase">// 02 — CORE MODULES</span>
        </div>

        <div className="text-center mb-12" style={{ transitionDelay: '0.1s' }}>
          <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-on-surface">
            SKILL <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-cyber-purple">MATRIX</span>
          </h2>
          <p className="font-body text-body-md text-on-surface-variant mt-3">Six specialized modules. One integrated system.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {CLUSTERS.map((cluster, i) => {
            const isConnected = activeCards[cluster.id];
            return (
              <div 
                key={cluster.id} 
                className={`module-housing rounded-xl p-6 relative overflow-hidden group transition-all duration-500 hover:translate-y-[-4px] border ${
                  isConnected 
                    ? 'border-[#00e5ff] shadow-[0_0_22px_rgba(0,229,255,0.22)] scale-[1.01] bg-[#161d24]/85' 
                    : cluster.color
                }`}
                style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
              >
                <div className="heatsink-pattern absolute inset-0 opacity-20 pointer-events-none" />

                {/* Header */}
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <span 
                    className={`${cluster.dot} w-9 h-9 rounded-lg flex items-center justify-center text-white skill-icon-node relative transition-transform duration-300 ${isConnected ? 'scale-110 shadow-[0_0_12px_currentColor]' : ''}`} 
                    data-skill-id={cluster.id}
                  >
                    {cluster.icon}
                    {isConnected && (
                      <span className="absolute -inset-1 rounded-lg bg-current opacity-25 blur-sm animate-pulse" />
                    )}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-on-surface tracking-wider">{cluster.title}</h3>
                    <p className="font-label text-[11px] text-on-surface-variant tracking-wider">{cluster.subtitle}</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 relative z-10">
                  {cluster.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className={`tech-tag font-label text-[11px] px-2.5 py-1 border rounded cursor-default transition-colors duration-300 ${
                        isConnected 
                          ? 'border-[#00e5ff]/30 text-white bg-[#00e5ff]/5 hover:border-[#00e5ff]' 
                          : 'border-outline-variant text-on-surface bg-surface/50'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
