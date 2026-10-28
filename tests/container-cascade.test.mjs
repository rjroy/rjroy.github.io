import assert from "node:assert/strict"
import { spawn, spawnSync } from "node:child_process"
import { createServer } from "node:http"
import { mkdtemp, readFile, rm } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { after, before, describe, it } from "node:test"
import config from "../tailwind.config.mjs"

const repository = fileURLToPath(new URL("../", import.meta.url))
const chromium = [process.env.CHROMIUM_PATH, "chromium", "chromium-browser", "google-chrome"]
  .filter(Boolean)
  .find((binary) => spawnSync(binary, ["--version"], { stdio: "ignore" }).status === 0)

// Integration reference: Tailwind 3's flattened utility ordering. Component
// dimensions/padding come from current source; configured screens remain tunable.
// These fallback screens are the legacy framework defaults, not product tuning.
const screens = config.theme.screens ?? {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}
const widths = [
  ...new Set([
    390,
    1440,
    ...Object.values(screens).flatMap((value) => {
      const match = value.match(/^([\d.]+)(px|rem)$/)
      assert.ok(match, "the migration fixture supports simple px/rem screens")
      const breakpoint = Number(match[1]) * (match[2] === "rem" ? 16 : 1)
      return [breakpoint - 1, breakpoint, breakpoint + 1]
    }),
  ]),
].sort((a, b) => a - b)

describe(
  "Built container cascade (Chromium integration; run build first)",
  {
    skip: chromium
      ? false
      : "No installed Chromium; set CHROMIUM_PATH to run browser geometry checks",
  },
  () => {
    let server, browser, socket, temporary
    let sequence = 0
    const pending = new Map()
    const call = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const id = ++sequence
        const timeout = setTimeout(() => {
          pending.delete(id)
          reject(new Error(`CDP timeout: ${method}`))
        }, 15000)
        pending.set(id, {
          resolve: (value) => {
            clearTimeout(timeout)
            resolve(value)
          },
          reject: (error) => {
            clearTimeout(timeout)
            reject(error)
          },
        })
        socket.send(JSON.stringify({ id, method, params }))
      })
    const evaluate = async (expression) => {
      const result = await call("Runtime.evaluate", {
        expression,
        awaitPromise: true,
        returnByValue: true,
      })
      assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails))
      return result.result.value
    }

    before(async () => {
      const output = path.join(repository, "dist")
      const home = await readFile(path.join(output, "index.html"), "utf8")
      const links = [...home.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)].map(([tag]) => tag)
      assert.ok(links.length, "fresh build output must publish stylesheets")
      const components = await readFile(path.join(repository, "src/styles/components.css"), "utf8")
      const declarations = (selector) => {
        const match = components.match(new RegExp(`\\.${selector}\\s*\\{([^}]+)\\}`))
        assert.ok(match, `current component ${selector} exists`)
        return match[1]
      }
      const reference = `.reference-container{${declarations("container")}}
.reference-prose{${declarations("prose-col")}}
${Object.values(screens)
  .map((value) => `@media(min-width:${value}){.reference-container{max-width:${value}}}`)
  .join("\n")}`
      const fixture = `<!doctype html><html lang="en" style="font-size:17px"><head>${links.join("")}
<style>${reference}</style></head><body>
<div id="actual" class="container"><div>Controlled fixture</div></div>
<div id="reference" class="reference-container"><div>Controlled fixture</div></div>
<div id="actual-prose" class="container prose-col"><div>Controlled fixture</div></div>
<div id="reference-prose" class="reference-container reference-prose"><div>Controlled fixture</div></div>
<div id="component-utility" class="area-card px-4">Controlled fixture</div>
<div id="utility" class="px-4">Controlled fixture</div>
</body></html>`
      server = createServer(async (request, response) => {
        if (request.url === "/fixture") {
          response.setHeader("Content-Type", "text/html")
          response.end(fixture)
        } else {
          try {
            const pathname = new URL(request.url, "http://localhost").pathname
            const types = { ".css": "text/css", ".ttf": "font/ttf" }
            response.setHeader(
              "Content-Type",
              types[path.extname(pathname)] ?? "application/octet-stream",
            )
            response.end(await readFile(path.join(output, pathname)))
          } catch {
            response.writeHead(404).end()
          }
        }
      })
      await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve))
      temporary = await mkdtemp("/tmp/opencode/container-cascade-")
      browser = spawn(
        chromium,
        [
          "--headless",
          "--no-sandbox",
          "--disable-gpu",
          "--remote-debugging-port=0",
          `--user-data-dir=${temporary}`,
          "about:blank",
        ],
        { stdio: ["ignore", "ignore", "pipe"] },
      )
      const endpoint = await new Promise((resolve, reject) => {
        let log = ""
        const timeout = setTimeout(() => reject(new Error(`Chromium did not start: ${log}`)), 15000)
        browser.once("error", (error) => {
          clearTimeout(timeout)
          reject(error)
        })
        browser.stderr.on("data", (data) => {
          log += data
          const match = log.match(/DevTools listening on (ws:\/\/[^\s]+)/)
          if (match) {
            clearTimeout(timeout)
            resolve(new URL(match[1]))
          }
        })
      })
      const target = await (
        await fetch(`http://${endpoint.host}/json/new?about:blank`, { method: "PUT" })
      ).json()
      socket = new WebSocket(target.webSocketDebuggerUrl)
      await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }))
      socket.addEventListener("message", ({ data }) => {
        const message = JSON.parse(data)
        if (!message.id) return
        const request = pending.get(message.id)
        pending.delete(message.id)
        if (message.error) request.reject(message.error)
        else request.resolve(message.result)
      })
      await call("Page.enable")
      await call("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: "reduce" }],
      })
      const loaded = new Promise((resolve) => {
        const listener = ({ data }) => {
          if (JSON.parse(data).method === "Page.loadEventFired") {
            socket.removeEventListener("message", listener)
            resolve()
          }
        }
        socket.addEventListener("message", listener)
      })
      await call("Page.navigate", { url: `http://127.0.0.1:${server.address().port}/fixture` })
      await loaded
      await evaluate("document.fonts.ready")
    })

    after(async () => {
      socket?.close()
      if (browser && browser.exitCode === null) {
        const exited = new Promise((resolve) => browser.once("exit", resolve))
        browser.kill("SIGTERM")
        await exited
      }
      if (server) await new Promise((resolve) => server.close(resolve))
      if (temporary) await rm(temporary, { recursive: true, force: true })
    })

    for (const theme of ["light", "dark"]) {
      it(`matches legacy container geometry at every breakpoint boundary (${theme})`, async () => {
        const failures = []
        for (const width of widths) {
          await call("Emulation.setDeviceMetricsOverride", {
            width,
            height: 800,
            deviceScaleFactor: 1,
            mobile: false,
          })
          const result = await evaluate(
            `(async()=>{document.documentElement.dataset.theme=${JSON.stringify(theme)};await new Promise(r=>setTimeout(r,100));const box=id=>{const e=document.getElementById(id),b=e.getBoundingClientRect(),s=getComputedStyle(e);return {width:b.width,left:b.left,paddingLeft:s.paddingLeft,paddingRight:s.paddingRight,contentWidth:e.firstElementChild?.getBoundingClientRect().width}};return {actual:box('actual'),reference:box('reference'),prose:box('actual-prose'),referenceProse:box('reference-prose'),utility:box('utility'),componentUtility:box('component-utility')}})()`,
          )
          for (const [actual, expected] of [
            [result.actual, result.reference],
            [result.prose, result.referenceProse],
          ]) {
            if (JSON.stringify(actual) !== JSON.stringify(expected))
              failures.push({ viewport: width, actual, expected })
          }
          if (result.componentUtility.paddingLeft !== result.utility.paddingLeft) {
            failures.push({
              viewport: width,
              componentPadding: result.componentUtility.paddingLeft,
              utilityPadding: result.utility.paddingLeft,
            })
          }
        }
        assert.deepEqual(
          failures,
          [],
          "compiled layers must preserve legacy utility precedence and screen units",
        )
      })
    }
  },
)
