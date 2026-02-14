import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

const thoughts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/Thoughts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    linkedIdea: z.string().optional(),
  }),
})

const ideas = defineCollection({
  loader: glob({ pattern: "*/**/*.md", base: "./content/Ideas" }),
  schema: z.object({
    title: z.string(),
    status: z.enum(["active", "paused", "graduated"]).default("active"),
    description: z.string().default(""),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date().optional(),
    featured: z.boolean().default(false),
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
  }),
})

export const collections = { thoughts, ideas, writing, projects }
