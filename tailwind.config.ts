import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette - Sage & nature
        'primary': {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d2c7',
          300: '#9fb19f',
          400: '#779077',
          500: '#5a7260', // Main sage green
          600: '#4a5d4e',
          700: '#3d4a40',
          800: '#323c34',
          900: '#2a322c',
        },
        // Secondary - Earth & warmth
        'accent': {
          50: '#faf8f5',
          100: '#f3ede4',
          200: '#e6dbc8',
          300: '#d4c2a5',
          400: '#bfa180',
          500: '#a68862', // Warm tan
          600: '#8f6f4f',
          700: '#765a42',
          800: '#624a39',
          900: '#534032',
        },
        // Track-inspired athletic tones
        'track': {
          'sage': '#87a08a',
          'moss': '#65785a',
          'olive': '#8b8c5a',
          'sand': '#d4c2a5',
        },
        // Athletic neutrals
        'neutral': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-track': 'linear-gradient(135deg, #5a7260 0%, #9fb19f 100%)',
        'gradient-energy': 'linear-gradient(135deg, #4a5d4e 0%, #87a08a 100%)',
        'gradient-mental': 'linear-gradient(135deg, #3d4a40 0%, #5a7260 100%)',
        'gradient-victory': 'linear-gradient(135deg, #779077 0%, #a68862 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
export default config