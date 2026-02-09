---
title: "Agentic PKM for Memory Loop: Design Options"
---

# Agentic PKM for Memory Loop: Design Options

## The Core Insight

The original research concluded that assistants + smart automation are likely optimal for PKM, with monitoring-only agency as the prudent path. Our discussion refined this further:

**The Einstein Test for Notes**: If an agent can't parse what you meant, maybe you haven't actually worked it out yet. The agent's confusion becomes a proxy signal for your own potential confusion—not quality control, but a thinking prompt.

This reframes the agentic PKM problem from "autonomous knowledge management" to "asynchronous rubber duck debugging."

---

## Current Memory Loop Data Flow

| Mode | Function | Output |
|------|----------|--------|
| Capture | Quick one-liners | → Daily note (ordered) |
| Meetings | Quick capture + immediate Think session | → Meeting file + expanded notes |
| Think | AI chat with vault context | → Creates/modifies files |
| Adjust | Manual editing | → Direct file changes |

All four modes represent potential trigger points for an agentic monitoring system.

---

## Proposed Agent Architecture

### Monitoring-Only Agent with Tiered Outputs

```
File Change Event (any mode)
         ↓
    [Watcher Service]
         ↓
    [Analysis Agent]
         ↓
    ┌─────────┼─────────┐
    │         │         │
Connections  Contradictions  Confusion
    │         │         │
    ↓         ↓         ↓
  Inline     Inline    Think Prompt
  addition   addition  (invitation to
                       elaborate)
```

### Three Output Types

**1. Connections** (High confidence, additive)
- "This relates to [other note] where you discussed X"
- Output: Inline callout or backlink
- No human approval needed—purely additive

**2. Contradictions** (High confidence, additive)
- "This seems to conflict with [other note] where you said Y"
- Output: Inline callout linking both notes
- No modification of original content

**3. Confusion Prompts** (Low confidence, interactive)
- "I'm not sure I follow—when you wrote '[text]', what were you thinking about?"
- Output: Invitation to a Think session
- The agent's confusion *is* the nudge

### Key Design Principle

The agent never modifies your original content. It only:
- Appends observations (connections/contradictions)
- Invites elaboration (confusion)

This preserves the emergent, bottom-up nature of PKM while adding a "thinking partner" that notices things you might miss.

---

## The Context Problem

**Your vault**: ~400k tokens (exceeds 200k context window)
**Daily generation**: 5-7k tokens
**Growth pattern**: Bounded via regular synthesis

### Recommended: Two-Tier Context Strategy

**Tier 1: Claims Index** (~20-40k tokens)
A compressed, running document of key assertions extracted from notes:
- Stated beliefs ("I think X works better than Y")
- Factual claims ("Project launched in March")  
- Commitments/intentions ("I'm going to do X")

Updated when you synthesize. Checked against every new note for contradictions.

**Tier 2: RAG for Deep Dives**
When the claims index flags something interesting:
- Embed the new note
- Retrieve semantically similar source notes
- Full context comparison for detailed analysis

### Why Two Tiers?

Embeddings find *similarity*, not *contradiction*. "I love X" and "I hate X" are semantically close. The claims index provides structured assertions that make contradiction detection reliable. RAG then provides the full context when needed.

### Confusion Detection: No Index Needed

The "do I understand this?" check runs on the note in isolation. The agent assesses: "Could I explain what this person meant to a third party?" This is cheap—single note, no retrieval required.

---

## Cost Analysis

### Per-Operation Estimates (Claude Sonnet)

| Operation | Context Size | Cost |
|-----------|--------------|------|
| Embedding | ~negligible | ~$0.0001 |
| Confusion check (isolated) | ~2k tokens | ~$0.005 |
| Claims index check | ~30k tokens | ~$0.05 |
| Deep RAG comparison | ~50k tokens | ~$0.10 |

### Daily Estimates (5-7k tokens generated)

```
Confusion checks (all notes):     ~$0.05-0.10
Claims index checks (all notes):  ~$0.10-0.15  
Deep dives (20% trigger rate):    ~$0.03-0.05
                                  ─────────────
Daily total:                      ~$0.18-0.30
Monthly total:                    ~$5-9
```

### Cost Optimization Levers

1. **Batch processing** — Analyze daily notes at end of day instead of real-time
2. **Threshold gating** — Skip notes below N words
3. **Haiku triage** — Use Haiku to decide "worth deeper analysis?" before Sonnet
4. **Separate processes** — Run confusion checks (cheap) more frequently than contradiction checks (expensive)

---

## Implementation Considerations

### Trigger Timing Options

| Approach | Pros | Cons |
|----------|------|------|
| Real-time (on save) | Immediate feedback | Higher cost, potential interruption |
| End of day batch | Cost efficient, non-intrusive | Delayed feedback |
| On-demand | User controls when | Loses "monitoring" benefit |

**Recommendation**: Confusion checks could run real-time (cheap, valuable immediate feedback). Contradiction/connection checks batch at end of day.

### Claims Index Maintenance

The claims index is the key design problem. Options:

1. **Auto-extracted** — Agent extracts claims from every note automatically
   - Pro: Complete coverage
   - Con: Extraction errors compound, cost

2. **Synthesis-triggered** — Index updates only when you synthesize
   - Pro: Aligns with your existing workflow
   - Con: New claims not indexed until next synthesis

3. **Hybrid** — Light extraction on capture, full reconciliation on synthesis
   - Pro: Balance of coverage and accuracy
   - Con: More complex

### Output Surfaces

Where do agent observations appear?

| Output | Possible Surfaces |
|--------|-------------------|
| Connections | Inline callout in triggering note, backlinks on both notes |
| Contradictions | Inline callout with links to conflicting notes |
| Confusion prompts | Queue in Ground mode, notification badge, inline prompt |

**Key question**: Do confusion prompts interrupt you, or wait for you to check them?

---

## Open Questions

1. **What counts as a "claim" for the index?** Facts only? Opinions? Emotional states? Goals?

2. **How do you handle intentional evolution?** "I used to think X, now I think Y" isn't a contradiction—it's growth. How does the agent distinguish?

3. **What's the threshold for "confusing"?** Every terse capture will seem unclear without context. Do you want the agent asking about everything, or only notes that seem substantive but unclear?

4. **Where does the claims index live?** A hidden system file? A visible note you can review/edit? Part of a synthesis workflow?

5. **What happens when you dismiss a confusion prompt?** Does the agent learn? Does it just log and move on?

---

## Minimum Viable Implementation

If you wanted to test this pattern with minimal infrastructure:

**Phase 1: Confusion Detection Only**
- File watcher on vault
- On new note: send to Claude with prompt "Could you explain what this person meant to a third party? If not, ask a clarifying question."
- Store responses in a daily "Agent Questions" file
- Review when you want a thinking prompt

**Cost**: ~$1-2/month
**Infrastructure**: File watcher + single API call per note
**Value test**: Do the questions actually surface unfinished thinking?

**Phase 2: Add Contradiction Detection**
- Build claims index (start manually, then automate extraction)
- Check new notes against index
- Surface contradictions inline

**Phase 3: Connection Detection**
- Embed vault
- RAG for semantically similar notes
- Surface non-obvious connections

---

## Summary

The viable path for agentic PKM in Memory Loop:

1. **Confusion detection** — Cheap, runs in isolation, directly addresses the "do I understand this?" problem. Outputs thinking prompts, not judgments.

2. **Contradiction detection** — Requires a claims index (20-40k tokens). Checks new content against established assertions. Outputs inline additions, not modifications.

3. **Connection detection** — Standard RAG pattern. Useful but lower priority than the above.

**Total estimated cost**: $5-9/month at current vault size and generation rate.

**Key insight**: This isn't really "agency" in the technical sense. It's **monitoring + prompting**. The agent watches for signals (confusion, contradiction, connection) and surfaces them for human action. All authority stays with you. That's probably right for a thinking tool.
