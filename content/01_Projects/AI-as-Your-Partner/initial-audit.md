---
title: Initial Rules Audit
description: Analyzing existing rules files for personal vs. universal characteristics
---

# Initial Rules Audit

Examining `~/.dotfiles/config/claude/rules/` to understand what's personal, what's universal, and what's interesting.

## The Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | 5-step workflow: Research → Plan → Execute → Test → Review |
| `development-basics.md` | Mandatory practices for all code |
| `workflows/research-caching.md` | Persist fetched docs between sessions |
| `workflows/testing-review.md` | Testing philosophy + review requirements |
| `workflows/git.md` | .gitignore patterns and commit hygiene |
| `workflows/pull-requests.md` | Branching and PR workflow |
| `python/setup.md` | Python project structure and tooling |
| `typescript/setup.md` | TypeScript project structure and tooling |

---

## Classification Attempt

### Clearly Universal (Best Practices)

These are things *everyone* should probably do:

- **"Never commit secrets"**: Not personal. Just correct.
- **"Use .gitignore"**: Standard hygiene.
- **"Write unit tests"**: Industry consensus.
- **"Linting catches mistakes"**: Objectively true.

### Clearly Personal (Choices)

These encode *preferences* that reasonable people might differ on:

- **`uv` for Python, `bun` for TypeScript**: Opinionated tool choices. Many use pip/poetry, npm/yarn.
- **`ruff` for linting**: Fast, but flake8/pylint still common.
- **Research caching in `docs/research/`**: Unique workflow pattern. Most don't do this.
- **"Use a sub-agent with fresh context to review"**: Novel practice I've never seen elsewhere.
- **"Automated reviewers are frequently wrong"**: Earned skepticism, not universal wisdom.
- **ADRs as mandatory**: Many teams skip these entirely.

### The Interesting Middle Ground

Some rules *sound* universal but encode *values*:

- **"The specific style matters less than having one and enforcing it"**: This is a *philosophy*, not a fact. Some would argue certain styles are objectively better.
- **"A task is not complete until tests exist"**: Sounds universal, but *many* developers ship without tests. This is a standard you hold, not a universal truth.
- **"All changes go on branches, never directly to main"**: Common, but solo devs often commit to main. This encodes a *team-shaped* workflow even for personal projects.

---

## Patterns I Notice

### 1. Universal Rules Are Defensive

The "universal" rules prevent disasters:
- Don't commit secrets (irreversible)
- Use .gitignore (prevents mess)
- Don't commit generated files (prevents bloat)

They're about **avoiding harm**.

### 2. Personal Rules Are Generative

The personal rules create outcomes:
- Research caching → knowledge compounds
- Sub-agent review → catches blind spots
- ADRs → decisions are documented
- Specific tool choices → consistency

They're about **building capability**.

### 3. The Workflow Is the Most Personal Part

The 5-step workflow (Research → Plan → Execute → Test → Review) isn't standard. It's a *methodology*. It encodes:
- A belief that research should precede action
- A belief that planning is distinct from execution
- A belief that self-review is insufficient (use fresh context)

This is a *way of thinking about work*, not a technical practice.

---

## Hypothesis Refinement

Original question: Are rules personal or universal?

Refined hypothesis: **Rules exist on a spectrum.**

```
UNIVERSAL ←————————————————————————→ PERSONAL
"Don't commit secrets"          "Use sub-agent review"
                ↑
        "Write tests"
    (Universal value, personal commitment)
```

The interesting work isn't in the extremes. It's in the middle, where values meet practice.

---

## Questions This Raises

1. **Can personal rules become universal?** If sub-agent review works well, should everyone do it?
2. **Do personal rules reflect personality or experience?** Is "automated reviewers are frequently wrong" a personality trait or a learned lesson?
3. **What's missing?** What personal patterns haven't been codified yet?

---

## Next Steps

- [ ] Research: How do others structure their AI rules files?
- [ ] Identify: What makes the 5-step workflow *mine*?
- [ ] Experiment: What happens if I remove a "personal" rule?
