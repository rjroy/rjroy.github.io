---
title: "Commission: The next project"
date: 2026-03-25
status: completed
type: one-shot
tags: [commission]
worker: Celeste
workerDisplayTitle: "Guild Visionary"
prompt: "What should I build next?\nI've been building tools to build tools. Or tools to take notes. But I want to build something real. What?"
dependencies: []
linked_artifacts:
  - .lore/brainstorm/what-to-build-next.md

resource_overrides:
  model: sonnet

activity_timeline:
  - timestamp: 2026-03-25T20:14:13.208Z
    event: created
    reason: "Commission created"
  - timestamp: 2026-03-25T20:15:20.291Z
    event: status_dispatched
    reason: "Dispatched to worker"
    from: "pending"
    to: "dispatched"
  - timestamp: 2026-03-25T20:15:20.389Z
    event: status_in_progress
    reason: "Execution started"
    from: "dispatched"
    to: "in_progress"
  - timestamp: 2026-03-25T20:15:34.116Z
    event: progress_report
    reason: "Starting context scan: reading vision, issues, retros, brainstorms, and git history before proposing anything."
  - timestamp: 2026-03-25T20:17:55.153Z
    event: progress_report
    reason: "Context scan complete. Reading memory loop cards, adventure engine screenshots, and LLM research to understand gaps. Drafting brainstorm proposals."
  - timestamp: 2026-03-25T20:19:20.654Z
    event: progress_report
    reason: "Drafting brainstorm artifact. Five proposals grounded in the project inventory, research gaps, and inbox notes."
  - timestamp: 2026-03-25T20:21:03.669Z
    event: result_submitted
    reason: "Brainstorm complete: five proposals grounded in the full project inventory, research documents, goals file, and inbox notes. Artifact written to `.lore/brainstorm/what-to-build-next.md`.\n\nThe five proposals:\n\n1. **Spaced Repetition for Memory Loop** (Small) — The SM-2 infrastructure is already in the card frontmatter. The design is done in From-Research-to-Practice.md. This is wiring and UI, not architecture. It changes Memory Loop from a capture system to a learning system.\n\n2. **The Quality Ratchet** (Medium) — Continuous re-evaluation of code against evolving standards, running asynchronously via a scheduled Guild Hall commission dispatched to Thorne. Team-facing. Addresses the goals file's stated question about AI and evolving standards. The first proposal that has users other than Ron.\n\n3. **Pair Writing Mode** (Medium) — Authorship preservation at the seam between human and AI. Split-screen editor with \"What Changed?\" diffing. Design is complete in From-Research-to-Practice.md. Demonstrates the homepage claim (\"I work with Claude Code as my ghost writer\") in a concrete mode.\n\n4. **Corvran for Others** (Medium) — Open the adventure engine's accumulated world to other players. AI as keeper of shared lore consistency. Multiple humans authoring adventures into the same world. The only proposal that produces something people experience rather than something they use to build.\n\n5. **The Non-File IDE Question** (design phase first, then Large) — The March 8 inbox note about file-centric development environments. Guild Hall is a working prototype of one answer. The right move: research artifact and design brainstorm before coding.\n\nThe key observation at the end: if \"real\" means users other than yourself, the Quality Ratchet and Corvran for Others. If it means changing the nature of what you've already built, spaced repetition. The Adventure Engine is the only thing built without a productivity rationale — that's probably not a coincidence."
  - timestamp: 2026-03-25T20:21:20.029Z
    event: status_completed
    reason: "Execution completed"
    from: "in_progress"
    to: "completed"
current_progress: "Drafting brainstorm artifact. Five proposals grounded in the project inventory, research gaps, and inbox notes."
projectName: rjroy-github-io
---
Brainstorm complete: five proposals grounded in the full project inventory, research documents, goals file, and inbox notes. Artifact written to `.lore/brainstorm/what-to-build-next.md`.

The five proposals:

1. **Spaced Repetition for Memory Loop** (Small) — The SM-2 infrastructure is already in the card frontmatter. The design is done in From-Research-to-Practice.md. This is wiring and UI, not architecture. It changes Memory Loop from a capture system to a learning system.

2. **The Quality Ratchet** (Medium) — Continuous re-evaluation of code against evolving standards, running asynchronously via a scheduled Guild Hall commission dispatched to Thorne. Team-facing. Addresses the goals file's stated question about AI and evolving standards. The first proposal that has users other than Ron.

3. **Pair Writing Mode** (Medium) — Authorship preservation at the seam between human and AI. Split-screen editor with "What Changed?" diffing. Design is complete in From-Research-to-Practice.md. Demonstrates the homepage claim ("I work with Claude Code as my ghost writer") in a concrete mode.

4. **Corvran for Others** (Medium) — Open the adventure engine's accumulated world to other players. AI as keeper of shared lore consistency. Multiple humans authoring adventures into the same world. The only proposal that produces something people experience rather than something they use to build.

5. **The Non-File IDE Question** (design phase first, then Large) — The March 8 inbox note about file-centric development environments. Guild Hall is a working prototype of one answer. The right move: research artifact and design brainstorm before coding.

The key observation at the end: if "real" means users other than yourself, the Quality Ratchet and Corvran for Others. If it means changing the nature of what you've already built, spaced repetition. The Adventure Engine is the only thing built without a productivity rationale — that's probably not a coincidence.
