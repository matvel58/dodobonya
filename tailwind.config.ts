import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B1220",
        "text-primary": "#F5F7FA",
        accent: "#FF6A00",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "gradient-border": "gradient-border 3s ease infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "shimmer": "shimmer 2s ease-in-out infinite",
        "mesh": "mesh 20s ease infinite",
      },
      keyframes: {
        "gradient-border": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(255, 106, 0, 0.4)" },
          "50%": { opacity: "0.9", boxShadow: "0 0 40px rgba(255, 106, 0, 0.6)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        mesh: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, #FF6A00 0%, #FF8C42 50%, #FF6A00 100%)",
        "gradient-glow": "radial-gradient(ellipse at center, rgba(255, 106, 0, 0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
