---
title: The Workflow - Research, Plan, Execute, Test, Review
description: Why each step in the 5-step workflow exists and what it does for AI collaboration
---

# The Workflow

```
Research → Plan → Execute → Test → Review
```

Each step exists to focus the AI. They also happen to be what I think is important as a human developer.

This isn't a checklist. It's a methodology—a *way of thinking about work* that applies whether you're working alone, with another human, or with an AI.

---

## Research: Focus Context and Fill Gaps

**Start with research to focus the context and fill gaps.**

Research solves the "confident but wrong" problem. Both humans and AI can make assumptions that seem reasonable but miss critical context—existing patterns in the codebase, domain-specific constraints, or current best practices that have evolved since training data was collected.

For AI specifically, research anchors the work in reality rather than pattern-matched guesses. When the AI searches the web for current practices or reads through existing code first, it's building a foundation of *actual facts* rather than *plausible-sounding assumptions*.

### What This Looks Like in Practice

- Check `docs/research/` before fetching external documentation
- Store fetched docs with frontmatter containing `description` and `download_date`
- Refresh cached docs older than one week
- Search the codebase for existing patterns before inventing new ones

### Why It Matters

The alternative is starting from assumptions. AI is very good at generating plausible code. "Plausible" is not the same as "correct for this context."

---

## Plan: Identify Edge Cases Before They Happen

**Build a plan before acting so you can identify edge cases before they happen.**

Planning creates a checkpoint for human input. A plan can be reviewed, adjusted, or rejected cheaply. Code cannot.

This is the difference between "let me show you what I'm thinking" and "here's 500 lines I wrote based on my interpretation of your request."

### What This Looks Like in Practice

- Define the approach before implementation
- Identify what could go wrong
- Consider alternative approaches and why you're choosing this one
- Get buy-in before investing effort

### Why It Matters

For AI, planning is crucial because it separates *interpretation* from *execution*. If the AI misunderstands the goal, you want to catch that at the plan stage—not after it's built something impressive but wrong.

For humans, this is the same discipline. You've just internalized it enough that you don't always notice when you skip it.

---

## Execute: Do the Work

**Then do the work.**

With research and planning done, execution becomes surprisingly straightforward. You're not making decisions while coding—you're implementing decisions already made.

This separation reduces cognitive load and error rates. The "what should I build?" question is already answered. Now you're just building it.

### What This Looks Like in Practice

- Follow the plan
- When you encounter something unexpected, ask: is this a plan problem or an execution problem?
- If the plan needs to change, stop and change the plan first

### Why It Matters

Execution without planning leads to "I'll figure it out as I go." That works for small tasks. For anything complex, it leads to rework, dead ends, and architectural decisions made under time pressure.

---

## Test: The "Nice to Have" That Isn't

**Testing is emphasized because it's often treated as "nice to have" or "low priority"—caused by the fact most people don't write tests.**

This is a cultural problem. When most developers ship without tests, skipping tests feels acceptable. The norm becomes "we should add tests later," which means "we won't add tests."

### What This Looks Like in Practice

- All production code requires unit tests
- A task is not complete until tests exist and pass
- "If you're about to say 'tests can be added later,' stop—add them now"
- Unit tests must not require external resources—mock everything including time

### Why It Matters

This is especially important for AI-generated code. AI can produce code that is syntactically correct but behaviorally wrong in subtle ways. Tests catch these. Tests also serve as executable documentation of intended behavior.

The rule isn't "write tests because it's best practice." The rule is "the work isn't done until tests prove it works."

---

## Review: Fresh Eyes, Fresh Context

**Finally, an independent review. With a fresh context. Just like you would for development.**

The person who wrote the code is the *worst* person to catch its flaws. They're too close to it, too invested in their approach.

### What This Looks Like in Practice

- Use a sub-agent with fresh context to review at critical points
- The reviewer catches issues the implementer missed due to being too close to the work
- The reviewer doesn't have the same "thread" of reasoning that led to the original implementation

### Why It Matters

For AI, this exploits a real architectural property: context shapes output. The sub-agent reviewing your work doesn't carry the baggage of having already decided an approach was correct. It can ask "wait, why did we do it this way?" without defensiveness.

This mirrors how professional development actually works. Code review isn't optional. Self-review is insufficient.

---

## Why This Works for AI Partnership

This workflow treats AI as a collaborator that needs the same discipline as a human developer. The steps create natural checkpoints where:

| Step | What It Does |
|------|--------------|
| Research | Ensures we're working with facts, not assumptions |
| Plan | Gets human buy-in before significant effort |
| Execute | Focused and efficient because decisions are already made |
| Test | Proves the work actually works |
| Review | Catches what the implementer missed |

Each step constrains the AI in productive ways—not limiting capability, but channeling it toward reliable outcomes.

---

## The Meta-Point

This workflow isn't just about making AI more effective. It's about making *you* more effective when working with AI.

The structure prevents the failure mode of AI charging ahead confidently in the wrong direction. But it also prevents the human failure mode of accepting AI output uncritically because it looks right.

These are the same disciplines that make human developers effective. The difference is that with AI, you have to be explicit about them. You can't assume the AI internalized these practices the way an experienced developer has.

---

## Related

- [[01_Projects/AI-as-Your-Partner/index|AI as Your Partner]] — The parent project
- [[01_Projects/AI-as-Your-Partner/initial-audit|Initial Audit]] — Where this workflow was identified as "the most personal element"
- [[01_Projects/AI-as-Your-Partner/findings-2025-12-31|Session 1 Findings]] — Full analysis from first session
