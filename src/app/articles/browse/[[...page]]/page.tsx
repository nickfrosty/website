import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { CardGrid } from "@/components/cards/card-grid";
import { PageViewTracker } from "@/components/content/page-view-tracker";
import { getAllArticles, filterDrafts, getPaginatedContent, toCardFormat } from "@/lib/content";

import { computePagination } from "@@/utils/helpers";

export const metadata: Metadata = {
  title: "Articles, Tutorials, and Guides",
  description:
    `Collection of "how-to" style tutorials and technical writings. ` +
    `Mostly centered around coding, devops, and content creators.`,
};

const paginationConfig = {
  baseHref: "/articles",
  template: "/articles/browse/{{id}}",
  perPage: 9,
};

type PageProps = {
  params: Promise<{
    page?: string;
  }>;
};

export async function generateStaticParams() {
  const allPosts = await getAllArticles();
  const posts = filterDrafts(allPosts);

  const pagination = computePagination(
    posts.length,
    1,
    paginationConfig.baseHref,
    paginationConfig.template,
    paginationConfig.perPage,
  );

  return new Array(pagination.totalPages).fill(null).map((_, page) => ({
    page: [(page + 1).toString()],
  }));
}

export default async function Page({ params }: PageProps) {
  const { page } = await params;
  const pageNum = page?.[0] || "1";

  const allPosts = await getAllArticles();
  const { posts, pagination } = getPaginatedContent(allPosts, pageNum, paginationConfig, {
    includeFeatured: false,
  });

  if (!posts.length) return notFound();

  const transformedPosts = toCardFormat(posts);

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
