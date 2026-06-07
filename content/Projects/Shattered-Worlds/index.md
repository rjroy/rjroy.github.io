---
title: Shattered Worlds
description: A roguelite deckbuilder where each world remakes how you build, and a Destiny thread carries across the shattering
date: 2026-06-02
status: active
tags:
  - game
  - roguelite
  - deckbuilder
  - typescript
  - phaser
---

# Shattered Worlds

Shattered Worlds is a roguelite deckbuilder I've been building as both a design exercise and a portfolio game. The central idea: where Slay the Spire changes the game by changing your character, Shattered Worlds changes it by changing your world.

**Play:** [rjroy.github.io/shattered-worlds](http://rjroy.github.io/shattered-worlds/) | **Design docs:** [lore](http://rjroy.github.io/shattered-worlds/lore/) | **Source:** [github.com/rjroy/shattered-worlds](https://github.com/rjroy/shattered-worlds)

## The Premise

A run takes you through a gauntlet of broken worlds in sequence. Each world has its own deck style and its own challenges. You don't carry a fixed identity into each world; you build to what the world demands. What does carry is your Destiny, a thread of meta-progression that outlives the run and grows with each crossing.

The core loop:

> Enter a world → Build to its deck style → Survive its challenges → Cross to the next world → Run ends → Spend earnings → wider Destiny ↺

Runs are disposable. What you earn is not. Between runs you unlock new options and deepen synergies, so the possibility space grows even though every run starts you at the bottom of the climb.

## Design Principles

Seven principles govern every decision in the project. The constraint that shapes everything else: the deck-building is the game. Every card offered must change a decision, not merely add power. A world doesn't ship until it forces a different way to build.

The other principles follow from that one: destiny grows you but skill earns the summit; bad draws trace back to player choices; every archetype is nameable; balance is tuned by data not feeling. The last one keeps the whole thing honest: craft and fun are one gate, not two. Fun gets validated before engineering investment goes in; engineering is non-negotiable before anything is called done.

## Architecture

The codebase is split into three packages with a lint-enforced boundary between them.

```
src/
  core/    — pure TypeScript, zero Phaser imports
  game/    — Phaser renderer, imports core
  sim/     — headless runner, imports core
```

**Core** is a synchronous, deterministic, seedable state machine with no side effects. `dispatch` returns both the authoritative final state and an ordered list of semantic events. The renderer reads the event list as an animation script. The rule for what belongs in core: if it decides what is true in the game, it belongs here.

**Game** owns the clock. It translates player input into core actions and translates the returned events into animation timelines (tweens, particles, audio). Cosmetic randomness lives here and never feeds back into state. The rule: if it decides how truth looks or feels, it belongs here.

**Sim** runs full games at full speed with no renderer. Feed a policy function, get metrics back. This is the instrument for the data-driven balance principle.

The core is exhaustively unit-tested. New core logic requires tests. The sim provides integration-level validation across the full game loop.

## Why Seeded RNG?

Same seed plus same actions yields the same run, byte for byte. This is what makes "randomness is owned, never imposed" enforceable. Every outcome is reproducible and traceable. When a player complains about a bad draw, the answer is always a choice they made earlier.

## Why Phaser?

The game is designed for maximalist juice: Balatro-style card effects, screen shake, escalating particle work. DOM-based approaches make that painful. Phaser gives full control over the render loop. The architecture also decouples simulation speed from animation speed, which matters for the balance sim and for players who want to skip animations.

## How It Was Built

This project is an honest experiment in AI-assisted development. The AI did the bulk of the work, including the core architectural decisions. The source hierarchy, the core/game/sim split, the seeded RNG approach -- I guided it with questions ("shouldn't we break this up?") and it did the rest. The working prototype came together over three nights, a couple of hours each.

The next stretch was polish: three more nights and most of a Saturday. That's where I got more hands-on. Some card display wasn't quite right. Text copy was off. The remaining passes were the standard playability questions: if I didn't know what this game was, could I figure it out? Can you lose? Can you win? Those are the parts I hand-edited.

All the image assets are AI-generated too. I made minor post-processing edits (file size, format, transparency), but the art itself is not mine.

The point of this project isn't to sell a game. It's to find out what's possible when you use AI as the primary builder and yourself as the director -- and, if things go well, to end up with something worth playing.

## Status

Early development. The POC core loop is implemented: seeded RNG, reducer-based state machine, headless sim runner, Phaser renderer. CI runs lint, typecheck, tests, and build on every PR. The first world is playable.
