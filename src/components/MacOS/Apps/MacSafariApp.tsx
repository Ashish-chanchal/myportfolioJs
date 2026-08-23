import React, { useState } from 'react';
import {
  FaLock,
  FaRedo,
  FaShieldAlt,
  FaShare,
  FaPlus,
  FaTimes,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaArrowRight,
  FaBookOpen,
} from 'react-icons/fa';
import { MACOS_ICONS } from '../icons';

interface SafariTab {
  id: string;
  title: string;
  url: string;
}

interface MacSafariAppProps {
  initialUrl?: string;
}

export const MacSafariApp: React.FC<MacSafariAppProps> = ({ initialUrl }) => {
  const [tabs, setTabs] = useState<SafariTab[]>([
    {
      id: 'tab-1',
      title: 'Sociantra — AI Community Engine',
      url: initialUrl || 'https://sociantra.ashishchanchal.in/',
    },
    {
      id: 'tab-2',
      title: 'TODOAI — Task Intelligence Platform',
      url: 'https://todoai.ashishchanchal.in/',
    },
  ]);

  const [activeTabId, setActiveTabId] = useState<string>('tab-1');
  const [urlInput, setUrlInput] = useState<string>(initialUrl || 'https://sociantra.ashishchanchal.in/');

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handleSelectTab = (tab: SafariTab) => {
    setActiveTabId(tab.id);
    setUrlInput(tab.url);
  };

  const handleCloseTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const next = tabs.filter((t) => t.id !== id);
    setTabs(next);
    if (activeTabId === id) {
      setActiveTabId(next[0].id);
      setUrlInput(next[0].url);
    }
  };

  const handleAddTab = () => {
    const newTab: SafariTab = {
      id: `tab-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      title: 'Apple Start Page',
      url: 'https://ashishchanchal.in',
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    setUrlInput(newTab.url);
  };

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let formatted = urlInput.trim();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = `https://${formatted}`;
    }
    setTabs(tabs.map((t) => (t.id === activeTabId ? { ...t, url: formatted, title: formatted.replace(/^https?:\/\//, '') } : t)));
  };

  const FAVORITES = [
    { title: 'Sociantra', url: 'https://sociantra.ashishchanchal.in/' },
    { title: 'TODOAI', url: 'https://todoai.ashishchanchal.in/' },
    { title: 'VibePulse', url: 'https://vibepluse.ashishchanchal.in/' },
    { title: 'CineVerse', url: 'https://cineverse.ashishchanchal.in/' },
    { title: 'GitHub', url: 'https://github.com/ashish-chanchal' },
    { title: 'LinkedIn', url: 'https://www.linkedin.com/in/ashishchanchal/' },
  ];

  return (
    <div className="h-full flex flex-col bg-[#1e1e24] text-white select-none">
      {/* Top Safari Header & Tab Strip */}
      <div className="bg-[#282832] border-b border-white/10 px-3 pt-2 flex flex-col gap-2">
        {/* Navigation & URL Bar */}
        <div className="flex items-center gap-3">
          {/* Back/Forward buttons */}
          <div className="flex items-center gap-1 text-zinc-400">
            <button className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-all">
              <FaArrowLeft className="w-3 h-3" />
            </button>
            <button className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-all">
              <FaArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Unified Address Search Bar */}
          <form onSubmit={handleNavigate} className="flex-1 max-w-2xl mx-auto relative">
            <div className="flex items-center bg-black/40 hover:bg-black/50 border border-white/15 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl px-3 py-1.5 text-xs transition-all shadow-inner">
              <FaLock className="text-emerald-400 mr-2 text-[10px]" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full bg-transparent text-white focus:outline-none text-center font-mono text-xs"
              />
              <button type="button" onClick={handleNavigate} className="text-zinc-400 hover:text-white ml-2">
                <FaRedo className="text-[10px]" />
              </button>
            </div>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 text-zinc-400">
            <button className="p-1.5 rounded hover:bg-white/10 hover:text-white" title="Privacy Report">
              <FaShieldAlt className="w-3 h-3 text-cyan-400" />
            </button>
            <button className="p-1.5 rounded hover:bg-white/10 hover:text-white" title="Share">
              <FaShare className="w-3 h-3" />
            </button>
            <button onClick={handleAddTab} className="p-1.5 rounded hover:bg-white/10 hover:text-white" title="New Tab">
              <FaPlus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto macos-scroll">
          {tabs.map((tab) => {
            const isSelected = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                onClick={() => handleSelectTab(tab)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs cursor-pointer transition-all border-t border-x border-transparent max-w-[200px] min-w-[120px] ${
                  isSelected
                    ? 'bg-[#1e1e24] text-white border-white/10 shadow-sm font-semibold'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                }`}
              >
                <img src={MACOS_ICONS.safari} alt="Safari" className="w-3.5 h-3.5 object-contain flex-shrink-0" />
                <span className="truncate flex-1">{tab.title}</span>
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => handleCloseTab(tab.id, e)}
                    className="p-0.5 rounded-full hover:bg-white/20 text-zinc-400 hover:text-white"
                  >
                    <FaTimes className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bookmarks Favorites Bar */}
      <div className="h-7 bg-[#1c1c22] border-b border-white/5 px-4 flex items-center gap-4 text-[11px] text-zinc-400 overflow-x-auto macos-scroll">
        <div className="flex items-center gap-1 text-zinc-500 font-bold uppercase text-[9px]">
          <FaBookOpen />
          <span>Favorites</span>
        </div>
        {FAVORITES.map((fav) => (
          <button
            key={fav.title}
            onClick={() => {
              setUrlInput(fav.url);
              setTabs(tabs.map((t) => (t.id === activeTabId ? { ...t, url: fav.url, title: fav.title } : t)));
            }}
            className="hover:text-white transition-colors truncate"
          >
            {fav.title}
          </button>
        ))}
      </div>

      {/* Main Browser Viewport */}
      <div className="flex-1 relative bg-slate-950 flex flex-col">
        {/* Render interactive iframe with live launcher */}
        {activeTab.url.startsWith('http') ? (
          <div className="h-full flex flex-col">
            {/* Live Webapp Preview Card */}
            <div className="bg-slate-900 border-b border-white/10 px-4 py-2 flex items-center justify-between text-xs flex-shrink-0">
              <div className="flex items-center gap-2 truncate mr-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="font-semibold text-white truncate">Safari // Live Web Sandbox</span>
                <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline truncate">{activeTab.url}</span>
              </div>
              <a
                href={activeTab.url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-md flex-shrink-0"
              >
                <span>Open in Tab</span>
                <FaExternalLinkAlt className="w-2.5 h-2.5" />
              </a>
            </div>

            <iframe
              src={activeTab.url}
              title={activeTab.title}
              className="flex-1 w-full h-full border-none bg-black"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-slate-950 via-zinc-900 to-black">
            <div className="w-20 h-20 rounded-3xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-4 shadow-2xl">
              <img src={MACOS_ICONS.safari} alt="Safari" className="w-12 h-12 object-contain drop-shadow" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{activeTab.title}</h3>
            <p className="text-xs text-zinc-400 max-w-md font-mono mb-6 truncate">{activeTab.url}</p>

            <a
              href={activeTab.url}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <span>Open External URL in Safari</span>
              <FaExternalLinkAlt />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MacSafariApp;
