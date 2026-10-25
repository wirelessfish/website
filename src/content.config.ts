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
  }),
});

const blog_descriptions = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/blog_descriptions" }),
});

export const collections = { blog, blog_descriptions };
