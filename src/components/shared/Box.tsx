import React from 'react';

interface BoxProps {
  category: string;
  technologies: string[];
  accentColor?: string;
}

const Box: React.FC<BoxProps> = ({ category, technologies, accentColor }) => {
  return (
    <div className="flex flex-col bg-[#121212] border-2 border-white shadow-brutal hover:shadow-brutal-accent brutal-card h-full">
      {/* Top Header Bar with Accent Square */}
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

      {/* Tech Pills List */}
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
