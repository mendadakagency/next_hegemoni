/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Match the existing brand palette so Tailwind utilities stay on-brand
        crimson: "#B91C1C",
        imperial: "#1E3A8A",
        gold: "#C8830C",
        ink: "#0A0A0A",
        carbon: "#1C1C1C",
        paper: "#F5F1EA",
        sand: "#EDE7DA",
        amber: "#9A5F08",
        bronze: "#8A5A2B",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
