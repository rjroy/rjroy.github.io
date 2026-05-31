---
title: "The Meter Is Running"
description: "Token costs are real and rising. For agentic applications, being locked to one model is no longer viable. Switching providers dynamically has become a basic feature, not an optimization."
date: 2026-05-30
draft: true
tags: [ai, agents, llm, architecture, cost, model-agnostic]
---

# The Meter Is Running

<!--
HEART OF THE ESSAY (do not lose this):
1. The cost of tokens is real, and rising.
2. The ability to switch models and providers dynamically is now a basic feature.

Everything else (pi-agent, pi-works, the Anthropic policy change) is EVIDENCE,
not the subject. Keep the economic argument in the foreground.
Risk to guard against: tipping into a pi-agent advertisement. The cost ledger
and the retrofit scars are what keep this an essay.
-->

## The bill that changed the math

<!-- BEAT 1: the trigger. Anthropic changing its subscription policy so that
their own apps are billed at API rates. Use this as the concrete signal that
the "flat-rate vibes" era is ending, even for the provider itself. State it
plainly, no outrage. The point is the economics, not the company. -->

When the company that makes the model starts charging its own subscribers API
rates to run its own applications, the message is hard to miss: tokens are a
metered cost now, for everyone, including the people who mint them.

<!-- TODO: one or two sentences on the specific Anthropic subscription change,
stated factually with the date. Keep it short. It is the inciting detail, not
the topic. -->

## Why agentic apps feel it first

<!-- BEAT 2: agents loop. A chat prompt is one-shot. An agent re-reads files,
re-plans, calls tools, retries, streams. Token consumption is continuous, not
a single transaction. So the rising cost curve lands hardest on exactly the
kind of software I keep building. Locked to one provider means eating whatever
they charge with no escape valve. -->

A chatbot spends tokens once per turn. An agent spends them continuously: it
re-reads state, re-plans, calls tools, retries on failure, streams a response,
then does it again on the next step. The loop is the product. That makes the
cost curve land hardest on precisely the kind of software worth building right
now. And if the application can only talk to one provider, there is no escape
valve when that provider's price moves.

## Model choice is infrastructure now, not preference

<!-- BEAT 3: the reframe, the thesis. You would never build an application that
can only ever talk to one database, forever, at whatever price that vendor
sets. Model choice deserves the same treatment. Switching models and providers
dynamically is a baseline capability, in the same category as retries, caching,
and timeouts. Not an optimization you add later. A property you design in. -->

No one would ship an application hard-wired to a single database vendor with no
path to ever move off it. We treat that as obvious malpractice. Model choice has
quietly earned the same status. The ability to switch models and providers, and
to do it dynamically at runtime, belongs in the same category as retries,
caching, and timeouts: baseline infrastructure, designed in from the start, not
bolted on once the bill arrives.

## What model-agnostic actually takes

<!-- BEAT 4: the evidence layer. Keep it subordinate to the argument above.
Two layers made it real for me:
- pi-agent: a bare-bones agentic system that does not assume the provider.
  The model identifier becomes data, not an architectural fact.
- pi-works/fallback-provider: the dynamic switch. A chain declared in
  ~/.pi/fallback-chains.json routes one request through a prioritized list of
  provider/model pairs. Retry on transient errors, fall through on permanent
  ones. Primary on a frontier model, fall back to OpenRouter, then to a local
  ollama model. The app above it never knows.
- replicate-images: owning the integration layer also means owning capability
  you choose to add (image generation), not capability you wait for. Smaller
  point, mention briefly. -->

Talking about model independence is easy. Making it real took two layers.

The first is a bare-bones agentic substrate that does not assume who the
provider is. With [pi-agent](https://www.npmjs.com/package/@earendil-works/pi-coding-agent),
the model identifier is data, a string in a config, not a fact woven through
the tool definitions and message shapes. Swapping Claude for an OpenRouter model
or a local one stops being a rewrite.

The second is the part that turns "can switch" into "switches by itself." A
small extension, `pi-fallback-provider`, registers a virtual model whose
definition is a *chain*: a prioritized list of real provider/model pairs
declared in `~/.pi/fallback-chains.json`. A request routes through the list,
retrying on transient errors and falling through on permanent ones. The primary
can be a frontier model, the fallback an OpenRouter model, the last resort a
local ollama model that costs nothing but electricity. The application above the
chain never knows which one answered.

<!-- TODO: optional brief mention of replicate-images as the "owning the layer
means owning capability" point. Cut if it dilutes the cost argument. -->

## The proof: the retrofits, and the ledger

<!-- BEAT 5: the part that earns trust.
- The retrofits: Ink Mirror and Shelf Judge already existed on the old,
  Claude-locked SDK. Porting them tested the abstraction against code that was
  never designed to move. Say what was easy and what fought you. This paragraph
  lives or dies on a concrete detail.
- The cost ledger, honest: bought = provider independence, a local-first
  option, resilience (a chain survives one vendor going down), real cost
  control. Cost = you maintain the seam now, model quality varies, you own the
  failure modes the SDK used to hide for you.
- Close: dynamic provider switching is the new baseline. Building agentic
  software without it is building a liability with a meter attached. -->

<!-- TODO: the retrofit story. Ink Mirror and Shelf Judge were built on the
Claude Agent SDK before pi-agent existed. What did porting them actually feel
like? What moved cleanly, what fought back? One concrete scar makes this
section honest. -->

<!-- TODO: the new builds. commission-runner and oracle-keep.
For each: domain, what role the agent plays, and which provider/model the
chain points at. These are load-bearing and I do not have them yet. -->

The honest ledger. What the switch bought: independence from any single
provider's pricing, a local-first option when the work does not need a frontier
model, resilience when a vendor has a bad day, and actual control over the bill.
What it cost: I maintain the seam now, model quality varies in ways I have to
account for, and I own the failure modes the SDK used to hide. That trade is
worth it, but only because I went in seeing both sides of it.

<!-- CLOSING LINE: dynamic provider switching is the baseline now. Skipping it
is building a liability with a meter attached. Tie back to the daemon-first
stance: owning the model layer is the natural completion of owning your state. -->

## Related

- [[Ideas/Daemon-First-Agent-Native/index|Daemon-First, Agent-Native]] — owning the model layer is the natural completion of owning your own state. That piece admitted a gap (decomposition done, agents not yet wired into the composition); the new builds are where that closes.
- [[Ideas/Leveraging-Local-LLMs/index|Leveraging Local LLMs]] — why a local fallback is genuinely viable now, not a toy.
