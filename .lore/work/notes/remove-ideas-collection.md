---
title: "Implementation notes: remove-ideas-collection"
date: 2026-08-29
status: complete
tags: [implementation, notes, content, astro, information-architecture]
source: .lore/work/plans/remove-ideas-collection.md
modules: [content-collections, routes, navigation, wiki-links, giscus]
related: [.lore/vision.md]
---

# Implementation Notes: Remove the Ideas Collection

## Progress

- [x] Phase 1: Create private research structure and relocate non-public material (plan step 1)
- [x] Phase 2: Integrate project investigations into project pages (plan step 2)
- [x] Phase 3: Promote exploratory pieces to Writing (plan step 3)
- [x] Phase 4: Remove the Ideas collection and presentation layer (plan step 4)
- [x] Phase 5: Repair public content and contributor guidance (plan step 5)
- [x] Phase 6: Validate routes, content, and rendered-site behavior (plan step 6)

## Log

### Initialization

- Plan user-approved.
- Issue `rjroy_github_io-6em` claimed.
- No task files or lore-agent registry found.
- No redirects will be added.
- Giscus pathname thread changes accepted.

### Phase 1

- Created the five private research topic directories and moved 23 non-public Markdown files and four Exploring Whimsy images according to the target content map.
- Deleted the obsolete Ideas, AI as Your Partner, and Exploring Whimsy index pages; removed source directories once empty.
- Retained only `content/Ideas/Daemon-First-Agent-Native/index.md` and `content/Ideas/Leveraging-Local-LLMs/index.md` for Phase 3.
- Replaced private links that would otherwise target deleted or no-longer-colocated Ideas pages with public Writing links or plain text. No public content changed.
- Validation: `content/Ideas/` now has only the Phase 3 index candidates; private research is outside Astro's `content/` tree.
- Phase 1 validation correction: renamed the two private index-derived notes to lowercase filenames and repaired their stale private wiki-links, including the retained cross-folder Whimsy research relationship. No public site file was changed.
- Phase 1 review correction (P1-001, P1-002): retargeted the remaining private research links to the public Memory Loop and Whimsy for Clarity pages while preserving their displayed link text. No public site file was changed.

### Phase 1 Acceptance

- Phase 1 complete: validation confirmed only the Phase 3 candidates remain in `content/Ideas/` and all private research is outside Astro's public `content/` tree.
- Review findings P1-001 and P1-002 resolved.
- No public site-code changes were made.

### Phase 2

- Added a concise Guild Hall origin section explaining that the earlier blackboard-architecture investigation informed, but did not define, the shipped human delegation workspace. The section centers persistent workers, commissions, and artifacts without reproducing obsolete API proposals or unresolved implementation work.
- Added a Memory Loop section on the tension between low-friction AI assistance and learning through desirable difficulty. It identifies retrieval practice/spaced repetition, durable artifact extraction, and alternative cognitive modes as unshipped directions, and explicitly describes Pair Writing Mode as proposed.
- Validation: both public pages use reader-facing prose, contain no private `.lore` links, and do not claim the unshipped Memory Loop directions are available.
- Validation: `git diff --check` passed.

### Phase 3

- Moved the Daemon-First, Agent-Native and Leveraging Local LLMs index pages to their planned `content/Writing/` destinations using noninteractive moves.
- Normalized Writing metadata: both pages now have title, description, date, and tags; removed Ideas-only status fields and the Daemon page's invalid `statuc` typo.
- Kept Daemon-First as one article, removed links to the private architecture notes, and clarified that web/CLI parity and atomic operations are established while agent-composed features remain possible rather than implemented.
- Reframed Leveraging Local LLMs as a January 2026 experiment in its title, card description, and opening so its testing observations are not presented as current model-selection guidance.
- M1 correction: replaced the broad bf16 and q4/q5 claims with the observed bf16 latency in this test and the unmeasured planned q4_K_M comparison.
- Validation: neither promoted page links to `/ideas/` or a `.lore` path; the planned Writing route slugs follow their destination directories.
- Validation: `git diff --check` passed. `bun run check` could not run because the checkout lacks `@astrojs/check` and Astro prompted to install it; dependencies were not modified during this content phase.

### Phase 4

- Removed the Ideas content schema, routes, layout, navigation, footer link, homepage loading/cards/count, wiki-link scan, and content-image copying glob.
- Removed the retired Thoughts `linkedIdea` schema field and its route/layout rendering consumer.
- Updated homepage copy so Writing includes exploratory long-form work, renumbered the remaining three areas, and removed the separate Ideas destination.
- Updated package and RSS descriptions, and retained `scripts/migrate-frontmatter.ts` for Writing and Projects while removing its Ideas branch.
- Phase 5 public-content link and contributor-guidance updates remain intentionally deferred.

### Phase 5

- Retargeted the stale public wiki-links in The Road to Wisdom and Model-Agnostic Applications to the promoted Writing articles.
- Replaced deleted Ideas overview links in the AI as Your Partner articles with the public Writing series index.
- Removed the obsolete Exploring Whimsy dependency from both Expressive Tools articles; Background as Worldview now links only to its public companion article.
- Updated the public index and contributor guidance so Thoughts, Projects, and Writing are the only content destinations. Writing explicitly includes exploratory long-form work, and Memory Loop now routes projects to `Projects/`.
- Removed an unrelated public link to a private `.lore` artifact in Building a Game With AI.
- Validation: public content has no wiki-links or Markdown links to deleted Ideas pages or private `.lore` material, and contributor guidance does not direct new content to `content/Ideas/`.

### Phase 6 Acceptance

- `CI=1 bun run build` passed, generating 40 static pages, including both promoted Writing routes and no `/ideas/` route.
- `CI=1 bun run check` remains blocked because `@astrojs/check` is absent from the checkout. Astro reported the dependency requirement without attempting an interactive install; dependencies were not modified.
- Final reviewer outcome: accepted. The approved Ideas collection removal implementation and its documented validation are complete.

## Divergence

(None.)
