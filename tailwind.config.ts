
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FEF3F6", // Light Pink (replaced Soft Orange)
          foreground: "#3A3A3A", // Dark text
          feminine: "#F6A8C0", // Soft Pink (replaced #F7A8C1)
        },
        secondary: {
          DEFAULT: "#FEF7CD", // Soft Yellow
          foreground: "#3A3A3A", // Dark text
          feminine: "#FCD5E5", // Light Pink
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#FEF3F6", // Light Pink (replaced Soft Peach)
          foreground: "#3A3A3A", // Dark text
          feminine: "#FFF0F6", // Very Light Pink
        },
        accent: {
          DEFAULT: "#F6A8C0", // Soft Pink (replaced Soft Orange)
          foreground: "#3A3A3A", // Dark text
          feminine: "#F6A8C0", // Soft Pink (replaced #F7A8C1)
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        pink: {
          50: "#FFF0F6",
          100: "#FCD5E5",
          200: "#FAB8D9",
          300: "#F492C1",
          400: "#F06CA8",
          500: "#E84A8A",
          600: "#C83571",
          700: "#A62458",
          800: "#851A45",
          900: "#630D2F",
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
