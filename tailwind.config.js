/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // DARPANA Design System
        obsidian: '#1A1C1E',     // Deep Obsidian - background
        slate: '#2A2D31',        // Warm Slate - card
        sand: '#E2DFD8',         // Soft Sand - text
        gold: '#C29B57',         // Antique Gold - accent
        sage: '#7A8B70',         // Sage Green - secondary accent
        'gold-dim': '#8A6E3F',   // Dimmed gold for user bubble
        'slate-light': '#363A3F',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.15)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
