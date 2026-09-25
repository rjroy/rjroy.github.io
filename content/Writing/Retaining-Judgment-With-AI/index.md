---
title: "Retaining Judgment With AI"
description: "An exploratory outline on what engineering judgment needs when implementation becomes cheap."
date: 2026-09-18
tags: [software-engineering, ai, judgment]
---

# Retaining Judgment With AI

## There is still work to be done

We despretely want to be able to click the button and get a solution. The current LLM form of AI is where we are looking for that solution. For easy or one off problems this works. For anything you need to build up and maintain overtime this becomes harder. For software of a legacy system written in C++ this is down right impossible.

Maybe that's not even the right way of thinking about this. The LLM will generate code quickly. Rather that code is correct, safe, or maintainable is highly suspect. And maybe that's okay. Maybe the real question is how does the user retain the judgement over the project? With that judgement they can maintain the correctness, safety, and maintainability of the code.

## It doesn't matter what we do but what we do

How much judgement we need to inject matters greatly on the work being done. Many developers are seeing great returns simply because they are using TypeScript and the corpus of training data is vast. Others are leaning into languages state have safety guarantees built in like Rust. Then you have C++ where by its nature anything goes, and therefore you have every way to fail. Then you have to consider why type of software you are developing. Maybe you aren't even doing software.

We can talk in generalities and it may work, but that's not going to be the end of the discussion. The specific work that you do can and should influence the solution you use to allow you to retain judgement.

## What kind of work is this?

- The needed depth of understanding probably depends on the problem domain, the stakes of failure, and how reversible a decision is.
- A disposable internal tool and a safety, financial, or durable platform decision should not demand the same confidence.
- Familiarity with a language changes the shape of the risk, but does not settle it:
  - TypeScript can make local code legible while runtime boundaries still violate its promises.
  - Rust safe-code guarantees reduce some classes of failure, not architectural mistakes or bad product decisions.
  - C++ brings permissiveness, historical context, and project constraints that may be difficult for an agent or reviewer to recover.

## Possible ways to retain judgment

- **Human understanding:** someone can explain the relevant behavior, constraints, and tradeoffs.
  - Weakness: this is expensive, and AI can encourage people to claim understanding they have not earned.
- **External constraints:** types, tests, specifications, invariants, reviews, and operational checks can limit what goes wrong.
  - Weakness: AI can write the tests and requirements from the same misconception that produced the code.
- **Cheap reversal:** make decisions small, observable, and easy to change when evidence disagrees.
  - Weakness: not every decision is actually cheap to reverse, especially after data, dependencies, and team habits accumulate.

## Architecture as a question of future change

- Architecture may be better tested by asking whether a plausible next change still has a clear place to go.
- Useful probes might include adding streaming, cancellation, or concurrency, without treating every possibility as a reason to build for it now.
- The goal is not speculative overengineering. It is to see whether the current shape makes likely evolution needlessly expensive or dangerous.

## What judgment might mean in an AI workflow

- Retaining judgment could mean staying accountable for outcomes rather than merely approving generated artifacts.
- It could mean knowing what evidence supports a decision, what tradeoffs were chosen, and what remains uncertain.
- Review risks becoming ceremonial when the reviewer is asked to bless a large change without the context or time to challenge it.
- There may also be a slower cost: implementation is where many engineers build the instincts that later make review and design possible. If that practice erodes, what replaces it?

## Open questions

- What distinguishes expert delegation from dependence in an unfamiliar domain?
- When is it responsible to rely on external constraints instead of direct understanding, and who decides?
- Which kinds of architectural judgment can be encoded in tools or process without making the process performative?
- How should teams preserve the learning that used to happen through implementation while taking advantage of AI's speed?
- What evidence would show that a team is retaining judgment rather than simply shipping more plausible-looking code?
