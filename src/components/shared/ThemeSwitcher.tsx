import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaPalette, FaCheck, FaFeatherAlt, FaSquare, FaTh, FaBookOpen } from 'react-icons/fa';

export const ThemeSwitcher: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { currentTheme, setTheme, themes, designMode, setDesignMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMinimal = designMode === 'minimalist';
  const isBento = designMode === 'bento';
  const isEditorial = designMode === 'editorial';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const modeLabel =
    designMode === 'minimalist'
      ? 'MINIMAL'
      : designMode === 'brutalist'
      ? 'BRUTAL'
      : designMode === 'bento'
      ? 'BENTO'
      : 'MAGAZINE';

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`font-mono text-xs font-bold px-3 py-1.5 transition-all flex items-center gap-2 ${
          isEditorial
            ? 'rounded-lg bg-zinc-900 border border-zinc-700 text-white hover:border-zinc-500 shadow-sm font-serif italic'
            : isMinimal
            ? 'rounded-full bg-zinc-900/90 border border-zinc-800 text-white hover:bg-zinc-800 shadow-sm'
            : isBento
            ? 'rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-md shadow-md'
            : 'border-2 border-white bg-[#161616] text-white hover:bg-[#222222] brutal-btn shadow-brutal-sm'
        }`}
        title="Customize Theme & Design Style"
        aria-label="Customize Theme & Design Style"
      >
        <span
          className={`w-2.5 h-2.5 inline-block ${isMinimal || isBento ? 'rounded-full' : isEditorial ? 'rounded-sm rotate-45' : 'border border-black'}`}
          style={{ backgroundColor: currentTheme.primary }}
        ></span>
        <FaPalette className="text-white w-3 h-3" />
        {!compact && (
          <span className="hidden sm:inline-block font-mono text-[11px] uppercase tracking-wider not-italic">
            {modeLabel} · {currentTheme.name}
          </span>
        )}
        <span className="font-mono text-[10px] text-zinc-400">▾</span>
      </button>

      {/* Popover */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-80 z-50 animate-in fade-in zoom-in-95 duration-100 ${
            isEditorial
              ? 'bg-[#0f0f11] border border-zinc-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-xl'
              : isBento
              ? 'bg-zinc-950/90 border border-white/10 rounded-3xl p-4 shadow-2xl backdrop-blur-2xl'
              : isMinimal
              ? 'bg-zinc-950/95 border border-zinc-800/90 rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl'
              : 'bg-[#121212] border-2 border-white p-3 shadow-brutal-accent'
          }`}
        >
          {/* Design Mode Selector Segment */}
          <div className="mb-3.5 pb-3 border-b border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                DESIGN STYLE
              </span>
              <span
                className={`font-mono text-[9px] px-2 py-0.5 font-bold ${
                  isBento
                    ? 'rounded-full bg-white/10 text-accent border border-white/10'
                    : isEditorial
                    ? 'rounded-md bg-zinc-800 text-accent border border-zinc-700 font-serif'
                    : 'rounded-full bg-zinc-800 text-accent'
                }`}
              >
                {modeLabel}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-900/90 rounded-xl border border-zinc-800">
              <button
                type="button"
                onClick={() => setDesignMode('minimalist')}
                className={`py-1.5 px-1.5 rounded-lg text-[10px] font-mono font-medium flex flex-col items-center justify-center gap-1 transition-all ${
                  designMode === 'minimalist'
                    ? 'bg-accent text-black font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <FaFeatherAlt className="w-2.5 h-2.5" />
                <span>MINIMAL</span>
              </button>

              <button
                type="button"
                onClick={() => setDesignMode('brutalist')}
                className={`py-1.5 px-1.5 rounded-lg text-[10px] font-mono font-medium flex flex-col items-center justify-center gap-1 transition-all ${
                  designMode === 'brutalist'
                    ? 'bg-accent text-black font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <FaSquare className="w-2.5 h-2.5" />
                <span>BRUTAL</span>
              </button>

              <button
                type="button"
                onClick={() => setDesignMode('bento')}
                className={`py-1.5 px-1.5 rounded-lg text-[10px] font-mono font-medium flex flex-col items-center justify-center gap-1 transition-all ${
                  designMode === 'bento'
                    ? 'bg-accent text-black font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <FaTh className="w-2.5 h-2.5" />
                <span>BENTO</span>
              </button>

              <button
                type="button"
                onClick={() => setDesignMode('editorial')}
                className={`py-1.5 px-1.5 rounded-lg text-[10px] font-mono font-medium flex flex-col items-center justify-center gap-1 transition-all ${
                  designMode === 'editorial'
                    ? 'bg-accent text-black font-bold shadow-sm font-serif'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <FaBookOpen className="w-2.5 h-2.5" />
                <span>MAGAZINE</span>
              </button>
            </div>
          </div>

          {/* Color Palette List */}
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60 mb-2.5">
            <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              COLOR PALETTES
            </span>
            <span className="font-mono text-[9px] text-zinc-500">6 PRESETS</span>
          </div>

          <div className="space-y-1.5 max-h-60 overflow-y-auto no-scrollbar">
            {themes.map((t) => {
              const isSelected = currentTheme.id === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                  }}
                  className={`w-full text-left p-2 transition-all flex items-center justify-between ${
                    isEditorial
                      ? `rounded-xl border ${
                          isSelected
                            ? 'bg-zinc-800/90 border-zinc-600 font-bold'
                            : 'bg-zinc-900/40 border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-900'
                        }`
                      : isBento
                      ? `rounded-2xl border ${
                          isSelected
                            ? 'bg-white/8 border-white/20 font-bold'
                            : 'bg-white/3 border-white/8 hover:border-white/15 hover:bg-white/6'
                        }`
                      : isMinimal
                      ? `rounded-xl border ${
                          isSelected
                            ? 'bg-zinc-800/90 border-zinc-600 font-bold'
                            : 'bg-zinc-900/40 border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-900'
                        }`
                      : `border ${
                          isSelected
                            ? 'bg-[#1e1e1e] border-white font-bold'
                            : 'bg-[#161616] border-[#2c2c2c] hover:border-white hover:bg-[#202020]'
                        }`
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Dual color swatch */}
                    <div className={`flex items-center overflow-hidden ${isMinimal || isBento || isEditorial ? 'rounded-md' : 'border border-black'}`}>
                      <span
                        className="w-3 h-4 inline-block"
                        style={{ backgroundColor: t.primary }}
                      ></span>
                      <span
                        className="w-3 h-4 inline-block"
                        style={{ backgroundColor: t.secondary }}
                      ></span>
                    </div>

                    <div>
                      <div className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{t.name}</span>
                        <span className="text-[9px] text-zinc-500">[{t.code}]</span>
                      </div>
                      <div className="font-mono text-[9px] text-zinc-400 truncate max-w-[140px]">
                        {t.description}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: t.primary }}
                    >
                      <FaCheck />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-2.5 pt-2 border-t border-zinc-800/60 font-mono text-[9px] text-zinc-500 text-center">
            Settings auto-saved to local preferences
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
