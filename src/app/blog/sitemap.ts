import type { MetadataRoute } from "next";

import { SITE } from "@/lib/config";
import { getAllBlogs } from "@/lib/content";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allBlogs = await getAllBlogs();

  return allBlogs
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
