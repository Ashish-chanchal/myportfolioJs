import React, { useState } from 'react';
import {
  FaWifi,
  FaBluetoothB,
  FaBroadcastTower,
  FaMoon,
  FaSun,
  FaVolumeUp,
  FaPlay,
  FaPause,
  FaStepForward,
  FaSlidersH,
  FaKeyboard,
} from 'react-icons/fa';

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings?: () => void;
}

export const ControlCenter: React.FC<ControlCenterProps> = ({ isOpen, onClose: _onClose, onOpenSettings: _onOpenSettings }) => {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airdrop, setAirdrop] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [brightness, setBrightness] = useState(85);
  const [volume, setVolume] = useState(70);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-8 right-3 z-[250] w-80 bg-[#1e1e24]/85 border border-white/20 rounded-3xl p-3.5 shadow-2xl backdrop-blur-3xl text-white select-none animate-macos-slide-down"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="grid grid-cols-2 gap-3">
        {/* Left Big Connectivity Block */}
        <div className="bg-white/10 rounded-2xl p-2.5 flex flex-col justify-between space-y-2 border border-white/10">
          {/* Wi-Fi */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setWifi(!wifi)}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                wifi ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-white/50'
              }`}
            >
              <FaWifi className="w-3.5 h-3.5" />
            </button>
            <div className="text-[11px] leading-tight">
              <div className="font-semibold">Wi-Fi</div>
              <div className="text-[9px] text-white/60 truncate">{wifi ? 'Ashish_Gigabit_5G' : 'Off'}</div>
            </div>
          </div>

          {/* Bluetooth */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setBluetooth(!bluetooth)}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                bluetooth ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-white/50'
              }`}
            >
              <FaBluetoothB className="w-3.5 h-3.5" />
            </button>
            <div className="text-[11px] leading-tight">
              <div className="font-semibold">Bluetooth</div>
              <div className="text-[9px] text-white/60 truncate">{bluetooth ? 'AirPods Pro 2' : 'Off'}</div>
            </div>
          </div>

          {/* AirDrop */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setAirdrop(!airdrop)}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                airdrop ? 'bg-blue-600 text-white shadow-md' : 'bg-white/10 text-white/50'
              }`}
            >
              <FaBroadcastTower className="w-3.5 h-3.5" />
            </button>
            <div className="text-[11px] leading-tight">
              <div className="font-semibold">AirDrop</div>
              <div className="text-[9px] text-white/60 truncate">{airdrop ? 'Contacts Only' : 'Off'}</div>
            </div>
          </div>
        </div>

        {/* Right 2x2 Feature Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {/* Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 border transition-all text-center ${
              darkMode ? 'bg-white/15 border-white/20 text-white' : 'bg-white/5 border-white/5 text-white/60'
            }`}
          >
            <FaMoon className={`w-4 h-4 ${darkMode ? 'text-indigo-400' : ''}`} />
            <span className="text-[9px] font-medium leading-tight">Dark Mode</span>
          </button>

          {/* Keyboard Brightness */}
          <button
            className="p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 bg-white/10 border border-white/10 hover:bg-white/15 transition-all text-center"
          >
            <FaKeyboard className="w-4 h-4 text-cyan-400" />
            <span className="text-[9px] font-medium leading-tight">Keyboard</span>
          </button>

          {/* Stage Manager */}
          <button
            className="p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 bg-white/10 border border-white/10 hover:bg-white/15 transition-all text-center col-span-2"
          >
            <div className="flex items-center gap-1.5">
              <FaSlidersH className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-medium">Stage Manager</span>
            </div>
          </button>
        </div>
      </div>

      {/* Display Brightness Slider Card */}
      <div className="mt-3 bg-white/10 rounded-2xl p-2.5 border border-white/10">
        <div className="flex items-center justify-between text-[11px] font-semibold mb-1.5">
          <span>Display Brightness</span>
          <span className="text-[10px] text-white/60 font-mono">{brightness}%</span>
        </div>
        <div className="relative flex items-center">
          <FaSun className="absolute left-2.5 text-xs text-white/50 pointer-events-none" />
          <input
            type="range"
            min="10"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full h-7 rounded-xl appearance-none bg-white/15 cursor-pointer accent-white pl-8"
          />
        </div>
      </div>

      {/* Sound Volume Slider Card */}
      <div className="mt-2 bg-white/10 rounded-2xl p-2.5 border border-white/10">
        <div className="flex items-center justify-between text-[11px] font-semibold mb-1.5">
          <span>Sound Volume</span>
          <span className="text-[10px] text-white/60 font-mono">{volume}%</span>
        </div>
        <div className="relative flex items-center">
          <FaVolumeUp className="absolute left-2.5 text-xs text-white/50 pointer-events-none" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-7 rounded-xl appearance-none bg-white/15 cursor-pointer accent-white pl-8"
          />
        </div>
      </div>

      {/* Now Playing Mini Player */}
      <div className="mt-2 bg-white/10 rounded-2xl p-2.5 border border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md flex-shrink-0 text-sm font-bold">
          AC
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold truncate">Midnight Code Sessions</div>
          <div className="text-[9px] text-white/60 truncate">Ashish Chanchal // Lo-Fi Synth</div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all text-xs"
          >
            {isPlaying ? <FaPause /> : <FaPlay className="ml-0.5" />}
          </button>
          <button className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all text-xs">
            <FaStepForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;
