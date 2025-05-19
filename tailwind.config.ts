import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './cobra-unit/src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './cobra-unit/src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './cobra-unit/src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#22d3ee',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config 