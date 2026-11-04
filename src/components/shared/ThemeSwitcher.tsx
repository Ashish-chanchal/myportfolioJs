import React, { useState, useRef, useEffect } from 'react';
import { useTheme, type DesignMode } from '../../context/ThemeContext';
import { FaPalette, FaCheck, FaApple, FaWindows } from 'react-icons/fa';

const MODES: { id: DesignMode; label: string; note: string }[] = [
  { id: 'premium', label: 'Playful', note: 'Pastel & bouncy' },
  { id: 'minimalist', label: 'Minimal', note: 'Quiet & airy' },
  { id: 'bento', label: 'Bento', note: 'Glass tiles' },
  { id: 'brutalist', label: 'Brutal', note: 'Loud & hard-edged' },
  { id: 'editorial', label: 'Magazine', note: 'Serif editorial' },
  { id: 'retro', label: 'Retro', note: 'CRT workstation' },
];

/** Tiny CSS thumbnail that hints at each design mode's layout. */
const Thumb: React.FC<{ mode: DesignMode }> = ({ mode }) => {
  const base = 'ts-thumb relative w-full h-11 overflow-hidden';
  switch (mode) {
    case 'premium':
      return (
        <div className={`${base} rounded-lg`} style={{ background: '#fff8ef' }}>
          <i className="absolute rounded-full" style={{ width: 22, height: 22, left: 6, top: 6, background: '#ffd9c9' }} />
          <i className="absolute rounded-full" style={{ width: 14, height: 14, right: 8, top: 18, background: '#cdeedd' }} />
          <i className="absolute rounded-full" style={{ width: 26, height: 5, left: 8, bottom: 6, background: '#2a2118' }} />
        </div>
      );
    case 'minimalist':
      return (
        <div className={`${base} rounded-lg flex flex-col items-center justify-center gap-1.5`} style={{ background: '#0b0b0d' }}>
          <i className="block rounded-full bg-white/80" style={{ width: 34, height: 4 }} />
          <i className="block rounded-full bg-white/30" style={{ width: 22, height: 3 }} />
          <i className="block rounded-full bg-accent" style={{ width: 12, height: 5 }} />
        </div>
      );
    case 'bento':
      return (
        <div className={`${base} rounded-lg grid grid-cols-3 grid-rows-2 gap-[3px] p-1.5`} style={{ background: '#0b0b10' }}>
          <i className="col-span-2 row-span-2 rounded-[5px] bg-white/15" />
          <i className="rounded-[5px] bg-accent/70" />
          <i className="rounded-[5px] bg-white/10" />
        </div>
      );
    case 'brutalist':
      return (
        <div className={base} style={{ background: '#000' }}>
          <i className="absolute bg-accent border-2 border-white" style={{ left: 7, top: 8, width: 30, height: 22, boxShadow: '3px 3px 0 #fff' }} />
          <i className="absolute bg-white" style={{ right: 6, bottom: 6, width: 14, height: 4 }} />
        </div>
      );
    case 'editorial':
      return (
        <div className={`${base} rounded-[3px] px-2 pt-1.5`} style={{ background: '#0d0d10' }}>
          <i className="block bg-white/70" style={{ height: 1, width: '100%' }} />
          <span className="block font-serif italic text-white text-[13px] leading-none mt-1">Aa</span>
          <i className="block bg-white/25 mt-1" style={{ height: 2, width: '70%' }} />
        </div>
      );
    default:
      return (
        <div className={`${base} border-2`} style={{ background: '#121110', borderColor: '#5a5247' }}>
          <i className="absolute left-0 right-0 top-0 h-2.5" style={{ background: '#38322b' }} />
          <i className="absolute bg-accent" style={{ left: 6, top: 18, width: 5, height: 9 }} />
          <i className="absolute bg-accent/50" style={{ left: 14, top: 22, width: 22, height: 3 }} />
        </div>
      );
  }
};

export const ThemeSwitcher: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { currentTheme, setTheme, themes, designMode, setDesignMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const down = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    const key = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('mousedown', down);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('mousedown', down);
      document.removeEventListener('keydown', key);
    };
  }, []);

  const mode = MODES.find((m) => m.id === designMode) ?? MODES[0];
  const shown = themes.find((t) => t.id === hover) ?? currentTheme;

  return (
    <div className="ts-root relative inline-block" ref={ref}>
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="ts-trigger flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white"
        title="Appearance"
        aria-label="Open appearance panel"
        aria-expanded={isOpen}
      >
        <span className="flex -space-x-1">
          <i className="ts-dot" style={{ backgroundColor: currentTheme.primary }} />
          <i className="ts-dot" style={{ backgroundColor: currentTheme.secondary }} />
        </span>
        <FaPalette className="w-3 h-3" />
        {!compact && <span className="hidden sm:inline">{mode.label}</span>}
      </button>

      {isOpen && (
        <div className="ts-panel absolute right-0 mt-2.5 z-50 p-4 text-white" role="dialog" aria-label="Appearance">
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="ts-title text-sm font-bold">Appearance</h3>
            <span className="text-[11px] text-zinc-400">{mode.label} · {currentTheme.name.toLowerCase()}</span>
          </div>

          <div className="ts-label">Design</div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {MODES.map((m) => {
              const on = m.id === designMode;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setDesignMode(m.id)}
                  className={`ts-mode text-left p-1.5 ${on ? 'is-on' : ''}`}
                  aria-pressed={on}
                  title={m.note}
                >
                  <Thumb mode={m.id} />
                  <div className="flex items-center justify-between mt-1.5 px-0.5">
                    <span className="text-[11px] font-semibold">{m.label}</span>
                    {on && <FaCheck className="w-2.5 h-2.5 text-accent" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between">
            <div className="ts-label">Palette</div>
            <div className="text-[11px] text-zinc-400 mb-2">{shown.name.toLowerCase()}</div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {themes.map((t) => {
              const on = t.id === currentTheme.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTheme(t.id)}
                  onMouseEnter={() => setHover(t.id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(t.id)}
                  onBlur={() => setHover(null)}
                  className={`ts-swatch ${on ? 'is-on' : ''}`}
                  style={{ background: `linear-gradient(135deg, ${t.primary} 50%, ${t.secondary} 50%)` }}
                  aria-label={t.name}
                  aria-pressed={on}
                  title={t.description}
                />
              );
            })}
          </div>

          <div className="ts-label">Or try a desktop</div>
          <div className="grid grid-cols-2 gap-2">
            <a href="/macos" className="ts-os"><FaApple /> macOS</a>
            <a href="/windows11" className="ts-os"><FaWindows /> Windows 11</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
