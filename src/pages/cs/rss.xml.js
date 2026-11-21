import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const blog = await getCollection("blog");

  return rss({
    title: "Sharkyho blog",
    description: "Věci o kterých jsem se rozhodl něco napsat.",
    site: context.site,
    trailingSlash: false,
    items: blog
      .filter((e) => e.data.lang === "cs")
      .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.published,
        description: post.data.description,
        link: `/cs/blog/${post.id.replace("cs/", "")}/`,
      })),
    customData: `<language>cs</language>`,
  });
}
