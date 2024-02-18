import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { allArticles } from "contentlayer/generated";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return allArticles
    .filter((item) => !item.href.startsWith("http") && !item.draft)
    .map((item) => {
      return {
        url: `https://${SITE.domain}${item.href}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      };
    });
}
