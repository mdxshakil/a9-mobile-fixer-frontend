/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      primary: ["Raleway", "sans-serif"]
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      myTheme: {
        "primary": "#FF8551",
        "secondary": "#f6d860",
        "accent": "#37cdbe",
        "neutral": "#3d4451",
        "base-100": "#ffffff",
      }
    }],
  },


}