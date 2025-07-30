/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  daisyui: {
    logs: false,
    themes: [
      {
        mytheme: {
          primary: '#242938',
          neutral: '#000000',
          'base-100': '#f4f2ed',
          info: '#0284c7',
          success: '#15803d',
          warning: '#ffc600',
          error: '#dc2626'
        }
      }
    ]
  },
  plugins: [require('daisyui')]
};
