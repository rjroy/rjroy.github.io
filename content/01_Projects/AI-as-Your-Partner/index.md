---
title: AI as Your Partner
description: Exploring what makes good AI rules files, not universal best practices, but personal configurations that make AI work for you
tags:
  - project
  - ai
  - claude-code
  - methodology
---

# AI as Your Partner

## Project Overview
**Start Date**: 2025-12-31
**Target Completion**: When the philosophy is documented well enough to share as an Area
**Status**: Active

## Objectives
- [ ] Articulate the difference between "correct AI behavior" and "AI behavior that fits you"
- [ ] Document the principles behind effective personal rules files
- [ ] Create a shareable framework others can use to develop their own approach

## Context

Everyone talks about making AI "do the right thing": follow best practices, avoid hallucinations, produce correct code. But there's a different question worth asking:

**How do you make AI do the right thing *for you*?**

Rules files (CLAUDE.md, .cursorrules, etc.) aren't just about technical correctness. They encode *preferences*, *workflows*, *values*. The question is whether these are genuinely personal (reflecting how *you* think and work) or whether they should converge on universal patterns everyone uses.

This project starts from a hypothesis: **the most effective AI configurations are deeply personal**, and that personalization is what transforms AI from a generic tool into something that feels like a collaborator.

## The Central Question

Is there a meaningful distinction between:
- Universal rules (everyone should use these)
- Personal rules (these work for *me*)

Or is "personal" just "universal rules I haven't discovered yet"?

## Initial Evidence

I have a working set of rules in `~/.dotfiles/config/claude/rules/`:
- Workflow rules (research caching, testing, git, PRs)
- Language setup rules (Python, TypeScript)
- Development basics

These feel personal, but are they? Would anyone benefit from the same patterns?

## Success Criteria

This project is complete when:
1. I can articulate *why* certain rules feel personal vs. universal
2. I have documented patterns that help others build their own rules (not copy mine)
3. The framework is clear enough to graduate to an Area for ongoing refinement

## Open Questions

- What makes a rule "personal" vs. "best practice"?
- Do personal rules eventually converge toward best practices as you learn?
- How do you discover what's personal about your workflow?
- Is "AI as partner" a meaningful metaphor, or just anthropomorphization?
- What's the cost of over-personalization? Under-personalization?

## Key Resources

- [[02_Areas/index|Areas]] - Where this graduates when complete
- My existing rules: `~/.dotfiles/config/claude/rules/`
- [[01_Projects/AI-as-Your-Partner/initial-audit|Initial Audit]] - Classification of rules as personal vs. universal
- [[01_Projects/AI-as-Your-Partner/findings-2025-12-31|Session 1 Findings]] - Full analysis from first session
- [[01_Projects/AI-as-Your-Partner/research/community-patterns-research|Community Patterns Research]] - How others structure AI rules
- [[01_Projects/AI-as-Your-Partner/the-workflow|The Workflow]] - Why each step in Research → Plan → Execute → Test → Review exists

## Progress Log

### 2025-12-31 - Project Initiated
- Created project structure
- Framed the central question: personal vs. universal AI configuration
- Identified existing rules as initial evidence to examine

### 2025-12-31 - Initial Audit Complete
- Classified all 7 rules files: [[01_Projects/AI-as-Your-Partner/initial-audit|Initial Audit]]
- Refined hypothesis: rules exist on a spectrum, not a binary
- Key insight: universal rules are *defensive* (prevent harm), personal rules are *generative* (build capability)
- The 5-step workflow is the most personal element: it's a methodology, not a practice

### 2025-12-31 - Community Research Complete
- Researched AGENTS.md standard, Cursor rules, Aider conventions
- Key insight: **format is converging (universal), content remains personal**
- The six core areas: commands, testing, structure, style, git, boundaries
- Specificity signals personality; vague rules are neither universal nor personal
- Full findings: [[01_Projects/AI-as-Your-Partner/community-patterns-research|Community Patterns Research]]

### 2025-12-31 - Workflow Deep Dive
- Articulated *why* each step in the 5-step workflow exists
- Key insight: each step focuses the AI by creating checkpoints for human input
- The workflow isn't about AI; it's about good development practice made explicit
- Full analysis: [[01_Projects/AI-as-Your-Partner/the-workflow|The Workflow]]

## Next Actions
- [x] Audit my existing rules files for "personal" vs. "universal" characteristics
- [x] Research how others approach AI configuration (community patterns)
- [x] Dig into *why* the 5-step workflow feels right → [[01_Projects/AI-as-Your-Partner/the-workflow|The Workflow]]
- [ ] Identify 2-3 rules that feel distinctly *me* and articulate why
- [ ] Consider AGENTS.md migration for cross-tool compatibility
- [ ] Evaluate if my rules are specific enough to be truly personal

Graduates to an Area when the exploration becomes a documented framework.
