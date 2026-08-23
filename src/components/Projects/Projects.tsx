import React from 'react';
import ProjectCard from '../shared/Card';
import Heading from '../shared/Heading';
import Button from '../shared/Button';

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
  return (
    <section id="projects" className="py-16 md:py-20 relative bg-brutal-grid">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header with View Archive Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
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

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6">
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
      </div>
    </section>
  );
};

export default Projects;
