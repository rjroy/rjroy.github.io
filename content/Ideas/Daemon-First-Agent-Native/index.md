---
title: "Daemon-First, Agent-Native"
description: A design pattern I've now reached for three times in a row. This is me noticing that.
tags:
  - architecture
  - ai
  - agents
  - pattern
---

# Daemon-First, Agent-Native

I've built three applications since the start of April, each in a different domain: a collaborative storytelling engine, a board game collection curator, and an observational writing journal. One of them was a rebuild of an earlier project; the other two were greenfield. All three converged on the same architecture.

This entry is me noticing that pattern and trying to name what's underneath it.

## The Pattern

Two layered ideas:

**Daemon-first.** One server process is the application. Web UI, CLI, and any agent interface are thin clients that relay user intent and render what comes back. All durable state lives in files the daemon owns. Clients never touch state directly. If a client stops, nothing is lost; if the daemon stops, there is no application.

**Agent-native.** The daemon exposes atomic operations with structured output and full parity between every surface (web, CLI, agent). Features aren't routes with bundled decision logic; they're prompts that compose primitives. The agent provides the judgment. The daemon provides the verbs.

The reference material I've been working from, copied into this folder for easy reading:

- [[Ideas/Daemon-First-Agent-Native/daemon-first-architecture|Daemon-First Architecture]]
- [[Ideas/Daemon-First-Agent-Native/agent-native-layer|Agent-Native Layer]]

## The Three Projects

Each of these landed on the same shape, for reasons particular to its domain.

**[[Projects/Adventure-Engine-of-Corvran/index|Adventure Engine of Corvran]]** — a rebuild. An AI game master plays a collaborative TTRPG with you. State lives in markdown files under `~/.corvran/adventures/`. The GM is an agent in a loop reading the adventure's files, streaming narrative back through a web UI. RPG systems are reference documents the agent reads, not code paths.

**[[Projects/Shelf-Judge/index|Shelf Judge]]** — greenfield. A board game collection tool that scores games against personal axes you define. State lives in `~/.shelf-judge/data/`. The daemon is the authority on fitness calculations and BGG data. The web UI renders; an agent could (and does) compose the same primitives to answer questions the UI doesn't directly expose.

**[[Projects/Ink-Mirror/index|Ink Mirror]]** — greenfield. A journal that observes your writing patterns and reflects them back. State lives in `~/.ink-mirror/` with the daemon serving both a web UI and a CLI over a Unix socket. The CLI discovers its commands from the daemon at startup. An Observer agent reads entries and produces observations; a second agent runs craft nudges on demand.

## Why It Keeps Winning

A few things I'm noticing after doing it three times:

**File-based state pays off every single time.** Not because markdown is a good database (it isn't), but because it's the shared medium between the developer, the user, and the agent. You can `cat` an adventure. You can diff a style profile. You can back the whole thing up with `cp -r`. Debugging is reading files. When something goes wrong, you open the state and look.

**Parity between CLI and web is agent parity.** Every daemon operation gets a CLI command with machine-first output. This isn't about serving terminal-native users (though it does). It's about making the application controllable by any agent with shell access, without a custom SDK or source-code reading. When an agent can do everything a human can do, features become prompts instead of routes.

**Judgment belongs in prompts, not code.** The first instinct is to bundle decision logic into "smart" endpoints. Every time I've resisted that and kept the primitives atomic, the surface area got smaller and more usable. The agent decides when to compact, which observations to surface, how to weight a fitness component. The daemon just provides the verbs.

**The architecture is the same; the content is the product.** Adventure Engine's content is RPG system references. Shelf Judge's content is fitness axes and the BGG cache. Ink Mirror's content is observations and craft principles. Swap the content layer and you get a different product. That's starting to feel less like a coincidence and more like the point.

## Open Questions

Writing this down mostly to see what I don't yet understand.

**When does this pattern stop working?** The reference material says file-based state breaks down when you need transactions, concurrent writes from multiple processes, or non-hierarchical queries. I haven't hit any of those yet. I want to know what the first real break looks like.

**How thin should the web UI get?** All three projects have web UIs that do real rendering work (markdown display, streaming, interactive widgets). None of them hold state, but they're not trivial. Is there a version of this where the web UI is just a chat interface over the agent layer, and the rendering happens in whatever the agent returns? Adventure Engine is closest to that; Shelf Judge is furthest. I don't yet know which end of that spectrum I prefer.

**What's the right shape for shared infrastructure?** Three daemons on my laptop, three sockets, three data directories, three sets of TypeScript scaffolding. Some of that scaffolding is clearly reusable. I haven't extracted it yet because I don't trust that I've seen enough variation. A fourth project might clarify what actually belongs in a shared base.

**Does the pattern generalize outside personal tools?** All three of these are single-user local-first. The daemon-first doc mentions TCP for networked access. I haven't tested that. I suspect the agent-native layer survives the transition, but the file-based state probably doesn't without rework.

## Where This Is Going

I'm not ready to call this a "framework" or sit down and build a starter template. Three data points is a pattern, not a library. What I do want to do:

1. Let a fourth project test the shape before extracting anything.
2. Write down the specific places I diverged across the three, and why. The differences are more interesting than the similarities at this point.
3. Watch for the first real break, the moment file-based state or agent-native composition actually fails, and see what replaces it.

The shorter version: this has worked three times. I'm going to stop treating that as coincidence and start treating it as a default.

## References

- [[Ideas/Daemon-First-Agent-Native/daemon-first-architecture|Daemon-First Architecture]] (reference doc, in this folder)
- [[Ideas/Daemon-First-Agent-Native/agent-native-layer|Agent-Native Layer]] (reference doc, in this folder)
- Every's [agent-native guide](https://every.to/guides/agent-native) (external source cited in the reference material)
