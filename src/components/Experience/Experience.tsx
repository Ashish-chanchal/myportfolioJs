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

/* ─── Retro / Vintage Card — BIOS POST / Memory Address Slip ─── */
const RetroExperienceCard: React.FC<{ data: ExperienceDataProps; index: number }> = ({
  data,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const role = data.title.split('|')[0]?.trim() || data.title;
  const period = data.title.split('|')[1]?.trim() || data.period || '';

  return (
    <div className="retro-window p-1 font-mono flex flex-col gap-2">
      {/* Title bar */}
      <div className="bg-[#38322b] px-3 py-1 flex items-center justify-between text-xs text-white border-b border-[#5a5247]">
        <div className="flex items-center gap-2">
          <span className="text-accent font-bold">■</span>
          <span className="font-pixel text-[10px] text-accent">
            MEM_ADDR: 0x00{index + 1}F // IRQ 0{index + 1}
          </span>
        </div>
        <span className="text-[10px] text-zinc-300 font-bold bg-[#1e1b18] px-2 py-0.5 border border-[#5a5247]">
          {data.tech}
        </span>
      </div>

      {/* Content Interior */}
      <div className="p-4 bg-[#1a1714] flex flex-col gap-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#3d362e] pb-2">
          <h3 className="font-pixel text-base sm:text-lg font-bold text-white tracking-wide">
            &gt; {role}
          </h3>
          <span className="text-xs text-amber-300 font-bold font-mono">{period}</span>
        </div>

        {/* Narrative Points */}
        <ul className="space-y-2 text-xs text-zinc-300 font-mono">
          {(isExpanded ? data.description : data.description.slice(0, 3)).map((desc, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-accent font-bold">&gt;&gt;</span>
              <span className="leading-relaxed">{desc}</span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="pt-2 border-t border-[#3d362e] flex items-center justify-between text-xs">
          {data.description.length > 3 ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-accent hover:underline flex items-center gap-1 font-bold"
            >
              {isExpanded ? '[-] COLLAPSE_LOG' : `[+] EXPAND_FULL_LOG (+${data.description.length - 3})`}
            </button>
          ) : (
            <span className="text-[10px] text-zinc-500">[LOG_VERIFIED: 100%]</span>
          )}

          {data.link && (
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="retro-btn px-2.5 py-0.5 text-[10px] flex items-center gap-1"
            >
              <span>DETAILS.EXE</span>
              <span>↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Editorial / Magazine Card — broadside column layout ─── */
const EditorialExperienceCard: React.FC<{ data: ExperienceDataProps; index: number }> = ({
  data,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const role = data.title.split('|')[0]?.trim() || data.title;
  const period = data.title.split('|')[1]?.trim() || data.period || '';
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];

  return (
    <article className="p-6 bg-[#0e0e12] border border-white/12 rounded-md transition-all duration-300 hover:border-white/25 flex flex-col gap-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="font-editorial italic font-bold text-accent text-base">
            Act {romanNumerals[index] || index + 1}.
          </span>
          <span className="font-mono text-xs uppercase text-zinc-300 font-semibold tracking-wider">
            {data.tech}
          </span>
        </div>
        <span className="font-serif italic text-xs text-zinc-400">
          {period}
        </span>
      </div>

      {/* Role Title */}
      <h3 className="font-editorial text-2xl font-bold text-white tracking-tight italic">
        {role}
      </h3>

      {/* Narrative Points */}
      <ul className="space-y-2.5 font-serif text-sm text-zinc-300 leading-relaxed">
        {(isExpanded ? data.description : data.description.slice(0, 3)).map((desc, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span className="text-accent flex-shrink-0 mt-1 font-serif text-sm">¶</span>
            <span>{desc}</span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between font-serif text-xs">
        {data.description.length > 3 ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="italic text-accent hover:underline flex items-center gap-1 font-semibold"
          >
            {isExpanded ? '↑ Collapse Article' : `↓ Read Full Dispatch (+${data.description.length - 3} points)`}
          </button>
        ) : (
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">RECORD // ARCHIVED</span>
        )}

        {data.link && (
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white italic flex items-center gap-1"
          >
            Reference ↗
          </a>
        )}
      </div>
    </article>
  );
};

/* ─── Bento card — pure glassmorphic tile, no timeline ─── */
const BentoExperienceCard: React.FC<{ data: ExperienceDataProps; index: number; wide?: boolean }> = ({
  data,
  index,
  wide = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const role = data.title.split('|')[0]?.trim() || data.title;
  const period = data.title.split('|')[1]?.trim() || data.period || '';

  const typeColor: Record<string, string> = {
    Industry: '#00F0FF',
    Research: '#C778DD',
    Internship: '#F59E0B',
  };
  const accent = data.type ? typeColor[data.type] : 'var(--accent-primary)';

  return (
    <div className={`bento-tile p-5 sm:p-6 flex flex-col gap-4 ${wide ? 'row-span-2' : ''}`}>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-black text-black"
              style={{ backgroundColor: accent }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border"
              style={{ color: accent, borderColor: `${accent}40`, backgroundColor: `${accent}12` }}
            >
              {data.tech}
            </span>
            {data.type && (
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                {data.type}
              </span>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-heading font-semibold text-white tracking-tight leading-tight">
            {role}
          </h3>
        </div>

        {period && (
          <span className="text-xs font-mono text-zinc-500 whitespace-nowrap mt-1">{period}</span>
        )}
      </div>

      <div className="h-px bg-gradient-to-r from-white/10 to-transparent" />

      <ul className="space-y-2 text-sm text-zinc-400 font-sans leading-relaxed flex-1">
        {(isExpanded ? data.description : data.description.slice(0, 3)).map((desc, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
            <span>{desc}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between pt-2 border-t border-white/6">
        {data.description.length > 3 ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-mono text-accent hover:text-white transition-colors flex items-center gap-1"
            style={{ color: accent }}
          >
            {isExpanded ? '↑ Less' : `↓ +${data.description.length - 3} more`}
          </button>
        ) : (
          <span className="text-[10px] font-mono text-zinc-600">Verified</span>
        )}

        {data.link && (
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono hover:underline flex items-center gap-1"
            style={{ color: accent }}
          >
            Details ↗
          </a>
        )}
      </div>
    </div>
  );
};

/* ─── Classic Timeline Card (Minimalist & Brutalist) ─── */
const TimelineExperienceCard: React.FC<{ data: ExperienceDataProps; index: number }> = ({
  data,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';

  return (
    <div className="relative pl-6 sm:pl-10 pb-12 last:pb-0">
      <div
        className={`absolute left-[7px] sm:left-[11px] top-6 bottom-0 w-[2px] ${
          isMinimal ? 'bg-zinc-800' : 'bg-white'
        }`}
      ></div>

      <div
        className={`absolute left-0 top-1 w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center font-mono text-[10px] font-black z-10 ${
          isMinimal
            ? 'rounded-full bg-zinc-900 border-2 border-accent text-accent shadow-sm'
            : 'bg-accent text-black border-2 border-white shadow-brutal-sm'
        }`}
      >
        {index + 1}
      </div>

      <div
        className={`p-5 sm:p-6 transition-all ${
          isMinimal
            ? 'bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl backdrop-blur-md shadow-lg'
            : 'bg-[#141414] border-2 border-white shadow-brutal hover:shadow-brutal-accent brutal-card'
        }`}
      >
        <div className={`flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 ${isMinimal ? 'border-b border-zinc-800/60' : 'border-b-2 border-[#262626]'}`}>
          <div className="flex items-center gap-2">
            <span
              className={
                isMinimal
                  ? 'font-mono text-xs font-medium px-3 py-0.5 rounded-full bg-zinc-800 text-accent border border-zinc-700'
                  : 'font-mono text-xs font-black px-2.5 py-0.5 bg-accent text-black border border-black uppercase'
              }
            >
              {data.tech}
            </span>
          </div>
          <div className="font-mono text-xs text-zinc-400">
            {data.title.split('|')[1]?.trim() || data.period || 'RECORDED'}
          </div>
        </div>

        <h3 className={`text-xl sm:text-2xl font-heading text-white tracking-tight mb-3 ${isMinimal ? 'font-bold' : 'font-black uppercase'}`}>
          {data.title.split('|')[0]?.trim() || data.title}
        </h3>

        <ul className={`space-y-2.5 text-xs sm:text-sm ${isMinimal ? 'text-zinc-300 font-sans leading-relaxed' : 'font-mono text-[#D4D4D4]'}`}>
          {(isExpanded ? data.description : data.description.slice(0, 2)).map((desc, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-accent font-bold flex-shrink-0 mt-0.5">{isMinimal ? '●' : '■'}</span>
              <span className="leading-relaxed">{desc}</span>
            </li>
          ))}
        </ul>

        <div className={`mt-4 pt-3 flex items-center justify-between ${isMinimal ? 'border-t border-zinc-800/60' : 'border-t-2 border-[#262626]'}`}>
          {data.description.length > 2 ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="font-mono text-xs font-medium text-accent hover:text-white uppercase flex items-center gap-1.5 transition-colors"
            >
              <span>{isExpanded ? '[-] Show less' : `[+] View full details (${data.description.length} points)`}</span>
            </button>
          ) : (
            <span className="font-mono text-[10px] text-zinc-500">{isMinimal ? 'Verified Experience' : 'LOG_VERIFIED'}</span>
          )}

          {data.link && (
            <a href={data.link} target="_blank" rel="noopener noreferrer" className="font-mono text-xs font-medium text-accentSec hover:underline flex items-center gap-1">
              Learn more ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Section wrapper ─── */
const Experience: React.FC<{
  ExperienceData: ExperienceDataProps[];
  title?: string;
  waypointIndex?: string;
}> = ({ ExperienceData, title, waypointIndex }) => {
  const { designMode } = useTheme();
  const isBento = designMode === 'bento';
  const isEditorial = designMode === 'editorial';
  const isRetro = designMode === 'retro';

  // Bento column spans — first card wide, rest alternate
  const bentoSpan = (idx: number) =>
    idx === 0
      ? 'col-span-12 md:col-span-8'
      : idx === 1
      ? 'col-span-12 md:col-span-4'
      : idx % 2 === 0
      ? 'col-span-12 md:col-span-6'
      : 'col-span-12 md:col-span-6';

  return (
    <section id="experience" className="py-16 md:py-20 relative bg-brutal-dots">
      <div className="max-w-7xl mx-auto px-4">
        <Heading
          text={title || 'EXPEDITIONS & MILESTONES'}
          tag="// CAREER TIMELINE"
          index={waypointIndex || 'WAYPOINT_01'}
        />

        {isRetro ? (
          /* ── Retro: 2-column BIOS POST log window grid ── */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {ExperienceData.map((item, index) => (
              <RetroExperienceCard key={item.id} data={item} index={index} />
            ))}
          </div>
        ) : isEditorial ? (
          /* ── Editorial: 2-column magazine broadside layout ── */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {ExperienceData.map((item, index) => (
              <EditorialExperienceCard key={item.id} data={item} index={index} />
            ))}
          </div>
        ) : isBento ? (
          /* ── Bento: asymmetric grid of glass tiles ── */
          <div className="grid grid-cols-12 gap-4 mt-2">
            {ExperienceData.map((item, index) => (
              <div key={item.id} className={bentoSpan(index)}>
                <BentoExperienceCard data={item} index={index} />
              </div>
            ))}
          </div>
        ) : (
          /* ── Classic: vertical timeline ── */
          <div className="mt-8 max-w-4xl mx-auto">
            {ExperienceData.map((item, index) => (
              <TimelineExperienceCard key={item.id} data={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
