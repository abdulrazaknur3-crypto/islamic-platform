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
        secondary: '#17858E',
        sand: '#D9B98A',
        cream: '#F7F3EC',
        ink: '#1C2B2D',
      },
      fontFamily: {
        arabic: ['"Noto Naskh Arabic"', '"Noto Sans Arabic"', 'serif'],
        latin: ['"Noto Sans"', 'system-ui', 'sans-serif'],
        ethiopic: ['"Noto Sans Ethiopic"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
