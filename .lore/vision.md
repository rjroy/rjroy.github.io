---
title: Vision for Ron's Broadcast Cache
status: draft
author: Celeste (Guild Visionary)
date: 2026-03-23
review_trigger: 6 months or when a new content series is started
last_reviewed: 2026-03-23
---

# Vision: Ron's Broadcast Cache

Every piece of content on this site, every project described, every essay published, orbits the same question: **what does it look like when a practitioner builds with AI, uses what they build, and writes about what they learn?**

The projects are the content pipeline. Memory Loop solves a friction point and produces the LLM-Integrated PKM idea. Guild Hall solves a delegation problem and produces thinking about multi-agent workflows. Vibe Garden solves developer workflow friction and produces thinking about intent-driven development. The essays aren't separate from the projects. They're what the projects taught.

This is not a blog (scheduled output, audience-first). It's not a traditional digital garden (accumulating notes, discovery-first). It's a **practitioner's workshop made public**: build, use, reflect, share. The site is the window into that loop, and the loop itself is the thesis.

The throughline: **humans working with AI, explored by actually doing it.** Not theory about how AI could change things. Evidence from the workshop floor, reported by someone who builds the tools, uses the tools, and names what the tools reveal.

## Principles

These guide decisions about what gets published, how the site evolves, and what gets prioritized.

### 1. Build First, Write From Evidence

The site's credibility comes from the projects. An essay about intent-driven development lands because Guild Hall and Vibe Garden exist. An essay about AI partnership lands because Memory Loop demonstrates the collaboration pattern daily. Writing that isn't grounded in something built, used, and tested doesn't belong here.

This means: new writing series should emerge from project experience, not from abstract interest. The question "what did building this teach me?" is always the starting point.

### 2. Transparent Collaboration

The homepage already states: "I work with Claude Code as my ghost writer." This transparency is a feature, not a disclaimer. It demonstrates the thesis. A site about human-AI collaboration that hides its own AI collaboration would be incoherent.

This means: don't retreat from the transparency. As the collaboration patterns evolve (Guild Hall commissions producing content, for example), document how the workflow changes. The meta-layer (how this site gets made) is content.

### 3. Thoughts Are the Pulse

Thoughts exist to lower the publication bar. They're the temporal signal for a small audience of friends and professional connections who want to know what Ron is thinking about this week. The brainstorm that created them (`blog-vs-garden.md`) got this exactly right: 30 seconds to write, explicitly incomplete, and that's their nature.

This means: when in doubt, publish a Thought. Don't let it sit in the Inbox waiting to become an Idea. The homepage feed should feel alive, not curated.

### 4. Depth Over Breadth

The audience is small and specific. They arrive with context (they know Ron, or they clicked through from a LinkedIn post). They want depth on a few topics, not surface coverage of many. Three well-developed series (AI as Your Partner, Expressive Tools, Intent-Driven Development) serve this audience better than twenty disconnected essays.

This means: new Writing series should be deliberate. A new series is a commitment to explore a topic through multiple essays. Ideas are the staging ground where topics prove they have enough depth to warrant a series.

### 5. The Site Is the Simplest Thing That Works

The Astro migration was the right call. The site is static, deploys to GitHub Pages, builds with Bun, and requires no backend. Content is markdown in an Obsidian vault. This simplicity is a feature: maintenance cost is nearly zero, and every hour not spent on infrastructure is an hour spent on content.

This means: resist feature additions that increase maintenance. The Giscus comment system is the right kind of addition (drops in, no backend). A CMS, a search backend, or a custom analytics system would be the wrong kind.

## Anti-Goals

Things this site should never become, even if they seem appealing in the moment.

### A. Not a Content Marketing Machine

The site doesn't exist to build an audience, sell a product, or establish thought leadership as a career strategy. It exists because Ron thinks by building and writing. If the audience grows, fine. But optimizing for growth (SEO, posting cadence, engagement metrics) would corrupt the signal. The moment you write for the algorithm instead of the workshop, the workshop stops producing honest output.

### B. Not a Tool Showcase

The projects are important because of what they reveal about human-AI collaboration, not because they're impressive software. Memory Loop matters because it surfaced the GCTR framework and the preference-performance gap in PKM design, not because it has a synthwave theme. Guild Hall matters because it demonstrated that async delegation to AI specialists changes how you think about work, not because it has a cool architecture diagram.

### C. Not an AI Hype Vehicle

The site's credibility depends on naming what's hard alongside what works. The Intent-Driven Development essay names the terror of the role shift honestly. The LLM-Integrated PKM research calls out that frictionless capture may undermine learning. The Thoughts collection includes "AI Makes Code Cheap, Review Expensive" and "Claude Won't Tell You When You're Wrong." If the site only published positive findings, it would be marketing, not practice.

### D. Not a Knowledge Base

The content is organized for readers, not for retrieval. The site is not the vault. The vault has daily notes, meeting captures, raw research, and workflow metadata. The site has the output: developed ideas, finished essays, project descriptions. Blurring this boundary (publishing raw captures, showing the full Inbox) would make the site less useful to readers and less honest about what "published" means.

## Content Strategy

### Current State (March 2026)

**Strong:**
- AI as Your Partner series: three essays, complete, well-developed. The foundation piece.
- Expressive Tools series: two essays, coherent thesis. Could grow but doesn't need to.
- Project descriptions: Memory Loop, Guild Hall, Vibe Garden are all substantive and well-written.
- Intent-Driven Development: draft complete, the most ambitious piece. Grounds personal practice in industry research.

**Developing:**
- LLM-Integrated PKM: deep research done, synthesis written, but needs the concrete improvements (spaced repetition, artifact extraction) before it's ready to publish as Writing. Currently in Ideas.
- Thoughts: eight published. The feed is established but thin. More regular publication would give the homepage pulse.

**Missing:**
- The connection between projects and essays is implicit. A reader who visits the Memory Loop project page and the LLM-Integrated PKM idea page might not realize they're the same story at different levels. The throughline that connects all the content isn't stated anywhere except the homepage intro, and even there it's understated.

### Recommended Direction

**Short term (next 3 months):**
1. Publish Intent-Driven Development (currently `draft: true`). It's the strongest single piece on the site and the one most likely to resonate with the LinkedIn audience. The research backing is thorough (SASE, SDD, DORA, Beck).
2. Increase Thought frequency. The current pace (8 thoughts over ~5 weeks) is healthy but could be more regular. One or two per week would keep the homepage feed alive without creating pressure.
3. Consider a brief "About This Site" or "How I Work" page that names the build-use-reflect-share loop explicitly. Right now the homepage hints at it but doesn't state the thesis. A reader should be able to understand what connects Memory Loop, Guild Hall, and Intent-Driven Development in under 30 seconds.

**Medium term (next 6 months):**
1. Develop the Guild Hall essay. The project page exists. The Ideas page predates the project. But there's no Writing-level treatment of what async AI delegation reveals about knowledge work. The commission system, the worker identity model, the artifact-over-conversation principle: these are ideas that deserve the same treatment as "AI as Your Partner."
2. Graduate LLM-Integrated PKM from Ideas to Writing once the concrete improvements (spaced repetition mechanism, artifact extraction conventions) are designed or at least framed. The research is done. The gap is between "I know what's missing" and "I've designed what to do about it."
3. Revisit the goals file (`Metadata/memory-loop/goals.md`). Last reviewed January 19, 2026. The "Ideas to Develop Now" section lists GCTR research. That research is done (the LLM-Integrated PKM idea has it). The goals file doesn't reflect current state.

**Long term (direction, not timeline):**
The site's unique position is practitioner evidence at the intersection of AI tooling, development methodology, and knowledge management. Nobody else I've found is publishing from this exact vantage point: senior engineering manager, building AI tools daily, managing a team doing the same, and writing about the process changes this creates. That position is the moat. Protecting it means continuing to build things and write about what they teach, rather than writing about AI trends observed from a distance.

## Technical Direction

### What's Working

- Astro 5 with content collections: clean separation of content types, Zod schemas for validation, glob-based routing. The retro (`retros/astro-migration.md`) documented the migration thoroughly.
- Wiki-link support via remark plugin: Obsidian compatibility preserved, build-time resolution.
- Giscus comments on all content types: low maintenance, GitHub-backed.
- GitHub Actions deployment: push to master, auto-deploy. No moving parts.
- Bun for everything: package management, runtime, build.

### What Could Evolve

1. **RSS feed refinement.** The research (`research/astro-migration-feasibility.md`) outlined multiple feed strategies (per-collection, combined). If the LinkedIn audience grows, a curated RSS feed of Writing and Thoughts (excluding Ideas and Projects) would serve readers who want the finished output without the workshop process. This is low-effort with `@astrojs/rss`.

2. **Open Graph and social previews.** LinkedIn is the primary referral channel. Rich previews (title, description, image) when sharing links would improve click-through. Astro supports this natively via `<meta>` tags in layouts. No content change needed, just layout templating.

3. **Search.** Not needed today at this content volume. When the site has 50+ pages of published content, Pagefind (static search, no backend) would be the right addition. It aligns with the "simplest thing that works" principle.

## Tension Log

Tensions are not problems to solve. They're forces in dynamic balance. Naming them prevents accidental resolution in the wrong direction.

### Build vs. Write

Ron builds compulsively (the "compulsive completion" pattern: 2-3 hours daily once started). Building produces raw material for writing. But building also consumes the time and energy that writing requires. The site needs both, and they compete for the same resource: focused creative hours.

**Resolution approach:** Don't try to balance them on a schedule. The build-then-write cycle is natural. A project ships, the retro captures lessons, and the essay crystallizes later. Forcing writing during a build phase produces worse output. Thoughts bridge the gap: quick captures during build phases keep the site alive while the essay marinates.

### Transparency vs. Mystique

The site is explicit about AI collaboration. This serves the thesis (human-AI partnership demonstrated) but may create a discount effect: "oh, AI wrote this." The Intent-Driven Development essay is good enough that a reader might not care who wrote it. Flagging AI involvement might actually reduce its credibility with some audiences.

**Resolution approach:** Transparency is non-negotiable (it's Principle 2). But the emphasis should be on the collaboration model, not the AI label. "I work with Claude Code as my ghost writer" (current homepage) is the right frame: it names the relationship, positions the human as the director, and invites curiosity rather than dismissal.

### Depth vs. Freshness

The audience wants to know "what has Ron been thinking about lately?" (the blog-vs-garden brainstorm's key insight). But the best content takes time. Intent-Driven Development required researching SASE, SDD, DORA, Beck, Zakas, and synthesizing them. That's not a weekend.

**Resolution approach:** Thoughts carry freshness. Writing carries depth. They serve different temporal needs for the same audience. The homepage must surface both: recent Thoughts for the "what's new" question, Writing series for the "tell me more" question. The current design does this.

## Review Trigger

Re-examine this vision when:
- A new Writing series is started (does it align with the throughline?)
- The audience changes character (no longer friends and LinkedIn connections, now strangers from search)
- A project ships that doesn't connect to the existing themes
- 6 months have elapsed (September 2026)

---

*This vision document was drafted by examining all .lore/ artifacts, all content collections, the research archive, retros, brainstorms, git history, and the goals file. It reflects the state of the project as of March 2026.*
