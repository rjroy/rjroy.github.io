---
title: CollapsibleRecentNotes component implementation
date: 2026-02-01
status: executed
tags: [quartz, component, sidebar, ui]
modules: [quartz-components]
related: [.lore/specs/collapsible-recent-notes.md, .lore/retros/collapsible-recent-notes.md]
---

# Plan: CollapsibleRecentNotes Component

## Summary

Create a collapsible sidebar component that displays recent notes with expand/collapse functionality matching Explorer's UX pattern. Desktop only.

## Files to Create

### 1. `quartz/components/CollapsibleRecentNotes.tsx`

Component structure (following Explorer pattern):
```tsx
- Wrapper div with class `collapsible-recent-notes`
- Header button with title "Recently Updated" + chevron SVG
- Content div containing the notes list
- data-collapsed attribute for state
- aria-expanded for accessibility
```

Key differences from Explorer:
- Simpler: no folder hierarchy, just a flat list
- Reuses RecentNotes rendering logic inline (not as wrapper)
- Single localStorage key, not per-folder state

### 2. `quartz/components/scripts/collapsibleRecentNotes.inline.ts`

Script handles:
- Toggle collapse on header click
- Persist state to localStorage (`recent-notes-collapsed`)
- Restore state on page load
- Handle localStorage errors gracefully

### 3. `quartz/components/styles/collapsibleRecentNotes.scss`

Styles for:
- Header button (transparent bg, cursor pointer)
- Chevron rotation (-90deg when collapsed)
- Content visibility toggle with animation
- Desktop-only display (inherit from displayClass)

## Files to Modify

### 4. `quartz/components/index.ts`

Add export:
```ts
import CollapsibleRecentNotes from "./CollapsibleRecentNotes"
export { ..., CollapsibleRecentNotes }
```

### 5. `quartz.layout.ts`

Replace current RecentNotes with:
```ts
Component.DesktopOnly(Component.CollapsibleRecentNotes()),
```

Remove the existing plain RecentNotes that was added earlier.

## Implementation Details

**Collapse mechanism** (from Explorer):
- CSS class `collapsed` on parent toggles visibility
- `grid-template-rows: 0fr` → `1fr` for smooth animation
- Chevron SVG rotates via CSS transform

**localStorage pattern**:
```ts
const STORAGE_KEY = "recent-notes-collapsed"
const isCollapsed = localStorage.getItem(STORAGE_KEY) === "true"
// On toggle: localStorage.setItem(STORAGE_KEY, collapsed.toString())
```

**Error handling**:
```ts
try {
  localStorage.setItem(...)
} catch {
  // Private browsing or quota exceeded - ignore
}
```

## Verification

1. `npx quartz build --serve`
2. Verify component appears in left sidebar below Explorer
3. Click header - notes list should collapse/expand with animation
4. Chevron should rotate -90deg when collapsed
5. Refresh page - state should persist
6. Resize to mobile viewport - component should be hidden
7. Check browser console for errors
