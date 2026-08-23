import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeTransitionOverlay: React.FC = () => {
  const { isTransitioning, transitionMode, transitionTheme } = useTheme();
  const [countdown, setCountdown] = useState(3);
  const [progress, setProgress] = useState(15);
  const [glitchText, setGlitchText] = useState('CALIBRATING...');

  useEffect(() => {
    if (isTransitioning) {
      setCountdown(3);
      setProgress(15);

      const countTimer = setInterval(() => {
        setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
      }, 250);

      const progressTimer = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 17 : 100));
      }, 80);

      const glitchWords = ['LOCKING TARGET...', 'INITIALIZING KERNEL...', 'APPLYING COLORMAP...', 'SYSTEM READY'];
      let wordIdx = 0;
      const glitchTimer = setInterval(() => {
        wordIdx = (wordIdx + 1) % glitchWords.length;
        setGlitchText(glitchWords[wordIdx]);
      }, 200);

      return () => {
        clearInterval(countTimer);
        clearInterval(progressTimer);
        clearInterval(glitchTimer);
      };
    }
  }, [isTransitioning]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center overflow-hidden">

      {/* ══════════════════════════════════════════════════════
           CINEMATIC 2.39:1 LETTERBOX BARS (Director's Cut)
      ══════════════════════════════════════════════════════ */}
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 h-12 sm:h-14 bg-black/95 backdrop-blur-md z-50 flex items-center justify-between px-6 font-mono text-[10px] text-zinc-400 border-b border-white/10 shadow-2xl">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block" />
          <span className="text-red-400 font-bold uppercase tracking-widest font-mono">
            ● REC [SCENE // RE-RENDER]
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-zinc-500 tracking-widest">
          <span>FPS: 60.0</span>
          <span>•</span>
          <span>SHUTTER: 180°</span>
          <span>•</span>
          <span>4K ANAMORPHIC</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-500">STYLE:</span>
          <span className="text-white font-bold uppercase px-2 py-0.5 rounded bg-white/10 border border-white/15">
            {transitionMode.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 inset-x-0 h-12 sm:h-14 bg-black/95 backdrop-blur-md z-50 flex items-center justify-between px-6 font-mono text-[10px] text-zinc-400 border-t border-white/10 shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">PALETTE:</span>
          <span className="font-bold flex items-center gap-1.5" style={{ color: transitionTheme.primary }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: transitionTheme.primary }} />
            {transitionTheme.name}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-zinc-500 tracking-wider">
          <span>BUFFER: {progress}%</span>
          <div className="w-24 bg-zinc-800 h-1.5 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full transition-all duration-150"
              style={{ width: `${progress}%`, backgroundColor: transitionTheme.primary }}
            />
          </div>
        </div>

        <div className="text-zinc-400 font-mono">
          TC 00:01:24:08
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
           1. BRUTALIST SCENE: CYBERPUNK BLADE RUNNER GLITCH
      ══════════════════════════════════════════════════════ */}
      {transitionMode === 'brutalist' && (
        <div className="absolute inset-0 bg-[#070707] flex flex-col items-center justify-center p-6 text-center font-mono">
          {/* Animated Matrix Rain Lines */}
          <div className="absolute inset-0 bg-brutal-grid opacity-40 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent pointer-events-none" />

          {/* Central Cyber Shutter Box */}
          <div className="relative z-10 p-8 sm:p-12 max-w-xl w-full bg-[#121212] border-4 border-white shadow-[8px_8px_0px_0px_var(--accent-primary,#00F0FF)] animate-cinematic-zoom">
            <div className="flex items-center justify-between border-b-2 border-white pb-3 mb-6 text-xs">
              <span className="bg-accent text-black font-black px-2.5 py-1 border border-black uppercase text-[11px]">
                KERNEL OVERRIDE // 0x7F
              </span>
              <span className="text-white font-black tracking-widest animate-pulse">
                [ PROTOCOL ACTIVE ]
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-none mb-4">
              CYBERNETIC <br />
              <span className="text-accent underline decoration-white decoration-4 underline-offset-4">
                BRUTALIST RUNTIME
              </span>
            </h2>

            <div className="space-y-2 text-xs text-zinc-300 font-mono text-left bg-black p-4 border-2 border-zinc-700 my-4 shadow-inner">
              <div className="text-accent flex items-center justify-between font-bold">
                <span>&gt; RE-INDEXING DOM TREE...</span>
                <span>[ OK ]</span>
              </div>
              <div className="text-white flex items-center justify-between">
                <span>&gt; MOUNTING HIGH-CONTRAST MATRICES...</span>
                <span className="text-emerald-400 font-bold">{progress}%</span>
              </div>
              <div className="text-zinc-400 flex items-center justify-between">
                <span>&gt; STATUS: {glitchText}</span>
                <span className="text-accent animate-pulse">● ENGAGED</span>
              </div>
            </div>

            {/* Visualizer frequency bar */}
            <div className="flex items-center justify-between gap-1.5 h-6 mt-4">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full bg-accent transition-all duration-75"
                  style={{
                    height: `${Math.max(15, (Math.sin((i + progress) * 0.8) + 1) * 50)}%`,
                    backgroundColor: i % 2 === 0 ? 'var(--accent-primary)' : '#ffffff',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
           2. MINIMALIST SCENE: A24 / ARTHOUSE CELESTIAL ECLIPSE
      ══════════════════════════════════════════════════════ */}
      {transitionMode === 'minimalist' && (
        <div className="absolute inset-0 bg-[#050507] flex flex-col items-center justify-center p-6 text-center">
          {/* Expanding Ethereal Luminous Core */}
          <div
            className="absolute w-80 h-80 sm:w-[32rem] sm:h-[32rem] rounded-full blur-3xl opacity-30 animate-pulse pointer-events-none"
            style={{ backgroundColor: transitionTheme.primary }}
          />

          <div className="relative z-10 flex flex-col items-center max-w-lg animate-cinematic-zoom">
            {/* Concentric Rotating Orbital Halo */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-white/10 border-t-accent animate-spin-slow" />
              <div className="absolute inset-2 rounded-full border border-white/10 border-b-accentSec animate-reverse-spin" />
              <div className="w-3 h-3 rounded-full bg-white shadow-lg shadow-white/50 animate-ping" />
            </div>

            <span className="font-mono text-xs text-zinc-400 uppercase tracking-[0.5em] mb-4 block">
              SCENE 01 // THE ZEN DISCIPLINE
            </span>

            <h2 className="text-4xl sm:text-6xl font-heading font-light text-white tracking-tight leading-tight mb-4">
              The Architecture <br />
              <span className="font-normal italic" style={{ color: transitionTheme.primary }}>
                of Pure Clarity.
              </span>
            </h2>

            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent my-4" />

            <p className="font-sans text-sm text-zinc-400 leading-relaxed max-w-md">
              Eliminating visual noise. Rendering focused typography, gentle spatial physics, and refined luminance.
            </p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
           3. BENTO 2.0 SCENE: APPLE VISION PRO SPATIAL HUD
      ══════════════════════════════════════════════════════ */}
      {transitionMode === 'bento' && (
        <div className="absolute inset-0 bg-[#08080d] flex flex-col items-center justify-center p-6 text-center font-mono">
          {/* Spatial Grid Beam Flare */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 via-zinc-950/80 to-black pointer-events-none" />

          <div className="relative z-10 p-8 sm:p-10 max-w-lg w-full bento-tile flex flex-col items-center gap-6 shadow-2xl border border-white/20 animate-cinematic-zoom backdrop-blur-2xl">
            {/* Holographic Radar Target Crosshair */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent animate-spin-slow" />
              <div className="absolute inset-3 rounded-full border border-white/30 animate-pulse" />
              <div className="absolute inset-6 rounded-full border border-accentSec/60 animate-reverse-spin" />
              <span className="text-accent font-mono font-black text-xs">12-COL</span>
            </div>

            <div>
              <span className="text-[10px] text-accent uppercase tracking-[0.4em] block mb-2 font-mono font-bold">
                // SPATIAL COMPUTATION ENGINE
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white tracking-tight">
                Assembling Bento Matrix
              </h2>
            </div>

            {/* Asymmetrical 3-block assembly animation */}
            <div className="grid grid-cols-12 gap-2.5 w-full">
              <div className="col-span-7 h-4 rounded-xl bg-accent/80 animate-pulse flex items-center px-3 text-[9px] text-black font-bold">
                TILE_PRIMARY // OK
              </div>
              <div className="col-span-5 h-4 rounded-xl bg-white/20 animate-pulse delay-75 flex items-center px-3 text-[9px] text-white">
                METRICS // SYNC
              </div>
              <div className="col-span-4 h-4 rounded-xl bg-accentSec/80 animate-pulse delay-100 flex items-center px-3 text-[9px] text-black font-bold">
                RADAR
              </div>
              <div className="col-span-8 h-4 rounded-xl bg-white/10 animate-pulse delay-150 flex items-center px-3 text-[9px] text-zinc-300">
                CONTAINER // RE-RENDERED
              </div>
            </div>

            <div className="text-[11px] text-zinc-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>COORDINATES: ASYMMETRIC MOSAIC READY</span>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
           4. EDITORIAL / MAGAZINE SCENE: 35MM HOLLYWOOD FILM REEL
      ══════════════════════════════════════════════════════ */}
      {transitionMode === 'editorial' && (
        <div className="absolute inset-0 bg-[#08080a] flex flex-col items-center justify-center p-6 text-center">
          {/* Authentic Film Sprocket Holes along left & right borders */}
          <div className="absolute left-4 top-0 bottom-0 w-6 flex flex-col justify-between py-16 opacity-40 pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-5 h-7 border-2 border-white/50 rounded-sm bg-zinc-900" />
            ))}
          </div>

          <div className="absolute right-4 top-0 bottom-0 w-6 flex flex-col justify-between py-16 opacity-40 pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-5 h-7 border-2 border-white/50 rounded-sm bg-zinc-900" />
            ))}
          </div>

          {/* 35mm Film Leader Wheel */}
          <div className="relative z-10 flex flex-col items-center max-w-lg animate-cinematic-zoom">
            <div className="relative w-32 h-32 rounded-full border-4 border-white/40 flex items-center justify-center mb-6 shadow-2xl bg-black/60 backdrop-blur-sm">
              {/* Optical crosshairs */}
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/40" />
              <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/40" />
              {/* Rotating Sweep Hand */}
              <div className="absolute inset-1 rounded-full border-t-4 border-accent animate-spin" />
              <span className="font-editorial text-5xl font-bold text-white italic">
                {countdown}
              </span>
            </div>

            <span className="font-mono text-xs text-accent uppercase tracking-[0.4em] mb-2 font-bold">
              — PRINT PRESS SPREAD COMPOSITOR —
            </span>

            <h2 className="font-editorial text-4xl sm:text-6xl text-white italic font-normal tracking-tight mb-3">
              The Engineering Gazette
            </h2>

            <div className="w-24 h-0.5 bg-white/20 my-2" />

            <p className="font-serif italic text-sm sm:text-base text-zinc-300 max-w-md leading-relaxed">
              Typesetting broadhead columns, 3-column newspaper spreads, and golden hot-foil dropcaps.
            </p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
           5. RETRO / VINTAGE SCENE: 1984 IBM CRT BOOT & VHS GLITCH
      ══════════════════════════════════════════════════════ */}
      {transitionMode === 'retro' && (
        <div className="absolute inset-0 bg-[#0b0a09] flex flex-col items-center justify-center p-6 text-center font-mono animate-crt-flicker">
          {/* CRT Scanline Texture */}
          <div className="retro-scanlines absolute inset-0 pointer-events-none" />

          {/* VHS Tape Header */}
          <div className="absolute top-16 left-6 text-emerald-400 font-pixel text-xs flex items-center gap-2">
            <span className="animate-pulse">PLAY ▶</span>
            <span>SP 0:00:42 [60Hz VSYNC]</span>
          </div>

          {/* Retro BIOS Terminal Window */}
          <div className="retro-window p-1 max-w-xl w-full relative z-10 text-left animate-cinematic-zoom shadow-2xl">
            <div className="bg-[#38322b] px-3 py-1.5 flex items-center justify-between text-xs text-white border-b border-[#5a5247]">
              <div className="flex items-center gap-2">
                <span className="text-accent font-bold">■</span>
                <span className="font-pixel text-[11px] text-accent">IBM PC/XT COMPATIBLE BIOS v1.984</span>
              </div>
              <span className="text-emerald-400 font-pixel text-[10px] font-bold">[BOOTSTRAP]</span>
            </div>

            <div className="p-6 bg-[#161412] text-xs text-amber-200 font-mono space-y-3">
              <div className="text-white font-pixel text-base mb-2">
                &gt;&gt; ASHISH_WORKSTATION // HARDWARE BOOT
              </div>

              <div className="flex items-center justify-between border-b border-[#3d362e] pb-1.5">
                <span>SYSTEM RAM CHECK:</span>
                <span className="text-emerald-400 font-bold">{progress >= 90 ? '640KB OK' : `${progress * 6}KB COUNTING...`}</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#3d362e] pb-1.5">
                <span>FLOPPY DISK DRIVE A:</span>
                <span className="text-accent font-bold">SEEKING TRACK 00... [MOUNTED]</span>
              </div>

              <div className="flex items-center justify-between border-b border-[#3d362e] pb-1.5">
                <span>COLORMAP DECODER:</span>
                <span className="text-white uppercase">{transitionTheme.name} (PHOSPHOR RGB)</span>
              </div>

              <div className="pt-2 text-zinc-300 text-xs flex items-center gap-2">
                <span className="text-accent font-bold">C:\&gt;</span>
                <span>EXECUTE RUNTIME_DESKTOP.EXE</span>
                <span className="w-2.5 h-4 bg-accent inline-block animate-dos-blink" />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ThemeTransitionOverlay;
