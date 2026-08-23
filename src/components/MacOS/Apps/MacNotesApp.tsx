import React, { useState } from 'react';
import { FaFolder, FaPlus, FaTrash, FaSearch } from 'react-icons/fa';

interface NoteItem {
  id: string;
  title: string;
  date: string;
  snippet: string;
  folder: string;
  content: string;
}

export const MacNotesApp: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState('All iCloud');
  const [search, setSearch] = useState('');

  const [notes, setNotes] = useState<NoteItem[]>([
    {
      id: 'note-1',
      title: 'Architectural Philosophy & System Design',
      date: 'Today, 10:30 AM',
      snippet: 'Core tenets for designing high-throughput, fault-tolerant applications...',
      folder: 'Engineering',
      content: `## Architectural Philosophy & System Design
*Ashish Chanchal — Systems Architect*

1. **Simplicity First**: Complex problems demand minimal abstractions. Clean state reconciliation beats over-engineered middleware.
2. **Zero Placeholders**: Every visual component must carry real interactivity, verifiable state, and full keyboard accessibility.
3. **Resilience & Fault Tolerance**: Gracefully degrade across offline networks, media hardware failures, and high concurrency events.`,
    },
    {
      id: 'note-2',
      title: 'AI Agent Swarms & Autonomous Workflows',
      date: 'Aug 21, 2026',
      snippet: 'Patterns for orchestrating multi-agent LLM systems with tool schemas...',
      folder: 'AI Research',
      content: `## AI Agent Swarms & Autonomous Workflows

- **Model Context Protocol (MCP)**: Decoupling tool evaluation from runtime code execution.
- **Goal-Loop Convergence**: Implementing strict stop conditions, self-correction triggers, and telemetry checkpoints.
- **Multi-Agent Pairs**: Orchestrating specialized review, implementation, and verification subagents.`,
    },
    {
      id: 'note-3',
      title: 'Fullstack Performance & Core Web Vitals',
      date: 'Aug 18, 2026',
      snippet: 'Optimizing LCP, INP, CLS, and asset delivery for high-speed experiences...',
      folder: 'Frontend',
      content: `## Fullstack Performance & Core Web Vitals

- Maintain sub-50ms INP across heavy dynamic web interfaces.
- Utilize CSS backdrop-blur and transform GPU layers efficiently.
- Optimize chunk splitting and code tree-shaking with Vite / Rolldown.`,
    },
    {
      id: 'note-4',
      title: 'Developer Journey & Milestones',
      date: 'Aug 12, 2026',
      snippet: 'From building early fullstack prototypes to leading complex web applications...',
      folder: 'Personal',
      content: `## Developer Journey & Milestones

- Built **Sociantra**, **TODOAI**, **VibePulse**, and **CineVerse**.
- Engineered authentic desktop operating system experiences inside modern web browsers.
- Passionate about high-speed software craftsmanship and futuristic UX.`,
    },
  ]);

  const [activeNoteId, setActiveNoteId] = useState<string>(notes[0].id);

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const handleCreateNote = () => {
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title: 'New Note',
      date: 'Just now',
      snippet: 'Type your note content here...',
      folder: selectedFolder === 'All iCloud' ? 'Notes' : selectedFolder,
      content: '# New Note\n\nWrite your insights here...',
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = (id: string) => {
    if (notes.length === 1) return;
    const next = notes.filter((n) => n.id !== id);
    setNotes(next);
    setActiveNoteId(next[0].id);
  };

  const filteredNotes = notes.filter(
    (n) =>
      (selectedFolder === 'All iCloud' || n.folder === selectedFolder) &&
      (n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="h-full flex bg-[#181820] text-white select-none">
      {/* Column 1: Folders */}
      <div className="w-44 bg-[#14141a]/95 border-r border-white/10 p-3 flex flex-col justify-between text-xs">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2">
            <span>iCloud Folders</span>
          </div>

          <div className="space-y-0.5">
            {['All iCloud', 'Engineering', 'AI Research', 'Frontend', 'Personal'].map((f) => {
              const isActive = selectedFolder === f;
              return (
                <button
                  key={f}
                  onClick={() => setSelectedFolder(f)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-all ${
                    isActive ? 'bg-blue-600 text-white font-semibold' : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <FaFolder className="text-yellow-500 text-xs" />
                  <span className="truncate">{f}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleCreateNote}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-all"
        >
          <FaPlus className="w-3 h-3 text-cyan-400" />
          <span>New Note</span>
        </button>
      </div>

      {/* Column 2: Note Snippets */}
      <div className="w-56 bg-[#1a1a24] border-r border-white/10 flex flex-col">
        {/* Search */}
        <div className="p-2 border-b border-white/10 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-xs pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes"
            className="w-full pl-8 pr-3 py-1 rounded-md bg-white/10 border border-white/10 text-white text-xs focus:outline-none placeholder-zinc-500"
          />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto macos-scroll p-2 space-y-1">
          {filteredNotes.map((n) => {
            const isSelected = n.id === activeNoteId;
            return (
              <div
                key={n.id}
                onClick={() => setActiveNoteId(n.id)}
                className={`p-2.5 rounded-xl cursor-pointer transition-all ${
                  isSelected ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-white/5 text-zinc-300'
                }`}
              >
                <div className="font-bold text-xs truncate">{n.title}</div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-1">
                  <span className="font-mono">{n.date}</span>
                  <span className="truncate flex-1">{n.snippet}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Column 3: Active Note Editor */}
      <div className="flex-1 flex flex-col bg-[#16161e] p-6 overflow-y-auto macos-scroll">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="text-[11px] text-zinc-400 font-mono">{activeNote.date} · {activeNote.folder}</div>
          <button
            onClick={() => handleDeleteNote(activeNote.id)}
            className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-red-400 transition-colors"
            title="Delete Note"
          >
            <FaTrash className="w-3 h-3" />
          </button>
        </div>

        <textarea
          value={activeNote.content}
          onChange={(e) => {
            const val = e.target.value;
            const firstLine = val.split('\n')[0].replace(/^#+\s*/, '') || 'Untitled';
            setNotes(
              notes.map((n) =>
                n.id === activeNoteId
                  ? {
                      ...n,
                      content: val,
                      title: firstLine,
                      snippet: val.slice(0, 50),
                    }
                  : n
              )
            );
          }}
          className="w-full flex-1 bg-transparent text-white focus:outline-none resize-none font-sans text-sm leading-relaxed"
        />
      </div>
    </div>
  );
};

export default MacNotesApp;
