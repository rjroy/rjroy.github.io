---
title: Compass Rose
description: A Claude Code plugin for project management through GitHub Projects
---

# Compass Rose

Compass Rose is a Claude Code plugin that bridges conversational AI development with GitHub's project management. It answers the daily question: "What should I work on next?"

## The Problem

When working with Claude Code across multiple sessions, I kept losing track of what needed doing. Ideas surfaced during implementation, bugs got mentioned in passing, and features piled up without clear priority. I could maintain a backlog in GitHub Projects, but context-switching between the conversation and the web UI broke flow.

I wanted to manage my backlog without leaving the conversation.

## What Compass Rose Does

Five commands handle the core workflow:

### `/next-item`

Quick recommendation for what to work on. Queries items with "Ready" status, sorts by priority (P0 > P1 > P2 > P3), and presents the top options with rationale.

```
| # | Title                      | Priority | Size | Status |
|---|----------------------------|----------|------|--------|
| 1 | Fix login timeout bug      | P0       | S    | Ready  |
| 2 | Add user preferences page  | P1       | M    | Ready  |

Recommendation: Item #1 (P0 priority, small scope, ready for work)
```

Fast. Under 3 seconds. No deep analysis—just "here's what's most urgent."

### `/add-item`

Create a new issue and add it to the project in one flow. Prompts for title, description, priority, and size. Creates the GitHub issue, links it to the project, and sets the custom fields.

No context switch to the browser. Capture the idea while it's fresh.

### `/start-work`

Begin implementation on a specific item. Takes an issue number, URL, or `next` to start the highest-priority ready item.

Here's where Compass Rose connects to [[02_Areas/Vibe-Garden/Spiral-Grove/index|Spiral Grove]]: when you start work on a large item (L or XL), it prompts you to consider writing a spec first:

```
Large Item Detected: XL

This item is sized XL, which typically requires detailed planning.

Options:
  1. Write spec first (/spec-writing) - RECOMMENDED for XL items
  2. Start implementation directly

Which approach would you prefer?
```

Small items flow straight to implementation. Large items get a nudge toward structure.

### `/backlog`

Full backlog review with quality analysis. Spawns an analyzer agent that scores each item on clarity, completeness, and acceptance criteria. Identifies well-defined items ready for work and vague items needing clarification.

Takes longer than `/next-item` (~15 seconds) but provides backlog health insights:

```
Backlog Health Summary

Priority Distribution: 3 P0, 7 P1, 4 P2, 1 P3
Definition Quality:
- Well-Defined (8-10): 4 items
- Vague (2-4): 4 items

Observations:
- P0 items are generally well-defined
- Many P1 features lack explicit acceptance criteria
```

### `/reprioritize`

Codebase-aware priority recommendations. Spawns a scanner agent that compares issues against current code state. Identifies items that are already resolved, more urgent than marked, or now feasible due to recent changes.

```
Recommendations: 7 changes proposed

| Issue | Current | Recommended | Rationale |
|-------|---------|-------------|-----------|
| #123  | P1      | Close       | Implemented in auth/login.ts |
| #456  | P2      | P0          | Auth refactored, OAuth feasible |
```

Batch updates after approval. Keeps the backlog in sync with reality.

## Architecture

Compass Rose is lightweight by design:

- **Configuration**: `.compass-rose/config.json` at repository root points to your GitHub Project
- **Storage**: GitHub Projects is the source of truth—no separate database
- **Agents**: Specialized sub-agents handle analysis (`backlog-analyzer`, `codebase-scanner`)
- **Integration**: Uses `gh` CLI for all GitHub operations

The plugin doesn't try to replace GitHub Projects. It makes the existing system conversationally accessible.

## The Spiral Grove Connection

Compass Rose handles *what* to work on. Spiral Grove handles *how* to build it.

The integration point is item size. Small items (S/M) are straightforward—start coding. Large items (L/XL) benefit from specification, planning, and task breakdown before implementation.

When `/start-work` detects a large item, it offers to hand off to Spiral Grove's `/spec-writing` command. You can decline and implement directly, but the prompt surfaces the choice.

This keeps both tools focused:
- Compass Rose: Backlog management, prioritization, work selection
- Spiral Grove: Structured development methodology

## Why GitHub Projects?

I considered building custom storage, but GitHub Projects already exists, integrates with issues and PRs, and has a decent web UI for occasional manual edits. The `gh` CLI provides programmatic access.

Using existing infrastructure means:
- Work items are visible outside Claude Code sessions
- Team members can interact through familiar GitHub UI
- No migration if I stop using the plugin

The tradeoff is dependence on GitHub's project structure and custom fields, but that's a reasonable constraint for personal projects.

---

*Compass Rose is part of the [[02_Areas/Vibe-Garden/index|Vibe Garden]] toolkit and available through the vibe-garden plugin repository.*
