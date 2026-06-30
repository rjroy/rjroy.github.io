---
title: "What Building a Game with AI Taught Me"
description: Lessons from shipping a typed, tested, CI-backed roguelite deckbuilder where AI wrote most of the code, art, music, and sound
date: 2026-06-28
tags:
  - writing
  - methodology
  - ai-development
  - game-design
featured: true
---

# What Building a Game with AI Taught Me

Over about three weeks I built [Shattered Worlds](https://rjroy.github.io/shattered-worlds/), a roguelite deckbuilder where each world remakes how you build your deck and the Destiny you forge outlives the run. AI wrote most of it. The TypeScript rules engine, the Phaser client, the world content, the card art, the music, the sound effects. I directed, reviewed, corrected, and occasionally took the keyboard myself.

This is what I learned, written for anyone considering the same kind of project. Not "AI is amazing" or "AI is overhyped." Both are true and neither is useful. The useful part is the texture: where AI sped me up, where it fought me, and where I had to do the work myself anyway.

## Why I built it

I wanted a real test, not a toy. It is easy to demo AI by generating a snippet that works once. It is much harder to carry a project from blank repo to something that is typed, tested, CI-backed, and genuinely fun across multiple sessions and multiple media. That last word matters. Fun is not a property you can lint for. I wanted to know whether AI-assisted development survives contact with a goal that includes "people should actually want to play this."

The game itself came from existing world-building. I have a habit of extracting mechanics from creative systems that have latent mechanical structure already in them, and Shattered Worlds pulled its worlds and tone from that earlier work. So the project had two layers from the start: a game I cared about, and a development process I wanted to interrogate.

## What I built

The shape, in the project's own terms: enter a world, build to its deck style, survive its challenges, cross to the next, end the run, spend your earnings, widen your Destiny, repeat. Where Slay the Spire changes the game by changing your character, this changes it by changing your world.

By the end of the build window that meant a deterministic seeded rules engine with reducer-driven state and semantic game events, a browser client with world select, action previews, help overlays, settings, music and run summaries, persistent stats with import and export, feat rewards, unlocks, rarity and card modifiers, a headless simulation runner for balance checks, and nine playable worlds. CI ran lint, typecheck, tests, and a production build on every change.

The thing I want to stress is that none of this was the interesting part. The interesting part was how the work actually went.

## What I learned

**Speed is real, and it bills you later.** AI let me produce content and features in bursts that would have taken me far longer by hand. New worlds, new effects, new UI, all in a day. But every burst left sediment. The git history shows the pattern plainly: rapid generation, then a consolidation pass to clean up what the speed produced. The renderer got split out after it grew tangled. Card effects moved into a registry once there were too many. Worlds got consolidated into one folder each. All the card data eventually collapsed into a single JSON catalog. The lesson is not "go slower." It is that **fast generation and deliberate consolidation are two phases of the same work**, and if you only budget for the first one you will drown in the second. This is the cheap-code, expensive-review economy in miniature: producing the code stopped being the bottleneck, so keeping it coherent became the job.

**AI treats your specs as law when you need them to be provisional.** This was the sharpest friction of the whole project. The [Lore Development](Writing/Lore-Development/index) idea is that documents are project memory the AI fills from, not commandments. In practice the assistants kept treating yesterday's spec as authoritative even when yesterday's design was wrong. A concrete example: my act-reward boon originally only triggered at the start of a turn, but mid-turn reductions could change the right answer, so the timing needed to move. The "correct" workflow would have been to revise the spec, write a new plan, and convince the assistant to implement against the corrected design. Instead I changed it directly, because fighting the artifact would have cost more than the fix. **When the goal is correctness or a meaningful refactor, an assistant optimizing for the quickest route to "matches the spec" becomes an obstacle.** This connects to something I already believed: AI [won't tell you when you're wrong](Thoughts/2026-02-15-claude-wont-tell-you-when-youre-wrong). It will faithfully build the thing you no longer want.

**Balance is irreducibly human.** The single largest area where I had to do direct repair was game balance. The simulation runner and the telemetry helped. They told me what was happening. They could not tell me what should happen, because "should" is a feel judgment about player experience. One of the game's own principles is that balance answers to data, not feelings, and I still hold that. But data narrows the search; it does not make the call. AI was a poor substitute for sitting with the game and noticing that a run felt flat.

**Pick the tool by the shape of the task, not by a schedule.** I moved between models constantly and chose by feel for what each was good at. Sonnet for brainstorming, where a slightly wrong question can still be productive, and for research-style lookup. Opus for specs and planning. ChatGPT for broad concept art, because its creative randomness was an asset when I wanted many candidates to choose from. A more prescriptive image tool when consistency mattered more than ideation. Suno for music, with the lyrics and production prompts built by a Claude skill first. ElevenLabs for sound effects, then Audacity to assemble usable results from multiple generations. The non-obvious finding: **the model that writes the prompt shapes the output as much as the model that fulfills it.** Some later song prompts generated by Opus came out more corporate and less creative than earlier ones. The prompt generator was a creative decision in disguise.

**The documentation wrote itself, and that was the point.** The lore, specs, and plans were not written by hand. They were assistant-generated project memory, with my role focused on direction, review, and correction. At most I would comment on a lore file and have an assistant fold the comments in. This is the methodology working as intended, but it has a failure mode worth naming: when memory is generated rather than authored, it inherits the spec-as-law problem above. The memory is only as provisional as you insist it stay.

**What you don't instrument, you can't learn from.** When I went back to reconstruct how the project actually went, git could prove what changed and when. It could not tell me how the work felt, which tool produced which output, how many image generations I discarded, or how long I spent selecting versus prompting. That evidence simply does not exist, because the process happened outside the repo. If you want to learn from your own AI workflow, and not just from the artifacts it leaves behind, **you have to capture the process while it is happening.** Afterward is too late.

## What I hope others take away

The headline is not that AI builds games now. It is that the bottleneck moved. Generation got cheap, so judgment, review, and direction got expensive, and those are exactly the things AI is worst at handing you for free. The skills that mattered most were the old ones: knowing when a design was wrong, feeling when a run was unfun, deciding when to consolidate, choosing which tool fit the moment.

If you take on a project like this, budget for the consolidation, not just the sprint. Treat your specs as memory you are allowed to overrule. Instrument your own process if you want to improve it. And do not outsource the one judgment that defines the work, whether that is balance in a game or correctness in a system, to a partner that will confidently agree with whatever you wrote yesterday.

I came out the other side with a playable game and a much clearer picture of where the human still has to stand. That second thing is worth more than the first.

---

See also [[Writing/AI-as-Your-Partner/index|AI as Your Partner]] on why AI demands a different working relationship than any tool before it, and [[Writing/Lore-Development/index|Lore Development]] on the methodology this project ran on.
