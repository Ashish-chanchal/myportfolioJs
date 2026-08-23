import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface HeadingProps {
  text: string;
  tag?: string;
  index?: string;
}

const Heading: React.FC<HeadingProps> = ({ text, tag, index }) => {
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';
  const isBento = designMode === 'bento';
  const isEditorial = designMode === 'editorial';
  const isRetro = designMode === 'retro';

  if (isRetro) {
    return (
      <div className="flex flex-col gap-2 mb-8 font-mono">
        <div className="flex items-center justify-between border-b-2 border-[#5a5247] pb-1.5 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold">&gt;&gt; DISK_SECTOR:</span>
            <span className="text-white bg-[#2a2520] px-2 py-0.5 border border-[#5a5247]">
              {index || 'WAYPOINT_00'}
            </span>
            {tag && (
              <span className="text-amber-400 font-bold hidden sm:inline">
                [{tag.replace('//', '').trim()}]
              </span>
            )}
          </div>
          <span className="text-[10px] text-zinc-500">[STATUS: READY]</span>
        </div>

        <div className="flex items-baseline gap-3 mt-1">
          <span className="text-accent text-2xl font-bold">C:\&gt;</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-pixel text-white tracking-wider">
            {text}
          </h2>
          <span className="inline-block w-3 h-6 bg-accent animate-pulse ml-1"></span>
        </div>
      </div>
    );
  }

  if (isEditorial) {
    return (
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center justify-between border-b border-white/15 pb-2">
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-xs text-accent font-semibold tracking-wider">
              {index ? index.replace('//', '').replace('WAYPOINT_', 'CHAPTER ') : 'FEATURE'}
            </span>
            {tag && (
              <>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-400 font-mono text-[11px] uppercase tracking-widest">
                  {tag.replace('//', '').trim()}
                </span>
              </>
            )}
          </div>
          <span className="font-mono text-[10px] text-zinc-500 hidden sm:inline-block uppercase tracking-widest">
            EDITION // 2026
          </span>
        </div>

        <div className="flex items-baseline justify-between gap-4 mt-1">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-bold text-white tracking-tight italic">
            {text}
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent hidden lg:block max-w-xs"></div>
        </div>
      </div>
    );
  }

  if (isBento) {
    return (
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-white/8 border border-white/12 text-white backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            {index ? index.replace('//', '').replace('WAYPOINT_', 'SECTION ') : 'SECTION'}
          </span>
          {tag && (
            <span className="text-zinc-400 font-mono text-xs uppercase tracking-wider">
              {tag.replace('//', '').trim()}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white tracking-tight">
            {text}
          </h2>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent hidden sm:block max-w-xs"></div>
        </div>
      </div>
    );
  }

  if (isMinimal) {
    return (
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            {index ? index.replace('//', '').replace('WAYPOINT_', 'PART ') : 'SECTION'}
          </span>
          {tag && (
            <span className="text-zinc-500 font-mono text-xs uppercase tracking-wider">
              {tag.replace('//', '')}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white tracking-tight">
            {text}
          </h2>
          <div className="flex-1 h-[1px] bg-zinc-800/60 hidden sm:block max-w-xs"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 mb-8">
      <div className="flex items-center gap-2">
        <span className="bg-accent text-black font-mono font-bold text-xs px-2.5 py-0.5 border border-black shadow-[2px_2px_0px_0px_#ffffff]">
          {index || '// LOG_WAYPOINT'}
        </span>
        {tag && (
          <span className="text-accentSec font-mono text-xs uppercase tracking-widest font-bold">
            {tag}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-2">
          <span className="text-accent font-mono">#</span>
          {text}
        </h2>
        <div className="flex-1 h-[2px] bg-[#262626] relative hidden sm:block">
          <div className="absolute left-0 top-[-3px] w-6 h-[8px] bg-accent"></div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
