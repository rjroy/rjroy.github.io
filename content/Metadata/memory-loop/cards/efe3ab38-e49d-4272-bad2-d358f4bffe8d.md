---
id: "efe3ab38-e49d-4272-bad2-d358f4bffe8d"
type: "qa"
created_date: "2026-04-20"
last_reviewed: null
next_review: "2026-04-20"
ease_factor: 2.5
interval: 0
repetitions: 0
source_file: "Ideas/Daemon-First-Agent-Native/daemon-first-architecture.md"
---

## Question

In the daemon-first Route/Service Split pattern, what is the signature pattern for route factory functions?

## Answer

createXRoutes(deps) → RouteModule. Each factory receives only the slice of dependencies it needs.
