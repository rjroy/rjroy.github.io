---
title: Project Quality
date: 2026-01-02
draft: false
tags:
  - quality
  - software-engineering
  - standards
---

# Project Quality

What makes a project "good"? This note captures my current thinking on source and project quality, developed through an interview process with Claude.

## The Five Pillars

### 1. Code Review Discipline (Most Important)

All code must be reviewed. No exceptions regardless of urgency or length.

- No direct commits to main branch
- PRs are mandatory
- Every PR references the issue that requested the change
- Commit messages provide enough detail to support forensics when tracking down problems

This is the bedrock. Without review, the other pillars erode.

### 2. Test Coverage

Coverage percentage is the primary metric because it's measurable. This works when the code is structured for testability (small functions that do one thing).

**Unit tests:** Write them alongside the code. If the function is small and testable, a test that exercises it is meaningful by definition.

**Integration tests:** Start with golden path, add known edge cases, then let bugs drive expansion. Speculative analysis doesn't survive contact with reality. The process fills gaps over time.

### 3. Cohesion and Size

Files, functions, and classes should do no more than they need to. They should be no larger than is understandable.

**Heuristics (investigate if exceeded):**
- Functions: ~100 lines
- Files: ~800 lines

If you exceed the limit and leave it, add a comment explaining why.

Classes and files should be self-consistent. Everything in them belongs together; nothing is there by accident.

### 4. Self-Documenting Code

Code should do what it says. When it doesn't, add comments.

This means both:
- **Naming:** Functions and variables accurately describe behavior
- **Structure:** Code flow reads top-to-bottom without jumping around

Comments are needed when:
- Something is "clever" (clever code is a liability unless explained)
- Something looks wrong but shouldn't be changed
- Business logic isn't obvious from code alone

Avoid expressive syntax that crosses into obscurity. Code that reads like a sentence is great until the sentence requires specialized knowledge to parse or it hides what is really going on.

### 5. Reproducible Builds

A build should always generate the exact same binary unless the code has changed. Non-deterministic builds are a failure.

This extends to building on another machine:
- All external dependencies precisely declared and pinned
- README documents build scripts
- README points to style guides

Important enough to dedicate a release manager role to it.

## Summary

These pillars work together. Small, testable functions make coverage meaningful. Cohesive code is easier to review. Self-documenting code reduces review burden. Reproducible builds ensure the reviewed code is what ships.

Code review sits at the top because it's how you verify everything else.
