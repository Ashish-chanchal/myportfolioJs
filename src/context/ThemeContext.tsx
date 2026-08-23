import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';

export interface ThemeConfig {
  id: string;
  name: string;
  code: string;
  primary: string;
  secondary: string;
  tertiary: string;
  description: string;
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
  },
  {
    id: 'matrix-terminal',
    name: 'MATRIX GREEN',
    code: '02_LIME',
    primary: '#00FF66',
    secondary: '#00F0FF',
    tertiary: '#FFFFFF',
    description: 'High-voltage matrix terminal emerald',
  },
  {
    id: 'synth-orchid',
    name: 'SYNTH ORCHID',
    code: '03_MAGENTA',
    primary: '#C778DD',
    secondary: '#00F0FF',
    tertiary: '#00FF66',
    description: 'Cyberpunk lilac orchid & cyan highlights',
  },
  {
    id: 'ember-flame',
    name: 'EMBER FLAME',
    code: '04_ORANGE',
    primary: '#FF6B00',
    secondary: '#FF3366',
    tertiary: '#00F0FF',
    description: 'Industrial blazing tangerine & hot crimson',
  },
  {
    id: 'mono-stark',
    name: 'MONO STARK',
    code: '05_WHITE',
    primary: '#FFFFFF',
    secondary: '#A3A3A3',
    tertiary: '#00FF66',
    description: 'Ultra-clean stark black & white brutalism',
  },
  {
    id: 'amber-gold',
    name: 'AMBER GOLD',
    code: '06_AMBER',
    primary: '#F59E0B',
    secondary: '#00F0FF',
    tertiary: '#00FF66',
    description: 'Warm industrial amber & cyan telemetry',
  },
];

interface ThemeContextType {
  currentTheme: ThemeConfig;
  setTheme: (themeId: string) => void;
  themes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const applyThemeVariables = (theme: ThemeConfig) => {
  const root = document.documentElement;
  root.style.setProperty('--accent-primary', theme.primary);
  root.style.setProperty('--accent-secondary', theme.secondary);
  root.style.setProperty('--accent-tertiary', theme.tertiary);
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
      return saved && THEMES.some((t) => t.id === saved) ? saved : 'cyber-ice';
    } catch {
      return 'cyber-ice';
    }
  });

  const currentTheme = THEMES.find((t) => t.id === themeId) || THEMES[0];

  // Apply immediately before painting
  useLayoutEffect(() => {
    applyThemeVariables(currentTheme);
    try {
      localStorage.setItem('ashish-portfolio-theme', currentTheme.id);
    } catch {
      // ignore in restricted environments
    }
  }, [currentTheme]);

  useEffect(() => {
    applyThemeVariables(currentTheme);
  }, [currentTheme]);

  const setTheme = (id: string) => {
    const found = THEMES.find((t) => t.id === id);
    if (found) {
      applyThemeVariables(found);
      setThemeId(id);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes: THEMES }}>
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
