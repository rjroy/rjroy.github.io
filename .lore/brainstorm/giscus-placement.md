---
title: Giscus comment placement across content types
date: 2026-02-13
status: resolved
tags: [giscus, comments, layouts, content-types]
modules: [layouts, components]
related: [.lore/specs/astro-migration.md, .lore/brainstorm/blog-vs-garden.md]
---

# Brainstorm: Giscus Comment Placement

## Context

The Giscus component (`src/components/Comments.astro`) was built and configured during the Astro migration (REQ-ASTRO-25) but never wired into any layout. REQ-ASTRO-26 deferred the placement decision. The stub `[STUB: giscus-placement]` was never resolved.

## Decision: Comments on All Content Pages

Comments go on all four content types: Writing, Thoughts, Ideas, and Projects.

**Reasoning:** Thoughts aren't throwaway one-liners. They're incomplete thoughts with open questions, which actually invites conversation more than finished essays. The audience is friends and professional connections, not strangers. Comments allow communication without forcing it.

## Placement Rule

**If it has prose, it has comments.** This includes:

- Individual Writing pages (including series index pages, which are essays themselves)
- Individual Thought pages (standalone view)
- Individual Idea pages (including folder index pages with prose)
- Individual Project pages

**No comments on system/listing pages:**

- Homepage (`/`)
- `/thoughts/` index
- `/ideas/` index
- `/projects/` index
- `/writing/` index

## Position Within Page

Comments render after all prose content and after any navigation sections ("In This Series", "Related Pages"). Last element on the page. Standard pattern, doesn't force interaction.

## Giscus Mapping

`data-mapping="pathname"` creates one GitHub Discussion per URL. Series content gets separate threads per page (index page gets its own, each child essay gets its own). Conversations scoped to what the reader just read.

## Implementation Notes

- The component exists and is configured. No Giscus setup needed.
- Four layouts need the import and render: WritingLayout, ThoughtLayout, IdeaLayout, ProjectLayout
- BaseLayout does NOT get comments (it's the wrapper, not the content)
- ThoughtLayout has standalone vs. non-standalone modes. Comments only in standalone (individual page), not in feed rendering. Non-standalone is not used for individual pages so this may be moot, but worth verifying.

## Open Questions

None. Ready to spec.
