---
title: Mind Reader
description: Passive feedback system for Claude Code that nudges when session patterns suggest you should take a break
tags:
  - project
  - claude-code
  - feedback
  - developer-wellness
---

# Mind Reader

Mind Reader is a Claude Code plugin that watches session patterns and provides gentle nudges when you've been working too long, at unusual hours, or when frustration patterns emerge. It doesn't interrupt your flow; it observes and suggests breaks when patterns indicate you should step back.

**Source:** [github.com/rjroy/vibe-garden](https://github.com/rjroy/vibe-garden) (mind-reader/)

## The Problem

When working with AI, it's easy to lose track of time. "Just one more prompt" turns into three hours. You're debugging at 2am on a Saturday. The session feels productive, but you're spinning your wheels.

Mind Reader recognizes these patterns and suggests breaks before burnout sets in.

## What It Does

### Temporal Detection

Tracks session duration and prompt count against your personal baselines. When a session exceeds your typical 95th percentile (or configured threshold), Mind Reader suggests a break.

**Example:**
```
You've been working for 3 hours and 15 minutes (28 prompts).
This is longer than your typical sessions (p95: 2h 30m, 22 prompts).

Consider taking a break. Long sessions often hit diminishing returns.
```

### Unusual Hours Awareness

Notices when you're working outside your normal hours. If you typically work 9am-6pm weekdays but you're prompting at 2am on a Saturday, Mind Reader gently points it out.

**Example:**
```
You're working at an unusual time (Saturday 2:47 AM).
Your typical hours: Mon-Fri, 9:00 AM - 6:30 PM.

Everything okay? Consider wrapping up for the night.
```

### Sentiment Analysis (Optional)

Uses VADER sentiment analysis to detect frustration patterns in your prompts. When recent prompts show negative sentiment below a threshold, Mind Reader suggests stepping back.

**Example:**
```
Recent prompts show frustration (average sentiment: -0.35 over 5 prompts).

Frustration often means it's time to step back and approach from a different angle.
Consider taking a break or switching tasks.
```

## How It Works

### Time-Bucketed Baselines

Mind Reader computes baselines from your Claude Code history, bucketed by day of week and time of day. This captures natural patterns: weekday mornings are different from Sunday evenings.

The baseline includes:
- Session duration percentiles (p50, p75, p90, p95)
- Prompt count percentiles
- Typical working hours by day of week

### Two-Stage Detection

Detection happens in two stages:
1. **Recent trend**: Are your last few sessions trending long?
2. **Historical norm**: Does the current session exceed your historical baseline?

Both must trigger for an alert. This prevents false positives from one unusually long session.

### Graceful Degradation

If VADER isn't installed, sentiment analysis is disabled automatically. Only temporal detection runs. The plugin works with stdlib only; sentiment analysis is optional.

## Design Decisions

### Why Time-Bucketed Baselines?

Fixed thresholds ("alert after 2 hours") don't account for individual patterns. Some people work in 4-hour blocks; others prefer 30-minute sprints. Time bucketing captures that your Tuesday morning sessions are different from your Friday evening sessions.

### Why Two-Stage Detection?

Single-stage detection is noisy. If you normally work 1-hour sessions but have one 3-hour session, your baseline shifts. Two-stage detection (recent trend + historical norm) requires sustained pattern changes before alerting.

### Why VADER for Sentiment?

VADER (Valence Aware Dictionary and sEntiment Reasoner) is lightweight (~1MB), designed for short text, and captures intensity ("very frustrated" vs "slightly annoyed"). It's not perfect, but it's good enough to catch obvious frustration patterns without requiring LLM API calls.

### Why Passive?

Mind Reader doesn't block prompts or force breaks. It suggests. The goal is awareness, not enforcement. You're an adult; you know when to stop. Sometimes you just need a nudge.

## Configuration

All settings live in `~/.claude/mind-reader/settings.json`:

```json
{
  "enabled": true,
  "temporal": {
    "enabled": true,
    "duration_threshold": "p95",
    "prompt_threshold": "p95",
    "check_hours": true
  },
  "sentiment": {
    "enabled": true,
    "window_size": 5,
    "threshold": -0.2,
    "min_prompts": 3,
    "cooldown_prompts": 10
  },
  "quiet_until": null
}
```

**Temporal settings:**
- `duration_threshold`: Percentile for session duration alerts (p95 = top 5% longest)
- `prompt_threshold`: Percentile for prompt count alerts
- `check_hours`: Whether to alert for unusual working hours

**Sentiment settings:**
- `window_size`: Number of recent prompts to analyze
- `threshold`: VADER compound score threshold (negative = frustrated)
- `min_prompts`: Minimum prompts before sentiment kicks in
- `cooldown_prompts`: Prompts to wait after an alert before alerting again

**Quiet mode:**
- `quiet_until`: ISO timestamp to suppress alerts until (useful for "I know I'm working late, stop reminding me")

## Baseline Updates

The baseline is computed from your Claude Code history. Update it periodically (daily cron job recommended) to keep detection accurate as your patterns evolve.

```bash
# Manual update
python ~/.claude/plugins/mind-reader/scripts/baseline.py

# Or add to crontab
0 3 * * * python ~/.claude/plugins/mind-reader/scripts/baseline.py
```

## Installation

```bash
/plugin install mind-reader@vibe-garden
/mind-reader:init
```

The init skill sets up directories and computes your initial baseline from existing Claude Code history.

## Why I Built This

I have a pattern: when a problem gets interesting, I lose track of time. "Just one more prompt" becomes three hours of diminishing returns. By the time I notice, I'm tired and making worse decisions.

Mind Reader is a reminder system for someone who knows better but forgets to check in. It doesn't enforce discipline; it creates awareness. The nudge is enough.
