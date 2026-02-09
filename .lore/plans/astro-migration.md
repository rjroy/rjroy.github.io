---
title: Implementation plan for Astro migration
date: 2026-02-08
status: approved
tags: [astro, migration, quartz, implementation, github-pages]
related: [.lore/specs/astro-migration.md, .lore/brainstorm/blog-vs-garden.md, .lore/research/astro-migration-feasibility.md]
---

# Plan: Migrate Broadcast Cache from Quartz 4 to Astro

## Spec Reference

**Spec**: .lore/specs/astro-migration.md
**Prototypes**: `.lore/prototypes/final-03-article-page_0.webp` (desktop), `.lore/prototypes/final-02-observatory-mobile_0.webp` (mobile)

Requirements addressed:

- REQ-ASTRO-1 through REQ-ASTRO-6: Content model → Steps 1, 2
- REQ-ASTRO-7 through REQ-ASTRO-10: Wiki-link resolution → Step 3
- REQ-ASTRO-11 through REQ-ASTRO-17: Pages and layouts → Steps 5, 6
- REQ-ASTRO-18 through REQ-ASTRO-21: Visual identity → Step 4
- REQ-ASTRO-22 through REQ-ASTRO-24: RSS → Step 7
- REQ-ASTRO-25, REQ-ASTRO-26: Comments → Step 8
- REQ-ASTRO-27 through REQ-ASTRO-29: Deployment → Step 9
- REQ-ASTRO-30 through REQ-ASTRO-34: Migration → Steps 2, 10
- REQ-ASTRO-35, REQ-ASTRO-36: Compatibility → Validated in Step 11

## Codebase Context

**Current state**: Quartz 4.5.2 site with 172 markdown files across `content/`. Three published content types (Ideas, Writing, Projects) use folder-per-topic structure with `index.md`. Frontmatter is standard (title, description, tags) but missing fields the new schemas require (e.g., Ideas lack `status`, Writing lacks `date` in some cases).

**Custom work to account for**: Two custom Quartz components (CollapsibleRecentNotes, ReaderMode) are being intentionally dropped. Custom color scheme (moss green/forest) is being replaced with steampunk brass/gold on dark. Custom CSS whimsy effects (link hover transforms, gradient rules, tag pill shadows) should inform the new design but don't need direct porting.

**Content directories excluded from build**: `Inbox/`, `Archive/`, `Resources/`, `Attachments/`, `Metadata/`, `03_Resources/`, `04_Archive/`. These are scoped out by using explicit glob loaders per collection rather than scanning all of `content/`.

**Deployment**: GitHub Actions on push to `master`. Current workflow uses `fetch-depth: 0` for git-based modification dates. Astro workflow won't need this since dates come from frontmatter.

**Visual assets constraint**: Image generators available do not support transparency. All decorative/visual elements must use solid backgrounds or CSS-only approaches. Any design element requiring transparent assets (overlay textures, decorative gear silhouettes on varied backgrounds) is deferred to a future design-refinement pass.

## Implementation Steps

### Step 1: Scaffold Astro Project

**Files**: `astro.config.mjs`, `src/content.config.ts`, `package.json`, `tsconfig.json`, `.prettierrc`, `.gitignore` updates
**Addresses**: REQ-ASTRO-1, REQ-ASTRO-29, REQ-ASTRO-30 (partial)
**Expertise**: None

Initialize Astro in the repo root alongside existing content. Do not use a starter theme (the custom content model will fight theme assumptions). Use Tailwind CSS for styling.

- `bun create astro@latest` with empty template, or manual init
- Add Tailwind integration (`@astrojs/tailwind`)
- Configure `astro.config.mjs`: `site: 'https://rjroy.github.io'`, output `static`
- Set up `src/` directory structure: `src/layouts/`, `src/components/`, `src/pages/`, `src/styles/`
- Carry forward Prettier config (semi: false, printWidth: 100, trailingComma: all)
- Update `.gitignore` for Astro (`.astro/`, `dist/`)
- Verify `bun run astro dev` starts without errors (no pages exist yet, so build may produce empty output; dev server confirms the scaffold is wired correctly)

### Step 2: Define Content Collections and Migration Script

**Files**: `src/content.config.ts`, `scripts/migrate-frontmatter.ts`, `content/Thoughts/` (new directory)
**Addresses**: REQ-ASTRO-1 through REQ-ASTRO-6, REQ-ASTRO-31, REQ-ASTRO-32, REQ-ASTRO-33
**Expertise**: None

Define four collections with Zod schemas per the spec. Each collection uses `glob()` loader scoped to its specific directory, which inherently excludes vault-only directories.

Schemas use `z.coerce.date()` for dates (handles string dates from frontmatter), `z.enum()` for status fields, and `.default()` for optional fields. Example establishing the pattern:

```typescript
const ideas = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./content/Ideas" }),
  schema: z.object({
    title: z.string(),
    status: z.enum(["active", "paused", "graduated"]).default("active"),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date().optional(),
    featured: z.boolean().default(false),
  }),
});
```

All four collections follow this pattern:
- **Thoughts**: `title`, `date` (required via `z.coerce.date()`); `tags`, `linkedIdea` (`z.string().optional()`), `standalone` (`z.boolean().default(false)`)
- **Ideas**: `title`, `status` (`z.enum().default("active")`), `description`; `tags`, `date`, `featured`
- **Writing**: `title`, `date`, `description`; `tags`, `order` (`z.number().optional()`), `featured`
- **Projects**: `title`, `status` (`z.enum().default("active")`), `description`; `tags`, `date`, `featured`

Note: `status` defaults to `"active"` so existing Ideas without the field pass validation without a migration script for that field alone.

Where required fields are genuinely missing from existing content (e.g., Writing without `date`), write a migration script that:
- Scans existing frontmatter
- Reports files missing required fields
- Backfills `date` where missing (prompt for manual entry or use file creation date as fallback)
- Reports what it changed

Commit the script as `scripts/migrate-frontmatter.ts`. Run it once, commit the frontmatter changes separately.

Create empty `content/Thoughts/` directory with a `.gitkeep`.

Verify: `bun run astro build` succeeds with all content passing schema validation.

### Step 3: Wiki-Link and Callout Resolution

**Files**: `astro.config.mjs` (remark plugins), `package.json` (new deps)
**Addresses**: REQ-ASTRO-7 through REQ-ASTRO-10, REQ-ASTRO-34
**Expertise**: None

Install both remark plugins:

```bash
bun add @flowershow/remark-wiki-link remark-callout
```

Configure `@flowershow/remark-wiki-link` with `pathFormat: "shortestPossible"`. Build the file list at config time using globby to scan `content/{Ideas,Writing,Projects,Thoughts}/**/*.md` and construct a path-to-slug map for the plugin's `permalinks` option. This scoping ensures links to excluded directories (`Inbox/`, `Metadata/`) are expected-unresolved rather than erroneously matched.

Configure `remark-callout` for Obsidian callout syntax (`> [!note]`, `> [!warning]`, etc.).

Wire both into `astro.config.mjs` markdown config.

Unresolved links render with a CSS class (`new`) so they're visually distinct but don't break. Build should warn but not fail.

Before verifying, survey existing content for wiki-link patterns to build a test matrix:
- Plain links: `[[Note Name]]`
- Aliased links: `[[Note Name|display text]]`
- Heading anchors: `[[Note Name#heading]]`
- Image embeds: `![[image.png]]`

Verify: Build and confirm 5+ links across these patterns resolve to valid URLs in the HTML output. Confirm at least one unresolved link (to an excluded directory) renders with the `new` class.

### Step 4: Visual Identity (CSS/Tailwind)

**Files**: `src/styles/global.css`, `tailwind.config.mjs`, `src/styles/` (component styles)
**Addresses**: REQ-ASTRO-18 through REQ-ASTRO-21
**Expertise**: Frontend design

Establish the visual foundation before building layouts, so layouts are styled as they're built.

- Dark theme as default: background `#1a1a1a` or darker, text warm white
- Gold/brass accent palette: `#c4956a` to `#f4c542` range for links, highlights, borders
- Fonts: Red Rose (headers), Merriweather (body), Victor Mono (code) via Google Fonts or self-hosted
- Light/dark toggle: CSS custom properties with JS toggle, dark as default
- All decorative elements are CSS-only (gradients, borders, subtle shadows). No generated image assets requiring transparency
- Reference prototypes for specific color application and spacing

**Deferred** (stub: design-refinement): Decorative gear motifs, textured backgrounds, or any visual element requiring transparent overlay assets. The initial pass uses color, typography, and CSS effects only.

### Step 5: Page Layouts

**Files**: `src/layouts/BaseLayout.astro`, `src/layouts/ThoughtLayout.astro`, `src/layouts/IdeaLayout.astro`, `src/layouts/WritingLayout.astro`, `src/layouts/ProjectLayout.astro`, `src/components/Nav.astro`, `src/components/Footer.astro`
**Addresses**: REQ-ASTRO-12 through REQ-ASTRO-15, REQ-ASTRO-17
**Expertise**: None

Build layouts bottom-up:

- **BaseLayout**: HTML shell, head (fonts, meta, OG tags), nav, main content slot, footer. Mobile-responsive with hamburger menu. OG meta tags include title, description, and a single site-wide OG image (generated once via ArtGen, stored in `public/og-image.png`)
- **Nav**: Site title, links to Ideas/Projects/Writing sections. Responsive
- **ThoughtLayout**: Minimal for non-standalone. Full page for standalone (content + date + optional linkedIdea back-link)
- **IdeaLayout**: Content + status indicator (active/paused/graduated) + links to sibling pages in the same folder. Sibling discovery: use `entry.id.split('/')[0]` to get the folder name, filter the Ideas collection for entries with matching folder prefix, render as a list
- **WritingLayout**: Essay content. For series index pages (`index.md` in a Writing subfolder), auto-list sibling essays sorted by `date` or `order`
- **ProjectLayout**: Content + status indicator (active/maintained/archived)

### Step 6: Dynamic Routes, Section Indexes, and Homepage

**Files**: `src/pages/index.astro`, `src/pages/thoughts/[...slug].astro`, `src/pages/ideas/[...slug].astro`, `src/pages/writing/[...slug].astro`, `src/pages/projects/[...slug].astro`, `src/pages/ideas/index.astro`, `src/pages/writing/index.astro`, `src/pages/projects/index.astro`
**Addresses**: REQ-ASTRO-6, REQ-ASTRO-11, REQ-ASTRO-16
**Expertise**: None

- Dynamic routes for each collection using `getStaticPaths()` and `getCollection()`. Route files use `[...slug].astro` which maps to `entry.id`, preserving folder structure. All URLs are lowercase (Astro's default behavior with lowercase directory names in `content/`)
- Section index pages (`/ideas/`, `/writing/`, `/projects/`) listing all content in that collection
- **Homepage** (REQ-ASTRO-11): Short intro, 10 most recent Thoughts inline (newest first, "see all" link), then a section for each of Ideas/Writing/Projects showing 3 cards each. Card selection logic per section:

```
1. Filter collection for entries with `featured: true`
2. Sort featured by date desc, take up to 3
3. If fewer than 3, fill remaining slots with most recent
   non-featured entries sorted by date desc
4. Render as cards with title, description, and link
```

This is driven entirely by frontmatter (`featured` and `date` fields), no separate config file

### Step 7: RSS Feed

**Files**: `src/pages/rss.xml.ts`
**Addresses**: REQ-ASTRO-22 through REQ-ASTRO-24
**Expertise**: None

- Install `@astrojs/rss`
- Create feed at `/rss.xml` combining Thoughts and Writing, sorted by date descending
- Thoughts include full content (they're short). Writing includes full rendered content
- Ideas and Projects excluded (they update in place)

Verify: Build, inspect `/rss.xml` in browser, validate at validator.w3.org/feed/.

### Step 8: Giscus Comments Component

**Files**: `src/components/Comments.astro`
**Addresses**: REQ-ASTRO-25, REQ-ASTRO-26
**Expertise**: None

- Build as a simple Astro component wrapping the Giscus script tag
- Configure with `data-mapping="pathname"`, `data-theme="preferred_color_scheme"`
- Repo ID and category ID are populated at setup time (GitHub Discussions must be enabled on `rjroy/rjroy.github.io` with a dedicated category)
- Component is built and available but not placed on any layout yet (placement deferred per spec)

Verify: Component renders on a test page and loads Giscus correctly.

### Step 9: GitHub Actions Workflow

**Files**: `.github/workflows/deploy.yml`
**Addresses**: REQ-ASTRO-27 through REQ-ASTRO-29
**Expertise**: None

Replace the Quartz workflow with Astro deployment:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

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

The `withastro/action` detects the package manager from the lockfile. Commit `bun.lockb`.

No `fetch-depth: 0` needed (dates from frontmatter, not git).

### Step 10: Remove Quartz

**Files**: Remove `quartz/`, `quartz.config.ts`, `quartz.layout.ts`. Clean up `package.json`
**Addresses**: REQ-ASTRO-30
**Expertise**: None

After the Astro build is working and verified:

- Delete the `quartz/` directory (entire Quartz source tree)
- Delete `quartz.config.ts` and `quartz.layout.ts`
- Remove Quartz-specific dependencies from `package.json`
- Remove Quartz-specific scripts from `package.json`
- Update `CLAUDE.md` to reflect Astro commands and structure
- Verify no Quartz imports or references remain in codebase

This is a separate commit from the Astro additions for clean git history and easy rollback if needed.

### Step 11: Validate Against Spec

**Addresses**: All requirements
**Expertise**: Fresh-context review

Launch a sub-agent that reads the spec at `.lore/specs/astro-migration.md`, reviews the implementation, and flags any requirements not met. This step is not optional.

Validation checklist (from spec success criteria):
- [ ] `bun run astro build` produces a working static site
- [ ] Wiki-links resolve; unresolved links get `new` CSS class
- [ ] Homepage shows temporal feed + section links
- [ ] Each content type renders with its own layout
- [ ] RSS at `/rss.xml` validates
- [ ] Giscus component renders on test page
- [ ] GitHub Actions deploys successfully
- [ ] Obsidian vault unaffected (`git status` clean after build, Memory Loop paths intact)
- [ ] No Quartz files remain
- [ ] Visual identity matches prototype direction (dark bg, gold/brass accents, light/dark toggle, readable at 375px)

## Delegation Guide

Steps requiring specialized expertise:

- **Step 4** (Visual Identity): Frontend design review after initial CSS is written. Verify against prototypes, check mobile at 375px, confirm accessibility (contrast ratios, focus states). The prototypes set direction; implementation needs a design eye to verify it lands.

## Decisions

1. **No starter theme**: The spec suggests starting from an existing Astro theme (REQ-ASTRO-19). The plan intentionally deviates: start from empty + Tailwind. The custom content model (4 types with different schemas, layouts, and feed behavior) will fight theme assumptions. More structural CSS work, but no time wasted un-theming.

2. **URLs go lowercase**: Current Quartz URLs (`/Ideas/Guild-Hall/`) become `/ideas/guild-hall/`. No redirects. The audience is small enough that link rot is acceptable, and lowercase is the correct convention going forward.

3. **Single OG image**: One site-wide branded image generated via ArtGen (dark background, gold accents, site name), stored in `public/og-image.png`. Per-page OG image generation deferred (stub: `astro-og-canvas` integration).

## Manual Prerequisites

### Giscus Setup (before Step 8)

The Giscus component needs GitHub Discussions enabled. These steps happen in the browser, not in code:

1. Go to `github.com/rjroy/rjroy.github.io` > Settings > Features
2. Check "Discussions" to enable it
3. Go to the Discussions tab, create a new category called "Comments" (or similar)
4. Go to `giscus.app`, enter the repo name (`rjroy/rjroy.github.io`)
5. Select the "Comments" category
6. Giscus will display the `data-repo-id` and `data-category-id` values
7. Copy those values into `src/components/Comments.astro`

## Open Questions

None. All questions resolved during planning.
