/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './.vitepress/**/*.{js,ts,vue}',
    './posts/**/*.md',
    './index.md',
    './about.md',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'vp-c-brand': {
          1: '#6366f1',
          2: '#818cf8',
          3: '#a5b4fc',
        }
      }
    },
  },
  plugins: [],
}
