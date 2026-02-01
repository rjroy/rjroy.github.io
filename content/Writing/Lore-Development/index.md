---
title: "Lore Development"
description: Why layered context prevents AI overfit and compounds across projects
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

**SDD's core issue:** It appeared to be "documentation for AI" (specs defining what to build) but was actually "documentation for humans" (complete specs consumed all at once). It wasn't layered enough. The AI got everything upfront and overfitted to the initial specification instead of building understanding progressively.

Lore Development fixes this through **layered context**. The AI doesn't get a complete spec upfront. Instead, context is disclosed progressively: the problem space (brainstorms), existing solutions (research), requirements (specs), and past learnings (retros). The AI builds understanding in layers, preventing overfit to incomplete information.

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

This is where you build understanding through **discovery modes** - different lenses for examining the problem. You cycle through them as understanding deepens, not in strict order.

**Research** (`/lore-development:research`): What exists? What have others built? What libraries, patterns, or prior art apply? External context prevents reinventing poorly. The research agent automatically surfaces related retros - past learnings inform what to look for.

**Brainstorm** (`/lore-development:brainstorm`): What could we do? Why are we solving this? What wild options exist? What trade-offs matter? Exploration without commitment. You're questioning assumptions and mapping the possibility space. Related retros surface here too - "we tried something similar before, here's what we learned."

**Specify** (`/lore-development:specify`): What will we do? Synthesis step. Take the disparate ideas from research and brainstorming and turn them into something concrete. What are the requirements? What does "done" look like? Specification is decision-making. You commit: these are the requirements, these are the constraints, this is what success means. Again, retros surface automatically - past decisions inform current requirements.

**This is a discovery loop, not a pipeline.** You research, realize you need to brainstorm approaches, discover a constraint that requires more research, then synthesize into a spec. Or you brainstorm first, then research to validate ideas. Or you specify a rough draft, realize gaps, and cycle back through research and brainstorming.

Each mode can run multiple times. Each iteration builds on accumulated context - the research docs, brainstorm notes, draft specs, and **past retros** all feed forward. The `lore-researcher` agent ensures related learnings surface at each step.

The goal isn't following steps; it's building enough layered context to act without overfitting to the first idea.

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

**Progressive Discovery (Human):** The human discovers the problem in layers through multiple modes, cycling until understanding emerges.

You don't start with a complete spec. You might:
- **Research** existing solutions, discover a pattern, realize you need to **brainstorm** how it applies to your context
- **Brainstorm** wild options, hit a constraint, **research** whether others solved it, refine the brainstorm
- **Specify** a rough draft, spot gaps, cycle back through **research** and **brainstorm** to fill them
- Run each mode **multiple times** as understanding deepens

Each mode builds on accumulated context. The `lore-researcher` agent surfaces related retros automatically - past learnings inform current research questions, brainstorm directions, and specification requirements.

This discovery loop prevents overfit. You're not jumping to solutions before understanding the problem. You're building context in layers until the solution becomes obvious.

**Progressive Disclosure (AI):** The AI consumes context in layers, not everything at once.

When you run `/lore-development:prep-plan`, the `lore-researcher` agent loads exactly what's needed: related retros, relevant research, applicable brainstorms, the current spec. The AI gets layered context progressively disclosed as it plans.

This is the insight Claude Code plugin design teaches: good skills use progressive disclosure. Set the description, define the SKILL.md, add reference files as necessary to extend context. Only grab what you need.

**Lore Development applies this pattern to the entire development workflow.** The artifacts (`.lore/research/`, `.lore/specs/`, `.lore/retros/`) are structured for layered consumption. The AI gets context progressively, building understanding as it needs each layer, rather than consuming a complete spec upfront and overfitting to it.

The human builds understanding through the act of creating them. The AI consumes them as layered context when executing.

The shift from SDD: **stop giving the AI everything at once. Layer the context so it builds understanding progressively, preventing overfit to incomplete specifications**.

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

## Trust the AI (Don't Overfit to the Current Model)

Here's the design constraint that shaped everything: **Trust the AI to evolve. Don't overfit to the current model.**

Keep the skills small. Influence *how* the process works, but don't dictate *what* happens. AI is exceptional at planning and implementation. Let it do that. Use Claude Code's native Plan Mode. Let implementation run. Don't build structure around what the AI already handles well.

**Only build structure for what compounds:** context creation, storage, learning, and retrieval.

The skills don't tell the AI how to research or brainstorm or specify. They create affordances:
- "Here's where research goes, here's what past research exists"
- "Here's where brainstorms live, here's related brainstorms from before"
- "Here's the spec format, here are related specs and retros"

The AI does the thinking. The structure ensures that thinking **accumulates** instead of evaporating when the session ends.

This is why `/lore-development:prep-plan` just loads context and hands off to native Plan Mode. Planning is something AI excels at. The value isn't in dictating how to plan - it's in ensuring the AI has **layered context** when it plans.

**SDD overfitted to GPT-3.5's limitations.** It needed rigid templates because the model couldn't hold complex context. Validation gates existed because the model would drift without checkpoints.

**Lore Development is designed for models that don't exist yet.** Small skills that create affordances. Layered context that compounds. Trust that future models will use it better than current ones.

The methodology won't break when Opus 5 or GPT-6 arrives. It'll just work better, because the structure is context, not control.

## Why I Built This (And Why I Rebuilt It)

I kept solving the same problems repeatedly. I'd build a feature, ship it, then build something similar three months later and make the same mistakes.

SDD tried to solve this with rigid documentation: write a spec, write a plan, break it into tasks, follow the process. But it gave the AI everything upfront in a single spec. The AI would latch onto that initial understanding and overfit to it, missing context that only emerged during implementation.

The problem wasn't the concept (layered context prevents overfit). The problem was the execution (specs were consumed all at once, not progressively).

Lore Development strips to the basics and rebuilds around three principles:

**1. Progressive Discovery:** The human discovers the problem in layers through discovery modes (research, brainstorm, specify), cycling until understanding emerges. This prevents jumping to solutions before understanding the problem.

**2. Progressive Disclosure:** The AI consumes context in layers as needed. The `lore-researcher` agent loads exactly what's relevant when planning. Context builds progressively instead of being dumped all at once.

**3. Trust the AI:** Don't overfit to current model limitations. Keep skills small (create affordances for context), let the AI handle what it's good at (planning, implementation). Build structure only for what compounds: context creation, storage, learning, retrieval.

The artifacts serve both purposes. Research captures what exists. Brainstorms capture possibilities. Specs capture decisions. Retros capture lessons. The human builds understanding by creating them. The AI consumes them as layered context when executing.

When you start new work, the `lore-researcher` agent surfaces related context automatically. Knowledge compounds.

The methodology doesn't enforce discipline. It creates affordances that make context-gathering the path of least resistance. You could skip straight to implementation, but it feels wrong. The workflow nudges you toward progressive discovery.

And progressive discovery, fed to the AI through progressive disclosure, produces better software - not just with today's models, but with whatever comes next.
