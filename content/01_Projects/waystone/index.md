---
title: Waystone
description: An AI code quality audit plugin to catch the failures AI won't catch itself
date: 2024-12-31
tags:
  - ai
  - claude-code
  - plugin
  - code-quality
---

# Waystone

**An audit plugin for Claude Code that catches what AI-generated code gets wrong.**

## The Problem

AI writes code fast. It also:
- Writes 1000-line files and never hooks them up
- Assumes how APIs work instead of reading docs
- Patches failures with sledgehammers instead of understanding
- Writes tests that cover structure but not behavior
- Creates code nobody asked for

Rules and workflows help, but they describe *process*. They don't verify *outcomes*.

## The Approach

Waystone treats quality as verifiable criteria, not just steps to follow.

**Universal quality** (applies everywhere):
- Error paths are logged
- Public functions have tests
- APIs are used as documented, not guessed

**Project quality** (configurable):
- Coverage thresholds
- File and function size limits
- Domain-specific invariants

## Key Components

### Agents
- **Structural Auditor**: Checks metrics (size, coverage, logging)
- **Semantic Auditor**: Does the code do what it claims?
- **API Contract Auditor**: Were docs read, or did AI guess and patch?
- **Spec Tracer**: Can this code trace back to a requirement?

### Commands
- `/waystone:audit-init`: Build a checklist of files to audit
- `/waystone:audit-run`: Process the checklist with agents
- `/waystone:audit-dead-code`: Find orphaned, unreachable code
- `/waystone:audit-connectedness`: Trace files to entry points

## Status

Planning phase. See [[PLAN|the full roadmap]] for details.

## Why "Waystone"?

A waystone marks a path. This plugin marks where AI went wrong, and lights the way back.
