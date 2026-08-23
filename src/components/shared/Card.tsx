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

  // Parse tech stack into individual chips
  const techPills = tech
    ? tech
        .split(/[·,]/)
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
    : [];

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

  // Brutalist Design Mode
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
