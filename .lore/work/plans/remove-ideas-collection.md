---
title: "Implementation plan: remove the Ideas collection"
date: 2026-08-29
status: approved
tags: [plan, content, astro, information-architecture]
modules: [content-collections, routes, navigation]
related: [.lore/vision.md, .lore/specs/astro-migration.md]
---

# Implementation plan: remove the Ideas collection

## Decision

Remove `Ideas` as a public collection. The public site will have three content types:

This approved plan supersedes the conflicting draft Ideas/Writing taxonomy in `.lore/vision.md`.

- `Thoughts`: short, dated reflections.
- `Projects`: built and maintained work, including the conclusions and future directions that directly explain a project.
- `Writing`: all reader-facing long-form work, including exploratory writing. A Writing entry does not need to be a polished essay or a multi-part series.

Raw LLM output, research reports, prompts, superseded project concepts, and working notes will move out of `content/` to `.lore/work/research/`. They will remain in the repository but will no longer produce public pages. No redirects will be added: the existing Astro migration deliberately accepts URL changes for the small audience. Moved pages will consequently begin new Giscus pathname threads.

## Target Content Map

| Current path | Destination | Action |
| --- | --- | --- |
| `content/Ideas/Guild-Hall/index.md` | `.lore/work/research/guild-hall/blackboard-origin.md` | Preserve the earlier blackboard-design proposal as historical project research. |
| `content/Ideas/Guild-Hall/research/*.md` | `.lore/work/research/guild-hall/` | Preserve both raw research reports privately. |
| `content/Ideas/LLM-Integrated-PKM/index.md` | `.lore/work/research/memory-loop/llm-integrated-pkm.md` | Preserve the research synthesis privately. |
| `content/Ideas/LLM-Integrated-PKM/From-Research-to-Practice.md` | `.lore/work/research/memory-loop/from-research-to-practice.md` | Preserve the feature proposals and their rationale privately. |
| `content/Ideas/LLM-Integrated-PKM/{Research,Prompts}/*.md` | `.lore/work/research/memory-loop/` | Preserve raw research results and the prompts that generated them privately. |
| `content/Ideas/AI-as-Your-Partner/index.md` | deleted | Its role is superseded by the published Writing series index. |
| `content/Ideas/AI-as-Your-Partner/ai-rules-research-summary.md` | `.lore/work/research/ai-as-your-partner/ai-rules-research-summary.md` | Preserve raw LLM research as the source for the published article. |
| `content/Ideas/AI-as-Your-Partner/What-is-Partnership.md` | `.lore/work/research/ai-as-your-partner/what-is-partnership.md` | Preserve exploratory source notes privately, not a second public series page. |
| `content/Ideas/AI-as-Your-Partner/research/*.md` | `.lore/work/research/ai-as-your-partner/` | Preserve raw research reports privately. |
| `content/Ideas/Exploring-Whimsy/index.md` | deleted | Its project brief and completed next-action list are superseded by Writing. |
| `content/Ideas/Exploring-Whimsy/{philosophy-of-whimsy,background-as-worldview}.md` | `.lore/work/research/expressive-tools/` | Preserve source drafts privately. Public conclusions already appear in Writing. |
| `content/Ideas/Exploring-Whimsy/research/*.md` | `.lore/work/research/expressive-tools/` | Preserve raw research privately. |
| `content/Ideas/Exploring-Whimsy/images/*` | `.lore/work/research/expressive-tools/images/` | Preserve source images with their research; remove them from public asset copying. |
| `content/Ideas/Daemon-First-Agent-Native/index.md` | `content/Writing/Daemon-First-Agent-Native/index.md` | Promote the current exploratory article to public Writing without changing its epistemic boundaries. |
| `content/Ideas/Daemon-First-Agent-Native/{daemon-first-architecture,agent-native-layer}.md` | `.lore/work/research/daemon-first-agent-native/` | Preserve the architecture reference notes privately. |
| `content/Ideas/Leveraging-Local-LLMs/index.md` | `content/Writing/Leveraging-Local-LLMs/index.md` | Promote the local-model experiment to exploratory Writing. |
| `content/Ideas/index.md` | deleted | Delete the obsolete public-section explanation. |

## Implementation Steps

1. **Create the private research structure and relocate non-public material.**

   Create the five topic directories under `.lore/work/research/`: `guild-hall`, `memory-loop`, `ai-as-your-partner`, `expressive-tools`, and `daemon-first-agent-native`. Move every source file in the Target Content Map into its stated directory, preserving filenames except for the two renamed index pages. Update internal wiki-links in these private files only when necessary to avoid links back to deleted `Ideas` paths; private research may instead use ordinary Markdown references to the public Project or Writing page.

   Validation gate: no files remain below `content/Ideas/` except the two entries being promoted until Step 3 completes. The moved raw research must not appear in Astro's content collection or build output.

2. **Integrate the two project investigations into their project pages.**

   Update `content/Projects/Guild-Hall/index.md` with a short origin/evolution section: the original blackboard-architecture exploration informed the project, but the shipped system became a human delegation workspace organized around persistent workers, commissions, and artifacts. Do not reproduce the obsolete proposed API or unresolved implementation checklist.

   Update `content/Projects/Memory-Loop/index.md` with a clearly scoped "What the workflow is teaching me" or equivalent section. It must name the central tension from the PKM research: low-friction capture and AI-assisted synthesis can undermine learning unless the product retains desirable difficulty. It must identify the concrete, unshipped directions as project work: retrieval practice/spaced repetition, durable artifact extraction, and alternative cognitive modes. Pair Writing Mode remains a proposed Memory Loop capability, not a shipped feature.

   Validation gate: each project page explains the relevant investigation in reader-facing prose without linking to a publicly unavailable research page or claiming unimplemented features exist.

3. **Promote the two standalone exploratory pieces to Writing.**

   Move `Daemon-First-Agent-Native/index.md` and `Leveraging-Local-LLMs/index.md` into their stated `content/Writing/` destinations. Normalize their frontmatter to the Writing schema: valid `title`, `description`, `date`, and tags; remove Ideas-only `status`; correct the existing `statuc` typo in Daemon-First. Give each page a description suitable for Writing cards.

   Keep Daemon-First, Agent-Native as one article because the source intentionally presents the daemon as the primitive layer and the agent-native layer as the related composition layer. Preserve its explicit distinction between observed practice and aspiration: web/CLI parity and atomic operations are established; agent-composed features are not. Rewrite or remove the reference section so it does not link to the now-private reference notes.

   Keep Leveraging Local LLMs exploratory and time-bound. Retain its local testing observations, conclusions, open questions, and source links, but revise the opening/title metadata only as needed to make clear it is a dated experiment rather than current model-selection guidance.

   Validation gate: both pages build at `/writing/daemon-first-agent-native/` and `/writing/leveraging-local-llms/`; neither has links to `/ideas/` or to a private `.lore` path.

4. **Remove the Ideas collection and presentation layer.**

   Delete `content/Ideas/`, `src/pages/ideas/index.astro`, `src/pages/ideas/[...slug].astro`, and `src/layouts/IdeaLayout.astro`. Remove the `ideas` schema and export from `src/content.config.ts`. Remove the unused `linkedIdea` field from the Thoughts schema, `src/pages/thoughts/[...slug].astro`, and `src/layouts/ThoughtLayout.astro`; no existing Thought uses it, and the field encodes the retired collection rather than a general content relationship.

   In `astro.config.mjs`, remove `Ideas` from the wiki-link file scan and content-image copying glob. In `src/components/Nav.astro` and `src/components/Footer.astro`, remove the Ideas navigation link. In `src/pages/index.astro`, remove Ideas loading, counts, curated content, its feature card, and its area card; renumber the remaining areas. Rewrite the hero and area copy so Writing explicitly permits exploratory long-form work and the site no longer promises a separate Ideas destination.

   Remove Ideas-specific wording from `package.json` and `src/pages/rss.xml.ts`. Retire `scripts/migrate-frontmatter.ts` if its only remaining purpose is Ideas migration; otherwise remove only its Ideas branch.

   Validation gate: `rg` finds no executable source/config reference to the removed `ideas` collection, `/ideas/` route, or `IdeaLayout`.

5. **Repair public content and contributor guidance.**

   Update every public wiki-link currently targeting `Ideas`:

   - `content/Writing/The-Road-to-Wisdom/index.md`: replace the Agent-Native reference with the promoted Daemon-First Writing article, or remove it if the destination is not an appropriate citation.
   - `content/Writing/Model-Agnostic-Applications/index.md`: point Daemon-First to Writing; remove or replace the Leveraging Local LLMs link with its promoted Writing destination.
   - `content/Writing/AI-as-Your-Partner/{youre-not-configuring-a-tool,ai-has-architectural-predispositions,what-makes-good-ai-rules-files}.md`: remove links to the deleted Ideas overview and point readers to the Writing series index where a series-level link is useful.
   - `content/Writing/Expressive-Tools/{Whimsy-for-Clarity,Background-as-Worldview}.md`: remove the obsolete Exploring Whimsy links and revise surrounding sentences so neither page requires a private companion page.

   Update `content/index.md` to list Thoughts, Projects, and Writing and eliminate the former digital-garden/Ideas organization copy. Update `CLAUDE.md`, `.claude/commands/process-thoughts.md`, `.memory-loop.json`, and `.memory-loop/claude-md-backup.md` to remove Ideas routing and direct new long-form, including exploratory writing, to Writing. Preserve historical references under existing `.lore/` artifacts only.

   Validation gate: all published wiki-links resolve to public routes; no documentation tells a contributor to create `content/Ideas/` content.

6. **Validate route, content, and rendered-site behavior.**

   Run `bun run check` and `bun run build`. Inspect the generated output to confirm there is no `/ideas/` route, raw research page, prompt page, or research image. Confirm the two promoted pages render under Writing, the Guild Hall and Memory Loop pages have their integrated context, navigation contains only Thoughts, Projects, and Writing, and homepage counts/cards are correct.

   Manually inspect the changed public pages in `bun run preview`, including desktop and mobile navigation. Check that Giscus renders on the two promoted Writing pages and that all repaired links lead to existing public pages.

## Completion Criteria

- `content/Ideas/` and all Ideas-specific code routes/layouts/configuration are absent.
- No raw research, prompt, working-note, or source image under `.lore/work/research/` is rendered or copied to `dist/`.
- Guild Hall and Memory Loop contain the reader-facing conclusions that previously motivated their Ideas entries.
- Daemon-First, Agent-Native and Leveraging Local LLMs are available as exploratory Writing entries.
- The site builds cleanly, has no public `/ideas/` references, and has no unresolved public wiki-links.
