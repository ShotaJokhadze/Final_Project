/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        red: "rgb(239 68 68)",
        light: "#d4d4dc",
        darkGray: "#1d1e22",
        mediumGray: "#393f4d",
        darkRed: "rgb(220 38 38)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
