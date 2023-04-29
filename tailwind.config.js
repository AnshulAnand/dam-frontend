/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lightColor: '#3d3d3d',
        lightColorAlt: 'rgba(0, 0, 0, .6)',
        primaryBackgroundColorLight: '#fff',
        secondaryBackgroundColorLight: '#f1f1f1',
        transparentLightColor: '#f1f1f1',
        transparentDarkColor: 'rgba(0,0,0,.75)',
      },
    },
  },
  plugins: [],
}
