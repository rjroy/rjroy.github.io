---
title: "Guild Hall"
date: 2026-01-06
status: graduated
tags:
  - multi-agent
  - architecture
  - orchestration
  - claude
  - distributed-systems
---

# Guild Hall

A multi-agent orchestration system using the blackboard architecture pattern. The name comes from the medieval guild model: skilled workers check a shared board for available work and coordinate without a central authority assigning tasks. Agents have expertise, self-select what to pick up, and the board is the whole picture.

## Origin

Started from Gastown (github.com/steveyegge/gastown), Steve Yegge's multi-agent orchestration system. The core ideas are sound: git-backed persistence, work isolation via worktrees, task bundling. But the implementation is opinionated in ways I don't want to inherit. Rigid metaphors (Mayor, Polecats, Rigs, Convoys), a Go CLI dependency, tmux as the assumed interface, and a forced hierarchical coordination model.

The goal here is to extract what's useful without pulling in the full framework.

## Blackboard Architecture

A coordination pattern from 1970s-80s AI research, originally from the Hearsay-II speech recognition system.

The model: experts gathered around a physical blackboard, each watching and contributing when they see something relevant. No direct agent-to-agent communication. Everything flows through the shared board.

This gives you:
- Decoupled agents (they only know the blackboard format, not each other)
- Incremental refinement (partial solutions accumulate over time)
- Observable state (the blackboard is the complete record)
- Flexible participation (add or remove agents without rewiring)

Contrast with the hierarchical model Gastown uses:

| Hierarchical | Blackboard |
|--------------|------------|
| Coordinator assigns work | Agents self-select |
| Top-down control | Emergent coordination |
| Single orchestration point | Distributed decisions |

## Proposed Design

### Blackboard as a Service

A central service that agents communicate with. It handles the project registry (what work exists), the worker registry (who's working on what), task acquisition (pluggable per project), and resource management (capacity limits, cleanup).

### Core Entities

**Projects** define the task source (GitHub issues, markdown files, Jira, etc.), how to acquire available tasks, and worker capacity limits.

**Workers** are ephemeral agents. Each one picks up a task from its assigned project, records that it's working on it, does the work in a git worktree for isolation, then reports completion and exits.

**Recruiter** monitors the blackboard. It checks each project's worker count against capacity, spawns workers when capacity is available and tasks exist, and cleans up stale or dead workers.

### Example Blackboard State

```yaml
projects:
  - id: rjroy.github.io
    task_source:
      type: github_issues
      repo: rjroy/rjroy.github.io
      filter: "is:open label:ready"
    max_workers: 2

workers:
  - id: worker-a1b2c3
    project: rjroy.github.io
    task: "Issue #42: Add dark mode toggle"
    status: active
    started: 2025-01-06T10:30:00Z

completed:
  - worker: worker-x7y8z9
    task: "Issue #38: Fix broken links"
    finished: 2025-01-06T08:00:00Z
    result: success
```

## Open Questions

**Stack:** Python or TypeScript? The Claude Agent SDK handles worker agents. Git worktrees handle isolation.

**Blackboard service:** REST or WebSocket? File, SQLite, or Redis for persistence? How do workers authenticate and identify themselves?

**Task claiming:** Multiple workers can grab the same task concurrently. Options are Recruiter pre-assigns, atomic locking, or the task source tracks assignment.

**Worker lifecycle:** How does Recruiter spawn workers (Agent SDK, subprocess, container)? What's the heartbeat/timeout mechanism for detecting dead workers? How do we handle graceful shutdown vs crash recovery?

**Scope:** What counts as a "project" -- a repo, a category of work? Can one worker take multiple tasks sequentially? How do task dependencies get handled?

## Next Steps

This needs to be broken into features, each specced out:

1. **Blackboard service** - API design, persistence, resource management
2. **Task sources** - Pluggable adapters for GitHub, markdown, etc.
3. **Recruiter agent** - Monitoring loop, spawn logic, cleanup
4. **Worker agent** - Task execution, worktree management, completion reporting
5. **Observability** - Dashboard or CLI to inspect blackboard state

## References

- Gastown: https://github.com/steveyegge/gastown
- Hearsay-II (original blackboard system): Erman et al., 1980
- Claude Agent SDK documentation
