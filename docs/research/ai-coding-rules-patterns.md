---
description: Community patterns for structuring AI coding assistant rules (CLAUDE.md, AGENTS.md, .cursorrules)
download_date: 2025-12-31
---

# AI Coding Rules: Community Patterns

Research on how the developer community structures instructions for AI coding assistants.

## The Emerging Standard: AGENTS.md

[AGENTS.md](https://agents.md/) is emerging as a cross-tool standard, now used by 60,000+ repositories and supported by 25+ AI coding agents including Claude Code, GitHub Copilot, Cursor, and Devin.

**Key characteristics:**
- Standard Markdown file at repository root
- No required schema - flexible structure
- Supports hierarchical nesting for monorepos
- Stewarded by Linux Foundation's Agentic AI Foundation

**Recommended sections:**
- Project Overview
- Build & Test Commands
- Code Style Guidelines
- Testing Instructions
- Security Considerations
- PR Guidelines
- Deployment Steps
- Dev Environment Tips

## Tool-Specific Formats

### CLAUDE.md (Claude Code)

**Location hierarchy:**
1. `~/.claude/CLAUDE.md` (global)
2. Project root `CLAUDE.md` (shared via git)
3. `CLAUDE.local.md` (personal, gitignored)
4. Subdirectory overrides for monorepos

**Best practices from Anthropic:**
- Keep concise and human-readable
- Document bash commands with descriptions
- Include code style guidelines
- Specify testing instructions
- Note project-specific quirks
- Use `#` key during sessions to add instructions dynamically
- Treat like a prompt you'd optimize repeatedly

**Emphasis keywords:** Use "IMPORTANT", "YOU MUST", "NEVER" for critical rules

### Cursor Rules

**Modern structure:** `.cursor/rules/*.mdc` files (replacing deprecated `.cursorrules`)

**MDC file format:**
```yaml
---
description: Rule description
globs: ["*.ts", "*.tsx"]
alwaysApply: false
---
- Rule content as bullet points
```

**Community patterns:**
- Functional/declarative over OOP
- Guard clauses for error handling
- Descriptive variable names (isLoading, hasError)
- Active agent instruction over passive rule listing

### Aider

**Configuration:** `.aider.conf.yml` with convention files

```yaml
read: [CONVENTIONS.md, AGENTS.md]
```

Searches: home directory → git root → current directory

## Lessons from 2,500+ Repositories

From [GitHub's analysis](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/):

### Six Core Areas That Matter

1. **Commands** - Specific tools with flags (`npm test`, `pytest -v`)
2. **Testing** - How to run and write tests
3. **Project Structure** - What lives where
4. **Code Style** - Examples over descriptions
5. **Git Workflow** - Commit conventions, approval processes
6. **Boundaries** - "Always do" / "Ask first" / "Never do"

### What Works

- Code examples over explanations
- Specific personas over generic ("test engineer for React" not "helpful assistant")
- Executable commands with flags
- Three-tier boundaries (always/ask/never)
- Tech stack with versions

### Common Mistakes

- Vague instructions ("be helpful")
- Missing executable commands
- No code style examples
- Undefined constraints
- Generic tech stack descriptions

## Rule Organization Patterns

From [awesome-rules](https://github.com/continuedev/awesome-rules):

**Categories:**
- General: Agent enablement, coding standards, error handling, security
- Language-specific: Python, TypeScript, Go, Rust, etc.
- Framework-specific: React, Next.js, FastAPI, etc.
- Code quality: Clean code, linting, type safety
- Documentation: API docs, changelogs, comments
- Testing: Unit, integration, E2E, TDD
- DevOps: CI/CD, Docker, monitoring

**Naming convention:** `technology-focus-description` (e.g., `typescript-type-standards`)

## RFC 2119 Keywords

Use these for clarity in rules:
- **MUST** - Absolute requirement (enforce in CI)
- **SHOULD** - Strongly recommended
- **MAY** - Optional

## Practical Structure Template

```markdown
# Project Context
Brief description and tech stack with versions

# Commands
- `npm run build` - Build the project
- `npm test` - Run tests
- `npm run lint` - Check code style

# Code Style
- Use ES modules (import/export)
- Prefer functional components
- [Include actual code example]

# Testing
- All code requires unit tests
- Mock external dependencies
- Run tests before commits

# Boundaries
## Always
- Run linter before commits
- Write tests for new code

## Ask First
- Database schema changes
- API breaking changes

## Never
- Commit secrets or .env files
- Modify production configs directly
```

## Sources

- [AGENTS.md Specification](https://agents.md/)
- [Anthropic: Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [GitHub Blog: How to Write a Great agents.md](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
- [Cursor Rules Documentation](https://docs.cursor.com/context/rules)
- [awesome-cursorrules Repository](https://github.com/PatrickJS/awesome-cursorrules)
- [awesome-rules Repository](https://github.com/continuedev/awesome-rules)
- [Aider Conventions Documentation](https://aider.chat/docs/usage/conventions.html)
- [dotcursorrules.com](https://dotcursorrules.com)
