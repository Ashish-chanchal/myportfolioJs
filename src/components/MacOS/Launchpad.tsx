import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { MACOS_ICONS } from './icons';

interface LaunchpadProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: string) => void;
}

export const Launchpad: React.FC<LaunchpadProps> = ({ isOpen, onClose, onOpenApp }) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const APPS = [
    { id: 'finder', name: 'Finder', icon: MACOS_ICONS.finder },
    { id: 'safari', name: 'Safari', icon: MACOS_ICONS.safari },
    { id: 'messages', name: 'Messages', icon: MACOS_ICONS.messages },
    { id: 'mail', name: 'Mail', icon: MACOS_ICONS.mail },
    { id: 'maps', name: 'Maps', icon: MACOS_ICONS.maps },
    { id: 'photos', name: 'Photos', icon: MACOS_ICONS.photos },
    { id: 'photobooth', name: 'Photo Booth', icon: MACOS_ICONS.facetime },
    { id: 'calendar', name: 'Calendar', icon: MACOS_ICONS.calendar },
    { id: 'notes', name: 'Notes', icon: MACOS_ICONS.notes },
    { id: 'music', name: 'Music', icon: MACOS_ICONS.music },
    { id: 'podcasts', name: 'Podcasts', icon: MACOS_ICONS.podcasts },
    { id: 'appstore', name: 'App Store', icon: MACOS_ICONS.appstore },
    { id: 'settings', name: 'System Settings', icon: MACOS_ICONS.settings },
    { id: 'terminal', name: 'Terminal', icon: MACOS_ICONS.terminal },
    { id: 'vscode', name: 'VS Code', icon: MACOS_ICONS.vscode },
    { id: 'calculator', name: 'Calculator', icon: MACOS_ICONS.calculator },
  ];

  const filteredApps = APPS.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div
      className="fixed inset-0 z-[450] bg-black/60 backdrop-blur-3xl flex flex-col items-center justify-between py-12 px-6 select-none animate-macos-scale-in text-white"
      onClick={onClose}
    >
      {/* Top Search Bar */}
      <div
        className="relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-xs pointer-events-none" />
        <input
          type="text"
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Launchpad"
          className="w-full pl-9 pr-8 py-1.5 rounded-full bg-white/20 hover:bg-white/25 focus:bg-white/30 border border-white/20 text-white placeholder-white/50 text-xs focus:outline-none backdrop-blur-md transition-all text-center"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
          >
            <FaTimes className="text-xs" />
          </button>
        )}
      </div>

      {/* Grid of Apps */}
      <div
        className="w-full max-w-4xl grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-8 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {filteredApps.map((app) => (
          <button
            key={app.id}
            onClick={() => {
              onOpenApp(app.id);
              onClose();
            }}
            className="flex flex-col items-center gap-2 group p-2 rounded-2xl hover:bg-white/10 transition-all transform hover:scale-105 active:scale-95"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 relative">
              <img
                src={app.icon}
                alt={app.name}
                className="w-full h-full object-contain filter drop-shadow-xl transition-transform group-hover:scale-105"
              />
            </div>
            <span className="text-xs font-medium text-white/90 text-center tracking-tight truncate max-w-[80px] drop-shadow">
              {app.name}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom Page Dots */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-white shadow-md" />
        <span className="w-2 h-2 rounded-full bg-white/30" />
      </div>
    </div>
  );
};

export default Launchpad;
