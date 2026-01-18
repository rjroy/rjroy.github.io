---
title: You're Not Configuring a Tool
description: Rules files don't constrain AI behavior. They build the cognitive infrastructure that shapes how AI thinks about work
tags:
  - ai
  - claude-code
  - methodology
  - partnership
date: 2025-01-18
---

# You're Not Configuring a Tool: You're Training a Reasoning Partner

When you write a CLAUDE.md or AGENTS.md file, you're not setting preferences. You're not configuring a tool. You're building the cognitive infrastructure that determines how AI reasons about work.

This distinction matters. Configuration is shallow: you turn features on and off, adjust thresholds, set defaults. Training is deep: you shape how the system thinks, what questions it asks itself, what it considers before acting.

## The Rules File Illusion

Most people treat rules files like configuration. They write statements like:
- "Use TypeScript"
- "Write tests"
- "Follow best practices"

These feel like constraints. They're not. They're aspirations without teeth. AI already wants to write good code, use modern tools, and follow best practices. What it lacks is *your definition* of what those mean.

The real function of rules files isn't to constrain AI. It's to train AI to reason the way you do.

## What You're Actually Building

When you write "Research before acting. Search the web for current practices, check documentation, read existing code. NEVER propose changes to code you haven't read," you're not just setting a boundary. You're teaching a thinking pattern:

1. What does preparation look like?
2. What sources of information matter?
3. What sequence do you follow?
4. What's unacceptable?

You're not saying "do research." You're defining what research *is* in your context. You're building the reasoning infrastructure that determines how AI approaches problems.

## Format is Universal, Content is Personal

The [AGENTS.md standard](https://agents.md/) has spread to 60,000+ repositories because it provides structure without prescribing content. Everyone needs the same six sections:
- Commands (what to run)
- Testing (how to verify)
- Project Structure (where things live)
- Code Style (what patterns to follow)
- Git Workflow (how to commit)
- Boundaries (always/ask/never)

But what you put in those sections encodes your entire approach to software development. Your testing philosophy. Your tolerance for technical debt. Your definition of done. Your boundaries.

Two developers with identical tech stacks will fill those sections completely differently, and they'll get completely different partners as a result.

## Specificity Signals Personality

Vague rules are neither universal nor personal. They're just weak.

| Weak | Strong |
|------|--------|
| "Write good tests" | "Unit tests must not require external resources; mock everything including time" |
| "Use modern JavaScript" | "TypeScript 5.3+ with strict mode enabled. Use `bun` for runtime and testing" |
| "Code review is important" | "Use a sub-agent with fresh context to review at critical points. The reviewer catches issues the implementer missed" |

The strong versions aren't just more specific. They encode reasoning patterns:
- What makes a test "good"?
- What does "modern" mean in practice?
- Why does review work, and how do you exploit that?

When you write specific rules, you're not being pedantic. You're training the AI to think about problems the way you do.

## The Process Layer is the Partnership

Garry Kasparov discovered something crucial when studying human-AI chess partnerships: "weak human + machine + better process was superior to a strong computer alone."

The process layer (the coordination infrastructure) matters more than either party's individual capability.

This is why rules files work. They're not constraints on what AI can do. They're the process layer that makes the collaboration effective. The workflow (research → plan → execute → test → review) isn't a checklist. It's the interface. It's how you and the AI coordinate.

Without explicit process:
- AI optimizes for "done fast" (you care about "done right")
- AI stops when code compiles (you care about correctness)
- AI treats your review as the verification step (you're now the safety net)

With explicit process:
- AI knows when to stop and ask questions
- AI knows what "done" means before it starts
- AI verifies its own work before presenting results

## You're Defining the Partner, Not Negotiating With One

With human partnerships, you start with shared cultural assumptions and negotiate the gaps. Both parties bring reasoning patterns, work habits, and judgment to the table. You're defining the scope and boundaries of collaboration.

With AI, you're building the entire reasoning foundation from scratch. "Research before acting" isn't a scope boundary. It's teaching how to think about work, not just what work to do.

This is why copying someone else's rules wholesale doesn't work. Their rules trained their partner. You need to train yours.

## What This Means in Practice

When you write rules:

**Don't write aspirations.** AI already has those. Write constraints that encode your reasoning patterns.

**Don't write generic best practices.** Write your specific implementation of those practices with rationale.

**Don't write what to do.** Write how to think about what to do.

**Don't write boundaries without process.** Boundaries without process just create frustration. "Never commit secrets" is meaningless without "Add `.env` to `.gitignore` and check for credential patterns before commits."

**Do include verification.** AI defaults to "done when it looks done." Teach it how to prove correctness.

**Do provide calibration examples.** "Sounds like me" vs "doesn't sound like me" trains judgment, not just compliance.

**Do explain why rules exist.** Rationale lets AI apply judgment in edge cases rather than following rules blindly.

## The Goal Isn't Perfect Rules

The goal is rules that train the AI to think about work the way you do. When that works, you get:
- Proposals that match your standards without extensive review
- Verification that catches issues before you see them
- A partner that asks the questions you would have asked
- Output that reflects your judgment, not just your preferences

You're not configuring a tool. You're training a reasoning partner to carry your cognitive patterns into execution.

The rules file is the training ground. What shows up to work afterward is shaped by what you built.

## Related

- [[what-makes-good-ai-rules-files|What Makes Good AI Rules Files]]
- [[ai-has-architectural-predispositions|AI Doesn't Just Have Biases—It Has Architectural Predispositions]]
- [[Ideas/AI-as-Your-Partner/index|AI as Your Partner]]
