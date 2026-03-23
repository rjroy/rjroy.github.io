import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import remarkWikiLink from "@flowershow/remark-wiki-link"
import remarkCallout from "remark-callout"
import { globbySync } from "globby"
import { cpSync } from "node:fs"
import { join } from "node:path"

// Build file lists for wiki-link resolution at config time.
// The plugin matches wiki-link targets against these paths using
// "shortestPossible" format (Obsidian-style: [[name]] matches the
// shortest file path ending with that name).

// Markdown content files (for [[page-name]] links)
const contentFiles = globbySync(
  "{Ideas,Writing,Projects,Thoughts}/**/*.md",
  { cwd: "content" },
)

// Attachment files (for ![[image.png]] embeds)
const attachmentFiles = globbySync("Attachments/**/*.*", { cwd: "content" })

const allFiles = [...contentFiles, ...attachmentFiles]

// Copies image files from content/ to the build output so that markdown
// image references like /Projects/Guild-Hall/screenshots/img.webp resolve.
// Astro content collections only process markdown, not sibling static files,
// but this vault stores images alongside .md files for Obsidian compatibility.
function copyContentImages() {
  const imageFiles = globbySync(
    "{Ideas,Writing,Projects,Thoughts,Attachments}/**/*.{webp,png,jpg,jpeg,gif,svg}",
    { cwd: "content" },
  )
  return {
    name: "copy-content-images",
    hooks: {
      "astro:build:done": ({ dir }) => {
        for (const file of imageFiles) {
          cpSync(join("content", file), join(dir.pathname, file), {
            recursive: true,
          })
        }
      },
    },
  }
}

export default defineConfig({
  site: "https://rjroy.github.io",
  output: "static",
  integrations: [tailwind(), copyContentImages()],
  markdown: {
    remarkPlugins: [
      [
        remarkWikiLink,
        {
          format: "shortestPossible",
          files: allFiles,
          urlResolver: ({ filePath, isEmbed, heading }) => {
            if (isEmbed) {
              // Image/media embeds: resolve to /attachments/filename
              // e.g. "Attachments/image.png" -> "/attachments/image.png"
              if (filePath.startsWith("Attachments/")) {
                return "/" + filePath.toLowerCase()
              }
              return "/" + filePath
            }

            // Page links: convert file path to URL
            // Strip .md extension
            const withoutExt = filePath.replace(/\.mdx?$/, "")

            // Split into segments and normalize
            const segments = withoutExt.split("/")

            // Remove trailing "index" (folder-based pages)
            if (segments[segments.length - 1] === "index") {
              segments.pop()
            }

            // Build URL with heading anchor if present
            const slug = segments.map((s) => s.toLowerCase()).join("/")
            const anchor = heading ? `#${heading}` : ""

            return `/${slug}/${anchor}`
          },
          className: "wiki-link",
          newClassName: "new",
        },
      ],
      remarkCallout,
    ],
  },
})
