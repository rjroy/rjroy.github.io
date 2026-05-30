/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Core palette
        brass: {
          50: "#fdf6ed",
          100: "#f9e8d0",
          200: "#f2ce9e",
          300: "#e9ae6a",
          400: "#e09440", // primary brass
          500: "#c4956a", // muted brass
          600: "#b07a4a",
          700: "#8c5d35",
          800: "#6d4528",
          900: "#4e301d",
        },
        gold: {
          400: "#f4c542", // bright gold
          500: "#d4a830",
          600: "#b48e20",
        },
        surface: {
          DEFAULT: "#1a1510",
          light: "#28231f",
          lighter: "#322d28",
          dark: "#16120e",
        },
        text: {
          DEFAULT: "#f5f0e8",
          muted: "#a89f91",
          dim: "#6b6358",
        },
        // Light mode surfaces
        "surface-light": {
          DEFAULT: "#f5f0e8",
          dark: "#e8e0d4",
          darker: "#d4c9b8",
        },
        "text-light": {
          DEFAULT: "#2a2520",
          muted: "#5c554b",
          dim: "#8a8078",
        },
      },
      fontFamily: {
        // Match the new design tokens (see src/styles/tokens.css)
        heading: ['"IM Fell English SC"', '"Cormorant Garamond"', "serif"],
        body: ['"Vollkorn"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', '"Menlo"', "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#f5f0e8",
            "--tw-prose-headings": "#f4c542",
            "--tw-prose-links": "#e09440",
            "--tw-prose-bold": "#f5f0e8",
            "--tw-prose-code": "#e09440",
            "--tw-prose-pre-bg": "#16120e",
            "--tw-prose-pre-code": "#f5f0e8",
            "--tw-prose-quotes": "#a89f91",
            "--tw-prose-quote-borders": "#c4956a",
            "--tw-prose-hr": "#2c2720",
            "--tw-prose-th-borders": "#2c2720",
            "--tw-prose-td-borders": "#28231f",
          },
        },
      },
    },
  },
  plugins: [],
}
