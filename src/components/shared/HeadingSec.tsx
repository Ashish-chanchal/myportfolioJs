import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface HeadingSecProps {
  title: string;
  description: string;
  waypoint?: string;
}

const HeadingSec: React.FC<HeadingSecProps> = ({ title, description, waypoint }) => {
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';
  const isBento = designMode === 'bento';
  const isEditorial = designMode === 'editorial';

  if (isEditorial) {
    return (
      <div className="max-w-7xl mx-auto p-4 pt-28 pb-6">
        <div className="bg-[#0e0e12] border border-white/15 rounded-md p-6 md:p-8 relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-serif italic text-accent font-bold text-xs">
                {waypoint ? waypoint.replace('LOGBOOK //', '').replace('WAYPOINT_', 'CHAPTER ').replace(/_/g, ' ') : 'ARCHIVE COMPENDIUM'}
              </span>
            </div>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              VOL. XXIV // NO. 01
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-white tracking-tight italic">
            {title.replace(/_/g, ' ')}
          </h1>
          <p className="mt-2 text-sm md:text-base text-zinc-400 max-w-2xl leading-relaxed font-serif italic">
            {description}
          </p>
        </div>
      </div>
    );
  }

  if (isBento) {
    return (
      <div className="max-w-7xl mx-auto p-4 pt-28 pb-6">
        <div className="bento-tile p-6 md:p-8 relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse inline-block"></span>
            <span className="text-accent font-mono text-xs uppercase font-semibold tracking-wider">
              {waypoint ? waypoint.replace('LOGBOOK //', '').replace('WAYPOINT_', '').replace(/_/g, ' ') : 'PORTFOLIO ARCHIVE'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-white tracking-tight">
            {title.replace(/_/g, ' ')}
          </h1>
          <p className="mt-2 text-sm md:text-base text-zinc-400 max-w-2xl leading-relaxed font-sans">
            {description}
          </p>
        </div>
      </div>
    );
  }

  if (isMinimal) {
    return (
      <div className="max-w-7xl mx-auto p-4 pt-28 pb-6">
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-md relative shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent inline-block"></span>
            <span className="text-zinc-400 font-mono text-xs uppercase font-medium tracking-wider">
              {waypoint ? waypoint.replace('LOGBOOK //', '').replace('WAYPOINT_', '') : 'PORTFOLIO ARCHIVE'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
            {title.replace(/_/g, ' ')}
          </h1>
          <p className="mt-2 text-sm md:text-base text-zinc-400 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 pt-28 pb-8">
      <div className="bg-[#121212] border-2 border-white p-6 md:p-8 shadow-brutal-accent relative">
        <div className="flex items-center justify-between pb-4 border-b-2 border-[#262626] mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-accent inline-block border border-black"></span>
            <span className="text-accent font-mono text-xs uppercase font-bold tracking-widest">
              {waypoint || 'MISSION_ARCHIVE // ASHISH CHANCHAL'}
            </span>
          </div>
          <span className="text-[#888888] font-mono text-xs hidden sm:inline-block">
            STATUS: ACTIVE
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-2">
          <span className="text-accent font-mono">/</span>
          {title}
        </h1>
        <p className="mt-2 text-sm md:text-base font-mono text-[#A3A3A3] max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HeadingSec;
