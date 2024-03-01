/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#111827',
          secondary: '#1f2937',
          accent: '#374151',
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
