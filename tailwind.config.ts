import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        ink: '#111010',
        parchment: '#f8f5f1',
        accent: '#6b4f3f'
      },
      boxShadow: {
        soft: '0 12px 40px rgba(17, 16, 16, 0.12)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
