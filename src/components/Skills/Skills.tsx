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

  return (
    <section id="skills" className="py-16 md:py-20 relative bg-brutal-dots">
      <div className="max-w-7xl mx-auto px-4">
        <Heading
          text="TECH LOADOUT & CAPABILITIES"
          tag="// ARSENAL OF CODE & TOOLS"
          index={waypointIndex || 'WAYPOINT_03'}
        />

        {/* Loadout Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {techData.map((tech) => (
            <div key={tech.id} className="h-full">
              <Box
                category={tech.category}
                technologies={tech.technologies}
                accentColor={tech.accent}
              />
            </div>
          ))}
        </div>

        {/* Engineering Tenet Footer Strip */}
        <div
          className={`mt-8 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs ${
            isMinimal
              ? 'rounded-2xl bg-zinc-900/40 border border-zinc-800/80 text-zinc-400 backdrop-blur-sm shadow-md'
              : 'bg-[#121212] border-2 border-white shadow-brutal text-[#A3A3A3]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-accent font-bold">⚡ STACK PHILOSOPHY:</span>
            <span>Right tool for high throughput, sub-second latency, and maintainable type safety.</span>
          </div>
          <span
            className={`px-2.5 py-1 ${
              isMinimal
                ? 'rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700 font-medium'
                : 'text-white font-bold bg-[#1e1e1e] border border-[#333]'
            }`}
          >
            100% PRODUCTION READY
          </span>
        </div>
      </div>
    </section>
  );
};

export default Skills;
