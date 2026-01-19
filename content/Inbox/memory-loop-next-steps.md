---
title: Memory Loop Next Steps
date: 2025-01-19
tags:
  - memory-loop
  - ai-pkm
  - spaced-repetition
---

# Memory Loop Next Steps

Three distinct cognitive systems to explore for AI-assisted PKM:

## 1. Spaced Repetition (Temporal)

**Purpose:** Combat forgetting through retrieval practice

**Mechanism:** LLM discovers notecards from vault content, presents them at increasing intervals

**Value:** Keeps facts accessible in your head without manual notecard creation

**Discovered notecards examples:**
- "What projects is Bob heading?"
- "What platform versions is the SDK currently supporting?"
- "What are the top 3 features for the next big push?"

**Key characteristics:**
- Has **shelf life** - answers change over time
- Needs "this is outdated" button
- Requires metadata: `created_date`, `last_reviewed`, `next_review`
- Needs feedback loop: "correct" / "incorrect" / "outdated"
- Uses scheduling algorithm (SM-2 or similar)
- Lives in **separate deck** - explicit review sessions

**Implementation notes:**
- This is cache warming - keeping the right facts hot for quick access
- Active knowledge maintenance - mental index stays current

## 2. Spatial Relationships (Structural)

**Purpose:** Reveal hidden connections through concept-space proximity

**Mechanism:** Embedding/clustering finds notes that are surprisingly close in meaning despite no explicit links

**Value:** Sparks synthesis and insight by showing patterns you didn't know existed

**Examples:**
- "You have 3 notes about 'boundaries' and 3 notes about 'REST API design' in close proximity. What's the connection?"
- "Your leadership notes and architecture notes share vocabulary. Is that intentional?"
- "'Conviction' appears in both team charter and project planning contexts—same concept or different?"

**Key characteristics:**
- **Timeless** - relationships either exist or don't, no expiration
- Needs embedding model and clustering
- Needs threshold tuning for "close enough"
- No scheduling - surfaces opportunistically
- Could appear **in context** - while viewing Note A, suggest Note B is surprisingly close

**Implementation notes:**
- This is pattern recognition - seeing structures you didn't design
- Different from contextual prompts (which ask about current note) - this finds *other* notes that relate

## 3. Contextual Prompts (Momentary)

**Purpose:** Deepen thinking about current context

**Mechanism:** Given what you're looking at RIGHT NOW, generate questions to explore

**Value:** In-the-moment scaffolding for deeper engagement

**Already implemented:** `Metadata/memory-loop/contextual-prompts.md`

**Key characteristics:**
- Context-specific
- No temporal component
- No spatial discovery
- Pure interrogation of present focus

**Implementation notes:**
- This is what "moments of genius" already does
- Not about remembering facts or finding patterns, but about interrogating the now

---

## The Breakdown

| System | Purpose | Time Dimension | Output |
|--------|---------|----------------|--------|
| Spaced Repetition | Cache warming | Temporal (decay/review) | Questions to test recall |
| Spatial Relationships | Pattern recognition | Timeless (structural) | Hidden connections between notes |
| Contextual Prompts | Deepen thinking | Momentary (present focus) | Questions about current context |

---

## Next Decision

Which path to explore first?

**Spaced repetition** gives immediate practical value - stops you from losing track of work facts.

**Spatial relationships** gives long-term synthesis power - reveals architectural patterns in your thinking.

**Contextual prompts** is already working - could enhance, but foundation exists.

---

## Research Questions

### For Spaced Repetition:
- How does the LLM decide what's "notecard-worthy"?
- What makes a good factual question vs. synthesis question?
- How do we handle the "this is outdated" signal? Just hide the card, or use it to trigger "what changed?"

### For Spatial Relationships:
- What embedding model? (Sentence transformers, OpenAI embeddings, etc.)
- What distance threshold means "surprisingly close"?
- How do we present discoveries without overwhelming the user?

### For Both:
- Where do these live in the Memory Loop UI?
- Separate tabs? Integrated into existing views?
- How do we avoid cognitive load from "too many prompts"?

---

_Conversation: 2025-01-19 with Claude Code_
