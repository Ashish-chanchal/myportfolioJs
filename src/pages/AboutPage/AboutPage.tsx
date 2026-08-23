import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import HeadingSec from '../../components/shared/HeadingSec';
import Skills from '../../components/Skills/Skills';
import FunFacts from '../../components/Funfacts/FunFacts';
import Button from '../../components/shared/Button';
import { useTheme } from '../../context/ThemeContext';

const facts = [
  { id: 1, facts: 'Winter enthusiast > Summer heat anytime' },
  { id: 2, facts: 'Night bike rides across the city with friends' },
  { id: 3, facts: 'Fuel: Neapolitan Pizza, espresso, and spicy pasta' },
  { id: 4, facts: 'Favorite cinematic inspiration: Dil Bechara' },
];

const MILESTONES = [
  {
    phase: 'STAGE_01',
    title: 'THE SPARK & SELF-TAUGHT FOUNDATIONS',
    desc: 'Began building websites from scratch, mastering JavaScript, modern web standards, and UI architecture. Relentless curiosity for system performance.',
    badge: 'ORIGIN',
  },
  {
    phase: 'STAGE_02',
    title: 'CLINICAL NEURAL RESEARCH AT DRDO',
    desc: 'Conducted high-density EEG neural data analysis at INMAS (DRDO). Engineered Random Forest and Decision Tree models hitting 88.89% Parkinson detection accuracy.',
    badge: 'RESEARCH',
  },
  {
    phase: 'STAGE_03',
    title: 'VOICE AI & 3D WEB AVATARS',
    desc: 'At Alphadroid / HeyAlpha, slashed voice AI latency from 15s to 3s with MultiModel Function Calling and rendered 3D humanoid characters in the browser with WebGL/Three.js.',
    badge: 'AI SYSTEMS',
  },
  {
    phase: 'STAGE_04',
    title: 'ENTERPRISE MICROSERVICES & CLOUD ARCHITECTURE',
    desc: 'At Studio Sonrai, engineered scalable NestJS microservice backends, automated Azure Cloud schedulers, and built cross-platform mobile apps with Capacitor & Ionic.',
    badge: 'CLOUD & ENTERPRISE',
  },
];

const AboutPage: React.FC<{
  setSelectedItem?: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setSelectedItem }) => {
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';
  const isBento = designMode === 'bento';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen pb-20">
      <Helmet>
        <title>About // Ashish Chanchal - Software Developer & AI Engineer</title>
        <meta
          name="description"
          content="Learn about Ashish Chanchal's background, journey as a self-taught software developer, AI engineer, DRDO researcher, and enterprise microservices architect."
        />
      </Helmet>

      {/* Heading Sec */}
      <HeadingSec
        title="THE_CHRONICLE"
        description="The story, evolutionary roadmap, and engineering philosophy behind the code."
        waypoint="LOGBOOK // WAYPOINT_04_DEEP_BIO"
      />

      <div className="max-w-7xl mx-auto px-4 mt-6">
        {/* Main Bio Card */}
        <div
          className={`p-6 md:p-8 mb-12 transition-all ${
            isBento
              ? 'bento-tile'
              : isMinimal
              ? 'bg-zinc-900/40 border border-zinc-800/80 rounded-2xl backdrop-blur-md shadow-xl shadow-black/40'
              : 'bg-[#121212] border-2 border-white shadow-brutal hover:shadow-brutal-accent brutal-card'
          }`}
        >
          <div className={`flex items-center justify-between pb-3 mb-6 ${isBento ? 'border-b border-white/10' : isMinimal ? 'border-b border-zinc-800/60' : 'border-b-2 border-[#262626]'}`}>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 inline-block ${isBento ? 'rounded-full bg-accent animate-pulse' : isMinimal ? 'rounded-full bg-accent' : 'bg-accent border border-black'}`}></span>
              <span className="font-mono text-xs text-accent font-bold uppercase tracking-wider">
                {isMinimal || isBento ? 'Subject Dossier: Ashish Chanchal' : 'SUBJECT DOSSIER: ASHISH CHANCHAL'}
              </span>
            </div>
            <span className={`font-mono text-xs ${isMinimal || isBento ? 'text-zinc-400' : 'text-accentSec'}`}>NOIDA, UTTAR PRADESH, INDIA</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className={`lg:col-span-8 space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed ${isMinimal || isBento ? 'font-sans' : 'font-mono'}`}>
              <h2 className={`text-2xl sm:text-3xl font-heading text-white tracking-tight mb-4 ${isMinimal || isBento ? 'font-bold' : 'font-black uppercase'}`}>
                Turning curiosity into <br />
                <span className="text-accent">high-throughput reality.</span>
              </h2>

              <p className={isMinimal || isBento ? 'border-l-2 border-zinc-700 pl-3.5' : 'border-l-2 border-accent pl-3'}>
                I am a self-taught Software Developer and AI Engineer based in Noida, Uttar Pradesh, India.
                Over the past several years, I have architected and shipped complete web and mobile ecosystems,
                scalable cloud-native microservices, and cutting-edge GenAI applications.
              </p>

              <p className={isMinimal || isBento ? 'border-l-2 border-zinc-700 pl-3.5' : 'border-l-2 border-accentSec pl-3'}>
                My approach to engineering is grounded in first principles: measure real-world performance,
                keep architectures clear and resilient, and eliminate latency bottlenecks wherever they hide.
              </p>

              <p className={isMinimal || isBento ? 'border-l-2 border-accent/60 pl-3.5' : 'border-l-2 border-[#00FF66] pl-3'}>
                When I’m not writing NestJS microservices or tuning LLM function calls, you’ll find me exploring
                modern web graphics (WebGL & Three.js), participating in technical communities, or testing the latest
                advances in distributed systems.
              </p>

              <div className="pt-4 flex flex-wrap gap-3">
                <Button
                  text="Dispatch Message"
                  link="/contact-me"
                  setSelectedItem={setSelectedItem}
                  id={3}
                  variant="accent"
                  size="md"
                />
                <Button
                  text="Download Full CV"
                  link="https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link"
                  variant="white"
                  size="md"
                  external
                />
              </div>
            </div>

            {/* Quick Spec Box */}
            <div
              className={`lg:col-span-4 p-5 font-mono text-xs space-y-3 ${
                isBento
                  ? 'rounded-2xl bg-white/4 border border-white/10'
                  : isMinimal
                  ? 'bg-zinc-950/60 border border-zinc-800/80 rounded-2xl'
                  : 'bg-[#181818] border-2 border-white shadow-brutal-sm'
              }`}
            >
              <div className={`text-accent font-bold pb-2 ${isBento ? 'border-b border-white/10' : isMinimal ? 'border-b border-zinc-800/60' : 'border-b border-[#333]'}`}>
                {isMinimal || isBento ? 'Telemetry Summary' : '// TELEMETRY SUMMARY'}
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">SPECIALTY:</span>
                <span className="text-white font-bold">FULL-STACK & AI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">BACKEND:</span>
                <span className="text-white font-bold">NESTJS / FASTAPI / GRPC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">FRONTEND:</span>
                <span className="text-white font-bold">REACT / NEXT / THREEJS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">AI STACK:</span>
                <span className="text-white font-bold">OPENAI / GEMINI / MNE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">CLOUD:</span>
                <span className="text-white font-bold">AZURE / DEVOPS / DOCKER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Evolutionary Stages / Milestones */}
        <div className="mb-16">
          <div
            className={`p-4 mb-6 flex items-center justify-between ${
              isBento
                ? 'bento-tile'
                : isMinimal
                ? 'bg-zinc-900/60 border border-zinc-800 text-white rounded-2xl font-mono text-sm font-semibold'
                : 'bg-accent text-black font-heading font-black text-lg border-2 border-black shadow-[4px_4px_0px_0px_#ffffff] uppercase'
            }`}
          >
            <span className={isBento ? 'font-heading font-semibold text-white text-base' : ''}>
              {isBento ? 'Chronological Evolution Stages' : isMinimal ? 'Chronological Evolution Stages' : '■ CHRONOLOGICAL EVOLUTION STAGES'}
            </span>
            <span className={`font-mono text-xs px-2.5 py-0.5 font-bold ${isBento ? 'rounded-full bg-accent/15 text-accent border border-accent/25' : isMinimal ? 'rounded-full bg-zinc-800 text-accent border border-zinc-700' : 'bg-black text-accent border border-black'}`}>
              4 MILESTONES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MILESTONES.map((m) => (
              <div
                key={m.phase}
                className={`p-5 transition-all ${
                  isBento
                    ? 'bento-tile'
                    : isMinimal
                    ? 'bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 rounded-2xl backdrop-blur-sm'
                    : 'bg-[#121212] border-2 border-white shadow-brutal hover:shadow-brutal-accent brutal-card'
                }`}
              >
                <div className={`flex items-center justify-between pb-2 mb-3 font-mono text-xs ${isBento ? 'border-b border-white/10' : isMinimal ? 'border-b border-zinc-800/60' : 'border-b border-[#262626]'}`}>
                  <span className="text-accent font-bold">[{m.phase}]</span>
                  <span className={`px-2 py-0.5 ${isBento ? 'rounded-full bg-accent/10 text-accent border border-accent/20 text-[11px]' : isMinimal ? 'rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 text-[11px]' : 'bg-[#1f1f1f] text-accent border border-[#333]'}`}>
                    {m.badge}
                  </span>
                </div>
                <h3 className={`text-base text-white mb-2 ${isBento || isMinimal ? 'font-heading font-semibold' : 'font-heading font-black uppercase'}`}>
                  {m.title}
                </h3>
                <p className={`text-xs text-zinc-400 leading-relaxed ${isBento || isMinimal ? 'font-sans' : 'font-mono'}`}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Loadout */}
        <Skills waypointIndex="WAYPOINT_03_MATRIX" />

        {/* Fun Facts */}
        <FunFacts facts={facts} />
      </div>
    </div>
  );
};

export default AboutPage;
