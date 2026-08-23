import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface BoxProps {
  category: string;
  technologies: string[];
  accentColor?: string;
}

const Box: React.FC<BoxProps> = ({ category, technologies, accentColor }) => {
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';

  if (isMinimal) {
    return (
      <div className="flex flex-col bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-5 backdrop-blur-sm transition-all hover:-translate-y-1 shadow-lg shadow-black/30 h-full">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60 mb-3">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full inline-block bg-accent"
              style={accentColor ? { backgroundColor: accentColor } : undefined}
            ></span>
            <h3 className="font-heading font-semibold text-sm text-white tracking-wide">
              {category}
            </h3>
          </div>
          <span className="font-mono text-[10px] text-zinc-500 px-2 py-0.5 rounded-full bg-zinc-800/60 border border-zinc-700/50">
            {technologies.length}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 flex-1 items-start">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="text-xs font-mono px-2.5 py-1 rounded-lg bg-zinc-950/60 text-zinc-300 border border-zinc-800/80 hover:border-accent hover:text-white transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#121212] border-2 border-white shadow-brutal hover:shadow-brutal-accent brutal-card h-full">
      <div className="flex items-center justify-between p-3 border-b-2 border-white bg-[#1a1a1a]">
        <div className="flex items-center gap-2">
          <span 
            className="w-2.5 h-2.5 inline-block border border-black bg-accent" 
            style={accentColor ? { backgroundColor: accentColor } : undefined}
          ></span>
          <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
            {category}
          </h3>
        </div>
        <span className="font-mono text-[10px] text-[#888888] px-1.5 py-0.5 bg-[#0a0a0a] border border-[#333]">
          {technologies.length}
        </span>
      </div>

      <div className="p-3 flex flex-wrap gap-2 flex-1 items-start bg-[#0e0e0e]">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="text-xs font-mono px-2.5 py-1 bg-[#181818] text-white border border-[#333333] hover:border-accent hover:text-accent hover:bg-[#202020] transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Box;
