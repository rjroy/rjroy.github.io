/**
 * Migration script for Astro content collections.
 *
 * Scans Ideas, Writing, and Projects content directories for frontmatter
 * issues that would break Zod schema validation. Fixes what it can,
 * reports what it can't.
 *
 * Run with: bun run scripts/migrate-frontmatter.ts
 * Dry run:  bun run scripts/migrate-frontmatter.ts --dry-run
 */

import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const CONTENT_ROOT = path.resolve(import.meta.dirname, "../content")
const COLLECTIONS = ["Ideas", "Writing", "Projects"] as const
const DRY_RUN = process.argv.includes("--dry-run")

type FixAction = {
  file: string
  action: string
  detail: string
}

const fixes: FixAction[] = []
const warnings: FixAction[] = []

function collectMarkdownFiles(dir: string): string[] {
  const results: string[] = []

  function walk(current: string) {
    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
      } else if (entry.name.endsWith(".md")) {
        results.push(fullPath)
      }
    }
  }

  walk(dir)
  return results.sort()
}

function deriveTitle(filePath: string, content: string): string {
  // Try first H1 heading
  const h1Match = content.match(/^#\s+(.+)$/m)
  if (h1Match) {
    return h1Match[1].trim()
  }

  // Fall back to folder or file name
  const basename = path.basename(filePath, ".md")
  if (basename === "index") {
    const parentDir = path.basename(path.dirname(filePath))
    return parentDir.replace(/-/g, " ")
  }
  return basename.replace(/-/g, " ")
}

function processFile(filePath: string): void {
  const relativePath = path.relative(CONTENT_ROOT, filePath)
  const raw = fs.readFileSync(filePath, "utf-8")

  // Check if file has frontmatter at all
  const hasFrontmatter = raw.startsWith("---")

  if (!hasFrontmatter) {
    const title = deriveTitle(filePath, raw)
    const newContent = `---\ntitle: "${title}"\n---\n\n${raw}`

    fixes.push({
      file: relativePath,
      action: "ADD FRONTMATTER",
      detail: `Added title: "${title}"`,
    })

    if (!DRY_RUN) {
      fs.writeFileSync(filePath, newContent, "utf-8")
    }
    return
  }

  // Parse existing frontmatter
  const parsed = matter(raw)

  let modified = false

  // Check for missing title
  if (!parsed.data.title) {
    const title = deriveTitle(filePath, parsed.content)
    parsed.data.title = title
    modified = true

    fixes.push({
      file: relativePath,
      action: "ADD TITLE",
      detail: `Derived title: "${title}"`,
    })
  }

  // Report non-standard fields (informational only, Zod strips them)
  if (parsed.data.created && !parsed.data.date) {
    warnings.push({
      file: relativePath,
      action: "NON-STANDARD FIELD",
      detail: `Has "created: ${parsed.data.created}" but no "date". Zod will ignore "created".`,
    })
  }

  if (parsed.data.draft !== undefined) {
    warnings.push({
      file: relativePath,
      action: "EXTRA FIELD",
      detail: `Has "draft: ${parsed.data.draft}". Zod will strip this (not in schema).`,
    })
  }

  if (parsed.data.download_date !== undefined) {
    warnings.push({
      file: relativePath,
      action: "EXTRA FIELD",
      detail: `Has "download_date: ${parsed.data.download_date}". Zod will strip this (not in schema).`,
    })
  }

  if (modified && !DRY_RUN) {
    const output = matter.stringify(parsed.content, parsed.data)
    fs.writeFileSync(filePath, output, "utf-8")
  }
}

// Main
console.log(
  DRY_RUN
    ? "=== DRY RUN (no files will be modified) ===\n"
    : "=== MIGRATING FRONTMATTER ===\n",
)

let totalFiles = 0

for (const collection of COLLECTIONS) {
  const collectionDir = path.join(CONTENT_ROOT, collection)

  if (!fs.existsSync(collectionDir)) {
    console.log(`[SKIP] ${collection}/ does not exist`)
    continue
  }

  // Get all .md files in subdirectories (skip root index.md)
  const allFiles = collectMarkdownFiles(collectionDir)
  const rootIndex = path.join(collectionDir, "index.md")
  const files = allFiles.filter((f) => f !== rootIndex)

  console.log(`[${collection}] Processing ${files.length} files...`)
  totalFiles += files.length

  for (const file of files) {
    processFile(file)
  }
}

console.log(`\nProcessed ${totalFiles} files total.\n`)

if (fixes.length > 0) {
  console.log(`--- ${DRY_RUN ? "WOULD FIX" : "FIXED"} (${fixes.length}) ---`)
  for (const fix of fixes) {
    console.log(`  ${fix.action}: ${fix.file}`)
    console.log(`    ${fix.detail}`)
  }
  console.log()
}

if (warnings.length > 0) {
  console.log(`--- WARNINGS (${warnings.length}) ---`)
  for (const warn of warnings) {
    console.log(`  ${warn.action}: ${warn.file}`)
    console.log(`    ${warn.detail}`)
  }
  console.log()
}

if (fixes.length === 0 && warnings.length === 0) {
  console.log("All files pass validation. No issues found.")
}
