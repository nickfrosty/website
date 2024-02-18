import type { MetadataRoute } from "next";
import SITE from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // list of all page routes created on the site
  const pageRoutes: string[] = [
    // comment for better diffs
    "/",
    "/now",
    "/blog",
    "/articles",
    "/projects",
  ];

  // list of other sitemaps on the site
  const childSitemaps: string[] = [
    // comment for better diffs
    "/blog/sitemap.xml",
    "/articles/sitemap.xml",
    "/projects/sitemap.xml",
  ];

  return pageRoutes.concat(childSitemaps).map((route) => {
    return {
      url: `https://${SITE.domain}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });
}
