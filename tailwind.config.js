/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans-serif': 'var(--font-open-sans)'
      },
      colors: {
        'timer-bg': 'var(--color-timer-bg)',
        'timer-text': 'var(--color-timer-text)',
        'timer-content': 'var(--color-timer-content)',
        'timer-content-secondary': 'var(--color-timer-content-secondary)',

        'circle-bg': 'var(--color-circle-bg)',
        'circle-bg-active': 'var(--color-circle-bg-active)',
        'circle-bg-completed': 'var(--color-circle-bg-completed)',

        'button-outline': 'var(--color-button-outline)',
      },

      fontSize: {
        'title': 'var(--font-size-title)',
        'timer': 'var(--font-size-timer)',
        'time-left': 'var(--font-size-time-left)',
        'button': 'var(--font-size-button)',
      },
      lineHeight: {
        'title': 'var(--line-height-title)',
        'timer': 'var(--line-height-timer)',
        'time-left': 'var(--line-height-time-left)',
        'button': 'var(--line-height-button)',
      },
      borderRadius: {
        'button': 'var(--border-radius-button)',
        'circle': 'var(--border-radius-circle)',
      },
    },
  },
  plugins: [],
}

