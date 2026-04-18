---
status: active
title: "AI-Integrated Software Engineering: Process Models and Methodologies"
---

# AI-Integrated Software Engineering: Process Models and Methodologies

**Research date:** 2026-03-15
**Scope:** September 2024 to March 2026
**Question:** Has anyone articulated a formal process model for how AI participation changes the software engineering workflow, analogous to how UML formalized OO design or Agile formalized iterative values?

---

## Executive Summary

Nobody has shipped a "UML for AI-integrated SE" yet, but one serious attempt exists and several convergent threads are visible. The field is between "everyone improvising" and "vocabulary solidifying." The closest thing to a formal process model is **SASE (Structured Agentic Software Engineering)** from Hassan et al. at Queen's University, which proposes named artifacts, role definitions, and interaction patterns at a level of formality comparable to early Agile manifestos. Everything else is either a named practice (Spec-Driven Development), a taxonomy (Treude & Gerosa), or a maturity framework (DORA 2025, Anthropic's trends report).

**Verdict:** You're not the first to ask this question, but the people asking it can be counted. The formal model space is nearly empty. Most of the industry is still at the "tool adoption" or "vibe coding vs. not" level of discourse.

---

## 1. Formal Process Models

### SASE: Structured Agentic Software Engineering (Hassan et al., 2025)

**Source:** [Agentic Software Engineering: Foundational Pillars and a Research Roadmap](https://arxiv.org/html/2509.06216v2)
**Authors:** Ahmed E. Hassan (Queen's University), Hao Li, Dayi Lin (Huawei Canada), Bram Adams, Tse-Hsun Chen, Yutaro Kashiwa, Dong Qiu
**Confidence:** Verified against paper. This is the most formally articulated model found.

This is the closest analog to what you're looking for. SASE proposes:

**A generational model (SE 1.0/2.0/3.0):**
- SE 1.0: Traditional software engineering
- SE 2.0: AI-augmented (Copilot era, current mainstream)
- SE 3.0: Agentic SE, where autonomous agents are team participants

**A dual-modality framework:**
- **SE for Humans (SE4H):** Redefines human roles as "Agent Coaches" focused on intent, strategy, mentorship
- **SE for Agents (SE4A):** Creates structured environments enabling agents to operate effectively

**Four reimagined pillars** (mapping to traditional SE pillars):
1. **Actors:** Hybrid teams of Agent Coaches and specialized agents (N-to-N collaboration, not 1-to-1)
2. **Processes:** Structured engineering activities replacing ad-hoc prompting
3. **Artifacts:** Named, version-controlled documents replacing ephemeral prompts:
   - *BriefingScript*: Mission briefs with intent and acceptance criteria
   - *LoopScript*: Workflow orchestration playbooks
   - *MentorScript*: Codified best practices and team norms
   - *Consultation Request Pack (CRP)*: Agent-to-human escalation requests
   - *Merge-Readiness Pack (MRP)*: Evidence bundles proving merge-readiness
   - *Version Controlled Resolutions (VCR)*: Auditable human decisions
4. **Tools:** Two specialized workbenches:
   - *Agent Command Environment (ACE)*: Human oversight dashboard
   - *Agent Execution Environment (AEE)*: Agent workspace optimized for computation

**Six engineering activities:**
1. Briefing Engineering (specs as work orders)
2. Agentic Loop Engineering (workflow orchestration)
3. AI Teammate Mentorship Engineering (codified guidance)
4. Agentic Guidance Engineering (structured human review)
5. AI Teammate Lifecycle Engineering (persistent agent memory)
6. AI Teammate Infrastructure Engineering (agent-native toolchains)

**A five-level autonomy scale** (analogous to SAE autonomous vehicle levels):
- L0-1: Manual/token assistance
- L2: Task-agentic (SE 2.0)
- L3: Goal-agentic (SE 3.0, current focus)
- L4-5: Specialized/general domain autonomy (future)

**Critical gaps the authors identify:**
- No systematic logging of human-agent dialogue or agent reasoning
- Code changes can be rolled back, but not agent state or conversational context
- No traceability between mentorship artifacts and their effect on code

**Assessment:** This is the most UML-like attempt. Named artifacts, defined roles, interaction patterns, explicit process activities. It reads like a research roadmap more than a practitioner methodology, but the structural ambition is there. Published September 2025, so very recent.

---

## 2. Named Practices (Not Full Models)

### Spec-Driven Development (SDD)

**Sources:**
- [Thoughtworks blog](https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices) (2025)
- [GitHub Spec Kit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) (2025)
**Confidence:** Verified against both sources.

SDD separates development into two phases:
1. **Planning:** Requirements analysis, design documents, implementation plans (formalized as Markdown), iterated with human review
2. **Implementation:** Agent generates code from finalized specs

Key distinction from "vibe coding": SDD enforces "serious requirements analysis, prudent software design, and human-in-the-loop governance." Specs include preconditions, postconditions, invariants, interface types, and state machines.

**Assessment:** This is a practice, not a process model. It tells you what to do (write specs, then let agents implement) but doesn't formalize the interaction patterns, role definitions, or artifact lifecycle the way SASE does. It's more analogous to "write user stories" than to Scrum. Still, it's the most widely adopted named practice in this space, with GitHub tooling support.

### Augmented Coding (Kent Beck)

**Source:** [Augmented Coding: Beyond the Vibes](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes) (September 2025)
**Confidence:** Verified against source.

Beck distinguishes:
- **Vibe coding:** "You don't care about the code, just the behavior." Feed errors back and hope.
- **Augmented coding:** "You care about the code, its complexity, the tests, their coverage." Same values as hand coding, different execution model.

Core practice: Strict TDD discipline with AI. Red-Green-Refactor cycle, one test at a time, minimum code to pass. Human guides strategy and design; AI handles implementation. Warning signs of drift: AI writing loops unnecessarily, adding unrequested functionality, "cheating" by deleting tests.

**Assessment:** This is a value statement with an embedded practice (TDD + AI), not a process model. Beck is articulating *what to care about*, not *how to structure the workflow*. Important voice because of his credibility, but not the formal model you're looking for.

---

## 3. Taxonomies and Frameworks

### Treude & Gerosa: Taxonomy of Human-AI Interaction in SE

**Source:** [How Developers Interact with AI: A Taxonomy of Human-AI Collaboration in Software Engineering](https://arxiv.org/html/2501.08774v1) (January 2025)
**Authors:** Christoph Treude (Singapore Management University), Marco A. Gerosa (Northern Arizona University)
**Confidence:** Verified against paper.

Identifies 11 interaction types (auto-complete, command-driven, conversational, contextual recommendations, selection-based, explicit UI, comment-guided, event-based triggers, shortcut-activated, file-aware, automated API). Categorized across four dimensions: trigger mechanisms, AI response types, developer response patterns, output deliverables.

**Assessment:** A taxonomy, not a process model. Useful for classifying what interactions exist, but doesn't prescribe how to organize them into a workflow or methodology.

### DORA 2025: AI as Amplifier

**Source:** [2025 DORA Report](https://dora.dev/research/2025/dora-report/) and [IT Revolution analysis](https://itrevolution.com/articles/ais-mirror-effect-how-the-2025-dora-report-reveals-your-organizations-true-capabilities/)
**Confidence:** Verified against multiple analyses of the report.

Central finding: "AI doesn't create organizational excellence, it amplifies what already exists." Seven foundational capabilities identified: clear AI policies, healthy data ecosystems, strong version control, small-batch working, user-centric focus, quality internal platforms, value stream management.

Key tension: AI boosts individual output (21% more tasks, 98% more PRs merged) but organizational delivery metrics stay flat. 80% report productivity gains, but friction and burnout persist unchanged.

**Assessment:** This is empirical evidence about what happens when AI enters existing processes, not a model for new processes. The "amplifier" framing is important, but prescriptive guidance is limited to "get your fundamentals right first." Recommendation: "Treat AI adoption as an organizational transformation, not tool procurement."

### Anthropic 2026 Agentic Coding Trends Report

**Source:** [Anthropic report](https://resources.anthropic.com/2026-agentic-coding-trends-report) and [tessl.io analysis](https://tessl.io/blog/8-trends-shaping-software-engineering-in-2026-according-to-anthropics-agentic-coding-report/)
**Confidence:** Verified against secondary analysis (primary PDF not fetched).

Eight trends:
1. Tectonic shift in SDLC (roles move toward agent supervision)
2. Agents become team players (multi-agent coordination)
3. Agents go end-to-end (hours/days, not minutes)
4. Agents learn when to ask for help (uncertainty detection)
5. Agents spread beyond software engineers
6. More code, shorter timelines
7. Non-engineers embrace agentic coding
8. Security becomes bidirectional

Describes a "supervision-centric model" replacing execution-centric development. Human judgment moves upstream (architecture, scope, risk); routine implementation moves to agents with structured checkpoints.

**Assessment:** Industry trends analysis, not a formal model. But the "supervision-centric" framing and the identification of structured checkpoints between human and agent work are process-model-adjacent concepts.

---

## 4. Role Redefinition Models

### Coder to Orchestrator (Nicholas Zakas)

**Source:** [From Coder to Orchestrator](https://humanwhocodes.com/blog/2026/01/coder-orchestrator-future-software-engineering/) (January 2026)
**Author:** Nicholas C. Zakas (creator of ESLint)
**Confidence:** Verified against source.

Three-stage evolution:
1. **Coder (2024):** AI as improved autocomplete, humans remain drivers
2. **Conductor (2025):** Humans give instructions, review outputs, iterate
3. **Orchestrator (2025+):** Humans coordinate multiple agents working simultaneously

Predicts: IDEs will prioritize agent management over code editing by 2028. Code review becomes agent-to-agent with human oversight. Human value shifts to organization, communication, systems thinking.

### Agent Coach (Hassan et al., via SASE)

The SASE framework's "Agent Coach" role is the most formally defined. Coaches provide:
- Strategic intent and acceptance criteria (via BriefingScripts)
- Codified norms and guidance (via MentorScripts)
- Decision-making at escalation points (via CRP/VCR cycle)

---

## 5. Terminology Landscape

The vocabulary is **not converging yet**, but clusters are forming:

| Concept | Terms in Use | Notes |
|---------|-------------|-------|
| AI writing code with minimal oversight | Vibe coding (Karpathy) | Most widely adopted term, pejorative connotation in serious contexts |
| AI writing code with engineering discipline | Augmented coding (Beck), Spec-driven development (Thoughtworks/GitHub) | Two competing terms for similar values |
| Autonomous AI development agents | Agentic SE, Agentic coding, SE 3.0 | "Agentic" is winning as the umbrella term |
| Human role in AI-integrated dev | Agent Coach (SASE), Orchestrator (Zakas), Conductor (Zakas mid-stage) | No convergence yet |
| Structured AI work orders | BriefingScript (SASE), Spec (SDD), Prompt engineering (deprecated usage) | SASE terminology is most precise but least adopted |
| Agent asking for human help | Consultation Request Pack (SASE), "asking for help" (Anthropic) | SASE has the formal term, nobody else uses it |
| Evidence that work is ready | Merge-Readiness Pack (SASE) | Only SASE has named this |
| The spec-implement separation | SDD, context engineering | "Context engineering" is gaining traction as broader term |
| AI maturity levels | SE 1.0/2.0/3.0 (SASE), L0-L5 autonomy (SASE), DORA capabilities | Multiple competing scales |

---

## 6. What's Missing: Questions Not Being Asked

Based on what I found and what I didn't find, these dimensions appear underexplored:

### Knowledge management and institutional memory
Most frameworks treat each AI interaction as stateless. SASE mentions persistent agent memory and MentorScripts, but nobody is addressing how AI changes the accumulation and transfer of institutional knowledge within teams. When an AI can answer questions that previously required senior engineers, what happens to the mentorship pipeline? The DORA report hints at this (AI disrupts traditional knowledge-sharing practices) but doesn't propose solutions.

### Quality feedback loops and regression
Beck identifies that AI "cheats" by deleting tests. The DORA report shows individual output up but organizational metrics flat. Nobody is formalizing the feedback mechanisms that prevent AI-accelerated entropy. How do you measure whether AI is making your codebase better or worse over time? The traditional metrics (coverage, complexity, defect rate) may not capture AI-specific failure modes.

### The specification problem
SDD assumes you can write good specs. But the entire history of software engineering is about how hard that is. AI doesn't solve the requirements problem; it moves the bottleneck there. Nobody is addressing how to write specs *for agents* (as opposed to specs for humans). SASE's BriefingScript concept is the closest, but it's a placeholder, not a worked example.

### Team topology implications
Conway's Law says system structure mirrors org structure. If agents are team participants (SASE's N-to-N model), how does that change system architecture? How do you organize agent capabilities relative to service boundaries? Nobody is connecting Team Topologies thinking to AI team composition.

### The review bottleneck
Every model puts humans in the review/oversight position. As agent output scales, review becomes the bottleneck. Agent-reviews-agent (Zakas predicts this) creates trust questions. Nobody has a rigorous model for how review quality scales with AI output volume.

### Debugging and forensics
When an agent produces code, the debugging model changes. You can't "think through what I was thinking when I wrote this" because you didn't write it. SASE identifies the traceability gap (no link between mentorship artifacts and code), but nobody has proposed solutions for post-hoc reasoning about AI-generated code.

---

## 7. Assessment for Your Context

You asked whether you're the first to articulate a UML-level abstraction for AI-integrated SE processes.

**You are not the first to ask the question.** Hassan et al. are asking it explicitly, with the most formal answer (SASE). Thoughtworks and GitHub are answering it partially (SDD). Beck is answering it at the values level (augmented coding). DORA is answering it at the measurement level.

**You may be among the first practitioners articulating it from inside.** The academic work (SASE) reads like a research agenda. The industry work (SDD, Anthropic report) reads like practices or trends. Nobody I found is a senior engineering manager at a large company publishing a structural model from the practitioner side. The gap between "research framework" and "team playbook" is exactly where your perspective sits.

**What you've already built (AI adoption policy, team playbook, the Guild Hall/Lore Development patterns for structuring AI work) maps to several SASE concepts:**
- Your CLAUDE.md files parallel MentorScripts
- Your lore artifacts parallel BriefingScripts
- Your commission system parallels the CRP/MRP workflow
- Your review-agent patterns parallel Agentic Guidance Engineering

The difference: you built these from practice. SASE built them from theory. Neither has achieved the other's strength yet.

---

## Sources Index

| Source | Type | Date | Relevance |
|--------|------|------|-----------|
| [Hassan et al. - SASE](https://arxiv.org/html/2509.06216v2) | Academic paper | Sep 2025 | Highest: formal process model |
| [Treude & Gerosa - Taxonomy](https://arxiv.org/html/2501.08774v1) | Academic paper | Jan 2025 | High: interaction classification |
| [Thoughtworks - SDD](https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices) | Industry blog | 2025 | High: named practice |
| [GitHub - Spec Kit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) | Tool + methodology | 2025 | Medium: tooling for SDD |
| [Kent Beck - Augmented Coding](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes) | Practitioner blog | Sep 2025 | High: values framework |
| [Zakas - Coder to Orchestrator](https://humanwhocodes.com/blog/2026/01/coder-orchestrator-future-software-engineering/) | Practitioner blog | Jan 2026 | Medium: role evolution model |
| [DORA 2025 Report](https://dora.dev/research/2025/dora-report/) | Industry research | 2025 | High: empirical evidence |
| [IT Revolution - DORA Analysis](https://itrevolution.com/articles/ais-mirror-effect-how-the-2025-dora-report-reveals-your-organizations-true-capabilities/) | Analysis | 2025 | Medium: synthesis of DORA |
| [Anthropic - Agentic Coding Report](https://resources.anthropic.com/2026-agentic-coding-trends-report) | Industry research | 2026 | Medium: trends, not model |
| [tessl.io - Anthropic Analysis](https://tessl.io/blog/8-trends-shaping-software-engineering-in-2026-according-to-anthropics-agentic-coding-report/) | Analysis | 2026 | Medium: extracted trends |
| [ACM TOSEM - Research Roadmap](https://doi.org/10.1145/3788879) | Academic paper | 2025 | Low: roadmap, not model |
| [DFKI - GenAI in SE](https://www.dfki.de/fileadmin/user_upload/DFKI/Medien/News/2025/Wissenschaftliche_Exzellenz/Generative_AI_in_Software_Engineering_Transforming_the_Software_Development_Process_2025.pdf) | Academic paper | 2025 | Low: transformation survey |
