/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#feda6a",
        light: "#d4d4dc",
        darkGray: "#1d1e22",
        mediumGray: "#393f4d",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
