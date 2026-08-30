---
title: From Research to Practice
created: 2025-01-19
tags: [memory-loop, ai-pkm, implementation, spaced-repetition, pair-writing]
---

# From Research to Practice: Building on the Ground → Capture → Think → Recall Framework

The [[llm-integrated-pkm|LLM-Integrated PKM research]] identified both the novelty and the vulnerabilities of treating LLMs as cognitive partners in personal knowledge management. This document captures the concrete features and design decisions that emerged from confronting those findings.

## The Core Tension

Research revealed a fundamental trade-off: what feels productive (frictionless capture, conversational synthesis) can systematically prevent learning and retention. The challenge is distinguishing **desirable difficulties** (friction that creates learning) from **unnecessary friction** (just makes things harder).

Memory Loop already preserves some effortful engagement through interactive rituals (`/daily-debrief`, `/weekly-debrief`, `/expand-note`). But gaps remain—particularly around retrieval practice, cognitive style diversity, and the ephemeral nature of conversational insights.

Three design explorations emerged:

---

## 1. Spaced Repetition: Cache Warming for Facts

**The Gap:** The workflow has mechanisms for synthesis but no systematic retrieval practice. Research shows the testing effect (Roediger & Karpicke, 2006) requires regular self-testing to create durable knowledge. Synthesis without retrieval practice doesn't create long-term retention.

**The Solution:** A `/test-my-knowledge` command that discovers notecards from vault content and presents them at increasing intervals.

### How It Works

The LLM scans vault content and generates factual questions that have shelf life:
- "What projects is Bob heading?"
- "What platform versions is the SDK currently supporting?"
- "What are the top 3 features for the next big push?"

These aren't timeless synthesis questions—they're work facts that decay. The system needs to know when answers become outdated.

### Key Characteristics

**Temporal dimension:** Uses spaced repetition scheduling (SM-2 or similar)
- Show questions more often when new
- Show questions less often when proven retained
- Show questions more often again if forgotten

**Lifecycle management:**
- "Correct" / "Incorrect" / "Outdated" feedback buttons
- Notecards marked outdated trigger "what changed?" prompts
- Metadata: `created_date`, `last_reviewed`, `next_review`

**Separate deck:** Explicit review sessions, not in-context prompts. This is cache warming—keeping the right facts hot for quick access. Active knowledge maintenance so your mental index stays current.

### What This Solves

Closes the loop between Think (synthesis) and Recall (retrieval). Makes knowledge durable instead of ephemeral. Addresses the research finding that conversational PKM lacks proactive retrieval mechanisms.

---

## 2. Pair Writing Mode: Reclaiming Authorship Without Losing the Assist

**The Gap:** The workflow treats manual editing and AI assistance as separate domains. You either do it yourself (losing the assist) or hand everything to Claude (losing your voice). The friction of switching between modes (opening edit window, saving, closing, pasting link to chat, adding request) creates ceremony that discourages iteration.

**The Solution:** A split-screen editor mode for collaborative revision between human and AI.

### Layout

**Left pane:** Markdown editor (human territory)
**Right pane:** Conversation log (AI territory)

Both sides see the same document but with different affordances.

### Core Interactions

**1. Highlight + Right-Click Menu**

Highlight any text, right-click for context menu:
- **Validate** - Is this true? Fact-check the claim.
- **Critique** - Is this good writing? Analyze clarity, voice, structure.
- **Tighten** - Make more concise without losing meaning.
- **Embellish** - Add detail, nuance, or context.
- **Correct** - Fix typos and grammar only (no content changes).
- **Polish** - Correct + improve prose (small, controlled improvements).

Each option sends the selection + surrounding context to Claude in the right pane. Claude responds there, not inline. The human reads the response and manually applies changes if desired.

**Why manual application?** The friction forces internalization instead of blind acceptance. You're learning what good revision looks like.

**2. Highlight + Jump to Chat**

Highlight text, hit a hotkey (Tab? Cmd+Enter?), cursor jumps to the chat input with selection metadata attached:

```
[Selected: "The cathedral effect suggests that..."]
YOU: Is this citation accurate? Also, is my framing too hedged?
CLAUDE: [responds with fact-check + voice critique]
```

**3. The "What Changed?" Flow**

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

### Technical Requirements

**Shadow version history:** Track previous versions of each section/paragraph so "Compare to previous version" can diff against that state.

**Context passing:** When you highlight text and invoke Claude, send:
1. The selected text
2. Surrounding context (paragraph before/after)
3. Shadow version if it exists (for "what changed?" requests)
4. Conversation history (Claude remembers prior discussion)

### What This Solves

1. **Closes the loop** between manual edits and AI edits (they coexist in split view)
2. **Reclaims authorship** without losing the assist (you edit, Claude advises)
3. **Creates a learning loop** where you and Claude both improve over time through the "what changed?" flow

Addresses the research concern that conversational insights remain ephemeral unless deliberately extracted into permanent form. This mode makes the extraction process continuous rather than separate.

---

## 3. Three Cognitive Systems: Temporal, Structural, Momentary

Research identified that the workflow optimizes for one cognitive profile (verbal, ADHD, engineering) and creates friction for visual-spatial thinkers, introverts, and detail-oriented processors. The solution isn't a single feature—it's recognizing that different cognitive operations need different affordances.

### The Breakdown

| System | Purpose | Time Dimension | Output | Status |
|--------|---------|----------------|--------|--------|
| **Spaced Repetition** | Cache warming | Temporal (decay/review) | Questions to test recall | Proposed |
| **Spatial Relationships** | Pattern recognition | Timeless (structural) | Hidden connections between notes | Future exploration |
| **Contextual Prompts** | Deepen thinking | Momentary (present focus) | Questions about current context | Already implemented |

**Spaced Repetition** (described above) addresses temporal knowledge decay through active recall.

**Spatial Relationships** would use embeddings/clustering to find notes that are surprisingly close in meaning despite no explicit links:
- "You have 3 notes about 'boundaries' and 3 notes about 'REST API design' in close proximity. What's the connection?"
- "Your leadership notes and architecture notes share vocabulary. Is that intentional?"
- "'Conviction' appears in both team charter and project planning contexts—same concept or different?"

This serves visual-spatial thinkers who process relationships through proximity rather than verbal description. It's pattern recognition—seeing structures you didn't design.

**Contextual Prompts** (already implemented via `contextual-prompts.md`) provide in-the-moment scaffolding for deeper engagement with current focus. Pure interrogation of the present, no temporal or spatial discovery.

### What This Solves

Acknowledges that no single processing mode fits all cognitive profiles. The conversational "Think" phase should be one option, not the only option. Addresses research findings about cognitive profile bias and the need for visual/silent/structured modes.

---

## Open Questions and Research Directions

### For Spaced Repetition
- How does the LLM decide what's "notecard-worthy"?
- What makes a good factual question vs. synthesis question?
- How do we handle the "this is outdated" signal? Just hide the card, or use it to trigger "what changed?"?

### For Pair Writing Mode
- When does the shadow version get created? (Every Claude generation? Every save? Manually triggered?)
- How long does shadow version persist? (Until collapsed? Until you move sections? Forever in metadata?)
- Does conversation log persist with the file? (Stored in markdown as comments? Separate database?)

### For Spatial Relationships
- What embedding model? (Sentence transformers, OpenAI embeddings, etc.)
- What distance threshold means "surprisingly close"?
- How do we present discoveries without overwhelming the user?

### Cross-Cutting Concerns
- Where do these features live in the Memory Loop UI?
- How do we avoid cognitive load from "too many prompts"?
- Which cognitive difficulties are desirable (create learning) vs. unnecessary (just friction)?

---

## The Pattern: Strategic Friction

These three explorations share a common principle: **add friction where it creates learning, remove it where it just makes things harder**.

**Spaced Repetition** adds strategic friction—regular testing creates the retrieval practice that makes knowledge durable. This is desirable difficulty.

**Pair Writing Mode** removes ceremony (switching between editor and chat) while preserving the friction of manual application (you internalize revisions). This distinguishes necessary engagement from unnecessary overhead.

**Spatial Relationships** surfaces patterns you didn't consciously create, triggering synthesis without forcing immediate verbal articulation. This respects different cognitive processing modes.

The research tension—task performance vs. learning outcomes—resolves when you recognize that **the right friction in the right places creates both**. The workflow already preserves effortful engagement through interactive rituals. These features extend that principle into retrieval, revision, and cognitive diversity.

---

## Implementation Priority

**Next:** Spaced repetition gives immediate practical value—stops you from losing track of work facts. Addresses the most critical research gap (no systematic retrieval practice).

**Soon:** Pair writing mode closes the authorship loop and creates a learning mechanism through "what changed?" analysis. Addresses concerns about ephemeral conversational insights.

**Future:** Spatial relationships exploration for visual-spatial thinkers. Requires significant UX design work for a cognitive style the primary developer doesn't share, but research shows it matters for accessibility.

---

## Related Documents

- [[llm-integrated-pkm|Main LLM-Integrated PKM Research]]
- [[Landscape-Results|Landscape Research Results]]
- [[Critique-Results|Critique Research Results]]
