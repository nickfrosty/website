import type { MetadataRoute } from "next";

import { SITE } from "@/lib/config";
import { getAllArticles } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allArticles = await getAllArticles();

  return allArticles
    .filter(item => !item.href.startsWith("http") && !item.frontmatter.draft)
    .map(item => {
      return {
        url: `https://${SITE.domain}${item.href}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      };
    });
}
