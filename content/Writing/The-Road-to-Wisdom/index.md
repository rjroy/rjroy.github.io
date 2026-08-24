---
title: "The Road to Wisdom"
description: "The next steps of AI is to rethink our jobs, not replace them. The new job is about providing your unique value-add. This can be summed up for most  of us as judgement or wisdom. What does this mean? And how do we get there?"
date: 2026-08-23
tags: [software-engineering, agents, process, wisdom, service-design]
---

# The Road to Wisdom

## Where Are We Going?

I have a lot of questions of where we go next. We've built this AI think. We are told it will replace all our jobs, or it cannot replace any.

We are asked to create a system where leadership can issue the prompt, "Make me a game which can support 100 million players concurrently targeting the 18 to 30 demographic." Or to simplify this the ask is to create the Easy Button. We have AI. You can have it write the specs, write the design, write the implementation, review it all along the way, fix the bugs, test it, and even ship it. Should be easy right?

The Easy Button is so tempting, but also a lie. This isn't about self-preservation that I need my job, but a question of wisdom. LLMs aren't wisdom or judgement. They take an input and predict the next possible output. The reason it can fixed bugs is because part of the training about what comes next after seeing an error is an attempt at a solution. Although, this is also a tempting dumbing down of how an LLM works. The truth is somewhere in the middle.

Many will bemone the lost of the craft of coding. I myself have spent sometime at [IOCCC](https://ioccc.org/). There is bueaty there, but I'm not sure it'll be the job any more. At least not a scale. If you want to develope something like [Dwarf Fortress](https://en.wikipedia.org/wiki/Dwarf_Fortress) then there's an audience for it, and I say have fun. I want to explore what it means to really take on AI and take the next steps. Maybe you could develop *Dwarf Fortress* with full AI use, but something tells me that audience (given the 20+ years of development) wouldn't appreciate it as much.

There's a view of what comes next is a shake up of what it means to work. Many jobs will change. In the middle between the Easy Button and manual implementation lies a future we can shape.

## The Road to Wisdom

To really transform what it is to be an engineer, we need to get a point where the job is just applying our wisdom. All phases of implementation can be handled by the LLM. This doesn't mean relinquishing all decisions or judgement, but it does mean finding ways to make sure that the work we do is about the decisions and judgement, and only that.

Asking an LLM to generate an implementation to a feature or a fix is pretty straight forward now. At this point, you just open just about any model and it'll get you something that'll likely fit the bill. We can even add in systems to make it so it tests and reviews the results and loops until the validation criteria are meet. This sounds like the Easy Button. Reducing it to that would miss a few crutial questions. Who defined the feature? Who defined the validation criteria? Simply this is where human wisdom lies.

When you start up any harness, this is where you are now. You have to give the AI the reuqest to define the feature. Then you iterate with it and poke at it making sure the validation criteria is handled. Except, if you are just using a bare harness you are also spending a lot of time going over the implementation and reviewing the code.

## Defining the Destination

What does it look like to actually have humans in the loop only providing wisdom? I see a few directions this can go. It's likely we'll have to make some wrong turns, or even simply keep our options open indefinitely. 

*Human provides input. AI generates output. Human provides feedback. AI regenerates output and repeat.* Is the simplest loop and what we have now. The only difference would be how one approaches the job. The human would not be concerned with how the output was generated, just that it was. It becomes a paradigm shift with how you use it. How most people videcode skips provides the feedback based on the results of them testing the output.

*Human provides input. AI starts an internal loop to generate output and review until done or a need to escalate.* This now tightens the loop the AI work does on its own and only escaltes to the human when it decides its necessary. The human then is just concerned with defining what needs to happen, and reviewing anything the AI requests review on. There's an open question here of "what does the AI escalate?" which we can discuss later. This is pretty much to most of the `/goal` and `ralph loop` systems we've seen.

*Human provides intent. AI proposes solution. Human approves. AI starts implementation and review loop. AI escaltes completion or blocker (i.e. the solution won't work).* This process spreads out loop just a little bit and defines concrete checkpoints. For me this is as close as we are going to get to human's only apply wisdom.

There's a lot of talk about the evolution of AI engineering from prompt to context to loops to graph. And we could map my definitions to these, but I always found the vague definition of "graph engineering" just not enough to actually get to implementation. Also both loop and graph engineering assume one important thing: infinite tokens. The definitions are just not that useful in the real world.

## Making the Journey

Let's take that last definition and expand it a bit more before we get into some architecture. With each step of the process I'm going to add the open questions.

Starting at the beginning. We'll want a human to be able enter an intent. We could also call these wishes, issues, or tasks. While semantics matter, for me I'm going to define it as intents. Here we will want to consider what form this intent takes. Is it just 1 line? Will it be a document? How do we associate the intent with other context? Is that even necessary?

The next stepp will be a process where by the AI should review the intent and then propose a solution. AI can make mistakes because inheritely there is a element of randomness. This is important to remember. This means whatever we do we should have automated validation. This should reduce the errors. Even in this planning step, having the plan validated is important. There's actually a lot of open questions here. Does the type of intent matter for how the plan is generated? Reviewed? Is this actually a mini implementation loop?

After the AI has a plan the human should be allowed to accept or reject it. This could be a simple check box, but probably should be closer to something like the github review system. Is there every a case where a plan is so straight forward that no human needs to accept it?

In the definition, I hand waved a lot of the implementation steps because that's where most of us are already working. It also is where many are devoting there time to, developing the "Software Factory". This should be broken down into coding, testing, review, and the loop. The first 3 parts (coding, testing, and review) can universally be defined with agent skills. The implementation loop is whatever service or harness you have to make sure the AI will run the other 3 parts. Can `/goal` work for this? Or is it better for it to be a custom service? 

## One Way to Build the Path

There's a lot of open questions there. I think a proper solution will be bespoke to each project. You might be able to get away with one solution for your whole company, but all my instincts tells me that unless you already have a humogionus development environment this will not work.

The simplest implementation can be setup with [Beads](https://github.com/gastownhall/beads), custom skills, and `/goal` in most harnesses. *Beads* provides management AND history of intents. I myself am still investigate this, so I'm going to have to leave *Beads* as homework. The use of `/goal` as the implementation loop is also pretty straight forward and also going to leave to homework. As for the skills, think we can get into some detail.

Agent skills are going to be a must in any system you develop. They are the easiest way to provide customization which can be changed as the LLMs evolve. You'll want to consider what you do at each base of development and make sure a skill exists for that. Here's a brief list of what I think you'll need, off the top of my head:

- Language Specific Coding Style - You should consider not what makes it easier for a human, but for an agent.
- Language Specific Quality Guides - The AI wants the fast solution, but you want the right one.
- Language Specific Review - "It compiles" isn't enough for a longterm quality.
- Language Specific Testing Framework - For `rust` this is straight forward, but for `C++` it is not.
- Organization Testing Guidelines - What does it mean to have enough testing? Is there such a thing as too many tests (hint: yes because they take time)?
- Documentation Guidelines - What should a plan look like? What does a validation criteria look like?

Starting here isn't a bad way to go. The next steps would be that bespoke system that could sit on top of this. Essentially providing a UX that allows for that github style review system on plans, specs, testing results, or whatever other output you decide to have the AI show to you.

## It's Built. Now What?

Okay, you've built the thing and now all the human needs to do is apply judgement. You did it. All your senior engineers are fully engaged! Your junior engineers have no idea what is going on! This is a big problem. How will they gain the wisdom to make the correct judgement?

It's going to be important to allow human intervention at every stage of the operation. This could mean slowing down the implementation loop so that its not completely automated. Or it could mean that junior engineers are allowed to run the implementation loop manually with a harness where the are encouraged to ask the AI many "why did you do that?" questions.

This isn't about giving them busy work so they learn. It does mean acknowledging that as an industry, we need to invest in junior developers even if your company isn't the one that directly profits from it. *"A rising tide lifts all boats."* It might be hard for many to be able to accept or even get approved.

It might be easier to consider this stage as the intern stage. The new engineering levels becomes about the size of the features that the engineer is asked to make the decisions.

It's a tough road a head for us. There's a lot of work to do and define. We won't get there without thinking and making the tough decisions.

## Related

- [[Writing/Intent-Driven-Development/index|Intent-Driven Development]] — the earlier argument that AI compresses implementation and shifts engineering work toward defining intent and verifying results.
- [[Ideas/Daemon-First-Agent-Native/agent-native-layer|Agent-Native Layer]] — a related architectural distinction between stable system primitives and agent judgment.
