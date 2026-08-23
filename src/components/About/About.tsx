import React from 'react';
import Heading from '../shared/Heading';
import Button from '../shared/Button';
import { useTheme } from '../../context/ThemeContext';

interface AboutProps {
  id: number;
  description: string;
}

const PRINCIPLES = [
  {
    code: '01',
    title: 'LOW LATENCY BY DEFAULT',
    desc: 'Cutting AI voice response from 15s to 3s with function streaming and WebSocket architectures.',
  },
  {
    code: '02',
    title: 'MICROSERVICES & SCALABILITY',
    desc: 'NestJS, gRPC, and Azure DevOps CI/CD designed for fault tolerance and rapid scale.',
  },
  {
    code: '03',
    title: 'IMMERSIVE INTERACTION',
    desc: 'Bringing web experiences alive with WebGL, Three.js 3D avatars, and high-precision UI systems.',
  },
];

const About: React.FC<{
  setSelectedItem?: React.Dispatch<React.SetStateAction<number>>;
  description?: AboutProps[];
  waypointIndex?: string;
}> = ({ setSelectedItem, description, waypointIndex }) => {
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';

  return (
    <section id="about" className="py-16 md:py-20 relative bg-brutal-grid">
      <div className="max-w-7xl mx-auto px-4">
        <Heading
          text="THE NAVIGATOR'S CHRONICLE"
          tag="// ORIGIN & ENGINEERING PHILOSOPHY"
          index={waypointIndex || 'WAYPOINT_04'}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          {/* Left Column: Narrative Story & Manifesto (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className={`p-6 md:p-8 transition-all ${
                isMinimal
                  ? 'bg-zinc-900/40 border border-zinc-800/80 rounded-2xl backdrop-blur-md shadow-xl shadow-black/40'
                  : 'bg-[#121212] border-2 border-white shadow-brutal hover:shadow-brutal-accent brutal-card'
              }`}
            >
              <div className={`flex items-center gap-2 pb-3 mb-4 ${isMinimal ? 'border-b border-zinc-800/60' : 'border-b-2 border-[#262626]'}`}>
                <span className={`w-2.5 h-2.5 inline-block ${isMinimal ? 'rounded-full bg-accent' : 'bg-accent border border-black'}`}></span>
                <span className="font-mono text-xs text-accent uppercase font-bold">
                  {isMinimal ? 'Background & Story' : 'SUBJECT: ASHISH CHANCHAL // BIO_DOSSIER'}
                </span>
              </div>

              <h3
                className={`text-2xl sm:text-3xl font-heading text-white tracking-tight mb-4 ${
                  isMinimal ? 'font-bold' : 'font-black uppercase'
                }`}
              >
                Building scalable systems <br />
                <span className="text-accent">from foundational code to AI.</span>
              </h3>

              <div className={`space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed ${isMinimal ? 'font-sans' : 'font-mono'}`}>
                {description && description.length > 0 ? (
                  description.map((desc) => (
                    <p key={desc.id} className={isMinimal ? 'border-l-2 border-zinc-700 pl-3.5' : 'border-l-2 border-accent pl-3'}>
                      {desc.description}
                    </p>
                  ))
                ) : (
                  <>
                    <p className={isMinimal ? 'border-l-2 border-zinc-700 pl-3.5' : 'border-l-2 border-accent pl-3'}>
                      I’m a Software Developer and AI Engineer based in Noida, Uttar Pradesh, India.
                      My journey spans designing resilient backend microservices in NestJS, crafting
                      interactive frontend systems in React and Three.js, and training clinical ML models at DRDO.
                    </p>
                    <p className={isMinimal ? 'border-l-2 border-accent/60 pl-3.5' : 'border-l-2 border-accentSec pl-3'}>
                      Whether orchestrating automated deployment pipelines on Azure Cloud or pushing the
                      frontiers of conversational voice AI latency, I focus on ruthless execution and
                      unapologetic software quality.
                    </p>
                  </>
                )}
              </div>

              {setSelectedItem && (
                <div className={`mt-6 pt-4 flex items-center justify-between ${isMinimal ? 'border-t border-zinc-800/60' : 'border-t-2 border-[#262626]'}`}>
                  <span className="font-mono text-xs text-zinc-500">Read complete background</span>
                  <Button
                    text="Full Chronicle"
                    link="/about-me"
                    setSelectedItem={setSelectedItem}
                    id={2}
                    variant="accent"
                    size="sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Core Engineering Tenets (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div
              className={`p-4 flex items-center justify-between ${
                isMinimal
                  ? 'bg-zinc-900/60 border border-zinc-800 text-white rounded-2xl font-mono text-sm font-semibold'
                  : 'bg-accent text-black border-2 border-black font-mono font-black text-sm uppercase shadow-[4px_4px_0px_0px_#ffffff]'
              }`}
            >
              <span>{isMinimal ? 'Core Engineering Tenets' : '■ CORE CODE TENETS'}</span>
              <span className={`text-xs px-2 py-0.5 font-bold ${isMinimal ? 'rounded-full bg-zinc-800 text-accent border border-zinc-700' : 'bg-black text-accent border border-black'}`}>V2.0</span>
            </div>

            {PRINCIPLES.map((p) => (
              <div
                key={p.code}
                className={`p-4 transition-all ${
                  isMinimal
                    ? 'bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl backdrop-blur-sm'
                    : 'bg-[#121212] border-2 border-white shadow-brutal hover:shadow-brutal-accent brutal-card'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5 font-mono text-xs">
                  <span className="text-accent font-bold">[{p.code}]</span>
                  <h4 className={`text-white font-heading text-sm ${isMinimal ? 'font-semibold' : 'font-black uppercase tracking-wide'}`}>
                    {p.title}
                  </h4>
                </div>
                <p className={`text-xs text-zinc-400 leading-relaxed ${isMinimal ? 'font-sans' : 'font-mono'}`}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
