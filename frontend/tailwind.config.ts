import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#e60012',
          dark: '#b3000e',
        },
      },
    },
  },
  plugins: [],
} satisfies Config

