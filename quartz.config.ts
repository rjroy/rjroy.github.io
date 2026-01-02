import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Ron's Broadcast Cache",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "rjroy.github.io",
    ignorePatterns: ["private", "templates", ".obsidian", "06_Metadata/Templates"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Red Rose",
        body: "Merriweather",
        code: "Victor Mono",
      },
      colors: {
        lightMode: {
          light: "#f5f7f5",
          lightgray: "#e0e5e2",
          gray: "#9aa7a0",
          darkgray: "#4a5a50",
          dark: "#1a2420",
          secondary: "#5f7f6a",
          tertiary: "#4a6a55",
          highlight: "rgba(111, 143, 122, 0.12)",
          textHighlight: "#8fb29a55",
        },
        darkMode: {
          light: "#0e1210",
          lightgray: "#141a16",
          gray: "#5f7f6a",
          darkgray: "#9aa7a0",
          dark: "#e6ebe8",
          secondary: "#6f8f7a",
          tertiary: "#8fb29a",
          highlight: "rgba(111, 143, 122, 0.15)",
          textHighlight: "#6f8f7a44",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
