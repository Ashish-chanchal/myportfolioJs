import { useEffect, useRef, useState } from 'react';
import { FaApple, FaWindows } from 'react-icons/fa';
import { LuBookOpen, LuCheck, LuFeather, LuLayoutGrid, LuMonitor, LuPalette, LuSparkles, LuSquare } from 'react-icons/lu';
import { useTheme, type DesignMode } from '../../context/ThemeContext';
import './premium.css';

const MODES: { id: DesignMode; label: string; icon: JSX.Element }[] = [
  { id: 'premium', label: 'Playful', icon: <LuSparkles /> },
  { id: 'minimalist', label: 'Minimal', icon: <LuFeather /> },
  { id: 'brutalist', label: 'Brutal', icon: <LuSquare /> },
  { id: 'bento', label: 'Bento', icon: <LuLayoutGrid /> },
  { id: 'editorial', label: 'Magazine', icon: <LuBookOpen /> },
  { id: 'retro', label: 'Retro', icon: <LuMonitor /> },
];

const nice = (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

const PremiumThemeMenu = () => {
  const { currentTheme, themes, setTheme, designMode, setDesignMode } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div className="pm-menu" ref={ref}>
      <button className="pm-menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="dialog" aria-label="Appearance settings">
        <span className="pm-dots"><i style={{ background: currentTheme.primary }} /><i style={{ background: currentTheme.secondary }} /></span>
        <LuPalette />
      </button>

      {open && (
        <div className="pm-pop" role="dialog" aria-label="Appearance">
          <section>
            <h4>Look</h4>
            <div className="pm-modes">
              {MODES.map((m) => (
                <button key={m.id} className={designMode === m.id ? 'is-active' : ''} onClick={() => setDesignMode(m.id)}>
                  {m.icon}<span>{m.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h4>Palette <em>{nice(currentTheme.name)}</em></h4>
            <div className="pm-swatches">
              {themes.map((t) => (
                <button
                  key={t.id}
                  className={t.id === currentTheme.id ? 'is-active' : ''}
                  style={{ ['--a' as string]: t.primary, ['--b' as string]: t.secondary }}
                  onClick={() => setTheme(t.id)}
                  aria-label={nice(t.name)}
                  title={nice(t.name)}
                >
                  {t.id === currentTheme.id && <LuCheck />}
                </button>
              ))}
            </div>
            <p>{currentTheme.description}</p>
          </section>

          <section>
            <h4>Try a desktop</h4>
            <div className="pm-os">
              <a href="/macos"><FaApple /><span><b>macOS</b><small>Sequoia</small></span></a>
              <a href="/windows11"><FaWindows /><span><b>Windows 11</b><small>Desktop</small></span></a>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default PremiumThemeMenu;
