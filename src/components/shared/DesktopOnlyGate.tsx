import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLaptop, FaMobileAlt, FaArrowRight } from 'react-icons/fa';

interface DesktopOnlyGateProps {
  osName: 'macOS' | 'Windows 11';
}

export const DesktopOnlyGate: React.FC<DesktopOnlyGateProps> = ({ osName }) => {
  const navigate = useNavigate();
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      // Screen width under 1024px is considered tablet/mobile for desktop OS modes
      if (typeof window !== 'undefined') {
        setIsMobileScreen(window.innerWidth < 1024);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!isMobileScreen || dismissed) return null;

  const isMac = osName === 'macOS';

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-6 bg-black/85 backdrop-blur-2xl text-white select-none animate-macos-scale-in">
      <div
        className={`w-full max-w-md p-7 rounded-3xl border shadow-2xl flex flex-col items-center text-center backdrop-blur-2xl ${
          isMac
            ? 'bg-[#181820]/95 border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)]'
            : 'bg-[#1c1c24]/95 border-blue-500/30 shadow-[0_25px_60px_rgba(0,102,255,0.2)]'
        }`}
      >
        {/* Device Icon Animation */}
        <div className="relative mb-5 flex items-center justify-center">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl border ${
              isMac
                ? 'bg-gradient-to-tr from-zinc-800 to-zinc-700 border-white/15'
                : 'bg-gradient-to-tr from-blue-950 to-blue-900 border-blue-400/30'
            }`}
          >
            <FaLaptop className={`text-4xl ${isMac ? 'text-white' : 'text-blue-400'}`} />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <FaMobileAlt className="text-xs" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold tracking-tight mb-2">
          {isMac ? ' macOS Tahoe Experience' : '🪟 Windows 11 Experience'}
        </h2>
        <div className="inline-block px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[11px] font-mono font-semibold mb-4">
          Desktop / Laptop Screen Recommended
        </div>

        {/* Explanatory Description */}
        <p className="text-xs text-zinc-300 leading-relaxed mb-6 max-w-xs">
          This interactive {osName} environment features multi-window multitasking, menu bar controls, and desktop apps designed for a laptop or desktop monitor (1024px+).
        </p>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2.5">
          <button
            onClick={() => navigate('/')}
            className={`w-full py-3 px-5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
              isMac
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:brightness-110 text-white'
            }`}
          >
            <span>View Mobile-Friendly Portfolio</span>
            <FaArrowRight className="text-[10px]" />
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5 transition-all cursor-pointer"
          >
            Continue in {osName} Anyway
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopOnlyGate;
