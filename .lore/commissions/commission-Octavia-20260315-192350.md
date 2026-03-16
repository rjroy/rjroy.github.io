---
title: "Commission: Writing: Intent-Driven Development"
date: 2026-03-16
status: completed
type: one-shot
tags: [commission]
worker: Octavia
workerDisplayTitle: "Guild Chronicler"
prompt: "Write an essay for Ron's Broadcast Cache (his public digital garden at rjroy.github.io) titled \"Intent-Driven Development.\"\n\n**Location:** `content/Writing/Intent-Driven-Development/index.md`\n\n**Voice:** Follow the writing style rules in the user's global CLAUDE.md. Plain, professional, precise. No em-dashes. No LinkedIn-speak. Write like a lead, not a lecturer. Paragraphs by default, bullets only when they carry weight.\n\n**Audience:** Senior engineers and engineering managers who are past the \"should I use AI\" stage and are grappling with what AI fundamentally changes about how software gets built.\n\n**Core thesis:** The evolution from traditional development to AI-integrated development isn't about tools or specs. It's about intent. The engineer's job is becoming intent definition, refinement, and verification. The spec is an artifact of intent, not the intent itself. This reframes what \"software engineering\" means when AI handles implementation.\n\n**Key ideas to weave in (from our conversation):**\n\n1. **The context problem at scale:** Large companies with hundreds of projects and million-line codebases can't just \"add AI tools.\" The real challenge is knowledge externalization: conventions, architecture decisions, tribal knowledge. Tools give access; understanding requires layers of context.\n\n2. **Process over tools:** Whether AI enters through a chat window, an editor, or an agent framework is incidental. The real question is: what does the engineering workflow become when AI is a participant, not a tool you alt-tab to?\n\n3. **The missing model:** The industry is between \"everyone improvising\" and \"vocabulary solidifying.\" SASE (Hassan et al., 2025) is the most formal attempt at a process model. SDD names a practice. Kent Beck articulated values. DORA measured outcomes. Nobody has shipped the \"UML for AI-integrated SE\" yet. Reference Verity's research at `.lore/research/ai-integrated-se-methodologies.md` for sources and details.\n\n4. **The fundamental loop:**\n   - Define intent (discuss what you want and why)\n   - Save the collaboration (the accumulated context, not just the spec)\n   - Action the intent (let AI implement)\n   - Review the result (intent verification, not code review)\n   - Repeat (each cycle starts from a higher baseline because state is preserved)\n\n5. **Intent vs. spec:** SDD puts the spec at the center. Intent-Driven Development recognizes the spec as one artifact among many. The real driver is layered intent: refined through conversation, research, brainstorming, and iteration. The spec is what gets produced, not what gets consumed.\n\n6. **The ralph loop problem:** Brute-force iteration (keep running the agent until it converges) works but substitutes compute for clarity. It doesn't reward better engineering. Intent-Driven Development argues that the cost of iteration is inversely proportional to the quality of the starting intent.\n\n7. **The role shift:** \"Software Engineer\" splits. Intent definition is design work. Review becomes intent verification (\"does this match what I meant?\" not \"is this good code?\"). The middle, where most engineers spend their time today, is what's evaporating. This is terrifying and worth naming honestly.\n\n8. **Open questions (name them, don't resolve them):**\n   - How do junior engineers learn intent definition without first learning to code?\n   - What does review look like when you didn't write the code?\n   - How does institutional knowledge accumulate when AI sessions are stateless?\n   - Does intent precision become the new measure of engineering skill?\n   - What happens to the craft of code?\n\n**Tone notes:**\n- This is a developing idea, not a manifesto. It's okay to have open questions.\n- Be honest about the fear. \"We are terrified\" is a real thing practitioners feel. Don't sanitize it.\n- Ground claims in the research Verity found. Reference SASE, SDD, Beck, DORA where relevant.\n- This should read as a practitioner who's been doing this work articulating what he's seeing, not an academic proposing a theory.\n\n**Frontmatter:**\n```yaml\n---\ntitle: \"Intent-Driven Development\"\ndescription: \"When AI handles implementation, the engineer's job becomes defining intent. What does that mean for how we build software?\"\ndate: 2026-03-15\ndraft: true\ntags: [ai, software-engineering, process, intent-driven-development]\n---\n```\n\nStart as a draft. Ron will review and refine before publishing."
dependencies: []
linked_artifacts:
  - content/Writing/Intent-Driven-Development/index.md

activity_timeline:
  - timestamp: 2026-03-16T02:23:50.498Z
    event: created
    reason: "Commission created"
  - timestamp: 2026-03-16T02:23:50.501Z
    event: status_dispatched
    reason: "Dispatched to worker"
    from: "pending"
    to: "dispatched"
  - timestamp: 2026-03-16T02:23:50.522Z
    event: status_in_progress
    reason: "Execution started"
    from: "dispatched"
    to: "in_progress"
  - timestamp: 2026-03-16T02:24:11.197Z
    event: progress_report
    reason: "Read Verity's research file and an existing essay for voice/format calibration. Drafting the essay now."
  - timestamp: 2026-03-16T02:25:48.270Z
    event: result_submitted
    reason: "Drafted \"Intent-Driven Development\" essay at content/Writing/Intent-Driven-Development/index.md. Marked as draft: true.\n\nThe essay covers all eight key ideas from the commission brief: context at scale, process over tools, the missing model (grounded in SASE, SDD, Beck, DORA from Verity's research), the fundamental loop, intent vs. spec, the brute-force iteration problem, the role shift (with honest acknowledgment of fear), and open questions left unresolved. Voice follows the writing style rules: plain, professional, no em-dashes, paragraphs over bullets, practitioner perspective rather than academic framing."
  - timestamp: 2026-03-16T02:25:58.629Z
    event: status_completed
    reason: "Execution completed"
    from: "in_progress"
    to: "completed"
current_progress: "Read Verity's research file and an existing essay for voice/format calibration. Drafting the essay now."
projectName: rjroy-github-io
---
Drafted "Intent-Driven Development" essay at content/Writing/Intent-Driven-Development/index.md. Marked as draft: true.

The essay covers all eight key ideas from the commission brief: context at scale, process over tools, the missing model (grounded in SASE, SDD, Beck, DORA from Verity's research), the fundamental loop, intent vs. spec, the brute-force iteration problem, the role shift (with honest acknowledgment of fear), and open questions left unresolved. Voice follows the writing style rules: plain, professional, no em-dashes, paragraphs over bullets, practitioner perspective rather than academic framing.
