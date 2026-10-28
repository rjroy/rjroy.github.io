import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { cp, mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises"
import net from "node:net"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { after, before, describe, it } from "node:test"

const repository = fileURLToPath(new URL("../", import.meta.url))
const webp = Buffer.from("fixture webp bytes")
const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00])

async function availablePort() {
  const server = net.createServer()
  await new Promise((resolve, reject) => {
    server.once("error", reject)
    server.listen(0, "127.0.0.1", resolve)
  })
  const { port } = server.address()
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
  return port
}

async function waitForServer(child, url) {
  const deadline = Date.now() + 30_000
  let lastError

  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`Astro dev exited early with code ${child.exitCode}`)
    try {
      await fetch(url, { signal: AbortSignal.timeout(1_000) })
      return
    } catch (error) {
      lastError = error
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  }

  throw new Error(`Astro dev did not start: ${lastError}`)
}

describe("content images in Astro dev (isolated fixture)", () => {
  let root
  let child
  let origin

  before(async () => {
    root = await mkdtemp("/tmp/opencode/content-images-dev-")
    for (const file of ["src", "astro.config.mjs", "tailwind.config.mjs", "tsconfig.json", "package.json"]) {
      await cp(path.join(repository, file), path.join(root, file), { recursive: true })
    }
    await symlink(path.join(repository, "node_modules"), path.join(root, "node_modules"), "dir")
    // Share installed packages, but keep Astro's generated content cache isolated
    // from concurrent fixture suites that also link node_modules.
    await writeFile(path.join(root, "astro.fixture.config.mjs"), `
import config from "./astro.config.mjs"
export default { ...config, cacheDir: "./.astro-cache" }
`)

    async function fixture(relativePath, contents) {
      const target = path.join(root, "content", relativePath)
      await mkdir(path.dirname(target), { recursive: true })
      await writeFile(target, contents)
    }

    await fixture("Writing/Execellence-Through-Questions/excellence-through-questions.webp", webp)
    await fixture("Projects/Ink-Mirror/screenshots/Write.PNG", png)
    await fixture("Writing/Private.txt", "must not be served")
    await fixture("Writing/Private.md", "# private markdown")
    await fixture("Private/hidden.png", png)
    await writeFile(path.join(root, "secret.png"), "outside the content root")
    await symlink(path.join(root, "content/Private/hidden.png"), path.join(root, "content/Writing/CrossFolder.png"))
    await symlink(path.join(root, "content/Writing/Private.md"), path.join(root, "content/Writing/Markdown.png"))
    await symlink(path.join(root, "secret.png"), path.join(root, "content/Writing/Outside.png"))

    const port = await availablePort()
    origin = `http://127.0.0.1:${port}`
    child = spawn(process.execPath, [
      path.join(repository, "node_modules/astro/bin/astro.mjs"),
      "dev",
      "--config", "astro.fixture.config.mjs",
      "--host", "127.0.0.1",
      "--port", String(port),
      "--strictPort",
    ], {
      cwd: root,
      env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1", TZ: "UTC" },
      stdio: "ignore",
    })
    await waitForServer(child, origin)
  })

  after(async () => {
    if (child && child.exitCode === null) {
      const exited = new Promise((resolve) => child.once("exit", resolve))
      child.kill("SIGTERM")
      await Promise.race([exited, new Promise((resolve) => setTimeout(resolve, 5_000))])
      if (child.exitCode === null) child.kill("SIGKILL")
    }
    if (root) await rm(root, { recursive: true, force: true })
  })

  it("serves supported images with exact path casing, MIME type, and bytes", async () => {
    for (const [url, type, contents] of [
      ["/Writing/Execellence-Through-Questions/excellence-through-questions.webp", "image/webp", webp],
      ["/Projects/Ink-Mirror/screenshots/Write.PNG", "image/png", png],
    ]) {
      const response = await fetch(new URL(url, origin))
      assert.equal(response.status, 200, `${url} should be available during development`)
      assert.match(response.headers.get("content-type") ?? "", new RegExp(`^${type}\\b`))
      assert.deepEqual(Buffer.from(await response.arrayBuffer()), contents)
    }
  })

  it("does not serve case-mismatched or missing assets", async () => {
    for (const url of [
      "/writing/Execellence-Through-Questions/excellence-through-questions.webp",
      "/Writing/Execellence-Through-Questions/missing.webp",
    ]) {
      assert.equal((await fetch(new URL(url, origin))).status, 404, `${url} should be a 404`)
    }
  })

  it("does not expose non-image content files or paths outside content", async () => {
    for (const url of ["/Writing/Private.txt", "/%2e%2e%2fsecret.png"]) {
      assert.equal((await fetch(new URL(url, origin))).status, 404, `${url} should not be exposed`)
    }
  })

  it("does not follow image symlinks to unsupported content or non-image targets", async () => {
    const urls = [
      "/Writing/CrossFolder.png",
      "/Writing/Markdown.png",
      "/Writing/Outside.png",
    ]
    const statuses = await Promise.all(urls.map(async (url) => (await fetch(new URL(url, origin))).status))
    assert.deepEqual(statuses, [404, 404, 404], "symlinks must not expose unsupported or outside files")
  })
})
