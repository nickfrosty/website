import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { CardGrid } from "@/components/cards/CardGrid";
import { PageViewTracker } from "@/components/content/PageViewTracker";
import { getAllArticles } from "@/lib/content";

import { computePagination } from "@@/utils/helpers";



// construct the seo meta data for the page
export const metadata: Metadata = {
  title: "Articles, Tutorials, and Guides",
  description:
    `Collection of "how-to" style tutorials and technical writings. ` +
    `Mostly centered around coding, devops, and content creators.`,
};

type PageProps = {
  params: Promise<{
    page?: string;
  }>;
};

export async function generateStaticParams() {
  const allPosts = await getAllArticles();

  let posts = allPosts
    .filter(post =>
      process?.env?.NODE_ENV == "development" ? true : post.frontmatter.draft !== true,
    )
    // sort newest to oldest
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date ?? "").getTime() - new Date(a.frontmatter.date ?? "").getTime(),
    );

  // construct the `pagination` data object
  const pagination = computePagination(
    posts.length, // record length
    1, // current page
    "/articles", // baseHref
    "/articles/browse/{{id}}", // template
    9, // perPage
  );

  return new Array(pagination.totalPages).fill(null).map((_, page) => ({
    page: [(page + 1).toString()],
  }));
}

export default async function Page({ params }: PageProps) {
  const { page } = await params;
  const pageNum = page?.[0] || "1";

  const allPosts = await getAllArticles();

  // get a listing of regular posts (hiding drafts)
  let posts = allPosts
    .filter(post =>
      process?.env?.NODE_ENV == "development" ? true : post.frontmatter.draft !== true,
    )
    // sort newest to oldest
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date ?? "").getTime() - new Date(a.frontmatter.date ?? "").getTime(),
    );

  // construct the `pagination` data object
  const pagination = computePagination(
    posts.length, // record length
    pageNum, // current page
    "/articles", // baseHref
    "/articles/browse/{{id}}", // template
    9, // perPage
  );

  // chunk out the posts for the current page
  posts = posts.slice(pagination.start, pagination.end);

  if (!posts.length) return notFound();

  // Transform posts for CardGrid (expects old format)
  const transformedPosts = posts.map(p => ({
    ...p.frontmatter,
    slug: p.slug,
    href: p.href,
  }));

  return (
    <PageViewTracker>
      <main className="space-y-12">
        <section className="pt-8">
          <h1 className="text-4xl font-bold">Browse articles</h1>
          {/* <p></p> */}
        </section>

        <CardGrid
          posts={transformedPosts}
          baseHref={pagination.baseHref as string}
          pagination={pagination}
        />
      </main>
    </PageViewTracker>
  );
}
