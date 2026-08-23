import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaAppStore, FaCode, FaFileAlt, FaCalculator, FaArrowRight, FaTimes } from 'react-icons/fa';
import { MACOS_ICONS } from './icons';

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: string) => void;
}

interface SearchItem {
  id: string;
  title: string;
  category: 'Applications' | 'Projects' | 'Skills' | 'Documents' | 'Calculation';
  subtitle: string;
  icon?: string;
  action: () => void;
}

export const Spotlight: React.FC<SpotlightProps> = ({ isOpen, onClose, onOpenApp }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Try math evaluation
  let mathResult: string | null = null;
  if (/^[0-9+\-*/().^ %]+$/.test(query.trim()) && /[0-9]/.test(query)) {
    try {
      // Safe simple arithmetic evaluator
      // eslint-disable-next-line no-eval
      const res = Function(`'use strict'; return (${query})`)();
      if (typeof res === 'number' && !isNaN(res)) {
        mathResult = res.toLocaleString();
      }
    } catch {}
  }

  const BASE_ITEMS: SearchItem[] = [
    // Applications
    {
      id: 'finder',
      title: 'Finder',
      category: 'Applications',
      subtitle: 'macOS File System & Projects',
      icon: MACOS_ICONS.finder,
      action: () => {
        onOpenApp('finder');
        onClose();
      },
    },
    {
      id: 'safari',
      title: 'Safari',
      category: 'Applications',
      subtitle: 'Apple Web Browser & Portfolio Showcase',
      icon: MACOS_ICONS.safari,
      action: () => {
        onOpenApp('safari');
        onClose();
      },
    },
    {
      id: 'vscode',
      title: 'Visual Studio Code',
      category: 'Applications',
      subtitle: 'Code Editor & Engineering Workspaces',
      icon: MACOS_ICONS.vscode,
      action: () => {
        onOpenApp('vscode');
        onClose();
      },
    },
    {
      id: 'terminal',
      title: 'Terminal',
      category: 'Applications',
      subtitle: 'zsh — Ashish MacBook Pro',
      icon: MACOS_ICONS.terminal,
      action: () => {
        onOpenApp('terminal');
        onClose();
      },
    },
    {
      id: 'notes',
      title: 'Notes',
      category: 'Applications',
      subtitle: 'Architectural Philosophy & Insights',
      icon: MACOS_ICONS.notes,
      action: () => {
        onOpenApp('notes');
        onClose();
      },
    },
    {
      id: 'messages',
      title: 'Messages',
      category: 'Applications',
      subtitle: 'Chat & Connect with Ashish Chanchal',
      icon: MACOS_ICONS.messages,
      action: () => {
        onOpenApp('messages');
        onClose();
      },
    },
    {
      id: 'appstore',
      title: 'App Store',
      category: 'Applications',
      subtitle: 'Ashish Software Hub & AI Models',
      icon: MACOS_ICONS.appstore,
      action: () => {
        onOpenApp('appstore');
        onClose();
      },
    },
    {
      id: 'settings',
      title: 'System Settings',
      category: 'Applications',
      subtitle: 'Wallpapers, Appearance, Displays',
      icon: MACOS_ICONS.settings,
      action: () => {
        onOpenApp('settings');
        onClose();
      },
    },
    {
      id: 'calculator',
      title: 'Calculator',
      category: 'Applications',
      subtitle: 'Scientific & Basic Math',
      icon: MACOS_ICONS.calculator,
      action: () => {
        onOpenApp('calculator');
        onClose();
      },
    },
    {
      id: 'music',
      title: 'Music',
      category: 'Applications',
      subtitle: 'Ambient Coding Soundtracks',
      icon: MACOS_ICONS.music,
      action: () => {
        onOpenApp('music');
        onClose();
      },
    },
    {
      id: 'photos',
      title: 'Photos',
      category: 'Applications',
      subtitle: 'Project Gallery & System Architecture',
      icon: MACOS_ICONS.photos,
      action: () => {
        onOpenApp('photos');
        onClose();
      },
    },
    {
      id: 'photobooth',
      title: 'Photo Booth',
      category: 'Applications',
      subtitle: 'Camera Vision & Studio Filters',
      icon: MACOS_ICONS.facetime,
      action: () => {
        onOpenApp('photobooth');
        onClose();
      },
    },

    // Projects
    {
      id: 'sociantra',
      title: 'Sociantra AI Platform',
      category: 'Projects',
      subtitle: 'Next-Gen Social Network & AI Community Engine',
      action: () => {
        onOpenApp('safari');
        onClose();
      },
    },
    {
      id: 'todoai',
      title: 'TODOAI Task Intelligence',
      category: 'Projects',
      subtitle: 'Autonomous Priority Matrix & Goal Scheduling',
      action: () => {
        onOpenApp('safari');
        onClose();
      },
    },
    {
      id: 'vibepulse',
      title: 'VibePulse Realtime Audio',
      category: 'Projects',
      subtitle: 'Emotion Detection & Audio Streaming Hub',
      action: () => {
        onOpenApp('safari');
        onClose();
      },
    },
    {
      id: 'cineverse',
      title: 'CineVerse Streaming',
      category: 'Projects',
      subtitle: 'AI-Curated Movie & Entertainment Platform',
      action: () => {
        onOpenApp('safari');
        onClose();
      },
    },

    // Skills
    {
      id: 'react-ts',
      title: 'React 19 & TypeScript',
      category: 'Skills',
      subtitle: 'Advanced hooks, architectural patterns & state management',
      action: () => {
        onOpenApp('finder');
        onClose();
      },
    },
    {
      id: 'ai-agents',
      title: 'AI Agent Orchestration & LLMs',
      category: 'Skills',
      subtitle: 'MCP servers, LangChain, autonomous workflows',
      action: () => {
        onOpenApp('terminal');
        onClose();
      },
    },
    {
      id: 'fullstack-cloud',
      title: 'Node.js, Python & Cloud DevOps',
      category: 'Skills',
      subtitle: 'Docker, AWS, GCP, CI/CD pipelines',
      action: () => {
        onOpenApp('terminal');
        onClose();
      },
    },

    // Documents
    {
      id: 'resume',
      title: 'Ashish_Chanchal_Resume.pdf',
      category: 'Documents',
      subtitle: 'Curriculum Vitae — Full-Stack & AI Engineer',
      action: () => {
        window.open('https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link', '_blank');
        onClose();
      },
    },
  ];

  let filteredItems = query.trim()
    ? BASE_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : BASE_ITEMS.slice(0, 7);

  if (mathResult) {
    filteredItems = [
      {
        id: 'math',
        title: `= ${mathResult}`,
        category: 'Calculation',
        subtitle: `Calculation result for "${query}"`,
        action: () => {},
      },
      ...filteredItems,
    ];
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[400] flex items-start justify-center pt-24 bg-black/40 backdrop-blur-sm select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#1e1e24]/90 border border-white/20 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-3xl text-white animate-macos-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <FaSearch className="text-zinc-400 text-lg flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Spotlight Search — Type app, project, skill, or math..."
            className="w-full bg-transparent text-lg text-white placeholder-zinc-400 focus:outline-none font-sans"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-zinc-400 hover:text-white">
              <FaTimes />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto macos-scroll p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-zinc-400 text-xs font-mono">
              No results found for "{query}"
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all ${
                    isSelected ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {item.icon ? (
                      <img src={item.icon} alt={item.title} className="w-7 h-7 object-contain flex-shrink-0" />
                    ) : item.category === 'Calculation' ? (
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                        <FaCalculator className="w-3.5 h-3.5" />
                      </div>
                    ) : item.category === 'Projects' ? (
                      <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                        <FaAppStore className="w-3.5 h-3.5" />
                      </div>
                    ) : item.category === 'Skills' ? (
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                        <FaCode className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                        <FaFileAlt className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="font-semibold text-xs truncate">{item.title}</div>
                      <div
                        className={`text-[10px] truncate ${
                          isSelected ? 'text-blue-100' : 'text-zinc-400'
                        }`}
                      >
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-mono ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-zinc-400'
                      }`}
                    >
                      {item.category}
                    </span>
                    {isSelected && <FaArrowRight className="w-2.5 h-2.5" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
          <div className="flex items-center gap-3">
            <span>[↑/↓] Navigate</span>
            <span>[↵] Open</span>
            <span>[Esc] Close</span>
          </div>
          <span>macOS Sequoia Spotlight</span>
        </div>
      </div>
    </div>
  );
};

export default Spotlight;
