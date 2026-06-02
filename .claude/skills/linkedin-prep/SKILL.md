---
description: >
  This skill should be used when the user wants to publish a thought from
  content/Thoughts/ to LinkedIn. Trigger phrases include "prep this for LinkedIn",
  "format for LinkedIn", "turn this thought into a LinkedIn post", or "publish
  to LinkedIn". The skill formats markdown content for LinkedIn's mobile-first
  feed (line breaks, plain text, removes frontmatter), preserves the user's
  direct voice, and optionally adds a link back to the full blog post.
tags:
  - publishing
  - linkedin
  - writing
---

# LinkedIn Prep

Convert a thought from your blog into a LinkedIn-ready post. This skill:

1. Lets you select a thought from `content/Thoughts/`
2. Formats it for LinkedIn (line breaks, mobile-friendly structure)
3. Optionally adds a "Read more" link to the full blog post
4. Copies the result to clipboard or saves to a staging file

## Usage

When invoked, the skill will:

1. List recent thoughts from `content/Thoughts/`
2. Let you pick one
3. Show you the formatted version
4. Ask whether to copy to clipboard or save for review

## Editorial Guidelines

**What the skill does:**
- Tightens the opening (first 2-3 lines must survive "see more" fold)
- Adds line breaks between paragraphs for mobile readability
- Removes YAML frontmatter, markdown formatting, and blog-specific artifacts
- Preserves your voice and actual words

**What the skill does NOT do:**
- Add fake engagement hooks ("What do you think?", "Agree?")
- Manufacture conclusions you didn't write
- Rewrite for algorithm optimization
- Change technical accuracy for accessibility

## Output Modes

**Short thoughts (< 300 words):**
- Minimal editing, just formatting
- Optional "Read more" link at end

**Long thoughts (> 300 words):**
- Core insight + "Read more" link pattern
- OR full version if it's already tight

You'll be asked which mode you want when relevant.

---

## Instructions

When the user invokes this skill:

1. **List available thoughts:**
   - Scan `content/Thoughts/*.md`
   - Exclude files with frontmatter `draft: true`
   - Show titles and dates
   - Let user pick one (or specify by name/path)

2. **Load the thought:**
   - Read the selected file
   - Strip YAML frontmatter (use the title field for context but don't duplicate it if body already opens with it)
   - Convert wiki-link images (`![[attachment]]`) to `[Image: filename]` and note that user must upload images separately to LinkedIn
   - Identify structure (short vs long, has open questions, etc.)

3. **Format for LinkedIn:**
   - **Plain text only:** LinkedIn does not support markdown. No bold, italic, headers, or bullet syntax. Output must be plain text.
   - **Opening hook:** First 2-3 lines must be strong. The opening line carries weight by being first, not by formatting.
   - **Paragraph breaks:** Add extra line breaks between sections (LinkedIn needs more white space than blog)
   - **Remove artifacts:** No YAML, no `##` headings (use line breaks instead), no wiki-links, no markdown syntax
   - **Preserve voice:** No hedging, no em-dashes, no performative language

4. **Add blog link (optional):**
   - Ask: "Include link to blog post?"
   - Format slug from filename (strip date prefix, use hyphens)
   - **Short thoughts** (post wasn't trimmed): bare URL only, e.g. `https://rjroy.github.io/thoughts/[slug]`
   - **Long thoughts** (post was trimmed to core + link): `Read more: https://rjroy.github.io/thoughts/[slug]`

5. **Present formatted version:**
   - Check character count (LinkedIn limit: 3,000 characters). If over, warn and suggest condensing.
   - Show the full formatted post
   - Ask: "Save to file or edit?" (default: save)

6. **Handle user choice:**
   - **Save (default):** Create `content/Thoughts/.linkedin-staging/` if needed, write to `[filename].md`
   - **Edit:** Let user request changes, regenerate

## Formatting Examples

**Short thought (before):**
```markdown
---
title: "AI Makes Code Cheap, Review Expensive"
date: 2026-02-14
tags:
  - quality
---

AI CodeGen has made code cheap, but we're still bottlenecked at review and verification. Verification can be done via proper unit and integration tests. Review can be partially done with AI, but we still need a human to review it. Does this mean we are just reviewers now?
```

**Short thought (after):**
```
AI codegen has made code cheap. We're still bottlenecked at review.

Verification can be automated with proper unit and integration tests. Review can be partially done with AI. But we still need a human to review it.

Does this mean we're just reviewers now?

https://rjroy.github.io/thoughts/ai-makes-code-cheap-review-expensive
```

**Long thought (before):**
```markdown
---
title: Forced Parallelization vs Human Cognition
---

## The Mismatch

Humans don't think in parallel. We context-switch poorly. But AI makes parallel work trivial—10 agents, 10 tasks, all running simultaneously...

## Open Questions

- Is the skill becoming "orchestration" rather than "implementation"?
- What's the cognitive load ceiling?
```

**Long thought (after, core + link pattern):**
```
Humans don't think in parallel. AI does.

We context-switch poorly. But AI makes 10 agents running 10 tasks trivial. The pressure becomes "why aren't you running more in parallel?" even though managing 10 concurrent threads is cognitively expensive in a way writing code never was.

Is the skill becoming orchestration rather than implementation? Can you actually steer 10 agents, or do you just have 10 things happening that you're not really piloting?

Read more: https://rjroy.github.io/thoughts/forced-parallelization-human-cognition
```

## User Voice Constraints

- **Concise and direct.** No hedging.
- **No em-dashes.** Use commas, parentheses, or restructure.
- **No performative language.** Nothing you wouldn't say in a 1:1.
- **Questions are genuine, not rhetorical.** Open-ended thinking, not manufactured engagement.
- **Preserve technical precision.** Don't simplify away accuracy.

If something feels like LinkedIn-ification (softening, adding calls-to-action, manufacturing resolution), don't do it.
