---
title: Adventure Engine of Corvran
description: An AI-powered solo tabletop RPG experience bringing pen-and-paper adventures to life through conversational gameplay
---

# Adventure Engine of Corvran

A solo tabletop RPG experience powered by AI, bringing the magic of pen-and-paper adventures to life through conversational gameplay.

![Entry Screen](/02_Areas/Adventure-Engine-of-Corvran/screenshots/entry.webp)

## What Is This?

Adventure Engine of Corvran is an AI-driven game master that runs tabletop RPG adventures. Think of it as having a dedicated dungeon master available whenever you want to play—one that remembers your characters, tracks your progress, and weaves narrative around your choices.

The project grew out of a desire to capture the feel of classic tabletop gaming without needing to coordinate schedules with a full group. It's not trying to replace the social experience of gaming with friends, but rather to scratch that itch when solo play is the only option.

## How It Works

The engine acts as both narrator and referee. You describe what your character does in natural language, and it responds with story progression, NPC dialogue, and mechanical outcomes. The world of Corvran provides a consistent fantasy setting—ancient forests, competing factions, magical artifacts—while the AI handles the moment-to-moment storytelling.

![Adventure Gameplay](/02_Areas/Adventure-Engine-of-Corvran/screenshots/adventure.webp)

Characters persist across sessions. The sidebar shows your character sheet at a glance—class, ancestry, level, abilities. The system tracks domain cards (special abilities), equipment, and story progress so you can pick up where you left off.

## Features

**Persistent Adventures** — Save and resume adventures at any point. Each save captures not just your character state but the narrative context, letting you maintain multiple ongoing stories.

![Load Adventure](/02_Areas/Adventure-Engine-of-Corvran/screenshots/adventure-select.webp)

**Character Management** — Create new characters or continue with existing ones. The engine remembers characters across different adventures, so your seasoned delver can tackle new challenges while you experiment with a fresh build elsewhere.

![Character Selection](/02_Areas/Adventure-Engine-of-Corvran/screenshots/new-character.webp)

**Conversational Interface** — No menu-diving or complex commands. Just describe what you want to do. The AI interprets intent and handles the mechanical translations behind the scenes.

**Visual Atmosphere** — AI-generated scene imagery and character portraits add visual context without breaking the text-adventure flow.

## Architecture

The system is built as a client-server application:

- **Frontend**: A GUI application providing the game interface—text display, input handling, character panels, and save management
- **Backend**: An AI service that maintains game state, processes player actions, and generates narrative responses
- **Persistence**: Adventure state stored as structured data, enabling save/load functionality and character continuity

The separation allows the AI processing to happen server-side while keeping the client responsive. Connection status is visible in the interface (that green "Connected" indicator), and the system handles reconnection gracefully.

## Why Build This?

Tabletop RPGs are fundamentally about collaborative storytelling, but the logistics of getting a group together regularly can be challenging. AI has reached a point where it can serve as a passable game master for solo play—not replacing human creativity, but filling a gap.

This project is an exploration of that space: how good can AI-driven tabletop gaming get? What's lost without human players, and what unexpected benefits emerge? The answer so far: it's genuinely fun, surprisingly immersive, and scratches an itch that other solo RPG approaches (gamebooks, journaling games) don't quite reach.

The world of Corvran itself—with its ancient Thornwood, competing delver guilds, and mysterious relics—emerged through play. The setting has accumulated history and consistency as adventures have unfolded, creating something that feels like a living world rather than a procedurally generated backdrop.

---

*This is an ongoing personal project. The engine continues to evolve as I play and discover what works.*
