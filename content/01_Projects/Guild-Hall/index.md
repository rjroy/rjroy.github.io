# Guild Hall

A multi-agent orchestration system using the blackboard architecture pattern.

**Why "Guild Hall":** A place where skilled workers gather, check the board for available work, and coordinate without a central authority dictating assignments. The guild metaphor implies autonomous agents with expertise who self-select tasks rather than receiving top-down orders.

## Origin

Explored Gastown (github.com/steveyegge/gastown), a multi-agent orchestration system by Steve Yegge. The core ideas are sound (git-backed persistence, work isolation via worktrees, task bundling). The implementation is opinionated, which is fine, but these aren't opinions I want to adopt: rigid metaphors (Mayor, Polecats, Rigs, Convoys), Go CLI dependency, tmux-centric workflow, and a forced hierarchical coordination model.

Wanted to extract the useful concepts without adopting the full framework.

## Blackboard Architecture

A coordination pattern from 1970s-80s AI research (Hearsay-II speech recognition system).

**The metaphor:** Experts gathered around a physical blackboard. Each watches the board and contributes when they see something relevant. No direct agent-to-agent communication; everything flows through the shared board.

**Properties:**
- Decoupled agents (only know the blackboard format, not each other)
- Incremental refinement (partial solutions accumulate)
- Observable state (blackboard is the complete record)
- Flexible participation (add/remove agents without rewiring)

**Contrast with hierarchical (Mayor) model:**

| Hierarchical | Blackboard |
|--------------|------------|
| Coordinator assigns work | Agents self-select |
| Top-down control | Emergent coordination |
| Single orchestration point | Distributed decisions |

## Proposed Design

### Blackboard as a Service

A central service that agents communicate with. Handles:
- Project registry (what work exists)
- Worker registry (who's working on what)
- Task acquisition (pluggable per project)
- Resource management (capacity limits, cleanup)

### Core Entities

**Projects** define:
- Task source (GitHub issues, markdown file, Jira, etc.)
- How to acquire available tasks
- Worker capacity limits

**Workers** are ephemeral agents that:
- Pick up a task from their assigned project
- Record that they're working on it
- Do the work (in a git worktree for isolation)
- Report completion and exit

**Recruiter** monitors the blackboard:
- Checks each project's worker count vs capacity
- Spawns workers when capacity available and tasks exist
- Cleans up stale/dead workers

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

**Implementation stack:**
- Python or TypeScript?
- Claude Agent SDK for worker agents
- Git worktrees for isolation (one per task)

**Blackboard service design:**
- REST API? WebSocket for real-time updates?
- Persistence layer (file, SQLite, Redis?)
- How do workers authenticate/identify themselves?

**Task claiming:**
- Race conditions if multiple workers grab the same task
- Options: Recruiter pre-assigns, atomic locking, or task source tracks assignment

**Worker lifecycle:**
- How does Recruiter spawn workers? (Agent SDK, subprocess, container?)
- Heartbeat/timeout mechanism for detecting dead workers
- Graceful shutdown vs crash recovery

**Scope boundaries:**
- What's a "project"? A repo? A category of work?
- Can one worker handle multiple tasks sequentially?
- How do we handle task dependencies?

## Next Steps

This needs to be broken into features and each feature spec'd out:

1. **Blackboard service** - API design, persistence, resource management
2. **Task sources** - Pluggable adapters for GitHub, markdown, etc.
3. **Recruiter agent** - Monitoring loop, spawn logic, cleanup
4. **Worker agent** - Task execution, worktree management, completion reporting
5. **Observability** - Dashboard or CLI to inspect blackboard state

## References

- Gastown: https://github.com/steveyegge/gastown
- Hearsay-II (original blackboard system): Erman et al., 1980
- Claude Agent SDK documentation
