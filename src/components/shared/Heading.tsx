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
