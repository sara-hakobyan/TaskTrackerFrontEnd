import type { Config } from "tailwindcss";

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
      },
    },
  },
  plugins: [],
} satisfies Config;
