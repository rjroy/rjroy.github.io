import assert from "node:assert/strict"
import { execFile } from "node:child_process"
import { cp, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { promisify } from "node:util"
import { after, before, describe, it } from "node:test"

const run = promisify(execFile)
const repository = fileURLToPath(new URL("../", import.meta.url))
const logo = "/assets/personal-grayscale.webp"
const cover = "/assets/fixture-cover.svg"
const attribute = (markup, name) => markup.match(new RegExp(`\\b${name}=["']([^"']*)["']`))?.[1]

describe("Approved site logo (isolated Astro build)", () => {
  let root
  const html = (route) => readFile(path.join(root, "dist", route, "index.html"), "utf8")

  before(async () => {
    root = await mkdtemp("/tmp/opencode/site-logo-")
    for (const file of ["src", "public", "astro.config.mjs", "tailwind.config.mjs", "tsconfig.json", "package.json"]) {
      await cp(path.join(repository, file), path.join(root, file), { recursive: true })
    }
    await symlink(path.join(repository, "node_modules"), path.join(root, "node_modules"), "dir")
    for (const collection of ["Writing", "Thoughts", "Projects"]) {
      await mkdir(path.join(root, "content", collection), { recursive: true })
    }
    for (const [name, metadata] of [["Covered", `cover: ${cover}\n`], ["Plain", ""]]) {
      const directory = path.join(root, "content/Projects", name)
      await mkdir(directory, { recursive: true })
      await writeFile(path.join(directory, "index.md"), `---\ntitle: Fixture ${name}\nstatus: active\n${metadata}---\nFixture project body.\n`)
    }
    await writeFile(path.join(root, "public", cover), '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="9"></svg>')
    try {
      await run(process.execPath, [path.join(repository, "node_modules/astro/astro.js"), "build"], {
        cwd: root,
        env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1", TZ: "UTC" },
        timeout: 120_000,
        maxBuffer: 5 * 1024 * 1024,
      })
    } catch (error) {
      throw new Error(`Fixture build failed:\n${error.stdout ?? ""}\n${error.stderr ?? ""}`, { cause: error })
    }
  })

  after(async () => {
    if (root) await rm(root, { recursive: true, force: true })
  })

  it("publishes the exact approved grayscale image", async () => {
    assert.deepEqual(
      await readFile(path.join(root, "dist", logo)),
      await readFile(path.join(repository, "personal-grayscale.webp")),
    )
  })

  it("uses one decorative, layout-stable logo in the existing home link across page types", async () => {
    for (const route of ["", "projects", "writing", "thoughts", "projects/plain"]) {
      const page = await html(route)
      const brand = page.match(/<a\b[^>]*class="brand"[^>]*>([\s\S]*?)<\/a>/)?.[0]
      assert.ok(brand, `${route || "/"} renders the brand home link`)
      assert.equal(attribute(brand, "href"), "/")
      assert.match(brand, /Broadcast Cache/)
      const images = [...brand.matchAll(/<img\b[^>]*>/g)].map(([image]) => image)
      assert.equal(images.length, 1, "one approved crest serves both themes")
      assert.equal(attribute(images[0], "src"), logo)
      assert.equal(attribute(images[0], "alt"), "", "adjacent text already names the home link")
      assert.equal(attribute(images[0], "width"), "34")
      assert.equal(attribute(images[0], "height"), "34")
      assert.doesNotMatch(page, /logo-shield-(?:dark|light)\.png/)
    }
  })

  it("updates only the project fallback, preserving explicit project artwork", async () => {
    const listing = await html("projects")
    const card = (slug) => listing.match(new RegExp(`<a\\b[^>]*href="/projects/${slug}/"[^>]*>([\\s\\S]*?)<\\/a>`))?.[1]
    const fallback = card("plain")
    const covered = card("covered")
    assert.ok(fallback)
    assert.ok(covered)
    const image = fallback.match(/<img\b[^>]*>/)?.[0]
    assert.equal(attribute(image, "src"), logo)
    assert.equal(attribute(image, "alt"), "")
    assert.equal(attribute(covered.match(/<img\b[^>]*>/)?.[0], "src"), cover)
  })

  it("keeps the existing browser icon routes and publishes their current assets", async () => {
    const page = await html("")
    for (const [rel, asset] of [["icon", "/favicon.webp"], ["apple-touch-icon", "/apple-touch-icon.png"]]) {
      const link = [...page.matchAll(/<link\b[^>]*>/g)].map(([tag]) => tag).find((tag) => attribute(tag, "rel") === rel)
      assert.ok(link, `${rel} remains linked`)
      assert.equal(attribute(link, "href"), asset)
      assert.deepEqual(await readFile(path.join(root, "dist", asset)), await readFile(path.join(repository, "public", asset)))
    }
  })
})
