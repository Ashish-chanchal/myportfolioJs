import React, { useEffect, useState } from 'react';
import { FaApple } from 'react-icons/fa';

interface MacBootScreenProps {
  onBootComplete: () => void;
}

export const MacBootScreen: React.FC<MacBootScreenProps> = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);

  // Play synthetic Apple F# major boot chime
  useEffect(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const frequencies = [92.5, 138.59, 185.0, 233.08, 277.18, 369.99]; // F# major chord
        const now = ctx.currentTime;

        frequencies.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 2.5);
        });
      }
    } catch {
      // AudioContext policy catch
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onBootComplete, 350);
          return 100;
        }
        return prev + Math.floor(Math.random() * 22) + 12;
      });
    }, 140);

    return () => clearInterval(interval);
  }, [onBootComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white select-none">
      <div className="flex flex-col items-center">
        <FaApple className="text-7xl text-white drop-shadow-2xl mb-12" />

        {/* Progress Bar Container */}
        <div className="w-56 h-1.5 bg-zinc-800 rounded-full overflow-hidden border border-white/10 shadow-inner">
          <div
            className="h-full bg-white transition-all duration-150 ease-out rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default MacBootScreen;
