---
title: Memory Loop
description: A mobile-friendly interface for AI-powered interactions with Obsidian vaults
---

# Memory Loop

Memory Loop is a web application I built to solve a personal friction point: capturing thoughts and consulting my knowledge base from my phone. Obsidian is excellent on desktop, but mobile workflows are clunky, and I wanted Claude AI to have full access to my vault's context.

![Vault Selection](/02_Areas/Memory-Loop/screenshots/select-a-vault.webp)

## The Problem

I use Obsidian as my second brain, organized with the PARA method across multiple vaults (work knowledge, personal projects, hobbies). But when I'm away from my computer and have a thought worth capturing or a question my notes could answer, the friction is too high:

- Obsidian mobile requires navigating folder structures
- No AI assistant has access to my personal knowledge base
- Quick captures interrupt whatever workflow I'm in

I wanted something I could pull up on my phone, type a quick thought, and know it would land in the right place. Or ask a question and have an AI that actually knows my context.

## What Memory Loop Does

The interface centers on four modes, each named to evoke the cognitive process:

### Ground

The home dashboard. Shows your current vault's goals (extracted from `CLAUDE.md`, which stores vault-specific context and instructions), AI-generated writing prompts, curated quotes for inspiration, and quick access to recent activity.

![Ground - Home Dashboard](/02_Areas/Memory-Loop/screenshots/ground.webp)

### Capture

Minimal friction note capture. Type a thought, tap capture, and it appends to your daily note with a timestamp. Drafts persist across sessions: start a thought on your phone, finish it later.

![Capture - Quick Note Entry](/02_Areas/Memory-Loop/screenshots/capture.webp)

### Think

AI conversations powered by Claude, with full read access to your vault. Claude can search your files, follow wiki-links, and ground responses in your actual notes. The conversation shows which tools Claude used (expandable), making the AI's reasoning transparent.

![Think - AI Chat](/02_Areas/Memory-Loop/screenshots/think.webp)

### Recall

Browse your vault's file structure directly. Navigate folders, read markdown files, and follow wiki-links. Useful for reviewing what you've captured or finding context for a conversation.

![Recall - File Browser](/02_Areas/Memory-Loop/screenshots/recall.webp)

## Architecture

The system runs as a local service on my home network, accessible from any device:

```
┌─────────────────┐     WebSocket      ┌─────────────────┐
│                 │ ◄────────────────► │                 │
│  React Frontend │                    │  Hono Backend   │
│  (Vite)         │                    │  (Bun)          │
│                 │                    │                 │
└─────────────────┘                    └────────┬────────┘
                                                │
                                                │ Claude Agent SDK
                                                ▼
                                       ┌─────────────────┐
                                       │                 │
                                       │  Claude AI      │
                                       │  (via OAuth)    │
                                       │                 │
                                       └────────┬────────┘
                                                │
                                                │ File System Access
                                                ▼
                                       ┌─────────────────┐
                                       │                 │
                                       │  Obsidian       │
                                       │  Vaults         │
                                       │                 │
                                       └─────────────────┘
```

**Frontend**: React 19 with Vite. Touch-friendly UI with 44px+ tap targets, works on screens as small as 320px. The synthwave aesthetic is purely personal preference; it makes the tool feel distinct from my other applications.

**Backend**: Hono server running on Bun. Handles WebSocket connections and manages Claude sessions via the Agent SDK. The backend runs from TypeScript source rather than bundled code because the Claude Agent SDK requires it.

**Shared**: Zod schemas define the WebSocket protocol, ensuring type safety between frontend and backend.

**Claude Integration**: Uses Anthropic's Agent SDK with OAuth authentication through Claude's API. Claude gets file system tools scoped to the selected vault (it can read, search, and navigate but operates within the vault's boundaries).

## Design Decisions

**Multi-vault support**: My knowledge is deliberately partitioned. Work thoughts don't belong in personal projects. Memory Loop lets you switch vaults, and each vault's `CLAUDE.md` gives Claude different context and capabilities.

**WebSocket communication**: Real-time streaming of Claude's responses feels conversational. You see the AI thinking rather than waiting for a complete response.

**Local deployment**: This runs on my home network, not a cloud service. My notes stay on my machines, and Claude accesses them through authenticated API calls. The data never leaves my control.

**Mobile-first design**: Every interaction assumes a thumb on a phone screen. Large tap targets, simple navigation, draft persistence for interrupted sessions.

## Why the Theme?

Most productivity tools aim for minimalism: clean interfaces, muted colors, nothing to distract you from the work. That makes sense for tools designed to get out of your way.

Memory Loop isn't that kind of tool for me. It's less about clearing distractions and more about creating a safe space. Somewhere I actually *want* to open, where capturing thoughts feels like settling into a familiar environment rather than filing paperwork.

So I went with a dark synthwave aesthetic: neon accents against deep purples and blues, a detailed background with depth. It's a bit of fun, nostalgic, and deliberately not serious. The visual style signals that this is *my* space, separate from work tools and generic apps. That distinction matters when the goal is building a habit of reflection.

## Why I Built This

Knowledge management tools optimize for either capture or retrieval. The loop between them (a new thought connecting to something you wrote months ago, old notes sparking new questions) gets less attention.

Memory Loop keeps that loop tight from my phone. Quick capture reduces friction. AI chat grounds conversations in my actual notes. File browsing lets me follow threads when I have time.
