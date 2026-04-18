---
title: What to Build Next
date: 2026-03-25
status: active
tags: [direction, projects, memory-loop, quality, adventure-engine, ide]
commission: commission-Celeste-20260325-131413
---

# Brainstorm: What to Build Next

## Header

**Vision status:** Draft (`vision.md` has `status: draft`). No approved vision exists. Proceeding without four-step alignment analysis. Proposals are assessed informally against the draft principles where relevant.

**Context scanned:**
- `.lore/vision.md` (draft, March 2026)
- `content/Ideas/LLM-Integrated-PKM/index.md` and `From-Research-to-Practice.md`
- `content/Projects/Adventure-Engine-of-Corvran/index.md`
- `content/Projects/Guild-Hall/index.md`
- `content/Projects/Vibe-Garden/index.md`
- `content/Metadata/memory-loop/cards/` (existing card infrastructure)
- `content/Metadata/memory-loop/goals.md`
- `content/Inbox/2026-03-08.md`
- `content/Inbox/Monthly_Reports/2026-01_Summary.md`

**Recent brainstorm check:** `blog-vs-garden.md` (platform and content model, now fully resolved via Astro migration). `giscus-placement.md` (comments, resolved). No overlap with proposals below.

**Framing:** Ron's diagnosis is precise. Memory Loop is a tool to take notes. Vibe Garden, Lore Development, and Guild Hall are tools to build tools. The Adventure Engine is the exception: built for joy, not infrastructure. The question isn't "build more things" — it's "build something that produces something other than my own workflow."

---

## Proposal 1: Spaced Repetition — Close the Learning Loop in Memory Loop

**Evidence:**

The `LLM-Integrated-PKM/From-Research-to-Practice.md` document names this as the highest-priority gap: "Spaced Repetition gives immediate practical value — stops you from losing track of work facts. Addresses the most critical research gap (no systematic retrieval practice)." The design is complete: SM-2 algorithm, `/test-my-knowledge` command, "Correct / Incorrect / Outdated" feedback loop, question lifecycle tied to note content. The infrastructure exists: `content/Metadata/memory-loop/cards/` has 36+ cards with frontmatter fields `ease_factor`, `interval`, `repetitions`, `next_review` already defined. The one card I inspected (`06c59ce3`) has `repetitions: 0` and `last_reviewed: null` — the SM-2 machinery is wired up and waiting. Nothing is scheduled. Nothing is ever surfaced for review.

**Proposal:**

Build the `/test-my-knowledge` command in Memory Loop. Present overdue cards sorted by `next_review`. Record the feedback. Reschedule using SM-2. Generate new cards from recent notes during `/weekly-debrief`. The design doc has all the decisions made. This is an implementation task, not a design task.

**Rationale:**

This is the line between a capture system and a learning system. Memory Loop currently makes it easy to write things down and hard to remember them. The research is clear about why: frictionless capture without retrieval practice creates the illusion of learning while bypassing actual retention (Grinschgl et al., 2021). The SM-2 fields in the card frontmatter are evidence that this was always the plan — the infrastructure was built in anticipation of a review loop that never arrived. Finishing this changes what Memory Loop is, not just what it does.

It's still a personal tool. But it's no longer a note-taking tool — it becomes a knowledge maintenance tool. That's a different category.

**Scope:** Small. Design is done. Infrastructure exists. This is wiring and UI, not architecture.

---

## Proposal 2: The Quality Ratchet — Continuous Re-evaluation of Code Against Evolving Standards

**Evidence:**

The goals file (last reviewed January 2026) lists one active development idea: "Quality development — Core question: 'How do we get AI to re-evaluate past work efficiently against evolving standards?'" The SDK team is mid-C++20 conversion and UE5 upgrade. The AI adoption retro notes the SDK style guide isn't in CLAUDE.md yet, so engineers currently enforce style standards manually during review. The Thorne worker in Guild Hall is already described as: "Oversees all work with a critical eye. Inspects everything, alters nothing."

**Proposal:**

A versioned style guide in `.lore/` (or a project's equivalent). A scheduled Guild Hall commission that dispatches Thorne to review a rotating set of files against the current standard version. Thorne produces a violation report artifact: which patterns appear, in which files, whether they were present before the current standard version, and whether they're in code that's actively touched. The ratchet metaphor: you set a new standard, the tool finds the gap between the standard and the codebase, and gives you a prioritized list of what to fix first.

**Rationale:**

This isn't personal productivity. This is something an engineering manager would actually deploy against a team's codebase. The problem is universal: standards evolve faster than codebases, and the delta is invisible until someone does a manual audit (expensive, infrequent, already outdated by the time it's done). An asynchronous ratchet that runs on a schedule and produces a current gap report changes the economics of technical debt management. The insight this project would reveal: what happens when you treat code quality as a continuously measured property rather than a point-in-time inspection?

Guild Hall is the obvious infrastructure for this — it's already running commissions. The ratchet is a use case, not a new system.

This one has a user other than Ron: any engineering team with evolving standards.

**Scope:** Medium. Requires designing the standard versioning format, the file selection strategy, and Thorne's violation taxonomy. The commission infrastructure is already there.

---

## Proposal 3: Pair Writing Mode — Authorship Preservation at the Seam Between Human and AI

**Evidence:**

`LLM-Integrated-PKM/From-Research-to-Practice.md` has a complete design for "Pair Writing Mode": split-screen editor (human left, AI right), highlight + right-click menu (Validate, Critique, Tighten, Embellish, Correct, Polish), highlight + jump to chat, "What Changed?" flow that diffs Claude's draft against your rewrite. The design explicitly includes shadow version history and context passing. The stated rationale: "removes the ceremony (switching between editor and chat) while preserving the friction of manual application (you internalize revisions)."

Memory Loop's current "Think" mode uses a conversational interface. The gap: when a piece of writing has a draft (from AI or from quick capture), there's no mode for iterating on it collaboratively without switching contexts.

**Proposal:**

Build the Pair Writing Mode as described. The key interaction is the "What Changed?" flow: highlight your rewrite, invoke Claude, receive a diff analysis that names what changed without judging "better." Over time, this creates a learning loop — Claude learns your patterns, you internalize what you're doing when you revise.

**Rationale:**

The draft vision says: "I work with Claude Code as my ghost writer." That's the homepage claim. But the tool doesn't have a dedicated mode for the collaborative revision process that claim implies. The transparency principle in the vision says the collaboration model should be demonstrated, not just stated. A pair writing mode would demonstrate it concretely.

This is still a personal tool. But it addresses a genuine authorship problem that anyone publishing with AI assistance faces: how do you maintain a relationship with your own text when an AI draft exists? The "What Changed?" flow is the interesting part — it teaches you your own patterns. That's different from autocomplete.

**Scope:** Medium. Requires a new editor mode in Memory Loop, shadow version history, and context passing to conversation. The design doc has the decisions.

---

## Proposal 4: Corvran for Others — Open the World

**Evidence:**

`content/Projects/Adventure-Engine-of-Corvran/index.md`: "The world of Corvran itself (with its ancient Thornwood, competing delver guilds, and mysterious relics) emerged through play. The setting has accumulated history and consistency as adventures have unfolded, creating something that feels like a living world rather than a procedurally generated backdrop." The project is marked "Ongoing: the engine evolves as I play." It's the only project on the site built for entertainment rather than infrastructure. The project page treats it as personal — "an exploration of that space."

**Proposal:**

The Corvran setting is already a product; it's not being treated as one. The next project isn't improving the engine. It's packaging the world so others can play in it: a public world-bible (the Thornwood, the factions, the relics), the AI game master as a hosted tool, and a mechanism for adventures to contribute lore back to the shared world. Multiple people playing in Corvran would generate new lore. The AI would maintain consistency — "your new character mentions the Whispered Market; here's what the Whispered Market has established so far." This makes the world collaborative without requiring simultaneous play.

**Rationale:**

This is the only project that produces something people experience rather than something people use to build. The adventure engine already works. The question is whether the world it runs is private or shared. Opening the world changes the project from "personal toy" to "creative platform" — and it reveals something none of the existing projects address: what happens when AI mediates creative authorship across multiple people? Not AI as assistant (Memory Loop), not AI as worker (Guild Hall), but AI as keeper of shared truth in a collaborative fiction.

The world-bible is the content. The lore consistency engine is the product. Both are already partially built.

**Scope:** Medium. The engine exists. The lore exists in play history. The work is: extract the canonical world-bible into structured form, build the consistency layer, make the AI master accessible to others.

---

## Proposal 5: The Non-File IDE — Design the Question Before Building the Answer

**Evidence:**

`content/Inbox/2026-03-08.md`: "What should a modern IDE look like? One that isn't forced to be file centric? Is it just the agent view of cursor? Or something else?" This was captured at 21:25 on a Saturday — the time when thinking happens that doesn't fit anywhere else. Guild Hall has demonstrated task-based workflows: commissions have context, workers have scope, and the output is an artifact rather than a file operation. Lore Development structures context around intentions and decisions, not around directory trees. Vibe Garden's Compass Rose manages "what to work on next" as a distinct layer above file editing.

**Proposal:**

Don't build yet. Design first. The question "what should a modern IDE look like?" deserves a research artifact: what makes file-centricity a constraint? What would task-centricity look like at the UI layer? What would you gain and lose? Guild Hall is a working prototype of one answer (commission-based workflows), but it's not positioned as an IDE replacement. The brainstorm document for this idea should be the first artifact. If the design is interesting, it becomes a project.

**Rationale:**

The March 8 question is the most ambitious thing in the inbox. IDEs are one of the last categories of developer tooling that haven't been reconceived around intent. Cursor added an AI assistant to VS Code. That's not reconceiving — that's layering. A file-agnostic development environment would require: (1) a model of "task" that replaces "file" as the organizing unit, (2) a view that surfaces relevant context rather than requiring you to open folders, (3) AI that understands what you're trying to do rather than what file you're in. Ron already has opinions on all three from building Guild Hall. The gap: those opinions haven't been articulated as a product proposal.

The right move is a research artifact and a brainstorm, not immediately starting to code. If the design survives contact with prior art and honest critique, it becomes a project. If it doesn't, you've spent a few hours instead of a few months.

**Scope:** Small to start (design and research). Potentially Large (if the design warrants building).

---

## Reading the Room

These five proposals sit at different distances from Ron's diagnosis ("tools to build tools, or tools to take notes"):

- **Spaced repetition** is still Memory Loop, but it crosses from capturing to learning. Different category, same product.
- **Quality Ratchet** breaks the personal-tool pattern. It's team-facing, and the output is useful to engineers who've never heard of Guild Hall.
- **Pair Writing Mode** is still personal, but it addresses the authorship question that the site's homepage claim raises. The transparency principle in the vision makes it relevant.
- **Corvran for Others** is the most "real" in the sense Ron probably means. A world others play in is not tooling. It's a creative artifact.
- **The Non-File IDE** is the most ambitious and least defined. It's where the March 8 question lives — unexamined, potentially large.

If "something real" means something with users other than yourself: **Corvran for Others** and the **Quality Ratchet**. If it means something that changes the nature of what you've already built: **spaced repetition**. If it means something nobody else is building: **the non-file IDE question**.

The Adventure Engine is the only project Ron built without a productivity rationale. That's probably not a coincidence. The next "real" thing might grow from the same place the adventure engine did: an itch that isn't a problem to solve.
