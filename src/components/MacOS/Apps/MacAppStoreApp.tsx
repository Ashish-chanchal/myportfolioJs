import React, { useState } from 'react';
import { FaStar, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import { MACOS_ICONS } from '../icons';

interface MacAppStoreAppProps {
  onOpenInSafari?: (url: string) => void;
}

export const MacAppStoreApp: React.FC<MacAppStoreAppProps> = ({ onOpenInSafari }) => {
  const [activeTab, setActiveTab] = useState<'Discover' | 'Create' | 'Work' | 'Play' | 'Develop'>('Discover');
  const [search, setSearch] = useState('');

  const APPS = [
    {
      id: 'sociantra',
      name: 'Sociantra AI',
      subtitle: 'Next-Gen AI Social Network & Community Engine',
      category: 'Social & AI',
      rating: 4.9,
      reviews: '2.4K',
      url: 'https://sociantra.ashishchanchal.in/',
      tags: ['React 19', 'TypeScript', 'Node.js', 'WebSocket'],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'todoai',
      name: 'TODOAI Pro',
      subtitle: 'Autonomous Priority Matrix & Goal Scheduling',
      category: 'Productivity',
      rating: 4.8,
      reviews: '1.8K',
      url: 'https://todoai.ashishchanchal.in/',
      tags: ['Vite', 'React', 'Local AI Agents', 'TailwindCSS'],
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'vibepulse',
      name: 'VibePulse Studio',
      subtitle: 'Real-time Audio Stream & Dynamic Emotion Engine',
      category: 'Music & Audio',
      rating: 5.0,
      reviews: '920',
      url: 'https://vibepluse.ashishchanchal.in/',
      tags: ['Web Audio API', 'Canvas Visualizer', 'WebRTC'],
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'cineverse',
      name: 'CineVerse Max',
      subtitle: 'AI-Powered Cinema Streaming & Curation Platform',
      category: 'Entertainment',
      rating: 4.9,
      reviews: '3.1K',
      url: 'https://cineverse.ashishchanchal.in/',
      tags: ['TMDB API', 'React', 'Video Stream HLS'],
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop',
    },
  ];

  const handleLaunch = (url: string) => {
    if (onOpenInSafari) {
      onOpenInSafari(url);
    } else {
      window.open(url, '_blank');
    }
  };

  const filtered = APPS.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex bg-[#181820] text-white select-none">
      {/* Left App Store Navigation */}
      <div className="w-52 bg-[#14141a]/95 border-r border-white/10 p-3 flex flex-col justify-between text-xs">
        <div className="space-y-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Apps"
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-white text-xs focus:outline-none placeholder-zinc-500"
            />
          </div>

          <div className="space-y-0.5">
            {(['Discover', 'Create', 'Work', 'Play', 'Develop'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-all text-xs font-semibold ${
                    isActive ? 'bg-blue-600 text-white' : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <img src={MACOS_ICONS.appstore} alt="Store" className="w-4 h-4 object-contain" />
                  <span>{tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-2 bg-white/5 rounded-xl border border-white/5 text-[10px] text-zinc-400">
          <div className="font-bold text-white mb-0.5">Ashish Developer Account</div>
          <div>All applications built and verified for macOS Sequoia.</div>
        </div>
      </div>

      {/* Right Main Store Showcase */}
      <div className="flex-1 p-6 overflow-y-auto macos-scroll bg-[#1c1c24] space-y-6">
        {/* Featured Hero Banner */}
        <div className="relative h-56 rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col justify-end p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950">
          <div className="relative z-10 max-w-lg">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider px-2 py-0.5 bg-cyan-500/20 rounded-full border border-cyan-500/30">
              FEATURED APPLICATION OF THE DAY
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">Sociantra — AI Community & Social Engine</h2>
            <p className="text-xs text-zinc-200 mt-1">
              Engineered with React 19, TypeScript, and live WebSocket clustering for real-time collaboration.
            </p>
            <button
              onClick={() => handleLaunch('https://sociantra.ashishchanchal.in/')}
              className="mt-3 px-4 py-1.5 rounded-full bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all shadow-lg flex items-center gap-2"
            >
              <span>GET / LAUNCH APP</span>
              <FaExternalLinkAlt className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* Apps Grid */}
        <div>
          <h3 className="text-base font-bold mb-4">Engineering Suite & Flagship Projects</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className="w-16 h-16 rounded-2xl bg-cover bg-center border border-white/15 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform"
                    style={{ backgroundImage: `url(${app.image})` }}
                  />

                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-white truncate">{app.name}</h4>
                    <p className="text-[11px] text-zinc-400 truncate">{app.subtitle}</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-400">
                      <div className="flex items-center text-amber-400">
                        <FaStar className="w-2.5 h-2.5" />
                        <span className="ml-1 font-bold">{app.rating}</span>
                      </div>
                      <span>({app.reviews})</span>
                      <span className="text-zinc-500">·</span>
                      <span className="text-cyan-400 font-mono">{app.category}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleLaunch(app.url)}
                  className="px-4 py-1.5 rounded-full bg-white/15 hover:bg-blue-600 text-white font-bold text-xs transition-all shadow flex items-center gap-1.5 flex-shrink-0"
                >
                  <span>GET</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacAppStoreApp;
