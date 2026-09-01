import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bone: "#F1EBE0",
        ivory: "#F9F5F1",
        charcoal: "#301F00",
        espresso: "#2A211A",
        grey: "#898D8F",
        forest: {
          DEFAULT: "#2A4B22",
          light: "#CEF5CA",
          deep: "#1B3316",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        wider2: "0.18em",
      },
      transitionTimingFunction: {
        dissolve: "cubic-bezier(0.45, 0, 0.15, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
