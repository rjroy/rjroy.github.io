# Ron's Broadcast Cache - Broadcasting Some Notes on My Personal Projects to the workflow

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**Ron's Broadcast Cache** is a digital garden published via GitHub Pages at `rjroy.github.io`. Built with Quartz 4, it supports Obsidian wiki-links, backlinks, and graph visualization. Content is publicly visible—write for readers, not just personal reference.

## Commands

```bash
# Local development with hot reload
npx quartz build --serve

# Build only (outputs to public/)
npx quartz build

# Type check and formatting validation
npm run check

# Auto-format files
npm run format

# Run tests
npm run test
```

## Deployment

Pushes to `master` trigger automatic deployment via GitHub Actions. The workflow:
1. Fetches the Nord theme from `quartz-themes`
2. Builds with `npx quartz build`
3. Deploys to GitHub Pages

## Content Organization (PARA)

- `content/00_Inbox/` — Fresh captures
- `content/01_Projects/` — Active work with goals
- `content/02_Areas/` — Ongoing interests
- `content/03_Resources/` — Reference materials
- `content/04_Archive/` — Completed work
- `content/05_Attachments/` — Images and files
- `content/06_Metadata/` — Templates and docs

## Terminology Mapping

- **"project"** → `content/01_Projects/`
- **"area"** → `content/02_Areas/`
- **"goals"** → `content/06_Metadata/memory-loop/goals.md`
- **"context"** or **"prompts"** → `content/06_Metadata/memory-loop/contextual-prompts.md`

## Content Conventions

- Use Obsidian wiki-link syntax: `[[Note Name]]`
- Quartz ignores: `private/`, `templates/`, `.obsidian/`, `06_Metadata/Templates/`
- Mark drafts with frontmatter `draft: true` (excluded from build via `RemoveDrafts` plugin)
- Dates in filenames use `YYYY-MM-DD` format
- Attachments go in `content/05_Attachments/`

## Configuration Files

- `quartz.config.ts` — Site settings, plugins, theme colors
- `quartz.layout.ts` — Page layout components (sidebar, graph, backlinks)
- Don't edit files in `quartz/` directory (upstream Quartz source)
