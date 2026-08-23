import React, { useState } from 'react';
import { FaDownload, FaStar, FaSearch } from 'react-icons/fa';
import { WIN11_ICONS } from '../icons';

interface StoreAppProps {
  onOpenApp: (appId: string) => void;
  onOpenInEdge?: (url: string) => void;
}

export const StoreApp: React.FC<StoreAppProps> = ({ onOpenApp, onOpenInEdge }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'apps' | 'games' | 'ai'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const STORE_ITEMS = [
    {
      id: 'sociantra',
      title: 'Sociantra Conversational AI',
      category: 'ai',
      author: 'Ashish Chanchal',
      rating: 4.9,
      downloads: '10K+',
      desc: 'Real-time bidirectional AI voice platform with sub-3s response turnaround.',
      icon: WIN11_ICONS.copilot,
      action: () => {
        if (onOpenInEdge) onOpenInEdge('https://sociantra.ashishchanchal.in/');
        else onOpenApp('edge');
      },
    },
    {
      id: 'todoai',
      title: 'TODOAI Agent System',
      category: 'ai',
      author: 'Ashish Chanchal',
      rating: 4.8,
      downloads: '5K+',
      desc: 'Model Context Protocol task orchestrator with automated breakdowns and real-time cron.',
      icon: WIN11_ICONS.vscode,
      action: () => onOpenApp('vscode'),
    },
    {
      id: 'vibepulse',
      title: 'VibePulse 3D Sound Visualizer',
      category: 'apps',
      author: 'Ashish Chanchal',
      rating: 4.9,
      downloads: '8K+',
      desc: 'Three.js & WebGL cyberpunk reactive audio engine with real-time waveform displacement.',
      icon: WIN11_ICONS.spotify,
      action: () => onOpenApp('spotify'),
    },
    {
      id: 'photos',
      title: 'Photos & Visuals Gallery',
      category: 'apps',
      author: 'Ashish Chanchal',
      rating: 4.7,
      downloads: '15K+',
      desc: 'High-definition showcase of architecture diagrams, project previews, and research milestones.',
      icon: WIN11_ICONS.photos,
      action: () => onOpenApp('photos'),
    },
    {
      id: 'terminal',
      title: 'PowerShell Dev Edition',
      category: 'apps',
      author: 'Microsoft / Ashish',
      rating: 5.0,
      downloads: '50K+',
      desc: 'GPU-accelerated terminal with telemetry inspection, neofetch, and project manifests.',
      icon: WIN11_ICONS.terminal,
      action: () => onOpenApp('terminal'),
    },
  ];

  const filtered = STORE_ITEMS.filter(
    (item) =>
      (activeCategory === 'all' || item.category === activeCategory) &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-[#1b1b1f] text-white select-none">
      {/* Store Header */}
      <div className="p-4 bg-[#141418] border-b border-white/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={WIN11_ICONS.store} alt="Store" className="w-6 h-6 object-contain" />
          <h2 className="font-bold text-sm">Microsoft Store // Developer App Hub</h2>
        </div>

        {/* Search */}
        <div className="relative w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs" />
          <input
            type="text"
            placeholder="Search apps, games, AI models..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#202026] border border-white/10 rounded-full pl-8 pr-3 py-1 text-xs text-white outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Categories Bar */}
      <div className="px-4 py-2 bg-[#18181c] border-b border-white/5 flex items-center gap-2 text-xs">
        {(['all', 'ai', 'apps', 'games'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full uppercase tracking-wider text-[10px] font-bold transition-all ${
              activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            {cat === 'all' ? 'Featured' : cat}
          </button>
        ))}
      </div>

      {/* Main Apps Grid */}
      <div className="flex-1 p-4 overflow-y-auto win11-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((app) => (
          <div
            key={app.id}
            className="p-3 bg-[#202026] hover:bg-[#282830] border border-white/5 hover:border-blue-500/40 rounded-xl transition-all flex flex-col justify-between group shadow-lg"
          >
            <div className="flex items-start gap-3">
              <img src={app.icon} alt={app.title} className="w-12 h-12 object-contain rounded-lg p-1 bg-black/30" />
              <div className="flex-1">
                <h3 className="font-bold text-xs text-white group-hover:text-blue-400 transition-colors">
                  {app.title}
                </h3>
                <div className="text-[10px] text-zinc-400">{app.author}</div>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-amber-400">
                  <span className="flex items-center gap-0.5 font-bold">
                    <FaStar className="w-2.5 h-2.5" />
                    {app.rating}
                  </span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-400">{app.downloads}</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-zinc-300 mt-2 line-clamp-2 leading-relaxed">
              {app.desc}
            </p>

            <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-emerald-400 font-mono font-bold">FREE</span>
              <button
                onClick={app.action}
                className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all"
              >
                <FaDownload className="w-2.5 h-2.5" />
                <span>Get / Open</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreApp;
