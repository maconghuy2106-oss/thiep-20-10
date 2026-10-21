/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fff7f9",
          100: "#ffeef3",
          200: "#ffdee9",
          300: "#ffc6d9",
          400: "#f9a8c3",
          500: "#ef87a9",
          600: "#dd6489",
          700: "#bd4b6d",
          800: "#9c3d59",
          900: "#82364c",
        },
        cream: {
          100: "#fffaf3",
          200: "#fff3e4",
          300: "#fdebd8",
        },
        ink: {
          100: "#8a5a66",
          200: "#7a4a55",
          300: "#5f3a44",
        },
        gold: {
          soft: "#d9a94e",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"Lora"', "Georgia", "serif"],
        script: ['"Dancing Script"', "cursive"],
      },
    },
  },
  plugins: [],
};
