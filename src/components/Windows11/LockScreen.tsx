import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaLock, FaWifi, FaBatteryFull, FaVolumeUp } from 'react-icons/fa';
import heromainImg from '../../assets/hero/heromain.webp';

interface LockScreenProps {
  wallpaper: string;
  onLogin: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ wallpaper, onLogin }) => {
  const [isUnlockedView, setIsUnlockedView] = useState(false);
  const [pin, setPin] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Windows 11 Startup Chime Synthesizer via Web Audio API
  const playWin11StartupSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.08 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 1.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 1.8);
      });
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  const handleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoggingIn(true);
    playWin11StartupSound();

    setTimeout(() => {
      onLogin();
    }, 1200);
  };

  const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateString = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      onClick={() => {
        if (!isUnlockedView) setIsUnlockedView(true);
      }}
      className="fixed inset-0 z-[999990] flex flex-col justify-between select-none overflow-hidden text-white"
      style={{
        backgroundImage: `url("${wallpaper}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Backdrop blur overlay on lock screen */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          isUnlockedView ? 'bg-black/50 backdrop-blur-2xl' : 'bg-black/20 backdrop-blur-none'
        }`}
      />

      {/* Top Lock Screen Clock View (Before sliding up / clicking) */}
      {!isUnlockedView ? (
        <div className="relative z-10 flex-1 flex flex-col justify-between items-center py-16 animate-fadeIn">
          {/* Big Windows 11 Lock Clock */}
          <div className="flex flex-col items-center gap-1 mt-6">
            <h1 className="text-7xl sm:text-8xl font-light tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] font-sans">
              {timeString}
            </h1>
            <p className="text-lg sm:text-xl font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-zinc-200">
              {dateString}
            </p>
          </div>

          {/* Bottom Prompt */}
          <div className="flex flex-col items-center gap-3">
            <div className="px-5 py-2 rounded-full win11-mica text-xs text-white/90 border border-white/10 flex items-center gap-2 shadow-lg animate-bounce">
              <FaLock className="w-3 h-3 text-blue-400" />
              <span>Click anywhere or press Enter to Sign In</span>
            </div>
          </div>
        </div>
      ) : (
        /* Windows 11 Login / PIN Form View */
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 animate-cinematic-zoom">
          <div className="flex flex-col items-center gap-5 max-w-sm w-full text-center">
            {/* User Profile Avatar */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/30 shadow-2xl bg-black">
              <img src={heromainImg} alt="Ashish Chanchal" className="w-full h-full object-cover" />
            </div>

            {/* Username & Subtitle */}
            <div>
              <h2 className="text-2xl font-bold text-white drop-shadow-md">Ashish Chanchal</h2>
              <p className="text-xs text-zinc-300 drop-shadow">Software Developer & AI Systems Engineer</p>
            </div>

            {/* Login / PIN Field or Welcome State */}
            {isLoggingIn ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="win11-spinner" />
                <span className="text-sm font-medium text-white tracking-wide">Welcome</span>
              </div>
            ) : (
              <form onSubmit={handleSignIn} className="w-full space-y-3">
                <div className="relative flex items-center">
                  <input
                    type="password"
                    placeholder="Enter PIN (Type anything to sign in)"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full bg-[#1e1e24]/90 border border-white/20 rounded-md px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-400 outline-none focus:border-blue-500 focus:bg-[#252530]"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-1 p-2 rounded bg-blue-600 hover:bg-blue-500 text-white transition-all shadow"
                    title="Sign In"
                  >
                    <FaArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-[11px] text-zinc-400 bg-white/5 border border-white/10 rounded-md py-1.5 px-3">
                  💡 Type any PIN / password or click Sign In to unlock
                </div>

                <div className="flex justify-center gap-3 text-xs pt-1">
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg transition-all"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsUnlockedView(false)}
                    className="px-4 py-2 rounded-md win11-mica hover:bg-white/10 text-zinc-300 transition-all text-xs"
                  >
                    Lock
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Bottom Tray on Lock Screen */}
      <div className="relative z-10 px-6 py-4 flex items-center justify-between text-xs text-white/80 select-none">
        <div className="font-mono text-[11px] drop-shadow">Windows 11 Pro · Dev Studio</div>
        <div className="flex items-center gap-4 drop-shadow">
          <FaWifi className="w-3.5 h-3.5" />
          <FaVolumeUp className="w-3.5 h-3.5" />
          <FaBatteryFull className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
