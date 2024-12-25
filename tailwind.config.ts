import type { Config } from "tailwindcss";

const colors = {
  red: "#FF3B30",
  orange: "#FF9500",
  yellow: "#FFCC00",
  green: "#34C759",
  blue: "#007AFF",
  indigo: "#5856D6",
  purple: "#AF52DE",
  pink: "#FF2D55",
  brown: "#A2845E",
};

export default {
  content: [
    "src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-[#FF3B30]",
    "bg-[#FF9500]",
    "bg-[#FFCC00]",
    "bg-[#34C759]",
    "bg-[#007AFF]",
    "bg-[#5856D6]",
    "bg-[#AF52DE]",
    "bg-[#FF2D55]",
    "bg-[#A2845E]",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        custom: colors,
      },
    },
  },
  plugins: [],
} satisfies Config;
