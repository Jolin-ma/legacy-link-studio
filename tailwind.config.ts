import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bone: "#F6F1E9",
        ivory: "#FBF8F3",
        charcoal: "#231F1C",
        espresso: "#2E2620",
        gold: {
          DEFAULT: "#AD8A56",
          light: "#C7A876",
          dark: "#8C6F41",
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
