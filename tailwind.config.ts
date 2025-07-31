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
        cream: '#FFF8E7',
        brown: '#8B4513',
        'carolina-blue': '#4B9CD3',
        'dark-brown': '#3E2723',
        'medium-brown': '#795548',
        beige: '#F5F5DC',
      },
    },
  },
  plugins: [],
}
export default config
