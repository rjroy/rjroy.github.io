---
title: Spiral Grove
description: A Spec-Driven Development methodology plugin for Claude Code
---

# Spiral Grove

Spiral Grove is a Claude Code plugin that implements Spec-Driven Development (SDD), a structured methodology for building complex features with AI assistance. Four phases: specify what, plan how, break into tasks, then implement.

## The Problem

AI coding assistants are remarkably capable but surprisingly literal. They'll build exactly what you ask for, which is problematic when you haven't fully articulated what you want. Without structure:

- Requirements drift as context accumulates
- Implementation details get decided implicitly
- Multi-session work loses coherence
- "Just one more thing" spirals into spaghetti

I kept hitting the same failure mode: start enthusiastically, build something that mostly works, realize halfway through that I'd painted myself into a corner. The AI didn't fail. I failed to think through what I actually needed.

Spiral Grove forces that thinking to happen before the coding starts.

## The Four Phases

### Phase 1: Specification

Define *what* to build, not *how*. The spec captures:

- **Requirements**: Numbered, unambiguous, testable (REQ-F-001, REQ-NF-001)
- **Success criteria**: Measurable outcomes ("95% of requests under 200ms")
- **Constraints**: Explicit boundaries ("must not require database migration")
- **Acceptance tests**: How you'll know it's done

The spec deliberately excludes implementation details. No tech stack choices, no architecture decisions. Those come later.

```
/spec-writing

Claude: What are you trying to build?

You: A rate limiting system for our API

Claude: [Creates .sdd/specs/api-rate-limiter.md]
        - Requirements captured
        - Success criteria defined
        - Constraints documented
        - Acceptance tests specified

        Status: Draft → Validated → Ready for Planning
```

A validator agent reviews the spec before you can proceed, checking for measurable criteria and catching premature implementation details.

### Phase 2: Planning

Design *how* to build it. Now implementation details matter:

- **Architecture decisions**: With rationale for each choice
- **Integration points**: How this connects to existing code
- **Error handling strategy**: What happens when things fail
- **Testing approach**: Unit, integration, load

The plan maps back to spec requirements. Every architectural choice should trace to something you're trying to achieve.

```
/plan-generation

Claude: [Analyzes codebase, then creates .sdd/plans/api-rate-limiter-plan.md]
        - Architecture: Token bucket algorithm
        - Decision: Token bucket vs sliding window (rationale: burst handling)
        - Integration: Express middleware
        - Error handling: Graceful degradation if Redis unavailable
```

Another validator ensures decisions have rationale and requirements are addressed.

### Phase 3: Task Breakdown

Decompose the plan into discrete, testable work units:

- **Independent tasks**: Each completable on its own
- **T-shirt sizing**: XS/S/M/L/XL (not time estimates)
- **Dependencies**: What blocks what
- **Acceptance criteria**: Per-task definition of done

```
/task-breakdown

Claude: [Creates .sdd/tasks/api-rate-limiter-tasks.md]

        TASK-001: Redis client configuration [S]
        TASK-002: Token bucket core logic [M]
        TASK-003: Rate limit middleware [M]
        ...
        TASK-012: Load testing [M]

        Dependencies mapped, acceptance criteria defined
```

Tasks sized XL or larger get flagged for further breakdown. The validator ensures all spec acceptance criteria map to at least one task.

### Phase 4: Implementation

Execute tasks with progress tracking:

```
/implementation

Claude: [Works through tasks, updates .sdd/progress/api-rate-limiter-progress.md]

        Completed: TASK-001, TASK-002
        In Progress: TASK-003

        Technical Discoveries:
        - Used ioredis instead of redis (better TypeScript support)
```

Progress documents capture what actually happened versus what was planned. Deviations aren't failures; they're discoveries worth recording.

## Validator Agents

Each phase transition triggers a specialized validator agent with fresh context. The validators catch:

- **Specs**: Implementation details sneaking in, vague success criteria
- **Plans**: Decisions without rationale, unmapped requirements
- **Tasks**: Missing acceptance criteria, oversized tasks
- **Progress**: Untracked deviations, incomplete tasks marked done

Fresh context matters. The validator sees the document without the accumulated conversation that produced it, closer to how a reviewer would see it.

## Parent/Child Hierarchies

Large features can be decomposed into child specs:

```
.sdd/specs/
├── dashboard-system.md           # Parent spec
└── dashboard-system/
    ├── widgets.md                # Child spec
    ├── data-binding.md           # Child spec
    └── realtime-sync.md          # Child spec
```

Each child follows the full workflow independently. This reduces context load while maintaining traceability to the parent requirements.

## Synthesis Commands

Two commands work backward from existing code:

### `/synthesize-docs`

Generates operational documentation from implementation:

```
/synthesize-docs auth

Claude: [Analyzes auth/ directory, creates auth/CLAUDE.md]
        - Module purpose and boundaries
        - Key patterns and conventions
        - Integration points
        - Operational knowledge
```

Useful after implementation to capture what was learned.

### `/synthesize-specs`

Reverse-engineers specifications from existing code:

```
/synthesize-specs payment

Claude: [Analyzes payment module, creates .sdd/specs/payment.md]
        - Requirements extracted from implementation
        - Test cases derived from test code
        - Constraints inferred from error handling
```

Enables SDD adoption on legacy codebases.

## When to Use SDD

**Use it for:**
- Features spanning multiple files or components
- Work continuing across multiple sessions
- Complex integrations with existing systems
- Anything where "just start coding" has burned you before

**Skip it for:**
- Bug fixes with obvious solutions
- Single-function utilities
- Prototypes and experiments
- Learning exercises

The decision heuristic: if you'd benefit from writing it down before coding, use SDD. If the task fits in your head, just do it.

## Architecture

Spiral Grove uses a modular agent architecture:

**Commands** orchestrate workflows → **Agents** execute discrete work → **Skills** serve resources

Eight specialized agents handle validation and synthesis. Four built-in skills provide templates, methodology guidance, and format specifications.

Key design decisions:

- **Fresh context per agent**: Prevents bloat during long workflows
- **Mandatory validation**: Quality gates aren't optional
- **Template externalization**: Skills provide templates, keeping commands focused
- **Markdown artifacts**: Everything human-readable and version-controlled

## The Name

A spiral grove is a pattern found in nature: trees planted in a spiral that provides structure while leaving room for growth. The methodology works similarly: structured phases that still allow discovery.

The spiral also reflects iteration. Specs get revised. Plans adapt to reality.

Part of the [[02_Areas/Vibe-Garden/index|Vibe Garden]] toolkit. Integrates with [[02_Areas/Vibe-Garden/Compass-Rose/index|Compass Rose]]; large backlog items can escalate to spec-writing.
