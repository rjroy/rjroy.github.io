# Ron's Broadcast Cache

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**Ron's Broadcast Cache** is a digital garden published via GitHub Pages at `rjroy.github.io`. Built with Astro, it supports Obsidian wiki-links via remark plugins and Tailwind CSS for styling. Content is publicly visible: write for readers, not just personal reference.

## Commands

```bash
# Local development with hot reload
bun run dev

# Build only (outputs to dist/)
bun run build

# Preview built site
bun run preview

# Type check
bun run check

# Auto-format files
bun run format
```

## Deployment

Pushes to `master` trigger automatic deployment via GitHub Actions. The workflow:
1. Installs dependencies with Bun
2. Builds with `bunx astro build`
3. Deploys to GitHub Pages

## Content Organization

The site is organized for readers, not workflow machinery.

**Visible in navigation:**
- `content/Ideas/` - Developing thoughts and explorations
- `content/Projects/` - Shipped projects (Memory Loop, Vibe Garden, etc.)
- `content/Writing/` - Essays and longer-form pieces (Whimsy-for-Clarity)
- `content/Thoughts/` - Short-form reflections, observations, and developing ideas

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
- **"thought"** - `content/Thoughts/`
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
- Directories not routed (`Inbox/`, `Archive/`, `Resources/`, `Attachments/`, `Metadata/`) are excluded from navigation
- Mark drafts with frontmatter `draft: true` (excluded from build via content collection filtering)
- Dates in filenames use `YYYY-MM-DD` format
- Attachments go in `content/Attachments/`

## Configuration Files

- `astro.config.mjs` - Site settings, remark plugins, wiki-link resolution
- `tailwind.config.mjs` - Tailwind theme and styling
- `src/content.config.ts` - Content collection schemas (ideas, writing, projects, thoughts)

## Memory Loop

This vault is integrated with Memory Loop for daily note capture and goal tracking.

**Configuration:**
- **Content root**: `/home/rjroy/Projects/Vaults/rjroy.github.io/content`
- **Inbox**: `Inbox/` - Daily notes created via the capture tab
- **Chat transcripts**: `Inbox/chats/` - AI conversations from the Think tab are saved here as searchable markdown
- **Goals file**: `Metadata/memory-loop/goals.md` - Active goals and priorities

**PARA directories:**
- Projects: `Ideas/`
- Areas: `Writing/`
- Resources: `03_Resources/`
- Archives: `04_Archive/`

Daily notes are automatically created in the inbox through Memory Loop's capture tab and can be organized into the visible directories as they mature.
