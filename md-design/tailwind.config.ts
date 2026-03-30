import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: { DEFAULT: "#F7F4EF", dark: "#EDE8DF" },
        obsidian: { DEFAULT: "#15130F", light: "#1E1B16" },
        gold: { DEFAULT: "#D0B16C", light: "#E9D9A9", dark: "#A78B4E" },
        stone: { DEFAULT: "#7A7367", light: "#A89F94" },
        surface: "#FFFFFF",
        border: "#E0D9CF",
      },
    },
  },
  plugins: [],
};
export default config;
