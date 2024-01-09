/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        title: ['Metropolis', 'serif'],
        body: ['IBM Plex Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

