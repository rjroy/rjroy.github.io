import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const thoughts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/Thoughts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
})

const writing = defineCollection({
  loader: glob({ pattern: "*/**/*.md", base: "./content/Writing" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    description: z.string().default(""),
    tags: z.array(z.string()).default([]),
    order: z.number().optional(),
    featured: z.boolean().default(false),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: "*/**/*.md", base: "./content/Projects" }),
  schema: z.object({
    title: z.string(),
    status: z.enum(["active", "maintained", "archived"]).default("active"),
    description: z.string().default(""),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    // Optional cover image for the homepage feature card. Site-absolute path to
    // a file under content/ — case must match the file on disk (e.g.
    // /Projects/Memory-Loop/screenshots/ground.webp), since astro.config's
    // copyContentImages preserves path case into the build (page routes are
    // lowercased, but these asset paths are not).
    cover: z.string().optional(),
  }),
})

export const collections = { thoughts, writing, projects }
