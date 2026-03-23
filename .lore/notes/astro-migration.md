---
title: "Implementation notes: astro-migration"
date: 2026-02-08
status: complete
tags: [implementation, notes, astro, migration]
source: .lore/plans/astro-migration.md
modules: [astro, content-collections, wiki-links, visual-identity, layouts, routes, rss, giscus, deployment]
---

# Implementation Notes: Astro Migration

## Progress
- [x] Phase 1: Scaffold Astro project
- [x] Phase 2: Define content collections and migration script
- [x] Phase 3: Wiki-link and callout resolution
- [x] Phase 4: Visual identity (CSS/Tailwind)
- [x] Phase 5: Page layouts
- [x] Phase 6: Dynamic routes, section indexes, and homepage
- [x] Phase 7: RSS feed
- [x] Phase 8: Giscus comments component
- [x] Phase 9: GitHub Actions workflow
- [x] Phase 10: Remove Quartz
- [x] Phase 11: Validate against spec (issues found and fixed)

## Summary

Migrated Ron's Broadcast Cache from Quartz 4 to Astro 5. 11 phases across content model (4 collections with Zod schemas), wiki-link resolution, visual identity (steampunk brass/gold on dark), layouts, routes (44 pages), RSS, Giscus stub, GitHub Actions, and Quartz removal. Validation caught a critical bug (Astro 5 strips `/index` from entry IDs, breaking filters) which was fixed across 5 files.

## Log

### Phase 1: Scaffold Astro project
- Dispatched: Install Astro + Tailwind via bun, create config files, src/ directory structure, update .gitignore/.prettierrc/tsconfig
- Result: All files created. Astro 5.17.1 installed. `@astrojs/tailwind@6` requires Tailwind v3 (not v4), agent handled the downgrade. Old Quartz `public/` build output was cleaned since `public/` is no longer gitignored (Astro uses it for static assets).
- Tests: Build succeeds (561ms, 1 page). All configs verified correct.

### Phase 2: Content collections and migration script
- Dispatched: Define four collections in content.config.ts, write migration script, create Thoughts dir
- Result: All four collections defined with Zod schemas. Glob pattern `*/**/*.md` cleanly excludes root index.md section pages. Migration script fixed 6 files (Guild-Hall had no frontmatter, 5 research files missing title). 8 informational warnings for non-standard fields (created, draft) that Zod strips safely.
- Tests: Build succeeds. 39 content files (24 Ideas, 8 Writing, 7 Projects) pass validation. Root index.md files confirmed excluded.

### Phase 3: Wiki-link and callout resolution (parallel with Phase 4)
- Dispatched: Install and configure @flowershow/remark-wiki-link and remark-callout
- Result: Both plugins installed. Wiki-link uses `format: "shortestPossible"` with globbySync-built file list. URL resolver lowercases paths. Unresolved links get `new` CSS class. Callout plugin is zero-config. Plugin API differed from initial assumptions (format not pathFormat, files not permalinks, urlResolver takes object not string).
- Tests: Build succeeds. Content dirs properly scoped (Ideas/Writing/Projects/Thoughts only, excludes Inbox/Archive/Resources/Metadata).

### Phase 4: Visual identity (parallel with Phase 3)
- Dispatched: Create Tailwind config with steampunk palette, global CSS with dark/light theme
- Result: tailwind.config.mjs extended with brass/gold palette, surface colors, font families. global.css created with CSS custom properties for dark (default) and light mode, full typographic baseline, status indicators, card components. Google Fonts loaded for Red Rose, Merriweather, Victor Mono.
- Tests: Build succeeds. All CSS validated.

### Phase 5: Page layouts
- Dispatched: Create BaseLayout, Nav, Footer, ThoughtLayout, IdeaLayout, WritingLayout, ProjectLayout
- Result: All 7 files created. BaseLayout has full HTML shell with OG tags, RSS autodiscovery, theme init script. Nav has desktop links + mobile hamburger + theme toggle. IdeaLayout discovers siblings via getCollection. WritingLayout auto-lists series essays with order/date/title sort. All layouts use CSS custom properties.
- Tests: Build succeeds (951ms). All layouts verified for correct imports, props, and functionality.

### Phase 6: Dynamic routes, section indexes, homepage
- Dispatched: Create route files for all 4 collections, 3 section index pages, and homepage
- Result: 8 route/page files created. 43 pages built successfully in 1.35s. Dynamic routes normalize entry.id to lowercase URLs, stripping `/index` suffix. Homepage shows intro, empty thoughts section, and 3 cards each for Ideas/Writing/Projects with featured-first selection. Section indexes group by status (Ideas, Projects) or sort by date (Writing).
- Tests: All dist/ files verified. Homepage has correct structure. Key content pages exist at expected URLs (guild-hall, memory-loop, etc.).

### Phase 8: Giscus comments component (parallel with Phase 6)
- Dispatched: Create Comments.astro with Giscus script tag
- Result: Component created with placeholder repo-id and category-id. Uses pathname mapping and preferred_color_scheme theme. Not placed on any layout yet per spec.

### Phase 7: RSS feed (parallel with Phase 9)
- Dispatched: Install @astrojs/rss, create /rss.xml combining Thoughts + Writing
- Result: Feed created with markdown-it for content rendering and sanitize-html for security. 8 Writing items included with full HTML content. Thoughts empty but wired. Sorted by date desc with epoch fallback for undated items.
- Tests: dist/rss.xml exists (74KB). Valid XML structure. Items have title, link, pubDate, content:encoded.

### Phase 9: GitHub Actions workflow (parallel with Phase 7)
- Dispatched: Replace Quartz workflow with Astro workflow
- Result: deploy.yml replaced. Uses withastro/action@v5 (auto-detects bun from lockfile). Build + deploy jobs. No fetch-depth needed. Concurrency group prevents parallel deployments.
- Tests: Valid YAML. Correct permissions. No Quartz references remain.

### Phase 10: Remove Quartz
- Dispatched: Delete quartz/, quartz.config.ts, quartz.layout.ts, clean package.json, update CLAUDE.md
- Result: Entire quartz/ tree deleted. 59 production deps + 10 dev deps removed from package.json. Scripts updated to Astro commands. CLAUDE.md rewritten for Astro. Stale package-lock.json removed (using bun.lock now).
- Tests: Build still succeeds (43 pages). No Quartz references in active codebase. All remaining references in .lore/ (historical docs only).

### Phase 11: Validate against spec
- Dispatched: Fresh-context agent reviewed all 36 requirements against implementation
- Result: 28/36 requirements passed immediately. 3 critical failures found, all with same root cause: Astro 5's glob loader strips `/index` from entry IDs, so `endsWith("/index")` filters always returned empty. Also found: missing thoughts index page, CLAUDE.md not mentioning Thoughts, dead code in entryIdToUrl functions.
- Resolution: Fixed `endsWith("/index")` to `!id.includes("/")` in 5 files (homepage, 3 section indexes, WritingLayout). Created thoughts/index.astro. Updated CLAUDE.md. Simplified all entryIdToUrl functions. After fixes: 44 pages build, all sections populated, series detection works, wiki-links resolve.
- Minor open items (not blocking): RSS uses epoch date for undated Writing entries, Giscus placeholder IDs need manual setup, one content file has wrong title (pre-existing).

## Divergence

(No divergences from the approved plan required user approval.)
