---
title: Adventure Engine of Corvran
description: A space for collaborative storytelling between you and an AI game master
tags:
  - area
  - ai
  - rpg
  - gaming
  - solo-ttrpg
---

# Adventure Engine of Corvran

A space for collaborative storytelling. You and an AI sit down together and make up a story, the way kids do. One of you also keeps track of the rules, the continuity, and the world's state. Not because it's in charge, but because someone has to remember that the bridge collapsed in scene three.

![Adventure list showing several ongoing adventures with system tags, character names, and last-played timestamps](/Projects/Adventure-Engine-of-Corvran/screenshots/adventure-list.gif)

## What It Is

TTRPGs are shared narrative. At their core, it's kids playing make-believe but with rules. The AI here is one of the kids who also happens to maintain the rules. The rules create stakes, not authority. The story belongs to everyone at the table.

The ambition is not an AI that runs a simulation. It's an AI that plays with you.

This is a greenfield reboot. An earlier version proved the core beliefs hold up under play. The current build rebuilds with those beliefs as the foundation rather than something discovered along the way.

## Starting an Adventure

Pick a system, write a sentence or two about your character or the world (or leave it blank and discover everything through play), name it, and go. The GM sets the scene from there.

![New adventure wizard: choosing daggerheart, entering a concept, naming the adventure](/Projects/Adventure-Engine-of-Corvran/screenshots/new-adventure.gif)

Four systems ship with the engine:

| System | What it is |
|--------|-----------|
| Freeform | No system. Pure collaborative fiction. |
| d20 | Classic fantasy with classes, levels, and ability checks. |
| Daggerheart | Hope and Fear dice. Narrative-first with mechanical stakes. |
| Apocrypha | Characters defined by keyword phrases instead of stat blocks. |

Systems are plugins, not code. They're reference documents the AI reads before each session. Adding a new system means writing reference material, not shipping a release.

## Playing

The play interface is a two-panel conversation labeled YOU and GAME MASTER. The GM's responses stream in word by word. Dice rolls and other tool events appear inline as part of the narrative. The background image shifts with the mood of the scene.

![Play interface showing a GM narrative, player input, and the Files tab](/Projects/Adventure-Engine-of-Corvran/screenshots/play-interface.gif)

When a campaign runs long, a Compact step archives older exchanges and replaces them with an AI-generated recap. The story is preserved; the context just gets summarized so the GM can keep what matters now in view.

A Files tab gives a read-only view of every markdown file the AI knows about: the adventure concept, the character, the world, the conversation history, the art direction. All of it is plain Markdown on disk under `~/.corvran/adventures/`. You can read it, edit it in your own editor, or back it all up with `cp -r`.

## Design Principles

A few decisions anchor the rebuild:

**The story is the product.** Background images, info panels, rule systems, atmospheric music: these serve the story. They are tools on the table, not the table itself. If a feature starts accumulating its own reasons for existing, it gets checked against this principle.

**Markdown is memory.** All game-meaningful state lives in markdown files. Not because markdown is a good database, but because it's the shared medium between the AI, the developer, and the player. All three can read it, understand it, and change it.

**Teach, don't code.** RPG mechanics are delivered as documents the AI reads, not logic the application executes. The bet is that an AI with good reference material makes better game-mastering decisions than hard-coded rules, because game mastering is judgment, not computation.

**Player agency is sacred.** The AI never decides what the player does. Never narrates their actions. Never resolves their choices for them. This is a boundary with the same gravity as security, not a style choice. The world pushes back so victories mean something. Agency means your decisions matter, not that you always win.

**Progressive simplification.** If the AI can do it with standard tools, the custom tool comes out. Every layer of custom machinery is a layer where the system's opinions can override the storytelling.

**System-agnostic core.** The engine knows about stories, players, and a game master. It doesn't know about hit points or spell slots. The same engine could run high fantasy, sci-fi investigation, horror survival, or pure freeform with no rules at all.

---

*Greenfield reboot in progress. The vision is settled; the specs are catching up.*
