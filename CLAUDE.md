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
- `content/Thoughts/` - Short-form reflections and observations
- `content/Projects/` - Built and maintained work (Memory Loop, Vibe Garden, etc.)
- `content/Writing/` - Essays, series, and exploratory long-form work

**Hidden from navigation (still accessible via direct links):**
- `content/Inbox/` - Fresh captures, daily notes
- `content/Archive/` - Completed or superseded content
- `content/Resources/` - Reference materials
- `content/Attachments/` - Images and files
- `content/Metadata/` - Templates, config, Memory Loop data

## Terminology Mapping

- **"project"** - `content/Projects/`
- **"writing"**, **"essay"**, or **"exploratory article"** - `content/Writing/`
- **"thought"** - `content/Thoughts/`
- **"goals"** - `content/Metadata/memory-loop/goals.md`
- **"context"** or **"prompts"** - `content/Metadata/memory-loop/contextual-prompts.md`

## Creating Content

When a note should become a standalone piece, create the proper folder structure:

1. **Folder name**: Use Title Case with hyphens replacing spaces
   - Example: "Home Lab Setup" - `Home-Lab-Setup/`
2. **Main note**: Create an `index.md` inside the folder
3. **Location**: Choose based on content type:
    - Thoughts (short, dated reflections) - `content/Thoughts/`
    - Projects (built and maintained work) - `content/Projects/`
    - Writing (essays, series, and exploratory long-form work) - `content/Writing/`

**Examples:**
- New project "Memory Loop" - `content/Projects/Memory-Loop/index.md`
- New exploratory article "On Whimsy" - `content/Writing/On-Whimsy/index.md`

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
- `src/content.config.ts` - Content collection schemas (writing, projects, thoughts)

## Memory Loop

This vault is integrated with Memory Loop for daily note capture and goal tracking.

**Configuration:**
- **Content root**: `/home/rjroy/Projects/Vaults/rjroy.github.io/content`
- **Inbox**: `Inbox/` - Daily notes created via the capture tab
- **Chat transcripts**: `Inbox/chats/` - AI conversations from the Think tab are saved here as searchable markdown
- **Goals file**: `Metadata/memory-loop/goals.md` - Active goals and priorities

**PARA directories:**
- Projects: `Projects/`
- Areas: `Writing/`
- Resources: `03_Resources/`
- Archives: `04_Archive/`

Daily notes are automatically created in the inbox through Memory Loop's capture tab and can be organized into the visible directories as they mature.


<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:6cd5cc61 -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.

## Agent Context Profiles

The managed Beads block is task-tracking guidance, not permission to override repository, user, or orchestrator instructions.

- **Conservative (default)**: Use `bd` for task tracking. Do not run git commits, git pushes, or Dolt remote sync unless explicitly asked. At handoff, report changed files, validation, and suggested next commands.
- **Minimal**: Keep tool instruction files as pointers to `bd prime`; use the same conservative git policy unless active instructions say otherwise.
- **Team-maintainer**: Only when the repository explicitly opts in, agents may close beads, run quality gates, commit, and push as part of session close. A current "do not commit" or "do not push" instruction still wins.

## Session Completion

This protocol applies when ending a Beads implementation workflow. It is subordinate to explicit user, repository, and orchestrator instructions.

1. **File issues for remaining work** - Create beads for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **Handle git/sync by active profile**:
   ```bash
   # Conservative/minimal/default: report status and proposed commands; wait for approval.
   git status

   # Team-maintainer opt-in only, unless current instructions forbid it:
   git pull --rebase
   git push
   git status
   ```
5. **Hand off** - Summarize changes, validation, issue status, and any blocked sync/commit/push step

**Critical rules:**
- Explicit user or orchestrator instructions override this Beads block.
- Do not commit or push without clear authority from the active profile or the current user request.
- If a required sync or push is blocked, stop and report the exact command and error.
<!-- END BEADS INTEGRATION -->
