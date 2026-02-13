---
description: Process inbox notes into publishable thoughts
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion
---

Process inbox notes from `content/Inbox/` and generate publishable thought files in `content/Thoughts/`.

## Step 1: Read Inbox Files

Use Glob to find `.md` files in `content/Inbox/`. Read each file.

**Skip entirely:**
- The `chats/` subdirectory (AI conversation transcripts, not personal captures)
- The `Monthly_Reports/` subdirectory
- Templates and config files

## Step 2: Extract Thought Candidates

For each inbox file, extract individual thought candidates:

**Daily notes** (files with `## Capture` sections containing timestamped bullets like `- [HH:MM] text`):
- Each bullet is a separate thought candidate
- Strip the timestamp prefix
- Preserve the raw content exactly

**Checkbox bullets** (`- [ ]` or `- [x]`): Evaluate the content, not the checkbox. A checkbox with reflective content is a thought candidate. Strip the checkbox syntax. A checkbox that is purely an action item ("- [ ] Fix the build") is not.

**Topic notes** (files with developed content on a specific subject):
- The entire note is one thought candidate
- Preserve the core content

**Skip these entries:**
- One-line action items or tasks (e.g., "Investigate https://...")
- Questions without substance (e.g., "Is there a way to have X?")
- Items that are clearly todos, not reflections

If nothing in a file qualifies as a thought, skip it silently.

After extracting all candidates, check if any entries across different files express the same underlying thought from different angles or at different times. If so, group them into a single thought. Most entries will stand alone. Only cluster when the connection is obvious.

## Step 3: Present Proposed Thoughts

For each proposed thought, show the user:
- **Source**: Which file(s) and bullet(s) it came from
- **Proposed title**: A concise title for the thought
- **Proposed content**: The polished version (see polishing rules below)
- **Proposed tags**: 1-3 relevant tags (prefer tags already used in existing content for consistency)
- **Proposed filename**: kebab-case `.md` filename

If more than 10 thoughts are proposed, group them by source file for readability.

Present all proposed thoughts at once, numbered, so the user can see the full picture.

Then use AskUserQuestion to ask which thoughts to generate. Offer options like "All of them", "None", or let them specify by number.

## Step 4: Polish Rules

When polishing captures into thoughts, follow these rules strictly:

**Do:**
- Clean up sentence fragments into complete sentences
- Fix grammar and punctuation
- Combine clustered entries into a coherent piece
- Preserve the first-person voice exactly as written
- Keep the same level of certainty (if the capture says "I wonder" or "not sure", keep that uncertainty)
- Use wiki-link syntax `[[Note Name]]` when the thought references an existing note in the vault

**Do not:**
- Add insight, analysis, or conclusions the author didn't express
- Expand a one-sentence observation into multiple paragraphs
- Add context the author didn't provide
- Change the opinion or stance expressed
- Add hedging or qualifiers that weren't there
- Make it sound more polished than the person actually thinks

A two-sentence thought is fine. Not everything needs to be an essay.

## Step 5: Generate Thought Files

Thoughts are flat files directly in `content/Thoughts/`, not folder/index.md pairs.

For each approved thought, write a file with this exact frontmatter format:

```yaml
---
title: "The Thought Title"
date: YYYY-MM-DD
tags: [tag1, tag2]
---
```

**Date priority:**
1. Source file's frontmatter `date` field
2. Date parsed from filename (YYYY-MM-DD prefix)
3. Today's date as fallback

**Filename:** `content/Thoughts/the-thought-title.md` (kebab-case)

Do NOT set `linkedIdea` or `standalone` unless the content clearly relates to an existing idea in `content/Ideas/`.

## Step 6: Report

After generating, list what was created with file paths. Note which inbox files were fully processed (all their thought-worthy content was extracted) so the user can decide whether to archive them.
