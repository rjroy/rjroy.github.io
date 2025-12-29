# Ron's Broadcast Cache - Broadcasting Some Notes on My Personal Projects to the World

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is **Ron's Broadcast Cache**—a digital garden published via **GitHub Pages** at `rjroy.github.io`. Built with **Quartz**, it supports Obsidian wiki-links, backlinks, and graph visualization natively.

## Publishing

- **Platform**: GitHub Pages via Quartz
- **URL**: https://rjroy.github.io
- **Build**: Automatic on push to `master` via GitHub Actions
- **Audience**: Public readers

When creating or editing content, remember it will be publicly visible. Write for readers, not just for personal reference.

## Project Structure

```
rjroy.github.io/
├── content/              ← All markdown content lives here
│   ├── index.md          ← Homepage
│   ├── 00_Inbox/         ← Fresh captures
│   ├── 01_Projects/      ← Active work
│   ├── 02_Areas/         ← Ongoing interests
│   ├── 03_Resources/     ← Reference materials
│   ├── 04_Archive/       ← Completed work
│   ├── 05_Attachments/   ← Images and files
│   └── 06_Metadata/      ← Templates and docs
├── quartz/               ← Quartz source (don't edit)
├── quartz.config.ts      ← Site configuration
├── quartz.layout.ts      ← Layout configuration
└── .github/workflows/    ← Deployment automation
```

## Common Commands

```bash
# Preview locally
npx quartz build --serve

# Build only
npx quartz build

# Create new content
# Just add .md files to content/
```

## Content Guidelines

- **Write for sharing**: Assume someone else will read this
- **Explain context**: Don't assume readers know the background
- **Use wiki-links**: `[[Note Name]]` creates connections (Quartz handles these)
- **Date when relevant**: Use `YYYY-MM-DD` format in filenames

## File Conventions

- All content in `content/` folder
- Obsidian wiki-link syntax: `[[Note Name]]`
- Attachments in `content/05_Attachments/`
- Templates in `content/06_Metadata/Templates/` (ignored by build)
