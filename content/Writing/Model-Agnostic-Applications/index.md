---
title: "Model-Agnostic Applications"
description: "Token costs are real and rising. For agentic applications, being locked to one model is no longer viable. Switching providers dynamically has become a basic feature, not an optimization."
date: 2026-05-30
draft: true
tags: [ai, agents, llm, architecture, cost, model-agnostic]
---

# Model-Agnostic Applications

## The meter is running

The subscription model for AI was never meant to run a business on. What it does
well is give hobbyists room to explore. We are all still learning what these
systems can actually do, and the answer changes fast, sometimes day to day.
Whether or not you like how the subscription model is shifting, the shift is
inevitable.

In December a new kind of agent harness arrived: OpenClaw. You give it a loose
definition of your goals and let it work out the solution on its own, often while
you sleep. That breaks the subscription model, because now you can burn far more
tokens in a night than the subscription is worth.

So now what? Once every token an application spends costs real money, what do you
do? That is where this starts.

## Unlock the agent

You would think the SDK built by a model's own provider would be the best way to
use that model. You would be right. It is also the thing that locks you to that
provider. When I first made that call for my applications, it was mostly so I
could run the subscription against the agents. With that option gone, switching
to a provider-neutral SDK becomes the obvious move.

For me it came down to choice. Now I decide which model runs when, and not just
big, medium, or small. Free or local too. There are real trade-offs. The
foundation-lab models are far more reliable and consistent, but you do not always
need that consistency, and once in a while its absence is the point.

## The path I followed

I landed on [Pi](https://pi.dev). It is an extensible CLI that starts bare-bones,
with [pi-agent](https://www.npmjs.com/package/@earendil-works/pi-coding-agent) in
the same ecosystem sharing the underlying machinery. I picked it for the choice it
gives me and for its hobbyist bent.

Then I extended it. I found an extension, `pi-fallback-provider`, that lets me
define a prioritized chain of models behind a single aliased model name. I had to
re-implement parts of it to get the behavior I wanted, and a few tweaks still
remain. What it buys me is a fallback to free models when I run out of tokens. I
would not run this in production, but for hobby exploration it is great.

With that in place I can move between Anthropic, OpenAI, anything on OpenRouter,
or local models through Ollama. It has shown me things about how models behave
that I did not know before.

## Making use of it

Theory only goes so far. Here is what model-agnostic actually looked like across
six of my projects: two built on it from the start, four retrofitted onto it.

The two I built fresh assumed a swappable model layer from the first line. Oracle
Keep is a browser chat interface wrapped around a Pi agent session, so the
provider was never baked in; the model is just a setting. Commission Runner is a
Rust service that watches directories for markdown intent files and routes each
one to a backend behind a single async trait, which means model choice was not a
feature I bolted on, it was the shape of the thing, and a second backend slots in
beside the first without the runner noticing.

The four retrofits went faster than I expected, and for the same reason each
time: I had already kept every AI call behind a daemon, in one place, without
planning for this. Memory Loop, the tool I use to capture into this very vault,
talks to its model through a single session factory, so the swap touched one
file's worth of wiring. Ink Mirror, which watches my journal entries and reflects
my writing patterns back at me, has its daemon own every model call, so the
provider change never leaked into the UI or the CLI. Shelf Judge leans on AI
lightly, mostly to predict fitness for board games still on my wishlist, which
made it the lowest-risk swap of the set. Adventure Engine of Corvran, where an AI
plays a tabletop game alongside you, was the one I most wanted to get right, and
even there the change stayed inside the backend because that was the only place
the model ever lived.

The thread tying all six together is simple. Owning your own state and keeping
model calls in one place is what makes the provider swappable. Where I had already
done that, going model-agnostic was nearly free.

## Related

- [[Ideas/Daemon-First-Agent-Native/index|Daemon-First, Agent-Native]] — owning the model layer is the natural completion of owning your own state. That piece admitted a gap (decomposition done, agents not yet wired into the composition); the new builds are where that closes.
- [[Ideas/Leveraging-Local-LLMs/index|Leveraging Local LLMs]] — why a local fallback is genuinely viable now, not a toy.
