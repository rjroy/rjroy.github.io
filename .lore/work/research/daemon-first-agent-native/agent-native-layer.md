---
title: Agent-Native Layer
domain: architecture
last_updated: 2026-04-16
source: "discussion (agent-native principles, every.to/guides/agent-native, 2026-04-16)"
---

# Agent-Native Layer

This document describes the architecture layer where an LLM agent connects to a daemon-first system. It assumes the daemon already exists with atomic operations, file-based state, and a CLI with progressive discovery (see `daemon-first-architecture.md`). The agent SDK used is always the Claude Agent SDK (see `claude-agent-sdk.md` for capabilities and API).

The daemon provides primitives. The agent provides judgment. Features live in the space between.

## The Connection Point

A daemon-first system exposes atomic operations through its API and CLI. An agent-native layer puts an LLM in a loop over those operations, pursuing outcomes rather than executing predetermined workflows.

The daemon does not know an agent is calling it. It serves the same atomic responses whether the caller is a human at a terminal, a web UI, or an agent in a loop. The agent does not need to know how the daemon is built. It discovers available operations through CLI help, calls them, reads structured output, and decides what to do next.

This separation is the architecture. The daemon is deliberately judgment-free. The agent is deliberately stateless between sessions (except through files the daemon manages). Neither encroaches on the other's concern.

### What the Daemon Provides

- Atomic operations with structured (JSON) output
- Progressive discovery via nested CLI help
- File-based state that agents can read and reason about
- No bundled decision logic — no "smart" endpoints that make choices for the caller

### What the Agent Provides

- Judgment about which operations to call, in what order, and when to stop
- The ability to handle unexpected situations without new code
- Natural language interface for users who describe outcomes, not procedures
- A loop that continues until the outcome is achieved or a clear failure is reached

## Composability

In a daemon-first system without an agent layer, features are routes. A "weekly summary" feature is a `/weekly-summary` endpoint with logic that queries state, applies rules, and returns a result. The decisions live in code.

In an agent-native system, features are prompts. A "weekly summary" is a prompt that tells the agent to review recent activity, identify patterns, and produce a summary. The agent loops over `list`, `read`, and `create` primitives. The decisions live in the prompt and the agent's judgment.

This means new features don't require new code. They require new prompts that compose existing primitives. The daemon stays stable while the feature surface grows.

### When Composability Works

- The daemon's operations are genuinely atomic (one action per endpoint, no bundled workflows)
- Output is structured enough for the agent to parse and reason about
- The agent has parity — every operation available to a human is available to the agent

### When It Breaks Down

- Operations bundle decision logic ("analyze and categorize" instead of separate analyze and categorize primitives)
- Output is formatted for humans (prose, tables) instead of machines (JSON)
- The agent can't discover operations because help output is incomplete or unstructured

## Emergent Capability

When the daemon exposes atomic primitives with full parity, agents can accomplish things you didn't design for. A user asks the agent for something you never anticipated. The agent composes primitives to deliver it — or fails, revealing which primitive is missing.

This changes how you discover what to build. Instead of imagining features and implementing them, you observe what agents attempt and where they fail. Failures are signal: they reveal gaps in your primitive surface, not missing features.

### The Feedback Loop

1. Build atomic primitives with full parity
2. Users ask agents for outcomes you didn't anticipate
3. Agents compose primitives to achieve them (or fail)
4. Observe the patterns — what succeeds, what fails, what's asked for repeatedly
5. Add primitives (not features) to fill gaps
6. Repeat

You are not building features. You are cultivating a surface that agents compose into features. The richer the primitive surface, the more the agent can do without code changes.

### Graduating to Code

Some agent-composed workflows will prove so common and performance-sensitive that they should become daemon operations. This is optimization, not a design change. The agent should still be able to trigger the optimized operation directly — and fall back to composing primitives for edge cases the optimized path doesn't cover. Parity still holds.

## Improvement Over Time

Agent-native systems improve without shipping code, through three mechanisms.

### Accumulated Context

The daemon's file-based state is also the agent's memory. Files the agent reads at session start tell it what exists, what happened recently, and what the user cares about. As state accumulates through use, the agent's context gets richer and its responses get better.

A context file (a summary of current state, recent activity, and user preferences) read at session start is the simplest version. The daemon doesn't need to know this file has special meaning — it's just another file in the state directory that the agent's prompt tells it to read.

### Prompt Refinement

Features are prompts. Improving a feature means editing a prompt, not refactoring code.

**Developer-level refinement** ships updated prompts for all users. A better "weekly summary" prompt improves the feature for everyone without a code deploy.

**User-level customization** lets users modify prompts for their workflow. The same mechanism that lets developers define features lets users adjust them. This is possible because prompts are text files in the daemon's state directory — inspectable, editable, and version-controllable.

### Session Continuity

The Claude Agent SDK supports session persistence and resumption. An agent that runs out of context or gets interrupted can resume from a checkpoint. Combined with file-based state, this means long-running outcomes can span multiple sessions without the agent losing track of progress.

## Anti-Patterns

### Agent Executes Your Workflow

You wrote a multi-step procedure in a daemon endpoint. The agent calls it. The decisions live in your code, not in agent judgment. The agent is reduced to a function caller.

**Fix:** Break the endpoint into atomic primitives. Describe the desired outcome in a prompt. Let the agent decide the steps.

### Defensive Tool Design

You over-constrain tool inputs with strict enums and validation at every layer because you're used to defensive programming. This prevents the agent from doing things you didn't anticipate.

**Fix:** Validate what's necessary for data integrity. Leave judgment to the agent. The agent handling edge cases with reasoning is the point.

### Context Starvation

The agent doesn't know what exists. A user says "organize my notes" and the agent has no way to discover there are notes, where they live, or what structure they have.

**Fix:** Inject available resources into the agent's context at session start. The daemon's file-based state makes this natural — point the agent at the state directory and let it explore.

### Feature as Route

Every new capability becomes a new daemon endpoint with decision logic. The agent surface grows only when you ship code.

**Fix:** Check whether existing primitives could compose to achieve the outcome. Add a prompt, not a route. Only add a primitive when the agent genuinely can't achieve the outcome with what exists.
