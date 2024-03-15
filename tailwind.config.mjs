import starlightPlugin from "@astrojs/starlight-tailwind";

// Generated color palettes
const accent = {
  200: "#f9b2bd",
  600: "#c60051",
  900: "#610225",
  950: "#430c1b",
};
const gray = {
  100: "#f0f8fb",
  200: "#e2f1f7",
  300: "#b3c5ce",
  400: "#6e92a1",
  500: "#3b5e6c",
  700: "#1b3d4a",
  800: "#072b38",
  900: "#0c1a20",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: { accent, gray },
    },
  },
  plugins: [starlightPlugin()],
};
