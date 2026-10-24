import assert from "node:assert/strict"
import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import test from "node:test"

const outputDirectory = fileURLToPath(new URL("../dist/", import.meta.url))

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name)
      if (entry.isDirectory()) return findHtmlFiles(entryPath)
      return entry.isFile() && entry.name.endsWith(".html") ? [entryPath] : []
    }),
  )
  return nested.flat()
}

test("built site does not render or load the comments system", async () => {
  const htmlFiles = await findHtmlFiles(outputDirectory)
  assert.ok(htmlFiles.length > 0, "build output should contain rendered HTML pages")

  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8")
    assert.doesNotMatch(html, /https:\/\/giscus\.app\/client\.js/i, `${file} loads Giscus`)
    assert.doesNotMatch(html, /data-repo="rjroy\/rjroy\.github\.io"/i, `${file} configures Giscus`)
    assert.doesNotMatch(html, />Comments<\/h2>/i, `${file} renders a Comments heading`)
  }
})
