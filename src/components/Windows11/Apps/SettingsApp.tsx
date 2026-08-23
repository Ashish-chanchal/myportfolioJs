import React from 'react';
import { FaLaptop, FaPalette, FaInfoCircle, FaCheck, FaShieldAlt } from 'react-icons/fa';
import { useTheme } from '../../../context/ThemeContext';
import { OFFICIAL_WALLPAPERS } from '../icons';

interface SettingsAppProps {
  currentWallpaper: string;
  setWallpaper: (wp: string) => void;
}

export const WALLPAPERS = OFFICIAL_WALLPAPERS;

export const SettingsApp: React.FC<SettingsAppProps> = ({ currentWallpaper, setWallpaper }) => {
  const { currentTheme, setTheme, themes } = useTheme();

  return (
    <div className="h-full flex bg-[#202020] text-zinc-200 text-xs select-none">
      {/* Left Sidebar */}
      <div className="w-52 bg-[#1c1c1c] border-r border-white/10 p-3 flex flex-col justify-between font-sans">
        <div className="space-y-4">
          {/* User Tile */}
          <div className="flex items-center gap-3 p-2 bg-[#252525] rounded-lg border border-white/10">
            <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center font-bold text-black text-sm">
              AC
            </div>
            <div>
              <div className="font-bold text-white text-xs">Ashish Chanchal</div>
              <div className="text-[10px] text-zinc-400">Local Administrator</div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-white/10 text-white font-semibold">
              <FaLaptop className="text-accent" />
              <span>System & Specs</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-md text-zinc-400 hover:bg-white/5 hover:text-white">
              <FaPalette className="text-amber-400" />
              <span>Personalization</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-md text-zinc-400 hover:bg-white/5 hover:text-white">
              <FaShieldAlt className="text-emerald-400" />
              <span>Privacy & Security</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-md text-zinc-400 hover:bg-white/5 hover:text-white">
              <FaInfoCircle className="text-blue-400" />
              <span>About Device</span>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-zinc-500 font-mono">
          Windows 11 Pro 23H2 (Portfolio Edition)
        </div>
      </div>

      {/* Main Settings Panel */}
      <div className="flex-1 p-6 overflow-y-auto win11-scroll space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-white font-sans">Personalization & System Specs</h2>
          <p className="text-zinc-400 text-xs mt-1">Configure desktop wallpapers, accent palettes, and inspect hardware performance.</p>
        </div>

        {/* Wallpaper Picker Section */}
        <div className="p-4 bg-[#181818] border border-white/10 rounded-xl space-y-3">
          <div className="font-bold text-white text-sm flex items-center justify-between">
            <span>Desktop Background Wallpapers</span>
            <span className="text-xs text-zinc-400 font-mono">4 4K HD Themes</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {WALLPAPERS.map((wp) => (
              <div
                key={wp.id}
                onClick={() => setWallpaper(wp.url)}
                className={`group relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                  currentWallpaper === wp.url ? 'border-accent shadow-lg shadow-accent/20 scale-[1.02]' : 'border-white/10 hover:border-white/40'
                }`}
              >
                <img src={wp.thumb} alt={wp.name} className="w-full h-20 object-cover" />
                <div className="p-1.5 bg-[#141414] text-[10px] font-medium text-white truncate text-center">
                  {wp.name}
                </div>
                {currentWallpaper === wp.url && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-accent text-black flex items-center justify-center text-[10px] font-bold shadow-md">
                    <FaCheck />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Accent Color Palette Selector */}
        <div className="p-4 bg-[#181818] border border-white/10 rounded-xl space-y-3">
          <div className="font-bold text-white text-sm">Theme Accent Colors</div>
          <div className="flex flex-wrap gap-2.5">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 transition-all ${
                  currentTheme.id === t.id ? 'bg-white/15 border-white text-white font-bold' : 'border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                <span className="w-3 h-3 rounded-full shadow" style={{ backgroundColor: t.primary }} />
                <span>{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Device Specifications Card */}
        <div className="p-4 bg-[#181818] border border-white/10 rounded-xl space-y-3">
          <div className="font-bold text-white text-sm flex items-center gap-2">
            <FaLaptop className="text-accent" />
            <span>Device Specifications</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-400">Device Name:</span>
              <span className="text-white font-bold">ASHISH-WORKSTATION-RIG</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-400">Processor:</span>
              <span className="text-white">13th Gen Intel(R) Core(TM) i9-13900K (24 Cores @ 5.80GHz)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-400">Installed RAM:</span>
              <span className="text-white">32.0 GB (31.8 GB usable)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-400">Graphics Acceleration:</span>
              <span className="text-white">NVIDIA GeForce RTX 4090 24GB + Tensor Cores</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-400">System Type:</span>
              <span className="text-white">64-bit operating system, x64-based processor</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-400">Edition:</span>
              <span className="text-accent font-bold">Windows 11 Pro Portfolio Experience Edition</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
