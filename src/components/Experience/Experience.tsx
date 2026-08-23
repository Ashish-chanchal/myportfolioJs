import React, { useState } from 'react';
import Heading from '../shared/Heading';

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

  return (
    <div className="relative pl-6 sm:pl-8 pb-10 border-l-2 border-white last:border-l-0 last:pb-0">
      {/* Brutalist Timeline Milestone Node */}
      <div className="absolute -left-[11px] top-0 w-5 h-5 bg-accent border-2 border-black shadow-[2px_2px_0px_0px_#ffffff] flex items-center justify-center font-mono font-black text-[9px] text-black">
        {index + 1}
      </div>

      {/* Main Experience Box */}
      <div className="bg-[#121212] border-2 border-white p-5 sm:p-6 shadow-brutal hover:shadow-brutal-accent brutal-card">
        {/* Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-[#262626] mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-accent text-black font-mono font-black text-xs px-2.5 py-1 border border-black shadow-[2px_2px_0px_0px_#ffffff] uppercase">
              {data.tech}
            </span>
          </div>

          <div className="font-mono text-xs text-accentSec bg-[#1a1a1a] px-2 py-0.5 border border-[#333] font-bold">
            {data.title.split('|')[1]?.trim() || data.period || 'RECORDED'}
          </div>
        </div>

        {/* Role Title */}
        <h3 className="text-xl sm:text-2xl font-heading font-black text-white uppercase tracking-tight mb-3">
          {data.title.split('|')[0]?.trim() || data.title}
        </h3>

        {/* Bulleted Achievements */}
        <ul className="space-y-2.5 font-mono text-xs sm:text-sm text-[#D4D4D4]">
          {(isExpanded ? data.description : data.description.slice(0, 2)).map((desc, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-accent font-bold flex-shrink-0 mt-0.5">■</span>
              <span className="leading-relaxed">{desc}</span>
            </li>
          ))}
        </ul>

        {/* Action Bar (Expand + Link) */}
        <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between">
          {data.description.length > 2 ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="font-mono text-xs font-bold text-accent hover:text-white uppercase flex items-center gap-1.5 transition-colors"
            >
              <span>{isExpanded ? '[-] COLLAPSE MISSION LOG' : `[+] EXPAND FULL LOG (${data.description.length} POINTS)`}</span>
            </button>
          ) : (
            <span className="font-mono text-[10px] text-[#666666]">LOG_VERIFIED</span>
          )}

          {data.link && (
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-bold text-accentSec hover:underline flex items-center gap-1"
            >
              VIEW RECORD ↗
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

        {/* Brutalist Timeline Container */}
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
