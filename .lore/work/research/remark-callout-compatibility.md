---
title: remark-callout compatibility during the Astro 7 upgrade
date: 2026-10-27
status: completed
tags: [research, astro, markdown, callouts, dependencies, testing]
modules: [markdown, writing-covers]
---

# remark-callout compatibility during the Astro 7 upgrade

## Key Findings

The newly added untitled callout fixture exposed an existing `remark-callout@1.1.1` limitation, not an Astro 7 regression. The plugin requires an explicit, nonempty title on the marker line. Keep the unchanged plugin and exercise its supported syntax rather than patching its tokenizer or replacing its HTML output during a dependency migration.

```markdown
> [!NOTE] A *formatted* title
> Callout body, including [[wiki links]].
```

Untitled callouts are valid Obsidian syntax, but this plugin does not implement them correctly. This finding describes the existing site's actual support, not the whole Obsidian syntax contract.

## Evidence and Root Cause

- The installed plugin's `dist/lib/micromark-syntax.js:82-108` always opens a `calloutTitleChunk`, even when the next character is a newline. With no title, the empty token starts and ends on micromark's numeric newline chunk. `sliceStream()` calls `.slice()` on that number in `micromark/lib/create-tokenizer.js:503-513`, causing `chunks[startIndex].slice is not a function`.
- A controlled comparison using the old `@astrojs/markdown-remark@6.3.10` renderer and the migrated `7.3.4` renderer reproduced the same untitled failure. Both rendered the explicitly titled callout successfully with identical HTML, including emphasis in the title. The old lock and migrated lock both resolve `remark-callout@1.1.1`, `remark-parse@11.0.0`, `mdast-util-from-markdown@2.0.0`, and `micromark@4.0.0`.
- No callout markers were found in current public `content/`. Existing styling targets the plugin's `.callout` and `.callout-title` classes. The historical Astro migration spec describes generic Obsidian callouts, but that broader wording does not establish working untitled support in the implementation.
- Upstream [issue #4](https://github.com/rk-terence/gz-remark-callout/issues/4) reports the identical crash on Astro 4 in July 2024. A [March 2025 comment](https://github.com/rk-terence/gz-remark-callout/issues/4#issuecomment-2752740796) isolates the absence of a custom title. A proposed transitive dependency pin did not fix it.
- The package [README](https://github.com/rk-terence/gz-remark-callout/blob/main/README.md) and [upstream tests](https://github.com/rk-terence/gz-remark-callout/blob/main/tests/callout.test.ts) demonstrate explicit titles, formatted titles, and nested titled callouts. The published tokenizer matches the [upstream source](https://github.com/rk-terence/gz-remark-callout/blob/main/lib/micromark-syntax.ts).

## Regression Boundary

`tests/writing-covers.test.mjs` continues to build controlled content through the real site configuration. Its titled callout checks the container/type, formatted title, separate content, and wiki-link resolution both outside and inside the callout. The existing cover/control assertions remain intact. No source content, CSS, package versions, or lock entries need to change for this correction.

Untitled and collapsible callouts remain unsupported by the existing plugin. Supporting them would be a separate feature/dependency decision, with HTML and appearance compatibility to verify rather than silently introducing it in this migration.
