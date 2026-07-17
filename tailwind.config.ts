import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0E5C63',
        'primary-dark': '#004349',
        secondary: '#17858E',
        sand: '#D9B98A',
        'sand-light': '#EFE3CE',
        cream: '#F7F3EC',
        surface: '#FDF9F2',
        ink: '#11212D',
        'ink-soft': '#3F484A',
      },
      fontFamily: {
        arabic: ['"IBM Plex Sans Arabic"', 'sans-serif'],
        latin: ['Inter', 'system-ui', 'sans-serif'],
        ethiopic: ['"Noto Sans Ethiopic"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
