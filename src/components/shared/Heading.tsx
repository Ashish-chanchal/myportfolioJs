import React from 'react';

interface HeadingProps {
  text: string;
  tag?: string;
  index?: string;
}

const Heading: React.FC<HeadingProps> = ({ text, tag, index }) => {
  return (
    <div className="flex flex-col gap-2 mb-8">
      {/* Waypoint Indicator pill */}
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

      {/* Main Title Banner */}
      <div className="flex items-center gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-2">
          <span className="text-accent font-mono">#</span>
          {text}
        </h2>
        {/* Brutalist solid accent divider */}
        <div className="flex-1 h-[2px] bg-[#262626] relative hidden sm:block">
          <div className="absolute left-0 top-[-3px] w-6 h-[8px] bg-accent"></div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
