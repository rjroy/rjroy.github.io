---
title: "Daemon-First, Agent-Native"
description: I've found a project setup that is working for me. It feels proven after three uses. I want to share what I found.
tags:
  - architecture
  - ai
  - agents
  - pattern
---

# Daemon-First, Agent-Native

Three projects. Three different domains. Same architecture each time, not by accident but because I started each one with it already in hand. Three rounds in, it feels worth writing down.

## The Pattern

Two ideas, layered on each other.

**Daemon-first**: one server process is the application. Web UI and CLI are thin clients that relay intent and render what comes back. All durable state lives in files the daemon owns. Clients never touch state directly. If a client stops, nothing is lost. If the daemon stops, there is no application.

**Agent-native**: the daemon exposes atomic operations with structured output and full parity between web and CLI. That parity is what makes it agent-native in principle: anything the UI can do, the CLI can do, and any shell-capable agent can drive either. The agent native architecture concept calls for the system to be purely prompt driven. I rebel against this. Not that I don't see the advantage, but I'm not sure about the cost efficency. Not every application needs this fully activate.

The reference material I've been working from, copied into this folder for easy reading:

- [[Ideas/Daemon-First-Agent-Native/daemon-first-architecture|Daemon-First Architecture]]
- [[Ideas/Daemon-First-Agent-Native/agent-native-layer|Agent-Native Layer]]

## The Three Projects

**[[Projects/Adventure-Engine-of-Corvran/index|Adventure Engine of Corvran]]** is a rebuild. An AI game master plays a collaborative TTRPG with you. State lives in markdown files under `~/.corvran/adventures/`. The GM is an agent in a loop reading the adventure's files, streaming narrative back through a web UI. RPG systems are reference documents the agent reads, not code paths. You could run this just from Claude Code, but then you wouldn't have the thin, but present, colorful UX. 

**[[Projects/Ink-Mirror/index|Ink Mirror]]** is greenfield. A journal that observes your writing patterns and reflects them back. State lives in `~/.ink-mirror/` with the daemon serving both a web UI and a CLI over a Unix socket. The CLI discovers its commands from the daemon at startup. An Observer prompt reads entries and produces observations; a second prompt runs craft nudges on demand. There are no agentic decisions to be made.

**[[Projects/Shelf-Judge/index|Shelf Judge]]** is greenfield. A board game collection tool that scores games against personal axes you define. State lives in `~/.shelf-judge/data/`. The daemon is the authority on fitness calculations and BGG data. The web UI renders. There is one small point for an LLM to give a perspective on the collection. This is a dataset with a distinct view. Could an agent make this more interesting? Purhaps.

## Why I Start Here

File-based state pays off every time. Not because markdown is a good database (it isn't), but because it's the shared medium between me, the user, and any agent. You can `cat` an adventure. You can diff a style profile. You can back everything up with `cp -r`. Debugging is reading files. When something goes wrong, you open the state and look.

CLI and web parity is agent parity. Every daemon operation gets a CLI command with machine-first output. This isn't about serving terminal-native users, though it does that. It's about making the application controllable by any agent with shell access, without a custom SDK or source-code reading. When an agent can do everything a human can do, features become prompts instead of routes.

Every time, the first instinct is to bundle decision logic into smart endpoints. Each time I've kept the primitives atomic instead, the surface got smaller and easier to reason about. The intent is that an agent, or the user, or a future feature composes those primitives into judgment. I've gotten the decomposition right more often than I've actually wired agents into the composition. That gap is on the list, not a claim.

## Open Questions

Writing this down mostly to see what I don't yet understand.

When does this pattern break? When does file-based state actually fail? The reference material says transactions, concurrent writes from multiple processes, and non-hierarchical queries are the pressure points. I haven't hit any of those. What does the first real break look like?

How thin should the web UI get? All three projects have web UIs doing real rendering work. None hold state, but they're not trivial. Is there a version where the web UI is just a chat interface over the agent layer, and rendering happens in whatever the agent returns? Adventure Engine is closest to that; Shelf Judge is furthest. I don't know which end of that spectrum I prefer.

What's the right shape for shared infrastructure? Three daemons, three sockets, three data directories, three sets of TypeScript scaffolding. Some of that is clearly reusable. I haven't extracted it because I don't trust I've seen enough variation. Does this generalize outside personal tools? All three are single-user local-first. I suspect the agent-native layer survives a networked context, but the file-based state probably doesn't without rework.

## Where This Is Going

Not ready to call this a framework or build a starter template. Three data points is a pattern, not a library.

1. Let a fourth project test the shape before extracting anything.
2. Write down the specific places I diverged across the three, and why. The differences are more interesting than the similarities.
3. Watch for the first real break, the moment file-based state or agent-native composition actually fails, and see what replaces it.

This has worked three times, by design. It's my default now. I'm going to keep using it until something breaks.

## References

- [[Ideas/Daemon-First-Agent-Native/daemon-first-architecture|Daemon-First Architecture]] (reference doc, in this folder)
- [[Ideas/Daemon-First-Agent-Native/agent-native-layer|Agent-Native Layer]] (reference doc, in this folder)
- Every's [agent-native guide](https://every.to/guides/agent-native) (external source cited in the reference material)
