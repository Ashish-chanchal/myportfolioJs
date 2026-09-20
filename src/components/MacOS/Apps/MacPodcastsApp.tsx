import React, { useState } from 'react';
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaPodcast,
  FaVolumeUp,
  FaSearch,
  FaBookmark,
} from 'react-icons/fa';

interface PodcastEpisode {
  id: string;
  showTitle: string;
  episodeTitle: string;
  host: string;
  duration: string;
  published: string;
  category: string;
  description: string;
  accentColor: string;
}

const EPISODES: PodcastEpisode[] = [
  {
    id: 'p1',
    showTitle: 'Frontend & Architecture Masterclass',
    episodeTitle: 'Building True Desktop OS Simulators in Modern React & Vite',
    host: 'Ashish Chanchal & Friends',
    duration: '42 min',
    published: 'Sep 18, 2026',
    category: 'Engineering',
    description: 'Deep dive into window manager mathematics, dynamic dock magnification proximity curves, and hardware audio synthesizer pipelines.',
    accentColor: 'from-purple-600 to-indigo-700',
  },
  {
    id: 'p2',
    showTitle: 'AI Systems & Full Stack Horizons',
    episodeTitle: 'Autonomous Agents, Tool Calling & Multi-Tenant LLMs',
    host: 'Tech Leaders Podcast',
    duration: '58 min',
    published: 'Sep 12, 2026',
    category: 'AI & Cloud',
    description: 'Exploring how agentic coding environments and MCP servers are reshaping engineering workflows across enterprise web apps.',
    accentColor: 'from-blue-600 to-cyan-700',
  },
  {
    id: 'p3',
    showTitle: 'The Craft of Product Engineering',
    episodeTitle: 'From Zero to Scale: Lessons from Sociantra & Real-Time Web',
    host: 'Founder Conversations',
    duration: '35 min',
    published: 'Aug 29, 2026',
    category: 'Startups',
    description: 'Practical tactics for zero-latency client state synchronization, WebSockets, and building delightful user experiences.',
    accentColor: 'from-amber-600 to-rose-700',
  },
];

export const MacPodcastsApp: React.FC = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode>(EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(32);
  const [volume, setVolume] = useState(80);
  const [search, setSearch] = useState('');

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const filteredEpisodes = EPISODES.filter(
    (e) =>
      e.showTitle.toLowerCase().includes(search.toLowerCase()) ||
      e.episodeTitle.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-[#1e1e24] text-zinc-200 select-none text-xs font-sans overflow-hidden">
      {/* Top Now Playing Bar */}
      <div className="h-20 bg-[#16161b]/95 border-b border-white/10 px-6 flex items-center justify-between flex-shrink-0">
        {/* Track info */}
        <div className="flex items-center gap-3 w-1/3 min-w-0">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${selectedEpisode.accentColor} flex items-center justify-center text-white text-lg shadow-lg flex-shrink-0`}
          >
            <FaPodcast />
          </div>
          <div className="truncate">
            <div className="font-semibold text-white text-xs truncate">
              {selectedEpisode.episodeTitle}
            </div>
            <div className="text-[11px] text-zinc-400 truncate">
              {selectedEpisode.showTitle}
            </div>
          </div>
        </div>

        {/* Player Controls & Progress */}
        <div className="flex flex-col items-center gap-1.5 w-1/3">
          <div className="flex items-center gap-4 text-zinc-300">
            <button
              onClick={() => setProgress((p) => Math.max(0, p - 10))}
              className="hover:text-white transition-colors"
            >
              <FaBackward className="text-xs" />
            </button>
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
            >
              {isPlaying ? <FaPause className="text-xs" /> : <FaPlay className="text-xs ml-0.5" />}
            </button>
            <button
              onClick={() => setProgress((p) => Math.min(100, p + 10))}
              className="hover:text-white transition-colors"
            >
              <FaForward className="text-xs" />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full max-w-xs">
            <span className="text-[10px] text-zinc-500 font-mono">
              {Math.floor((progress / 100) * 42)}:15
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="flex-1 h-1 bg-white/20 rounded-full appearance-none accent-purple-500 cursor-pointer"
            />
            <span className="text-[10px] text-zinc-500 font-mono">
              {selectedEpisode.duration}
            </span>
          </div>
        </div>

        {/* Volume & Details */}
        <div className="flex items-center justify-end gap-3 w-1/3">
          <FaVolumeUp className="text-zinc-400 text-xs" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-20 h-1 bg-white/20 rounded-full appearance-none accent-purple-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Library Navigation */}
        <div className="w-56 bg-[#18181f]/80 border-r border-white/10 p-4 flex flex-col justify-between flex-shrink-0">
          <div className="space-y-4">
            <div className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
              Apple Podcasts
            </div>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/10 text-white font-medium text-xs">
                <FaPodcast className="text-purple-400" />
                <span>Listen Now</span>
              </button>
              <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-zinc-400 hover:bg-white/5 text-xs">
                <FaBookmark className="text-zinc-500" />
                <span>Saved Shows</span>
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 text-[11px] text-purple-200">
            <div className="font-semibold mb-1">Spatial Audio</div>
            <div className="text-purple-300/80 text-[10px]">
              Enabled with Head Tracking support
            </div>
          </div>
        </div>

        {/* Episodes Grid */}
        <div className="flex-1 p-6 overflow-y-auto macos-scroll space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-base font-bold text-white">Featured Engineering Episodes</h2>
            <div className="relative w-64">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search episodes"
                className="w-full pl-8 pr-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredEpisodes.map((ep) => {
              const isSelected = selectedEpisode.id === ep.id;
              return (
                <div
                  key={ep.id}
                  onClick={() => {
                    setSelectedEpisode(ep);
                    setIsPlaying(true);
                  }}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all flex items-start gap-4 ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-600/60 shadow-lg'
                      : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-tr ${ep.accentColor} flex items-center justify-center text-white text-xl shadow-md flex-shrink-0`}
                  >
                    <FaPodcast />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/10 text-purple-300">
                        {ep.category}
                      </span>
                      <span className="text-[11px] text-zinc-500 font-mono">
                        {ep.published} • {ep.duration}
                      </span>
                    </div>
                    <div className="font-bold text-white text-sm leading-snug">
                      {ep.episodeTitle}
                    </div>
                    <div className="text-[11px] text-zinc-400 font-medium">
                      {ep.showTitle} — {ep.host}
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                      {ep.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacPodcastsApp;
