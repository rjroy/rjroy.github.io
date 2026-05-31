---
title: Vibe Garden
description: A collection of Claude Code plugins for project management and development workflows
date: 2025-12-29
tags:
  - project
  - ai
  - claude-code
  - plugins
  - development-tools
---

# Vibe Garden

Vibe Garden is a collection of Claude Code plugins I built to improve how I work with AI on software projects. Each plugin solves a specific friction point in the development workflow.

**Source:** [github.com/rjroy/vibe-garden](https://github.com/rjroy/vibe-garden)

## The Collection

The repository houses four plugins that work together to support project management, development workflows, and active feedback:

### Compass Rose (v1.3.0)

GitHub Projects integration for Claude Code. Manages the "what should I work on next?" question with skills for task tracking, backlog analysis, and priority recommendations.

**What it does:**
- `/compass-rose:next-item` - Quick recommendation for highest-priority ready item
- `/compass-rose:backlog` - Deep analysis of backlog health and definition quality
- `/compass-rose:add-item` - Create issues with custom fields directly from Claude
- `/compass-rose:start-work` - Begin work with automatic status updates and size-based escalation
- `/compass-rose:reprioritize` - Codebase-aware priority recommendations (scans actual code to identify stale issues)

Compass Rose handles the task management layer. It knows what's ready, what's blocked, what needs better definition.

### Lore Development (v0.12.0)

Project context and workflow management. This is the philosophy plugin: gather context in layers to prevent overfit and ensure problems are well understood before implementation.

**What it does:**
- `/lore-development:research` - Gather external context (docs, prior art, libraries)
- `/lore-development:brainstorm` - Explore ideas and "what if" scenarios
- `/lore-development:specify` - Define requirements and success criteria
- `/lore-development:prep-plan` - Load context and enter plan mode
- `/lore-development:retro` - Capture lessons learned after completing work
- `/lore-development:ddp` - Visualize flows and relationships with Mermaid diagrams

All artifacts live in `.lore/` directories. The workflow is deliberate: understand before acting, verify after completing.

[[Lore-Development|Learn more about Lore Development →]]

### Notify Hook (v1.0.0)

Desktop and mobile notifications when Claude needs attention. Uses ntfy.sh for mobile push notifications.

**What it does:**
- Desktop notifications (Linux/macOS) when Claude asks a question
- Mobile push when long-running tasks complete
- Configurable triggers and notification backends

Simple integration. Solves the "I walked away and didn't see Claude finish" problem.

### Mind Reader (v1.0.0)

Passive feedback system that watches session patterns and provides gentle nudges when you've been working too long, at unusual hours, or when frustration patterns emerge.

**What it does:**
- Temporal detection (session duration, prompt count)
- Unusual hours awareness (working at 2am on a Saturday)
- Optional sentiment analysis via VADER
- Time-bucketed baselines with two-stage detection

Mind Reader doesn't interrupt; it observes and suggests breaks when patterns indicate you should step back.

[[Mind-Reader|Learn more about Mind Reader →]]

## How They Work Together

A typical workflow:

1. **Compass Rose** identifies the next high-priority task
2. **Lore Development** gathers context if the task is complex (research → spec → plan)
3. Claude Code handles implementation natively
4. **Notify Hook** alerts when long-running tests or builds complete
5. **Mind Reader** suggests breaks if the session runs long
6. **Lore Development** captures lessons in a retrospective after shipping

The plugins don't enforce a workflow; they provide affordances. Use what fits.

## Repository Structure

The repository uses CalVer (YYYY.MM) for releases, cut quarterly or when significant changes land. Individual plugins maintain independent semantic versioning.

```
vibe-garden/
├── compass-rose/              # GitHub Projects management
├── lore-development/          # Project context and workflows
├── notify-hook/               # Desktop/mobile notifications
└── mind-reader/               # Active feedback
```

Each plugin can be installed independently via Claude Code:

```bash
/plugin install compass-rose@vibe-garden
/plugin install lore-development@vibe-garden
/plugin install notify-hook@vibe-garden
/plugin install mind-reader@vibe-garden
```

## Why "Vibe Garden"?

The name came from thinking about what these tools do: they tend to the environment where development happens. Not the code itself, but the conditions around it. Task management, context gathering, notification systems, feedback loops. The garden metaphor fit: cultivating conditions where good work can grow.

Also, I like whimsy. Tools should feel good to use.
