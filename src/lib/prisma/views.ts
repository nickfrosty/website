import { PostViews } from "@prisma/client";
import prisma from "./client";

export async function getPostViewCount(slug: PostViews["slug"]) {
  try {
    const date = new Date();
    return (
      (
        await prisma.postViews.findUnique({
          where: {
            post_view_index: {
              year: date.getFullYear(),
              month: date.getMonth(),
              slug,
            },
          },
        })
      )?.count || 2
    );
  } catch (err) {
    return 2;
  }
}

export async function incrementPostViewCount(slug: PostViews["slug"]) {
  try {
    const date = new Date();
    await prisma.postViews.upsert({
      where: {
        post_view_index: {
          year: date.getFullYear(),
          month: date.getMonth(),
          slug,
        },
      },
      create: {
        year: date.getFullYear(),
        month: date.getMonth(),
        slug,
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
