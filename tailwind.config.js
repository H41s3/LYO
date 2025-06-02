/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#121a29",
        space: "#0a0a0a",
        neon: {
          cyan: "#00e5ff",
          pink: "#ff3898",
          blue: "#4361ee",
          purple: "#9d4edd",
        },
        success: {
          light: "#a7f3d0",
          DEFAULT: "#10b981",
          dark: "#065f46",
        },
        warning: {
          light: "#fde68a",
          DEFAULT: "#f59e0b",
          dark: "#92400e",
        },
        error: {
          light: "#fecaca",
          DEFAULT: "#ef4444",
          dark: "#991b1b",
        },
        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          medium: "rgba(255, 255, 255, 0.05)",
          dark: "rgba(0, 0, 0, 0.3)",
        }
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(0, 229, 255, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(0, 229, 255, 0.8)" },
        },
      },
      backgroundImage: {
        'grid-pattern': "url('/src/assets/grid-pattern.svg')",
        'circuit-pattern': "url('/src/assets/circuit-pattern.svg')",
      },
      boxShadow: {
        'neon-cyan': '0 0 8px rgba(0, 229, 255, 0.6)',
        'neon-pink': '0 0 8px rgba(255, 56, 152, 0.6)',
      },
    },
  },
  plugins: [],
}