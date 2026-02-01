---
title: Lore Development
description: A methodology plugin for building and organizing project context in layers
tags:
  - project
  - claude-code
  - methodology
  - context-management
---

# Lore Development

Lore Development is a Claude Code plugin for building and organizing project context. It's not about enforcing process; it's about creating findable, structured knowledge that informs better work.

**Source:** [github.com/rjroy/vibe-garden](https://github.com/rjroy/vibe-garden) (lore-development/)

## The Problem

AI-assisted development is powerful but chaotic without structure. Context gets lost between sessions. Decisions aren't documented. Lessons learned evaporate when the next feature starts.

Lore Development solves this by creating a persistent knowledge base for your project: the "lore" that makes future work better informed.

## What It Does

### Research (`/lore-development:research`)

Gather external context before building. Documentation, prior art, library exploration. The skill prompts for what you're researching and where to save findings.

**Output:** `.lore/research/<topic>.md`

### Brainstorm (`/lore-development:brainstorm`)

Explore ideas without commitment. "What if we used X?" thinking. Record possibilities before deciding on one.

**Output:** `.lore/brainstorm/<idea>.md`

### Specify (`/lore-development:specify`)

Define requirements and success criteria. What are you building? What does "done" look like? What constraints exist?

Before you start, the `lore-researcher` agent automatically searches `.lore/` for related work (past specs, retros, brainstorms) and includes findings in the new spec.

**Output:** `.lore/specs/<feature>.md`

### Prep-Plan (`/lore-development:prep-plan`)

Load project context, then enter Claude Code's native plan mode. When planning completes, the plan is saved to `.lore/plans/`.

The `lore-researcher` agent runs first, surfacing related context before planning begins.

**Output:** `.lore/plans/<feature>.md`

### Retro (`/lore-development:retro`)

Review completed work and capture lessons learned. What went well? What surprised you? What would you do differently?

Lessons can be "graduated" to higher scopes (feature → project → career) when they apply broadly.

**Output:** `.lore/retros/<feature>.md`

### Excavate (`/lore-development:excavate`)

Design archaeology for existing codebases. When you inherit or join a project, excavate discovers the lore that should have been documented.

Progressive discovery workflow:
1. Survey entry points (routes, CLI commands, main files)
2. Map features and capabilities
3. Document architecture and design decisions
4. Extract into `.lore/specs/` and `.lore/reference/`

**Output:** `.lore/excavations/<session>.md`, `.lore/reference/<feature>.md`

### Draw the Damn Picture (`/lore-development:ddp`)

Visualize flows and relationships when text fails to communicate. Generates Mermaid diagrams for architecture, data flow, control flow, relationships.

**Output:** `.lore/diagrams/<topic>.md`

### Tend (`/lore-development:tend`)

Periodic hygiene for `.lore/` directories. Updates frontmatter status fields, retrofits old documents, ensures searchability.

## The Philosophy

### Gather Context in Layers

Prevent overfit by building understanding in stages:
1. **Research** - What exists? What have others done?
2. **Brainstorm** - What could we do?
3. **Specify** - What will we do?
4. **Plan** - How will we do it?
5. **Implement** - (Claude Code native capabilities)
6. **Retro** - What did we learn?

Each layer adds context without committing to implementation. The goal is understanding before action.

### Two Modes of Operation

**Forward Mode (Building New):**
`research → brainstorm → specify → prep-plan → implement → retro`

You know what you want to build. This creates lore as you work.

**Backward Mode (Excavating Existing):**
`excavate → document → extract`

You inherit a codebase. This discovers the lore that should have been documented.

The output is the same (specs, architecture docs), but the process is inverted.

### Compound Knowledge

Knowledge compounds when past learnings inform new work. Lore Development closes this loop automatically:

```
/specify or /prep-plan
        │
        ├─► lore-researcher agent searches .lore/
        │   for related work
        ▼
   findings included in new spec/plan
        │
        ... work happens ...
        │
        ▼
      /retro
        │
        └─► captures lessons → .lore/retros/
```

When you start new work, relevant retros and specs surface automatically. Lessons learned don't get lost.

### Fresh Eyes Review

Long sessions create blind spots. Lore Development uses specialized review agents that operate with fresh context:

- **spec-reviewer**: Reviews specs for clarity, completeness, gaps
- **fresh-lore**: Provides Socratic questioning from outside your accumulated context

These agents catch what you missed when too deep in implementation.

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

### Why Not Enforce Process?

Modern LLMs have strong native planning and implementation capabilities. Rigid process gets in the way. Lore Development creates affordances (skills for context gathering) without dictating workflow.

### Why Separate Documents?

Each artifact (research, spec, plan, retro) lives in its own file. This makes them:
- Searchable by filename and frontmatter
- Linkable from other documents
- Version-controllable with meaningful diffs
- Browsable without special tools

### Why Frontmatter Schema?

The `lore-researcher` agent searches by frontmatter (title, status, tags, modules). Documents without frontmatter are invisible. The schema is lightweight (5 fields) but enables powerful search.

### Why Automatic Context Loading?

You shouldn't have to remember "did I write something about this?" The `lore-researcher` agent runs automatically at the start of `/specify` and `/prep-plan`, surfacing relevant context without manual search.

## Installation

```bash
/plugin install lore-development@vibe-garden
```

## Why I Built This

I kept solving the same problems repeatedly because I forgot lessons learned three months ago. Specs existed but weren't findable when starting new features. Context lived in my head, not in the repository.

Lore Development externalizes that knowledge. It makes past work visible to future work. The plugin doesn't enforce discipline; it creates affordances that make context-gathering the path of least resistance.
