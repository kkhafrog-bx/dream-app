import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        foreground: "#e5e7eb",
        "dream-purple": {
          500: "#7c3aed",
          600: "#6d28d9",
          700: "#5b21b6"
        },
        "dream-gold": {
          400: "#facc15",
          500: "#eab308"
        }
      },
      boxShadow: {
        "dream-glow":
          "0 0 40px rgba(124, 58, 237, 0.45), 0 0 80px rgba(234, 179, 8, 0.25)"
      },
      backgroundImage: {
        "dream-radial":
          "radial-gradient(circle at top, rgba(124, 58, 237, 0.5), transparent 60%), radial-gradient(circle at bottom, rgba(234, 179, 8, 0.35), transparent 55%)"
      }
    }
  },
  plugins: []
};

export default config;

