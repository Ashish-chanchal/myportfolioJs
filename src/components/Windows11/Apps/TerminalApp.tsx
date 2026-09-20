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
    'Get-Help',
    'man',
    'neofetch',
    'projects',
    'skills',
    'experience',
    'cat bio.txt',
    'dir',
    'ls',
    'ipconfig',
    'systeminfo',
    'hostname',
    'ping',
    'echo',
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

      const match = ALL_COMMANDS.find((cmd) => cmd.toLowerCase().startsWith(current));
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
    if (!rawCmd) return;

    setCmdHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const newHistory = [...history, `PS C:\\Users\\Ashish> ${inputVal}`];
    const parts = rawCmd.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').trim().toLowerCase();

    // man or Get-Help handler
    if (cmd === 'man' || cmd === 'get-help') {
      if (!arg) {
        newHistory.push(
          'NAME',
          '    Get-Help / man - Displays help for PowerShell cmdlets and concepts.',
          '',
          'SYNOPSIS',
          '    man <command> or Get-Help <command>',
          '',
          'EXAMPLES',
          '    man neofetch',
          '    man projects',
          '    man dir',
          '    man ipconfig'
        );
      } else {
        switch (arg) {
          case 'neofetch':
            newHistory.push(
              'NAME: neofetch - CLI system architecture and hardware telemetry viewer',
              'SYNOPSIS: neofetch',
              'DESCRIPTION: Visualizes system kernel, CPU, GPU, resolution, and memory footprint in Windows Terminal.'
            );
            break;
          case 'dir':
          case 'ls':
            newHistory.push(
              'NAME: Get-ChildItem (dir, ls) - Gets the files and folders in a file system drive.',
              'SYNOPSIS: dir',
              'DESCRIPTION: Lists child elements of directory C:\\Users\\Ashish including project repos and bio notes.'
            );
            break;
          case 'ipconfig':
            newHistory.push(
              'NAME: ipconfig - Windows IP Configuration utility',
              'SYNOPSIS: ipconfig [/all]',
              'DESCRIPTION: Displays all current TCP/IP network configuration values and active adapters.'
            );
            break;
          case 'projects':
            newHistory.push(
              'NAME: projects - Displays enterprise and AI engineering projects',
              'SYNOPSIS: projects',
              'DESCRIPTION: Outlines TODOAI, Sociantra, Cineverse, and VibePulse architectures.'
            );
            break;
          case 'skills':
            newHistory.push(
              'NAME: skills - Full-stack and machine learning matrix',
              'SYNOPSIS: skills',
              'DESCRIPTION: Lists TypeScript, NestJS, React, Python, PyTorch, Azure, and Three.js capabilities.'
            );
            break;
          default:
            newHistory.push(`No manual entry or help topic found for '${arg}'.`);
            break;
        }
      }
      setHistory(newHistory);
      setInputVal('');
      return;
    }

    if (cmd === 'echo') {
      newHistory.push(parts.slice(1).join(' '));
      setHistory(newHistory);
      setInputVal('');
      return;
    }

    switch (cmd) {
      case 'help':
        newHistory.push(
          'Available Commands (Press Tab to Autocomplete):',
          '  Get-Help / man <cmd>  Display manual / help documentation for commands',
          '  neofetch              Display system profile, telemetry, and ASCII banner',
          '  projects              List all featured engineering projects with stack info',
          '  skills                Print tech stack matrix and capabilities loadout',
          '  experience            Display career expeditions and DRDO research milestones',
          '  cat bio.txt           Read full developer chronicle & background',
          '  dir / ls              List directory files and folders in C:\\Users\\Ashish',
          '  ipconfig              Display IP network configuration and adapter status',
          '  systeminfo            Output detailed hardware & OS configuration',
          '  hostname              Print current computer name',
          '  ping <host>           Test network latency and packet receipt',
          '  contact               Show electronic mail and communication coordinates',
          '  cls / clear           Clear terminal buffer',
          '  whoami                Display current user identity',
          '  date                  Display current system time and timezone',
          '  matrix                Run high-throughput matrix cascade simulation'
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

      case 'dir':
      case 'ls':
        newHistory.push(
          ' Directory: C:\\Users\\Ashish',
          '',
          'Mode                 LastWriteTime         Length Name',
          '----                 -------------         ------ ----',
          'd-----        09/19/2026     10:15                Projects',
          'd-----        09/19/2026     11:30                Documents',
          'd-----        09/19/2026     09:00                Source',
          '-a----        09/19/2026     22:45           1420 bio.txt',
          '-a----        09/19/2026     18:12           3450 resume.pdf',
          '-a----        09/19/2026     23:00            512 config.json'
        );
        break;

      case 'ipconfig':
        newHistory.push(
          'Windows IP Configuration',
          '',
          'Ethernet adapter vEthernet (Default Switch):',
          '   Connection-specific DNS Suffix  . :',
          '   Link-local IPv6 Address . . . . . : fe80::d51a:612a:71a2:9b44%24',
          '   IPv4 Address. . . . . . . . . . . : 192.168.1.108',
          '   Subnet Mask . . . . . . . . . . . : 255.255.255.0',
          '   Default Gateway . . . . . . . . . : 192.168.1.1'
        );
        break;

      case 'systeminfo':
        newHistory.push(
          'Host Name:                 ASHISH-RIG',
          'OS Name:                   Microsoft Windows 11 Pro',
          'OS Version:                10.0.22631 N/A Build 22631',
          'OS Manufacturer:           Microsoft Corporation',
          'OS Configuration:          Standalone Workstation',
          'System Manufacturer:       Custom High-Performance Architecture',
          'System Type:               x64-based PC',
          'Processor(s):              1 Processor(s) Installed.',
          '                           [01]: Intel64 Family 6 Model 183 Stepping 1 GenuineIntel ~3000 Mhz',
          'Total Physical Memory:     32,768 MB',
          'Available Physical Memory: 18,558 MB'
        );
        break;

      case 'hostname':
        newHistory.push('ASHISH-RIG');
        break;

      case 'ping':
        newHistory.push(
          'Pinging gateway.ashish.dev [192.168.1.1] with 32 bytes of data:',
          'Reply from 192.168.1.1: bytes=32 time=1ms TTL=64',
          'Reply from 192.168.1.1: bytes=32 time=2ms TTL=64',
          'Reply from 192.168.1.1: bytes=32 time=1ms TTL=64',
          'Reply from 192.168.1.1: bytes=32 time=1ms TTL=64',
          '',
          'Ping statistics for 192.168.1.1:',
          '    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)'
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
