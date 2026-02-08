---
title: Astro migration feasibility for Broadcast Cache
date: 2026-02-08
status: active
tags: [astro, migration, quartz, wiki-links, content-collections, github-pages]
related: [.lore/brainstorm/blog-vs-garden.md]
---

# Research: Astro Migration Feasibility

## Summary

Migrating from Quartz 4 to Astro is feasible. Every hard requirement is met: GitHub Pages deployment, markdown content from Obsidian, and wiki-link resolution at build time. Two viable approaches exist for wiki-links, each with different tradeoffs. Astro's content collections natively support multiple content types with different schemas, which is the key capability Quartz lacks.

## Key Findings

### 1. Wiki-Link Resolution: Two Approaches

**Option A: astro-loader-obsidian (dedicated Obsidian loader)**

A content loader that treats an Obsidian vault as a native Astro content collection.

- `[[Another Note]]` automatically resolves to `<a href="/docs/my-other-note">`
- `![[image.png]]` resolves to proper `<img>` tags
- Respects frontmatter (title, date, tags, publish)
- Schema extensible via Zod `.extend()`
- Install: `npm i astro-loader-obsidian`

Concerns:
- 12 open issues on GitHub, including parsing bugs (hash symbols in code blocks parsed as tags, hex color codes parsed as tags)
- Unpublished content appearing in graph views
- Moderate maturity. Active maintenance but rough edges
- The parsing bugs are in tag detection, not link resolution, so wiki-links may work fine

**Option B: @flowershow/remark-wiki-link (remark plugin)**

A remark plugin that parses and renders wiki-style links during markdown processing.

- Handles `[[link]]`, `[[link|alias]]`, `[[link#heading]]`, `![[image.png]]`, `![[video.mp4]]`
- `pathFormat: "shortestPossible"` enables Obsidian-style matching (short names resolve to full paths)
- Requires passing a file list for resolution: `const files = glob.sync("**/*.md", { cwd: "content" })`
- Supports custom permalinks map for override routing
- Install: `npm install @flowershow/remark-wiki-link`

This approach is more manual (you wire it into Astro's remark pipeline yourself) but gives you full control and avoids the loader's parsing bugs. It only handles links; you'd use Astro's standard `glob()` loader for content collections.

**Recommendation:** Start with the remark plugin approach. It's more composable, avoids the loader's known bugs, and gives you explicit control over how links resolve. If astro-loader-obsidian matures (v1.0 milestone exists), it could be revisited.

### 2. Multiple Content Types with Different Schemas

Astro content collections are purpose-built for this. Each collection gets its own loader, schema, and query API.

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const thoughts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/Thoughts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});

const ideas = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./content/Ideas" }),
  schema: z.object({
    title: z.string(),
    status: z.enum(["active", "paused", "graduated"]),
    description: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/Writing" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./content/Projects" }),
  schema: z.object({
    title: z.string(),
    status: z.enum(["active", "maintained", "archived"]),
    description: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { thoughts, ideas, writing, projects };
```

Each collection can have:
- Different Zod schema (type-safe, build-time validation)
- Different page layouts (via dynamic routes or conditional rendering)
- Different query patterns (filter by status, sort by date, etc.)

Astro 5.0's Content Layer API delivers up to 5x faster Markdown builds and 25-50% less memory vs. older approaches.

### 3. GitHub Pages Deployment

First-class support via official GitHub Action.

**Workflow file (`.github/workflows/deploy.yml`):**

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: withastro/action@v5

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
```

**Config required in `astro.config.mjs`:**

```javascript
export default defineConfig({
  site: 'https://rjroy.github.io',
  // No `base` needed since this IS the username.github.io repo
});
```

**Gotcha:** The official action scans for a lockfile to detect the package manager. Must commit `bun.lockb` (or whichever lockfile is used).

### 4. Giscus Comments

Well-documented integration. Two approaches:

**Simple (script tag in an Astro component):**

```astro
<!-- src/components/Comments.astro -->
<section class="giscus">
  <script
    src="https://giscus.app/client.js"
    data-repo="rjroy/rjroy.github.io"
    data-repo-id="[repo-id]"
    data-category="[category]"
    data-category-id="[category-id]"
    data-mapping="pathname"
    data-reactions-enabled="1"
    data-emit-metadata="0"
    data-input-position="top"
    data-theme="preferred_color_scheme"
    data-lang="en"
    crossorigin="anonymous"
    async
  ></script>
</section>
```

**React island (for dark mode toggling):**

Install `@giscus/react`, use as Astro island with `client:load` directive. Can listen for theme changes and update Giscus theme dynamically.

Can be conditionally included per content type (e.g., on Writing pages but not Thoughts).

### 5. RSS with @astrojs/rss

Full control over feed contents. Create `src/pages/rss.xml.js`:

```javascript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const thoughts = await getCollection('thoughts');
  const writing = await getCollection('writing');

  const items = [
    ...thoughts.map(t => ({
      title: t.data.title,
      pubDate: t.data.date,
      link: `/thoughts/${t.id}/`,
    })),
    ...writing.map(w => ({
      title: w.data.title,
      pubDate: w.data.date,
      description: w.data.description,
      link: `/writing/${w.id}/`,
    })),
  ].sort((a, b) => b.pubDate - a.pubDate);

  return rss({
    title: "Ron's Broadcast Cache",
    description: "Thoughts, ideas, and writing from Ron Roy",
    site: context.site,
    items,
  });
}
```

You decide which collections appear in the feed, how items are sorted, and whether to include full content (via `content` field with rendered HTML). Can also create multiple feeds (e.g., `/thoughts/rss.xml` and `/writing/rss.xml`).

### 6. Themes and Starting Points

Relevant themes for a blog/garden hybrid:

- **AstroPaper**: Minimal, accessible, SEO-friendly, light/dark mode, fuzzy search. Good starting point for customization.
- **Astro Micro**: Enhanced AstroPaper with Pagefind search and Giscus comments built in. Closest to what's needed.
- **Astro Ink**: Minimal, markdown-focused, ships little JavaScript.

However, given the custom content model (Thoughts + Ideas + Writing + Projects), starting from a theme and customizing may fight the theme's assumptions. Building from scratch with Tailwind CSS is also viable and gives maximum control.

## Migration Path Assessment

**What moves cleanly:**
- All markdown content (it's just files)
- Frontmatter (Astro uses it natively)
- Folder structure (content collections map to directories)
- Wiki-links (resolved via remark plugin)

**What needs work:**
- Layouts (must be built, either from scratch or adapted from theme)
- Homepage (the curated feed design from the brainstorm)
- Obsidian callouts (need a remark plugin, `remark-callout` exists)
- Any Quartz-specific frontmatter fields that don't map to the new schema
- The GitHub Actions workflow (replace Quartz build with Astro build)
- Nord theme colors (reimplement in CSS/Tailwind)

**What gets dropped (intentionally):**
- Graph visualization
- Backlinks panel
- Explorer sidebar (file tree)
- "Recently Updated" widget

**Estimated effort:** A working migration with basic layouts is a weekend. Polishing the design, building the Thoughts feed, and adding Giscus is a second weekend. Not trivial, but not a month either.

## Sources

- [Astro Content Collections docs](https://docs.astro.build/en/guides/content-collections/)
- [Astro GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/)
- [Astro RSS recipe](https://docs.astro.build/en/recipes/rss/)
- [astro-loader-obsidian](https://github.com/aitorllj93/astro-loader-obsidian)
- [@flowershow/remark-wiki-link](https://github.com/datopian/remark-wiki-link-plus)
- [@portaljs/remark-wiki-link on npm](https://www.npmjs.com/package/@portaljs/remark-wiki-link)
- [Giscus + Astro integration guide](https://www.maxpou.fr/blog/giscus-with-astro/)
- [Giscus + AstroPaper](https://astro-paper.pages.dev/posts/how-to-integrate-giscus-comments/)
- [Astro Markdown docs](https://docs.astro.build/en/guides/markdown-content/)
- [Obsidian to Astro workflow](https://bryanhogan.com/blog/astro-obsidian)
- [@astrojs/rss on npm](https://www.npmjs.com/package/@astrojs/rss)
- [remark-callout (Obsidian callouts)](https://github.com/r4ai/remark-callout)
- [Astro Micro theme](https://astro.build/themes/details/astro-spaceship/)
- [AstroPaper theme](https://astro-paper.pages.dev/)

## Notes

The astro-loader-obsidian project has a v1.0.0 milestone, suggesting it's pre-1.0. The remark plugin approach is lower risk because it's more established (remark-wiki-link has been around longer) and more composable (you're not locked into one loader's parsing decisions).

The content stays in the Obsidian vault as pure markdown. Memory Loop sees no change. The transform happens at build time only. This is exactly the "translate at publish" model discussed in the brainstorm.
