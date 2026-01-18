---
title: Vibe Garden
description: A personal development toolkit ecosystem for AI-assisted software development with Claude Code
tags:
  - area
  - ai
  - claude-code
  - plugin
  - methodology
---

# Vibe Garden

Vibe Garden is my collection of Claude Code plugins that form an integrated development workflow. These tools grew out of practical needs while building projects like the [[02_Areas/Adventure-Engine-of-Corvran/index|Adventure Engine of Corvran]]. I kept solving the same problems repeatedly, so I extracted the patterns into reusable tooling.

## The Problem Space

AI-assisted development with tools like Claude Code is powerful but chaotic. Without structure, conversations drift, context gets lost between sessions, and complex features sprawl across ad-hoc prompts. I wanted:

1. **Structured feature development**: A methodology for taking ideas from vague requirements to working code
2. **Persistent work tracking**: A backlog that survives between sessions and integrates with existing tools
3. **Clear handoffs**: Knowing when to plan versus when to just code

## The Tools

### [[02_Areas/Vibe-Garden/Spiral-Grove/index|Spiral Grove]]

A Spec-Driven Development (SDD) methodology implemented as a Claude Code plugin. Spiral Grove provides a four-phase workflow:

**Specification** → **Planning** → **Task Breakdown** → **Implementation**

Each phase has dedicated commands, templates, and validator agents that ensure quality gates before progression. The methodology treats Claude as a capable but literal-minded pair programmer. Explicit specifications prevent implementation drift, and structured phases maintain coherence across sessions.

Key capabilities:
- Mandatory validation between phases
- Parent/child spec hierarchies for complex projects
- Documentation synthesis from implemented code
- Spec synthesis to reverse-engineer requirements from existing codebases

### [[02_Areas/Vibe-Garden/Compass-Rose/index|Compass Rose]]

Project management through GitHub Projects, providing a place for the work items that feed into structured development:

- **Tasks and bugs**: Small, actionable items ("the input box is too big")
- **Feature ideas**: Larger questions that may need full specs ("add OAuth support")

Compass Rose handles the backlog; Spiral Grove handles the implementation. When you start work on a large item, Compass Rose prompts you to escalate to Spiral Grove's spec-writing workflow.

Key capabilities:
- Priority-based work recommendations
- Codebase-aware reprioritization
- Size-based escalation to structured development
- Backlog health analysis

## How They Work Together

The typical flow:

```
Compass Rose                          Spiral Grove
─────────────────────────────────────────────────────────────
/next-item
  → Recommends highest priority
    ready item

/start-work 123
  → Small item? Start directly
  → Large item? Prompt for spec →    /spec-writing
                                       → Define requirements
                                     /plan-generation
                                       → Design architecture
                                     /task-breakdown
                                       → Create task list
                                     /implementation
                                       → Build with tracking
```

Small fixes flow straight to implementation. Complex features get the full treatment. The tools don't enforce a rigid process. They provide structure when you need it and get out of the way when you don't.

## Design Philosophy

**AI as pair programmer, not magic wand.** These tools assume Claude is highly capable but benefits from explicit context. Specifications aren't bureaucracy; they're communication to a literal-minded partner.

**Fresh context per task.** Both tools use agent delegation patterns where specialized sub-agents handle discrete work. This prevents context bloat during long sessions and provides "fresh eyes" for validation.

**Integrate with existing tools.** Compass Rose uses GitHub Projects, not a custom database. Spiral Grove stores artifacts as markdown in `.sdd/` directories. Everything is inspectable and version-controlled.

**Structure when needed, not always.** Bug fixes don't need specs. The tools detect scope and suggest appropriate process depth.

## Why "Vibe Garden"?

The name is a nod to "vibe coding," the improvisational style of AI-assisted development where you explore ideas through conversation. A garden takes that energy and gives it structure: paths to follow, room to discover what grows, but not paved over.
