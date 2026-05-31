---
title: "Model Agnostic Applications"
description: "Token costs are real and rising. For agentic applications, being locked to one model is no longer viable. Switching providers dynamically has become a basic feature, not an optimization."
date: 2026-05-30
draft: true
tags: [ai, agents, llm, architecture, cost, model-agnostic]
---

# Model Agnostic Applications

## The meter is running

The subscription model of AI was never meant to run a buisness on. It does allow
hobbyist a chance to explore what is possible. We are all still learning what
the systems can truely do. And what they can do changes rapidly, even daily.
Rather you agree with exactly how the subscription model is changing, it is ineffitable.

In December, a new type of agent harness was released onto the world: OpenClaw.
It allows you to losely define your goals and just wait for it to work out the
solution. Especially while you sleep. This breaks the subscription model because
now you are spending way more tokens than the subscription is worth.

So now what? Now that every token an application uses will cost, what do you do?
And this is where the story begins.

## Unlock the agent

You'd think that using the agent SDK used by the model provider would be the best for the model.
And you'd be right, but then you are locked into that provider. When I made this decision for
my applications it was mostly because I could use the subscription model with the agents. With
that feature removed, switching to a different SDK becomes the right call.

For me it was about choice. Now I could decide which model to use when. And not just big, medium, or small.
But also free or even local models. There are some significant trade offs by doing this. The foundation
labs models are significantly more reliable and consistent, but sometimes you don't need that consistency
or its even an advantage.


## The path I followed

I found this system: [Pi](https://pi.dev). It's primiarly an extensible CLI that
starts bare-bones. It also has [pi-agent](https://www.npmjs.com/package/@earendil-works/pi-coding-agent)
as part of its eco system. They share the same underlying functionality. I choose
this for choice, and the hobbyist bent.

The next thing I did was in fact extend it. I found an extension
`pi-fallback-provider`. It allows me to have a priroiritized chain of models
using an aliased model name. I did have to re-implement it to get it to work the
way I want, and still has some tweaks to be made. It does allow me
to have a fallback to free models when I run out of tokens. I wouldn't
recommend this for production, but for hobby exploration it's great.

With this in place I can go between Anthropic, Open AI, any of the models on OpenRouter,
or even Ollama local models. It's allowed me to see somethings about how models
work that I didn't know before.

## Making use of it

<!-- TODO turn this into prose and not a list. A primer couple of sentences. Then for each 1-2 sentences on why the change was straight forward and correct. -->

- Built: Orcale Keep <!-- see ~/Projects/oracle-keep/ -->
- Built: Commission Runner <!-- see ~/Projects/commission-runner/ -->
- Retrofit: Ink Mirror <!-- see ~/Projects/ink-mirror/ -->
- Retrofit: Memory Loop <!-- see ~/Projects/memory-loop/ -->
- Retrofit: Shelf Judge <!-- see ~/Projects/shelf-judge/ -->
- Retrofit: Adeventure Engine of Corvran <!-- see ~/Projects/adventure-engine-corvran/ -->

## Related

- [[Ideas/Daemon-First-Agent-Native/index|Daemon-First, Agent-Native]] — owning the model layer is the natural completion of owning your own state. That piece admitted a gap (decomposition done, agents not yet wired into the composition); the new builds are where that closes.
- [[Ideas/Leveraging-Local-LLMs/index|Leveraging Local LLMs]] — why a local fallback is genuinely viable now, not a toy.
