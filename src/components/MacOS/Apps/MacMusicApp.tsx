import React, { useState } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaHeart, FaMusic } from 'react-icons/fa';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
}

export const MacMusicApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(80);

  const TRACKS: Track[] = [
    {
      id: 't-1',
      title: 'Cyber Midnight Focus',
      artist: 'Ashish Ambient Studio',
      album: 'Code Odyssey 2026',
      duration: '3:45',
      cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 't-2',
      title: 'Neural Synthesis Wave',
      artist: 'Autonomous Beats',
      album: 'Silicon Horizon',
      duration: '4:12',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop',
    },
    {
      id: 't-3',
      title: 'Liquid Retina Lo-Fi',
      artist: 'Cupertino Sound Lab',
      album: 'Sequoia Dreams',
      duration: '2:58',
      cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop',
    },
  ];

  const currentTrack = TRACKS[currentTrackIndex];

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  return (
    <div className="h-full flex bg-[#181820] text-white select-none">
      {/* Left Music Navigation */}
      <div className="w-48 bg-[#14141a]/95 border-r border-white/10 p-3 flex flex-col justify-between text-xs">
        <div className="space-y-4">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2">
            Apple Music
          </div>
          <div className="space-y-0.5">
            <button className="w-full text-left px-2.5 py-1.5 rounded-lg bg-pink-600 text-white flex items-center gap-2 font-semibold">
              <FaMusic className="text-xs" />
              <span>Listen Now</span>
            </button>
            <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-zinc-300 hover:bg-white/5 flex items-center gap-2">
              <span>Browse</span>
            </button>
            <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-zinc-300 hover:bg-white/5 flex items-center gap-2">
              <span>Radio</span>
            </button>
          </div>
        </div>

        <div className="p-2 bg-white/5 rounded-xl border border-white/5 text-[10px] text-zinc-400">
          Lossless Audio · 24-bit/192kHz
        </div>
      </div>

      {/* Right Music Player Content */}
      <div className="flex-1 flex flex-col justify-between p-6 bg-[#1c1c24]">
        {/* Album Artwork & Info */}
        <div className="flex flex-col items-center text-center my-auto">
          <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-2xl border border-white/15 mb-4 group relative">
            <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <FaHeart className="text-pink-500 text-3xl drop-shadow" />
            </div>
          </div>

          <h2 className="text-lg font-bold tracking-tight text-white">{currentTrack.title}</h2>
          <p className="text-xs text-zinc-400 font-medium mt-0.5">{currentTrack.artist}</p>
          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{currentTrack.album}</p>
        </div>

        {/* Player Controls & Scrubber */}
        <div className="max-w-md w-full mx-auto space-y-3 bg-black/30 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
          {/* Progress Bar */}
          <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono">
            <span>1:14</span>
            <div className="flex-1 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-pink-500 w-[35%] rounded-full" />
            </div>
            <span>{currentTrack.duration}</span>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-6 text-sm text-zinc-300">
            <button onClick={prevTrack} className="hover:text-white transition-colors">
              <FaStepBackward />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-11 h-11 rounded-full bg-pink-600 hover:bg-pink-500 text-white flex items-center justify-center text-base shadow-lg transition-all"
            >
              {isPlaying ? <FaPause /> : <FaPlay className="ml-0.5" />}
            </button>
            <button onClick={nextTrack} className="hover:text-white transition-colors">
              <FaStepForward />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 pt-1 max-w-xs mx-auto">
            <FaVolumeUp className="text-zinc-400 text-xs" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-1 bg-zinc-700 rounded-full appearance-none accent-pink-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacMusicApp;
