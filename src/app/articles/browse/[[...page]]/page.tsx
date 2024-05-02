import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allArticles } from "contentlayer/generated";
import { CardGrid } from "@/components/cards/CardGrid";
import { computePagination } from "@@/utils/helpers";
import { PageViewTracker } from "@/components/content/PageViewTracker";

// construct the seo meta data for the page
export const metadata: Metadata = {
  title: "Articles, Tutorials, and Guides",
  description:
    `Collection of "how-to" style tutorials and technical writings. ` +
    `Mostly centered around coding, devops, and content creators.`,
};

type PageProps = {
  params: {
    page?: string;
  };
};

export function generateStaticParams() {
  let posts = allArticles
    .filter((post) =>
      process?.env?.NODE_ENV == "development" ? true : post.draft !== true,
    )
    // sort newest to oldest
    .sort(
      (a, b) =>
        new Date(b?.date ?? "").getTime() - new Date(a?.date ?? "").getTime(),
    );

  // construct the `pagination` data object
  const pagination = computePagination(
    posts.length, // record length
    1, // current page
    "/articles", // baseHref
    "/articles/browse/{{id}}", // template
    9, // perPage
  );

  return new Array(pagination.totalPages).map((item, page) => ({
    page,
  }));
}

export default function Page({ params: { page } }: PageProps) {
  // get a listing of regular posts (hiding drafts)
  let posts = allArticles
    .filter((post) =>
      process?.env?.NODE_ENV == "development" ? true : post.draft !== true,
    )
    // sort newest to oldest
    .sort(
      (a, b) =>
        new Date(b?.date ?? "").getTime() - new Date(a?.date ?? "").getTime(),
    );

  // construct the `pagination` data object
  const pagination = computePagination(
    posts.length, // record length
    page?.toString(), // current page
    "/articles", // baseHref
    "/articles/browse/{{id}}", // template
    9, // perPage
  );

  // chunk out the posts for the current page
  posts = posts.slice(pagination.start, pagination.end);

  if (!posts.length) return notFound();

  return (
    <PageViewTracker>
      <main className="space-y-12">
        <section className="pt-8">
          <h1 className="text-4xl font-bold">Browse articles</h1>
          {/* <p></p> */}
        </section>

        <CardGrid
          posts={posts}
          baseHref={pagination.baseHref as string}
          pagination={pagination}
        />
      </main>
    </PageViewTracker>
  );
}
