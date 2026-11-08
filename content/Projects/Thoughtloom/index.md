---
title: Thoughtloom
description: Rebuilding an AI-assisted thinking tool after the first attempt let every interface change reshape the application.
date: 2026-11-08
status: active
cover: /Projects/thoughtloom/screenshots/brand-imagery.webp
tags:
  - area
  - knowledge-management
  - ai
  - software-development
---

# Thoughtloom: The Second Attempt

Thoughtloom is an AI-assisted tool for capturing rough thoughts, developing them through conversation, and finding connections to ideas already in my library.

This is my second attempt at Thoughtloom. The first attempt had a problem that became hard to ignore: every UX change seemed to require changing everything else. Adjust a screen, rewrite the model. Ask for a different interaction, watch the change spread through the application.

I still wanted the product. I didn't want to keep building it that way.

For the second attempt, we went back through the features and the decisions behind them. Then I made the separation between the business logic and the visual interface an explicit working agreement for the agents building it.

**Source:** [github.com/rjroy/thought-loom](https://github.com/rjroy/thought-loom)

![Explore showing search results, authorship and material filters, and sorting controls.](/Projects/Thoughtloom/screenshots/explore.webp)

*The current interface, shown with sample data. These screenshots use scripted AI replies, not live model output.*

## A Place to Develop Thinking

Thoughtloom starts with a rough thought. Capture it without worrying about a title or where it belongs. An AI agent can interpret it and look for connections to things already in the library. I can develop it through a conversation, follow a connection, or branch from an earlier point.

The original thought doesn't change. Development creates another thought, with its own author and a link to its parent. An AI interpretation is not a correction to what I wrote, and reading it doesn't mean I agree with it.

That distinction matters. I want to retain the path that led somewhere, including the parts I no longer agree with. I can reject a thought or a branch without deleting the record, while keeping rejected material out of the application's AI retrieval.

![An original thought with its AI interpretation and a supporting connection listed under Surrounding context.](/Projects/Thoughtloom/screenshots/idea.webp)

*The original remains intact. Its interpretation and supporting connection are separate records with different relationships.*

Finding things matters as much as developing them. Conventional search is useful when I know what I'm looking for. Conversational search is for narrowing down to an idea I might not remember how to name. Its job is to rediscover existing thoughts, not quietly add new ones while searching.

Those are rules about thinking and its history. They shouldn't depend on whether the interface uses a sidebar, a card, or a conversation panel.

## The Screen Was Making Too Many Decisions

An AI agent can follow an interface change across several layers and produce something that works. That makes it easy to miss whether we're improving the interface or redefining the application to accommodate it. A working screen isn't evidence that all those changes belonged in the task. If the model keeps moving underneath the interface, the next improvement starts from another set of assumptions.

The restart wasn't about picking a stack that would prevent this. It was about deciding which parts of the system were allowed to make which decisions, then making that agreement available to every agent working on it.

## Build the Daemon Before the Website

The stack is Next.js and React for the website, Hono for the daemon, Bun for the runtime and tooling, and SQLite for storage. OpenCode provides the agent runtime.

The more important decision was the order of work.

We built the daemon first: thoughts, ancestry, connections, rejection, restoration, and the operations that enforce those rules. I asked for practical scripts so I could exercise the system without a polished interface. They didn't need to be a beautiful CLI. They needed to let me capture something, inspect it, search it, and see whether the behavior made sense.

That gave us a way to validate the product without simultaneously deciding how to display it. Agent integration then had to use those same domain operations rather than establish a second set of rules.

The browser also has a fixed boundary:

```text
Browser (React) → Next.js server → Hono daemon
```

Credentials stay server-side. The daemon owns business decisions such as identities, timestamps, ancestry, and authorized changes. The client expresses what the user wants to do.

Rejection filtering applies to the application's AI retrieval. It doesn't prevent an agent with trusted shell or filesystem access from reading the underlying files.

Separate processes alone wouldn't solve the original problem. The working agreement also says that daemon and client work are separate scopes. Permission to change a screen is not permission to rewrite the daemon.

## A Missing API Is a Conversation

The rule I most wanted written down was simple: if the visual work needs something the daemon doesn't support, stop and discuss it.

That doesn't mean the API is frozen. Sometimes the screen reveals a useful view of data we already have. Sometimes it reveals a genuinely missing capability. Those are different changes, and I want to know which one we're making.

We used this during the design work. When the comps exposed an API gap, we stepped back and did an API-readiness pass before continuing. The question was how to expose the model usefully without making the caller reconstruct the business logic or reshaping storage to fit a screen.

That pause is part of the work, not an interruption to it.

The visual design also had its own sequence. Existing mockups established layouts, not permission to invent features. After the daemon and agent foundations, we worked through screen comps with the designer before implementing the client. A control appearing in a generated mockup didn't automatically make it a requirement.

## The Agreement Doesn't Eliminate Wrong Turns

We still made one with media import.

The implementation grew machinery around making files available to the agent, when the daemon and OpenCode were intended to share filesystem access. We hadn't established that assumption clearly enough before building around the alternative.

The correction was to simplify: retain the original file outside the database and give the agent its managed path through the tools it already had. Remove the unnecessary machinery, then clean up the tests and documentation so they described the simpler design rather than preserving the detour.

I don't want to present the second attempt as proof that writing an architecture document makes agents immune to bad assumptions. It doesn't. This example is a reminder that a boundary can be explicit while an important deployment assumption is still unstated.

The useful part is having something concrete to return to when that happens. What problem are we solving? What environment are we actually running in? Is this complexity required, or are we building around a question we never asked?

## What Changed in the Second Attempt

Thoughtloom now has capture, connected and branching thoughts, search, conversational discovery, imports, and Markdown exports. There is a working web client over a daemon that can be exercised independently. The project is still in development.

![Evolve showing a starting thought, a user contribution, the full AI reply, and a separately recorded development.](/Projects/Thoughtloom/screenshots/evolve.webp)

*A conversation can produce a recorded development without replacing the starting thought or treating the entire reply as the new idea.*

The difference I care about isn't the feature count. It's that we have a clearer basis for deciding where a change belongs.

A title can be editable metadata without making the original thought editable. A new presentation can need a different read response without changing what ancestry means. A design can expose a missing capability without silently authorizing its implementation.

We recorded those expectations in the project's [architecture and working agreement](https://github.com/rjroy/thought-loom/blob/master/.lore/context/architecture.md), rather than leaving them buried in a conversation.

I'm not trying to avoid changes that cross layers. Some changes should. I'm trying to make that a deliberate decision, instead of discovering afterward that moving something on a page changed what the application thinks an idea is.
