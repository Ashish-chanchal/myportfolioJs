/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent-primary, #00F0FF)",
        accentSec: "var(--accent-secondary, #C778DD)",
        accentTertiary: "var(--accent-tertiary, #00FF66)",
        void: "#0a0a0a",
        surface: "#121212",
        surfaceAlt: "#1a1a1a",
        primary: "#0a0a0a",
        secondary: "var(--accent-primary, #00F0FF)",
        brutalCyan: "#00F0FF",
        brutalMagenta: "#C778DD",
        brutalGreen: "#00FF66",
        brutalOrange: "#FF6B00",
        brutalPink: "#FF3366",
        brutalWhite: "#FFFFFF",
        brutalBorder: "#262626",
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Space Mono"', "monospace"],
        heading: ['"Space Grotesk"', "sans-serif"],
        sans: ['"Space Grotesk"', "sans-serif"],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0px 0px #ffffff',
        'brutal': '4px 4px 0px 0px #ffffff',
        'brutal-lg': '6px 6px 0px 0px #ffffff',
        'brutal-accent': '4px 4px 0px 0px var(--accent-primary, #00F0FF)',
        'brutal-accent-lg': '6px 6px 0px 0px var(--accent-primary, #00F0FF)',
        'brutal-sec': '4px 4px 0px 0px var(--accent-secondary, #C778DD)',
        'brutal-cyan': '4px 4px 0px 0px #00F0FF',
        'brutal-cyan-lg': '6px 6px 0px 0px #00F0FF',
        'brutal-magenta': '4px 4px 0px 0px #C778DD',
        'brutal-green': '4px 4px 0px 0px #00FF66',
        'brutal-pink': '4px 4px 0px 0px #FF3366',
        'brutal-black': '4px 4px 0px 0px #000000',
        'brutal-black-lg': '6px 6px 0px 0px #000000',
      },
      animation: {
        'ticker': 'ticker 25s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
