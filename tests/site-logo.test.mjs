import assert from "node:assert/strict"
import { execFile } from "node:child_process"
import { cp, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { promisify } from "node:util"
import { after, before, describe, it } from "node:test"
import { IDENTITY_MARK, SITE_NAME } from "../src/site.ts"

const run = promisify(execFile)
const repository = fileURLToPath(new URL("../", import.meta.url))
const logo = IDENTITY_MARK
const cover = "/assets/fixture-cover.svg"
const attribute = (markup, name) => markup.match(new RegExp(`\\b${name}=["']([^"']*)["']`))?.[1]

describe("Approved site logo (isolated Astro build)", () => {
  let root
  const html = (route) => readFile(path.join(root, "dist", route, "index.html"), "utf8")

  before(async () => {
    root = await mkdtemp("/tmp/opencode/site-logo-")
    for (const file of [
      "src",
      "public",
      "astro.config.mjs",
      "tailwind.config.mjs",
      "tsconfig.json",
      "package.json",
    ]) {
      await cp(path.join(repository, file), path.join(root, file), { recursive: true })
    }
    await symlink(path.join(repository, "node_modules"), path.join(root, "node_modules"), "dir")
    await writeFile(
      path.join(root, "astro.fixture.config.mjs"),
      `
import config from "./astro.config.mjs"
export default { ...config, cacheDir: "./.astro-cache" }
`,
    )
    for (const collection of ["Writing", "Thoughts", "Projects"]) {
      await mkdir(path.join(root, "content", collection), { recursive: true })
    }
    for (const [name, metadata] of [
      ["Covered", `cover: ${cover}\n`],
      ["Plain", ""],
    ]) {
      const directory = path.join(root, "content/Projects", name)
      await mkdir(directory, { recursive: true })
      await writeFile(
        path.join(directory, "index.md"),
        `---\ntitle: Fixture ${name}\nstatus: active\n${metadata}---\nFixture project body.\n`,
      )
    }
    await writeFile(
      path.join(root, "public", cover),
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9"></svg>',
    )
    try {
      await run(
        process.execPath,
        [
          path.join(repository, "node_modules/astro/bin/astro.mjs"),
          "build",
          "--config",
          "astro.fixture.config.mjs",
        ],
        {
          cwd: root,
          env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1", TZ: "UTC" },
          timeout: 120_000,
          maxBuffer: 5 * 1024 * 1024,
        },
      )
    } catch (error) {
      throw new Error(`Fixture build failed:\n${error.stdout ?? ""}\n${error.stderr ?? ""}`, {
        cause: error,
      })
    }
  })

  after(async () => {
    if (root) await rm(root, { recursive: true, force: true })
  })

  it("publishes the approved SVG byte-for-byte from the portable master", async () => {
    assert.deepEqual(
      await readFile(path.join(root, "dist", logo)),
      await readFile(path.join(repository, "brand/assets/approved-a5.svg")),
    )
  })

  it("uses one decorative, layout-stable logo in the existing home link across page types", async () => {
    for (const route of ["", "projects", "writing", "thoughts", "projects/plain"]) {
      const page = await html(route)
      const brand = page.match(/<a\b[^>]*class="brand"[^>]*>([\s\S]*?)<\/a>/)?.[0]
      assert.ok(brand, `${route || "/"} renders the brand home link`)
      assert.equal(attribute(brand, "href"), "/")
      assert.ok(brand.includes(SITE_NAME), "the shared home link uses the configured site name")
      const images = [...brand.matchAll(/<img\b[^>]*>/g)].map(([image]) => image)
      assert.equal(images.length, 1, "one unchanged approved mark serves both themes")
      assert.equal(attribute(images[0], "src"), logo)
      assert.equal(attribute(images[0], "alt"), "", "adjacent text already names the home link")
      assert.equal(attribute(images[0], "width"), "34")
      assert.equal(attribute(images[0], "height"), "34")
      assert.doesNotMatch(page, /logo-shield-(?:dark|light)\.png/)
    }
  })

  it("updates only the project fallback, preserving explicit project artwork", async () => {
    const listing = await html("projects")
    const card = (slug) =>
      listing.match(new RegExp(`<a\\b[^>]*href="/projects/${slug}/"[^>]*>([\\s\\S]*?)<\\/a>`))?.[1]
    const fallback = card("plain")
    const covered = card("covered")
    assert.ok(fallback)
    assert.ok(covered)
    const image = fallback.match(/<img\b[^>]*>/)?.[0]
    assert.equal(attribute(image, "src"), logo)
    assert.equal(attribute(image, "alt"), "")
    assert.equal(attribute(covered.match(/<img\b[^>]*>/)?.[0], "src"), cover)
  })

  it("uses the unchanged SVG as the browser icon without advertising the obsolete Apple artwork", async () => {
    const page = await html("")
    const links = [...page.matchAll(/<link\b[^>]*>/g)].map(([tag]) => tag)
    const icon = links.find((tag) => attribute(tag, "rel") === "icon")
    assert.ok(icon)
    assert.equal(attribute(icon, "href"), logo)
    assert.equal(attribute(icon, "type"), "image/svg+xml")
    assert.ok(!links.some((tag) => attribute(tag, "href") === "/apple-touch-icon.png"))
  })

  it("carries the shared name into page metadata and RSS while preserving routes", async () => {
    for (const route of ["", "projects", "writing", "thoughts", "projects/plain"]) {
      const page = await html(route)
      const title = page.match(/<title>(.*?)<\/title>/)?.[1]
      assert.ok(title?.endsWith(` | ${SITE_NAME}`))
      const meta = [...page.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => tag)
      const siteName = meta.find((tag) => attribute(tag, "property") === "og:site_name")
      assert.equal(attribute(siteName, "content"), SITE_NAME)
      const feed = [...page.matchAll(/<link\b[^>]*>/g)]
        .map(([tag]) => tag)
        .find((tag) => attribute(tag, "type") === "application/rss+xml")
      assert.equal(attribute(feed, "title"), SITE_NAME)
      assert.equal(attribute(feed, "href"), "/rss.xml")
      const preview = meta.find((tag) => attribute(tag, "property") === "og:image")
      const previewPath = new URL(attribute(preview, "content")).pathname
      assert.ok(
        (await readFile(path.join(root, "dist", previewPath))).length > 0,
        "social artwork resolves to a published file",
      )
    }
    const feed = await readFile(path.join(root, "dist/rss.xml"), "utf8")
    assert.ok(feed.includes(`<title>${SITE_NAME}</title>`))
  })

  it("publishes a brand-artwork licensing exception without changing the content license", async () => {
    const page = await html("")
    const footer = page.match(/<footer\b[^>]*>([\s\S]*?)<\/footer>/)?.[1]
    assert.match(footer, /Content: CC BY 4\.0/)
    const notice = footer.match(/<a\b[^>]*href="([^"]+)"[^>]*>Brand artwork excluded<\/a>/)?.[1]
    assert.ok(notice)
    const license = await readFile(path.join(root, "dist", notice), "utf8")
    assert.match(license, /excluded from this site's Creative Commons/)
    assert.match(license, /does not grant permission to reuse/)
  })
})
