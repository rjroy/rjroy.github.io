---
title: Community Patterns Research
description: How the developer community structures AI coding rules - research findings
date: 2025-12-31
tags:
  - ai
  - claude-code
  - research
---

# Community Patterns Research

Research into how the broader developer community approaches AI coding rules configuration.

## Key Finding: AGENTS.md is the Emerging Standard

[AGENTS.md](https://agents.md/) is emerging as a cross-tool standard for AI coding instructions:

- **Adoption**: 60,000+ repositories, 25+ AI tools supported
- **Governance**: Stewarded by Linux Foundation's Agentic AI Foundation
- **Philosophy**: "A README for agents" - complements human docs with machine context
- **Format**: Standard Markdown, no rigid schema, flexible structure

This matters for the personal vs. universal question: the *format* is converging (universal), but the *content* remains project-specific (personal).

## The Six Core Areas That Matter

GitHub analyzed 2,500+ repositories and identified [six areas](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/) that distinguish effective AI rules:

1. **Commands** - Specific tools with flags (`npm test`, not just "run tests")
2. **Testing** - How to run and write tests
3. **Project Structure** - What lives where
4. **Code Style** - Examples over descriptions
5. **Git Workflow** - Commit conventions, approval processes
6. **Boundaries** - "Always do" / "Ask first" / "Never do"

### Insight for This Project

These six areas feel *universal* - every project benefits from documenting them. But *how* you fill them out is personal:
- Do you prefer rebase or merge?
- What testing philosophy do you follow?
- What are *your* boundaries?

## What Works vs. What Fails

| Effective | Ineffective |
|-----------|-------------|
| Specific personas ("test engineer for React") | Generic ("be helpful") |
| Code examples | Abstract descriptions |
| Three-tier boundaries | Undefined constraints |
| Tech stack with versions | "Modern JavaScript" |
| Executable commands with flags | Tool names only |

### Insight for This Project

The failure modes are interesting: they're all forms of *vagueness*. Generic rules fail not because they're universal, but because they don't encode real preferences.

This suggests: **personal rules are specific rules**. The more specific your configuration, the more it reflects you.

## Tool-Specific Formats

### CLAUDE.md (Claude Code)
- Location hierarchy: global → project root → subdirectories
- Dynamic updates via `#` key during sessions
- Emphasis keywords: "IMPORTANT", "YOU MUST", "NEVER"
- Treat like a prompt to optimize repeatedly

### Cursor Rules
- Modern: `.cursor/rules/*.mdc` files with YAML frontmatter
- Pattern: Functional/declarative over OOP, guard clauses, descriptive names
- Shift from passive rules to active agent instruction

### Aider
- Configuration via `.aider.conf.yml`
- Supports loading multiple convention files
- Compatible with AGENTS.md standard

## Community Rule Categories

From [awesome-rules](https://github.com/continuedev/awesome-rules):

- **General**: Agent enablement, coding standards, error handling, security
- **Language-specific**: Python, TypeScript, Go, Rust, etc.
- **Framework-specific**: React, Next.js, FastAPI, etc.
- **Code quality**: Clean code, linting, type safety
- **Documentation**: API docs, changelogs, comments
- **Testing**: Unit, integration, E2E, TDD
- **DevOps**: CI/CD, Docker, monitoring

### Insight for This Project

This taxonomy is revealing. The categories are universal (everyone needs testing rules), but the *choices within categories* are personal:
- Which testing framework?
- What level of coverage?
- TDD or test-after?

## Connections to My Rules

Comparing community patterns to `~/.dotfiles/config/claude/rules/`:

| My Category | Community Equivalent | Notes |
|-------------|---------------------|-------|
| Workflows | General/Agent enablement | My 5-step workflow is more opinionated than most |
| Git workflow | Universal pattern | My rules are standard |
| Testing | Universal pattern | My mocking requirements are stricter than typical |
| Python/TypeScript setup | Language-specific | Tool choices (uv, bun) are personal |

## RFC 2119 Keywords Pattern

Community best practice: Use RFC 2119 keywords for clarity:
- **MUST** - Absolute requirement (enforce in CI)
- **SHOULD** - Strongly recommended
- **MAY** - Optional

I don't currently use this convention consistently. Worth adopting?

## Key Takeaways

1. **Format is converging** - AGENTS.md as the standard reduces tool fragmentation
2. **Content remains personal** - What you put in those files reflects your workflow
3. **Specificity signals personality** - Vague rules are neither universal nor personal; they're just weak
4. **Categories are universal, choices are personal** - Everyone needs testing rules; your testing philosophy is yours
5. **The six core areas are a good checklist** - Commands, testing, structure, style, git, boundaries

## Questions This Raises

- Should I migrate to AGENTS.md for cross-tool compatibility?
- Are my rules specific enough to be truly personal?
- What's missing from my rules that the community considers essential?
- Is my 5-step workflow (research → plan → execute → test → review) actually unusual?

## Sources

- [AGENTS.md Specification](https://agents.md/)
- [Anthropic: Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [GitHub Blog: Lessons from 2,500+ Repositories](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
- [awesome-rules Repository](https://github.com/continuedev/awesome-rules)
- [Cursor Rules Documentation](https://docs.cursor.com/context/rules)
- [dotcursorrules.com](https://dotcursorrules.com)

---

*Research conducted 2025-12-31*
