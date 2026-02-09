---
title: Astro 5 entry ID normalization broke five filter paths silently
date: 2026-02-08
status: complete
tags: [migration, astro, content-model, static-site, validation, silent-failure]
modules: [astro, content-collections, layouts, routes, wiki-links, rss, deployment]
related: [.lore/specs/astro-migration.md, .lore/plans/astro-migration.md, .lore/notes/astro-migration.md]
---

# Retro: Astro Migration

## Summary

Replaced Quartz 4 with Astro 5 as the static site generator for Ron's Broadcast Cache. 11 phases covering content model (4 collections with Zod schemas), wiki-link resolution, visual identity (steampunk brass/gold on dark), 7 layouts, 44 pages of routes, RSS, Giscus comments, GitHub Actions deployment, and full Quartz removal. The migration shipped in a single session: scaffolding through PR merge.

## What Went Well

- **Parallelization paid off.** Phases 3+4, 6+8, and 7+9 ran concurrently via sub-agents. This cut wall-clock time significantly without introducing coordination bugs.
- **Fresh-context validation caught the critical bug.** A sub-agent with no implementation context reviewed all 36 spec requirements and found the entry ID normalization failure that would have shipped broken sections. The implementer missed it because the build succeeded (empty sections aren't errors).
- **Content collection scoping via glob patterns was clean.** `*/**/*.md` naturally excluded root-level index files without negative patterns or filter logic. The Zod schemas with `.default()` meant only 6 files needed frontmatter fixes out of 39.
- **CSS custom properties for theming was simpler than expected.** Dark-first with `.light` class toggle avoided fighting Tailwind's `dark:` utility convention. One set of variables, two value blocks, done.
- **The plan held.** No divergences required user approval. The 11-phase structure mapped cleanly to the work. Every phase completed as scoped.
- **Quartz removal was surgical.** 69 dependencies removed, 32,000+ lines deleted, build still passed. Clean separation between content (kept) and rendering engine (replaced).

## What Could Improve

- **Plugin API assumptions in the plan were wrong.** The plan specified `pathFormat`, `permalinks`, and string-based `urlResolver` for `@flowershow/remark-wiki-link`. The actual v3 API uses `format`, `files`, and an object-based `urlResolver({ filePath, isEmbed, heading })`. The research phase found the right package but didn't verify the API surface. This was caught during implementation (not a runtime bug), but it meant the plan's code examples were misleading.
- **Astro 5 entry ID behavior wasn't documented anywhere we checked.** The glob loader lowercases IDs AND strips `/index` suffixes. The plan assumed `entry.id` would preserve the original path structure. This assumption was embedded in 5 separate files before validation caught it. If the validator hadn't run, the homepage and all three section indexes would have shipped with empty content sections.
- **No intermediate validation between phases.** The build succeeded at every phase, but "build succeeds" doesn't mean "content renders correctly." Empty sections from broken filters don't cause build errors. A spot check after Phase 6 (routes) would have caught the entry ID issue 5 phases earlier.
- **Tailwind v3 vs v4 compatibility required a reactive fix.** `bun add tailwindcss` installed v4, but `@astrojs/tailwind@6` requires v3 as a peer dependency. The sub-agent handled the downgrade, but the plan should have pinned the version.

## Lessons Learned

1. Astro 5's glob loader normalizes entry IDs by lowercasing AND stripping `/index` suffixes. `AI-as-Your-Partner/index.md` becomes `"ai-as-your-partner"`, not `"AI-as-Your-Partner/index"`. Any code filtering by `endsWith("/index")` will silently match nothing. Use `!id.includes("/")` to detect top-level entries.
2. Fresh-context validation after implementation is not optional. The build succeeded with broken filters because empty sections aren't build errors. A sub-agent with no implementation context caught what the implementer missed.
3. When a plan includes code examples using a third-party API, verify the API against the actual package version, not docs or memory. The `@flowershow/remark-wiki-link` v3 API differed from what the plan assumed on three parameters.
4. Pin dependency versions in plans when the integration requires a specific major version. `@astrojs/tailwind@6` requires Tailwind CSS v3, but `bun add tailwindcss` installs v4.
5. "Build succeeds" is not validation. Static site generators don't fail on empty content sections. Intermediate spot checks (render a page, check it has content) catch data-path bugs that build-time type checking misses.

## Artifacts

- Spec: [.lore/specs/astro-migration.md](.lore/specs/astro-migration.md)
- Plan: [.lore/plans/astro-migration.md](.lore/plans/astro-migration.md)
- Implementation notes: [.lore/notes/astro-migration.md](.lore/notes/astro-migration.md)
- Research: [.lore/research/astro-migration-feasibility.md](.lore/research/astro-migration-feasibility.md)
- Brainstorm: [.lore/brainstorm/blog-vs-garden.md](.lore/brainstorm/blog-vs-garden.md)
- Prototypes: `.lore/prototypes/final-03-article-page_0.webp`, `.lore/prototypes/final-02-observatory-mobile_0.webp`
