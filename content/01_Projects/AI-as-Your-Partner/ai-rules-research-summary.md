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
**Completion Date**: 2026-01-09
**Status**: Complete

## Summary

This project explored the distinction between universal AI rules (best practices everyone should follow) and personal AI rules (configurations that make AI work for *you*). The central question: is "personal" just "universal rules I haven't discovered yet," or is there meaningful value in personalization?

**Primary Output**: [[02_Areas/AI-as-Your-Partner/what-makes-good-ai-rules-files]]

## Key Findings

### The Spectrum Model

Rules aren't binary. They exist on a spectrum from universal to personal:

- **Universal (Defensive)**: Prevent harm. Don't commit secrets, use .gitignore, run linters. Everyone should do these.
- **Personal (Generative)**: Build capability. Research caching, sub-agent review, specific tool choices. These reflect your workflow and values.
- **Middle Ground**: Values disguised as practices. "Write tests" is universal as a value, personal as a commitment level and philosophy.

### Three Categories of Guidance

1. **Mechanics**: How-to knowledge that doesn't vary by person. Can be shared wholesale.
2. **Quality Standards**: Your definition of done. Partly universal, partly personal.
3. **Verification**: How you prove work is correct. Most commonly skipped, most important for AI.

### Specificity Signals Personality

Vague rules are neither universal nor personal. They're just weak. The more specific your rules, the more they encode actual judgment. "Write good tests" tells AI nothing. "Unit tests must not require external resources; mock everything including time" changes behavior.

### Format Converges, Content Remains Personal

AGENTS.md is emerging as a cross-tool standard (60,000+ repositories, 25+ AI tools). The six core areas that matter: commands, testing, project structure, code style, git workflow, and boundaries. Everyone needs to document these areas, but *how* you fill them out is personal.

## Objectives

- [x] Articulate the difference between "correct AI behavior" and "AI behavior that fits you"
- [x] Document the principles behind effective personal rules files
- [x] Create a shareable framework others can use to develop their own approach

## Research Summary

The project involved three research phases:

1. **Rules Audit**: Classified existing rules files as universal, personal, or middle-ground. Discovered the defensive/generative pattern.

2. **Community Research**: Examined AGENTS.md standard, Cursor rules, Aider conventions. Found format convergence with content personalization.

3. **Workflow Analysis**: Articulated why the 5-step workflow (Research, Plan, Execute, Test, Review) exists. Each step creates checkpoints for human input and focuses AI toward reliable outcomes.

## Key Resources

- [[02_Areas/AI-as-Your-Partner/what-makes-good-ai-rules-files|What Makes Good AI Rules Files]] - The published article
- [AGENTS.md Specification](https://agents.md/)
- [GitHub Blog: Lessons from 2,500+ Repositories](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
- [awesome-rules Repository](https://github.com/continuedev/awesome-rules)
