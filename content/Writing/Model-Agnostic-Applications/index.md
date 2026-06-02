---
title: "Model-Agnostic Applications"
description: "Token costs are real and rising. For agentic applications, being locked to one model is no longer viable. Switching providers dynamically has become a basic feature, not an optimization."
date: 2026-05-30
tags: [agents, llm, architecture, cost, model-agnostic]
---

# Model-Agnostic Applications

## The meter is running

The subscription model for AI was never meant to run a business on. It is good at
one thing: giving hobbyists room to explore. Hobbyists are still learning what
these systems can actually do, and the answer changes fast, sometimes day to day.
Whether or not you like how the subscription model is shifting, the shift is
inevitable.

In December a new kind of agent harness arrived: OpenClaw. Instead of answering
one prompt at a time, you hand it a loose goal and it runs unattended, planning
and re-planning until the work is done, often overnight. The output is genuinely
impressive. The token bill is the catch: a single night's run can cost more than
a month of subscription.

Once every token costs real money, being locked to one model stops being a
convenience and turns into a bill you cannot manage.

## Choice over consistency

You would think a model's own SDK is the best way to use that model. You would be
right, and that is exactly the trap. The provider SDK is tuned for the provider,
and it locks you to them. I chose it originally so I could run the subscription
against the agents. With that gone, a provider-neutral SDK is the obvious move.

What I did not expect was that choice would change how I build, not just what I
pay. I now pick the model per task: big, medium, small, free, or local. The
foundation-lab models are more reliable and more consistent. But consistency is
not always what you want. For some work, a model that wanders off the obvious
path is the feature, not the bug.

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
or local models through Ollama. Running the same task through a frontier model,
then a free one, then a local one is the fastest way to find where a model's
competence actually ends. The cheap ones tend to hold up fine until the tool
calls chain more than a few deep, and then they lose the thread.

## Putting it into practice

Theory only goes so far. Here is what model-agnostic actually looked like across
six of my projects: two built on it from the start, four retrofitted onto it.

The two I built fresh assumed a swappable model layer from the first line. Oracle
Keep is a browser chat interface wrapped around a Pi agent session, so the
provider was never baked in; the model is just a setting. Commission Runner is a
Rust service that watches directories for markdown intent files and routes each
one to a backend behind a single async trait, which means model choice was not a
feature I bolted on, it was the shape of the thing, and a second backend slots in
beside the first without the runner noticing.

The four retrofits went faster than I expected, and for the same reason every
time. I had already kept each one's AI calls behind a daemon, in a single place,
without ever planning for a swap. Memory Loop, which I use to capture into this
very vault, reaches its model through one session factory; the migration touched
a single file. Ink Mirror keeps every model call in the daemon, so the change
never reached the UI or the CLI. Shelf Judge barely touches AI. It predicts how a
board game will land before I buy it and nothing else, which made it the
lowest-risk swap of the set. The one I cared most about getting right was
Adventure Engine of Corvran, where an AI runs a tabletop game with you, and even
there the work never left the backend. The backend was the only place the model
had ever lived.

Owning your own state and keeping model calls in one place is what makes the
provider swappable. Where I had already done that, going model-agnostic was
nearly free.

## Final Thoughts

This is one journey, mine, and it probably isn't a problem for most projects.
But if there's a universal lesson here, it's this: be careful of the agent
integration layer, and be careful of getting locked into it. The AI industry
flips on its head every few months. To stay useful, an application has to be
updated regularly, and that now covers more than the prompts you run it with. It
covers the models and the providers too. Don't lock your application in.

## Related

- [[Ideas/Daemon-First-Agent-Native/index|Daemon-First, Agent-Native]] — owning the model layer is the natural completion of owning your own state. That piece admitted a gap (decomposition done, agents not yet wired into the composition); the new builds are where that closes.
- [[Ideas/Leveraging-Local-LLMs/index|Leveraging Local LLMs]] — why a local fallback is genuinely viable now, not a toy.
