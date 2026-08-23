import React from 'react';
import Button from './Button';

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
  return (
    <div className="flex flex-col bg-[#121212] border-2 border-white shadow-brutal hover:shadow-brutal-accent brutal-card h-full justify-between">
      <div>
        {/* Top Tech Category Banner */}
        <div className="flex items-center justify-between p-3 border-b-2 border-white bg-[#181818]">
          <span className="font-mono text-xs font-bold text-accent truncate max-w-[220px]">
            {tech ? `// ${tech}` : '// DEV_LOG'}
          </span>
          {categoryBadge && (
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-accent text-black border border-black uppercase">
              {categoryBadge}
            </span>
          )}
        </div>

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
        <div className="p-4 sm:p-5">
          <h3 className="text-lg sm:text-xl font-heading font-black text-white uppercase tracking-tight mb-3">
            {title}
          </h3>

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
            <div className="mt-4 pt-3 border-t border-[#262626] flex items-center justify-between text-xs font-mono bg-[#161616] p-2 border border-[#333]">
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
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="p-4 border-t-2 border-white bg-[#161616] flex flex-wrap items-center gap-3">
        {link && (
          <Button
            text="Code Repo"
            link={link}
            variant="white"
            size="sm"
            external
          />
        )}
        {liveLink && (
          <Button
            text="Live Launch"
            link={liveLink}
            variant="accent"
            size="sm"
            external
          />
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
