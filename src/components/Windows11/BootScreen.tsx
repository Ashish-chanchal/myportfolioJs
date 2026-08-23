import React, { useEffect, useState } from 'react';
import { WIN11_ICONS } from './icons';

interface BootScreenProps {
  onBootComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [statusText, setStatusText] = useState('Initializing UEFI BIOS...');

  useEffect(() => {
    const t1 = setTimeout(() => setStatusText('Loading Windows 11 Kernel & GPU Drivers...'), 700);
    const t2 = setTimeout(() => setStatusText('Starting Microservices & MCP Daemons...'), 1400);
    const t3 = setTimeout(() => setStatusText('Preparing Windows 11 User Environment...'), 2100);
    const t4 = setTimeout(() => onBootComplete(), 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onBootComplete]);

  return (
    <div
      onClick={onBootComplete}
      className="fixed inset-0 z-[999999] bg-black flex flex-col items-center justify-between py-20 select-none text-white cursor-pointer"
    >
      <div />

      {/* Center Windows 11 Logo & Spinner */}
      <div className="flex flex-col items-center gap-12">
        <img
          src={WIN11_ICONS.logo}
          alt="Windows 11"
          className="w-24 h-24 object-contain animate-pulse drop-shadow-[0_0_25px_rgba(0,120,215,0.6)]"
        />

        {/* Windows 11 Ring Dot Spinner */}
        <div className="win11-spinner" />
      </div>

      {/* Boot Status */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-zinc-400 font-mono tracking-wider">{statusText}</div>
        <div className="text-[10px] text-zinc-600 font-mono">Click anywhere to skip boot sequence</div>
      </div>
    </div>
  );
};

export default BootScreen;
