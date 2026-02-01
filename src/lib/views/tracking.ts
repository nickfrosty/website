import { eq, sql } from "drizzle-orm";

import { db, pageViewCounters, pageViews, type NewPageView } from "@/db";
import SITE from "@/lib/config";

export async function getPageViewCount(route: string) {
  try {
    const result = await db.query.pageViewCounters.findFirst({
      where: eq(pageViewCounters.route, route),
    });
    return result?.count || 2;
  } catch (err) {
    return 2;
  }
}

/**
 * Record a single page view entry into the database
 */
export async function incrementPageViewCount(route: string) {
  if (process.env.NODE_ENV !== "production") return null;

  try {
    const [result] = await db
      .insert(pageViewCounters)
      .values({
        route,
        count: 1,
      })
      .onConflictDoUpdate({
        target: pageViewCounters.route,
        set: {
          count: sql`${pageViewCounters.count} + 1`,
        },
      })
      .returning();
    return result;
  } catch (err) {
    return null;
  }
}

/**
 * Record a single page view entry into the database
 */
export async function recordPageView(payload: NewPageView) {
  if (payload.referer) {
    payload.referer = payload.referer.replace(new RegExp(`^${SITE.url}\/`, "i"), "/");
  }

  if (process.env.NODE_ENV !== "production") {
    // console.warn("[recordPageView]", payload);
    return null;
  }

  try {
    const [result] = await db.insert(pageViews).values(payload).returning();
    return result;
  } catch (err) {
    return null;
  }
}
