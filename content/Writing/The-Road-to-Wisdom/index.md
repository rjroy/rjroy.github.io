---
title: "The Road to Wisdom"
description: "AI should transform engineering work, not simply replace it. As implementation becomes increasingly automated, the human role becomes applying judgment: defining intent, evaluating tradeoffs, and deciding what good work looks like. What does that require, and how do we get there?"
date: 2026-08-23
featured: true
tags: [software-engineering, agents, process, wisdom, service-design]
---

# The Road to Wisdom

## Where Are We Going?

I have a lot of questions about where we go next. We've built this AI thing. We are told it will replace all our jobs, or that it cannot replace any. If we boil this problem down its: what will the job of human's be? My answer is: to use our wisdom to apply judgement.

We are asked to create a system where leadership can issue the prompt, "Make me a game which can support 100 million players concurrently, targeting the 18 to 30 demographic." Put more simply, the ask is to create the Easy Button. We have AI. You can have it write the specs, write the design, write the implementation, review it all along the way, fix the bugs, test it, and even ship it. It should be easy, right?

The Easy Button is so tempting, but also a lie. This isn't about self-preservation or needing my job, but a question of wisdom. LLMs aren't wisdom or judgment. They take an input and predict the next possible output. The reason they can fix bugs is because part of the training data for what comes next after seeing an error is an attempt at a solution. This is also a tempting dumbing down of how an LLM works. The truth is somewhere in the middle.

Many will bemoan the loss of the craft of coding. I myself have spent some time at [IOCCC](https://ioccc.org/). There is beauty there, but I'm not sure it will be the job anymore. At least not at scale. If you want to develop something like [Dwarf Fortress](https://en.wikipedia.org/wiki/Dwarf_Fortress), then there's an audience for it, and I say have fun. I want to explore what it means to really take on AI and take the next steps. Maybe you could develop *Dwarf Fortress* with full AI use, but something tells me that audience, given the 20+ years of development, wouldn't appreciate it as much.

There's a view that what comes next is a shake-up of what it means to work. Many jobs will change. In the middle, between the Easy Button and manual implementation, lies a future we can shape.

## The Road to Wisdom

To really transform what it is to be an engineer, we need to get to a point where the job is just applying our wisdom. All phases of implementation can be handled by the LLM. This doesn't mean relinquishing all decisions or judgment, but it does mean finding ways to make sure that the work we do is about the decisions and judgment, and only that.

Asking an LLM to generate an implementation for a feature or a fix is pretty straightforward now. At this point, you can open just about any model and it will get you something that will likely fit the bill. We can even add systems that test and review the results, then loop until the validation criteria are met. This sounds like the Easy Button. Reducing it to that would miss a few crucial questions. Who defined the feature? Who defined the validation criteria? Put simply, this is where human wisdom lies.

I'm even simplifying the problem by simply calling it *wisdom*. Any engineer at any level brings to the interaction with AI everything they have learned. From the moment they learned to walk to the moment they started typing to now, they have gained context that would be impossible, or impractical at least, to feed into the LLM. This includes all the facts they know, but also layered in there are their beliefs and tastes. This casserole of context is what I refer to as *wisdom*.

When you start up any harness today, you get this base environment. You give the AI the request to define the feature. Then you iterate with it and poke at it, making sure the validation criteria are met. Except, if you are just using a bare harness, you are also spending a lot of time going over the implementation and reviewing the code. If we want to reinvent and move forward, we need to rethink this.

## Defining the Destination

What does it look like to actually have humans in the loop only providing wisdom? I see a few directions this can go. It's likely we'll have to make some wrong turns, or even simply keep our options open indefinitely.

*Human provides input. AI generates output. Human provides feedback. AI regenerates output and repeats.* This is the simplest loop and what we have now. The only difference would be how one approaches the job. The human would not be concerned with how the output was generated, just that it was. It becomes a paradigm shift in how you use it. How most people vibecode changes "provide feedback" to be based only on the results of testing the output.

*Human provides input. AI starts an internal loop to generate output and review until done or there is a need to escalate.* This now tightens the loop the AI's work does on its own and only escalates to the human when it decides it is necessary. The human then is just concerned with defining what needs to happen and reviewing anything the AI requests review on. There's an open question here of "what does the AI escalate?" which we can discuss later. This is pretty close to most of the `/goal` and `ralph loop` systems we've seen.

*Human provides intent. AI proposes a solution. Human approves. AI starts an implementation and review loop. AI escalates completion or a blocker (i.e., the solution won't work).* This process spreads out the loop just a little bit and defines concrete checkpoints. For me, this is as close as we are going to get to humans applying only wisdom.

There's a lot of talk about the evolution of AI engineering from prompt to context to loops to graph. The three proposals I give above could map roughly onto that evolution. It might be useful to consider that. However, consider that many of the definitions of loop and graph engineering out there silently assume infinite tokens.

Let's focus on the last definition where it spreads the process out slightly. It's the most complete and provides more points for architecture. The goal cannot be simply to make sure that *wisdom is the work*, but that *consistently and repeatably the work is to apply wisdom*.

## Making the Journey

Let's take that last definition and expand it a bit more before we get into some architecture. With each step of the process I'm going to add the open questions.

Starting at the beginning, we'll want a human to be able to enter an intent. We could also call these wishes, issues, or tasks. While semantics matter, I am going to define them as intents. Here we will want to consider what form this intent takes. Is it just one line? Will it be a document? How do we associate the intent with other context? Is that even necessary?

The next step will be a process whereby the AI reviews the intent and then proposes a solution. AI can make mistakes because inherently there is an element of randomness. This is important to remember. This means that whatever we do, we should have automated validation. This should reduce errors. Even in this planning step, having the plan validated is important. There's actually a lot of open questions here. Does the type of intent matter for how the plan is generated or reviewed? Is this actually a mini implementation loop?

After the AI has a plan, the human should be allowed to accept or reject it. This could be a simple checkbox, but it should probably be closer to something like the GitHub review system. Is there ever a case where a plan is so straightforward that no human needs to accept it?

In the definition, I hand-waved a lot of the implementation steps because that's where most of us are already working. It is also where many are devoting their time to developing the "Software Factory." This should be broken down into coding, testing, review, and the loop. The first three parts (coding, testing, and review) can universally be defined with agent skills. The implementation loop is whatever service or harness you have to make sure the AI will run the other three parts. Can `/goal` work for this? Or is it better for it to be a custom service?

## One Way to Build the Path

There's a lot of open questions there. I think a proper solution will be bespoke to each project. You might be able to get away with one solution for your whole company, but all my instincts tell me that unless you already have a homogeneous development environment, this will not work.

The simplest implementation that I would consider uses [Beads](https://github.com/gastownhall/beads), custom skills, and `/goal` in most harnesses. *Beads* provides management and history of intents. I myself am still investigating this, so I'm going to have to leave *Beads* as homework. The use of `/goal` as the implementation loop is also pretty straightforward and is also going to be left as homework. As for the skills, I think we can get into some detail.

Agent skills are going to be a must in any system you develop. They are the easiest way to provide customization that can be changed as the LLMs evolve. You'll want to consider what you do at each phase of development and make sure a skill exists for that. Here's a brief list of what I think you'll need, off the top of my head:

- Language-Specific Coding Style - You should consider not what makes it easier for a human, but for an agent.
- Language-Specific Quality Guides - The AI wants the fast solution, but you want the right one.
- Language-Specific Review - "It compiles" isn't enough for long-term quality.
- Language-Specific Testing Framework - For `Rust`, this is straightforward, but for `C++`, it is not.
- Organization Testing Guidelines - What does it mean to have enough testing? Is there such a thing as too many tests (hint: yes, because they take time)?
- Documentation Guidelines - What should a plan look like? What do validation criteria look like?

Starting here isn't a bad way to go. The next step would be that bespoke system that could sit on top of this, providing a UX that allows for that GitHub-style review system for plans, specs, testing results, or whatever other output you decide to have the AI show you.

## It's Built. Now What?

Okay, you've built the thing, and now all the human needs to do is apply judgment. You did it. All your senior engineers are fully engaged! Your junior engineers have no idea what is going on! This is a big problem. How will they gain the wisdom to make the correct judgment?

It's going to be important to allow human intervention at every stage of the operation. This could mean slowing down the implementation loop so that it is not completely automated. Or it could mean that junior engineers are allowed to run the implementation loop manually with a harness where they are encouraged to ask the AI many "why did you do that?" questions.

This isn't about giving them busy work so they learn. It does mean acknowledging that, as an industry, we need to invest in junior developers even if your company isn't the one that directly profits from it. *"A rising tide lifts all boats."* It might be hard for many to accept or even get approval for.

It might be easier to consider this stage as the intern stage. The new engineering levels become about the size of the features that the engineer is asked to make decisions about.

I don't know all the questions we need to ask, and know even fewer of the answers. It's a tough road ahead for us. There's a lot of work to do and define. We won't get there without thinking and making the tough decisions.

## Related

- [[Writing/Intent-Driven-Development/index|Intent-Driven Development]] — the earlier argument that AI compresses implementation and shifts engineering work toward defining intent and verifying results.
- [[Ideas/Daemon-First-Agent-Native/agent-native-layer|Agent-Native Layer]] — a related architectural distinction between stable system primitives and agent judgment.
