import { Feed } from "feed";

import { getAllArticles } from "@/lib/content";

export const dynamic = "force-static";

const SITE_URL = "https://nick.af";
const RSS_CACHE_SECONDS = 3600;

export async function GET() {
  const posts = await getAllArticles();

  const feed = new Feed({
    title: "Nick Frostbutter - Articles",
    description: "Technical articles and tutorials",
    id: `${SITE_URL}/articles`,
    link: `${SITE_URL}/articles`,
    language: "en",
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Nick Frostbutter`,
    feedLinks: {
      rss2: `${SITE_URL}/rss/articles.xml`,
    },
    author: {
      name: "Nick Frostbutter",
      email: "hello@frostbutter.com",
      link: SITE_URL,
    },
  });

  const sortedPosts = posts
    .filter(post => !post.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date ?? "").getTime() - new Date(a.frontmatter.date ?? "").getTime(),
    );

  for (const post of sortedPosts) {
    const postUrl = `${SITE_URL}${post.href}`;
    feed.addItem({
      title: post.frontmatter.title,
      id: postUrl,
      link: postUrl,
      description: post.frontmatter.description || "",
      date: new Date(post.frontmatter.date || ""),
      author: [{ name: "Nick Frostbutter" }],
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml",
      "Cache-Control": `public, max-age=${RSS_CACHE_SECONDS}, s-maxage=${RSS_CACHE_SECONDS}`,
    },
  });
}
