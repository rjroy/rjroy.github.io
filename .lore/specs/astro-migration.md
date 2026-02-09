---
title: Migrate Broadcast Cache from Quartz 4 to Astro
date: 2026-02-08
status: approved
tags: [astro, migration, quartz, content-model, github-pages]
related: [.lore/brainstorm/blog-vs-garden.md, .lore/research/astro-migration-feasibility.md]
req-prefix: ASTRO
---

# Spec: Migrate Broadcast Cache from Quartz 4 to Astro

## Overview

Replace Quartz 4 with Astro as the static site generator for Ron's Broadcast Cache (rjroy.github.io). The migration introduces a new content model with four distinct types (Thoughts, Ideas, Writing, Projects), a temporal homepage feed, and the foundation for comments and controlled RSS. Content stays as Obsidian markdown in the vault; wiki-links are resolved at build time via a remark plugin. Visual identity draws from existing steampunk prototypes (brass/gold on dark, gear motifs) adapted through an Astro theme as starting point.

## Entry Points

- Reader arrives at homepage (rjroy.github.io): sees temporal feed of recent content
- Reader arrives at a direct link (shared via LinkedIn, conversation): lands on specific content page
- Reader follows RSS feed: receives new Thoughts and Writing
- Author writes markdown in Obsidian: content appears on site after push + build

## Requirements

### Content Model

- REQ-ASTRO-1: Four content collections defined with distinct Zod schemas: Thoughts, Ideas, Writing, Projects
- REQ-ASTRO-2: **Thoughts** are temporal, short-form. Required frontmatter: `title`, `date`. Optional: `tags`, `linkedIdea` (reference to an Idea or Writing piece). No minimum length. Stored in `content/Thoughts/` as individual dated markdown files
- REQ-ASTRO-3: **Ideas** are persisted, developing. Required frontmatter: `title`, `status` (active/paused/graduated), `description`. Optional: `tags`, `date`. Stored in `content/Ideas/[Folder]/index.md` with supporting files as siblings
- REQ-ASTRO-4: **Writing** is persisted, finished. Required frontmatter: `title`, `date`, `description`. Optional: `tags`. Stored in `content/Writing/[Folder]/` with series index and individual essays
- REQ-ASTRO-5: **Projects** are persisted. Required frontmatter: `title`, `status` (active/maintained/archived), `description`. Optional: `tags`, `date`. Stored in `content/Projects/[Folder]/index.md`
- REQ-ASTRO-6: All Thoughts are markdown files in `content/Thoughts/`. All Thoughts have URLs and are linkable. A frontmatter flag (`standalone: true`) controls whether a Thought gets a full page layout or is only rendered inline on the homepage feed. Non-standalone Thoughts still have a URL (for RSS links and sharing), but the page is minimal (content + date, no sidebar or navigation chrome). The author decides which Thoughts warrant the full page treatment

### Wiki-Link Resolution

- REQ-ASTRO-7: Obsidian `[[wiki-links]]` in markdown are resolved to valid HTML links at build time
- REQ-ASTRO-8: Support `[[link]]`, `[[link|alias]]`, `[[link#heading]]`, and `![[image.png]]` syntax
- REQ-ASTRO-9: Use `@flowershow/remark-wiki-link` with Obsidian-style shortest-path matching. Links resolve across all content collections
- REQ-ASTRO-10: Unresolved wiki-links render with a distinct CSS class (`new` by default in remark-wiki-link) so they're visually identifiable without breaking the page. Links to excluded directories (`Inbox/`, `Metadata/`, etc.) are expected to be unresolved. The build should emit warnings for unresolved links but not fail

### Pages and Layouts

- REQ-ASTRO-11: **Homepage** shows: (1) short intro section (2-3 sentences about who Ron is and what this place is), (2) the 10 most recent Thoughts rendered inline (newest first, with "see all" link), (3) card links to the 3 most recent or `featured: true` items from each of Ideas, Writing, and Projects. Featured items (via frontmatter flag) appear first; remaining slots filled by most recent. This is automated from frontmatter, not hand-curated in a separate config file
- REQ-ASTRO-12: **Idea pages** display the Idea content with visible status indicator (active/paused/graduated) and links to related sub-pages within the same folder
- REQ-ASTRO-13: **Writing pages** display essay content. Writing pieces in the same folder belong to a series. The `index.md` in a Writing subfolder is the series introduction; other markdown files in that folder are individual essays. Series index pages automatically list all sibling essays sorted by frontmatter `date` (or `order` if present)
- REQ-ASTRO-14: **Project pages** display project content with status indicator
- REQ-ASTRO-15: **Thought pages** (standalone only) display the thought with date, optional link back to the related Idea/Writing piece
- REQ-ASTRO-16: **Section index pages** for `/ideas/`, `/writing/`, `/projects/` listing all content in that collection
- REQ-ASTRO-17: All pages have consistent navigation: site title/logo, links to Ideas/Projects/Writing sections. Mobile-responsive with hamburger menu

### Visual Identity

- REQ-ASTRO-18: Dark theme with warm gold/brass accent colors, informed by the existing prototypes (steampunk aesthetic: gear motifs, brass tones on dark backgrounds)
- REQ-ASTRO-19: Start from an existing Astro theme (AstroPaper or similar) and customize to match the visual direction. The theme provides structural scaffolding; visual identity is custom
- REQ-ASTRO-20: Light/dark mode toggle. Dark is the default and primary design target
- REQ-ASTRO-21: Typography: readable body text, distinct headings. Carry forward the current font choices (Red Rose for headers, Merriweather for body, Victor Mono for code) unless they conflict with the new design

### RSS

- REQ-ASTRO-22: RSS feed at `/rss.xml` using `@astrojs/rss`
- REQ-ASTRO-23: Feed includes Thoughts and Writing. Ideas and Projects are excluded (they update in place, not sequentially)
- REQ-ASTRO-24: Each feed item includes title, date, description, and link. Writing items include full rendered content. Thought items include full content (they're short by nature)

### Comments

- REQ-ASTRO-25: Giscus component built and available for inclusion on any page layout. Mapped to GitHub Discussions on the repo. Prerequisite: GitHub Discussions must be enabled on `rjroy/rjroy.github.io` with a dedicated category for comments. Repo ID and category ID are configured at setup time, not hardcoded in the spec
- REQ-ASTRO-26: Which content types display comments is configurable per-layout and deferred to a later decision. The component exists and works; placement is not specified yet

### Deployment

- REQ-ASTRO-27: Deploys to GitHub Pages via GitHub Actions on push to `master`
- REQ-ASTRO-28: Replace the existing Quartz workflow with an Astro workflow using `withastro/action`
- REQ-ASTRO-29: Site URL remains `https://rjroy.github.io` with no `base` path

### Migration

- REQ-ASTRO-30: Replace in place. Remove Quartz config files (`quartz.config.ts`, `quartz.layout.ts`, `quartz/` directory). Add Astro config. Content directory stays at `content/`
- REQ-ASTRO-31: Existing markdown content migrates with minimal frontmatter edits. Zod schemas use `.default()` for optional fields where possible. Where a required field is missing (e.g., Ideas without `status`), a one-time migration script backfills the frontmatter in-place. The script is committed as a dev tool, not run at build time
- REQ-ASTRO-32: Content directories ignored by Quartz (`Inbox/`, `Archive/`, `Resources/`, `Attachments/`, `Metadata/`) remain excluded from the build. Exclusion is achieved by scoping content collection glob loaders to specific directories (`./content/Ideas`, `./content/Writing`, etc.) rather than scanning all of `./content/`. Vault-only directories are never loaded
- REQ-ASTRO-33: Create a new `content/Thoughts/` directory. No existing content migrates into it; Thoughts are a new content type authored going forward
- REQ-ASTRO-34: Obsidian callouts (`> [!note]`, `> [!warning]`, etc.) render correctly via `remark-callout` or equivalent remark plugin. Verify plugin supports the callout types used in existing content during implementation

### Compatibility

- REQ-ASTRO-35: Content files remain valid Obsidian markdown. No Astro-specific syntax (MDX, components) in content files. The vault is the source of truth; Astro is the rendering layer
- REQ-ASTRO-36: Memory Loop continues to work with the vault unchanged. All Memory Loop paths (`Inbox/`, `Metadata/memory-loop/`) are unaffected

## Exit Points

| Exit | Triggers When | Target |
|------|---------------|--------|
| Comment placement decision | After site is live and content types are being used | [STUB: giscus-placement] |
| Search implementation | If readers need to find content across types | [STUB: site-search] |
| Visual polish iteration | After initial migration ships and gets real use | [STUB: design-refinement] |

## Success Criteria

- [ ] `npx astro build` produces a working static site from the existing content
- [ ] Wiki-links between published content resolve to valid URLs. Links to excluded directories render with unresolved CSS class, not as broken links
- [ ] Homepage shows a temporal feed with section links
- [ ] Each content type renders with its own layout and appropriate metadata display
- [ ] RSS feed at `/rss.xml` validates and includes Thoughts + Writing
- [ ] Giscus component renders on at least one test page
- [ ] GitHub Actions deploys successfully to `rjroy.github.io`
- [ ] Obsidian vault unaffected: content files unmodified by build (`git status` clean after `astro build`), Memory Loop paths (`Inbox/`, `Metadata/memory-loop/`) intact, Obsidian opens vault without errors
- [ ] No Quartz files remain in the repository (clean removal)
- [ ] Visual identity matches prototype direction: dark background (#1a1a1a or darker), gold/brass accents (#c4956a to #f4c542 range), light/dark toggle functional, readable at 375px mobile viewport. Reference: `.lore/prototypes/final-03-article-page_0.webp` and `final-02-observatory-mobile_0.webp`

## AI Validation

**Defaults:**
- Build succeeds with no errors (`npx astro build`)
- All content files pass Zod schema validation at build time
- Code review by fresh-context sub-agent

**Custom:**
- Wiki-link resolution verified: sample of 5+ existing `[[links]]` across content types resolve to valid URLs in built output
- RSS feed validates against RSS 2.0 spec
- No Quartz imports, config, or component references remain in codebase
- Lighthouse accessibility score > 90 on homepage
- Mobile layout renders correctly at 375px viewport width

## Constraints

- No MDX or Astro components in content files. Content must stay as standard Obsidian-compatible markdown. MDX and Astro components are fine in layout files (`src/layouts/`, `src/components/`), which are outside the vault
- No breaking changes to vault directory structure. Memory Loop depends on specific paths
- The `content/` directory is shared between Obsidian and Astro. Astro config must explicitly exclude vault-only directories via scoped glob loaders
- Theme customization will likely require ejecting from the theme's update path given the custom content model and steampunk aesthetic. This is acceptable. The theme is a starting point for structural scaffolding, not an ongoing dependency. Migration is in-place to avoid maintaining parallel systems; rollback is via git if needed

## Context

- Brainstorm: [.lore/brainstorm/blog-vs-garden.md](.lore/brainstorm/blog-vs-garden.md)
- Research: [.lore/research/astro-migration-feasibility.md](.lore/research/astro-migration-feasibility.md)
- Prototypes: `.lore/prototypes/final-03-article-page_0.webp` (desktop), `.lore/prototypes/final-02-observatory-mobile_0.webp` (mobile)
