import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";
import { satteri } from "@astrojs/markdown-satteri";

export default defineConfig({
  integrations: [svelte(), mdx()],
  markdown: {
    processor: satteri({ features: { directive: true } }),
  },
  redirects: {
    // to keep all the two old links alive lol
    "/post/moving-to-astro": "/blog/moving-to-astro",
  },
});
