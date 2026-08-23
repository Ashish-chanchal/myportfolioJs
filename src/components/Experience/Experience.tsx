import React, { useState } from 'react';
import Heading from '../shared/Heading';
import { useTheme } from '../../context/ThemeContext';

export interface ExperienceDataProps {
  id: number;
  tech: string;
  title: string;
  description: string[];
  link?: string;
  period?: string;
  location?: string;
  type?: 'Industry' | 'Research' | 'Internship';
}

const ExperienceCard: React.FC<{ data: ExperienceDataProps; index: number }> = ({ data, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';

  return (
    <div
      className={`relative pl-6 sm:pl-8 pb-10 ${
        isMinimal ? 'border-l border-zinc-800 last:border-l-0 last:pb-0' : 'border-l-2 border-white last:border-l-0 last:pb-0'
      }`}
    >
      {/* Timeline Milestone Node */}
      {isMinimal ? (
        <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-accent flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping"></div>
        </div>
      ) : (
        <div className="absolute -left-[11px] top-0 w-5 h-5 bg-accent border-2 border-black shadow-[2px_2px_0px_0px_#ffffff] flex items-center justify-center font-mono font-black text-[9px] text-black">
          {index + 1}
        </div>
      )}

      {/* Main Experience Box */}
      <div
        className={`p-5 sm:p-6 transition-all ${
          isMinimal
            ? 'bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl backdrop-blur-sm shadow-lg shadow-black/30'
            : 'bg-[#121212] border-2 border-white shadow-brutal hover:shadow-brutal-accent brutal-card'
        }`}
      >
        {/* Header Strip */}
        <div
          className={`flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 ${
            isMinimal ? 'border-b border-zinc-800/60' : 'border-b-2 border-[#262626]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={
                isMinimal
                  ? 'px-3 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-xs font-medium'
                  : 'bg-accent text-black font-mono font-black text-xs px-2.5 py-1 border border-black shadow-[2px_2px_0px_0px_#ffffff] uppercase'
              }
            >
              {data.tech}
            </span>
          </div>

          <div
            className={`font-mono text-xs ${
              isMinimal
                ? 'text-zinc-400 font-normal'
                : 'text-accentSec bg-[#1a1a1a] px-2 py-0.5 border border-[#333] font-bold'
            }`}
          >
            {data.title.split('|')[1]?.trim() || data.period || 'RECORDED'}
          </div>
        </div>

        {/* Role Title */}
        <h3
          className={`text-xl sm:text-2xl font-heading text-white tracking-tight mb-3 ${
            isMinimal ? 'font-bold' : 'font-black uppercase'
          }`}
        >
          {data.title.split('|')[0]?.trim() || data.title}
        </h3>

        {/* Bulleted Achievements */}
        <ul className={`space-y-2.5 text-xs sm:text-sm ${isMinimal ? 'text-zinc-300 font-sans leading-relaxed' : 'font-mono text-[#D4D4D4]'}`}>
          {(isExpanded ? data.description : data.description.slice(0, 2)).map((desc, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-accent font-bold flex-shrink-0 mt-0.5">{isMinimal ? '●' : '■'}</span>
              <span className="leading-relaxed">{desc}</span>
            </li>
          ))}
        </ul>

        {/* Action Bar (Expand + Link) */}
        <div className={`mt-4 pt-3 flex items-center justify-between ${isMinimal ? 'border-t border-zinc-800/60' : 'border-t border-[#262626]'}`}>
          {data.description.length > 2 ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`font-mono text-xs font-medium text-accent hover:text-white uppercase flex items-center gap-1.5 transition-colors ${
                isMinimal ? 'tracking-normal' : ''
              }`}
            >
              <span>{isExpanded ? '[-] Show less' : `[+] View full details (${data.description.length} points)`}</span>
            </button>
          ) : (
            <span className="font-mono text-[10px] text-zinc-500">{isMinimal ? 'Verified Experience' : 'LOG_VERIFIED'}</span>
          )}

          {data.link && (
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-medium text-accentSec hover:underline flex items-center gap-1"
            >
              Learn more ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Experience: React.FC<{
  ExperienceData: ExperienceDataProps[];
  title?: string;
  waypointIndex?: string;
}> = ({ ExperienceData, title, waypointIndex }) => {
  return (
    <section id="experience" className="py-16 md:py-20 relative bg-brutal-dots">
      <div className="max-w-7xl mx-auto px-4">
        <Heading
          text={title || 'EXPEDITIONS & MILESTONES'}
          tag="// CAREER TIMELINE"
          index={waypointIndex || 'WAYPOINT_01'}
        />

        {/* Timeline Container */}
        <div className="mt-8 max-w-4xl mx-auto">
          {ExperienceData.map((item, index) => (
            <ExperienceCard key={item.id} data={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
