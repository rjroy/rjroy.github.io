---
title: Lore Development
description: A Claude Code plugin for context-driven development through progressive discovery
tags:
  - project
  - claude-code
  - methodology
  - context-management
---

# Lore Development

Lore Development is a Claude Code plugin that helps you build understanding before jumping to implementation. It creates a persistent knowledge base - the "lore" - that compounds across features and prevents repeating past mistakes.

**Source:** [github.com/rjroy/vibe-garden](https://github.com/rjroy/vibe-garden) (lore-development/)

## What It Does

Lore Development builds context in layers before implementation. Research external solutions, brainstorm approaches, specify requirements. When you start building, the AI loads relevant past work automatically. After shipping, capture lessons. Next feature, the cycle repeats with accumulated knowledge.

**Three phases:** Context → Execute → Verify / Learn

Context prevents jumping to the first idea. Past work informs new work. Knowledge compounds instead of evaporating.

## The Skills

Lore Development provides composable skills, not a rigid workflow. Use what fits. Skip what doesn't.

### Research (`/lore-development:research`)

What exists? What have others built? What libraries, patterns, or prior art apply? External context prevents reinventing poorly.

**Output:** `.lore/research/<topic>.md`

### Brainstorm (`/lore-development:brainstorm`)

What could we do? Why are we solving this? What wild options exist? What trade-offs matter? Exploration without commitment.

**Output:** `.lore/brainstorm/<idea>.md`

### Specify (`/lore-development:specify`)

What will we do? Synthesis step. Take disparate ideas from research and brainstorming and turn them into something concrete. Requirements, success criteria, constraints.

The `lore-researcher` agent automatically searches `.lore/` for related work before you start writing.

**Output:** `.lore/specs/<feature>.md`

### Prep-Plan (`/lore-development:prep-plan`)

Load project lore (related specs, retros, brainstorms via `lore-researcher`), then hand off to Claude Code's native plan mode. Why reinvent something that works and will only get better?

When planning completes, the plan is saved to `.lore/plans/`.

**Output:** `.lore/plans/<feature>.md`

### Retro (`/lore-development:retro`)

What did you learn? What surprised you? What would you do differently? Captures lessons while they're fresh. The spec told you what you thought you were building. The retro tells you what actually happened.

Lessons can be "graduated" to higher scopes (feature → project → career) when they apply broadly. This is how knowledge compounds.

**Output:** `.lore/retros/<feature>.md`

### Excavate (`/lore-development:excavate`)

Design archaeology for existing codebases. When you inherit a project, the lore is implicit. Excavate inverts the workflow: start with code and work backward.

Progressive discovery: Survey entry points → Map features → Document architecture → Extract into specs and reference docs.

**Output:** `.lore/excavations/<session>.md`, `.lore/reference/<feature>.md`

### Draw the Damn Picture (`/lore-development:ddp`)

When text fails to communicate, visualize. Generates Mermaid diagrams for flows, relationships, and architecture.

**Output:** `.lore/diagrams/<topic>.md`

### Tend (`/lore-development:tend`)

Periodic hygiene for `.lore/`. Updates frontmatter status fields, ensures searchability, identifies what's stale vs active vs abandoned.

**Output:** In-place updates to existing `.lore/` files

## How It Works

### The Lore-Researcher Agent

When you run `/specify` or `/prep-plan`, the `lore-researcher` agent automatically searches `.lore/` for related work. Past specs, retros, brainstorms. It surfaces findings before you start, so the AI has context from previous features.

This closes the knowledge loop:
```
New work starts
    → lore-researcher finds related context
    → context informs spec/plan
    → work completes
    → retro captures lessons
    → lessons available for next cycle
```

### Two Modes

**Forward (Building New):** Research → Brainstorm → Specify → Plan → Implement → Retro

**Backward (Excavating Existing):** Code → Survey → Features → Design → Specs

Same outputs (`.lore/specs/`, design docs), different starting points.

## Artifact Storage

All context lives in `.lore/`:

```
.lore/
├── research/       # External findings
├── brainstorm/     # Recorded explorations
├── specs/          # Requirements
├── plans/          # Saved planning sessions
├── retros/         # Lessons learned
├── reference/      # Excavated feature documentation
├── excavations/    # Design archaeology sessions
├── diagrams/       # Visual representations (Mermaid)
└── lore-agents.md  # Agent registry (optional)
```

Everything is markdown with YAML frontmatter for searchability. Version-controlled alongside code.

## Example Workflow

Building a new authentication system:

```bash
# 1. Research OAuth libraries
/lore-development:research
# → Creates .lore/research/oauth-libraries.md

# 2. Brainstorm approaches
/lore-development:brainstorm
# → Creates .lore/brainstorm/auth-approaches.md

# 3. Define requirements
/lore-development:specify
# → lore-researcher surfaces related specs/retros
# → Creates .lore/specs/authentication.md

# 4. Plan implementation
/lore-development:prep-plan
# → lore-researcher surfaces related context
# → Enters plan mode with loaded context
# → Saves plan to .lore/plans/authentication.md

# 5. Implement (Claude Code native)
# ... build the feature ...

# 6. Capture lessons
/lore-development:retro
# → Creates .lore/retros/authentication.md
```

Next time you build something auth-related, `lore-researcher` will surface these artifacts automatically.

## Design Decisions

**Composable skills, not rigid workflow.** Use what fits. Skip what doesn't. Bug fix? Jump straight to code. Complex system? Research → brainstorm → specify → plan → retro.

**Separate documents.** Each artifact lives in its own file for searchability, linkability, version control, and browsing without special tools.

**Automatic context loading.** The `lore-researcher` agent runs at the start of `/specify` and `/prep-plan`. You don't have to remember what you wrote before.

## Installation

```bash
/plugin install lore-development@vibe-garden
```

## Related

For deeper philosophy and motivation, see [[Writing/Lore-Development/index|Lore Development: Context Over Documentation]].
