import React, { useState, useRef } from 'react';
import {
  FaFolder,
  FaFolderOpen,
  FaPlay,
  FaSearch,
  FaCodeBranch,
  FaCog,
  FaBug,
  FaThLarge,
  FaTerminal,
  FaCheck,
  FaTimes,
  FaChevronRight,
  FaChevronDown,
  FaRegCopy,
  FaSave,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiPython,
  SiJson,
  SiMarkdown,
} from 'react-icons/si';

interface CodeFile {
  id: string;
  name: string;
  folder: string;
  lang: string;
  icon: React.ReactNode;
  defaultCode: string;
  runOutput?: string;
}

const VSCODE_PROJECT_FILES: CodeFile[] = [
  {
    id: 'sociantra',
    name: 'sociantraVoiceStreaming.ts',
    folder: 'src/ai',
    lang: 'typescript',
    icon: <SiTypescript className="text-blue-400" />,
    defaultCode: `import { WebSocket } from 'ws';
import { AzureSpeechConfig, AudioOutputStream } from '@azure/cognitiveservices';

export interface VoiceStreamPayload {
  session_id: string;
  sample_rate: number;
  channels: number;
}

export class SociantraVoiceEngine {
  private ws: WebSocket;
  private speechConfig: AzureSpeechConfig;
  private isStreaming: boolean = false;

  constructor(apiKey: string, region: string) {
    this.speechConfig = AzureSpeechConfig.fromSubscription(apiKey, region);
    console.log('[Sociantra] Initialized Neural Real-Time Voice Pipeline');
  }

  /**
   * Cuts response turnaround delay from 15s down to <3s
   * through bidirectional PCM chunk pipelines over WebSockets.
   */
  public async streamAudioBidirectional(audioChunk: Buffer): Promise<void> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('[Sociantra] WebSocket channel is disconnected');
    }

    const stream = AudioOutputStream.createPullStream();
    
    // Direct zero-copy low-latency buffer flush
    this.ws.send(JSON.stringify({
      event: 'AUDIO_CHUNK_IN',
      timestamp_ms: Date.now(),
      byte_length: audioChunk.length,
      payload: audioChunk.toString('base64'),
    }));
  }

  public getTelemetry(): { latencyMs: number; status: string } {
    return {
      latencyMs: 240, // Sub-second turnaround
      status: 'OPTIMAL_REALTIME_STREAMING'
    };
  }
}`,
    runOutput: `> ts-node src/ai/sociantraVoiceStreaming.ts
[Sociantra] Initialized Neural Real-Time Voice Pipeline
[Sociantra] WebSocket Stream Connected to wss://sociantra.ashishchanchal.in/v1/audio
[Sociantra] Sent 4,096 bytes PCM audio buffer...
[Sociantra] Ingest Latency: 218ms | Synthesis Latency: 420ms | Total Roundtrip: < 800ms
✓ Sociantra Voice Pipeline operational without dropped frames.`,
  },
  {
    id: 'drdo',
    name: 'drdoClinicalPredictor.py',
    folder: 'src/ai',
    lang: 'python',
    icon: <SiPython className="text-yellow-400" />,
    defaultCode: `import torch
import torch.nn as nn
import numpy as np

class ClinicalBiomedicalPredictor(nn.Module):
    """
    Developed during DRDO Research for high-accuracy clinical anomaly classification.
    Processes multi-channel telemetry streams with sub-millisecond inference time.
    """
    def __init__(self, input_features: int = 64, hidden_dim: int = 128):
        super().__init__()
        self.feature_encoder = nn.Sequential(
            nn.Linear(input_features, hidden_dim),
            nn.BatchNorm1d(hidden_dim),
            nn.GELU(),
            nn.Dropout(p=0.15),
            nn.Linear(hidden_dim, 64),
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.GELU(),
            nn.Linear(32, 1),
            nn.Sigmoid()
        )

    def forward(self, telemetry_batch: torch.Tensor) -> torch.Tensor:
        # Ultra fast CUDA or CPU tensor graph evaluation
        with torch.no_grad():
            probabilities = self.feature_encoder(telemetry_batch)
            return probabilities

if __name__ == "__main__":
    model = ClinicalBiomedicalPredictor()
    sample_input = torch.randn(1, 64)
    confidence = model(sample_input)
    print(f"[DRDO AI] Inference Complete: Confidence Score = {confidence.item():.4f}")`,
    runOutput: `python src/ai/drdoClinicalPredictor.py
[DRDO AI] Loading pre-trained neural weights...
[DRDO AI] Tensor device: CUDA:0 (NVIDIA RTX 4090)
[DRDO AI] Inference Time: 0.84ms / sample
[DRDO AI] Inference Complete: Confidence Score = 0.9842 (Nominal Telemetry)`,
  },
  {
    id: 'threejs',
    name: 'threeJsSoundEngine.ts',
    folder: 'src/graphics',
    lang: 'typescript',
    icon: <SiTypescript className="text-cyan-400" />,
    defaultCode: `import * as THREE from 'three';

export function createCyberAudioVisualizer(canvas: HTMLCanvasElement) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Audio Reactive Icosahedron with custom GLSL displacement
  const geometry = new THREE.IcosahedronGeometry(2, 32);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0.0 },
      uFrequency: { value: 1.0 },
      uColorA: { value: new THREE.Color('#00f0ff') },
      uColorB: { value: new THREE.Color('#ff007f') },
    },
    vertexShader: \`
      uniform float uTime;
      uniform float uFrequency;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position + normal * (sin(position.y * 5.0 + uTime * 3.0) * uFrequency * 0.35);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    \`,
    fragmentShader: \`
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying vec2 vUv;
      void main() {
        vec3 col = mix(uColorA, uColorB, vUv.y);
        gl_FragColor = vec4(col, 0.95);
      }
    \`,
    wireframe: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  return { scene, camera, renderer, mesh, material };
}`,
    runOutput: `> npx ts-node src/graphics/threeJsSoundEngine.ts
[WebGL Engine] Compiling GLSL Vertex & Fragment Shaders...
[WebGL Engine] Shader Compilation: SUCCESS (0 errors)
[WebGL Engine] Rendering Mesh with 2,048 vertex indices
[WebGL Engine] Sustaining locked 60.0 FPS draw loop.`,
  },
  {
    id: 'todoai',
    name: 'todoAiMcpOrchestrator.ts',
    folder: 'src/microservices',
    lang: 'typescript',
    icon: <SiTypescript className="text-emerald-400" />,
    defaultCode: `import { Server } from '@modelcontextprotocol/sdk/server';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';

export class TodoAiAgentServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      { name: 'todoai-mcp-orchestrator', version: '2.4.0' },
      { capabilities: { tools: {}, resources: {}, prompts: {} } }
    );
    this.setupMcpTools();
  }

  private setupMcpTools() {
    this.server.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;
      
      switch (name) {
        case 'break_down_task':
          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                status: 'SUCCESS',
                subtasks: [
                  'Architect schema with SQLite / Drizzle',
                  'Expose REST & MCP tool declarations',
                  'Automate cron scheduling routines'
                ]
              })
            }]
          };
        default:
          throw new Error('Unknown tool called: ' + name);
      }
    });
  }

  public async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.log('[TODOAI] MCP Server listening on STDIO channel');
  }
}`,
    runOutput: `> npm run mcp:start
[TODOAI] MCP Server listening on STDIO channel
[TODOAI] Tool registered: break_down_task
[TODOAI] Tool registered: suggest_priority
[TODOAI] Tool registered: summarize_day
[TODOAI] Tool registered: reschedule
✓ MCP Stdio Handshake Complete. 0 errors detected.`,
  },
  {
    id: 'manifest',
    name: 'portfolioArchitect.json',
    folder: 'config',
    lang: 'json',
    icon: <SiJson className="text-amber-400" />,
    defaultCode: `{
  "engineer": {
    "name": "Ashish Chanchal",
    "title": "Software Developer & AI Systems Engineer",
    "location": "Noida, India",
    "email": "akchanchal2002@gmail.com",
    "github": "https://github.com/Ashish-chanchal",
    "linkedin": "https://www.linkedin.com/in/ashishchanchal/"
  },
  "verified_impact": [
    "Slashed voice streaming latency from 15s to <3s at Sociantra",
    "Engineered ML neural models at DRDO for clinical telemetry",
    "Built TODOAI MCP system automating task breakdowns by 80%",
    "Crafted locked-60fps WebGL/Three.js audio reactive engine"
  ],
  "status": "Available for High-Impact Software Engineering Roles"
}`,
    runOutput: `cat config/portfolioArchitect.json | jq .
{
  "status": "Available for High-Impact Software Engineering Roles",
  "verified_impact": 4,
  "engineer": "Ashish Chanchal"
}`,
  },
  {
    id: 'readme',
    name: 'README.md',
    folder: 'root',
    lang: 'markdown',
    icon: <SiMarkdown className="text-blue-300" />,
    defaultCode: `# Ashish Chanchal — Engineering Portfolio Workspace

Welcome to the internal source workspace for Ashish Chanchal's portfolio system.

### 🌟 Featured Highlights
- **Conversational Voice AI**: Low latency bidirectional streaming on Azure Cloud.
- **Biomedical Research (DRDO)**: Deep Learning classifiers for clinical telemetry.
- **Model Context Protocol (MCP)**: AI agents with tool-calling capabilities.
- **Modern Full-Stack**: React, TypeScript, NestJS, TailwindCSS, PostgreSQL, Three.js.

### 🚀 Interactive Editor & Shortcuts
- **Tab Key**: Inserts 2 spaces cleanly without jumping focus.
- **Enter Key**: Automatically indents new lines.
- **Ctrl+S / Cmd+S**: Save file.
- **Ctrl+Enter / Cmd+Enter**: Run file in integrated terminal!`,
    runOutput: `cat README.md
✓ Readme verified. All markdown lint checks passed.`,
  }
];

export const VSCodeApp: React.FC = () => {
  const [openFileIds, setOpenFileIds] = useState<string[]>([
    'sociantra',
    'drdo',
    'threejs',
    'manifest',
  ]);
  const [activeFileId, setActiveFileId] = useState<string>('sociantra');
  const [fileCodes, setFileCodes] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    VSCODE_PROJECT_FILES.forEach((f) => {
      initial[f.id] = f.defaultCode;
    });
    return initial;
  });

  const [sidebarTab, setSidebarTab] = useState<'explorer' | 'search' | 'git' | 'debug' | 'extensions'>('explorer');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTerminal, setShowTerminal] = useState(true);
  const [terminalTab, setTerminalTab] = useState<'terminal' | 'output' | 'problems' | 'debug'>('terminal');
  const [isRunning, setIsRunning] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Microsoft Windows [Version 10.0.22631.3007]',
    '(c) Microsoft Corporation. All rights reserved.',
    'PS C:\\Users\\Ashish\\Projects\\Portfolio> ready for execution',
  ]);
  const [isCopied, setIsCopied] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Folder open/collapse states
  const [foldersOpen, setFoldersOpen] = useState({
    ai: true,
    graphics: true,
    microservices: true,
    config: true,
  });

  const activeFile = VSCODE_PROJECT_FILES.find((f) => f.id === activeFileId) || VSCODE_PROJECT_FILES[0];
  const currentCode = fileCodes[activeFile.id] || activeFile.defaultCode;

  const openFile = (fileId: string) => {
    if (!openFileIds.includes(fileId)) {
      setOpenFileIds([...openFileIds, fileId]);
    }
    setActiveFileId(fileId);
  };

  const closeFile = (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation();
    const remaining = openFileIds.filter((id) => id !== fileId);
    setOpenFileIds(remaining);
    if (activeFileId === fileId && remaining.length > 0) {
      setActiveFileId(remaining[0]);
    }
  };

  const runCurrentFile = () => {
    setIsRunning(true);
    setShowTerminal(true);
    setTerminalTab('terminal');

    const newLogs = [
      ...terminalLogs,
      `PS C:\\Users\\Ashish\\Projects\\Portfolio> run ${activeFile.name}`,
      activeFile.runOutput || `[Execution] Compiled and executed ${activeFile.name} successfully.`,
      `PS C:\\Users\\Ashish\\Projects\\Portfolio>`,
    ];

    setTimeout(() => {
      setTerminalLogs(newLogs);
      setIsRunning(false);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab key: Insert 2 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;

      const updated = val.substring(0, start) + '  ' + val.substring(end);
      setFileCodes((prev) => ({ ...prev, [activeFile.id]: updated }));

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
      return;
    }

    // Enter key: Auto-indent to match preceding line
    if (e.key === 'Enter') {
      if (e.ctrlKey || e.metaKey) {
        // Ctrl+Enter or Cmd+Enter: Run file
        e.preventDefault();
        runCurrentFile();
        return;
      }

      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const val = textarea.value;

      // Find current line indent
      const lineStart = val.lastIndexOf('\n', start - 1) + 1;
      const currentLine = val.substring(lineStart, start);
      const match = currentLine.match(/^(\s+)/);
      let indent = match ? match[1] : '';

      // If line ends with '{', '(', or ':', add 2 extra spaces
      const trimmedLine = currentLine.trim();
      if (trimmedLine.endsWith('{') || trimmedLine.endsWith('(') || trimmedLine.endsWith(':') || trimmedLine.endsWith('[')) {
        indent += '  ';
      }

      const updated = val.substring(0, start) + '\n' + indent + val.substring(start);
      setFileCodes((prev) => ({ ...prev, [activeFile.id]: updated }));

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1 + indent.length;
      }, 0);
      return;
    }

    // Ctrl+S / Cmd+S: Save file
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      setSaveStatus('Saved');
      setTimeout(() => setSaveStatus(''), 2000);
      return;
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Search filtered files
  const searchResults = VSCODE_PROJECT_FILES.filter(
    (f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (fileCodes[f.id] || f.defaultCode).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lines = currentCode.split('\n');

  return (
    <div className="h-full flex bg-[#1e1e1e] text-zinc-300 font-mono text-xs select-none">
      {/* ══════════════════════════════════════════════
          1. FAR-LEFT ACTIVITY BAR
      ══════════════════════════════════════════════ */}
      <div className="w-12 bg-[#181818] border-r border-white/5 flex flex-col items-center justify-between py-2 text-zinc-500 z-10 flex-shrink-0">
        <div className="flex flex-col items-center gap-4 w-full">
          <button
            onClick={() => setSidebarTab('explorer')}
            className={`w-full py-2 flex items-center justify-center transition-all relative ${
              sidebarTab === 'explorer' ? 'text-white border-l-2 border-blue-500' : 'hover:text-zinc-300'
            }`}
            title="Explorer (Ctrl+Shift+E)"
          >
            <FaFolderOpen className="w-4 h-4" />
          </button>

          <button
            onClick={() => setSidebarTab('search')}
            className={`w-full py-2 flex items-center justify-center transition-all relative ${
              sidebarTab === 'search' ? 'text-white border-l-2 border-blue-500' : 'hover:text-zinc-300'
            }`}
            title="Search (Ctrl+Shift+F)"
          >
            <FaSearch className="w-4 h-4" />
          </button>

          <button
            onClick={() => setSidebarTab('git')}
            className={`w-full py-2 flex items-center justify-center transition-all relative ${
              sidebarTab === 'git' ? 'text-white border-l-2 border-blue-500' : 'hover:text-zinc-300'
            }`}
            title="Source Control"
          >
            <FaCodeBranch className="w-4 h-4" />
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-blue-500" />
          </button>

          <button
            onClick={() => setSidebarTab('debug')}
            className={`w-full py-2 flex items-center justify-center transition-all relative ${
              sidebarTab === 'debug' ? 'text-white border-l-2 border-blue-500' : 'hover:text-zinc-300'
            }`}
            title="Run & Debug"
          >
            <FaBug className="w-4 h-4" />
          </button>

          <button
            onClick={() => setSidebarTab('extensions')}
            className={`w-full py-2 flex items-center justify-center transition-all relative ${
              sidebarTab === 'extensions' ? 'text-white border-l-2 border-blue-500' : 'hover:text-zinc-300'
            }`}
            title="Extensions"
          >
            <FaThLarge className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-3 w-full">
          <button
            onClick={() => runCurrentFile()}
            className="p-2 rounded hover:bg-white/10 text-emerald-400 hover:text-emerald-300 transition-all"
            title="Run Active File (Ctrl+Enter)"
          >
            <FaPlay className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
          </button>
          <button className="p-2 hover:text-white" title="Settings">
            <FaCog className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          2. PRIMARY SIDEBAR (Explorer / Search / Git / Extensions)
      ══════════════════════════════════════════════ */}
      <div className="w-60 bg-[#181818] border-r border-white/10 flex flex-col justify-between flex-shrink-0 text-xs">
        {sidebarTab === 'explorer' ? (
          <div className="p-3 overflow-y-auto win11-scroll space-y-2">
            <div className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider flex items-center justify-between">
              <span>EXPLORER: ASHISH-WORKSPACE</span>
            </div>

            {/* Folder: src/ai */}
            <div className="space-y-0.5">
              <button
                onClick={() => setFoldersOpen({ ...foldersOpen, ai: !foldersOpen.ai })}
                className="w-full flex items-center gap-1.5 text-zinc-400 hover:text-white py-1 px-1 rounded hover:bg-white/5"
              >
                {foldersOpen.ai ? <FaChevronDown className="w-2.5 h-2.5 text-zinc-500" /> : <FaChevronRight className="w-2.5 h-2.5 text-zinc-500" />}
                <FaFolder className="text-yellow-500 w-3 h-3" />
                <span className="font-bold text-[11px]">src / ai</span>
              </button>

              {foldersOpen.ai && (
                <div className="pl-4 space-y-0.5">
                  {VSCODE_PROJECT_FILES.filter((f) => f.folder === 'src/ai').map((file) => (
                    <button
                      key={file.id}
                      onClick={() => openFile(file.id)}
                      className={`w-full text-left flex items-center gap-2 px-2 py-1 rounded transition-all text-xs ${
                        activeFileId === file.id ? 'bg-[#37373d] text-white font-bold' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                      }`}
                    >
                      {file.icon}
                      <span className="truncate">{file.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Folder: src/graphics */}
            <div className="space-y-0.5">
              <button
                onClick={() => setFoldersOpen({ ...foldersOpen, graphics: !foldersOpen.graphics })}
                className="w-full flex items-center gap-1.5 text-zinc-400 hover:text-white py-1 px-1 rounded hover:bg-white/5"
              >
                {foldersOpen.graphics ? <FaChevronDown className="w-2.5 h-2.5 text-zinc-500" /> : <FaChevronRight className="w-2.5 h-2.5 text-zinc-500" />}
                <FaFolder className="text-cyan-500 w-3 h-3" />
                <span className="font-bold text-[11px]">src / graphics</span>
              </button>

              {foldersOpen.graphics && (
                <div className="pl-4 space-y-0.5">
                  {VSCODE_PROJECT_FILES.filter((f) => f.folder === 'src/graphics').map((file) => (
                    <button
                      key={file.id}
                      onClick={() => openFile(file.id)}
                      className={`w-full text-left flex items-center gap-2 px-2 py-1 rounded transition-all text-xs ${
                        activeFileId === file.id ? 'bg-[#37373d] text-white font-bold' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                      }`}
                    >
                      {file.icon}
                      <span className="truncate">{file.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Folder: src/microservices */}
            <div className="space-y-0.5">
              <button
                onClick={() => setFoldersOpen({ ...foldersOpen, microservices: !foldersOpen.microservices })}
                className="w-full flex items-center gap-1.5 text-zinc-400 hover:text-white py-1 px-1 rounded hover:bg-white/5"
              >
                {foldersOpen.microservices ? <FaChevronDown className="w-2.5 h-2.5 text-zinc-500" /> : <FaChevronRight className="w-2.5 h-2.5 text-zinc-500" />}
                <FaFolder className="text-emerald-500 w-3 h-3" />
                <span className="font-bold text-[11px]">src / microservices</span>
              </button>

              {foldersOpen.microservices && (
                <div className="pl-4 space-y-0.5">
                  {VSCODE_PROJECT_FILES.filter((f) => f.folder === 'src/microservices').map((file) => (
                    <button
                      key={file.id}
                      onClick={() => openFile(file.id)}
                      className={`w-full text-left flex items-center gap-2 px-2 py-1 rounded transition-all text-xs ${
                        activeFileId === file.id ? 'bg-[#37373d] text-white font-bold' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                      }`}
                    >
                      {file.icon}
                      <span className="truncate">{file.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Folder: config */}
            <div className="space-y-0.5">
              <button
                onClick={() => setFoldersOpen({ ...foldersOpen, config: !foldersOpen.config })}
                className="w-full flex items-center gap-1.5 text-zinc-400 hover:text-white py-1 px-1 rounded hover:bg-white/5"
              >
                {foldersOpen.config ? <FaChevronDown className="w-2.5 h-2.5 text-zinc-500" /> : <FaChevronRight className="w-2.5 h-2.5 text-zinc-500" />}
                <FaFolder className="text-amber-500 w-3 h-3" />
                <span className="font-bold text-[11px]">config</span>
              </button>

              {foldersOpen.config && (
                <div className="pl-4 space-y-0.5">
                  {VSCODE_PROJECT_FILES.filter((f) => f.folder === 'config').map((file) => (
                    <button
                      key={file.id}
                      onClick={() => openFile(file.id)}
                      className={`w-full text-left flex items-center gap-2 px-2 py-1 rounded transition-all text-xs ${
                        activeFileId === file.id ? 'bg-[#37373d] text-white font-bold' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                      }`}
                    >
                      {file.icon}
                      <span className="truncate">{file.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Root Files */}
            <div className="pt-2">
              {VSCODE_PROJECT_FILES.filter((f) => f.folder === 'root').map((file) => (
                <button
                  key={file.id}
                  onClick={() => openFile(file.id)}
                  className={`w-full text-left flex items-center gap-2 px-2 py-1 rounded transition-all text-xs ${
                    activeFileId === file.id ? 'bg-[#37373d] text-white font-bold' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                  }`}
                >
                  {file.icon}
                  <span className="truncate">{file.name}</span>
                </button>
              ))}
            </div>
          </div>
        ) : sidebarTab === 'search' ? (
          <div className="p-3 space-y-3 overflow-y-auto win11-scroll">
            <div className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider">SEARCH WORKSPACE</div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search across all files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#141414] border border-white/10 rounded px-2.5 py-1 text-xs text-white outline-none focus:border-blue-500"
                autoFocus
              />
            </div>
            <div className="space-y-1">
              <div className="text-[10px] text-zinc-500">{searchResults.length} file results</div>
              {searchResults.map((f) => (
                <button
                  key={f.id}
                  onClick={() => openFile(f.id)}
                  className="w-full text-left p-1.5 rounded hover:bg-white/5 flex items-center gap-2 text-xs"
                >
                  {f.icon}
                  <div className="truncate flex-1">
                    <div className="text-white font-bold truncate">{f.name}</div>
                    <div className="text-[10px] text-zinc-500 truncate">{f.folder}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : sidebarTab === 'git' ? (
          <div className="p-3 space-y-3">
            <div className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider">SOURCE CONTROL: GIT</div>
            <div className="p-2 rounded bg-black/30 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-400">Branch:</span>
                <span className="font-bold text-blue-400">main</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-400">Status:</span>
                <span className="text-emerald-400 font-bold">✓ Synced with Origin</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-400">Remote:</span>
                <span className="text-zinc-300 font-mono text-[10px]">github.com/Ashish-chanchal</span>
              </div>
            </div>
            <div className="text-[10px] text-zinc-500">Staged Changes: 0 files</div>
          </div>
        ) : sidebarTab === 'debug' ? (
          <div className="p-3 space-y-3">
            <div className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider">RUN & DEBUG</div>
            <button
              onClick={() => runCurrentFile()}
              className="w-full py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2 shadow transition-all"
            >
              <FaPlay className="w-3 h-3" />
              <span>Launch Debugger</span>
            </button>
            <div className="p-2 rounded bg-black/30 border border-white/5 text-[10px] space-y-1 text-zinc-400">
              <div>TARGET: Node.js / Python Runtime</div>
              <div>BREAKPOINTS: None set</div>
              <div>ATTACH: Auto-detected</div>
            </div>
          </div>
        ) : (
          <div className="p-3 space-y-3 overflow-y-auto win11-scroll">
            <div className="text-[11px] uppercase font-bold text-zinc-400 tracking-wider">EXTENSIONS</div>
            {[
              { name: 'Tailwind CSS IntelliSense', author: 'Tailwind Labs', ver: 'v0.12.5' },
              { name: 'Python', author: 'Microsoft', ver: 'v2026.4.0' },
              { name: 'GitHub Copilot', author: 'GitHub', ver: 'v1.180.0' },
              { name: 'ESLint', author: 'Dirk Bäumer', ver: 'v3.0.10' },
              { name: 'Prettier - Code Formatter', author: 'Prettier', ver: 'v10.4.0' },
              { name: 'Material Icon Theme', author: 'Philipp Kief', ver: 'v5.2.0' },
            ].map((ext, i) => (
              <div key={i} className="p-2 bg-black/30 border border-white/5 rounded">
                <div className="font-bold text-white text-xs">{ext.name}</div>
                <div className="text-[10px] text-zinc-400 flex items-center justify-between mt-0.5">
                  <span>{ext.author}</span>
                  <span className="text-emerald-400 font-mono">Installed</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Git Widget */}
        <div className="p-2.5 border-t border-white/10 bg-[#141414] flex items-center justify-between text-[10px] text-zinc-400">
          <div className="flex items-center gap-1.5">
            <FaCodeBranch className="text-blue-400" />
            <span>main*</span>
          </div>
          <span className="text-emerald-400 font-bold">0↓ 0↑</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          3. EDITOR & TABS & TERMINAL AREA
      ══════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden">
        {/* Top Tab Bar */}
        <div className="flex items-center justify-between bg-[#141414] border-b border-white/10 overflow-x-auto no-scrollbar">
          <div className="flex items-center">
            {openFileIds.map((fileId) => {
              const file = VSCODE_PROJECT_FILES.find((f) => f.id === fileId);
              if (!file) return null;
              const isActive = activeFileId === fileId;

              return (
                <div
                  key={fileId}
                  onClick={() => setActiveFileId(fileId)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs border-r border-white/5 cursor-pointer transition-all ${
                    isActive
                      ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500 font-bold'
                      : 'bg-[#141414] text-zinc-500 hover:text-zinc-300 hover:bg-[#191919]'
                  }`}
                >
                  {file.icon}
                  <span className="truncate max-w-[140px]">{file.name}</span>
                  <button
                    onClick={(e) => closeFile(e, fileId)}
                    className="p-0.5 rounded hover:bg-white/10 text-zinc-500 hover:text-white"
                  >
                    <FaTimes className="w-2.5 h-2.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Quick Code Actions (Run, Copy, Save, Toggle Terminal) */}
          <div className="flex items-center gap-1.5 px-3">
            {saveStatus && (
              <span className="text-emerald-400 text-[10px] font-mono flex items-center gap-1 animate-fadeIn">
                <FaSave className="w-2.5 h-2.5" />
                <span>{saveStatus}</span>
              </span>
            )}

            <button
              onClick={copyCode}
              className="px-2 py-1 rounded bg-white/10 hover:bg-white/15 text-zinc-300 text-[11px] flex items-center gap-1 transition-all"
              title="Copy Code"
            >
              {isCopied ? <FaCheck className="text-emerald-400 w-2.5 h-2.5" /> : <FaRegCopy className="w-2.5 h-2.5" />}
              <span>{isCopied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={runCurrentFile}
              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1.5 shadow transition-all"
              title="Execute File (Ctrl+Enter)"
            >
              <FaPlay className={`w-2.5 h-2.5 ${isRunning ? 'animate-spin' : ''}`} />
              <span>Run</span>
            </button>

            <button
              onClick={() => setShowTerminal(!showTerminal)}
              className={`p-1.5 rounded transition-all ${
                showTerminal ? 'bg-blue-600/30 text-blue-400' : 'hover:bg-white/10 text-zinc-400 hover:text-white'
              }`}
              title="Toggle Integrated Terminal"
            >
              <FaTerminal className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Breadcrumb Path Bar */}
        <div className="px-4 py-1 bg-[#1e1e1e] border-b border-white/5 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-1.5">
            <span>portfolio</span>
            <span>&gt;</span>
            <span>{activeFile.folder}</span>
            <span>&gt;</span>
            <span className="text-zinc-200 font-bold">{activeFile.name}</span>
          </div>
          <span className="text-[10px] text-zinc-600">⌨️ Full Keyboard: Tab / Enter / Ctrl+S supported</span>
        </div>

        {/* Main Code Viewport with Live Interactive Line Numbers and Textarea */}
        <div className="flex-1 flex overflow-hidden relative bg-[#1e1e1e]">
          {/* Line Numbers Column */}
          <div className="w-10 py-3 pr-2 select-none text-zinc-600 font-mono text-xs text-right bg-[#1e1e1e] border-r border-white/5 overflow-hidden flex-shrink-0">
            {lines.map((_, i) => (
              <div key={i} className="leading-6 h-6">{i + 1}</div>
            ))}
          </div>

          {/* Interactive Code Editor Textarea */}
          <textarea
            ref={textareaRef}
            value={currentCode}
            onChange={(e) => setFileCodes((prev) => ({ ...prev, [activeFile.id]: e.target.value }))}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="flex-1 py-3 px-3 bg-transparent text-zinc-200 font-mono text-xs leading-6 outline-none resize-none overflow-y-auto win11-scroll whitespace-pre tab-2 selection:bg-blue-600/40"
            style={{ tabSize: 2 }}
          />
        </div>

        {/* ══════════════════════════════════════════════
            4. INTEGRATED TERMINAL & OUTPUT PANEL
        ══════════════════════════════════════════════ */}
        {showTerminal && (
          <div className="h-44 bg-[#141414] border-t border-white/10 flex flex-col flex-shrink-0 animate-fadeIn">
            {/* Terminal Header Tabs */}
            <div className="px-3 py-1 bg-[#181818] border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4 text-[11px]">
                <button
                  onClick={() => setTerminalTab('terminal')}
                  className={`py-1 transition-all ${
                    terminalTab === 'terminal' ? 'text-white border-b-2 border-blue-500 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  TERMINAL
                </button>
                <button
                  onClick={() => setTerminalTab('output')}
                  className={`py-1 transition-all ${
                    terminalTab === 'output' ? 'text-white border-b-2 border-blue-500 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  OUTPUT
                </button>
                <button
                  onClick={() => setTerminalTab('problems')}
                  className={`py-1 transition-all ${
                    terminalTab === 'problems' ? 'text-white border-b-2 border-blue-500 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  PROBLEMS (0)
                </button>
                <button
                  onClick={() => setTerminalTab('debug')}
                  className={`py-1 transition-all ${
                    terminalTab === 'debug' ? 'text-white border-b-2 border-blue-500 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  DEBUG CONSOLE
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTerminalLogs(['PS C:\\Users\\Ashish\\Projects\\Portfolio> ready for execution'])}
                  className="text-[10px] text-zinc-500 hover:text-zinc-300"
                  title="Clear Terminal"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowTerminal(false)}
                  className="p-1 text-zinc-500 hover:text-white"
                  title="Close Panel"
                >
                  <FaTimes className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-3 overflow-y-auto win11-scroll font-mono text-[11px] space-y-1 text-zinc-300">
              {terminalTab === 'terminal' ? (
                <div>
                  {terminalLogs.map((log, i) => (
                    <div key={i} className={log.startsWith('✓') ? 'text-emerald-400 font-bold' : log.startsWith('>') ? 'text-cyan-400' : 'text-zinc-300'}>
                      {log}
                    </div>
                  ))}
                  {isRunning && (
                    <div className="text-yellow-400 animate-pulse flex items-center gap-2">
                      <span>⚙️ Executing {activeFile.name}...</span>
                    </div>
                  )}
                </div>
              ) : terminalTab === 'output' ? (
                <div className="text-zinc-400">
                  [Language Server] TypeScript 5.4 language service initialized.
                  <br />
                  [Python Server] PyTorch GPU acceleration runtime verified.
                </div>
              ) : terminalTab === 'problems' ? (
                <div className="text-emerald-400 flex items-center gap-2">
                  <FaCheck />
                  <span>No problems have been detected in the workspace.</span>
                </div>
              ) : (
                <div className="text-zinc-500">
                  Debug console idle. Click "Launch Debugger" to attach breakpoints.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            5. VS CODE BOTTOM BLUE STATUS BAR
        ══════════════════════════════════════════════ */}
        <div className="bg-[#007acc] text-white text-[10px] px-3 py-0.5 flex items-center justify-between font-mono flex-shrink-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FaCodeBranch className="w-2.5 h-2.5" />
              <span>main</span>
            </span>
            <span>✓ 0 Errors</span>
            <span>0 Warnings</span>
            <span>Ln {lines.length}, Col {currentCode.length}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Spaces: 2</span>
            <span>UTF-8</span>
            <span>{activeFile.lang.toUpperCase()}</span>
            <span className="bg-blue-700 px-1 rounded text-[9px]">Prettier</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSCodeApp;
