import React, { useState, useRef, useEffect } from 'react';

const ASCII_LOGO = `
    █████╗ ███████╗██╗  ██╗██║███████╗██╗  ██╗
   ██╔══██╗██╔════╝██║  ██║██║██╔════╝██║  ██║
   ███████║███████╗███████║██║███████║███████║
   ██╔══██║╚════██║██╔══██║██║╚════██║██╔══██║
   ██║  ██║███████║██║  ██║██║███████║██║  ██║
   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ██║
`;

const INITIAL_HISTORY = [
  'Windows PowerShell',
  'Copyright (C) Microsoft Corporation. All rights reserved.',
  '',
  'Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows',
  '',
  'Loading Ashish Chanchal Dev Environment [v11.0.22631]...',
  'All systems verified: NestJS · React · Three.js · PyTorch · Cloud Azure',
  'Type "help" to view all available commands or "neofetch" for system telemetry.',
  '',
];

export const TerminalApp: React.FC = () => {
  const [history, setHistory] = useState<string[]>(INITIAL_HISTORY);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const ALL_COMMANDS = [
    'help',
    'neofetch',
    'projects',
    'skills',
    'experience',
    'cat bio.txt',
    'contact',
    'cls',
    'clear',
    'whoami',
    'date',
    'matrix',
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Tab key auto-completion
    if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;

      const match = ALL_COMMANDS.find((cmd) => cmd.startsWith(current));
      if (match) {
        setInputVal(match);
      }
      return;
    }

    // Up Arrow: History backward
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;

      const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(cmdHistory[nextIndex]);
      return;
    }

    // Down Arrow: History forward
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;

      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      }
      return;
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = inputVal.trim();
    const cmd = rawCmd.toLowerCase();
    if (!rawCmd) return;

    setCmdHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const newHistory = [...history, `PS C:\\Users\\Ashish> ${inputVal}`];

    switch (cmd) {
      case 'help':
        newHistory.push(
          'Available Commands (Press Tab to Autocomplete):',
          '  neofetch       Display system profile, telemetry, and ASCII banner',
          '  projects       List all featured engineering projects with stack info',
          '  skills         Print tech stack matrix and capabilities loadout',
          '  experience     Display career expeditions and DRDO research milestones',
          '  cat bio.txt    Read full developer chronicle & background',
          '  contact        Show electronic mail and communication coordinates',
          '  cls / clear    Clear terminal buffer',
          '  whoami         Display current user identity',
          '  date           Display current system time and timezone',
          '  matrix         Run high-throughput matrix cascade simulation'
        );
        break;

      case 'neofetch':
        newHistory.push(
          ASCII_LOGO,
          'OS: Windows 11 Pro (Portfolio Dev Edition) x86_64',
          'Host: Ashish-Workstation-Rig v2.4',
          'Kernel: 10.0.22631.3007-production',
          'Uptime: 24 days, 6 hours, 42 mins',
          'Shell: PowerShell 7.4.0',
          'Resolution: 3840x2160 @ 144Hz (HDR OLED)',
          'DE: Fluent Acrylic Mica UI',
          'WM: Windows 11 Portfolio Compositor',
          'Terminal: Windows Terminal GPU-Accelerated',
          'CPU: 13th Gen Intel(R) Core(TM) i9-13900K (24) @ 5.80GHz',
          'GPU: NVIDIA GeForce RTX 4090 (24GB VRAM)',
          'Memory: 14210MiB / 32768MiB (43%)',
          'Focus: Full-Stack Architectures & Clinical Machine Learning',
          'Location: Noida, Uttar Pradesh, India (UTC+5:30)'
        );
        break;

      case 'projects':
        newHistory.push(
          'FEATURED PRODUCTION PROJECTS:',
          '-------------------------------------------------------',
          '[1] TODOAI — Natural Language AI Task Orchestration',
          '    Stack: React · Node.js · MCP Protocol · SQLite',
          '    Highlights: 80% task breakdown automation, real-time cron engine.',
          '',
          '[2] SOCIANTRA — Real-Time Conversational AI Voice Platform',
          '    Stack: React · Azure Cloud · FastAPI · WebSockets',
          '    Highlights: Cut voice latency from 15s to <3s, live audio pipelines.',
          '',
          '[3] VIBEPULSE — 3D Cyberpunk Sound Experience',
          '    Stack: React · Three.js · Web Audio API · WebGL',
          '    Highlights: 60 FPS real-time audio visualization with reactive shaders.',
          '',
          '[4] CINEVERSE — Interactive Cinema Exploration Engine',
          '    Stack: React · TMDB REST API · TailwindCSS · Framer Motion',
          '    Highlights: Instant smart search, responsive media curation.',
          '-------------------------------------------------------'
        );
        break;

      case 'skills':
        newHistory.push(
          'ARSENAL & CORE CAPABILITIES:',
          '  Languages:    TypeScript, JavaScript, Python, Dart, C/C++, HTML5, CSS3/SCSS',
          '  Frontend:     React, Next.js, Three.js, Redux Toolkit, TailwindCSS',
          '  Backend:      NestJS, Node.js, Express, FastAPI, WebSockets, REST, MCP',
          '  Databases:    PostgreSQL, MongoDB, Redis, SQLite, Cloud Firestore',
          '  AI / ML:      PyTorch, Scikit-Learn, OpenCV, NumPy, Pandas, MCP Tools',
          '  Cloud/DevOps: Azure, Docker, Linux, CI/CD Actions, Git, Postman'
        );
        break;

      case 'experience':
      case 'cat bio.txt':
        newHistory.push(
          'CAREER MILESTONES & RESEARCH:',
          '  [1] DRDO (Defence Research and Development Organisation)',
          '      Research Intern · Biomedical & Clinical Telemetry ML Models',
          '      Developed neural anomaly predictors for mission-critical clinical telemetry.',
          '',
          '  [2] Sociantra Conversational AI',
          '      Full-Stack & Voice AI Engineer',
          '      Slashed response latency from 15s to <3s using bidirectional audio pipelines.',
          '',
          '  Engineering mantra: Zero noise, relentless optimization, unapologetic quality.'
        );
        break;

      case 'contact':
        newHistory.push(
          'COMMUNICATIONS COORDINATES:',
          '  Email:     akchanchal2002@gmail.com',
          '  LinkedIn:  https://www.linkedin.com/in/ashishchanchal/',
          '  GitHub:    https://github.com/Ashish-chanchal',
          '  Twitter:   https://x.com/ashishchanchal0',
          '  Instagram: https://www.instagram.com/ashish._chanchal/'
        );
        break;

      case 'whoami':
        newHistory.push('ashish-workstation\\ashish (Administrator / Software Architect)');
        break;

      case 'date':
        newHistory.push(new Date().toString());
        break;

      case 'cls':
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'matrix':
        newHistory.push(
          '01000001 01010011 01001000 01001001 01010011 01001000',
          '01000011 01001000 01000001 01001110 01000011 01001000 01000001 01001100',
          '>>> NEURAL MATRIX STREAM INITIATED >>> ZERO PACKET LOSS'
        );
        break;

      default:
        newHistory.push(`'${inputVal}' is not recognized as an internal or external command. Type "help" for a list.`);
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-full bg-[#0c0c0c] text-zinc-200 font-mono text-xs sm:text-sm p-4 overflow-y-auto win11-scroll select-text flex flex-col justify-between cursor-text"
    >
      <div className="space-y-1">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.startsWith('PS C:') ? 'text-white font-bold' : line.startsWith('Available') || line.startsWith('FEATURED') || line.startsWith('ARSENAL') ? 'text-accent font-bold' : 'text-zinc-300'
            }`}
          >
            {line}
          </div>
        ))}

        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
          <span className="text-accent font-bold">PS C:\Users\Ashish&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono"
            autoFocus
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default TerminalApp;
