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
  const isBento = designMode === 'bento';
  const isEditorial = designMode === 'editorial';
  const isRetro = designMode === 'retro';

  return (
    <section id="about" className="py-16 md:py-20 relative bg-brutal-grid">
      <div className="max-w-7xl mx-auto px-4">
        <Heading
          text="THE NAVIGATOR'S CHRONICLE"
          tag="// ORIGIN & ENGINEERING PHILOSOPHY"
          index={waypointIndex || 'WAYPOINT_04'}
        />

        {/* ══════════════════════════════════════════════════════
             MODE 1: RETRO / VINTAGE SYSTEM SPECIFICATION SPREAD
        ══════════════════════════════════════════════════════ */}
        {isRetro ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4 font-mono">
            {/* Left Col: Machine Architecture Dossier (7 cols) */}
            <div className="lg:col-span-7 retro-window p-1">
              <div className="bg-[#38322b] px-3 py-1.5 flex items-center justify-between text-xs text-white border-b border-[#5a5247]">
                <div className="flex items-center gap-2">
                  <span className="text-accent font-bold">■</span>
                  <span className="font-pixel text-[11px] text-accent">HARDWARE_PROFILE // ASHISH_CHANCHAL</span>
                </div>
                <span className="text-[10px] text-zinc-300">FORMAT: ASCII_TXT</span>
              </div>

              <div className="p-5 sm:p-7 bg-[#1a1714] flex flex-col justify-between gap-5">
                <div>
                  <h3 className="font-pixel text-xl sm:text-2xl text-white tracking-wide mb-4">
                    &gt; BUILDING SCALABLE SYSTEMS <br />
                    <span className="text-accent">FROM FOUNDATIONAL CODE TO AI.</span>
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-mono">
                    <p className="p-2.5 bg-[#12100e] border border-[#3d362e]">
                      &gt; I am a Software Developer and AI Engineer based in Noida, Uttar Pradesh, India.
                      My journey spans designing resilient backend microservices in NestJS, crafting
                      interactive frontend systems in React and Three.js, and training clinical ML models at DRDO.
                    </p>
                    <p className="p-2.5 bg-[#12100e] border border-[#3d362e]">
                      &gt; Whether orchestrating automated deployment pipelines on Azure Cloud or pushing the
                      frontiers of conversational voice AI latency, I focus on ruthless execution and
                      unapologetic software quality.
                    </p>
                  </div>
                </div>

                {setSelectedItem && (
                  <div className="pt-3 border-t border-[#3d362e] flex items-center justify-between">
                    <span className="text-xs text-zinc-500">[FILE: BIO_FULL.DAT]</span>
                    <button
                      onClick={() => {
                        if (setSelectedItem) setSelectedItem(2);
                      }}
                      className="retro-btn px-3 py-1.5 text-xs font-pixel flex items-center gap-1"
                    >
                      <span>▶</span>
                      <span>READ_FULL_DOSSIER</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: System Protocols (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="retro-window p-2.5 bg-[#2a2520] border border-[#5a5247] flex items-center justify-between text-xs font-pixel text-accent">
                <span>&gt;&gt; CORE SYSTEM PROTOCOLS</span>
                <span className="text-white">v2.0</span>
              </div>

              {PRINCIPLES.map((p) => (
                <div key={p.code} className="retro-window p-1">
                  <div className="bg-[#24201c] px-3 py-1 flex items-center justify-between text-[11px] border-b border-[#3d362e]">
                    <span className="text-accent font-bold font-pixel">PROTOCOL #{p.code}</span>
                    <span className="text-zinc-400 font-pixel text-[10px]">{p.title}</span>
                  </div>
                  <div className="p-3 bg-[#181512] text-xs text-zinc-300 leading-relaxed font-mono">
                    {p.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

        ) : isEditorial ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
            {/* Left Col: The Feature Essay (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-[#0e0e12] border border-white/12 rounded-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-[10px] text-zinc-400">
                  <span className="font-serif italic text-accent font-bold text-xs">FEATURE PROFILE</span>
                  <span>ISSUE NO. 01</span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight italic mb-4 leading-snug">
                  Building scalable systems <br />
                  <span className="text-accent not-italic">from foundational code to AI.</span>
                </h3>

                <div className="space-y-3.5 font-serif text-sm text-zinc-300 leading-relaxed">
                  <p className="editorial-dropcap">
                    I am a Software Developer and AI Engineer based in Noida, Uttar Pradesh, India.
                    My journey spans designing resilient backend microservices in NestJS, crafting
                    interactive frontend systems in React and Three.js, and training clinical ML models at DRDO.
                  </p>
                  <p className="border-l-2 border-accent pl-4 italic text-zinc-400">
                    "Whether orchestrating automated deployment pipelines on Azure Cloud or pushing the
                    frontiers of conversational voice AI latency, I focus on ruthless execution and
                    unapologetic software quality."
                  </p>
                </div>
              </div>

              {setSelectedItem && (
                <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between font-serif">
                  <span className="text-xs italic text-zinc-400">Archived Biography</span>
                  <Button text="Read Complete Chronicle" link="/about-me" setSelectedItem={setSelectedItem} id={2} variant="accent" size="sm" />
                </div>
              )}
            </div>

            {/* Right Col: Core Tenets & Gazette Index (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-4 bg-[#121216] border border-white/10 rounded-md flex items-center justify-between font-serif">
                <span className="font-editorial text-sm font-bold text-white italic">Core Engineering Tenets</span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">EST. 2024</span>
              </div>

              {PRINCIPLES.map((p) => (
                <div
                  key={p.code}
                  className="p-5 bg-[#0e0e12] border border-white/10 rounded-md transition-all hover:border-white/20 flex flex-col gap-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-editorial italic font-bold text-accent text-sm">#{p.code}</span>
                    <h4 className="font-editorial font-bold text-white text-base tracking-wide italic">{p.title}</h4>
                  </div>
                  <p className="font-serif text-xs text-zinc-400 leading-relaxed italic">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

        ) : isBento ? (
          /* ── Bento layout ── */
          <div className="grid grid-cols-12 gap-4 mt-2">
            {/* Bio card — wide left (8 cols) */}
            <div className="col-span-12 lg:col-span-8 bento-tile p-6 sm:p-8 flex flex-col gap-5">
              <div>
                <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-white tracking-tight mb-4">
                  Building scalable systems <br />
                  <span className="text-accent">from foundational code to AI.</span>
                </h3>
                <div className="space-y-3 text-sm text-zinc-400 leading-relaxed font-sans">
                  {description && description.length > 0 ? (
                    description.map((desc) => (
                      <p key={desc.id} className="border-l-2 border-accent/30 pl-4">
                        {desc.description}
                      </p>
                    ))
                  ) : (
                    <>
                      <p className="border-l-2 border-accent/30 pl-4">
                        I'm a Software Developer and AI Engineer based in Noida, Uttar Pradesh, India.
                        My journey spans designing resilient backend microservices in NestJS, crafting
                        interactive frontend systems in React and Three.js, and training clinical ML models at DRDO.
                      </p>
                      <p className="border-l-2 border-white/10 pl-4">
                        Whether orchestrating automated deployment pipelines on Azure Cloud or pushing the
                        frontiers of conversational voice AI latency, I focus on ruthless execution and
                        unapologetic software quality.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {setSelectedItem && (
                <div className="pt-4 border-t border-white/8 flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-500">Read complete background</span>
                  <Button text="Full Chronicle" link="/about-me" setSelectedItem={setSelectedItem} id={2} variant="accent" size="sm" />
                </div>
              )}
            </div>

            {/* Tenet header pill — right top (4 cols) */}
            <div className="col-span-12 lg:col-span-4 bento-tile p-5 flex items-center justify-between">
              <span className="font-heading font-semibold text-white text-sm">Core Engineering Tenets</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25 font-mono font-bold">V2.0</span>
            </div>

            {/* 3 principle tiles — each 4 cols */}
            {PRINCIPLES.map((p) => (
              <div key={p.code} className="col-span-12 sm:col-span-6 lg:col-span-4 bento-tile p-5 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-accent">[{p.code}]</span>
                  <h4 className="font-heading font-semibold text-white text-sm tracking-tight">{p.title}</h4>
                </div>
                <div className="h-px bg-gradient-to-r from-accent/20 to-transparent" />
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          /* ── Classic layout (minimalist / brutalist) ── */
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

                <h3 className={`text-2xl sm:text-3xl font-heading text-white tracking-tight mb-4 ${isMinimal ? 'font-bold' : 'font-black uppercase'}`}>
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
                        I'm a Software Developer and AI Engineer based in Noida, Uttar Pradesh, India.
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
                    <Button text="Full Chronicle" link="/about-me" setSelectedItem={setSelectedItem} id={2} variant="accent" size="sm" />
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
                    <h4 className={`text-white font-heading text-sm ${isMinimal ? 'font-semibold' : 'font-black uppercase tracking-wide'}`}>{p.title}</h4>
                  </div>
                  <p className={`text-xs text-zinc-400 leading-relaxed ${isMinimal ? 'font-sans' : 'font-mono'}`}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
