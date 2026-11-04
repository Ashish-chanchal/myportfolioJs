import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';

export type DesignMode = 'premium' | 'brutalist' | 'minimalist' | 'bento' | 'editorial' | 'retro';

export interface ThemeConfig {
  id: string;
  name: string;
  code: string;
  primary: string;
  secondary: string;
  tertiary: string;
  description: string;
  /** Playful mode block colours: peach, mint, lilac, butter, sky */
  pastels: [string, string, string, string, string];
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'cyber-ice',
    name: 'CYBER ICE',
    code: '01_CYAN',
    primary: '#00F0FF',
    secondary: '#C778DD',
    tertiary: '#00FF66',
    description: 'Electric ice cyan with cyber lilac accents',
    pastels: ['#cdf3f7', '#e6dcff', '#d6f5e3', '#e3eeff', '#d4ecff'],
  },
  {
    id: 'matrix-terminal',
    name: 'MATRIX GREEN',
    code: '02_LIME',
    primary: '#00FF66',
    secondary: '#00F0FF',
    tertiary: '#FFFFFF',
    description: 'High-voltage matrix terminal emerald',
    pastels: ['#d3f5e0', '#e6f7c8', '#cdeff0', '#f3f7c9', '#dff2e6'],
  },
  {
    id: 'synth-orchid',
    name: 'SYNTH ORCHID',
    code: '03_MAGENTA',
    primary: '#C778DD',
    secondary: '#00F0FF',
    tertiary: '#00FF66',
    description: 'Cyberpunk lilac orchid & cyan highlights',
    pastels: ['#ecd9f7', '#f9d6ea', '#d9dcff', '#f6dcf2', '#e2d3ff'],
  },
  {
    id: 'ember-flame',
    name: 'EMBER FLAME',
    code: '04_ORANGE',
    primary: '#FF6B00',
    secondary: '#FF3366',
    tertiary: '#00F0FF',
    description: 'Industrial blazing tangerine & hot crimson',
    pastels: ['#ffd9c9', '#cdeedd', '#e2d9ff', '#fff0b8', '#d4e8ff'],
  },
  {
    id: 'mono-stark',
    name: 'MONO STARK',
    code: '05_WHITE',
    primary: '#FFFFFF',
    secondary: '#A3A3A3',
    tertiary: '#00FF66',
    description: 'Ultra-clean stark black & white brutalism',
    pastels: ['#ececea', '#dedcd8', '#f4f2ee', '#d6d4cf', '#e6e3de'],
  },
  {
    id: 'amber-gold',
    name: 'AMBER GOLD',
    code: '06_AMBER',
    primary: '#F59E0B',
    secondary: '#00F0FF',
    tertiary: '#00FF66',
    description: 'Warm industrial amber & vintage telemetry',
    pastels: ['#ffe7b0', '#ffd9a0', '#fff1c4', '#fbe0c0', '#f7e9b8'],
  },
  {
    id: 'vintage-sepia',
    name: 'VINTAGE SEPIA',
    code: '07_RETRO',
    primary: '#E5A93C',
    secondary: '#56B6C2',
    tertiary: '#98C379',
    description: 'Nostalgic 1980s computer CRT & parchment tones',
    pastels: ['#ead9bd', '#d9e2c4', '#e8cfbf', '#efe1b5', '#d8dcc9'],
  },
];

interface ThemeContextType {
  currentTheme: ThemeConfig;
  setTheme: (themeId: string) => void;
  themes: ThemeConfig[];
  designMode: DesignMode;
  setDesignMode: (mode: DesignMode) => void;
  toggleDesignMode: () => void;
  isTransitioning: boolean;
  transitionMode: DesignMode;
  transitionTheme: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const applyThemeVariables = (theme: ThemeConfig) => {
  const root = document.documentElement;
  root.style.setProperty('--accent-primary', theme.primary);
  root.style.setProperty('--accent-secondary', theme.secondary);
  root.style.setProperty('--accent-tertiary', theme.tertiary);
  ['peach', 'mint', 'lilac', 'butter', 'sky'].forEach((n, i) => root.style.setProperty(`--pm-${n}`, theme.pastels[i]));
  if (document.body) {
    document.body.style.setProperty('--accent-primary', theme.primary);
    document.body.style.setProperty('--accent-secondary', theme.secondary);
    document.body.style.setProperty('--accent-tertiary', theme.tertiary);
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('ashish-portfolio-theme');
      return saved && THEMES.some((t) => t.id === saved) ? saved : 'ember-flame';
    } catch {
      return 'ember-flame';
    }
  });

  const [designMode, setDesignModeState] = useState<DesignMode>(() => {
    try {
      const savedMode = localStorage.getItem('ashish-portfolio-design-mode');
      return savedMode === 'premium' || savedMode === 'brutalist' || savedMode === 'minimalist' || savedMode === 'bento' || savedMode === 'editorial' || savedMode === 'retro'
        ? (savedMode as DesignMode)
        : 'premium';
    } catch {
      return 'premium';
    }
  });

  const currentTheme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  // Transition overlay is retired; these stay in the context shape for compatibility.
  const isTransitioning = false;
  const transitionMode = designMode;
  const transitionTheme = currentTheme;

  useLayoutEffect(() => {
    applyThemeVariables(currentTheme);
    document.documentElement.setAttribute('data-design-mode', designMode);
    try {
      localStorage.setItem('ashish-portfolio-theme', currentTheme.id);
      localStorage.setItem('ashish-portfolio-design-mode', designMode);
    } catch {
      // ignore
    }
  }, [currentTheme, designMode]);

  useEffect(() => {
    applyThemeVariables(currentTheme);
    document.documentElement.setAttribute('data-design-mode', designMode);
  }, [currentTheme, designMode]);

  // Switching is instant: no overlay, no colour fade.
  const setTheme = (id: string) => {
    const found = THEMES.find((t) => t.id === id);
    if (found && found.id !== themeId) {
      applyThemeVariables(found);
      setThemeId(id);
    }
  };

  const setDesignMode = (mode: DesignMode) => {
    if (mode === designMode) return;
    setDesignModeState(mode);
    document.documentElement.setAttribute('data-design-mode', mode);
    try {
      localStorage.setItem('ashish-portfolio-design-mode', mode);
    } catch {
      // ignore
    }
  };

  // Cycle: minimalist → brutalist → bento → editorial → retro → minimalist
  const toggleDesignMode = () => {
    const cycle: DesignMode[] = ['premium', 'minimalist', 'brutalist', 'bento', 'editorial', 'retro'];
    const nextIndex = (cycle.indexOf(designMode) + 1) % cycle.length;
    setDesignMode(cycle[nextIndex]);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme,
        themes: THEMES,
        designMode,
        setDesignMode,
        toggleDesignMode,
        isTransitioning,
        transitionMode,
        transitionTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
