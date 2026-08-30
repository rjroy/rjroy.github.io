---
title: Guild Hall
description: A multi-agent workspace where a human delegates work to AI specialists and reviews what they produce
date: 2026-03-22
status: archived
cover: /Projects/Guild-Hall/screenshots/gh-home.webp
tags:
  - project
  - multi-agent
  - tools
---

# Guild Hall

Guild Hall is a multi-agent workspace I built for delegating work to AI specialists and reviewing what they produce. The organizing metaphor is a craftspersons' guild: workers have identities, souls, and specializations that persist across tasks. Work happens through two modes -- synchronous meetings and asynchronous commissions -- and the durable output is always artifacts, never conversations.

**Source:** [github.com/rjroy/guild-hall](https://github.com/rjroy/guild-hall)

![Guild Hall Dashboard](/Projects/Guild-Hall/screenshots/gh-home.webp)

## The Problem

I manage multiple projects and think best by delegating work to something that will actually do it and give me something to react to. General-purpose AI assistants are good at conversation. They are less good at structured delegation -- work where the output is a file, the context persists, and the worker has a defined scope.

I wanted a system where I could say "commission a spec for this feature" and come back to a markdown artifact I could approve, reject, or revise. Where I could hold a meeting with a researcher whose posture is different from a developer's. Where AI work happened in its own git branch and never touched my codebase until I decided it should.

The specific pain points:

- No persistent worker identity across sessions. Every conversation starts from scratch.
- Chat logs are not artifacts. Insights evaporate when the session closes.
- AI work and human work share the same branch, creating noise and risk.
- There's no structured delegation -- tasks exist, but commissions with deliverables do not.

## From Blackboard to Guild

Guild Hall began with an exploration of a blackboard architecture: a shared workspace where specialized agents could contribute to and react to evolving work. That investigation informed the project, but the shipped system took a more human-centered shape. It became a delegation workspace where persistent workers receive commissions and produce artifacts for a person to review and direct.

## What Guild Hall Does

The interface is organized around projects, workers, meetings, and commissions.

### Dashboard and Projects

The dashboard shows all registered projects with AI-generated status briefings. Each project gets a briefing synthesized from its active commissions, recent artifacts, and git activity. Briefings are cached by commit hash and refreshed in the background when work completes.

![Project View](/Projects/Guild-Hall/screenshots/gh-project.webp)

### Meetings (Synchronous Work)

A meeting is a real-time conversation with a specialist worker. Each worker has a defined identity: a name, a portrait, a soul (character and voice), and a posture (how they approach problems). You hold an audience with the Scribe to work through a draft. You meet with the Developer to debug an approach. Workers use Claude Agent SDK sessions with full tool access, memory, and domain plugins.

![Meetings List](/Projects/Guild-Hall/screenshots/gh-meetings.webp)

![Active Meeting](/Projects/Guild-Hall/screenshots/gh-meeting-active-top.webp)

### Commissions (Asynchronous Work)

A commission is a structured work order dispatched to a worker. You write a brief, pick a worker, and walk away. The worker runs in a daemon-managed session, writes artifacts to `.lore/`, and submits a result. You review the output and approve or request changes.

Commissions that hit their turn limit without completing enter a `halted` state -- the session is preserved, and you can continue or save partial work rather than losing it.

![Commissions List](/Projects/Guild-Hall/screenshots/gh-commissions.webp)

![Commission Detail](/Projects/Guild-Hall/screenshots/gh-commission-detail.webp)

### Artifacts

Every piece of work produces an artifact -- a markdown file with frontmatter that links back to the commission or meeting that created it. Artifacts are browsable, filterable, and renderable in the UI. You can request a meeting directly from an artifact's sidebar to dig into something a worker produced.

![Artifacts Browser](/Projects/Guild-Hall/screenshots/gh-artifacts.webp)

![Artifact Detail](/Projects/Guild-Hall/screenshots/gh-artifact-detail.webp)

## Architecture

Guild Hall is a monorepo with four systems:

```
┌─────────────────────────────────────────────────────────┐
│                    Web (Next.js)                         │
│   Dashboard · Projects · Meetings · Commissions          │
└────────────────────────┬────────────────────────────────┘
                         │  REST + SSE over Unix socket
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    Daemon (Hono)                         │
│   Session management · EventBus · Git operations         │
└──────────┬──────────────────────────┬───────────────────┘
           │                          │
           │ Claude Agent SDK         │ File system
           ▼                          ▼
┌─────────────────┐       ┌──────────────────────────────┐
│  Worker Sessions│       │   .lore/ (plain markdown)    │
│  Meetings       │       │   ~/.guild-hall/config.yaml  │
│  Commissions    │       │   git worktrees              │
└─────────────────┘       └──────────────────────────────┘
```

**Web**: Next.js App Router with React 19. Server components read data, client components handle interaction. All reads go through the daemon API via `fetchDaemon()` -- no direct filesystem access from the web layer.

**Daemon**: Hono server on a Unix socket. Owns all write operations, session lifecycle, and the EventBus. The socket is the trust boundary: if you can reach it, you're the user.

**Workers**: Packaged as installable worker and toolbox modules. Each worker declares its identity, posture, and tool access rules. Workers communicate via a mail system with sleep/wake transitions for concurrency management. The Guild Master is the built-in coordinator -- it generates project briefings and manages the commission lifecycle.

**State**: Everything lives in plain markdown files with structured frontmatter. No database. Commission status, meeting transcripts, artifacts -- all inspectable and editable with a text editor. The daemon exposes this state through its API; files are always the source of truth.

**Git isolation**: A three-tier branch strategy keeps AI work separated. `master` is human-controlled. `claude` is the integration branch -- AI work merges here. Activity branches give each session a sparse-checkout worktree with only the files it needs. Nothing reaches your codebase without an explicit merge decision.

## Design Decisions

**Files over databases.** Commission state lives in markdown frontmatter. Artifacts are markdown documents. Worker memory is a markdown file with named sections. This makes the system inspectable, portable, and recoverable. If the daemon crashes, nothing is lost. If I want to edit a commission brief after the fact, I open a text editor.

**One boundary, many clients.** The daemon is the application. Web, CLI, and agents are all clients of the same REST API. A capability that only exists in the web UI is a boundary violation. This discipline kept the architecture clean through 126 pull requests.

**Worker identity is fixed, not emergent.** A worker's soul doesn't drift across sessions. Character is defined before work begins. Memory accumulates (the worker learns project context), but personality is stable. This makes the relationship with a worker predictable across hundreds of interactions.

**Artifacts are the work.** Conversations are scaffolding. When a commission completes, the artifact it produced is what matters -- not the transcript of how it got there. Commission records link to artifacts. The UI surfaces artifacts first.

**Git isolation for AI work.** AI commits to its own branch. You merge what you want. This is the practical version of "the user decides direction" -- not trust-based autonomy, but architectural enforcement. The AI literally cannot write to master.

## Workers

Guild Hall ships with a roster of specialist workers, each with a defined domain:

- **Guild Master** -- Built-in coordinator. Manages commissions, generates briefings, dispatches work.
- **Octavia** -- Guild Chronicler. Keeper of the guild's living record. Documents what exists and prescribes how new lore should be shaped.
- **Verity** -- Guild Pathfinder. Ventures beyond the guild walls to gather intelligence. Sees the wider world but never touches the forge.
- **Dalton** -- Guild Artificer. Master craftsman. Builds what is commissioned, from foundation to finishing touch.
- **Thorne** -- Guild Warden. Oversees all work with a critical eye. Inspects everything, alters nothing.
- **Sable** -- Guild Breaker. Probes the seams of what was built, searching for where it gives.
- **Edmund** -- Guild Steward. Manages the guild's household affairs and correspondence.
- **Celeste** -- Guild Visionary. Imagines what the project could become. Proposes improvements grounded in evidence.
- **Sienna** -- Guild Illuminator. Visual craft specialist. Turns prompts into images with creative intention.

Workers can be extended with toolboxes -- packages that add capabilities like image generation, email access, or external API integration.

## Why I Built This

The context and artifact problems were already solved -- that's what [[Lore Development]] is for. Guild Hall was a different question: can I build a project management system where the majority of the work happens by talking to middle management, and the actual execution is asynchronous?

The Guild Master is that middle manager. You describe what you need, and it dispatches commissions to the right specialists. You don't write every brief yourself. You don't babysit sessions. You come back to completed artifacts and decide what to do with them.

The interesting constraint was asynchrony. Synchronous AI tools (chat interfaces, code assistants) require you to be present while the work happens. I wanted to delegate something, close the window, and find it done later. That forced a real session lifecycle: commissions with defined deliverables, workers that run to completion without supervision, state that survives across interactions.

The guild metaphor isn't decoration. Thinking of workers as craftspeople with identities and specializations changed how I write briefs. I write for Octavia differently than I write for Dalton. The posture shapes the output, and the identity makes the relationship consistent across hundreds of interactions.

It's also genuinely fun to use. The fantasy aesthetic wasn't the point, but it makes the tool feel distinct from work software. When a commission completes and the artifact appears in the tree, there's a small ceremony to it. That matters for something I use every day.
