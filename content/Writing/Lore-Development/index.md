---
title: "Lore Development"
description: Why layered context compounds across projects and prevents premature implementation
date: 2026-02-01
tags:
  - writing
  - ai-development
  - methodology
  - software-engineering
---

# Lore Development: Context Over Documentation

When working with AI on complex software, the temptation is to jump straight to code. The LLM is capable. You have an idea. Why not start implementing?

If you don't fully understand the problem, you'll ask for the wrong thing. The AI will build it anyway.

So you spend your time writing the perfect spec. Find all the references. Think through all the solutions and consolidate them into a document you can hand to an AI or a human. Have the AI develop from the spec. Spend your time explaining where it missed something. Eventually ship. Then start over.

You learned so much while implementing. Why not remember it? Why not remember what you discovered while writing the spec? And shouldn't specs be written for the developer, the AI?

Lore Development is a methodology for gathering context into a library after implementation, not just before. It allows the AI to fill gaps with existing project knowledge before resorting to hallucination. It covers the steps before specificity, not just planning and implementation. It tags and catalogs the library for reference on the next feature.

## The Evolution: From SDD to Lore Development

Lore Development evolved from an earlier methodology called Spec-Driven Development (SDD). The Spiral Grove implementation of SDD had a rigid four-phase workflow: **Specification → Planning → Task Breakdown → Implementation**. Each phase had validation gates, templates, and dedicated agents.

The idea was sound: explicit specifications prevent implementation drift when working with AI. But in practice, SDD felt like bureaucracy.

**SDD's core issue:** It appeared to be "documentation for AI" (rules to follow, prevent drift) but was actually "documentation for humans" (requirement docs with numbers and checkboxes). The AI treated the spec as complete, as if there were no gaps. But humans are messy—there are always gaps. Rather than filling gaps from previous findings and research, the AI invented answers.

Lore Development fixes this through a **lore library** that lives in the project forever, always growing. It starts with brainstorms: questions, few answers. It grows with research for solutions to those questions. Then specs define what will actually be implemented. After recovering from the inevitable mistakes during implementation, you record the solutions in retros. The next time through, the AI loads relevant information from this accumulated context.

The workflow collapses to three phases:

**Context → Execute → Verify / Learn**

**Context** is progressive discovery. You don't start with all the answers; you discover the edges of the problem through iteration. Brainstorm the problem space. Research potential solutions. Specify the "what" once you understand both.

**Execute** is progressive disclosure. A `lore-researcher` agent searches for relevant files, reads them, and returns only what's necessary. Loading the entire lore library would be too much. Doing this within the main agent would cause context pollution. This way, `/lore-development:prep-plan` loads exactly the context needed: related retros, brainstorms, research, the spec. The AI gets only the bits it needs to learn from past successes and failures. It builds a plan that takes everything into account because it has what it needs, when it needs it. After loading context, actual planning happens in Claude Code's native plan mode. Why reinvent something that works and will only get better?

**Verify / Learn** captures lessons through `/lore-development:retro`, feeding the next cycle. The `lore-researcher` agent compounds knowledge over time.

The shift is philosophical. Specs make humans feel better about what's getting implemented. You can still have them, but now what you learned is also recorded for the AI. Not just something you have to remember.

## The Three-Phase Workflow

### Context (Understand the Problem)

This is where you build understanding through **discovery modes** - different lenses for examining the problem. You cycle through them as understanding deepens, not in strict order.

**Research** (`/lore-development:research`): What exists? What have others built? What libraries, patterns, or prior art apply? External context prevents reinventing poorly.

**Brainstorm** (`/lore-development:brainstorm`): What could we do? Why are we solving this? What wild options exist? What trade-offs matter? Exploration without commitment.

**Specify** (`/lore-development:specify`): What will we do? Synthesis step. Take the disparate ideas from research and brainstorming and turn them into something concrete. What are the requirements? What does "done" look like? Specification is decision-making.

**This is a discovery loop, not a pipeline.** You research, realize you need to brainstorm approaches, discover a constraint that requires more research, then synthesize into a spec. Or you brainstorm first, then research to validate ideas. Each mode can run multiple times.

Each iteration builds on accumulated context. The `lore-researcher` agent surfaces related retros automatically - past learnings inform current work at every step.

The goal isn't following steps; it's building enough layered context to act without jumping to the first idea.

**Output:** `.lore/research/`, `.lore/brainstorm/`, `.lore/specs/`

### Execute (Build It)

Once you have context, you execute. `/lore-development:prep-plan` loads project lore (related specs, retros, brainstorms via the `lore-researcher` agent), then hands off to Claude Code's native plan mode.

Plan mode jumps straight into implementation. There's no validation gate between planning and coding, no task breakdown phase. Claude Code is good at this. Trust it.

When implementation completes, the plan is saved to `.lore/plans/` for future reference.

**Output:** `.lore/plans/<feature>.md`, working code

### Verify / Learn (Capture Lessons)

After shipping, you run `/lore-development:retro`. What did you learn? What surprised you? What would you do differently?

Retros capture lessons while they're fresh. The spec told you what you thought you were building. The retro tells you what actually happened.

Lessons can be "graduated" to higher scopes (feature → project → career) when they apply broadly. This is how knowledge compounds.

**Output:** `.lore/retros/<feature>.md`

## Why This Works: Progressive Discovery + Progressive Disclosure

**Progressive Discovery (Human):** You discover the problem in layers through multiple modes, cycling until understanding emerges. Research existing solutions, discover a pattern, realize you need to brainstorm how it applies. Brainstorm wild options, hit a constraint, research whether others solved it. Specify a rough draft, spot gaps, cycle back.

This prevents jumping to the first idea. You're building context in layers until the solution becomes obvious, not asking the AI to implement before you understand the general case.

**Progressive Disclosure (AI):** The AI consumes context in layers, not everything at once. When you run `/lore-development:prep-plan`, the `lore-researcher` agent loads exactly what's needed: related retros, relevant research, applicable brainstorms, the current spec.

This mirrors how well-designed Claude Code skills work: progressive disclosure. Set the description, define the SKILL.md, add reference files as necessary. Only grab what you need.

Lore Development applies this to the entire workflow. The human builds understanding by creating artifacts. The AI consumes them as layered context when executing.


## Compound Knowledge

The real power is compounding: past learnings inform new work.

When you run `/lore-development:specify` or `/lore-development:prep-plan`, the `lore-researcher` agent automatically searches `.lore/` for related work. Past specs, retros, brainstorms. It surfaces findings before you start.

This closes the loop:
```
New work starts
    → lore-researcher finds related context
    → context informs spec/plan
    → work completes
    → retro captures lessons
    → lessons available for next cycle
```

Knowledge doesn't evaporate when the feature ships. It accumulates.


## When to Skip Layers

Bug fixes, trivial features, and exploratory spikes don't need full ceremony. Use what fits.

## Design Archaeology (Excavate)

Lore Development has a second mode for existing codebases: excavation.

When you inherit a project, the lore is implicit. Decisions were made, but they're not documented. Architecture exists, but it's not explained.

`/lore-development:excavate` inverts the workflow:
```
Forward:  Intent → Spec → Plan → Code → Lore
Backward: Code → Survey → Features → Design → Lore
```

You start with code and work backward. Survey entry points, map features, document architecture, extract into specs and reference docs.

The output is the same (`.lore/specs/`, design docs), but the process is reversed. You're discovering the lore that should have been written.

## Legos, Not Process

Lore Development provides composable skills, not a rigid workflow.

The skills are independent: `/research`, `/brainstorm`, `/specify`, `/prep-plan`, `/retro`, `/excavate`, `/ddp`. You use what fits. Skip what doesn't.

Bug fix? Jump straight to code. Trivial feature? Maybe just a spec. Complex system? Research → brainstorm → specify → plan → retro.

The workflow is a guide, not a rule. Modern LLMs are good at planning and implementation. If you force them through bureaucracy, you're fighting their strengths.

**SDD tried to enforce process.** Four mandatory phases with validation gates. It felt like compliance theater.

**Lore Development provides legos.** Snap together what you need for this specific problem. The goal is context, not compliance.

## Trust the AI to Evolve

**Trust the AI to evolve. Design for models that don't exist yet.**

Two rules:

1. **Keep skills small.** They create affordances (where things go, what exists), not prescriptions (how to think). The AI does the thinking. The structure ensures thinking accumulates instead of evaporating.

2. **Don't reinvent planning and implementation.** Claude Code's native Plan Mode already handles this. `/lore-development:prep-plan` loads context, then hands off. The value is ensuring the AI has layered context when it plans, not dictating how it plans.

The methodology won't break as models improve. It'll just work better, because the structure is context, not control.

## Why This Exists

The pattern kept repeating: build a feature, ship it, build something similar later, make the same mistakes.

Lore Development creates affordances that make context-gathering the path of least resistance. You could skip straight to implementation, but the workflow nudges you toward progressive discovery.

Progressive discovery, fed to the AI through progressive disclosure, produces better software - not just with today's models, but with whatever comes next.
