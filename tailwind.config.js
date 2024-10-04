/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      primary: {
        scissors:  'hsl(39deg 89% 49%)',
        'scissors-dark':  'hsl(39deg 89% 40%)',
        paper: 'hsl(230, 89%, 62%)',
        'paper-dark': 'hsl(230, 89%, 52%)',
        rock: 'hsl(349, 71%, 52%)',
        'rock-dark': 'hsl(349, 71%, 42%)',
        lizard: 'hsl(261, 73%, 60%)',
        'lizard-dark': 'hsl(261, 73%, 50%)',
        spock: 'hsl(189, 59%, 53%)',
        'spock-dark': 'hsl(189, 59%, 43%)',
      },
      neutral: {
        dark: "hsl(229, 25%, 31%)",
        score: "hsl(229, 64%, 46%)",
        outline: "hsl(217, 16%, 45%)",
      },
      "radial-gradient-from":
        "radial-gradient(hsl(214, 47%, 23%), hsl(237, 49%, 15%))",
    },
    fontFamily: {
      barlow: ["Barlow Semi Condensed", "sans-serif"],
    },
  },
  plugins: [],
};
