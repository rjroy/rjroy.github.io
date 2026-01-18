---
title: What Makes Good AI Rules Files
description: Not universal best practices, but a framework for building rules that make AI work for you
tags:
  - ai
  - claude-code
  - methodology
---

# What Makes Good AI Rules Files

## The Problem

AI output looks right. That's the danger.

When you ask an AI to write code, documentation, or prose, the result is fluent and plausible. It follows patterns. It sounds confident. And it's wrong just often enough to matter.

The failure mode isn't obvious errors. It's subtle ones: code that passes a quick review but breaks in production, documentation that sounds professional but misses your voice, plans that seem reasonable but ignore context you care about.

Most people respond by getting better at reviewing AI output. That helps, but it's exhausting. You're doing quality control on every interaction.

The alternative: teach the AI your standards upfront.

---

## Universal Concepts, Personal Rules

There is no universal CLAUDE.md. If there were, Anthropic would ship it. They don't, because "always use a linter" is overhead for someone who just wants a bash script. "Write tests" slows down someone building a quick demo.

This document isn't for casual users. It's for professionals who want AI to produce professional-quality output.

For that audience, some concepts are universal:
- Verification matters (AI output looks right more often than it is right)
- Quality standards need to exist (or you'll hate the code later)
- Tests prove correctness (not "the code ran without errors")

But all rules are personal. "Don't commit secrets" is a concept. The rule is "add `.env` to `.gitignore` and configure Claude to ignore credential files." "Use a linter" is a concept. The rule is "use ruff with these specific checks enabled."

**Concepts guide what you need to address. Rules encode how you address it.**

The concept is universal; the implementation is always personal. That's why rules files can't be copied wholesale. You can borrow structure, you can use templates, but the content has to be yours.

---

## Three Categories of AI Guidance

Not all guidance is the same. Understanding the categories helps you know what to write and where to put it.

### Reference (External Facts)

Immutable facts about the world: API definitions, language specifications, tool behavior. These aren't guidance about how you want the AI to behave. They're information about what exists.

**Characteristics:**
- True regardless of who's asking or what project you're in
- Subject to change over time (new releases, deprecated APIs)
- The AI may or may not already know them depending on knowledge cutoff

**Why this doesn't belong in rules files:** Putting TypeScript syntax or Bun's API in CLAUDE.md conflates "here's how I want you to behave" with "here's information you might not have." Rules files are for behavioral guidance. Reference material is just... reference.

**Delivery:** Cached documentation, fetched on demand, or provided in context when relevant. Not rules files.

**Example:** "Bun 1.2 added `bun publish` for npm registry publishing" — this is a fact about the tool, not a rule about how to use it.

### Quality Standards (Have Them)

What good looks like. Not when you stop working, but what you put in the code in the first place.

**Characteristics:**
- The concept is universal (consistent naming matters)
- The rules are personal (which naming convention, what line limits, which linter)
- Encodes what you're willing to live with long-term

**Why you can't skip this:** AI will generate code that works. It won't generate code that matches your standards unless you tell it what those are. Without explicit quality standards, you'll get inconsistent casing, sprawling functions, and files you never want to open again.

**Delivery:** Rules files. You can get some of this for free with "always use an appropriate linter," but which linter? What are the thresholds? Those are personal decisions that need to be written down.

**Example:** "Functions over 100 lines require a comment explaining why. Files over 800 lines should be investigated for splitting. Use `camelCase` for variables, `PascalCase` for types."

### Verification (How You Know It Works)

The process that catches what looks right but isn't. Without this, you're trusting plausibility over correctness.

**Characteristics:**
- The most commonly skipped category
- Where AI output fails silently
- Requires explicit instruction because AI defaults to "done when it looks done"

**Delivery:** Rules files, with specific process steps. This is where you prevent the "looks right, is wrong" problem.

**Example:** "Use a sub-agent with fresh context to review at critical points. The reviewer catches issues the implementer missed due to being too close to the work."

This exploits a real property of AI architecture: context shapes output. A sub-agent reviewing your work doesn't carry the baggage of having already decided an approach was correct. It can ask "wait, why did we do it this way?" without defensiveness. You're using how AI works as a feature, not fighting it.

---

## Why Verification Matters Most

Quality standards tell AI what to aim for. Verification tells AI how to prove it got there.

Without verification instructions:
- Code compiles but doesn't handle edge cases
- Documentation covers the happy path but ignores failure modes
- Refactoring preserves behavior in tests but breaks untested assumptions

AI is very good at generating output that *appears* complete. Verification is the discipline that distinguishes appearance from reality.

The uncomfortable truth: if you don't define verification, you become the verification. Every interaction requires your full attention to catch what the AI missed.

---

## The Template Approach

You can't just tell someone "define your quality standards." That's too abstract. But you can give them slots to fill.

Templates provide structure without prescribing answers. The template is universal; the content is personal.

### Writing Style Template

```markdown
## Voice
[How do you want to sound? Professional, casual, technical, accessible?]

## Constraints
[What do you never do? Jargon to avoid? Patterns that feel wrong?]

## Calibration Examples
Sounds like me:
- [Example phrase or sentence]
- [Example phrase or sentence]

Doesn't sound like me:
- [Example phrase or sentence]
- [Example phrase or sentence]
```

### Code Quality Template

```markdown
## Quality Standards
[What does good code look like? Size limits, naming conventions, structure rules]

## Verification
[How do you prove the code meets standards? Tests, linting, review process]

## Boundaries
Always:
- [Things that must happen every time]

Ask first:
- [Things that require approval before proceeding]

Never:
- [Things that are not acceptable under any circumstances]
```

### Project Standards Template

```markdown
## Tech Stack
[Specific tools and versions. Not "modern Python" but "Python 3.12+ with uv for dependencies"]

## Project Structure
[Where things live. Source in src/, tests in tests/, docs in docs/]

## Code Style
[Naming conventions, formatting rules, patterns to follow or avoid]

## Git Workflow
[Branching strategy, commit message format, what requires a PR]
```

### Development Workflow Template

```markdown
## Process Steps
[What sequence do you follow? Research, plan, execute, test, review?]

## Checkpoints
[Where does human input happen? What requires approval before continuing?]

## Failure Modes
[What goes wrong when steps are skipped? Why does each step exist?]
```

---

## Building Your Own Rules

Start with constraints. Where have you been burned? What mistakes keep happening? Those become your "never" list.

Add quality standards. What does good code look like to you? Not aspirational — operational. What are you willing to live with long-term?

Define verification. How do you prove the work is correct? If the answer is "I review it," that's not verification — that's you being the safety net. Push that into the rules. When verification passes, you're done.

Keep reference material out of rules files. API docs, tool syntax, project structure — these are facts, not behavioral guidance. Provide them separately when the AI needs them.

---

## What Makes a Good Rule

The difference between a useful rule and a useless one: **constraints vs. aspirations**.

An aspiration expresses a value. A constraint changes behavior. AI already has values baked in (write good code, be helpful, avoid errors). What it lacks is *your specific standards*.

### Weak Rules Made Strong

| Aspiration (Weak) | Constraint (Strong) |
|-------------------|---------------------|
| "Write good tests" | "Unit tests must not require external resources; mock everything including time" |
| "Code review is important" | "Code MUST be reviewed by a different agent than the one that wrote it, to separate implementation context from evaluation" |
| "Use modern JavaScript" | "Use TypeScript 5.3+ with strict mode enabled" |
| "Follow best practices" | "Functions over 100 lines require a comment explaining why the length is necessary" |
| "Be consistent" | "Use `camelCase` for variables, `PascalCase` for types, `SCREAMING_SNAKE` for constants" |

The pattern: weak rules describe *what you value*. Strong rules describe *what you'll accept*.

### The Test for a Good Rule

Ask: "Could the AI follow this rule and still produce something I'd reject?"

If yes, the rule isn't specific enough. Keep refining until the rule actually constrains the failure modes you care about.

### Characteristics of Strong Rules

1. **Specific commands, not abstract goals** — `bun test`, not "run tests"
2. **Examples over descriptions** — show what you mean, don't just explain it
3. **Three-tier boundaries** — always, ask first, never
4. **Verification built in** — how to prove the work is correct
5. **Calibration examples** — "sounds like me" vs. "doesn't sound like me"
6. **Rationale included** — why the rule exists, so the AI can apply judgment in edge cases

---

## Conclusion

Good AI rules files aren't about making AI universally correct. They're about making AI correct *for you*.

The concepts are universal. The rules are yours. And verification — explicit, defined verification — is what separates output that looks right from output that is right.

Start with templates. Fill them with your judgment. Iterate when you find gaps.

The goal isn't a perfect rules file. It's a rules file that catches the mistakes you care about before they reach you.

---

## References and Further Reading

For writing clearer rules, consider [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt) keywords:
- **MUST** — absolute requirement
- **SHOULD** — strongly recommended, exceptions need justification
- **MAY** — optional

For cross-tool compatibility, [AGENTS.md](https://agents.md/) is emerging as a standard format (60,000+ repositories, 25+ AI tools). The format is converging even as content remains personal.

GitHub's analysis of [2,500+ repositories](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/) identified six areas that distinguish effective AI rules: commands, testing, project structure, code style, git workflow, and boundaries.

---

## Related

- [[01_Projects/AI-as-Your-Partner/index|AI as Your Partner]] — Project summary and research notes
