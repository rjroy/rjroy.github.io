---
title: Giscus comment placement across content layouts
date: 2026-02-13
status: draft
tags: [giscus, comments, layouts, content-types]
modules: [layouts, components]
related: [.lore/specs/giscus-placement.md, .lore/brainstorm/giscus-placement.md]
---

# Plan: Giscus Comment Placement

## Spec Reference

**Spec**: `.lore/specs/giscus-placement.md`

Requirements addressed:
- REQ-GISCUS-1: WritingLayout renders Comments after "In This Series" nav → Step 1
- REQ-GISCUS-2: ThoughtLayout renders Comments in standalone mode only → Step 2
- REQ-GISCUS-3: IdeaLayout renders Comments after "Related Pages" nav → Step 3
- REQ-GISCUS-4: ProjectLayout renders Comments after prose → Step 4
- REQ-GISCUS-5: No comments on listing/system pages → Addressed by placement (layouts only used on individual pages)
- REQ-GISCUS-6: Thread scoped to pathname via existing config → No changes needed (already configured)

## Codebase Context

- `src/components/Comments.astro` is fully configured (repo ID, category ID, `data-mapping="pathname"`, themed). No modifications needed.
- All four content layouts follow the same pattern: `<article>` wrapping a header, prose `<div>`, and optional nav sections.
- ThoughtLayout has a ternary: standalone mode renders a full `<article>` with header; non-standalone renders minimal markup. Comments only belong in the standalone branch. **Note:** No existing thoughts currently have `standalone: true` in frontmatter (defaults to `false`). The `/thoughts/` listing page doesn't use ThoughtLayout at all. This means all individual thought pages currently render in non-standalone mode, and comments won't appear on any thought page until content is updated. This is a content concern, not a plan concern.
- Listing pages (`/`, `/writing/`, `/thoughts/`, `/ideas/`, `/projects/`) use their own page templates that don't render these layouts, so REQ-GISCUS-5 is satisfied by placement alone.
- BaseLayout is the site wrapper. The spec says don't touch it; comments are a content concern.

## Implementation Steps

### Step 1: Add Comments to WritingLayout

**Files**: `src/layouts/WritingLayout.astro`
**Addresses**: REQ-GISCUS-1

Import `Comments` from `../components/Comments.astro`. Add `<Comments />` as the last element inside `<article>`, after the "In This Series" `<nav>` section (or after the prose div when no series nav is present). Since the nav is conditionally rendered, the Comments component goes after the conditional block, before `</article>`.

### Step 2: Add Comments to ThoughtLayout (standalone only)

**Files**: `src/layouts/ThoughtLayout.astro`
**Addresses**: REQ-GISCUS-2

Import `Comments`. Add `<Comments />` inside the standalone branch of the ternary, after the `<div class="prose">` block, before the closing `</article>`. Do not add it to the non-standalone branch (that renders inline in the feed).

### Step 3: Add Comments to IdeaLayout

**Files**: `src/layouts/IdeaLayout.astro`
**Addresses**: REQ-GISCUS-3

Import `Comments`. Add `<Comments />` as the last element inside `<article>`, after the "Related Pages" `<nav>` section (or after the prose div when no nav is present). Same pattern as WritingLayout: after the conditional block, before `</article>`.

### Step 4: Add Comments to ProjectLayout

**Files**: `src/layouts/ProjectLayout.astro`
**Addresses**: REQ-GISCUS-4

Import `Comments`. Add `<Comments />` after the `<div class="prose">` block, before `</article>`. Simplest change, no conditional sections.

### Step 5: Build and validate

**Addresses**: REQ-GISCUS-5, REQ-GISCUS-6, all success criteria

Run `bun run build`. After build completes, verify rendered HTML:

1. **Presence check**: Giscus `<script>` tag (containing `src="https://giscus.app/client.js"`) appears in:
   - A Writing page: e.g., `dist/writing/ai-as-your-partner/index.html`
   - An Idea page: e.g., `dist/ideas/guild-hall/index.html` (or any folder under `dist/ideas/`)
   - A Project page: e.g., `dist/projects/memory-loop/index.html` (or any folder under `dist/projects/`)
   - **Thoughts**: Skip this check. No existing thoughts have `standalone: true`, so no thought pages will render Comments until content is updated.

2. **Absence check**: Giscus script tag is NOT in:
   - `dist/index.html` (homepage)
   - `dist/writing/index.html` (writing listing)
   - `dist/thoughts/index.html` (thoughts listing)

3. **Pathname mapping**: Confirm `data-mapping="pathname"` is present in the rendered script tags.

4. **Visual check**: Run `bun run preview`, navigate to a Writing page and a Project page, confirm the Giscus widget UI is visible below content.

### Step 6: Validate against spec

Launch a sub-agent that reads the spec at `.lore/specs/giscus-placement.md`, reviews all four modified layout files and the build output, and flags any requirements not met.

## Delegation Guide

No specialized expertise needed. This is straightforward template wiring with one conditional (ThoughtLayout standalone check). All steps can be done by a general-purpose agent.

## Open Questions

1. **Thought standalone mode**: No existing thoughts use `standalone: true`. Comments are wired into the standalone branch per spec, but won't be visible until a thought is published with that frontmatter flag. Consider whether to mark one existing thought as standalone for validation, or accept that this path is tested by code inspection only.
