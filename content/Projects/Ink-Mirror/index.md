---
title: Ink Mirror
description: A journal where you write first and the AI reads second, observing your patterns without generating, correcting, or suggesting
date: 2026-04-19
status: maintained
cover: /Projects/Ink-Mirror/screenshots/entries.png
tags:
  - area
  - writing
  - journaling
  - style
---

# Ink Mirror

A journal where you write first and the AI reads second.

You put something down, rough or short, whatever you have. The system reflects back what it noticed about your choices: sentence rhythm, word habits, structural patterns. Not corrections. Not rewrites. Not suggestions. Observations.

![Write page with a full-page editor](/Projects/Ink-Mirror/screenshots/write.png)

You review those observations and decide which patterns are intentional and which are accidents. The intentional ones accumulate into a style profile that's descriptive (extracted from what you actually do) rather than prescriptive (what sounds good in theory).

## The Problem With Generation-First Tools

Most AI writing tools start with generation. You describe what you want, the AI produces it, you edit the result. That trains you to edit, not to write. Your voice becomes a correction layer on top of someone else's defaults.

The people who write well have internalized patterns they can't always articulate. They know what "sounds like them" but couldn't write a style guide from scratch. The people who want to write better often don't know which of their habits are strengths and which are noise.

Ink Mirror makes the implicit visible. It watches what you do (not what you say you do) and names the patterns. You decide which ones matter. Over time, the profile becomes a mirror that's more honest than self-assessment and more grounded than aspiration.

## The Loop

Four phases. You initiate the first. The rest follow automatically.

### Write

Open the journal and write. No prompts, no templates, no structure. A paragraph, a page, a single sentence. Entries are plain markdown with date-based frontmatter. You own the files; they're readable without Ink Mirror running.

### Observe

After you submit an entry, the Observer reads it and generates observations grouped into three dimensions: sentence rhythm, sentence structure, and word-level habits. Each observation names a pattern, cites a direct quote from your entry as evidence, and carries a status badge.

![Entry detail with observations panel](/Projects/Ink-Mirror/screenshots/entry-detail.png)

Observations sit at the pattern level, between broad categories and raw counts. "You used three consecutive short sentences to build tension in the closing paragraph" is an observation. "Your mean sentence length is 12.4 words" is not. Every observation has to pass the curation test: can the writer meaningfully answer "is this intentional?" If not, it's at the wrong grain.

### Curate

You classify each observation: intentional (this is my voice), accidental (I didn't mean to do that), or undecided (I'm not sure yet).

![Curate page presenting pending observations](/Projects/Ink-Mirror/screenshots/curate.png)

Curation is the most important step. It's where writing awareness actually happens. The act of deciding "yes, I do that on purpose" or "no, that was lazy" builds a muscle that no amount of AI generation can replace. Undecided items resurface in future sessions until you resolve them.

### Apply

Confirmed patterns accumulate into a style profile: a structured document describing your voice in concrete terms, grouped by dimension. Each rule tracks how many entries confirmed it.

![Style profile grouped by dimension](/Projects/Ink-Mirror/screenshots/profile.png)

The profile is always editable. Rephrase observations, add context, remove patterns that no longer fit. An "Edit as Markdown" mode drops to a raw editor for bulk restructuring.

When a curated observation becomes a profile entry, it transforms from a one-time finding to a stable characteristic. "Uses staccato rhythm for emphasis at paragraph endings" (stable) rather than "Used four short sentences in the March 26 entry" (one-time). The profile is formatted for use as AI system-prompt material: paste it into any tool that accepts custom instructions and it constrains generation toward your voice.

## Craft Nudges

A separate **Nudge** button runs an analysis against 12 general craft principles (passive voice clustering, sentence monotony, hedging accumulation, buried leads, nominalization density, characters buried in dependent clauses, and so on).

Nudges aren't about your personal patterns. They're a second lens. Each one returns a principle, the exact evidence from your text, a descriptive observation, and an open-ended Socratic question, deliberately framed so at least one reading exists where the pattern is legitimate. Nudges never propose rewrites. They make patterns visible so you can decide whether they're serving you.

## Design Principles

**Writing takes practice.** Ink Mirror never generates text for you. The journal entry is always yours, rough or short or half-formed. The skill lives in the act of putting words down, and no amount of observation substitutes for that.

**Feedback accelerates skill.** The feedback is descriptive, never prescriptive. The system tells you what you do. Whether it's good is your call.

**Practice should be frictionless.** Writing is the only action you have to take. Everything else (observation, profile updates, contradiction detection) happens without being asked.

**Clients are views.** The daemon is the authority. Web and CLI are rendering surfaces over the same data and the same API. Neither is primary. A terminal-native writer and a browser-native writer get the same experience through different glass.

## What It Isn't

- **Not a grammar checker.** Ink Mirror doesn't flag errors or enforce rules. Patterns aren't errors.
- **Not a ghostwriter.** The profile can feed tools that generate text; Ink Mirror itself never does.
- **Not a writing course.** It doesn't teach, suggest exercises, or grade. It shows you what you do.
- **Not a social platform.** No shared journals, no public profiles, no community features.
- **Not an editor.** The Observer names patterns. It does not propose alternatives.

## Architecture

A daemon holds the authority. The web UI runs on port 3000; the CLI connects over a Unix socket at `~/.ink-mirror/ink-mirror.sock`. Both talk to the same API over the same data, and the CLI discovers available commands from the daemon at startup.

All data lives in `~/.ink-mirror/`: one markdown file per entry, one JSON file per observation, and `profile.md` as the portable, human-readable style profile. The profile is plain markdown and travels with you wherever custom instructions are accepted.

---

_Active development. The loop works; the profile deepens with every honest curation pass._
