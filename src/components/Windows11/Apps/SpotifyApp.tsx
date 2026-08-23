import React, { useState } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaHeart } from 'react-icons/fa';
import { WIN11_ICONS } from '../icons';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

const PLAYLIST: Track[] = [
  { id: 1, title: 'Synthesizer Horizon (Deep Focus)', artist: 'Cyberpunk Code Station', duration: '3:45' },
  { id: 2, title: 'Neural Latency Optimization', artist: 'Sub-3s Audio Ensemble', duration: '4:12' },
  { id: 3, title: 'DRDO Biomedical Waves', artist: 'Clinical EEG Ambient', duration: '5:02' },
  { id: 4, title: 'Three.js 60 FPS Flow', artist: 'WebGL Shaders Collective', duration: '3:18' },
  { id: 5, title: 'NestJS Microservices Beat', artist: 'TypeScript Rhythm Band', duration: '4:30' },
];

export const SpotifyApp: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState<number[]>([1, 2]);

  const activeTrack = PLAYLIST[currentIdx];

  const toggleLike = (id: number) => {
    setLiked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="h-full flex flex-col bg-[#121212] text-zinc-300 text-xs select-none justify-between">
      {/* Top Header */}
      <div className="p-4 bg-gradient-to-b from-[#1db954]/20 to-transparent flex items-center gap-3 border-b border-white/5">
        <img src={WIN11_ICONS.spotify} alt="Spotify" className="w-8 h-8 object-contain" />
        <div>
          <h2 className="text-white font-bold text-sm">Developer Coding Ambient // Lo-Fi Focus</h2>
          <p className="text-[10px] text-zinc-400">Curated playlist for high-throughput engineering</p>
        </div>
      </div>

      {/* Playlist tracks */}
      <div className="flex-1 p-3 overflow-y-auto win11-scroll space-y-1">
        {PLAYLIST.map((track, idx) => (
          <div
            key={track.id}
            onClick={() => {
              setCurrentIdx(idx);
              setIsPlaying(true);
            }}
            className={`p-2.5 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
              currentIdx === idx ? 'bg-white/15 text-white font-bold' : 'hover:bg-white/5 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-zinc-500 w-4">{idx + 1}</span>
              <div>
                <div className={`text-xs ${currentIdx === idx ? 'text-[#1db954]' : 'text-white'}`}>{track.title}</div>
                <div className="text-[10px] text-zinc-500">{track.artist}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(track.id);
                }}
                className={`p-1 ${liked.includes(track.id) ? 'text-[#1db954]' : 'text-zinc-600 hover:text-white'}`}
              >
                <FaHeart className="w-3 h-3" />
              </button>
              <span className="font-mono text-[10px] text-zinc-500">{track.duration}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Media Bar */}
      <div className="p-3 bg-[#181818] border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-gradient-to-tr from-emerald-600 to-teal-800 flex items-center justify-center text-white font-bold">
            ♪
          </div>
          <div>
            <div className="font-bold text-white text-xs truncate max-w-[140px]">{activeTrack.title}</div>
            <div className="text-[10px] text-zinc-400">{activeTrack.artist}</div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentIdx((i) => (i - 1 + PLAYLIST.length) % PLAYLIST.length)}
            className="p-1.5 text-zinc-400 hover:text-white"
          >
            <FaStepBackward className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all shadow"
          >
            {isPlaying ? <FaPause className="w-3 h-3" /> : <FaPlay className="w-3 h-3 ml-0.5" />}
          </button>
          <button
            onClick={() => setCurrentIdx((i) => (i + 1) % PLAYLIST.length)}
            className="p-1.5 text-zinc-400 hover:text-white"
          >
            <FaStepForward className="w-3 h-3" />
          </button>
        </div>

        {/* Volume */}
        <div className="hidden sm:flex items-center gap-2 text-zinc-400">
          <FaVolumeUp className="w-3.5 h-3.5" />
          <div className="w-16 bg-zinc-700 h-1 rounded-full overflow-hidden">
            <div className="bg-[#1db954] h-full w-[70%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyApp;
