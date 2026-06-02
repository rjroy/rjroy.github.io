---
title: "Daemon-First, Agent-Native"
date: 2026-04-19
description: Three projects, three domains, same architecture each time. It holds. Here's what I've learned from it.
statuc: active
tags:
  - architecture
  - agents
  - pattern
---

# Daemon-First, Agent-Native

Three projects. Three different domains. Same architecture each time, not by accident but because I started each one with it already in hand. Three rounds in, it feels worth writing down.

## The Pattern

Two ideas, layered on each other.

**Daemon-first**: one server process is the application. Web UI and CLI are thin clients that relay intent and render what comes back. All durable state lives in files the daemon owns. Clients never touch state directly. If a client stops, nothing is lost. If the daemon stops, there is no application.

**Agent-native**: the daemon exposes atomic operations with structured output and full parity between web and CLI. That parity is what makes it agent-native in principle: anything the UI can do, the CLI can do, and any shell-capable agent can drive either. The agent-native concept calls for the system to be purely prompt-driven. I push back on that. The appeal is real, but so is the token cost. Not every application earns that level of activation.

The reference material I've been working from, copied into this folder for easy reading:

- [[Ideas/Daemon-First-Agent-Native/daemon-first-architecture|Daemon-First Architecture]]
- [[Ideas/Daemon-First-Agent-Native/agent-native-layer|Agent-Native Layer]]

## The Three Projects

**[[Projects/Adventure-Engine-of-Corvran/index|Adventure Engine of Corvran]]** is a rebuild. An AI game master plays a collaborative TTRPG with you. State lives in markdown files under `~/.corvran/adventures/`. The GM is an agent in a loop reading the adventure's files, streaming narrative back through a web UI. RPG systems are reference documents the agent reads, not code paths. You could run this from Claude Code directly, but then you lose the thin, colorful UX that makes it feel like something.

**[[Projects/Ink-Mirror/index|Ink Mirror]]** is greenfield. A journal that observes your writing patterns and reflects them back. State lives in `~/.ink-mirror/` with the daemon serving both a web UI and a CLI over a Unix socket. The CLI discovers its commands from the daemon at startup. An Observer prompt reads entries and produces observations; a second prompt runs craft nudges on demand. There are no agentic decisions to be made.

**[[Projects/Shelf-Judge/index|Shelf Judge]]** is greenfield. A board game collection tool that scores games against personal axes you define. State lives in `~/.shelf-judge/data/`. The daemon owns the fitness calculations and BGG data. The web UI renders. There is one small LLM touchpoint: a perspective on the collection as a whole. This is a dataset with a viewpoint. An agent could do more with it. I haven't pushed that yet.

## Why I Start Here

File-based state pays off every time. Not because markdown is a good database (it isn't), but because it's the shared medium between me, the user, and any agent. You can `cat` an adventure. You can diff a style profile. You can back everything up with `cp -r`. Debugging is reading files. When something goes wrong, you open the state and look.

CLI and web parity is agent parity. Every daemon operation gets a CLI command with machine-first output. This isn't about serving terminal-native users, though it does that. It's about making the application controllable by any agent with shell access, without a custom SDK or source-code reading. When an agent can do everything a human can do, features become prompts instead of routes.

Every time, the first instinct is to bundle decision logic into smart endpoints. Each time I've kept the primitives atomic instead, the surface got smaller and easier to reason about. The intent is that an agent, or the user, or a future feature composes those primitives into judgment. I've gotten the decomposition right more often than I've actually wired agents into the composition. That gap is on the list, not a claim.

## Open Questions

The agent-native concept says features are added by adding prompts. My read is that's the wrong default: most systems are better served by concrete processes, and the token cost of prompt-driven features is real. What I haven't worked out is where the line sits. Which decisions genuinely belong to an agent, and which ones am I just reflexively handing off because writing the code is harder? That's the question I'm carrying into the next build.

## Where This Is Going

The pattern is baked into my Guild Compendium now, the skill-based reference library my agents pull from. Whether that was the right call is still open. What I know is that the architecture has survived three real projects without requiring a rethink. That's a better validation than anything I could design in advance. The next step is closing the gap between "primitives exist" and "agents actually use them."

## References

- [[Ideas/Daemon-First-Agent-Native/daemon-first-architecture|Daemon-First Architecture]] (reference doc, in this folder)
- [[Ideas/Daemon-First-Agent-Native/agent-native-layer|Agent-Native Layer]] (reference doc, in this folder)
- Every's [agent-native guide](https://every.to/guides/agent-native) (external source cited in the reference material)
