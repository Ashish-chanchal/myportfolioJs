import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system';
  content: string | React.ReactNode;
}

export const MacTerminalApp: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'system',
      content: 'Last login: ' + new Date().toUTCString() + ' on ttys001',
    },
    {
      id: 'init-2',
      type: 'system',
      content: 'Type "help" or "neofetch" to inspect Ashish Chanchal\'s workstation.',
    },
  ]);

  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const AVAILABLE_COMMANDS = ['help', 'neofetch', 'projects', 'skills', 'whoami', 'clear', 'ls', 'cat', 'curl', 'contact', 'date', 'pwd', 'uname', 'matrix'];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const runNeofetch = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 font-mono text-xs">
        <div className="text-cyan-400 whitespace-pre leading-tight">
{`                    'c.
                 ,xNMM.
               .OMMMMo
               lMM"
     .;loddo:.  .olloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
.MMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMWd.
  'XMMMMMMMMMMMMMMMMMMMMMMk.
    'xNMMMMMMMMMMMMMMMMMMMM.
      .ldxkkxxkdoxkkxxdd:.`}
        </div>

        <div className="space-y-1 text-zinc-300">
          <div className="text-emerald-400 font-bold border-b border-white/10 pb-1">
            ashish@Ashishs-MacBook-Pro.local
          </div>
          <div><span className="text-cyan-400 font-bold">OS:</span> macOS Sequoia 15.2 arm64</div>
          <div><span className="text-cyan-400 font-bold">Host:</span> MacBookPro16,1 [M3 Max]</div>
          <div><span className="text-cyan-400 font-bold">Kernel:</span> Darwin 24.1.0</div>
          <div><span className="text-cyan-400 font-bold">Uptime:</span> 14 days, 6 hours, 42 mins</div>
          <div><span className="text-cyan-400 font-bold">Packages:</span> 342 (brew), 12 (npm)</div>
          <div><span className="text-cyan-400 font-bold">Shell:</span> zsh 5.9 (x86_64-apple-darwin24.0)</div>
          <div><span className="text-cyan-400 font-bold">Resolution:</span> 3456x2234 @ 120Hz Liquid Retina XDR</div>
          <div><span className="text-cyan-400 font-bold">CPU:</span> Apple M3 Max (16-core)</div>
          <div><span className="text-cyan-400 font-bold">GPU:</span> Apple M3 Max (40-core)</div>
          <div><span className="text-cyan-400 font-bold">Memory:</span> 18420MiB / 65536MiB (28%)</div>
          <div className="pt-2 flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-black border border-white/20" />
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="w-3 h-3 rounded-full bg-magenta-500" />
            <span className="w-3 h-3 rounded-full bg-cyan-400" />
            <span className="w-3 h-3 rounded-full bg-white" />
          </div>
        </div>
      </div>
    );
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    setCmdHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    const parts = raw.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    const newHistory: TerminalLine[] = [
      ...history,
      { id: `in-${Date.now()}`, type: 'input', content: raw },
    ];

    switch (cmd) {
      case 'help':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-1 text-zinc-300">
              <div className="text-amber-400 font-bold">Available ZSH Commands:</div>
              <div><span className="text-cyan-400 font-bold">neofetch</span> - Display hardware and system telemetry</div>
              <div><span className="text-cyan-400 font-bold">projects</span> - List flagship engineering projects</div>
              <div><span className="text-cyan-400 font-bold">skills</span> - Display technical skill competencies</div>
              <div><span className="text-cyan-400 font-bold">whoami</span> - Display developer bio & role</div>
              <div><span className="text-cyan-400 font-bold">contact</span> - Display email, LinkedIn & socials</div>
              <div><span className="text-cyan-400 font-bold">ls</span> - List files in current directory</div>
              <div><span className="text-cyan-400 font-bold">cat &lt;file&gt;</span> - Read content of a file</div>
              <div><span className="text-cyan-400 font-bold">clear</span> - Clear terminal buffer</div>
              <div><span className="text-cyan-400 font-bold">date / pwd / uname</span> - Standard UNIX utility commands</div>
            </div>
          ),
        });
        break;

      case 'neofetch':
      case 'fastfetch':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: runNeofetch(),
        });
        break;

      case 'projects':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-1.5 text-zinc-300">
              <div className="text-blue-400 font-bold">🚀 Flagship Software Projects:</div>
              <div>1. <span className="text-white font-bold">Sociantra</span> — Next-Gen AI Social Network (React, TypeScript, WebSocket)</div>
              <div>2. <span className="text-white font-bold">TODOAI</span> — Autonomous Task & Priority Intelligence (Vite, LLM Agents)</div>
              <div>3. <span className="text-white font-bold">VibePulse</span> — Real-time Audio Stream & Emotion Engine (Web Audio API)</div>
              <div>4. <span className="text-white font-bold">CineVerse</span> — AI-Powered Cinema Streaming Platform (TMDB, React)</div>
            </div>
          ),
        });
        break;

      case 'skills':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-1 text-zinc-300">
              <div className="text-emerald-400 font-bold">⚡ Technical Competencies:</div>
              <div><span className="text-white font-semibold">Languages:</span> TypeScript, JavaScript (ESNext), Python, SQL, C/C++</div>
              <div><span className="text-white font-semibold">Frontend:</span> React 19, Next.js, TailwindCSS, WebGL/Three.js, Redux</div>
              <div><span className="text-white font-semibold">Backend:</span> Node.js, Express, FastAPI, PostgreSQL, MongoDB, Redis</div>
              <div><span className="text-white font-semibold">AI/Cloud:</span> AI Agents, LangChain, OpenAI/Claude APIs, Docker, AWS, GCP</div>
            </div>
          ),
        });
        break;

      case 'whoami':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: 'Ashish Chanchal — Full-Stack Software Engineer & AI Systems Architect based in Noida, India.',
        });
        break;

      case 'contact':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-1 text-zinc-300">
              <div><span className="text-cyan-400">Email:</span> ashishchanchal.dev@gmail.com</div>
              <div><span className="text-cyan-400">LinkedIn:</span> linkedin.com/in/ashishchanchal</div>
              <div><span className="text-cyan-400">GitHub:</span> github.com/ashish-chanchal</div>
            </div>
          ),
        });
        break;

      case 'ls':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: 'Applications  Documents  Downloads  Projects  Resume.pdf  Architecture.md',
        });
        break;

      case 'cat':
        if (args.includes('resume') || args.includes('Resume.pdf')) {
          newHistory.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: 'Ashish Chanchal CV: Full-Stack Engineer with 3+ years experience in scalable systems, AI interfaces, and cloud computing.',
          });
        } else {
          newHistory.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: `cat: ${args || 'file'}: No such file or directory. Try "cat Resume.pdf"`,
          });
        }
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'man':
        const manTarget = args.trim().toLowerCase();
        if (!manTarget) {
          newHistory.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: (
              <div className="text-zinc-400 space-y-1">
                <div>What manual page do you want?</div>
                <div>Usage: <span className="text-cyan-400 font-bold">man &lt;command&gt;</span> (e.g. <span className="text-white font-mono">man neofetch</span>, <span className="text-white font-mono">man projects</span>, <span className="text-white font-mono">man skills</span>, <span className="text-white font-mono">man whoami</span>)</div>
              </div>
            ),
          });
        } else if (manTarget === 'neofetch' || manTarget === 'fastfetch') {
          newHistory.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: (
              <div className="font-mono text-xs space-y-2 border-l-2 border-cyan-400 pl-3 py-1">
                <div className="text-cyan-300 font-bold">NEOFETCH(1) · General Commands Manual · Ashish Darwin</div>
                <div><span className="text-white font-semibold">NAME:</span> neofetch — render workstation hardware, Apple Silicon telemetry, memory and kernel metrics.</div>
                <div><span className="text-white font-semibold">SYNOPSIS:</span> <span className="text-cyan-400">neofetch</span> [--ascii]</div>
                <div><span className="text-white font-semibold">DESCRIPTION:</span> Displays real-time host info for Apple M3 Max, Liquid Retina XDR screen, Darwin 24.1.0 and zsh shell environment.</div>
              </div>
            ),
          });
        } else if (manTarget === 'projects') {
          newHistory.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: (
              <div className="font-mono text-xs space-y-2 border-l-2 border-purple-400 pl-3 py-1">
                <div className="text-purple-300 font-bold">PROJECTS(1) · Portfolio Systems Reference</div>
                <div><span className="text-white font-semibold">NAME:</span> projects — index of flagship AI, full-stack, and microservice engineering artifacts.</div>
                <div><span className="text-white font-semibold">ENTRIES:</span></div>
                <div className="pl-3 space-y-1 text-zinc-300">
                  <div>· <span className="text-white font-bold">TODOAI</span>: MCP Protocol Agent Orchestrator with Gemini Flash Cognition.</div>
                  <div>· <span className="text-white font-bold">Sociantra</span>: Autonomous Voice & Social AutoPilot Engine.</div>
                  <div>· <span className="text-white font-bold">VibePulse</span>: Web Audio API Streamer with real-time spectrum analysis.</div>
                  <div>· <span className="text-white font-bold">CineVerse</span>: Cinema streaming OTT platform with trailer previews.</div>
                </div>
              </div>
            ),
          });
        } else if (manTarget === 'skills') {
          newHistory.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: (
              <div className="font-mono text-xs space-y-2 border-l-2 border-emerald-400 pl-3 py-1">
                <div className="text-emerald-300 font-bold">SKILLS(1) · Technical Architecture Competencies</div>
                <div><span className="text-white font-semibold">NAME:</span> skills — catalog of core languages, distributed systems frameworks, and AI toolsets.</div>
                <div><span className="text-white font-semibold">COVERAGE:</span> TypeScript, Python, NestJS, gRPC, React 19, Docker, Azure DevOps, MCP.</div>
              </div>
            ),
          });
        } else if (manTarget === 'whoami') {
          newHistory.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: (
              <div className="font-mono text-xs space-y-2 border-l-2 border-amber-400 pl-3 py-1">
                <div className="text-amber-300 font-bold">WHOAMI(1) · User Identity Manual</div>
                <div><span className="text-white font-semibold">NAME:</span> whoami — print effective user profile and architectural role.</div>
                <div><span className="text-white font-semibold">IDENTITY:</span> Ashish Chanchal, Software Developer & AI Systems Engineer (Noida/Delhi).</div>
              </div>
            ),
          });
        } else {
          newHistory.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: `No manual entry for ${manTarget}. Try "man neofetch", "man projects", "man skills", or "man whoami".`,
          });
        }
        break;

      case 'top':
      case 'htop':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="font-mono text-xs space-y-1 text-zinc-300">
              <div className="text-cyan-400 font-bold">Processes: 342 total, 2 running, 340 sleeping, 1294 threads</div>
              <div>Load Avg: 1.42, 1.25, 0.98 · CPU usage: 4.8% user, 2.1% sys, 93.1% idle</div>
              <div>PhysMem: 18.4GB used, 45.6GB free · Disk: 580GB / 2TB used</div>
              <div className="text-white font-bold pt-1 border-b border-white/10 pb-0.5">PID    COMMAND      %CPU   TIME     MEM    USER</div>
              <div className="text-emerald-400">1024   todoai_agent  4.2   12:40.1  210M   ashish</div>
              <div className="text-blue-400">2048   sociantra_ai  3.1   08:15.4  340M   ashish</div>
              <div>4096   zsh           0.4   00:02.1  18M    ashish</div>
              <div>8192   window_mgr    1.2   04:32.0  145M   ashish</div>
            </div>
          ),
        });
        break;

      case 'uptime':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: '23:19  up 14 days,  6:42, 2 users, load averages: 1.42 1.25 0.98',
        });
        break;

      case 'echo':
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: args || '',
        });
        break;

      case 'pwd':
        newHistory.push({ id: `out-${Date.now()}`, type: 'output', content: '/Users/ashish' });
        break;

      case 'uname':
        newHistory.push({ id: `out-${Date.now()}`, type: 'output', content: 'Darwin Ashishs-MacBook-Pro.local 24.1.0 Darwin Kernel Version 24.1.0: Apple M3 Max' });
        break;

      case 'date':
        newHistory.push({ id: `out-${Date.now()}`, type: 'output', content: new Date().toString() });
        break;

      default:
        newHistory.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `zsh: command not found: ${cmd}. Type "help" for a list of valid commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const current = input.toLowerCase().trim();
      const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(current));
      if (match) {
        setInput(match);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[nextIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= cmdHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(nextIndex);
          setInput(cmdHistory[nextIndex] || '');
        }
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-full bg-[#121218]/95 p-4 font-mono text-xs text-white overflow-y-auto macos-scroll flex flex-col select-text"
    >
      {/* Output Buffer */}
      <div className="space-y-1.5 flex-1">
        {history.map((line) => (
          <div key={line.id}>
            {line.type === 'input' ? (
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">ashish@MacBook-Pro</span>
                <span className="text-cyan-400">~ %</span>
                <span className="text-white">{line.content}</span>
              </div>
            ) : line.type === 'system' ? (
              <div className="text-zinc-500">{line.content}</div>
            ) : (
              <div className="text-zinc-300 ml-2">{line.content}</div>
            )}
          </div>
        ))}

        {/* Active Input Line */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-bold">ashish@MacBook-Pro</span>
          <span className="text-cyan-400">~ %</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white focus:outline-none font-mono"
            autoFocus
          />
        </form>

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default MacTerminalApp;
