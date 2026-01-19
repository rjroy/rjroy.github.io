---
created: 2025-01-19
tags: [memory-loop, feature-spec, ai-collaboration]
draft: true
---

# Memory Loop: Pair Writing Mode

## Overview

A split-screen editor mode for collaborative revision between human and AI. The goal is to close the loop between manual edits and AI assistance while reclaiming authorship without losing the assist.

## Layout

**Left pane:** Markdown editor (human territory)
**Right pane:** Conversation log (AI territory)

Both sides see the same document but with different affordances.

## Interaction Model

### 1. Highlight + Right-Click Menu

Highlight any text in the left pane, right-click to access context menu:

- **Validate** - Is this true? Fact-check the claim.
- **Critique** - Is this good writing? Analyze clarity, voice, structure.
- **Tighten** - Make more concise without losing meaning.
- **Embellish** - Add detail, nuance, or context.
- **Correct** - Fix typos and grammar only (no content changes).
- **Polish** - Correct + improve prose (small, controlled improvements).

Each option sends the selection + surrounding context to Claude in the right pane. Claude responds there, not inline. The human reads the response and manually applies changes if desired.

**Why manual application?** The friction forces internalization instead of blind acceptance. You're learning what good revision looks like.

### 2. Highlight + Jump to Chat

Highlight text, hit a hotkey (Tab? Cmd+Enter?), cursor jumps to the chat input with selection metadata attached.

The conversation log shows the selected text as a quoted block above your question. You type your question naturally:

```
[Selected: "The cathedral effect suggests that..."]
YOU: Is this citation accurate? Also, is my framing too hedged?
CLAUDE: [responds with fact-check + voice critique]
```

### 3. The "What Changed?" Flow

**Use case:** Claude wrote a section. You rewrote it. You want Claude to analyze what changed and why your version is different.

**Interaction:**
1. Highlight your rewritten section
2. Right-click → "Compare to previous version"
3. Claude shows a diff in the chat pane:

```
BEFORE (Claude): [original text]
AFTER (You): [your rewrite]

ANALYSIS:
- Removed hedging language ("suggests", "might")
- Made subject more concrete (cathedral effect → spatial openness)
- Shortened sentence structure
- Your version is more direct and confident
```

**Why this matters:** You're not asking Claude to judge "better" (subjective). You're asking Claude to describe what changed (objective). Over time, this creates a learning loop where both human and AI improve:
- Claude learns your voice patterns
- You internalize what you're doing when you revise

## Technical Requirements

### Editor State Tracking

The system must track:
- Current document text (left pane)
- Conversation history (right pane)
- **Shadow version history** for each section/paragraph

When you rewrite a section, the old version doesn't disappear—it's stored in shadow history. The "Compare to previous version" option diffs against that shadow state.

### Context Passing

When you highlight text and invoke Claude, the system sends:
1. The selected text
2. Surrounding context (paragraph before/after?)
3. Shadow version if it exists (for "what changed?" requests)
4. Conversation history (Claude remembers prior discussion)

## Open Questions

### 1. When does the shadow version get created?
- Every time Claude generates text?
- Every time you save?
- Manually triggered?

### 2. How long does the shadow version persist?
- Until you explicitly collapse it?
- Until you move to a different section?
- Forever (stored in file metadata)?

### 3. Does the conversation log persist with the file?
- If you close the editor and reopen it, is the chat history still there?
- Is it stored in the markdown file as comments?
- Separate database?

## What This Solves

1. **Closes the loop** between manual edits and AI edits (they coexist in split view)
2. **Reclaims authorship** without losing the assist (you edit, Claude advises)
3. **Creates a learning loop** where you and Claude both improve over time through the "what changed?" flow

## Related Problems

This addresses the current friction:
- Opening edit window, making changes, saving, closing, opening chat, pasting link, adding request
- Choosing between doing it yourself (losing assist) or handing everything to Claude (losing voice)
- Managing AI-generated drafts that need complete rewrites without losing context

The half-way point preserves agency while reducing ceremony.
