---
title: "What Building a Game with AI Taught Me"
description: Lessons from shipping a typed, tested, CI-backed roguelite deckbuilder where AI wrote most of the code, art, music, and sound
date: 2026-07-09
tags:
  - writing
  - methodology
  - ai-development
  - game-design
---
# What Building a Game with AI Taught Me

Over about a month I built [Shattered Worlds](https://rjroy.github.io/shattered-worlds/), a roguelite deckbuilder that I wanted to play. There are multiple worlds, each using the game's mechanics slightly differently. One of the core concepts is that it's a game designed around trying not to lose instead of trying to win. And AI wrote most of it. Multiple agents wrote the TypeScript-based Phaser code, generated all the art content, and even music and FX. I provided goals and directions. I rarely reviewed the code, but did extensive playtesting. When the AI just couldn't fix it, I'd step in and do the final tweaks.

I want to share what I learned. Not because I have some keen insight, but because multiple perspectives are important. AI is amazing and it is overhyped. Don't use it blindly, but don't be afraid to let it run. The number one lesson to learn, to use AI well you have to understand the domain to know how much pressure to apply and where.

## Why I built this specific game

I wanted a game to play. I wanted this game to play. The game started as an experiment in deckbuilding, and what I could get the AI to do. It ended with some personal exploration, but that's not what you're here for.

I also wanted to see what I could make AI do for real. Not just some toy, or some AI harness, but a game that I could play and share because it's fun. Something that in isolation could be considered complete. This wasn't just the code either. It needed to also look like a game, not just a wireframe.

I had previously worked on some ideas for some songs. The theme is called Shattered Worlds. It revolves around the Walker fleeing the Destiny. Each of the songs starts in a mundane and boring world, gets a cataclysm brought by the Walker, a small survival-horror section, and ends with a choice that isn't a choice. Each song was a different cataclysm, which allowed for each worldbuilding.

## What I built

The shape, in the project's own terms: enter a world, build to its deck style, survive its challenges, cross to the next, end the run, spend your earnings, widen your Destiny, repeat. Where Slay the Spire changes the game by changing your character, this changes it by changing your world.

By the end of the build window that meant a deterministic seeded rules engine with reducer-driven state and semantic game events, a browser client with world select, action previews, help overlays, settings, music and run summaries, persistent stats with import and export, feat rewards, unlocks, rarity and card modifiers, a headless simulation runner for balance checks, and nine playable worlds. CI ran lint, typecheck, tests, and a production build on every change.

From this core concept I worked with my [Lore Development](Writing/Lore-Development/index) system. I provided the direction to build the vision. The AI decided the architectural layers that were needed based on my guidance to separate the visual and rules engine. The system has RNG, but is seeded. Because the rules engine is not baked into the visuals, a sim was developed. The complexity expanded from there.

## What I learned

**AI context fidelity isn't perfect.** When it looks at code or images, it doesn't see them perfectly. It misses things. To abuse a phrase, it doesn't always see the trees from the forest. It can see everything, but details can get lost. It can get you up and running rapidly, but it'll miss that one edge case. Sure, you can get it to fix it, but now it breaks something else. It's not always this way, but it can happen. It becomes even more pronounced when you want it to control the graphics of something based on pixel values. Then it literally cannot see what you are talking about. I could've written a skill/agent to sort it out, but the amount of token waste from it moving something pixel by pixel, looking at new screen grabs, would've been immense. This resulted in two actions: noticing when I needed to step in to literally move the pixels, and also noticing when it had shifted the code enough that a refactor was necessary.

**AI treats your specs as law when you need them to be provisional.** All software is provisional today. Bugs are fixed, systems are refactored, and new patches ship. The specs you wrote at the start of the project aren't necessarily valid. If you have a spec in your system, it is truth. Using an AI is all about feeding it the correct context. The [Lore Development](Writing/Lore-Development/index) tool set provides a mechanism to write specs and acknowledge that future specs are built on previous specs. Where the need to feed context and to have the correct context collide is when the source of truth is somewhere between the specs and the code. The specs have the original why; the code has the what actually is. But asking the AI to always read all the code to understand context is too expensive, as well as impossible. My solution was to build [Field Guide](https://github.com/rjroy/vibe-garden/tree/main/field-guide). The system allows me to build a wiki based on the specs, plans, and source code, providing a new, reduced source of truth with the whys of the code.

**Balance is irreducibly human.** The problems weren't just in the code. The data was also not perfect. The AI doesn't know what fun is. It kept trying to make the game winnable. I kept having to explain it's about not losing long enough to survive the level. There is no winning, just not losing. It could see the math on the cards, write scripts to determine balance. But it didn't know what fun was, especially when there are over 200 cards in the game. In the end the data numbers needed to be tweaked by me after playtesting over and over. However, that's not the whole story. The AI did build a card-counting sim which made guesses about the next action. This helped me to see the raw odds of success for any specific world. I could usually win if I was paying attention. So seeing certain worlds that you simply cannot beat allowed me to understand the difficulty of the puzzle.

**Pick the tool by the shape of the task. Bigger doesn't mean better.** This was one of the first times I went outside of Claude Code. If I had well-funded use of all models, here's what I would do. I'd use Sonnet for brainstorming. Sonnet leaves gaps and can go off-center, which is exactly what I want when brainstorming. I want questions and answers that aren't perfect. Perfect comes later. Opus or Fable for specs and planning. This is a size and complexity question. For the core architecture of a system, I'd use Fable when a small mistake can be amplified over time. But always opting for Fable means the AI can overthink the problem. You don't want to do that; don't let the AI. Then for implementation I'd go with OpenAI Codex. Where Claude just thinks closer to how I think, Codex is the senior engineer you want to get the job done. For image generation you can use Codex with its `imagegen` skill, or I have a skill which uses Flux. Each has a different feel. I use Flux when I want it to have a cartoon or anime quality to it. No matter how hard it tried, it was always a cartoon. For something that looked more real, I used GPT Images. For music, I have a process I've been using for a while. I use Claude Code to write the lyrics and arrange the piece, then Suno to generate the audio file from those prompts. It should be noted that if I have Opus write the lyrics, then it sounds almost like market speak. Sonnet is the way to go here to get that little randomness in it that is creativity. I also experimented with the free FX from ElevenLabs (meh at best).

**AIs are lazy.** Not really, but they want to give you the answer as soon as possible. They want to give you the result that will get you satisfied. Even if that means hiding the mistakes they made. The number one way to fix this is validation. You don't want the spec; you want the successful review of the spec. You don't want the source code; you want 20 new unit tests that run successfully with the existing 1,000. Without validation, the AI output will degenerate rapidly.

## What I hope others take away

You cannot open AI and say "make me a game." It doesn't work that way. Every choice you make the AI will amplify. It doesn't simply fill in all the gaps. And when you give the choice over to the AI the results are unpredictable and rarely what you are looking for.

- **Pick the right tool for the job.** I cannot emphasize this enough. Know why you are using the model you are using.
- **Keep the judgment to yourself.** Your job is to think. Don't let the AI think for you. If what you are doing is writing an analysis, then the AI output isn't the end of your job. Read it.
- **Always ask, what do you mean you're done already?** The AI wants to complete its task by any means necessary. I've had it delete my local git repo and tell me the bug was gone. That's an extreme case, but it emphasizes the point (side lesson: be careful of `yolo`).
- **Don't forget refactoring is a thing.** If you have been developing software for any amount of time, then you know that the code you wrote last year is bad and needs to be refactored to handle all the changes since then. This timeline is accelerated. Don't forget to refactor more often.

## Epilogue

I decided the game needed an ending that answered, *Why is the Walker fleeing the Destiny?* This exploration ended with me setting up the last three worlds. ***Questions*** you ask when facing grief. ***Answers*** you want to hear but are wrong. ***The Beginning*** of healing when you finally acknowledge what has happened. Writing the copy for the AI to build the world, to build the music, and playtesting it brought up some feelings. Who knew an exploration of AI would lead here? I added a short message to the game for anyone who needs support for similar feelings.

---

See also [[Writing/AI-as-Your-Partner/index|AI as Your Partner]] on why AI demands a different working relationship than any tool before it, and [[Writing/Lore-Development/index|Lore Development]] on the methodology this project ran on.
