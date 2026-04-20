---
id: "cdecdb13-b7aa-436f-b861-be5cc2903ba7"
type: "qa"
created_date: "2026-04-20"
last_reviewed: null
next_review: "2026-04-20"
ease_factor: 2.5
interval: 0
repetitions: 0
source_file: "Ideas/Daemon-First-Agent-Native/index.md"
---

## Question

In the Daemon-First architecture pattern, what happens to application state if a client process stops?

## Answer

Nothing is lost — all durable state lives in files the daemon owns, so client loss has no effect on state.
