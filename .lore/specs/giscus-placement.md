---
title: Giscus comment placement across content layouts
date: 2026-02-13
status: draft
tags: [giscus, comments, layouts, content-types]
modules: [layouts, components]
related: [.lore/specs/astro-migration.md, .lore/brainstorm/giscus-placement.md]
req-prefix: GISCUS
---

# Spec: Giscus Comment Placement

## Overview

Wire the existing Giscus `Comments` component into all content layouts so readers can comment on any page with prose. This resolves `[STUB: giscus-placement]` from the Astro migration spec and fulfills the deferred decision in REQ-ASTRO-26.

## Entry Points

- Reader scrolls to the bottom of any content page (Writing, Thought, Idea, or Project)
- Giscus widget loads and displays existing GitHub Discussion thread for that URL, or offers to start one

## Requirements

- REQ-GISCUS-1: WritingLayout renders the Comments component as the last element in the article, after the "In This Series" navigation section (if present)
- REQ-GISCUS-2: ThoughtLayout renders the Comments component after prose, in standalone mode only (when `standalone: true` in frontmatter, rendering as a full page with header)
- REQ-GISCUS-3: IdeaLayout renders the Comments component after all prose and after the "Related Pages" navigation section (if present)
- REQ-GISCUS-4: ProjectLayout renders the Comments component after all prose content
- REQ-GISCUS-5: Comments do not render on listing/system pages: homepage (`/`), `/thoughts/`, `/ideas/`, `/projects/`, `/writing/`
- REQ-GISCUS-6: Each page's comment thread is scoped to its pathname via the existing `data-mapping="pathname"` configuration. No changes to the Comments component itself

## Exit Points

None. This is self-contained.

## Success Criteria

- [ ] Comments component renders on individual Writing pages (including series index pages)
- [ ] Comments component renders on standalone Thought pages
- [ ] Comments component does not render on non-standalone Thought pages (inline feed rendering)
- [ ] Comments component renders on individual Idea pages (including folder index pages)
- [ ] Comments component renders on individual Project pages
- [ ] Comments component does not render on homepage or any section listing page
- [ ] Rendered HTML includes `data-mapping="pathname"` in the Giscus script tag (ensures thread-per-URL scoping)

## AI Validation

**Defaults do not apply.** This is template wiring, not logic. No unit tests.

**Custom validation:**
- After `astro build`, verify the Giscus `<script>` tag (with `src="https://giscus.app/client.js"`) is present in rendered HTML for at least one page of each content type
- Verify the Giscus script tag is absent from the homepage and at least one section listing page
- Visual confirmation: run `astro preview`, navigate to a content page, confirm the Giscus widget UI is visible below the content

## Constraints

- No changes to the Comments component (`src/components/Comments.astro`). It's already configured correctly.
- No changes to BaseLayout. Comments are a content-level concern, not a site-wide wrapper concern.

## Context

- [Brainstorm: giscus-placement](.lore/brainstorm/giscus-placement.md) - Decision record for placement rules
- [Spec: astro-migration](.lore/specs/astro-migration.md) - REQ-ASTRO-25 (component), REQ-ASTRO-26 (deferred placement), exit stub
- [Retro: astro-migration](.lore/retros/astro-migration.md) - Lesson: "build succeeds" is not validation. Verify rendered output.
