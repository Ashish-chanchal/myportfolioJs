import React from 'react';
import Button from './Button';
import { useTheme } from '../../context/ThemeContext';

export interface CardProps {
  id?: number;
  img?: string;
  tech?: string;
  title?: string;
  description?: string[];
  link?: string;
  liveLink?: string;
  categoryBadge?: string;
  team?: {
    name: string;
    link: string;
  };
}

const ProjectCard: React.FC<CardProps> = ({
  id = 0,
  img,
  title = 'Project Name',
  tech,
  description = ['Project Description'],
  link,
  liveLink,
  categoryBadge,
  team,
}) => {
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';
  const isBento = designMode === 'bento';
  const isEditorial = designMode === 'editorial';

  // Parse tech stack into individual chips
  const techPills = tech
    ? tech
        .split(/[·,]/)
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
    : [];

  // ══════════════════════════════════════════════════════
  // EDITORIAL / MAGAZINE FEATURE ARTICLE SPREAD
  // ══════════════════════════════════════════════════════
  if (isEditorial) {
    return (
      <article className="flex flex-col bg-[#0e0e12] border border-white/12 rounded-md overflow-hidden transition-all duration-300 hover:border-white/30 hover:shadow-2xl h-auto group">
        {/* Magazine Kicker Header */}
        <div className="flex items-center justify-between p-3.5 px-4 border-b border-white/10 bg-[#121216] font-mono text-[10px] text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-accent font-semibold text-xs">
              {categoryBadge || 'CASE STUDY'}
            </span>
            <span className="text-zinc-600">/</span>
            <span className="uppercase tracking-wider">ARTICLE #{id + 1}</span>
          </div>

          {liveLink && (
            <span className="flex items-center gap-1 text-emerald-400 font-semibold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>LIVE SYSTEM</span>
            </span>
          )}
        </div>

        {/* Feature Visual */}
        {img && (
          <div className="relative overflow-hidden h-48 sm:h-52 bg-[#09090b] border-b border-white/10">
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm border border-white/10 font-mono text-[9px] text-zinc-400">
              FIG. {id + 1}.0
            </div>
          </div>
        )}

        {/* Article Body */}
        <div className="p-5 flex flex-col gap-3.5">
          <div>
            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white tracking-tight italic leading-snug">
              {title}
            </h3>

            {/* Editorial Taxonomy Tags */}
            {techPills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {techPills.map((t, idx) => (
                  <span
                    key={idx}
                    className="font-serif italic text-[11px] px-2 py-0.5 rounded bg-white/4 text-zinc-300 border border-white/8"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Editorial Narrative Deliverables */}
          <ul className="space-y-2 font-serif text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5 pt-2">
            {description.map((desc, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-accent flex-shrink-0 mt-0.5 font-serif italic text-sm">§</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>

          {/* Team Collaboration Footnote */}
          {team && (
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-serif italic text-zinc-400">
              <span>Co-authored with:</span>
              <a
                href={team.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline font-semibold not-italic"
              >
                @{team.name} ↗
              </a>
            </div>
          )}

          {/* Editorial Actions */}
          {(liveLink || link) && (
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2.5">
              {liveLink && (
                <Button
                  text="Launch Dispatch"
                  link={liveLink}
                  variant="accent"
                  size="sm"
                  external
                />
              )}
              {link && (
                <Button
                  text="Source Code"
                  link={link}
                  variant="white"
                  size="sm"
                  external
                />
              )}
            </div>
          )}
        </div>
      </article>
    );
  }

  // ══════════════════════════════════════════════════════
  // BENTO GRID CARD
  // ══════════════════════════════════════════════════════
  if (isBento) {
    return (
      <div className="bento-tile flex flex-col overflow-hidden h-auto group">
        {/* Bento Image with subtle color overlay */}
        {img && (
          <div className="relative overflow-hidden h-44 sm:h-48">
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Accent gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
            {liveLink && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-xs font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live</span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col gap-3">
          {/* Category pill */}
          {categoryBadge && !img && (
            <span className="self-start text-xs font-mono font-medium px-3 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
              {categoryBadge}
            </span>
          )}

          <h3 className="text-lg sm:text-xl font-heading font-semibold text-white tracking-tight">
            {title}
          </h3>

          {/* Tech Stack as soft pills */}
          {techPills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {techPills.map((t, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/6 text-zinc-300 border border-white/8"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            {description.map((desc, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-accent flex-shrink-0 mt-1 text-[10px]">◆</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>

          {/* Team */}
          {team && (
            <div className="flex items-center gap-2 text-xs font-mono bg-white/4 px-3 py-2 rounded-xl border border-white/8">
              <span className="text-zinc-500">With</span>
              <a href={team.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-medium">
                @{team.name} ↗
              </a>
            </div>
          )}

          {/* Action Buttons */}
          {(liveLink || link) && (
            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              {liveLink && (
                <Button text="Live Launch" link={liveLink} variant="accent" size="sm" external />
              )}
              {link && (
                <Button text="Code Repo" link={link} variant="dark" size="sm" external />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════
  // MINIMALIST CARD
  // ══════════════════════════════════════════════════════
  if (isMinimal) {
    return (
      <div className="flex flex-col bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-600 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-black/40 h-auto group">
        {/* Top Header Bar (only if category or live status exists) */}
        {(categoryBadge || liveLink) && (
          <div className="flex items-center justify-between p-3.5 px-5 border-b border-zinc-800/60 bg-zinc-950/40">
            {categoryBadge && (
              <span className="font-mono text-xs font-medium px-3 py-0.5 rounded-full bg-zinc-800/90 text-zinc-300 border border-zinc-700/80 whitespace-nowrap">
                {categoryBadge}
              </span>
            )}

            {liveLink && (
              <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 ml-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-medium">Live</span>
              </span>
            )}
          </div>
        )}

        {/* Optional Project Banner Image */}
        {img && (
          <div className="border-b border-zinc-800/60 bg-zinc-950 overflow-hidden h-44 sm:h-48 flex items-center justify-center relative">
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        )}

        {/* Main Content Body */}
        <div className="p-5 sm:p-6 flex flex-col gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-heading font-bold text-white tracking-tight">
              {title}
            </h3>

            {/* Tech Stack Chips */}
            {techPills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {techPills.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-950/70 text-zinc-400 border border-zinc-800/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bulleted Key Deliverables */}
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            {description.map((desc, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-accent flex-shrink-0 mt-1">●</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>

          {/* Optional Team Collaboration Badge */}
          {team && (
            <div className="pt-2 flex items-center justify-between text-xs font-mono bg-zinc-950/50 p-2.5 rounded-xl border border-zinc-800/60">
              <span className="text-zinc-400">Collaboration:</span>
              <a
                href={team.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline font-medium flex items-center gap-1"
              >
                <span>@{team.name}</span>
                <span>↗</span>
              </a>
            </div>
          )}

          {/* Action Buttons (Right below content, zero empty gap) */}
          {(liveLink || link) && (
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              {liveLink && (
                <Button
                  text="Live Launch"
                  link={liveLink}
                  variant="accent"
                  size="sm"
                  external
                />
              )}
              {link && (
                <Button
                  text="Code Repo"
                  link={link}
                  variant="dark"
                  size="sm"
                  external
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════
  // BRUTALIST CARD
  // ══════════════════════════════════════════════════════
  return (
    <div className="flex flex-col bg-[#121212] border-2 border-white shadow-brutal hover:shadow-brutal-accent brutal-card h-auto">
      {/* Top Tech Category Banner */}
      {(categoryBadge || liveLink) && (
        <div className="flex items-center justify-between p-3 border-b-2 border-white bg-[#181818]">
          <span className="font-mono text-xs font-bold text-accent">
            {categoryBadge ? `// ${categoryBadge}` : '// DEV_LOG'}
          </span>
          {liveLink && (
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#00FF66] text-black border border-black uppercase ml-auto">
              ACTIVE
            </span>
          )}
        </div>
      )}

      {/* Optional Image Banner */}
      {img && (
        <div className="border-b-2 border-white bg-[#0a0a0a] overflow-hidden max-h-48 flex items-center justify-center">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-200"
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        <div>
          <h3 className="text-lg sm:text-xl font-heading font-black text-white uppercase tracking-tight">
            {title}
          </h3>

          {tech && (
            <div className="font-mono text-xs text-accentSec mt-1 pb-2 border-b border-[#262626]">
              STACK: {tech}
            </div>
          )}
        </div>

        <ul className="space-y-2 text-xs sm:text-sm font-mono text-[#D4D4D4]">
          {description.map((desc, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-accent font-bold flex-shrink-0 mt-0.5">■</span>
              <span className="leading-relaxed">{desc}</span>
            </li>
          ))}
        </ul>

        {/* Optional Team Collaboration Badge */}
        {team && (
          <div className="pt-2 border-t border-[#262626] flex items-center justify-between text-xs font-mono bg-[#161616] p-2 border border-[#333]">
            <span className="text-[#888888] font-bold">TEAM SQUAD:</span>
            <a
              href={team.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-bold flex items-center gap-1"
            >
              <span>with @{team.name}</span>
              <span>↗</span>
            </a>
          </div>
        )}

        {/* Bottom Action Section */}
        {(link || liveLink) && (
          <div className="pt-3 border-t-2 border-white flex flex-wrap items-center gap-2.5">
            {liveLink && (
              <Button
                text="Live Launch"
                link={liveLink}
                variant="accent"
                size="sm"
                external
              />
            )}
            {link && (
              <Button
                text="Code Repo"
                link={link}
                variant="white"
                size="sm"
                external
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
