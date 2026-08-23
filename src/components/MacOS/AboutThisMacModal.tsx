import React from 'react';
import { FaTimes, FaApple, FaMemory, FaMicrochip, FaHdd, FaDesktop } from 'react-icons/fa';

interface AboutThisMacModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutThisMacModal: React.FC<AboutThisMacModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-[480px] bg-[#1e1e24]/90 border border-white/20 rounded-2xl shadow-2xl p-6 text-white text-xs select-none backdrop-blur-2xl animate-macos-scale-in relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:bg-[#ff3b30] flex items-center justify-center group transition-all"
        >
          <FaTimes className="text-[#4c0000] w-2 h-2 opacity-0 group-hover:opacity-100" />
        </button>

        <div className="flex flex-col items-center text-center mt-2 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-zinc-800 to-zinc-600 flex items-center justify-center shadow-lg mb-3 border border-white/10">
            <FaApple className="text-4xl text-white drop-shadow-md" />
          </div>
          <h2 className="text-lg font-bold tracking-tight">MacBook Pro</h2>
          <p className="text-zinc-400 text-xs">16-inch, Nov 2024 · Ashish Edition</p>
          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-[10px] font-bold border border-blue-500/30">
            macOS Tahoe 26.0 · Ashish Silicon Edition
          </div>
        </div>

        {/* Spec Overview Grid */}
        <div className="bg-black/30 rounded-xl p-3.5 border border-white/5 space-y-2.5 font-mono text-[11px]">
          <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
            <div className="flex items-center gap-2 text-zinc-400">
              <FaMicrochip className="text-cyan-400" />
              <span>Chip</span>
            </div>
            <span className="font-bold text-white">Apple M3 Max (16-core CPU, 40-core GPU)</span>
          </div>

          <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
            <div className="flex items-center gap-2 text-zinc-400">
              <FaMemory className="text-purple-400" />
              <span>Memory</span>
            </div>
            <span className="font-bold text-white">64 GB Unified LPDDR5X (400 GB/s)</span>
          </div>

          <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
            <div className="flex items-center gap-2 text-zinc-400">
              <FaHdd className="text-emerald-400" />
              <span>Storage</span>
            </div>
            <span className="font-bold text-white">2 TB NVMe Apple SSD (1.4 TB Available)</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-400">
              <FaDesktop className="text-amber-400" />
              <span>Display</span>
            </div>
            <span className="font-bold text-white">16.2" Liquid Retina XDR (3456 × 2234) ProMotion 120Hz</span>
          </div>
        </div>

        {/* Storage Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
            <span>Macintosh HD — 624 GB of 2 TB used</span>
            <span className="text-blue-400 font-bold">Encrypted APFS</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-zinc-800 overflow-hidden flex border border-white/10">
            <div className="h-full bg-blue-500 w-[30%]" title="Apps: 180 GB" />
            <div className="h-full bg-purple-500 w-[20%]" title="Developer: 120 GB" />
            <div className="h-full bg-amber-500 w-[15%]" title="AI Models: 90 GB" />
            <div className="h-full bg-emerald-500 w-[10%]" title="Photos & Media: 60 GB" />
            <div className="h-full bg-zinc-600 flex-1" title="macOS System: 174 GB" />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2 text-xs">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutThisMacModal;
