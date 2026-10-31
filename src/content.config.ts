import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob, file } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/pages/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    og_img: z.string().optional(),
    og_img_alt: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/pages/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    publishedLabelOverride: z.string().optional(),
    updated: z.coerce.date().optional(),
    og_img: z.string().optional(),
    og_img_alt: z.string().optional(),
  }),
});

const vinyls = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/pages/vinyl" }),
  schema: z.object({
    title: z.string(),
    dateAdded: z.coerce.date(),

    edition: z.string().optional(),
    editionYear: z.number().optional(),
    albumYear: z.number(),
    pressedYear: z.number().optional(),

    artist: z.string(),
    discogsId: z.number(),

    albumArt: z.string(),
    albumArtAlt: z.string().optional(),
  }),
});

export const collections = { blog, projects, vinyls };
