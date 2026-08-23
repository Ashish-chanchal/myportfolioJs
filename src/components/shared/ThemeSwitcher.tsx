import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaPalette, FaCheck } from 'react-icons/fa';

export const ThemeSwitcher: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="font-mono text-xs font-bold px-2.5 py-1.5 border-2 border-white bg-[#161616] text-white hover:bg-[#222222] transition-all brutal-btn flex items-center gap-2 shadow-brutal-sm"
        title="Switch Color Theme Variant"
        aria-label="Switch Theme Variant"
      >
        <span
          className="w-2.5 h-2.5 inline-block border border-black"
          style={{ backgroundColor: currentTheme.primary }}
        ></span>
        <FaPalette className="text-white w-3 h-3" />
        {!compact && (
          <span className="hidden sm:inline-block font-mono text-[11px] uppercase">
            {currentTheme.name}
          </span>
        )}
        <span className="font-mono text-[10px] text-[#888888]">▾</span>
      </button>

      {/* Brutalist Variant Selector Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#121212] border-2 border-white p-3 shadow-brutal-accent z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center justify-between pb-2 border-b border-[#262626] mb-3">
            <span className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">
              // SELECT COLOR VARIANT
            </span>
            <span className="font-mono text-[9px] bg-[#1f1f1f] text-[#00FF66] px-1.5 py-0.5 border border-[#333]">
              6 PRESETS
            </span>
          </div>

          <div className="space-y-1.5">
            {themes.map((t) => {
              const isSelected = currentTheme.id === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2 border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1e1e1e] border-white font-bold'
                      : 'bg-[#161616] border-[#2c2c2c] hover:border-white hover:bg-[#202020]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {/* Dual color swatch */}
                    <div className="flex items-center border border-black shadow-[1px_1px_0px_0px_#ffffff]">
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
                        <span className="text-[9px] text-[#666666]">[{t.code}]</span>
                      </div>
                      <div className="font-mono text-[9px] text-[#888888] truncate max-w-[140px]">
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

          <div className="mt-3 pt-2 border-t border-[#262626] font-mono text-[9px] text-[#666666] text-center">
            SAVED AUTOMATICALLY TO PERSISTENT STATE
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
