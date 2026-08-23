import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWindows } from 'react-icons/fa';
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
  const isBento = designMode === 'bento';
  const isEditorial = designMode === 'editorial';
  const isRetro = designMode === 'retro';

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

        {/* ══════════════════════════════════════════════════════
             MODE 1: RETRO / VINTAGE 1980s-90s PC WORKSTATION LAYOUT
        ══════════════════════════════════════════════════════ */}
        {isRetro ? (
          <div className="flex flex-col gap-6 mb-12 font-mono">
            {/* Retro Desktop Window Frame */}
            <div className="retro-window p-1">
              {/* Retro Window Titlebar */}
              <div className="bg-[#38322b] px-3 py-1.5 flex items-center justify-between text-xs text-white border-b border-[#5a5247]">
                <div className="flex items-center gap-2">
                  <span className="text-accent font-bold">■</span>
                  <span className="font-pixel text-[11px] tracking-wider text-accent">ASHISH_OS // v1.984 [SYSTEM_CONSOLE]</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-300">
                  <span className="px-1.5 py-0.5 bg-[#201c18] border border-[#5a5247]">_</span>
                  <span className="px-1.5 py-0.5 bg-[#201c18] border border-[#5a5247]">□</span>
                  <span className="px-1.5 py-0.5 bg-[#201c18] border border-[#5a5247] text-red-400 font-bold">X</span>
                </div>
              </div>

              {/* Retro Menu Bar */}
              <div className="bg-[#24201c] px-3 py-1 flex flex-wrap items-center gap-4 text-[11px] text-zinc-300 border-b border-[#3d362e]">
                <span className="hover:text-accent cursor-pointer">FILE</span>
                <span className="hover:text-accent cursor-pointer">EDIT</span>
                <span className="hover:text-accent cursor-pointer">VIEW</span>
                <span className="hover:text-accent cursor-pointer">TERMINAL</span>
                <span className="hover:text-accent cursor-pointer">RUN</span>
                <span className="hover:text-accent cursor-pointer text-zinc-500">HELP</span>
                <span className="ml-auto text-accent text-[10px] hidden sm:inline">IRQ 07 // 640KB VRAM</span>
              </div>

              {/* Main CRT Screen Interior */}
              <div className="retro-inset p-5 sm:p-8 relative overflow-hidden">
                <div className="retro-scanlines absolute inset-0 pointer-events-none z-10" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-20">
                  {/* Left Column: DOS Prompt & Systems Narrative (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col gap-5">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-accent mb-2">
                        <span>C:\SYSTEM\BOOT&gt;</span>
                        <span className="text-zinc-400">INIT_ARCHITECT.EXE</span>
                        <span className="w-2 h-3.5 bg-accent inline-block animate-dos-blink"></span>
                      </div>

                      <h1 className="text-3xl sm:text-5xl font-pixel text-white leading-tight mb-4">
                        BUILDING INTELLIGENT <br />
                        <span className="text-accent">&lt;SYSTEMS_CODE /&gt;</span> <br />
                        AND AI PIPELINES.
                      </h1>

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-mono">
                        Hardware-conscious software development. Architecting resilient NestJS microservices,
                        real-time voice AI streaming with &lt;3s latency, and clinical ML neural nets at DRDO.
                      </p>
                    </div>

                    {/* Analog Telemetry Cycle */}
                    <div className="p-3 bg-[#181614] border border-[#3d362e]">
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="text-accent font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          &gt;&gt; CPU LOADOUT FOCUS:
                        </span>
                        <span className="text-white font-bold">{ROLES[roleIndex]}</span>
                      </div>
                      <div className="w-full bg-[#0a0908] h-2 border border-[#3d362e] p-0.5">
                        <div
                          className="bg-accent h-full transition-all duration-500"
                          style={{ width: `${((roleIndex + 1) / ROLES.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Retro Button Cluster */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => scrollToSection('projects')}
                        className="retro-btn pattern-action-btn px-4 py-2 text-xs font-pixel flex items-center gap-2"
                      >
                        <span>▶</span>
                        <span>EXEC_WORKS.EXE</span>
                      </button>
                      <button
                        onClick={() => scrollToSection('experience')}
                        className="retro-btn pattern-action-btn px-4 py-2 text-xs font-pixel flex items-center gap-2"
                      >
                        <span>💾</span>
                        <span>CAREER_LOG.DAT</span>
                      </button>
                      <a
                        href="https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="retro-btn pattern-action-btn px-4 py-2 text-xs font-pixel flex items-center gap-2"
                      >
                        <span>📠</span>
                        <span>RESUME.TXT</span>
                      </a>
                      <Link
                        to="/windows11"
                        className="retro-btn pattern-action-btn px-4 py-2 text-xs font-pixel flex items-center gap-2 bg-blue-900/40 text-blue-300 border border-blue-400"
                      >
                        <FaWindows className="w-3.5 h-3.5 text-blue-400" />
                        <span>WIN11_DESKTOP.EXE</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: CRT Monitor & Floppy Drives (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    {/* CRT Avatar Viewport */}
                    <div className="retro-window p-3 flex flex-col items-center justify-center relative animate-crt-flicker">
                      <div className="w-full flex items-center justify-between text-[10px] text-zinc-400 pb-1.5 mb-2 border-b border-[#3d362e]">
                        <span className="text-accent font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping inline-block"></span>
                          DISPLAY: CRT_RGB
                        </span>
                        <span>60Hz VSYNC</span>
                      </div>

                      <div className="w-48 h-48 sm:w-56 sm:h-56 relative overflow-hidden border-2 border-[#5a5247] shadow-inner bg-[#000000]">
                        <img
                          src={heromain}
                          alt="Ashish Chanchal"
                          className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                        />
                        <div className="retro-scanlines absolute inset-0 pointer-events-none" />
                      </div>

                      <div className="w-full text-center mt-2.5 pt-1.5 border-t border-[#3d362e] text-[11px]">
                        <span className="text-white font-bold font-pixel">ASHISH CHANCHAL</span>
                        <span className="text-zinc-500 block text-[9px]">ID: 0x7F4A · STATUS: OPERATIONAL</span>
                      </div>
                    </div>

                    {/* Floppy Disk Metric Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {METRICS.map((m, idx) => (
                        <div key={idx} className="p-2.5 bg-[#181512] border border-[#4a4237]">
                          <div className="text-[9px] text-zinc-500 uppercase tracking-widest">{m.label}</div>
                          <div className="font-pixel text-lg text-accent my-0.5">{m.val}</div>
                          <div className="text-[10px] text-zinc-400">{m.sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        ) : isEditorial ? (
          /* ══════════════════════════════════════════════════════
               MODE 2: EDITORIAL / MAGAZINE HERO LAYOUT (3-Col Broadside)
          ══════════════════════════════════════════════════════ */
          <div className="flex flex-col gap-8 mb-12">
            {/* Magazine Masthead Broadside Header */}
            <div className="border-b border-t border-white/20 py-3 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="font-serif italic font-bold text-accent text-sm">Vol. XXIV</span>
                <span className="text-zinc-600">/</span>
                <span className="tracking-widest uppercase font-semibold text-white">THE ENGINEERING DISPATCH</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-400 tracking-wider">
                <span className="hidden md:inline">NOIDA, UTTAR PRADESH · INDIA</span>
                <span className="text-zinc-600">/</span>
                <span className="text-accent font-semibold">ISSUE NO. 01 · 2026</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-zinc-500">
                <span className="font-mono text-[9px] tracking-tighter">ISSN 2814-9021</span>
              </div>
            </div>

            {/* Giant Editorial Title Masthead */}
            <div className="text-center py-4 border-b border-white/10">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent block mb-3 font-semibold">
                — SPECIAL REPORT & PORTFOLIO COMPENDIUM —
              </span>
              <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal tracking-tight leading-[1.05] italic">
                The Architect of <br className="hidden sm:inline" />
                <span className="text-accent font-bold not-italic">Intelligent Systems.</span>
              </h1>
              <p className="mt-4 font-serif text-zinc-400 text-sm sm:text-base md:text-lg italic max-w-2xl mx-auto leading-relaxed">
                "A dedicated exploration of high-throughput backend microservices, real-time voice AI, and clinical machine learning models."
              </p>
            </div>

            {/* 3-Column Magazine Spread (Lead Story | Cover Visual | Index) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
              
              {/* [Col 1] Editorial Lead Story & Op-Ed (4 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-lg bg-[#0e0e12] border border-white/10">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <span className="font-serif italic text-xs text-accent font-bold">LEAD ESSAY</span>
                    <span className="font-mono text-[10px] text-zinc-500">4 MIN READ</span>
                  </div>

                  <p className="editorial-dropcap font-serif text-sm text-zinc-300 leading-relaxed mb-4">
                    Engineering is the art of eliminating friction. From slashing conversational voice latency from fifteen seconds down to sub-three-second real-time streaming, to orchestrating automated cloud pipelines on Azure, my pursuit remains unapologetic software quality.
                  </p>

                  <div className="p-3 my-4 border-l-2 border-accent bg-accent/5 rounded-r-md">
                    <p className="font-serif italic text-xs text-white leading-relaxed">
                      "Real-world performance is the only metric that survives contact with production."
                    </p>
                    <span className="font-mono text-[9px] text-accent block mt-1 uppercase">— Ashish Chanchal, Dispatch Notes</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2.5 items-center">
                  <Button text="Read Works" onClick={() => scrollToSection('projects')} variant="accent" size="sm" />
                  <Button text="Full Dossier" onClick={() => scrollToSection('about')} variant="dark" size="sm" />
                  <Link
                    to="/windows11"
                    className="px-3 py-1.5 rounded bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 text-xs font-mono flex items-center gap-2 transition-all"
                  >
                    <FaWindows className="w-3 h-3" />
                    <span>Windows 11 Edition</span>
                  </Link>
                </div>
              </div>

              {/* [Col 2] Glossy Magazine Cover Portrait (4 cols) */}
              <div className="lg:col-span-4 relative rounded-lg overflow-hidden bg-gradient-to-b from-[#141418] to-[#09090b] flex flex-col items-center justify-between p-6 group border border-white/10">
                <div className="w-full flex items-center justify-between z-10 font-mono text-[10px] text-zinc-400">
                  <span className="px-2 py-0.5 rounded bg-accent/15 text-accent border border-accent/30 font-bold uppercase">
                    COVER STORY
                  </span>
                  <span>EST. 2024</span>
                </div>

                <div className="relative my-4 z-10">
                  <div className="absolute inset-0 rounded-2xl bg-accent/10 blur-2xl pointer-events-none scale-110" />
                  <img
                    src={heromain}
                    alt="Ashish Chanchal"
                    className="w-52 h-52 sm:w-60 sm:h-60 rounded-2xl object-cover shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="w-full text-center z-10 border-t border-white/10 pt-3">
                  <h3 className="font-editorial text-xl font-bold text-white tracking-wide">
                    Ashish Chanchal
                  </h3>
                  <p className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest mt-0.5">
                    Software Developer & AI Systems
                  </p>
                </div>
              </div>

              {/* [Col 3] Table of Contents & Dispatch Bureau (4 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-lg bg-[#0e0e12] border border-white/10">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <span className="font-serif italic text-xs text-accent font-bold">IN THIS EDITION</span>
                    <span className="font-mono text-[10px] text-emerald-400 font-semibold">● ACTIVE</span>
                  </div>

                  {/* Role highlight */}
                  <div className="mb-4">
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">
                      CURRENT ASSIGNMENT
                    </span>
                    <div className="font-editorial text-lg text-white font-bold italic">
                      {ROLES[roleIndex]}
                    </div>
                  </div>

                  {/* Editorial Section Index */}
                  <ul className="space-y-2.5 font-serif text-xs text-zinc-300">
                    <li className="flex items-baseline justify-between border-b border-white/5 pb-1">
                      <span className="italic">01. Production Artifacts</span>
                      <span className="font-mono text-[10px] text-zinc-500">MCP & LLMs</span>
                    </li>
                    <li className="flex items-baseline justify-between border-b border-white/5 pb-1">
                      <span className="italic">02. Career Chronicles</span>
                      <span className="font-mono text-[10px] text-zinc-500">2024–2026</span>
                    </li>
                    <li className="flex items-baseline justify-between border-b border-white/5 pb-1">
                      <span className="italic">03. Technical Loadout</span>
                      <span className="font-mono text-[10px] text-zinc-500">7 ARSENALS</span>
                    </li>
                    <li className="flex items-baseline justify-between border-b border-white/5 pb-1">
                      <span className="italic">04. Letters to the Bureau</span>
                      <span className="font-mono text-[10px] text-zinc-500">OPEN SLA</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between font-serif text-xs text-zinc-400">
                  <span className="italic">Dispatch Docket</span>
                  <a
                    href="https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline font-bold"
                  >
                    Curriculum Vitae ↗
                  </a>
                </div>
              </div>
            </div>

            {/* 4-Column Statistics Ledger */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-[#0e0e12] border border-white/10 font-serif">
              {METRICS.map((m, idx) => (
                <div key={idx} className="p-3 border-r last:border-r-0 border-white/10 flex flex-col justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">{m.label}</span>
                  <span className="font-editorial text-2xl sm:text-3xl font-bold text-white my-1 italic">{m.val}</span>
                  <span className="text-xs text-zinc-400 italic">{m.sub}</span>
                </div>
              ))}
            </div>
          </div>

        ) : isBento ? (
          /* ══════════════════════════════════════════════════════
               MODE 3: BENTO 2.0 HERO LAYOUT (12-Col Asymmetric Mosaic)
          ══════════════════════════════════════════════════════ */
          <div className="grid grid-cols-12 gap-4 mb-12">

            {/* [A] Main Identity & Pitch Tile (7 cols, row-span-2) */}
            <div className="col-span-12 lg:col-span-7 bento-tile p-6 sm:p-8 flex flex-col justify-between gap-6 min-h-[380px]">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse inline-block" />
                  <span className="font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                    Available for High-Impact Roles
                  </span>
                  <span className="ml-auto font-mono text-[11px] text-zinc-500">NOIDA // UTC+5:30</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-heading font-semibold text-white tracking-tight leading-[1.1] mb-3">
                  Engineering the <br />
                  <span className="text-accent">future of software & AI.</span>
                </h1>

                <p className="text-sm sm:text-base text-zinc-400 font-sans leading-relaxed max-w-lg">
                  Software Developer & AI Systems Engineer. Building resilient microservices in NestJS,
                  real-time voice AI pipelines, and clinical ML models with high precision.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button text="Explore Work" onClick={() => scrollToSection('projects')} variant="accent" size="md" />
                <Button text="Experience" onClick={() => scrollToSection('experience')} variant="dark" size="md" />
                <Button
                  text="Download CV"
                  link="https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link"
                  variant="white"
                  size="md"
                  external
                />
                <Link
                  to="/windows11"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600/30 to-indigo-600/30 hover:from-blue-600/40 hover:to-indigo-600/40 border border-blue-500/40 text-blue-300 font-semibold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <FaWindows className="w-3.5 h-3.5 text-blue-400" />
                  <span>Windows 11 OS Mode</span>
                </Link>
              </div>
            </div>

            {/* [B] Avatar & Location Card (5 cols, row-span-2) */}
            <div className="col-span-12 lg:col-span-5 bento-tile p-6 flex flex-col items-center justify-between text-center min-h-[380px] relative overflow-hidden group">
              <div className="w-full flex items-center justify-between font-mono text-xs text-zinc-500">
                <span>IDENTITY</span>
                <span className="text-accent">ASHISH CHANCHAL</span>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 rounded-2xl bg-accent/15 blur-xl pointer-events-none scale-110" />
                <img
                  src={heromain}
                  alt="Ashish Chanchal"
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl object-cover shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="w-full">
                <div className="font-heading font-semibold text-white text-base">Ashish Chanchal</div>
                <div className="font-mono text-xs text-zinc-400 mt-0.5">Software Developer & AI Systems</div>
              </div>
            </div>

            {/* [C] Live Role Rotator Tile (4 cols) */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-4 bento-tile p-5 flex flex-col justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-accent font-mono font-black text-sm">▶</span>
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Current Role</span>
              </div>
              <div className="font-heading font-bold text-xl text-white">{ROLES[roleIndex]}</div>
              <div className="flex flex-wrap gap-1.5">
                {ROLES.map((_, i) => (
                  <span key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === roleIndex ? 'bg-accent scale-125' : 'bg-zinc-700'}`} />
                ))}
              </div>
            </div>

            {/* [D] Metric cards — 4 small tiles (each 2 cols on lg, 3 on sm) */}
            {METRICS.map((metric, idx) => (
              <div key={idx} className="col-span-6 sm:col-span-3 lg:col-span-2 bento-tile p-4 flex flex-col gap-1">
                <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-wider">{metric.label}</div>
                <div className="text-2xl font-heading font-bold text-accent">{metric.val}</div>
                <div className="font-mono text-[10px] text-zinc-500">{metric.sub}</div>
              </div>
            ))}

          </div>

        ) : isMinimal ? (
          /* ══════════════════════════════════════════════════════
               MODE 4: MINIMALIST HERO LAYOUT (Centered Zen Studio)
          ══════════════════════════════════════════════════════ */
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
            {/* Minimal Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md mb-8 text-xs font-mono text-zinc-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Ashish Chanchal — Software & AI Engineer</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-500">Noida, India</span>
            </div>

            {/* Clean Zen Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold text-white tracking-tight leading-[1.1] mb-6">
              Building scalable <br />
              <span className="text-accent">intelligent systems</span> <br />
              across code & AI.
            </h1>

            {/* Concise Mission Statement */}
            <p className="text-base sm:text-lg text-zinc-400 font-sans max-w-2xl leading-relaxed mb-6">
              Crafting high-throughput backend microservices in NestJS, responsive frontends in React & Three.js, and training clinical ML models with zero compromise.
            </p>

            {/* Active Focus Pill */}
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-zinc-950 border border-zinc-800/80 mb-8 text-xs font-mono">
              <span className="text-zinc-500">FOCUS:</span>
              <span className="text-white font-semibold">{ROLES[roleIndex]}</span>
            </div>

            {/* Action Buttons Cluster */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <Button text="Explore Work" onClick={() => scrollToSection('projects')} variant="accent" size="md" />
              <Button text="View Experience" onClick={() => scrollToSection('experience')} variant="dark" size="md" />
              <Button
                text="Download CV"
                link="https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link"
                variant="white"
                size="md"
                external
              />
              <Link
                to="/windows11"
                className="px-4 py-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-mono flex items-center gap-2 transition-all"
              >
                <FaWindows className="w-3 h-3 text-blue-400" />
                <span>Windows 11 OS</span>
              </Link>
            </div>

            {/* Linear Metric Strip */}
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 backdrop-blur-md">
              {METRICS.map((m, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center p-2">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{m.label}</span>
                  <span className="font-heading text-2xl font-bold text-white">{m.val}</span>
                  <span className="text-xs text-zinc-400 mt-0.5">{m.sub}</span>
                </div>
              ))}
            </div>
          </div>

        ) : (
          /* ══════════════════════════════════════════════════════
               MODE 5: BRUTALIST HERO LAYOUT (Cyber-Industrial Terminal)
          ══════════════════════════════════════════════════════ */
          <div>
            {/* Top Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b-2 border-[#262626]">
              <div className="flex items-center gap-2">
                <span className="bg-accent text-black font-mono font-black text-xs px-2 py-0.5 border border-black shadow-[2px_2px_0px_0px_#ffffff]">
                  WAYPOINT_00
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-accentSec">
                  // DEPARTURE // MISSION_INITIATED
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-[#00FF66] inline-block animate-pulse"></span>
                <span className="text-zinc-300 font-medium">STATUS: OPERATIONAL</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
              {/* Left Column: Heading & Narrative (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <div className="inline-block text-xs font-mono font-bold mb-4 bg-[#161616] border-2 border-white px-3 py-1 text-accent shadow-brutal-sm">
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

                {/* Subtitle / Focus Areas */}
                <p className="font-mono text-zinc-300 text-sm sm:text-base leading-relaxed">
                  Software Developer & AI Systems Engineer. Crafting resilient microservices in NestJS,
                  interactive frontend applications in React & Three.js, and training predictive clinical ML models at DRDO.
                </p>

                {/* Role Rotator Bar */}
                <div className="p-4 bg-[#141414] border-2 border-white shadow-brutal-sm">
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                    <span className="text-accent font-bold">CURRENT FOCUS //</span>
                    <span className="text-zinc-400">{ROLES[roleIndex]}</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 overflow-hidden">
                    <div
                      className="bg-accent h-full transition-all duration-500"
                      style={{ width: `${((roleIndex + 1) / ROLES.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* CTA Action Cluster */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    text="Explore Work"
                    onClick={() => scrollToSection('projects')}
                    variant="accent"
                    size="lg"
                  />
                  <Button
                    text="Experience"
                    onClick={() => scrollToSection('experience')}
                    variant="dark"
                    size="lg"
                  />
                  <Button
                    text="Download CV"
                    link="https://drive.google.com/file/d/1J094VFPjzW8Qh58rRbR5xPn7d31lMk5x/view?usp=drive_link"
                    variant="white"
                    size="lg"
                    external
                  />
                  <Link
                    to="/windows11"
                    className="px-5 py-3 border-2 border-white bg-[#0078D4] text-white font-mono font-bold text-xs uppercase flex items-center gap-2 shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                  >
                    <FaWindows className="w-4 h-4 text-white" />
                    <span>[WIN11_SIMULATOR]</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Visual & Metric Pillars (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Tech Portrait */}
                <div className="relative overflow-hidden bg-[#141414] border-2 border-white shadow-brutal-accent">
                  <div className="w-full h-72 sm:h-80 overflow-hidden relative">
                    <img
                      src={heromain}
                      alt="Ashish Chanchal"
                      className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-300"
                    />
                    {/* Laser Radar Sweep Beam */}
                    <div className="absolute inset-x-0 h-1 bg-accent/70 shadow-[0_0_10px_#00F0FF] animate-radar-sweep pointer-events-none" />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-accent font-mono text-[10px] font-bold border border-white">
                      ID: ARCHITECT_01
                    </div>
                  </div>
                  <div className="p-3 bg-[#181818] border-t-2 border-white flex items-center justify-between font-mono text-xs">
                    <span className="text-white font-bold">ASHISH CHANCHAL</span>
                    <span className="text-accent font-bold">// DEV_LOG</span>
                  </div>
                </div>

                {/* Metrics 2x2 Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {METRICS.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 flex flex-col justify-between bg-[#121212] border-2 border-white shadow-brutal-sm"
                    >
                      <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">{metric.label}</span>
                      <span className="font-heading font-bold text-xl sm:text-2xl text-accent my-1">{metric.val}</span>
                      <span className="font-mono text-[10px] text-zinc-400">{metric.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Hero;
