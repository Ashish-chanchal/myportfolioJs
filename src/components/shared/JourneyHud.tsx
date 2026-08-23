import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';

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
    <div className="fixed bottom-6 right-6 z-40 hidden lg:flex flex-col items-end gap-2">
      {/* Theme Switcher quick action */}
      <ThemeSwitcher />

      {/* Brutalist Journey Coordinates HUD */}
      <div className="bg-[#121212] border-2 border-white p-3 shadow-brutal-accent">
        <div className="flex items-center justify-between gap-4 pb-2 border-b border-[#262626] font-mono text-[10px]">
          <span className="text-accent font-bold">JOURNEY_TRACKER</span>
          <span className="text-white font-bold">{scrollPercent}% OF ROUTE</span>
        </div>

        {/* Waypoint Nodes */}
        <div className="flex flex-col gap-1.5 mt-2">
          {WAYPOINTS.map((wp) => {
            const isActive = activeWaypoint === wp.id;
            return (
              <button
                key={wp.id}
                onClick={() => scrollToSection(wp.id)}
                className={`flex items-center justify-between gap-3 text-left font-mono text-xs px-2 py-1 border transition-all ${
                  isActive
                    ? 'bg-accent text-black border-black font-bold shadow-[2px_2px_0px_0px_#ffffff]'
                    : 'bg-[#181818] text-[#888888] border-[#2c2c2c] hover:text-white hover:border-white'
                }`}
              >
                <span>{wp.name}</span>
                <span className="text-[10px]">{isActive ? '◄' : '—'}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JourneyHud;
