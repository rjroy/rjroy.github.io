---
title: Blog vs. garden structure for Broadcast Cache
date: 2026-02-08
status: archived
tags: [site-structure, quartz, astro, content-strategy, homepage, content-types]
---

# Brainstorm: Blog vs. Garden for Broadcast Cache

## Context

The site is a digital garden (Quartz 4) with three content categories: Ideas (developing thoughts), Projects (things being built), and Writing (solidified essays). The concern: there's no good temporal signal for readers, the presentation is clumsy, and the platform may be constraining what gets written.

## The Audience

Not search traffic or strangers. The realistic reader is:
- A friend following Ron's work over time
- A LinkedIn connection clicking through to the site

Both arrive with the same question: "What has Ron been thinking about lately?"

## Session 1: Blog vs. Garden

### The problem isn't "blog vs. garden," it's a missing temporal layer

The topical structure serves depth well. The AI Partnership series hangs together. A blog would scatter it. But there's no entry point for "what's new." The homepage is static and reads like a README. A returning visitor sees the same page every time.

### Homepage as feed

Rather than a separate Feed page or converting to a blog, make the homepage the temporal layer:
- Short intro (2-3 sentences)
- Hand-curated "What's New" section, newest at top
- Category links as secondary nav

Avoids blog pressure (no schedule, no empty months) while giving the temporal signal. The audience is small enough that curation beats automation.

### Status indicators for Ideas

Ideas have no visible signal about whether they're active, paused, or graduated. Frontmatter field + visible text at top of page.

## Session 2: Platform Reconsideration

### Quartz's value proposition doesn't match the need

Quartz's main features: wiki-link resolution, backlinks panel, graph visualization.

Reality check:
- **Backlinks** ("pages that link to this page"): not important to Ron
- **Graph view**: Ron actively dislikes it, only kept it because "it helps some people think"
- **Wiki-links**: the one feature that matters, and it's a remark plugin, not a platform

The presentation tax is real. The explorer is a file tree. "Recently Updated" dumps modification dates without context. The site looks like a published vault, not a personal site. It also looks more "finished" than the content warrants.

### Hard requirements

- Deploy to GitHub Pages
- Content lives in Obsidian vault (markdown, for Memory Loop compatibility)
- Internal linking between notes (`[[wiki-links]]`)
- Transform at build time is fine (vault stays pure markdown)

### Desired features Quartz can't easily provide

- Comments (Giscus or similar)
- Controlled RSS feed
- Multiple content types with different layouts
- Temporal feed alongside persisted content
- A site that feels personal, not like a tool's default output

### Platform evaluation

| Platform | Wiki-links | Presentation control | Comments | RSS | Migration effort |
|----------|-----------|---------------------|----------|-----|-----------------|
| Quartz (current) | Native | Low (fighting the tool) | Hack | Exists, limited control | None |
| Astro | Remark plugin | Full | Giscus drops in | Full control | Medium |
| Hugo | Custom render hooks | Good (Go templates are painful) | Theme support | Built in | Medium |
| 11ty | Community plugins | Full (but build everything) | Giscus | Plugin | Medium |

**Ruled out:** Jekyll (dated), Obsidian Publish (no GitHub Pages, costs money), Next.js (overkill for content site).

**Strongest option: Astro.** Ron already works in TypeScript/bun. Content collections handle "folder of markdown with frontmatter." Full layout control. The wiki-link transform is engineering work, not insurmountable.

## Session 3: Content Model Breakthrough

### The mental barrier

The current structure demands "full thoughts." Every piece needs to be a developed exploration or a finished essay. This creates friction. Ron doesn't publish because the bar feels too high.

### Three content types, not two

**Thoughts** (temporal)
- Short, datestamped, shown in a feed
- Explicitly incomplete. That's their nature, not a flaw
- Can link to deeper persisted pieces without being part of them
- "Started thinking about X. Connects to Y, but different angle."
- 30 seconds to write. Already a complete post

**Ideas** (persisted, developing)
- Accumulate over time, get revised
- Have status (active, paused, graduated)
- Live in folders with research
- Read as a whole, not in chronological order

**Writing** (persisted, finished)
- Essays and series
- Polished, thought-through
- The destination when an idea fully crystallizes

**Projects** sit alongside as a fourth type, or possibly Ideas that build something.

### The interaction between types

A Thought can reference an Idea without being part of it. A Thought can announce that an Idea was updated. The feed shows thinking in motion. The Ideas/Writing sections show thinking that's arrived.

This removes the "I need a complete thought to publish" barrier. Thoughts are a different content type with different expectations.

### Why this requires a platform change

Quartz has one content type: "page." It can't give Thoughts a different layout, different index behavior, or different feed treatment. Astro's content collections let you define distinct types with different schemas, layouts, and rendering rules.

## Open Questions

1. What does the Thoughts layout actually look like? Tweet-length? A paragraph? Variable?
2. Do Thoughts get their own page, or are they only shown in the feed/homepage?
3. How does the homepage compose these types? Thoughts as a stream, with Ideas/Writing/Projects as sections below?
4. What's the migration path? New Astro site alongside current Quartz, or replace in place?
5. Theme/visual identity: start from a theme or build from scratch?

## Next Steps

- Research Astro content collections + remark wiki-link plugins to confirm feasibility
- Sketch the content model (frontmatter schemas for each type)
- Decide on migration strategy
- Design the homepage layout that combines temporal (Thoughts) and persisted (Ideas/Writing/Projects)
