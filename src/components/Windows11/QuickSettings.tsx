import React, { useState } from 'react';
import { FaWifi, FaBluetoothB, FaMoon, FaBatteryFull, FaVolumeUp, FaSun, FaPlane, FaShieldAlt } from 'react-icons/fa';

interface QuickSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSettings: React.FC<QuickSettingsProps> = ({ isOpen, onClose }) => {
  const [wifi, setWifi] = useState(() => localStorage.getItem('win11_wifi') !== 'false');
  const [bluetooth, setBluetooth] = useState(() => localStorage.getItem('win11_bt') !== 'false');
  const [nightLight, setNightLight] = useState(() => localStorage.getItem('win11_night_light') === 'true');
  const [airplane, setAirplane] = useState(() => localStorage.getItem('win11_airplane') === 'true');
  const [volume, setVolume] = useState(() => Number(localStorage.getItem('win11_volume')) || 85);
  const [brightness, setBrightness] = useState(() => Number(localStorage.getItem('win11_brightness')) || 90);

  const handleToggleWifi = () => {
    setWifi((v) => {
      localStorage.setItem('win11_wifi', String(!v));
      return !v;
    });
  };

  const handleToggleBt = () => {
    setBluetooth((v) => {
      localStorage.setItem('win11_bt', String(!v));
      return !v;
    });
  };

  const handleToggleNightLight = () => {
    setNightLight((v) => {
      localStorage.setItem('win11_night_light', String(!v));
      return !v;
    });
  };

  const handleToggleAirplane = () => {
    setAirplane((v) => {
      localStorage.setItem('win11_airplane', String(!v));
      return !v;
    });
  };

  const handleVolumeChange = (newVal: number) => {
    setVolume(newVal);
    localStorage.setItem('win11_volume', String(newVal));
  };

  const handleBrightnessChange = (newVal: number) => {
    setBrightness(newVal);
    localStorage.setItem('win11_brightness', String(newVal));
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute bottom-14 right-4 w-80 win11-mica rounded-xl p-4 flex flex-col gap-4 z-[9999] shadow-2xl animate-cinematic-zoom select-none text-xs"
    >
      {/* Quick Toggle Tiles */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={handleToggleWifi}
          className={`p-3 rounded-lg flex flex-col items-center gap-1.5 transition-all ${
            wifi ? 'bg-blue-600 text-white font-bold' : 'bg-white/10 text-zinc-400 hover:bg-white/15'
          }`}
        >
          <FaWifi className="w-4 h-4" />
          <span className="text-[10px]">Wi-Fi {wifi ? '(Online)' : '(Off)'}</span>
        </button>

        <button
          onClick={handleToggleBt}
          className={`p-3 rounded-lg flex flex-col items-center gap-1.5 transition-all ${
            bluetooth ? 'bg-blue-600 text-white font-bold' : 'bg-white/10 text-zinc-400 hover:bg-white/15'
          }`}
        >
          <FaBluetoothB className="w-4 h-4" />
          <span className="text-[10px]">Bluetooth</span>
        </button>

        <button
          onClick={handleToggleNightLight}
          className={`p-3 rounded-lg flex flex-col items-center gap-1.5 transition-all ${
            nightLight ? 'bg-blue-600 text-white font-bold' : 'bg-white/10 text-zinc-400 hover:bg-white/15'
          }`}
        >
          <FaMoon className="w-4 h-4" />
          <span className="text-[10px]">Night Light</span>
        </button>

        <button
          onClick={handleToggleAirplane}
          className={`p-3 rounded-lg flex flex-col items-center gap-1.5 transition-all ${
            airplane ? 'bg-blue-600 text-white font-bold' : 'bg-white/10 text-zinc-400 hover:bg-white/15'
          }`}
        >
          <FaPlane className="w-4 h-4" />
          <span className="text-[10px]">Airplane Mode</span>
        </button>

        <div className="p-3 rounded-lg bg-blue-600 text-white flex flex-col items-center gap-1.5 font-bold">
          <FaBatteryFull className="w-4 h-4" />
          <span className="text-[10px]">Battery: 100%</span>
        </div>

        <div className="p-3 rounded-lg bg-emerald-600 text-white flex flex-col items-center gap-1.5 font-bold">
          <FaShieldAlt className="w-4 h-4" />
          <span className="text-[10px]">Protected</span>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-3 pt-2 border-t border-white/10">
        {/* Brightness */}
        <div className="flex items-center gap-3">
          <FaSun className="text-zinc-400 w-3.5 h-3.5" />
          <input
            type="range"
            min="10"
            max="100"
            value={brightness}
            onChange={(e) => handleBrightnessChange(Number(e.target.value))}
            className="w-full accent-blue-500 h-1 bg-zinc-700 rounded-lg cursor-pointer"
          />
          <span className="font-mono text-[10px] text-zinc-400 w-7 text-right">{brightness}%</span>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3">
          <FaVolumeUp className="text-zinc-400 w-3.5 h-3.5" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
            className="w-full accent-blue-500 h-1 bg-zinc-700 rounded-lg cursor-pointer"
          />
          <span className="font-mono text-[10px] text-zinc-400 w-7 text-right">{volume}%</span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
        <span>Ashish Portfolio Dev OS</span>
        <button onClick={onClose} className="text-blue-400 hover:underline">Done</button>
      </div>
    </div>
  );
};

export default QuickSettings;
