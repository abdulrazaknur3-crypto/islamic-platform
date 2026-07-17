import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-sea': '#0E5C63',
        'shore-blue': '#17858E',
        'dune-gold': '#D9B98A',
        parchment: '#F7F3EC',
        'earth-brown': '#614D3C',
        'ink-text': '#11212D',
        background: '#FDF9F2',
        surface: '#FDF9F2',
        'surface-container': '#F1EDE6',
        'surface-container-low': '#F7F3EC',
        'surface-container-highest': '#E6E2DB',
        'on-surface-variant': '#3F484A',
        'on-primary-container': '#90D2DA',
        outline: '#6F797A',
        'outline-variant': '#BFC8C9',
        primary: '#0E5C63',
        'primary-dark': '#004349',
        secondary: '#17858E',
        sand: '#D9B98A',
        cream: '#F7F3EC',
        ink: '#11212D',
        'ink-soft': '#3F484A',
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '60px', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '40px', fontWeight: '600' }],
        'title-md': ['20px', { lineHeight: '28px', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '30px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-sm': ['13px', { lineHeight: '16px', letterSpacing: '0.02em', fontWeight: '600' }],
      },
      maxWidth: {
        'container-max': '1200px',
      },
      fontFamily: {
        arabic: ['"IBM Plex Sans Arabic"', 'sans-serif'],
        latin: ['Inter', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        ethiopic: ['"Noto Sans Ethiopic"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
