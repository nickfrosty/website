import prisma from "./client";
import type { PageViewCounter, Prisma } from "@prisma/client";

export async function getPageViewCount(route: PageViewCounter["route"]) {
  try {
    return (
      (
        await prisma.pageViewCounter.findUnique({
          where: {
            route,
          },
        })
      )?.count || 2
    );
  } catch (err) {
    return 2;
  }
}

/**
 * Record a single page view entry into the database
 */
export async function incrementPageViewCount(route: PageViewCounter["route"]) {
  if (process.env.NODE_ENV !== "production") return null;

  try {
    return prisma.pageViewCounter.upsert({
      where: {
        route,
      },
      create: {
        route,
      },
      update: {
        count: {
          increment: 1,
        },
      },
    });
  } catch (err) {
    return null;
  }
}

/**
 * Record a single page view entry into the database
 */
export async function recordPageView(payload: Prisma.PageViewCreateInput) {
  try {
    return prisma.pageView.create({
      data: payload,
    });
  } catch (err) {
    return null;
  }
}
