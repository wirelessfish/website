import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const blog = await getCollection("blog");

  return rss({
    title: "Sharky's writings",
    description: "Whatever I'm interested in talking about.",
    site: context.site,
    trailingSlash: false,
    items: blog
      .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.published,
        description: post.data.description,
        link: `/blog/${post.id}/`,
      })),
    customData: `<language>en</language>`,
  });
}
