import React from 'react';
import { FaSun, FaGithub, FaMicrochip, FaRss, FaCloudSun, FaTimes } from 'react-icons/fa';

interface WidgetsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WidgetsPanel: React.FC<WidgetsPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed top-0 left-0 bottom-12 w-[90vw] max-w-sm win11-mica border-r border-white/10 p-5 flex flex-col justify-between z-[99999] shadow-2xl animate-win11-open select-none overflow-y-auto win11-scroll text-xs"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FaCloudSun className="text-amber-400 w-5 h-5" />
            <span className="font-bold text-white text-sm">Windows 11 Widgets</span>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white">
            <FaTimes className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Noida Weather Widget */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-900/40 to-indigo-950/60 border border-white/10 flex items-center justify-between shadow-lg">
          <div>
            <div className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">Noida, Uttar Pradesh</div>
            <div className="text-3xl font-bold text-white mt-1">28°C</div>
            <div className="text-[11px] text-zinc-300">Partly Cloudy · Air Quality: Good (AQI 64)</div>
          </div>
          <FaSun className="text-amber-400 w-12 h-12 animate-pulse" />
        </div>

        {/* System Telemetry Widget */}
        <div className="p-4 rounded-xl bg-[#19191f] border border-white/10 space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-white text-xs">
            <FaMicrochip className="text-accent" />
            <span>Hardware Telemetry</span>
          </div>

          <div className="space-y-2 font-mono text-[11px]">
            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>CPU Load (24 Cores):</span>
                <span className="text-white font-bold">14%</span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-accent h-full w-[14%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>RAM Usage:</span>
                <span className="text-white font-bold">8.4 / 32.0 GB (26%)</span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[26%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>VRAM (RTX 4090):</span>
                <span className="text-white font-bold">4.2 / 24.0 GB</span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[18%]" />
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Activity Widget */}
        <div className="p-4 rounded-xl bg-[#19191f] border border-white/10 space-y-2">
          <div className="flex items-center justify-between font-bold text-white text-xs">
            <div className="flex items-center gap-2">
              <FaGithub className="text-white w-4 h-4" />
              <span>GitHub Status</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">@Ashish-chanchal</span>
          </div>

          <div className="text-[11px] text-zinc-300">
            50+ Repositories · 1,400+ Contributions this year · Active on Model Context Protocol & AI tooling.
          </div>
        </div>

        {/* Engineering Newsfeed */}
        <div className="p-4 rounded-xl bg-[#19191f] border border-white/10 space-y-2">
          <div className="flex items-center gap-2 font-bold text-white text-xs">
            <FaRss className="text-amber-400" />
            <span>Tech Wire Headlines</span>
          </div>
          <div className="space-y-1.5 text-[11px] text-zinc-400 font-sans">
            <div className="p-2 rounded bg-black/30 hover:bg-black/50 cursor-pointer">
              • Sub-second latency in conversational AI voice pipelines becomes standard.
            </div>
            <div className="p-2 rounded bg-black/30 hover:bg-black/50 cursor-pointer">
              • Three.js WebGL WebGPU updates unlock photorealistic web rendering.
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10 text-center text-[10px] text-zinc-500 font-mono">
        Windows 11 Portfolio Feed
      </div>
    </div>
  );
};

export default WidgetsPanel;
