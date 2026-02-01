---
title: "Lore Development: Context Over Documentation"
description: Why building context for humans (not documentation for AI) produces better software
tags:
  - writing
  - ai-development
  - methodology
  - software-engineering
---

# Lore Development: Context Over Documentation

When working with AI on complex software, the temptation is to jump straight to code. The LLM is capable. You have an idea. Why not start implementing?

Because capability without understanding produces fragile solutions. The AI will build what you ask for, but if you don't fully understand the problem, you'll ask for the wrong thing.

Lore Development is a methodology for gathering context in layers before implementation. It prevents overfit (solving the immediate symptom instead of the underlying problem) and creates knowledge that compounds across projects.

## The Evolution: From SDD to Lore Development

Lore Development evolved from an earlier methodology called Spec-Driven Development (SDD). SDD had a rigid four-phase workflow: **Specification → Planning → Task Breakdown → Implementation**. Each phase had validation gates, templates, and dedicated agents.

The idea was sound: explicit specifications prevent implementation drift when working with AI. But in practice, SDD felt like bureaucracy.

**SDD's core issue:** It optimized for human-readable documentation and hoped that format would work well for AI consumption. It wasn't layered enough. The AI got everything at once instead of progressive disclosure of context as needed.

Lore Development inverts this. The documents are written for AI consumption, layered and disclosed progressively. The human builds understanding through the act of creating them, but the artifacts themselves are optimized for the AI to consume when it needs them.

The workflow collapses to three phases:

**Context → Execute → Verify / Learn**

**Context** is progressive discovery. You don't start with all the answers; you discover the edges of the problem through iteration. Brainstorm the problem space. Research potential solutions. Specify the "what" once you understand both.

**Execute** is progressive disclosure. `/lore-development:prep-plan` loads exactly the context needed: related retros, brainstorms, research, the spec. The AI gets layered context, not a document dump. It builds a plan that takes everything into account because it has everything it needs, when it needs it.

**Verify / Learn** captures lessons that feed the next cycle. When you start new work, the `lore-researcher` agent surfaces related context automatically. Knowledge compounds.

The shift is philosophical: **progressive discovery (human) feeds progressive disclosure (AI)**. The human discovers the problem in layers. The AI consumes those layers as context when executing.

## The Overfit Problem

**Overfit** happens when you optimize for the specific example in front of you without understanding the general case.

**Example:**
You ask Claude to "add authentication to the app." Claude builds a username/password form with session cookies. It works. Ship it.

Three months later, you need OAuth. The session logic is hardcoded into route handlers. Authentication state is scattered across components. You have to rewrite half the auth system.

The problem wasn't the implementation. The problem was the request. "Add authentication" is underspecified. What are the requirements? Just username/password or OAuth eventually? What about password reset? Two-factor? Session management strategy?

If you'd spent 20 minutes specifying requirements before asking Claude to code, you would have designed for the general case. The implementation would have cost the same, but it would have been extensible.

## The Three-Phase Workflow

### Context (Understand the Problem)

This is where you build understanding. It's not linear; you bounce between tools until the problem is clear.

**Research** (`/lore-development:research`): What exists? What have others built? What libraries, patterns, or prior art apply? External context prevents reinventing poorly.

**Brainstorm** (`/lore-development:brainstorm`): What could we do? What are the options? What trade-offs exist? Exploration without commitment. You're mapping the possibility space.

**Specify** (`/lore-development:specify`): What will we do? What are the requirements? What does "done" look like? Specification is decision-making. You commit: these are the requirements, these are the constraints, this is what success means.

You don't go research → brainstorm → specify in strict order. You bounce. You research, realize you need to brainstorm approaches, discover a constraint that requires more research. The goal isn't following steps; it's building enough context to act.

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

**Progressive Discovery (Human):** The human discovers the problem in layers, not all at once.

You don't start with a complete spec. You brainstorm to find the edges of the problem. You research to discover what solutions exist. You specify once you understand both problem and possibility space.

This layered discovery prevents overfit. You're not jumping to solutions before understanding the problem.

**Progressive Disclosure (AI):** The AI consumes context in layers, not everything at once.

When you run `/lore-development:prep-plan`, the `lore-researcher` agent loads exactly what's needed: related retros, relevant research, applicable brainstorms, the current spec. The AI gets layered context progressively disclosed as it plans.

This is the insight Claude Code plugin design teaches: good skills use progressive disclosure. Set the description, define the SKILL.md, add reference files as necessary to extend context. Only grab what you need.

**Lore Development applies this pattern to the entire development workflow.** The artifacts (`.lore/research/`, `.lore/specs/`, `.lore/retros/`) are written for AI consumption. They're layered, structured, and disclosed progressively as needed.

The human builds understanding through the act of creating them. But the documents themselves optimize for the AI to consume when executing.

The shift from SDD: **stop writing human-readable documentation and hoping the AI can use it. Write AI-consumable context that humans build understanding through creating**.

## Preventing Overfit

Overfit happens when you solve the specific case without understanding the general pattern.

Layered context gathering prevents this by forcing you to articulate what you're solving before you solve it.

**Specification** asks: "What are the requirements?" If you can't answer clearly, you don't understand the problem well enough to build a good solution.

**Planning** asks: "How will this fit into the existing system?" If you can't answer clearly, your implementation will be bolted on instead of integrated.

**Retro** asks: "What did we learn?" If you don't capture lessons, the next feature will make the same mistakes.

The layers create checkpoints. You can't skip to implementation without passing through specification. (You can, technically, but the workflow makes it feel wrong.)

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

## The Human Checkpoint

AI is good at synthesis. It's good at generating plans from specs, code from plans, diagrams from descriptions.

But AI is bad at knowing what you actually care about. It will infer from your prompt, but inference is guessing.

The human checkpoint is specification. You, the human, articulate what matters. The AI builds from that foundation.

This isn't about distrusting AI. It's about clarity. If you ask for "authentication," Claude will build something. But if you specify "OAuth 2.0 with PKCE, support for Google and GitHub providers, session persistence via HTTP-only cookies, token refresh on expiry," Claude will build exactly that.

The difference is explicit requirements. The AI doesn't have to guess.

## When to Skip Layers

Not every feature needs full ceremony.

**Bug fixes:** Jump straight to implementation. You know what's broken and how to fix it.

**Trivial features:** Adding a "dark mode" toggle doesn't need a spec. The requirement is obvious.

**Exploratory spikes:** Sometimes you need to code to understand the problem. Do the spike, then write the spec based on what you learned.

The workflow is a guide, not a rule. Use what fits.

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

## Why I Built This (And Why I Rebuilt It)

I kept solving the same problems repeatedly. I'd build a feature, ship it, then build something similar three months later and make the same mistakes.

SDD tried to solve this with rigid documentation: write a spec, write a plan, break it into tasks, follow the process. The documents were optimized for human readability, hoping that format would work for AI consumption. It didn't work well enough.

The problem wasn't the concept (layered context prevents overfit). The problem was the execution (not layered enough, wrong optimization target).

Lore Development strips to the basics and rebuilds around two principles:

**1. Progressive Discovery:** The human discovers the problem in layers (brainstorm → research → specify), not all at once. This prevents jumping to solutions before understanding the problem.

**2. Progressive Disclosure:** The AI consumes context in layers as needed. The `lore-researcher` agent loads exactly what's relevant when planning. Documents are written for AI consumption, structured for progressive disclosure.

The artifacts serve both purposes. Research captures what exists. Brainstorms capture possibilities. Specs capture decisions. Retros capture lessons. The human builds understanding by creating them. The AI consumes them as layered context when executing.

When you start new work, the `lore-researcher` agent surfaces related context automatically. Knowledge compounds.

The methodology doesn't enforce discipline. It creates affordances that make context-gathering the path of least resistance. You could skip straight to implementation, but it feels wrong. The workflow nudges you toward progressive discovery.

And progressive discovery, fed to the AI through progressive disclosure, produces better software.
