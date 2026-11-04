import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWindows, FaApple } from 'react-icons/fa';
import Button from '../shared/Button';
import BentoHero from '../Bento/BentoHero';
import MinimalHero from '../Modes/MinimalHero';
import BrutalHero from '../Modes/BrutalHero';
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
  const isMinimal = designMode === 'minimalist' || designMode === 'premium';
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
                        to="/macos"
                        className="retro-btn pattern-action-btn px-4 py-2 text-xs font-pixel flex items-center gap-2 bg-purple-900/40 text-purple-300 border border-purple-400"
                      >
                        <FaApple className="w-3.5 h-3.5 text-white" />
                        <span>MACOS_SEQUOIA.APP</span>
                      </Link>
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
                    to="/macos"
                    className="px-3 py-1.5 rounded bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-mono flex items-center gap-2 transition-all"
                  >
                    <FaApple className="w-3 h-3 text-white" />
                    <span>macOS Sequoia</span>
                  </Link>
                  <Link
                    to="/windows11"
                    className="px-3 py-1.5 rounded bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 text-xs font-mono flex items-center gap-2 transition-all"
                  >
                    <FaWindows className="w-3 h-3 text-blue-400" />
                    <span>Windows 11</span>
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
          <BentoHero />

        ) : isMinimal ? (
          <MinimalHero />

        ) : (
          <BrutalHero />
        )}

      </div>
    </section>
  );
};

export default Hero;
