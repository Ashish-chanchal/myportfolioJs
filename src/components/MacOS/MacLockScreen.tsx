import React, { useState, useEffect } from 'react';
import { FaFingerprint, FaArrowRight, FaApple } from 'react-icons/fa';
import heromain from '../../assets/hero/heromain.webp';

interface MacLockScreenProps {
  onUnlock: () => void;
  wallpaperUrl: string;
}

export const MacLockScreen: React.FC<MacLockScreenProps> = ({ onUnlock, wallpaperUrl }) => {
  const [password, setPassword] = useState('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Global Enter Key Handler (Works anywhere on screen)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.code === 'Enter') {
        e.preventDefault();
        onUnlock();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [onUnlock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUnlock();
  };

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const formattedDate = time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div
      className="fixed inset-0 z-[500] flex flex-col items-center justify-between py-12 px-6 text-white select-none bg-cover bg-center transition-all duration-700"
      style={{
        backgroundImage: `url(${wallpaperUrl})`,
      }}
    >
      {/* Blurred Backdrop Layer */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />

      {/* Top Apple Icon & Time */}
      <div className="relative z-10 flex flex-col items-center mt-6">
        <FaApple className="text-3xl text-white/90 drop-shadow-lg mb-4" />
        <div className="text-7xl sm:text-8xl font-semibold tracking-tight text-white/95 font-sans drop-shadow-2xl">
          {formattedTime}
        </div>
        <div className="text-lg sm:text-xl font-medium text-white/90 drop-shadow-lg mt-1 tracking-wide">
          {formattedDate}
        </div>
      </div>

      {/* User Login Section */}
      <div className="relative z-10 flex flex-col items-center mb-10 w-full max-w-xs">
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/40 shadow-2xl p-0.5 bg-black/40">
            <img
              src={heromain}
              alt="Ashish Chanchal"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        <h3 className="text-base font-bold tracking-tight text-white/90 mb-3 drop-shadow">
          Ashish Chanchal
        </h3>

        <form onSubmit={handleSubmit} className="relative w-full">
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password or press Enter"
            className="w-full px-4 py-2 rounded-full bg-white/20 hover:bg-white/25 focus:bg-white/30 border border-white/30 text-white placeholder-white/60 text-xs text-center focus:outline-none backdrop-blur-xl transition-all shadow-xl"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center text-white text-[10px] transition-all cursor-pointer"
            title="Log In"
          >
            <FaArrowRight />
          </button>
        </form>

        <button
          onClick={onUnlock}
          className="mt-4 flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors drop-shadow"
        >
          <FaFingerprint className="text-sm text-cyan-400" />
          <span>Touch ID or click to unlock</span>
        </button>
      </div>

      {/* Bottom hint */}
      <div className="relative z-10 text-[11px] text-white/60 font-mono drop-shadow">
        Press [Enter] to unlock portfolio workstation
      </div>
    </div>
  );
};

export default MacLockScreen;
