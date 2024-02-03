/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      light: {
        "primary": "#FF8551",
        "secondary": "#f6d860",
        "accent": "#111827",
        "neutral": "#3d4451",
        "base-100": "#ffffff",
      },
      // dark: {
      //   "primary": "#FF8551",
      //   "secondary": "#f6d860",
      //   "accent": "#f5f5f5",
      //   "neutral": "#3d4451",
      //   "base-100": "#15202B",
      // }
    }],
  },
}