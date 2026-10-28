/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    // Preserve Tailwind 3's effective screen/container sizes. Tailwind 4's
    // rem caps would scale with this site's 17px root font instead.
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        // The CSS tokens own both themes; do not maintain a second palette.
        night: "var(--night)",
        lantern: "var(--lantern)",
        horizon: "var(--horizon)",
        parchment: "var(--parchment)",
        surface: {
          DEFAULT: "var(--bg)",
          light: "var(--bg-raised)",
          dark: "var(--bg-sunken)",
        },
        text: {
          DEFAULT: "var(--fg)",
          muted: "var(--fg-2)",
          dim: "var(--fg-3)",
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
            "--tw-prose-body": "var(--fg)",
            "--tw-prose-headings": "var(--fg-1)",
            "--tw-prose-links": "var(--link)",
            "--tw-prose-bold": "var(--fg-1)",
            "--tw-prose-code": "var(--fg)",
            "--tw-prose-pre-bg": "var(--night)",
            "--tw-prose-pre-code": "var(--parchment)",
            "--tw-prose-quotes": "var(--fg-2)",
            "--tw-prose-quote-borders": "var(--rule-strong)",
            "--tw-prose-hr": "var(--rule)",
            "--tw-prose-th-borders": "var(--rule)",
            "--tw-prose-td-borders": "var(--rule)",
          },
        },
      },
    },
  },
  plugins: [],
}
