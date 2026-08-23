import { useState, useEffect } from 'react';
import Button from '../shared/Button';
import heromain from '../../assets/hero/heromain.webp';
import { useTheme } from '../../context/ThemeContext';

const ROLES = [
  'SOFTWARE DEVELOPER',
  'AI & LLM ENGINEER',
  'FULL-STACK ARCHITECT',
  'SYSTEMS BUILDER',
];

const METRICS = [
  { label: 'EXPERIENCE', val: '2+ YRS', sub: 'Industry & Systems' },
  { label: 'PRODUCTION', val: '10+ APPS', sub: 'Deployed End-to-End' },
  { label: 'VOICE AI LATENCY', val: '<3 SEC', sub: 'Optimized from 15s' },
  { label: 'ML DIAGNOSTICS', val: '88.9%', sub: 'EEG Classification' },
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const { designMode } = useTheme();
  const isMinimal = designMode === 'minimalist';

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="pt-28 md:pt-36 pb-12 relative overflow-hidden bg-brutal-grid">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Status Bar */}
        <div className={`flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 ${isMinimal ? 'border-b border-zinc-800/80' : 'border-b-2 border-[#262626]'}`}>
          <div className="flex items-center gap-2">
            <span
              className={
                isMinimal
                  ? 'px-3 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs font-medium'
                  : 'bg-accent text-black font-mono font-black text-xs px-2 py-0.5 border border-black shadow-[2px_2px_0px_0px_#ffffff]'
              }
            >
              {isMinimal ? 'PART 00' : 'WAYPOINT_00'}
            </span>
            <span className={`font-mono text-xs font-bold uppercase tracking-wider ${isMinimal ? 'text-zinc-400' : 'text-accentSec'}`}>
              {isMinimal ? 'Introduction & Focus' : '// DEPARTURE // MISSION_INITIATED'}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] inline-block animate-pulse"></span>
            <span className="text-zinc-300 font-medium">STATUS: OPERATIONAL</span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Heading & Narrative (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <div
                className={`inline-block text-xs font-mono font-bold mb-4 ${
                  isMinimal
                    ? 'px-3.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-accent'
                    : 'bg-[#161616] border-2 border-white px-3 py-1 text-accent shadow-brutal-sm'
                }`}
              >
                {isMinimal ? '👋 Hi, I\'m Ashish Chanchal' : 'HELLO_WORLD // ASHISH CHANCHAL'}
              </div>

              {isMinimal ? (
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold text-white tracking-tight leading-[1.1]">
                  Engineering scalable <br />
                  <span className="text-accent underline decoration-zinc-700 decoration-2 underline-offset-8">
                    intelligent systems
                  </span> <br />
                  across code & AI.
                </h1>
              ) : (
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black text-white uppercase tracking-tight leading-[1.1]">
                  ENGINEERING <br />
                  <span
                    className="inline-block px-3 py-1 border-2 border-white my-2 font-black uppercase text-black"
                    style={{
                      backgroundColor: 'var(--accent-primary, #00F0FF)',
                      boxShadow: '4px 4px 0px 0px #ffffff',
                    }}
                  >
                    THE JOURNEY
                  </span>
                  <br />
                  ACROSS CODE & AI.
                </h1>
              )}
            </div>

            {/* Dynamic Role Rotator Box */}
            <div
              className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isMinimal
                  ? 'bg-zinc-900/40 border border-zinc-800/80 rounded-2xl backdrop-blur-sm shadow-md'
                  : 'bg-[#121212] border-2 border-white shadow-brutal'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-accent font-mono font-black text-sm">▶</span>
                <span className="font-mono text-xs text-zinc-400 uppercase">CURRENT SPECIALIZATION:</span>
                <span className="font-mono text-sm sm:text-base font-bold text-white tracking-wide">
                  {ROLES[roleIndex]}
                </span>
              </div>
              <span
                className={`font-mono text-[10px] self-start sm:self-auto px-2.5 py-0.5 ${
                  isMinimal
                    ? 'rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700'
                    : 'text-[#666666] border border-[#333333] bg-[#121212]'
                }`}
              >
                SYS_THREAD_OK
              </span>
            </div>

            {/* Narrative Bio */}
            <p
              className={`text-sm sm:text-base text-zinc-300 leading-relaxed ${
                isMinimal
                  ? 'p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 font-sans'
                  : 'font-mono border-l-4 border-accent pl-4 py-1 bg-[#121212]/80'
              }`}
            >
              Software Developer and AI Systems Engineer based in India. I specialize in designing
              high-performance distributed NestJS microservices, native Model Context Protocol (MCP) workflows,
              real-time voice AI pipelines, and clinical ML models. Focused on building low-latency, intuitive,
              and resilient digital architectures.
            </p>

            {/* Hero Action Button Cluster */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                text="Explore Work ↓"
                onClick={() => scrollToSection('projects')}
                variant="accent"
                size="md"
              />
              <Button
                text="Experience Timeline"
                onClick={() => scrollToSection('experience')}
                variant="dark"
                size="md"
              />
              <Button
                text="Download CV"
                link="https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link"
                variant="white"
                size="md"
                external
              />
            </div>
          </div>

          {/* Right Column: Profile Photo — Floating Natural Portrait */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative w-full max-w-xs sm:max-w-sm flex items-center justify-center">
              {/* Ambient glow behind the image */}
              <div className="absolute inset-[-20%] bg-gradient-to-tr from-accent/25 via-purple-500/15 to-pink-500/15 rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />

              {/* Profile image — circle-shaped, naturally floating */}
              <div className="relative w-full group">
                <img
                  src={heromain}
                  alt="Ashish Chanchal"
                  className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Floating Status Badge */}
                <div className="absolute top-6 left-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-white shadow-lg">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Available for Projects</span>
                </div>

                {/* Floating Experience Capsule */}
                <div className="absolute bottom-6 right-0 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-300 shadow-lg">
                  <span className="text-accent font-bold">2+ YRS</span> · INDIA
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {METRICS.map((metric, idx) => (
            <div
              key={idx}
              className={`p-4 transition-all brutal-card ${
                isMinimal
                  ? 'rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm'
                  : 'bg-[#121212] border-2 border-white shadow-brutal hover:shadow-brutal-accent'
              }`}
            >
              <div className="font-mono text-[10px] text-zinc-500 font-bold uppercase mb-1">
                [{`0${idx + 1}`}] {metric.label}
              </div>
              <div className="text-2xl sm:text-3xl font-heading font-bold text-accent tracking-tight">
                {metric.val}
              </div>
              <div className="font-mono text-xs text-zinc-400 mt-1">
                {metric.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Marquee Ticker Banner */}
      <div className={`mt-12 py-2.5 overflow-hidden select-none font-mono text-xs sm:text-sm tracking-wider uppercase ${isMinimal ? 'bg-zinc-950/80 border-y border-zinc-800/80 text-zinc-300' : 'bg-[#141414] text-accent border-y-2 border-white shadow-brutal-sm font-black'}`}>
        <div className="animate-marquee whitespace-nowrap flex items-center">
          <span className="mx-4 text-white">● ASHISH CHANCHAL</span>
          <span className="mx-4 text-accentSec">● FULL-STACK DEVELOPMENT</span>
          <span className="mx-4 text-accent">● AI & LLM AGENTS</span>
          <span className="mx-4 text-[#00FF66]">● NESTJS MICROSERVICES</span>
          <span className="mx-4 text-white">● REACT & REACT NATIVE</span>
          <span className="mx-4 text-accent">● THREE.JS & WEBGL</span>
          <span className="mx-4 text-accentSec">● FASTAPI & PYTHON</span>
          <span className="mx-4 text-[#00FF66]">● AZURE CLOUD & CI/CD</span>
          <span className="mx-4 text-white">● ASHISH CHANCHAL</span>
          <span className="mx-4 text-accentSec">● FULL-STACK DEVELOPMENT</span>
          <span className="mx-4 text-accent">● AI & LLM AGENTS</span>
          <span className="mx-4 text-[#00FF66]">● NESTJS MICROSERVICES</span>
          <span className="mx-4 text-white">● REACT & REACT NATIVE</span>
          <span className="mx-4 text-accent">● THREE.JS & WEBGL</span>
          <span className="mx-4 text-accentSec">● FASTAPI & PYTHON</span>
          <span className="mx-4 text-[#00FF66]">● AZURE CLOUD & CI/CD</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
