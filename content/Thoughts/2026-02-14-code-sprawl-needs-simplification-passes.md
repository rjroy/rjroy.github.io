---
title: "Code Sprawl Needs Simplification Passes"
date: 2026-02-14
tags:
  - quality
  - tooling
---

One thing that happens when you use AI codegen is that it can sprawl just a bit. Even if you have an entire pipeline for brainstorming, research, specification, planning, implementation, tests, review, and validation, you'll want another phase after all that which goes through every file and does a simplification pass. Maybe it needs to be a two-pass thing with two layers of simplification:

1. One layer that simplifies each file
2. One layer that does more architectural simplifications
