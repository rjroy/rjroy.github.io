import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import type { APIContext } from "astro"
import MarkdownIt from "markdown-it"
import sanitizeHtml from "sanitize-html"

const parser = new MarkdownIt()

export async function GET(context: APIContext) {
  const thoughts = await getCollection("thoughts")
  const writing = await getCollection("writing")

  // Build RSS items from Thoughts
  const thoughtItems = thoughts.map((entry) => ({
    title: entry.data.title,
    pubDate: entry.data.date,
    link: `/thoughts/${entry.id.toLowerCase()}/`,
    content: sanitizeHtml(parser.render(entry.body)),
  }))

  // Build RSS items from Writing
  const writingItems = writing.map((entry) => {
    let slug = entry.id.toLowerCase()
    if (slug.endsWith("/index")) {
      slug = slug.replace(/\/index$/, "")
    }
    return {
      title: entry.data.title,
      // Use epoch date for items without dates so they sort to the bottom
      pubDate: entry.data.date || new Date(0),
      description: entry.data.description || "",
      link: `/writing/${slug}/`,
      content: sanitizeHtml(parser.render(entry.body)),
    }
  })

  // Combine and sort by date descending
  const items = [...thoughtItems, ...writingItems].sort(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime(),
  )

  return rss({
    title: "Broadcast Cache",
    description: "Ideas, writing, and projects from Ron Roy",
    site: context.site!,
    items,
  })
}
