import { useState, useEffect } from 'react';
import Button from '../shared/Button';
import heromain from '../../assets/hero/heromain.webp';

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
        {/* Top Waypoint Log Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b-2 border-[#262626]">
          <div className="flex items-center gap-2">
            <span className="bg-accent text-black font-mono font-black text-xs px-2 py-0.5 border border-black shadow-[2px_2px_0px_0px_#ffffff]">
              WAYPOINT_00
            </span>
            <span className="text-accentSec font-mono text-xs font-bold uppercase tracking-widest">
              // DEPARTURE // MISSION_INITIATED
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#888888]">
            <span className="w-2 h-2 bg-[#00FF66] inline-block border border-black animate-ping"></span>
            <span className="text-white font-bold">STATUS: OPERATIONAL</span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Heading & Narrative (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <div className="inline-block bg-[#161616] border-2 border-white px-3 py-1 text-xs font-mono text-accent font-bold mb-4 shadow-brutal-sm">
                HELLO_WORLD // ASHISH CHANCHAL
              </div>

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
            </div>

            {/* Dynamic Role Terminal Box */}
            <div className="bg-[#121212] border-2 border-white p-4 shadow-brutal flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-accent font-mono font-black text-sm">▶</span>
                <span className="font-mono text-xs text-[#888888] uppercase">SPECIALIZATION:</span>
                <span className="font-mono text-sm sm:text-base font-black text-accent tracking-wider">
                  {ROLES[roleIndex]}
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#666666] border border-[#333333] px-2 py-0.5 self-start sm:self-auto">
                SYS_THREAD_OK
              </span>
            </div>

            {/* Narrative Bio */}
            <p className="font-mono text-sm sm:text-base text-[#D4D4D4] leading-relaxed border-l-4 border-accent pl-4 py-1 bg-[#121212]/80">
              Passionate Software Developer and AI Systems Engineer. From designing high-performance
              distributed NestJS microservices and real-time voice AI pipelines to training clinical EEG
              machine learning models at DRDO — every project is a milestone on the journey to craft
              ultra-fast, intuitive digital products.
            </p>

            {/* Hero Action Button Cluster */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                text="Start Journey ↓"
                onClick={() => scrollToSection('experience')}
                variant="accent"
                size="md"
              />
              <Button
                text="View Artifacts"
                onClick={() => scrollToSection('projects')}
                variant="accentSec"
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

          {/* Right Column: Dossier Card & Photo (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Brutalist Pilot Dossier Box */}
            <div className="bg-[#121212] border-2 border-white shadow-brutal-accent p-4 relative">
              {/* Dossier Header */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-white mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-accent inline-block border border-black"></span>
                  <span className="font-mono font-black text-xs text-white uppercase">
                    PILOT_DOSSIER // 00-ASHISH
                  </span>
                </div>
                <span className="font-mono text-[10px] bg-[#1f1f1f] text-[#00FF66] px-1.5 py-0.5 border border-[#333]">
                  READY
                </span>
              </div>

              {/* Photo Frame with Brutalist Border & Stamp */}
              <div className="relative border-2 border-white bg-[#0a0a0a] overflow-hidden group">
                <img
                  src={heromain}
                  alt="Ashish Chanchal"
                  className="w-full h-80 sm:h-96 object-cover object-top grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute top-3 left-3 bg-black text-accent font-mono text-[10px] font-bold px-2 py-1 border border-white">
                  REF: ENG_2026
                </div>
                <div className="absolute bottom-3 right-3 bg-accent text-black font-mono text-[10px] font-black px-2 py-1 border border-black shadow-[2px_2px_0px_0px_#000]">
                  LOC: NOIDA_INDIA
                </div>
              </div>

              {/* Telemetry Status Strip */}
              <div className="mt-3 bg-[#181818] border border-[#333333] p-2.5 flex items-center justify-between font-mono text-xs">
                <span className="text-[#888888]">CURRENT WORKFLOW:</span>
                <span className="text-accent font-bold">AI APPS & AUTOMATION</span>
              </div>
            </div>

            {/* Dr. Who Quote Stamp */}
            <div className="bg-[#181818] border-2 border-white p-3 font-mono text-xs text-[#A3A3A3] shadow-brutal-sm flex items-center justify-between">
              <span>"With great power comes great electricity bill."</span>
              <span className="text-accent font-bold ml-2">— Dr. Who</span>
            </div>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="bg-[#121212] border-2 border-white p-4 shadow-brutal hover:shadow-brutal-accent brutal-card"
            >
              <div className="font-mono text-[10px] text-[#888888] font-bold uppercase mb-1">
                [{`0${idx + 1}`}] {metric.label}
              </div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-accent uppercase tracking-tight">
                {metric.val}
              </div>
              <div className="font-mono text-xs text-[#A3A3A3] mt-1">
                {metric.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Brutalist Marquee Ticker Banner */}
      <div className="mt-12 bg-[#141414] text-accent border-y-2 border-white py-2.5 overflow-hidden select-none font-mono font-black text-xs sm:text-sm tracking-wider uppercase shadow-brutal-sm">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          <span className="mx-4 text-white">■ ASHISH CHANCHAL</span>
          <span className="mx-4 text-accentSec">● FULL-STACK DEVELOPMENT</span>
          <span className="mx-4 text-accent">■ AI & LLM AGENTS</span>
          <span className="mx-4 text-[#00FF66]">● NESTJS MICROSERVICES</span>
          <span className="mx-4 text-white">■ REACT & REACT NATIVE</span>
          <span className="mx-4 text-accent">● THREE.JS & WEBGL</span>
          <span className="mx-4 text-accentSec">■ FASTAPI & PYTHON</span>
          <span className="mx-4 text-[#00FF66]">● AZURE CLOUD & CI/CD</span>
          <span className="mx-4 text-white">■ ASHISH CHANCHAL</span>
          <span className="mx-4 text-accentSec">● FULL-STACK DEVELOPMENT</span>
          <span className="mx-4 text-accent">■ AI & LLM AGENTS</span>
          <span className="mx-4 text-[#00FF66]">● NESTJS MICROSERVICES</span>
          <span className="mx-4 text-white">■ REACT & REACT NATIVE</span>
          <span className="mx-4 text-accent">● THREE.JS & WEBGL</span>
          <span className="mx-4 text-accentSec">■ FASTAPI & PYTHON</span>
          <span className="mx-4 text-[#00FF66]">● AZURE CLOUD & CI/CD</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
