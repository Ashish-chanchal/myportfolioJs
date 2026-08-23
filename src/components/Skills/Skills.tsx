import React from 'react';
import Heading from '../shared/Heading';
import Box from '../shared/Box';
import { useTheme } from '../../context/ThemeContext';

export const techData = [
  {
    id: 1,
    category: 'Frontend Universe',
    technologies: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Three.js', 'Tailwind CSS', 'Material UI', 'HTML5/CSS3'],
    accent: '#00F0FF',
  },
  {
    id: 2,
    category: 'Backend Core',
    technologies: ['Node.js', 'Express.js', 'NestJS', 'FastAPI', 'gRPC', 'REST APIs', 'Microservices'],
    accent: '#C778DD',
  },
  {
    id: 3,
    category: 'GenAI & Machine Learning',
    technologies: ['OpenAI Assistant API', 'Function Calling', 'Structured Outputs', 'Gemini API', 'MNE Signal Processing', 'Scikit-Learn'],
    accent: '#00FF66',
  },
  {
    id: 4,
    category: 'App Engineering',
    technologies: ['React Native', 'Dart / Flutter', 'Ionic', 'Capacitor', 'GetX Architecture'],
    accent: '#FF3366',
  },
  {
    id: 5,
    category: 'Databases & Cache',
    technologies: ['Redis', 'MongoDB', 'MSSQL', 'Firebase Firestore', 'PostgreSQL', 'MySQL'],
    accent: '#00F0FF',
  },
  {
    id: 6,
    category: 'DevOps & Cloud',
    technologies: ['Docker', 'Azure Cloud', 'Azure DevOps (YAML CI/CD)', 'Google Cloud (GCP)', 'Git & GitHub'],
    accent: '#FF6B00',
  },
  {
    id: 7,
    category: 'Protocols & Realtime',
    technologies: ['WebSockets', 'Socket.io', 'Redux Toolkit', 'Notifee Push FCM', 'ShadcnUI'],
    accent: '#FFFFFF',
  },
];

const Skills: React.FC<{ showimg?: boolean; waypointIndex?: string }> = ({ waypointIndex }) => {
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';
  const isBento = designMode === 'bento';
  const isEditorial = designMode === 'editorial';

  return (
    <section id="skills" className="py-16 md:py-20 relative bg-brutal-dots">
      <div className="max-w-7xl mx-auto px-4">
        <Heading
          text="TECH LOADOUT & CAPABILITIES"
          tag="// ARSENAL OF CODE & TOOLS"
          index={waypointIndex || 'WAYPOINT_03'}
        />

        {/* Loadout Matrix Grid */}
        <div className={`grid gap-5 mt-8 ${
          isEditorial
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            : isBento
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        }`}>
          {techData.map((tech) => (
            isEditorial ? (
              /* ── Editorial: Gazette Classifieds Directory ── */
              <div key={tech.id} className="p-5 bg-[#0e0e12] border border-white/12 rounded-md flex flex-col justify-between gap-3 hover:border-white/25 transition-all">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-white/10 font-mono text-[10px] text-zinc-500">
                    <span>CATALOG #{String(tech.id).padStart(2, '0')}</span>
                    <span className="font-serif italic text-accent">VERIFIED</span>
                  </div>
                  <h4 className="font-editorial text-base font-bold text-white tracking-wide italic mb-3">
                    {tech.category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tech.technologies.map((t, i) => (
                      <span
                        key={i}
                        className="font-serif italic text-xs px-2 py-0.5 rounded bg-white/4 text-zinc-300 border border-white/8 hover:text-white"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : isBento ? (
              <div key={tech.id} className="bento-tile p-5 flex flex-col gap-3">
                {/* Category header */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: tech.accent }} />
                  <span className="font-mono text-xs font-bold text-white tracking-wide uppercase">{tech.category}</span>
                </div>
                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5">
                  {tech.technologies.map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full text-zinc-300 border border-white/10"
                      style={{ backgroundColor: `${tech.accent}12` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div key={tech.id} className="h-full">
                <Box
                  category={tech.category}
                  technologies={tech.technologies}
                  accentColor={tech.accent}
                />
              </div>
            )
          ))}
        </div>

        {/* Engineering Tenet Footer Strip */}
        <div
          className={`mt-10 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs ${
            isEditorial
              ? 'bg-[#0e0e12] border border-white/12 rounded-md font-serif text-sm italic'
              : isBento
              ? 'bento-tile font-sans text-xs'
              : isMinimal
              ? 'bg-zinc-900/40 border border-zinc-800/80 rounded-2xl'
              : 'bg-[#141414] border-2 border-white shadow-brutal-sm'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent inline-block animate-pulse"></span>
            <span className="text-zinc-300">
              {isEditorial ? 'The Technical Arsenal — Continuously audited for zero-latency execution.' : isMinimal || isBento ? 'Continuous Integration & Production Ready Tooling' : 'TECH STACK AUDIT // ZERO DEPRECATION TOLERANCE'}
            </span>
          </div>
          <span className="text-accent font-bold">ALL SYSTEMS OPERATIONAL</span>
        </div>
      </div>
    </section>
  );
};

export default Skills;
