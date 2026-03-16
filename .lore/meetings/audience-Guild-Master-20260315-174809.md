---
title: "AI-Integrated Engineering: Is There a Model?"
date: 2026-03-16
status: closed
tags: [meeting]
worker: Guild Master
workerDisplayTitle: "Guild Master"
agenda: "How does a worldwide software company integrate AI to take full advantage of it when they have 100's of different projects some of which are decades old million line code bases with 1000's of files?"
deferred_until: ""
linked_artifacts: []
meeting_log:
  - timestamp: 2026-03-16T00:48:09.758Z
    event: opened
    reason: "User started audience"
  - timestamp: 2026-03-16T01:41:05.611Z
    event: renamed
    reason: "Renamed to: AI-Integrated Engineering: Is There a Model?"
  - timestamp: 2026-03-16T02:23:56.165Z
    event: progress_summary
    reason: "Exploratory conversation produced a developing thesis: \"Intent-Driven Development\" as the unnamed process model for AI-integrated software engineering. Key insight: the spec is an artifact of intent, not the intent itself. The engineer's evolving role is intent definition, refinement, and verification. Verity's research confirmed the formal model space is nearly empty (SASE is the closest attempt). Octavia commissioned to write the essay for the broadcast cache as a draft."
  - timestamp: 2026-03-16T02:32:42.006Z
    event: closed
    reason: "User closed audience"
---
MEETING NOTES: Intent-Driven Development Model Discovery
Guild Master audience with facilitator
2026-03-16

SUMMARY

The Guild Master sought to understand whether a formal process model exists for how AI fundamentally changes software engineering workflows, analogous to how UML formalized object-oriented design or how Agile formalized iterative values. The conversation evolved from initial questions about AI adoption at scale into a team-specific exploration of workflow optimization and role redefinition. Through examining existing literature (SASE framework from Hassan et al., Spec-Driven Development, DORA 2025 data) and the Guild Master's own team practices, the group identified a gap: academic and industry work address either the research agenda (SASE) or isolated practices (SDD), but no one has articulated a practitioner-centered process model that connects intent definition, knowledge accumulation, and work verification into a coherent system.

The Guild Master revealed their team has been operating an intent-driven workflow without naming it. The "ralph loop" approach (repeated token-intensive iteration toward convergence) works but wastes resources because it substitutes compute for clarity. The more efficient model requires upfront intent precision, saved collaboration artifacts that serve as refined intent history, and review focused on intent verification rather than code inspection. This reframes the engineer's role: the job becomes defining intent precisely enough that agents can action it reliably, with accumulated artifacts serving as institutional memory for subsequent cycles.

DECISIONS

Focus adoption work at team level rather than pursuing org-wide transformation. The unit of adoption is "team plus their codebase," not the organization. Intent-Driven Development will be documented and refined specifically for team implementation.

Commission a formal essay on Intent-Driven Development positioning it as the evolution of Spec-Driven Development, where the spec is understood as one artifact among several produced by iterative intent refinement. Open questions are acceptable and will be surfaced honestly rather than resolved prematurely.

ARTIFACTS PRODUCED

Research document: "AI-Integrated Software Engineering: Process Models and Methodologies" cataloging SASE, SDD, DORA findings, role evolution models, and six underexplored dimensions (knowledge management, quality feedback loops, specification problem, team topology implications, review bottleneck, debugging forensics).

Draft essay: "Intent-Driven Development" (status: draft, unpublished) articulating the core model and distinguishing it from Spec-Driven Development.

Meeting lore artifact capturing the full reasoning chain.

Pull request #6 containing research and draft essay ready for review.

OPEN ITEMS

Review and finalize the Intent-Driven Development essay before publication. Determine whether the piece is positioned for internal team adoption, broader publication, or both. Define operationalization: how the team begins applying intent-driven workflow to current work. Address the skill gap identified: junior engineers learning intent definition without the foundation of code reading/writing; senior engineers transitioning to intent-translation roles.
