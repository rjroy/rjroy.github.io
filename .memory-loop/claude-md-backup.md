# Ron's Broadcast Cache

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**Ron's Broadcast Cache** is a digital garden published via GitHub Pages at `rjroy.github.io`. Built with Quartz 4, it supports Obsidian wiki-links, backlinks, and graph visualization. Content is publicly visible: write for readers, not just personal reference.

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

## Content Organization

The site is organized for readers, not workflow machinery.

**Visible in navigation:**
- `content/Ideas/` - Developing thoughts and explorations
- `content/Projects/` - Shipped projects (Memory Loop, Vibe Garden, etc.)
- `content/Writing/` - Essays and longer-form pieces (Whimsy-for-Clarity)

**Hidden from navigation (still accessible via direct links):**
- `content/Inbox/` - Fresh captures, daily notes
- `content/Archive/` - Completed or superseded content
- `content/Resources/` - Reference materials
- `content/Attachments/` - Images and files
- `content/Metadata/` - Templates, config, Memory Loop data

## Terminology Mapping

- **"idea"** - `content/Ideas/`
- **"project"** - `content/Projects/`
- **"writing"** or **"essay"** - `content/Writing/`
- **"goals"** - `content/Metadata/memory-loop/goals.md`
- **"context"** or **"prompts"** - `content/Metadata/memory-loop/contextual-prompts.md`

## Creating Content

When a note should become a standalone piece, create the proper folder structure:

1. **Folder name**: Use Title Case with hyphens replacing spaces
   - Example: "Home Lab Setup" - `Home-Lab-Setup/`
2. **Main note**: Create an `index.md` inside the folder
3. **Location**: Choose based on content type:
   - Ideas (developing) - `content/Ideas/`
   - Projects (shipped) - `content/Projects/`
   - Writing (essays) - `content/Writing/`

**Examples:**
- New idea "Guild Hall Architecture" - `content/Ideas/Guild-Hall/index.md`
- New project "Memory Loop" - `content/Projects/Memory-Loop/index.md`
- New essay "On Whimsy" - `content/Writing/On-Whimsy/index.md`

Related notes go as siblings to `index.md` within the same folder.

## Content Conventions

- Use Obsidian wiki-link syntax: `[[Note Name]]`
- Quartz ignores: `Inbox/`, `Archive/`, `Resources/`, `Attachments/`, `Metadata/`
- Mark drafts with frontmatter `draft: true` (excluded from build via `RemoveDrafts` plugin)
- Dates in filenames use `YYYY-MM-DD` format
- Attachments go in `content/Attachments/`

## Configuration Files

- `quartz.config.ts` - Site settings, plugins, theme colors
- `quartz.layout.ts` - Page layout components (sidebar, graph, backlinks)
- Don't edit files in `quartz/` directory (upstream Quartz source)

## Memory Loop

This vault is integrated with Memory Loop for daily note capture and goal tracking.

**Configuration:**
- **Content root**: `/home/rjroy/Projects/Vaults/rjroy.github.io/content`
- **Inbox**: `Inbox/` - Daily notes created via the capture tab
- **Goals file**: `Metadata/memory-loop/goals.md` - Active goals and priorities

Daily notes are automatically created in the inbox through Memory Loop's capture tab and can be organized into the visible directories as they mature.
