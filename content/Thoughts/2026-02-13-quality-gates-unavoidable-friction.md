---
title: Quality Gates That Can't Be Bypassed
date: 2026-02-13
tags:
  - ai
  - quality
  - guardrails
  - tooling
---

## The Problem

AI will skip quality steps if you let it. The answer isn't asking it to run tests—it's making tests unavoidable. Pre-commit hooks, CI gates, linters that block merges. The environment enforces rigor, not the prompt.

## Source Context

- How I AI: "Beyond Vibe Code: Advanced AI Engineering" (John Lindquist)
  - Stop hooks in Claude Code for automated quality checks
  - Elevating casual AI coding to production-grade practices

## The Core Idea

You need to be mindful of quality control. It's not just a matter of letting Claude tell you it needs to do the hooks or needs to do quality checks—that's one thing. But you need to have some things that it just can't skip.

One of the ways you can do this with Git is with hooks, with a pre-commit hook that forces it to basically see the errors in what it did. You force it to run tests, you force it to run the lint, and you force it to run the type check, because it's just how the tool is set up.

In other words, you need to have tools that it has to use to do things that will be the guard.

## The Deeper Pattern

This is about **control surfaces in a world where AI removes friction**. Friction used to be the quality gate (writing code is slow, so you think before you write). Now friction is gone, so you need *intentional* friction—structures that force good behavior because the natural constraint disappeared.

## Open Questions

**On quality gates:**
- What happens when AI gets good enough to bypass the gates? (Write code that passes linting/tests but is still subtly wrong.)
- Do we need *semantic* gates, not just syntactic ones? (Does this actually solve the problem, not just pass CI?)
- How do you test for "did the right thing" when "did the thing correctly" is easy to automate?

**On intentional friction:**
- If speed is no longer a constraint, what should the new constraints be?
- How do you design environments that enforce judgment without killing velocity?
- When the AI can generate passing tests alongside passing code, what's the real quality signal?

**On trust:**
- How much should you trust AI output that passes all automated checks?
- What's the role of human review when machines can review each other? (Model-vs-model QA)
- Is the goal "trust but verify" or "verify everything"?

**On evolution:**
- As AI capabilities improve, do the gates need to get smarter or dumber? (Stricter rules vs more sophisticated validation?)
- What's the half-life of a quality gate in a world where AI trains on its own output?
