import React, { useState } from 'react';
import {
  FaPalette,
  FaImage,
  FaDesktop,
  FaVolumeUp,
  FaInfoCircle,
  FaCheck,
} from 'react-icons/fa';
import { MACOS_WALLPAPERS } from '../wallpapers';

interface MacSettingsAppProps {
  currentWallpaper: string;
  setWallpaper: (url: string) => void;
}

export const MacSettingsApp: React.FC<MacSettingsAppProps> = ({ currentWallpaper, setWallpaper }) => {
  const [activeCategory, setActiveCategory] = useState<'Appearance' | 'Wallpaper' | 'Displays' | 'Sound' | 'About'>('Wallpaper');
  const [accentColor, setAccentColor] = useState('blue');

  const CATEGORIES = [
    { id: 'Wallpaper', name: 'Wallpaper', icon: <FaImage className="text-purple-400" /> },
    { id: 'Appearance', name: 'Appearance', icon: <FaPalette className="text-blue-400" /> },
    { id: 'Displays', name: 'Displays', icon: <FaDesktop className="text-cyan-400" /> },
    { id: 'Sound', name: 'Sound', icon: <FaVolumeUp className="text-pink-400" /> },
    { id: 'About', name: 'General & About', icon: <FaInfoCircle className="text-zinc-400" /> },
  ] as const;

  const ACCENT_COLORS = [
    { id: 'blue', color: '#007AFF' },
    { id: 'purple', color: '#AF52DE' },
    { id: 'pink', color: '#FF2D55' },
    { id: 'red', color: '#FF3B30' },
    { id: 'orange', color: '#FF9500' },
    { id: 'yellow', color: '#FFCC00' },
    { id: 'green', color: '#34C759' },
    { id: 'graphite', color: '#8E8E93' },
  ];

  return (
    <div className="h-full flex bg-[#181820] text-white select-none">
      {/* Left Settings Sidebar */}
      <div className="w-56 bg-[#14141a]/95 border-r border-white/10 p-3 flex flex-col justify-between text-xs">
        <div className="space-y-4">
          {/* User Profile Banner */}
          <div className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white">
              AC
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs truncate">Ashish Chanchal</div>
              <div className="text-[10px] text-zinc-400 truncate">Apple ID & Cloud</div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-0.5">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-all text-xs font-medium ${
                    isActive ? 'bg-blue-600 text-white font-semibold' : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-[10px] text-zinc-500 font-mono px-2">
          macOS Sequoia 15.2
        </div>
      </div>

      {/* Right Settings Content */}
      <div className="flex-1 p-6 overflow-y-auto macos-scroll bg-[#1c1c24]">
        {activeCategory === 'Wallpaper' && (
          <div>
            <h3 className="text-lg font-bold mb-1">Desktop Wallpaper</h3>
            <p className="text-xs text-zinc-400 mb-6">Choose a curated dynamic wallpaper for your macOS workspace.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {MACOS_WALLPAPERS.map((wp) => {
                const isSelected = currentWallpaper === wp.url;
                return (
                  <div
                    key={wp.id}
                    onClick={() => setWallpaper(wp.url)}
                    className={`group relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all aspect-video flex flex-col justify-end p-2.5 ${
                      isSelected ? 'border-blue-500 shadow-xl scale-[1.02]' : 'border-white/10 hover:border-white/30'
                    }`}
                    style={{
                      backgroundImage: `url(${wp.thumbnail})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="relative z-10 flex items-center justify-between text-xs">
                      <span className="font-semibold text-white truncate drop-shadow">{wp.name}</span>
                      {isSelected && <FaCheck className="text-blue-400 text-xs drop-shadow" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeCategory === 'Appearance' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-1">Appearance</h3>
              <p className="text-xs text-zinc-400">Select light or dark mode theme styling.</p>
            </div>

            {/* Accent Color Palette */}
            <div className="bg-black/30 rounded-2xl p-4 border border-white/5 space-y-3">
              <div className="font-semibold text-xs text-white">Accent Color</div>
              <div className="flex items-center gap-3">
                {ACCENT_COLORS.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => setAccentColor(acc.id)}
                    style={{ backgroundColor: acc.color }}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
                      accentColor === acc.id ? 'ring-2 ring-white scale-110' : 'hover:scale-105'
                    }`}
                  >
                    {accentColor === acc.id && <FaCheck className="text-white text-[10px]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeCategory === 'Displays' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-1">Built-in Liquid Retina XDR Display</h3>
            <div className="bg-black/30 rounded-2xl p-4 border border-white/5 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">Resolution</span>
                <span className="font-mono text-white">3456 × 2234 (Default for Display)</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">Refresh Rate</span>
                <span className="font-mono text-emerald-400 font-bold">ProMotion (120 Hz)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Color Profile</span>
                <span className="font-mono text-white">Apple Display (P3-1600 nits)</span>
              </div>
            </div>
          </div>
        )}

        {activeCategory === 'Sound' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-1">Sound Output & Tones</h3>
            <div className="bg-black/30 rounded-2xl p-4 border border-white/5 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-zinc-400">Output Device</span>
                <span className="text-white font-semibold">MacBook Pro High-Fidelity 6-Speaker System</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Spatial Audio</span>
                <span className="text-blue-400 font-bold">Dolby Atmos Dynamic Head Tracking</span>
              </div>
            </div>
          </div>
        )}

        {activeCategory === 'About' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-1">MacBook Pro 16-inch</h3>
            <div className="bg-black/30 rounded-2xl p-4 border border-white/5 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-zinc-400">Owner</span>
                <span className="text-white font-bold">Ashish Chanchal</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-zinc-400">Chip</span>
                <span className="text-white font-bold">Apple M3 Max</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-zinc-400">Memory</span>
                <span className="text-white font-bold">64 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">macOS</span>
                <span className="text-cyan-400 font-bold">Sequoia 15.2</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MacSettingsApp;
