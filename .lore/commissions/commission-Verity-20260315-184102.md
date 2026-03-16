---
title: "Commission: Research: AI-Integrated Software Engineering Process Models"
date: 2026-03-16
status: completed
type: one-shot
tags: [commission]
worker: Verity
workerDisplayTitle: "Guild Pathfinder"
prompt: "Research the current state of thinking around AI-integrated software engineering processes and methodologies. The user is asking whether anyone has articulated a formal model (not just tools or policies) for how AI participation fundamentally changes the software engineering workflow, analogous to how UML formalized OO design thinking or how Agile formalized iterative development values.\n\n**Core questions:**\n1. Has anyone published a formal process model or methodology for AI-integrated software engineering? Not \"how to use Copilot\" but structural models that describe the interactions between human engineers and AI participants in development workflows.\n2. Are there emerging frameworks, taxonomies, or conceptual models being proposed in industry or academia?\n3. What terminology is being used? Is there convergent vocabulary or is everyone still improvising their own?\n4. What are the better questions we're not asking? What dimensions of this problem are being discussed that we might be missing?\n\n**Scope constraints:**\n- Nothing older than 6 months (September 2024 or newer)\n- Industry publications, conference talks, research papers, thoughtful blog posts from practitioners\n- We're NOT looking for: tool comparisons, \"how to prompt engineer,\" AI coding assistant reviews, or corporate AI adoption case studies\n- We ARE looking for: structural thinking about process, methodology, workflow design, role redefinition, knowledge management patterns\n\n**Context:** The user is a senior engineering manager at a major game company (Epic Games) who has already implemented an AI adoption policy and team playbook. He's past the \"should we use AI\" and \"how do I use this tool\" stages. He's asking whether there's a UML-level abstraction waiting to be defined for how AI changes the engineering process itself. He wants to know if he's the first to articulate this or if others are converging on similar thinking.\n\nSave findings as a research artifact in `.lore/research/`."
dependencies: []
linked_artifacts:
  - .lore/research/ai-integrated-se-methodologies.md

activity_timeline:
  - timestamp: 2026-03-16T01:41:02.307Z
    event: created
    reason: "Commission created"
  - timestamp: 2026-03-16T01:41:02.313Z
    event: status_dispatched
    reason: "Dispatched to worker"
    from: "pending"
    to: "dispatched"
  - timestamp: 2026-03-16T01:41:02.372Z
    event: status_in_progress
    reason: "Execution started"
    from: "dispatched"
    to: "in_progress"
  - timestamp: 2026-03-16T01:41:12.504Z
    event: progress_report
    reason: "Starting research on AI-integrated software engineering methodologies. Running parallel searches across academic, industry, and practitioner sources."
  - timestamp: 2026-03-16T01:43:02.737Z
    event: progress_report
    reason: "Collected substantial evidence from 15+ sources. Key find: SASE framework from Hassan et al. (Queen's University/Huawei) is the closest thing to a formal process model. Also found convergent vocabulary around SDD, agentic SE, and role redefinition patterns. Now synthesizing into research artifact."
  - timestamp: 2026-03-16T01:45:19.902Z
    event: result_submitted
    reason: "Research complete. The formal process model space for AI-integrated software engineering is nearly empty, with one serious academic attempt (SASE from Hassan et al., Queen's University/Huawei, September 2025) and several convergent but less formal practices.\n\n**Key findings:**\n\n1. **One formal model exists:** SASE (Structured Agentic Software Engineering) proposes named artifacts (BriefingScript, MentorScript, CRP/MRP), defined roles (Agent Coach), a generational model (SE 1.0/2.0/3.0), and six engineering activities. It's the closest to a UML-level abstraction but reads as a research agenda, not a practitioner methodology.\n\n2. **Named practices are solidifying:** Spec-Driven Development (Thoughtworks/GitHub) and Augmented Coding (Kent Beck) have traction but are practices, not process models. SDD separates planning from implementation; Beck's framework is a value statement (care about code quality) with TDD discipline.\n\n3. **Vocabulary is clustering but not converging:** \"Agentic\" is winning as the umbrella term. \"Vibe coding\" vs. \"augmented coding\" vs. \"spec-driven development\" captures a values spectrum. Role terms (Agent Coach, Orchestrator, Conductor) are still competing.\n\n4. **Empirical evidence (DORA 2025) shows AI amplifies existing capability,** doesn't transform it. Individual output up 21%, organizational metrics flat. The implication: process models matter more than tool adoption.\n\n5. **The user's existing work (CLAUDE.md as MentorScripts, lore artifacts as BriefingScripts, commission system as CRP/MRP, review agents as Agentic Guidance) maps to SASE concepts.** The gap between academic framework and practitioner system is where his perspective would be novel.\n\n6. **Underexplored dimensions:** knowledge management/institutional memory, quality feedback loops, the specification bottleneck, team topology implications, review scalability, and debugging forensics for AI-generated code."
  - timestamp: 2026-03-16T01:45:35.666Z
    event: status_completed
    reason: "Execution completed"
    from: "in_progress"
    to: "completed"
current_progress: "Collected substantial evidence from 15+ sources. Key find: SASE framework from Hassan et al. (Queen's University/Huawei) is the closest thing to a formal process model. Also found convergent vocabulary around SDD, agentic SE, and role redefinition patterns. Now synthesizing into research artifact."
projectName: rjroy-github-io
---
Research complete. The formal process model space for AI-integrated software engineering is nearly empty, with one serious academic attempt (SASE from Hassan et al., Queen's University/Huawei, September 2025) and several convergent but less formal practices.

**Key findings:**

1. **One formal model exists:** SASE (Structured Agentic Software Engineering) proposes named artifacts (BriefingScript, MentorScript, CRP/MRP), defined roles (Agent Coach), a generational model (SE 1.0/2.0/3.0), and six engineering activities. It's the closest to a UML-level abstraction but reads as a research agenda, not a practitioner methodology.

2. **Named practices are solidifying:** Spec-Driven Development (Thoughtworks/GitHub) and Augmented Coding (Kent Beck) have traction but are practices, not process models. SDD separates planning from implementation; Beck's framework is a value statement (care about code quality) with TDD discipline.

3. **Vocabulary is clustering but not converging:** "Agentic" is winning as the umbrella term. "Vibe coding" vs. "augmented coding" vs. "spec-driven development" captures a values spectrum. Role terms (Agent Coach, Orchestrator, Conductor) are still competing.

4. **Empirical evidence (DORA 2025) shows AI amplifies existing capability,** doesn't transform it. Individual output up 21%, organizational metrics flat. The implication: process models matter more than tool adoption.

5. **The user's existing work (CLAUDE.md as MentorScripts, lore artifacts as BriefingScripts, commission system as CRP/MRP, review agents as Agentic Guidance) maps to SASE concepts.** The gap between academic framework and practitioner system is where his perspective would be novel.

6. **Underexplored dimensions:** knowledge management/institutional memory, quality feedback loops, the specification bottleneck, team topology implications, review scalability, and debugging forensics for AI-generated code.
