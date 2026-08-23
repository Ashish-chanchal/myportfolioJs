import React from 'react';
import Heading from '../shared/Heading';
import Button from '../shared/Button';

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
            <div className="bg-[#121212] border-2 border-white p-6 md:p-8 shadow-brutal hover:shadow-brutal-accent brutal-card">
              <div className="flex items-center gap-2 pb-3 border-b-2 border-[#262626] mb-4">
                <span className="w-2.5 h-2.5 bg-accent inline-block border border-black"></span>
                <span className="font-mono text-xs text-accent uppercase font-bold">
                  SUBJECT: ASHISH CHANCHAL // BIO_DOSSIER
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-tight mb-4">
                BUILDING SCALABLE REALMS <br />
                <span className="text-accent">FROM CODE TO INTELLIGENCE.</span>
              </h3>

              <div className="space-y-3 font-mono text-xs sm:text-sm text-[#D4D4D4] leading-relaxed">
                {description && description.length > 0 ? (
                  description.map((desc) => (
                    <p key={desc.id} className="border-l-2 border-accent pl-3">
                      {desc.description}
                    </p>
                  ))
                ) : (
                  <>
                    <p className="border-l-2 border-accent pl-3">
                      I’m a Software Developer and AI Engineer based in Noida, Uttar Pradesh, India.
                      My journey spans designing resilient backend microservices in NestJS, crafting
                      interactive frontend systems in React and Three.js, and training clinical ML models at DRDO.
                    </p>
                    <p className="border-l-2 border-accentSec pl-3">
                      Whether orchestrating automated deployment pipelines on Azure Cloud or pushing the
                      frontiers of conversational voice AI latency, I focus on ruthless execution and
                      unapologetic software quality.
                    </p>
                  </>
                )}
              </div>

              {setSelectedItem && (
                <div className="mt-6 pt-4 border-t-2 border-[#262626] flex items-center justify-between">
                  <span className="font-mono text-xs text-[#888888]">FULL BACKSTORY AVAILABLE</span>
                  <Button
                    text="Read Chronicle"
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
            <div className="bg-accent text-black border-2 border-black p-4 font-mono font-black text-sm uppercase shadow-[4px_4px_0px_0px_#ffffff] flex items-center justify-between">
              <span>■ CORE CODE TENETS</span>
              <span className="text-xs bg-black text-accent px-2 py-0.5 border border-black font-bold">V2.0</span>
            </div>

            {PRINCIPLES.map((p) => (
              <div
                key={p.code}
                className="bg-[#121212] border-2 border-white p-4 shadow-brutal hover:shadow-brutal-accent brutal-card"
              >
                <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                  <span className="text-accent font-bold">[{p.code}]</span>
                  <h4 className="text-white font-heading font-black text-sm uppercase tracking-wide">
                    {p.title}
                  </h4>
                </div>
                <p className="font-mono text-xs text-[#A3A3A3] leading-relaxed">
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
