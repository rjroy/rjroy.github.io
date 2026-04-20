---
title: Shelf Judge
description: A board game collection tool for owners who want their shelf to be intentional, not accumulated
tags:
  - area
  - boardgames
  - curation
  - tool
---

# Shelf Judge

A board game collection tool that helps owners understand what their shelf actually says about them, and make informed decisions about what stays, what goes, and what comes next.

It combines personal, multi-axis ratings with data from BoardGameGeek to produce a single fitness score for any game, owned or not. Every score is decomposable: tap it and you see exactly which axes drove it, how each was weighted, and which numbers came from BGG versus your own ratings.

![Collection view ranked by fitness score](/Projects/Shelf-Judge/screenshots/collection.png)

## The Problem

Board game shelves accumulate. A heavy worker placement game from a Kickstarter four years ago. A party game someone gave you. The fifth area-control game that scratches the same itch as the first four. Most collection tools track what you own. They don't help you ask whether you should still own it.

"Good" is also never one thing. A game can be good for date night and bad for a six-player evening, good for a rainy afternoon and bad for the shelf when you're already buried in similar mechanics. A fixed set of rating categories misses the criteria that actually matter to the owner.

Shelf Judge is built for the collector who wants their shelf to be intentional. The fitness score is the answer to "how well does this game earn its space, on the terms I actually care about?"

## How It Works

### Personal Axes

You define the criteria that matter to you. Replayability. Visual design. Wife will play it. Box-to-table ratio. Each axis has a weight and a preference curve (higher is better, lower is better, or sweet-spot with a tolerance).

![Axes settings with personal and BGG-derived axes](/Projects/Shelf-Judge/screenshots/axes.png)

Two BGG-derived axes ship by default: Community Rating and Complexity. Both are overrideable per game.

### Fitness Score, Decomposed

Every fitness score opens to a transparent breakdown: raw rating, effective value after the curve, weight, contribution, and source. The score is `sum(contributions) / sum(weights)` over rated axes. There are no hidden terms.

![Game detail page with score breakdown table](/Projects/Shelf-Judge/screenshots/game-detail.png)

If you flip on redundancy scoring, the panel shows how similar this game is to others in your collection and how much (if any) penalty applied. The penalty is part of the score, not a footnote.

### Wishlist with Predictions

Games on the wishlist get a predicted score with a confidence tier so you can evaluate them before buying. Predictions improve as you rate more games. When the system can't predict a game well, it says so. "Insufficient data" is better than a confident wrong number.

### Tournament Mode

When axis-based ratings disagree with your gut, head-to-head comparisons cut through. Pick which game you'd rather play. ELO updates. Over time, tournament rank surfaces alongside the fitness score on every game's detail page, and divergence between the two is something the profile flags.

![Tournament setup with quick presets](/Projects/Shelf-Judge/screenshots/tournament.png)

### Collection Profile

After enough games are rated, the profile page surfaces what your collection actually says about you: rating distributions per axis, divergence between axis-based and tournament-based scores, and an AI-generated narrative of patterns you may never have articulated.

![Profile page with axis distributions and narrative](/Projects/Shelf-Judge/screenshots/profile.png)

### Redundancy and Capacity

Fitness is relative. A fifth worker placement game isn't as fit as the first, even if it's individually excellent. Redundancy detection finds mechanical overlap and (optionally) penalizes the score directly so the shelf's carrying capacity stays honest.

Capacity tracking takes this physical: define your shelf units, record box dimensions, and the system can flag candidates for removal when the shelf gets full (high redundancy plus low fitness goes first).

## Design Principles

**Ownership is personal and specific.** A game earns its place for reasons unique to the owner. Multi-axis ratings exist because "good" is never one thing.

**One number, honestly derived.** The fitness score is powerful because it's singular, but it's only trustworthy because it's transparent. A score the user can't interrogate is worthless.

**Your collection has an identity.** The pattern of what you own and why encodes preferences you may never have articulated. Shelf Judge makes that identity legible.

**Data serves judgment, not replaces it.** BGG provides context. The fitness score synthesizes that context with personal ratings. The owner decides. The score is a mirror, not an oracle.

**The shelf has carrying capacity.** Adding a game changes the fitness of every other game competing for that space. Fitness is calculated against the rest of the shelf, not in isolation.

## What It Isn't

- **Not a purchase recommender.** High predicted fitness is information, not a recommendation.
- **Not a social platform.** No leaderboards, no public profiles, no "top collectors." Personal curation only.
- **Not a BGG replacement.** Game discovery, reviews, forums, and marketplace belong to BGG. Shelf Judge pulls metadata from BGG and stays in its lane.

## Architecture

All data is stored locally in `~/.shelf-judge/data/`. No cloud sync, no account, no external service required beyond BGG for metadata. BGG data is cached and refreshed on demand, with a 7-day cache window.

Existing BGG collections can be imported in bulk by username. The importer skips games already tracked, pulls metadata for the rest, and respects BGG's rate limits.

---

*Active development. The vision is settled; the shelf is still being judged.*
