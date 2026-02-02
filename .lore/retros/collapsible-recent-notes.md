---
title: Quartz sidebar scroll and DesktopOnly wrapper pitfalls
date: 2026-02-01
status: complete
tags: [quartz, component, css, flex, scroll, sidebar]
modules: [quartz-components]
related: [.lore/specs/collapsible-recent-notes.md]
---

# Retro: Collapsible Recent Notes

## Summary

Built a collapsible "Recently Updated" sidebar component for Quartz, following Explorer's collapse/expand pattern. Component is functional with localStorage persistence and mobile hiding.

## What Went Well

- Core collapse/expand functionality worked on first attempt
- localStorage persistence pattern from Explorer translated directly
- Chevron rotation animation matched Explorer exactly
- TypeScript compiled cleanly throughout

## What Could Improve

- Multiple iterations on scroll behavior before discovering the `overflow` class pattern
- Spec wasn't reviewed before implementation began, leading to missed requirements
- Started with grid-based collapse animation that conflicted with scrolling (had to simplify to flex-based)
- Used `DesktopOnly` wrapper per spec, but it caused display conflicts that required CSS media query instead

## Lessons Learned

1. When copying patterns from Quartz components, check for utility patterns too (like `OverflowList` with `overflow` class and `overflow-end` marker for scrolling)
2. The `DesktopOnly` wrapper sets `display: initial` which conflicts with flex layouts; prefer CSS `@media` queries for hiding
3. For Quartz sidebar scrolling: use `overflow` class on the list, add `overflow-end` marker element, let `base.scss` handle the rest
4. Grid-based height animations (`grid-template-rows: 0fr` to `1fr`) conflict with `overflow-y: auto`; simpler flex shrinking (`flex: 0 0 1.2rem` when collapsed) works better for collapsible sections that need scroll

## Artifacts

- Spec: `.lore/specs/collapsible-recent-notes.md`
- Component: `quartz/components/CollapsibleRecentNotes.tsx`
- Styles: `quartz/components/styles/collapsibleRecentNotes.scss`
- Script: `quartz/components/scripts/collapsibleRecentNotes.inline.ts`
