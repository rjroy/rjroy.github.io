import assert from "node:assert/strict"
import { execFile } from "node:child_process"
import { cp, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { promisify } from "node:util"
import { after, before, describe, it } from "node:test"

const run = promisify(execFile)
const repository = fileURLToPath(new URL("../", import.meta.url))
const cover = "/Writing/Covered/Chosen-Cover.svg"
const bodyImage = "/Writing/Covered/Body-Topper.svg"
const bodyAlt = "The original body illustration"
// remark-callout 1.1.1 requires an explicit title, including before the upgrade:
// https://github.com/rk-terence/gz-remark-callout/issues/4
const body = `# Fixture covered essay

![${bodyAlt}](${bodyImage})

Original opening paragraph.

## Original section

Original closing paragraph.

Read [[Writing/Plain/index|the plain essay]].

> [!NOTE] Fixture *note* title
> Fixture callout text. Read [[Writing/Plain/index|the plain essay from a callout]].
`
const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9"></svg>'

// Only inspect the small, known HTML fragments Astro renders for these fixtures;
// do not couple assertions to CSS class names or the current article inventory.
function attribute(markup, name) {
  return markup.match(new RegExp(`\\b${name}=["']([^"']*)["']`))?.[1]
}

function article(html) {
  const match = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)
  assert.ok(match, "the article body should still render")
  return match[1]
}

describe("Writing listing covers (isolated Astro build)", () => {
  let root
  let listing
  let cards

  before(async () => {
    // Never rewrite real content or depend on dist/ from an earlier build. The
    // temporary root also keeps Astro's content cache and generated types local.
    root = await mkdtemp("/tmp/opencode/writing-covers-")
    for (const file of ["src", "astro.config.mjs", "tailwind.config.mjs", "tsconfig.json", "package.json"]) {
      await cp(path.join(repository, file), path.join(root, file), { recursive: true })
    }
    await symlink(path.join(repository, "node_modules"), path.join(root, "node_modules"), "dir")
    // Dependencies are shared, but Astro's content store must not be: its
    // default node_modules/.astro cache would follow the symlink above.
    await writeFile(path.join(root, "astro.fixture.config.mjs"), `
import config from "./astro.config.mjs"
export default { ...config, cacheDir: "./.astro-cache" }
`)

    async function fixture(relativePath, contents) {
      const target = path.join(root, "content", relativePath)
      await mkdir(path.dirname(target), { recursive: true })
      await writeFile(target, contents)
    }

    await mkdir(path.join(root, "content/Thoughts"), { recursive: true })
    await mkdir(path.join(root, "content/Projects"), { recursive: true })
    await fixture("Writing/Covered/index.md", `---
title: Fixture covered essay
description: A covered fixture description.
date: 2024-06-15
cover: ${cover}
---
${body}`)
    // The twin differs only in cover metadata, so its rendered article body
    // provides a direct control for unwanted header/layout changes.
    await fixture("Writing/Twin/index.md", `---
title: Fixture covered essay
description: A covered fixture description.
date: 2024-06-15
---
${body}`)
    await fixture("Writing/Plain/index.md", `---
title: Fixture text-only essay
description: A text-only fixture description.
---
# Fixture text-only essay

![A body-only illustration](/Writing/Plain/Inline.svg)

Body imagery is not automatically a listing cover.
`)
    await fixture("Writing/Covered/chapter.md", `---
title: Fixture nested chapter
cover: ${cover}
---
Nested content stays out of the top-level listing.
`)
    for (const asset of [cover, bodyImage, "/Writing/Plain/Inline.svg", "/Writing/Plain/Unused.svg"]) {
      await fixture(asset.slice(1), svg)
    }

    try {
      await run(process.execPath, [path.join(repository, "node_modules/astro/bin/astro.mjs"), "build", "--config", "astro.fixture.config.mjs"], {
        cwd: root,
        env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1", TZ: "UTC" },
        timeout: 120_000,
        maxBuffer: 5 * 1024 * 1024,
      })
    } catch (error) {
      throw new Error(`Fixture build failed:\n${error.stdout ?? ""}\n${error.stderr ?? ""}`, { cause: error })
    }
    listing = await readFile(path.join(root, "dist/writing/index.html"), "utf8")
    cards = new Map(
      [...listing.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
        .map(([, attributes, contents]) => [attribute(attributes, "href"), contents])
        .filter(([href]) => /^\/writing\/.+\/$/.test(href ?? "")),
    )
  })

  after(async () => {
    if (root) await rm(root, { recursive: true, force: true })
  })

  it("renders the explicit cover, not the first body image, inside its existing card link", async () => {
    const card = cards.get("/writing/covered/")
    assert.ok(card, "the covered essay should have a listing card")
    const images = [...card.matchAll(/<img\b[^>]*>/g)].map(([image]) => image)
    assert.equal(images.length, 1, "an explicit writing cover should render once inside its card")
    assert.equal(attribute(images[0], "src"), cover, "preserve the configured asset path and case")
    assert.equal(attribute(images[0], "alt"), "", "the adjacent linked title already names the destination")
    assert.equal(attribute(images[0], "loading"), "lazy")
    assert.equal(attribute(images[0], "decoding"), "async")
    assert.ok(card.indexOf(images[0]) < card.indexOf("<h4"), "the cover belongs above the card title")
    assert.equal(await readFile(path.join(root, "dist", cover), "utf8"), svg, "the exact cover asset is published")
  })

  it("keeps cards without explicit covers text-only, regardless of body or adjacent images", () => {
    for (const href of ["/writing/plain/", "/writing/twin/"]) {
      const card = cards.get(href)
      assert.ok(card, `${href} should still have a card`)
      assert.doesNotMatch(card, /<img\b/i, "do not infer covers or insert placeholder images")
    }
  })

  it("preserves listing destinations, text, dates, and top-level membership", () => {
    assert.deepEqual([...cards.keys()].sort(), ["/writing/covered/", "/writing/plain/", "/writing/twin/"])
    const covered = cards.get("/writing/covered/")
    assert.match(covered, /<h4\b[^>]*>Fixture covered essay<\/h4>/)
    assert.match(covered, /A covered fixture description\./)
    assert.match(covered, /Jun 15, 2024/)
    const plain = cards.get("/writing/plain/")
    assert.match(plain, /Fixture text-only essay/)
    assert.match(plain, /A text-only fixture description\./)
    assert.match(plain, />Essay<\//)
    assert.doesNotMatch(listing, /Fixture nested chapter/)
  })

  it("does not replace, duplicate, or move the original article body image", async () => {
    const covered = await readFile(path.join(root, "dist/writing/covered/index.html"), "utf8")
    const twin = await readFile(path.join(root, "dist/writing/twin/index.html"), "utf8")
    assert.equal(article(covered), article(twin), "cover metadata must not change the rendered article body")
    const images = [...article(covered).matchAll(/<img\b[^>]*>/g)].map(([image]) => image)
    assert.equal(images.length, 1, "retain the original body image exactly once")
    assert.equal(attribute(images[0], "src"), bodyImage)
    assert.equal(attribute(images[0], "alt"), bodyAlt)
    assert.match(article(covered), /Original opening paragraph\./)
    assert.match(article(covered), /Original closing paragraph\./)
    assert.ok(article(covered).indexOf(images[0]) < article(covered).indexOf("Original opening paragraph."))
    assert.ok(!covered.includes(cover), "do not add a second article-page hero from cover metadata")
  })

  it("renders fixture wiki links and callouts through the Markdown plugin pipeline", async () => {
    const html = await readFile(path.join(root, "dist/writing/covered/index.html"), "utf8")
    const markup = article(html)
    assert.match(markup, /<a\b[^>]*href=["']\/writing\/plain\/["'][^>]*>the plain essay<\/a>/)
    const callout = markup.match(/<blockquote\b[^>]*class=["']callout note["'][^>]*>([\s\S]*?)<\/blockquote>/)?.[1]
    assert.ok(callout, "retain the styled callout container and normalized type")
    assert.match(callout, /<div\b[^>]*class=["']callout-title note["'][^>]*>[\s\S]*?<p>Fixture <em>note<\/em> title<\/p>\s*<\/div>/)
    assert.match(callout, /<div\b[^>]*class=["']callout-content["'][^>]*>\s*<p>Fixture callout text\./)
    assert.match(callout, /<a\b[^>]*href=["']\/writing\/plain\/["'][^>]*>the plain essay from a callout<\/a>/)
    assert.doesNotMatch(markup, /\[!NOTE\]|\[\[/, "consume callout and wiki-link syntax")
  })
})
