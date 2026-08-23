import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const WAYPOINTS = [
  { id: 'hero', name: '00 // DEPARTURE', label: 'Start' },
  { id: 'experience', name: '01 // EXPEDITIONS', label: 'Roles' },
  { id: 'projects', name: '02 // ARTIFACTS', label: 'Builds' },
  { id: 'skills', name: '03 // LOADOUT', label: 'Tech' },
  { id: 'about', name: '04 // CHRONICLE', label: 'Story' },
  { id: 'contact', name: '05 // TRANSMISSION', label: 'Relay' },
];

const JourneyHud: React.FC = () => {
  const [activeWaypoint, setActiveWaypoint] = useState('hero');
  const [scrollPercent, setScrollPercent] = useState(0);
  const location = useLocation();
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';
  const isEditorial = designMode === 'editorial';
  const isRetro = designMode === 'retro';

  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const percent = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
        setScrollPercent(percent);
      }

      const sections = WAYPOINTS.map((w) => document.getElementById(w.id));
      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveWaypoint(WAYPOINTS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  if (location.pathname !== '/') {
    return null;
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden lg:flex flex-col items-end gap-2 font-mono">
      {/* Journey Coordinates HUD */}
      <div
        className={`transition-all ${
          isRetro
            ? 'retro-window p-2.5 shadow-2xl'
            : isEditorial
            ? 'bg-[#0e0e12] border border-white/15 rounded-md p-3 shadow-2xl'
            : isMinimal
            ? 'bg-zinc-950/90 border border-zinc-800/90 rounded-2xl p-3 shadow-xl backdrop-blur-xl'
            : 'bg-[#121212] border-2 border-white p-3 shadow-brutal-accent'
        }`}
      >
        <div className={`flex items-center justify-between gap-4 pb-2 font-mono text-[10px] ${
          isRetro
            ? 'border-b border-[#5a5247]'
            : isEditorial
            ? 'border-b border-white/10 font-serif italic text-xs'
            : isMinimal
            ? 'border-b border-zinc-800/80'
            : 'border-b border-[#262626]'
        }`}>
          <span className="text-accent font-bold">
            {isRetro ? 'SECTOR_POS' : isEditorial ? 'Dispatch Progress' : isMinimal ? 'PAGE PROGRESS' : 'JOURNEY_TRACKER'}
          </span>
          <span className="text-white font-bold">{scrollPercent}%</span>
        </div>

        {/* Waypoint Nodes */}
        <div className="flex flex-col gap-1 mt-2">
          {WAYPOINTS.map((wp) => {
            const isActive = activeWaypoint === wp.id;
            return (
              <button
                key={wp.id}
                onClick={() => scrollToSection(wp.id)}
                className={`flex items-center justify-between gap-3 text-left text-xs px-2.5 py-1 transition-all ${
                  isRetro
                    ? `border ${
                        isActive
                          ? 'bg-accent text-black font-bold'
                          : 'bg-[#181512] text-zinc-400 border-[#3d362e] hover:text-white'
                      }`
                    : isEditorial
                    ? `rounded font-serif italic ${
                        isActive
                          ? 'bg-white/10 text-white font-bold not-italic border border-white/20'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`
                    : isMinimal
                    ? `font-mono rounded-lg ${
                        isActive
                          ? 'bg-zinc-800 text-white font-bold border border-zinc-700'
                          : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
                      }`
                    : `font-mono border ${
                        isActive
                          ? 'bg-accent text-black border-black font-bold shadow-[2px_2px_0px_0px_#ffffff]'
                          : 'bg-[#181818] text-[#888888] border-[#2c2c2c] hover:text-white hover:border-white'
                      }`
                }`}
              >
                <span>{isMinimal || isEditorial ? wp.label : wp.name}</span>
                <span className="text-[10px]">{isActive ? '●' : '—'}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JourneyHud;
