import React from 'react';

interface HeadingSecProps {
  title: string;
  description: string;
  waypoint?: string;
}

const HeadingSec: React.FC<HeadingSecProps> = ({ title, description, waypoint }) => {
  return (
    <div className="max-w-7xl mx-auto p-4 pt-28 pb-8">
      <div className="bg-[#121212] border-2 border-white p-6 md:p-8 shadow-brutal-accent relative">
        {/* Top telemetry stamp */}
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

        {/* Big heading */}
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
