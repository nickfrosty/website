import type { MetadataRoute } from "next";

import { SITE } from "@/lib/config";
import { getAllProjects } from "@/lib/content";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allProjects = await getAllProjects();

  return allProjects
    .filter((item) => !item.href.startsWith("http") && !item.frontmatter.draft)
    .map((item) => {
      return {
        url: `https://${SITE.domain}${item.href}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      };
    });
}
