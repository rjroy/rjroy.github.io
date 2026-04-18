---
title: Game possibilities
date: 2026-03-25
status: active
tags: [game, corvran, project-direction, creative-work]
author: Celeste (Guild Visionary)
---

# Brainstorm: Game Possibilities

## Header

**Vision status:** Draft. No approved vision exists yet. The vision document exists at `.lore/vision.md` with `status: draft`. Proceeding without four-step alignment filtering.

**Context scanned:** vision.md, brainstorm/ (both prior brainstorms: blog-vs-garden, giscus-placement), commissions 131255 and 131413, the full content tree including all Projects and Writing, the git log.

**Recent brainstorm check:** Two prior brainstorms exist. Neither addresses games or project direction. No duplication risk.

**Critical prior art:** `content/Projects/Adventure-Engine-of-Corvran/index.md` — Ron already built a solo TTRPG with an AI game master. It has persistent characters, a named world (Corvran), client-server architecture, and a description that reads like it's been played, not just built. The engine is ongoing. Any proposal that asks "should we build a game?" needs to start here: a game already exists.

**The question is not "could we build a game." The answer is yes, and the evidence is already on the site. The real question is: what comes next?**

---

## Proposal 1: Make Corvran Actually Playable From the Site

**Title:** Corvran Web Edition

**Evidence:** The Adventure Engine project page contains four screenshot images embedded as static `.webp` files. The architecture section describes "a GUI application providing the game interface." The project page is well-written and personal, but a visitor can only read about Corvran — they can't play it. The green "Connected" indicator visible in the screenshots suggests a running desktop app, not a web page. The site's audience (friends, LinkedIn connections) has zero path to experiencing the thing Ron is describing.

**Proposal:** Port the game client from a desktop GUI to a web frontend. The existing backend handles AI processing and game state. The new frontend runs in the browser, connects to that backend, and delivers the same play experience through a URL. The site becomes the entry point to actually playing Corvran, not just reading about it.

**Rationale:** Every other project on the site — Memory Loop, Guild Hall, Vibe Garden — is described and linked. Corvran is described but locked behind a desktop app someone else can't run. Web access turns Corvran from "here's something I built" to "here's something you can try." The essay that comes from this isn't about the port; it's about what happens when you let someone else navigate a world you built through play.

There's a secondary gain: the project page currently says "Ongoing: the engine evolves as I play." A web edition forces the engine to handle multiple players (even if it's just Ron and one or two others), which will reveal what the AI game master assumed about its player. That's new material for writing.

**Scope:** Large. New frontend + hosting/deployment for the backend, which currently lives on a local machine or private server.

---

## Proposal 2: A Corvran Companion That Lives on the Static Site

**Title:** Corvran Codex

**Evidence:** The project page describes persistent characters across adventures, domain cards (special abilities), equipment tracking, and faction lore. "The world of Corvran... has accumulated history and consistency as adventures have unfolded." That accumulated history lives only in the backend. The site's audience can't see the world. The vision notes the site is missing "the connection between projects and essays" — the same gap exists between Corvran the project and Corvran the world.

**Proposal:** A static-site companion for Corvran: character sheet viewer, world lore browser (factions, locations, notable events), and session notes. Built entirely in client-side TypeScript within Astro — no backend required. Data is exported from the Corvran engine as JSON, committed to the site repo, and rendered as browsable pages. The codex becomes both a reference for active play and a window for readers who want to understand the world before (or instead of) playing it.

**Rationale:** This is the game-adjacent tool that closes the lore publication gap without requiring 24/7 backend availability. It requires zero new infrastructure and fits naturally within the static site's content model. The world-building that's happened through play becomes site content — Ideas or a new content type — rather than private backend state.

There's a creative angle here worth naming: publishing the lore transforms Corvran from a private game into a public world. Readers become potential future collaborators. The essay writes itself: "The world that emerged from play deserves its own published form."

**Scope:** Medium. Astro pages + JSON export tooling from the Corvran backend.

---

## Proposal 3: A Game Built Without AI as Counter-Evidence

**Title:** The Anti-Corvran

**Evidence:** Every project on the site uses AI as a core element. Corvran has an AI game master. Memory Loop uses Claude for thinking partnership. Guild Hall is multi-agent delegation. Vibe Garden is AI-accelerated development tooling. The vision's anti-goal "Not an AI Hype Vehicle" requires "naming what's hard alongside what works" — but all existing evidence points in one direction. There is no counter-case on the site: no project built without AI, no comparison point.

The writing that exists ("AI Makes Code Cheap, Review Expensive," "Claude Won't Tell You When You're Wrong") flags specific failure modes but stays within the AI-assisted frame. The site would be more credible about AI collaboration if it had evidence from the other side.

**Proposal:** Build a small, self-contained hypertext game — Twine-style or pure Astro — set in a standalone world, with zero AI in the gameplay loop. No AI narration, no AI-generated content, no AI coding assistance. Design, write, and code it the old way. Then publish the game and an essay: "I built a game without AI after building one with it. Here's what AI was actually doing."

The game doesn't need to be ambitious. A 30-minute hypertext experience with branching choices is enough. The constraint — no AI — is the creative challenge, and the essay is the real deliverable.

**Rationale:** This is the most original essay the site could publish right now. The site has three essays arguing AI partnership is meaningful. A fourth essay that argues it *more precisely* — by showing what specifically changes when AI is removed — would be more credible than another affirmation. It's harder to write than a success story. It's also harder to dismiss.

There's a practical benefit: building something without AI in the loop will reveal what about the current workflow is AI-dependent versus what's actually good process. That's new evidence, and new evidence is what this site runs on.

**Scope:** Medium. Game design + implementation + essay. Intentionally bounded by the "no AI" constraint.

---

## Proposal 4: A Personal Game Jam

**Title:** 48-Hour Jam Game

**Evidence:** The commission immediately before this one (commission-Celeste-20260325-131413) asked: "What should I build next? I've been building tools to build tools. Or tools to take notes. But I want to build something real." That restlessness is the signal. "Real" here means bounded, complete, experienced — not maintained indefinitely, not instrumentally useful, just a thing that exists and can be played.

The vision describes a "compulsive completion" pattern: "Starting a project means 2-3 hours daily until done. Manages by deliberately not starting things." A game jam exploits this pattern productively: the constraint (48 hours, fixed theme) makes completion inevitable and bounds the compulsive energy.

**Proposal:** Run a personal game jam. Pick a theme connected to the site's thesis (delegation, attention, the cost of context-switching, something in that register). Build a small game with AI assistance over a fixed 48-72 hour window. Publish the game and a session report simultaneously. The game is the artifact. The essay is the process documentation.

The game type is secondary — a browser game, a text adventure, a simple puzzle mechanic, a short narrative. What matters is the constraint and the compressed build-use-reflect cycle. A game jam condenses the workshop loop into a weekend.

**Rationale:** This directly addresses "I want to build something real." The jam format produces completion by design. The AI collaboration is unusually visible in compressed builds — you can see exactly what the AI contributed versus what you directed, because there's no time to lose the thread. The essay becomes a high-resolution case study of the collaboration pattern, not a retrospective from memory.

The risk is low. A game jam game can be incomplete or imperfect without damaging the site. The essay value is independent of whether the game is polished.

**Scope:** Small-Medium (by design — the jam constraint enforces it).

---

## Proposal 5: Corvran Season 2

**Title:** A Designed Expansion, Not Just Continued Play

**Evidence:** The project page says the engine "evolves as I play." The world has "accumulated history and consistency." But organic evolution differs from designed progression. The current system tracks domain cards, equipment, and story progress — mechanical scaffolding that emerged from need rather than design. Nothing on the project page describes what Corvran's second chapter is trying to do differently from the first.

Separately: the vision document identifies that the Guild Hall essay hasn't been written yet, the LLM-Integrated PKM idea is stuck between research and publication, and the "connection between projects and essays is implicit." Corvran has the same gap. There's a project page. There's no Writing-level treatment of what AI-driven solo gaming actually reveals.

**Proposal:** Define Corvran Season 2 as a deliberate creative expansion with two commitments. First: a designed mechanical upgrade — pick one specific system (faction reputation, domain card evolution, procedural location generation) and build it intentionally rather than reactively. Second: write the Corvran essay. Not the project page description, which exists. A Writing-level piece that answers: "What does a world that emerged from AI play actually feel like to inhabit? What did the AI game master do that I couldn't have done alone? What did it fail to do?"

**Rationale:** The project page says "it's genuinely fun, surprisingly immersive, and scratches an itch that other solo RPG approaches don't quite reach." That sentence is the essay waiting to happen. Season 2 is the excuse to write it from an evidence position that includes actual play time. The mechanical upgrade gives the new season a distinct character. The essay gives it a public form.

This is the proposal that most directly closes the gap the vision identified: evidence-based writing that hasn't been written yet, waiting on a project that's been actively played.

**Scope:** Large (new mechanics + substantial writing). But the writing alone is Medium if the mechanical expansion is deferred.

---

## Open Questions

These surfaced during exploration and don't belong in any single proposal:

1. Where does the Corvran backend currently run? The project page describes a client-server architecture but gives no deployment details. If it runs on a local machine, making it web-accessible requires solving the hosting problem first.

2. The project page for Corvran uses screenshots but no live demo link. Is this because the app is desktop-only, or because the backend isn't publicly hosted?

3. The vision's "Depth Over Breadth" principle applies to games too. One Corvran, developed further, serves the site better than two separate game projects. The proposals above that extend Corvran (Proposals 1, 2, 5) compete for the same creative energy as the independent proposals (3, 4). Worth noting the tradeoff before committing.

4. "We" in "could we build a game" is doing some work. The question implies collaboration — Ron + AI building together. Every proposal above assumes that. But Proposal 3 explicitly inverts it. Worth deciding whether the collaboration model is a given or a question.
