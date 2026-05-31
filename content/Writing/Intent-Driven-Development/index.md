---
title: "Intent-Driven Development"
description: "When AI handles implementation, the engineer's job becomes defining intent. What does that mean for how we build software?"
date: 2026-03-15
featured: true
tags: [ai, software-engineering, process, intent-driven-development]
---

# Intent-Driven Development

We are eighteen months into the era of AI-assisted software engineering and the industry still doesn't have a shared vocabulary for what's happening. Not the tooling. The tooling is moving fine. What we lack is a model for the work itself: what does the engineering workflow become when AI is a participant in it, not something you alt-tab to?

I've been building with AI daily for the past year, managing a team that's doing the same, and watching the industry fumble toward answers. What I keep coming back to is this: the fundamental unit of engineering work is shifting from implementation to intent. Not to specifications. Not to prompts. To intent, the layered, accumulated understanding of what you want and why you want it. The spec is an artifact of intent. It is not the intent itself.

This is a developing idea, not a manifesto. I have more open questions than answers. But the pattern is clear enough to name.

## The Context Problem at Scale

If you work at a company with hundreds of projects and millions of lines of code, you already know that "just add AI tools" is not a strategy. The tools work. They generate code. They refactor. They write tests. But they operate on what's visible, and most of what makes a codebase work is not visible.

Conventions. Architecture decisions made three years ago for reasons nobody documented. The reason that module exists as a separate service instead of a library. Why that API returns data in a shape that looks wrong but isn't. The political context that determines which team owns what. None of this is in the code. All of it determines whether AI-generated code will actually work in production.

The real challenge is knowledge externalization: getting the tribal knowledge, the conventions, the "ask Sarah, she knows why" into a form that both humans and AI can consume. Tools give access to the codebase. Understanding requires layers of context that most organizations have never had to articulate because the humans carrying that context were always in the room.

This is an organizational transformation problem, not a tooling problem. The 2025 DORA report found that AI boosts individual output (more tasks completed, more PRs merged) while organizational delivery metrics stay flat. Eighty percent of respondents reported productivity gains; friction and burnout persisted unchanged. Their conclusion: "AI doesn't create organizational excellence, it amplifies what already exists." If your context is implicit and fragmented, AI will amplify that too.

## Process, Not Tools

Whether AI enters your workflow through a chat window, an editor integration, or an autonomous agent framework is incidental. Seriously. The tooling question is important for procurement and it is irrelevant for process. The question that matters is: what does the engineering workflow become when AI is a participant?

Right now, most teams are improvising. An engineer opens a chat, describes a problem, iterates on the output, copies what works into the codebase. Maybe they use an editor integration that suggests code inline. Maybe they have an agent that can run tests and commit. The specific tool surface varies. The underlying pattern is the same: human has intent, communicates it to AI, evaluates the result, refines.

Nobody has formalized that pattern into a shared methodology. Not really. Hassan et al. at Queen's University published SASE (Structured Agentic Software Engineering) in September 2025, the most formal attempt I've found. It proposes named artifacts, role definitions, and interaction patterns at a level of formality comparable to early Agile manifestos. Thoughtworks and GitHub named Spec-Driven Development, a practice that separates planning from implementation with specs as the handoff artifact. Kent Beck articulated values for what he calls Augmented Coding: same engineering discipline as before, different execution model. DORA measured outcomes.

Nobody has shipped the equivalent of UML for AI-integrated software engineering. The vocabulary is forming, but it hasn't converged. We're between "everyone improvising" and "terminology solidifying," and that's an uncomfortable place to build process.

## The Fundamental Loop

Here's the pattern I keep seeing, across tools, across team sizes, across levels of AI sophistication:

**Define intent.** Discuss what you want and why. This isn't writing a prompt. It's the conversation before the prompt: the research, the brainstorming, the clarification of constraints. Sometimes it's five minutes of thinking. Sometimes it's days of discovery.

**Save the collaboration.** The accumulated context, not just the spec. The spec is one artifact. The research you did, the options you considered and rejected, the constraints you surfaced, the decisions you made along the way: all of this is context that improves the next cycle. If you throw it away, you start from zero every time.

**Action the intent.** Let AI implement. This is the part everyone focuses on, and it's the part that matters least. If the intent is clear, the implementation follows. If it isn't, no amount of iteration will converge on what you actually wanted.

**Review the result.** Not code review. Intent verification. "Does this match what I meant?" is a different question than "Is this good code?" Both matter. But the first question is the one that changes when AI is doing the implementation. You're verifying alignment with intent, not evaluating craft.

**Repeat.** Each cycle starts from a higher baseline because state is preserved. The context you built in the first pass informs the second. The lessons from the second inform the third. This is why saving the collaboration matters: it makes the loop compound instead of reset.

This loop isn't new. It's what good engineering has always looked like. What's new is that the implementation step, the middle of the loop where most engineering hours are spent today, is compressing. The weight of the work is migrating to the edges: defining intent and verifying results.

## Intent vs. Spec

Spec-Driven Development puts the specification at the center. Write a detailed spec, hand it to an agent, get code back. It's a real practice and it works. But it frames the spec as the input, the thing that drives development.

Intent-Driven Development recognizes the spec as one artifact among many. The real driver is layered intent, refined through conversation, research, brainstorming, and iteration. You don't start with a spec. You arrive at one. The spec is what gets produced by the intent-definition process, not what gets consumed by the implementation process.

This distinction matters because it changes what you optimize for. If the spec is the center, you optimize for spec quality: precision, completeness, formal structure. If intent is the center, you optimize for understanding: clarity of purpose, depth of context, quality of the conversation that produced the spec.

The spec is a snapshot of intent at a moment in time. Intent keeps evolving. The best AI-integrated workflows I've seen preserve the full arc, not just the snapshot. The rejected options, the constraints discovered mid-implementation, the "actually, I meant something slightly different" moments. All of that is signal. A spec that strips it away is lossy.

## The Brute-Force Problem

There's a pattern I see frequently enough to name: brute-force iteration. Run the agent. Look at the output. It's wrong. Run it again with corrections. Still wrong. Run it again. Eventually it converges, or you give up and fix it by hand.

This works. It ships code. But it substitutes compute for clarity. Every iteration is a signal that the starting intent wasn't precise enough. The cost of iteration is inversely proportional to the quality of the starting intent.

Brute-force iteration doesn't reward better engineering. It rewards persistence and tolerance for noise. The engineer who spends thirty minutes clarifying intent and gets it right in one pass has done better work than the engineer who spends two hours in a correction loop, but the second engineer looks busier and might even feel more productive.

Intent-Driven Development argues that the engineering skill is in the thirty minutes, not the two hours. The quality of the starting intent is the leverage point. Everything downstream is a function of it.

## The Role Shift

Here's the part that's terrifying, and I want to name it honestly because sanitizing it helps nobody.

The work of software engineering is splitting. The top of the stack, defining what to build and why, is becoming the primary engineering activity. The bottom of the stack, verifying that what was built matches what was intended, is the other primary activity. The middle, where most engineers spend most of their time today, the actual writing of code, is what's compressing.

This doesn't mean engineers stop understanding code. You can't verify intent against implementation if you don't understand both. But the day-to-day activity shifts. Intent definition is design work. Review becomes intent verification: "does this match what I meant?" rather than "is this code well-structured?" The implementation step, the part that takes the most hours and defines the most careers, is the part that AI is absorbing.

We are terrified. That's real. Engineers who have spent years building craft in implementation are watching that craft become less central to their daily work. The industry is pretending this is just "upskilling" or "moving up the stack." It's not that simple. It's a redefinition of what the job is.

SASE frames this as the "Agent Coach" role: humans provide strategic intent, codified norms, and decision-making at escalation points. Zakas describes an evolution from Coder to Conductor to Orchestrator. These are useful frames, but they're clinical. The lived experience is more disorienting than any framework captures.

## Open Questions

I don't have answers to these. I'm naming them because pretending they're resolved, or ignoring them, is worse than sitting with the discomfort.

**How do junior engineers learn intent definition without first learning to code?** The ability to define precise intent comes from understanding how systems work. If you skip the implementation years, where does that understanding come from? We don't have a training pipeline for "people who've never written production code but need to direct AI that does."

**What does review look like when you didn't write the code?** Code review assumes shared context between author and reviewer. When AI is the author, the reviewer's mental model is intent, not implementation history. This is a different skill. We don't have patterns for it yet.

**How does institutional knowledge accumulate when AI sessions are stateless?** Every AI conversation starts from zero. The mentorship that happens through code review, through pairing, through "let me show you why we do it this way," all of that depends on persistent memory. AI doesn't have it. SASE identifies this gap and proposes named artifacts (MentorScripts, BriefingScripts) but nobody has solved it at scale.

**Does intent precision become the new measure of engineering skill?** If the quality of output is a function of the quality of input, then the ability to define precise, layered intent is the differentiating skill. What does that mean for hiring, for performance evaluation, for career progression?

**What happens to the craft of code?** There is genuine beauty in well-written code. Elegance, clarity, the satisfaction of a clean abstraction. If code becomes a generated artifact, does that craft survive? Does it matter? I think it does, but I can't articulate why in terms that survive the counterargument "the output works either way."

## Where This Goes

Intent-Driven Development isn't a methodology. It's an observation about where the weight of engineering work is moving. The fundamental loop (define, save, action, review, repeat) is a pattern I see working, and the principle (invest in intent quality, not iteration quantity) is one that rewards better engineering.

The formal models will come. SASE is the most ambitious attempt so far. SDD names a useful practice. DORA gives us measurement. Beck gives us values. Something will synthesize these into a shared vocabulary, the way Agile synthesized XP and Scrum and Lean into a movement.

Until then, we're practitioners building in a transitional period. The tools are ahead of the process. The process is ahead of the vocabulary. And the vocabulary is ahead of the organizational change required to make any of it stick.

The one thing I'm confident about: the engineers who thrive in this transition will be the ones who get good at intent. Not prompt engineering, which is a surface-level skill about syntax. Intent engineering: the ability to understand a problem deeply enough to describe what you want, why you want it, and how to know when you have it. That's always been the hardest part of software engineering. It's just becoming the only part that's ours.
