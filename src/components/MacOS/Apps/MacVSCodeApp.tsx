import React, { useState } from 'react';
import { FaFileCode, FaFolder, FaPlay, FaTerminal, FaCheck } from 'react-icons/fa';

interface CodeFile {
  id: string;
  name: string;
  language: string;
  code: string;
}

export const MacVSCodeApp: React.FC = () => {
  const [files, setFiles] = useState<CodeFile[]>([
    {
      id: 'file-1',
      name: 'AgentEngine.ts',
      language: 'typescript',
      code: `// Ashish Chanchal — Autonomous Agent Architecture
import { ModelContextProtocol, SwarmRouter } from '@ashish/agent-core';

export interface AgentTask {
  id: string;
  intent: 'build' | 'refactor' | 'optimize';
  payload: Record<string, unknown>;
}

export class AutonomousDevAgent {
  private router = new SwarmRouter({ maxConcurrency: 8 });

  async executeTask(task: AgentTask): Promise<void> {
    console.log(\`[AGENT LOG] Initiating \${task.intent} workflow...\`);
    await this.router.converge(task);
    console.log('[AGENT LOG] Task resolved with 0 lint errors.');
  }
}

// Instantiate and boot
const agent = new AutonomousDevAgent();
agent.executeTask({ id: 'task-001', intent: 'build', payload: {} });`,
    },
    {
      id: 'file-2',
      name: 'PortfolioHero.tsx',
      language: 'typescript',
      code: `import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
        Ashish Chanchal
      </h1>
      <p className="text-xl text-zinc-400 mt-4">
        Full-Stack Engineer & AI Systems Architect
      </p>
    </section>
  );
};`,
    },
    {
      id: 'file-3',
      name: 'portfolio.json',
      language: 'json',
      code: `{
  "developer": "Ashish Chanchal",
  "title": "Software Engineer & AI Architect",
  "location": "Noida, India",
  "projects": [
    "Sociantra",
    "TODOAI",
    "VibePulse",
    "CineVerse"
  ],
  "verifiedStatus": true
}`,
    },
  ]);

  const [activeFileId, setActiveFileId] = useState<string>(files[0].id);
  const [terminalOutput, setTerminalOutput] = useState<string[]>(['[Terminal Ready] Press "Run Code" or Cmd+Enter to execute.']);
  const [isSaved, setIsSaved] = useState(false);

  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  const handleRun = () => {
    setTerminalOutput((prev) => [
      ...prev,
      `$ ts-node ${activeFile.name}`,
      `[INFO] Compiling ${activeFile.name} with target ESNext...`,
      `[SUCCESS] Output generated successfully in 14ms.`,
      `> All agent routines converged without runtime exceptions.`,
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const updated = activeFile.code.substring(0, start) + '  ' + activeFile.code.substring(end);
      setFiles(files.map((f) => (f.id === activeFileId ? { ...f, code: updated } : f)));
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    } else if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 1500);
    } else if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRun();
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e24] text-white select-none">
      {/* VS Code Top Bar */}
      <div className="h-9 bg-[#252530] border-b border-white/10 px-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <FaFileCode className="text-blue-400" />
          <span className="font-semibold text-zinc-300">VS Code — {activeFile.name}</span>
        </div>

        <div className="flex items-center gap-2">
          {isSaved && (
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
              <FaCheck /> Saved
            </span>
          )}
          <button
            onClick={handleRun}
            className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 shadow transition-all"
            title="Run Code (Cmd + Enter)"
          >
            <FaPlay className="w-2.5 h-2.5" />
            <span>Run Code</span>
          </button>
        </div>
      </div>

      {/* Main VS Code Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Explorer Sidebar */}
        <div className="w-48 bg-[#181820] border-r border-white/10 p-2 flex flex-col justify-between text-xs">
          <div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2 py-1 flex items-center gap-1">
              <FaFolder className="text-yellow-500" />
              <span>EXPLORER</span>
            </div>

            <div className="space-y-0.5 mt-1">
              {files.map((file) => {
                const isActive = file.id === activeFileId;
                return (
                  <button
                    key={file.id}
                    onClick={() => setActiveFileId(file.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-all font-mono text-xs ${
                      isActive ? 'bg-blue-600/30 text-white font-semibold border border-blue-500/40' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <FaFileCode className={file.name.endsWith('.json') ? 'text-amber-400' : 'text-cyan-400'} />
                    <span className="truncate">{file.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-2 text-[10px] text-zinc-500 font-mono border-t border-white/5">
            Node v22.12.0 · macOS
          </div>
        </div>

        {/* Center Editor & Terminal */}
        <div className="flex-1 flex flex-col bg-[#1e1e26]">
          {/* Editor Tabs */}
          <div className="h-8 bg-[#181820] border-b border-white/10 flex items-center px-2 gap-1">
            {files.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFileId(f.id)}
                className={`px-3 py-1 text-xs font-mono rounded-t flex items-center gap-2 border-t-2 ${
                  f.id === activeFileId
                    ? 'bg-[#1e1e26] text-white border-blue-500 font-semibold'
                    : 'text-zinc-500 border-transparent hover:text-zinc-300'
                }`}
              >
                <span>{f.name}</span>
              </button>
            ))}
          </div>

          {/* Code Textarea with Line Numbers */}
          <div className="flex-1 flex overflow-hidden">
            <div className="w-10 bg-[#16161e] border-r border-white/5 py-4 font-mono text-xs text-zinc-600 text-right pr-2 select-none">
              {activeFile.code.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <textarea
              value={activeFile.code}
              onChange={(e) => {
                const val = e.target.value;
                setFiles(files.map((f) => (f.id === activeFileId ? { ...f, code: val } : f)));
              }}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              className="flex-1 bg-[#1e1e26] text-zinc-200 p-4 font-mono text-xs focus:outline-none resize-none leading-relaxed select-text macos-scroll"
            />
          </div>

          {/* Integrated Output Terminal */}
          <div className="h-28 bg-[#14141a] border-t border-white/10 p-2 font-mono text-[11px] overflow-y-auto macos-scroll text-zinc-300">
            <div className="flex items-center gap-2 text-zinc-500 pb-1 border-b border-white/5 mb-1 text-[10px]">
              <FaTerminal />
              <span>TERMINAL // DEBUG CONSOLE</span>
            </div>
            {terminalOutput.map((out, idx) => (
              <div key={idx} className="leading-tight">{out}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacVSCodeApp;
