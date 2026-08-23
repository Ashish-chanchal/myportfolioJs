import React from 'react';
import ProjectCard from '../shared/Card';
import Heading from '../shared/Heading';
import Button from '../shared/Button';
import { useTheme } from '../../context/ThemeContext';

export interface ProjectDataProps {
  id: number;
  title: string;
  image?: string;
  tech: string;
  description: string[];
  link?: string;
  livelink?: string;
  category?: string;
  team?: {
    name: string;
    link: string;
  };
}

interface ProjectsProps {
  ProjectsData: ProjectDataProps[];
  heading: string;
  setSelectedItem?: React.Dispatch<React.SetStateAction<number>>;
  waypointIndex?: string;
  tag?: string;
}

const Projects: React.FC<ProjectsProps> = ({
  ProjectsData,
  heading,
  setSelectedItem,
  waypointIndex,
  tag,
}) => {
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';
  const isBento = designMode === 'bento';
  const isEditorial = designMode === 'editorial';

  // Asymmetric bento col spans for each card index
  const bentoSpan = (idx: number): string => {
    const patterns = [
      'col-span-12 md:col-span-8',
      'col-span-12 md:col-span-4',
      'col-span-12 md:col-span-4',
      'col-span-12 md:col-span-8',
      'col-span-12 md:col-span-6',
      'col-span-12 md:col-span-6',
    ];
    return patterns[idx % patterns.length];
  };

  const leadProject = ProjectsData[0];
  const remainingProjects = ProjectsData.slice(1);

  return (
    <section id="projects" className="py-16 md:py-20 relative bg-brutal-grid">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header with View Archive Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <Heading
            text={heading}
            tag={tag || '// PRODUCTION BUILDS & SYSTEMS'}
            index={waypointIndex || 'WAYPOINT_02'}
          />

          {setSelectedItem && (
            <div className="self-start sm:self-auto mb-6 sm:mb-0">
              <Button
                text="All Artifacts Archive"
                link="/works"
                setSelectedItem={setSelectedItem}
                id={1}
                variant="accent"
                size="sm"
              />
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════════════════════
             MODE 1: EDITORIAL / MAGAZINE SPREAD LAYOUT
             (Lead Full-Bleed Cover Story + 2-Col Gazette Grid)
        ══════════════════════════════════════════════════════ */}
        {isEditorial ? (
          <div className="flex flex-col gap-8 mt-4">
            {/* Lead Cover Story Article Spread (12-col) */}
            {leadProject && (
              <div className="p-6 md:p-8 bg-[#0e0e12] border border-white/15 rounded-md">
                <div className="flex items-center justify-between pb-3 mb-6 border-b border-white/10 font-mono text-[10px] text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="font-serif italic text-accent font-bold text-xs uppercase">
                      COVER FEATURE STORY
                    </span>
                    <span className="text-zinc-600">/</span>
                    <span className="uppercase">VOL. XXIV // DISPATCH 01</span>
                  </div>
                  {leadProject.livelink && (
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>ACTIVE PRODUCTION</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Visual Left (6 cols) */}
                  {leadProject.image && (
                    <div className="lg:col-span-6 relative overflow-hidden rounded-md border border-white/10 group">
                      <img
                        src={leadProject.image}
                        alt={leadProject.title}
                        className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded bg-black/80 backdrop-blur-sm border border-white/10 font-mono text-[10px] text-zinc-300">
                        FIG 01.0 // COVER CASE STUDY
                      </div>
                    </div>
                  )}

                  {/* Story Right (6 cols) */}
                  <div className={`flex flex-col justify-between gap-4 ${leadProject.image ? 'lg:col-span-6' : 'lg:col-span-12'}`}>
                    <div>
                      <div className="font-serif italic text-xs text-accent font-semibold mb-1">
                        {leadProject.category || 'FEATURED ARCHITECTURE'}
                      </div>
                      <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight italic mb-3">
                        {leadProject.title}
                      </h3>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {leadProject.tech.split(/[·,]/).map((t, idx) => (
                          <span
                            key={idx}
                            className="font-serif italic text-xs px-2.5 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/10"
                          >
                            {t.trim()}
                          </span>
                        ))}
                      </div>

                      {/* Narrative points */}
                      <ul className="space-y-2 font-serif text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {leadProject.description.map((desc, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-accent flex-shrink-0 mt-0.5 font-serif text-sm font-bold">§</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                      {leadProject.livelink && (
                        <Button text="Launch Live System" link={leadProject.livelink} variant="accent" size="md" external />
                      )}
                      {leadProject.link && (
                        <Button text="Inspect Repository" link={leadProject.link} variant="white" size="md" external />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Remaining Projects in 2-Column Gazette Article Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {remainingProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  img={project.image}
                  tech={project.tech}
                  link={project.link}
                  liveLink={project.livelink}
                  description={project.description}
                  categoryBadge={project.category}
                  team={project.team}
                />
              ))}
            </div>
          </div>

        ) : isBento ? (
          /* ══════════════════════════════════════════════════════
               MODE 2: BENTO 2.0 MOSAIC LAYOUT (12-Col Asymmetric Mosaic)
          ══════════════════════════════════════════════════════ */
          <div className="grid grid-cols-12 gap-4">
            {ProjectsData.map((project, idx) => (
              <div key={project.id} className={bentoSpan(idx)}>
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  img={project.image}
                  tech={project.tech}
                  link={project.link}
                  liveLink={project.livelink}
                  description={project.description}
                  categoryBadge={project.category}
                  team={project.team}
                />
              </div>
            ))}
          </div>

        ) : isMinimal ? (
          /* ══════════════════════════════════════════════════════
               MODE 3: MINIMALIST GALLERY LAYOUT (Clean 2-Column Gallery)
          ══════════════════════════════════════════════════════ */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ProjectsData.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                img={project.image}
                tech={project.tech}
                link={project.link}
                liveLink={project.livelink}
                description={project.description}
                categoryBadge={project.category}
                team={project.team}
              />
            ))}
          </div>

        ) : (
          /* ══════════════════════════════════════════════════════
               MODE 4: BRUTALIST GRID LAYOUT (3-Column Industrial Matrix)
          ══════════════════════════════════════════════════════ */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {ProjectsData.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                img={project.image}
                tech={project.tech}
                link={project.link}
                liveLink={project.livelink}
                description={project.description}
                categoryBadge={project.category}
                team={project.team}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
