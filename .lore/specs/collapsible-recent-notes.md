---
title: Collapsible Recent Notes component
date: 2026-02-01
status: wontfix
tags: [quartz, component, sidebar, ui]
modules: [quartz-components]
---

# Spec: Collapsible Recent Notes

## Overview

A Quartz sidebar component that displays recently modified notes with collapse/expand functionality, matching Explorer's UX pattern. Desktop only.

## Entry Points

- Sidebar render on any page (left sidebar, below Explorer)

## Requirements

- REQ-1: Display 5 most recently modified notes (git commit date if available, otherwise filesystem mtime)
- REQ-2: Collapsible via header click, with chevron indicator that rotates -90° when collapsed (pointing left, matching Explorer pattern). Include `aria-expanded` attribute for accessibility.
- REQ-3: Persist collapsed/expanded state in localStorage with key `recent-notes-collapsed`. If localStorage is unavailable, fail gracefully by defaulting to expanded without persistence.
- REQ-4: Default to expanded on first visit
- REQ-5: Desktop only via `DesktopOnly()` wrapper component
- REQ-6: Filter out the root index page (slug === "index")
- REQ-7: Hide tags (showTags: false)
- REQ-8: Create component at `quartz/components/CollapsibleRecentNotes.tsx` with styles in `quartz/components/styles/collapsibleRecentNotes.scss`
- REQ-9: Hard-code configuration (limit: 5, showTags: false, filter: exclude index). No need for configurable options in this version.

## Exit Points

| Exit | Triggers When | Target |
|------|---------------|--------|
| Note link click | User clicks a note title | Target note page |

## Success Criteria

- [ ] Component renders in left sidebar below Explorer
- [ ] Clicking header toggles collapsed state with smooth animation (0.3s ease)
- [ ] Chevron rotates -90° when collapsed (points left, matching Explorer)
- [ ] State persists in localStorage (key: `recent-notes-collapsed`)
- [ ] Component hidden on mobile viewports (Quartz `$mobile` breakpoint)
- [ ] Lists 5 most recent notes sorted by modification date descending, excluding index

## AI Validation

**Defaults**:
- Code review by fresh-context sub-agent

**Custom**:
- Manual visual verification in `npx quartz build --serve`
- Collapse/expand works and persists after page reload
- Mobile viewport hides component

## Constraints

- Do not modify existing Quartz component files (create new component alongside them)
- Follow existing Explorer collapse pattern for consistency
- Keep implementation minimal (component file + styles + inline script)

## Context

Existing patterns to follow:
- `quartz/components/Explorer.tsx` - collapse toggle pattern
- `quartz/components/RecentNotes.tsx` - base component to wrap
- `quartz/components/scripts/explorer.inline.ts` - localStorage persistence pattern
- `quartz/components/styles/explorer.scss` - collapse animation CSS
