import type { Metadata } from "next";

import { CardGrid } from "@/components/cards/card-grid";
import { SmallCard } from "@/components/cards/small-card";
import { PageViewTracker } from "@/components/content/page-view-tracker";
import { getAllArticles, getPaginatedContent, toCardFormat } from "@/lib/content";

export const metadata: Metadata = {
  alternates: {
    canonical: "/articles",
  },
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
  params: {
    page?: string;
  };
};

export default async function Page({ params: { page } }: PageProps) {
  const allArticles = await getAllArticles();
  const { posts, featured, pagination } = getPaginatedContent(
    allArticles,
    page ?? "1",
    paginationConfig,
  );

  const transformedPosts = toCardFormat(posts);
  const transformedFeatured = toCardFormat(featured);

  return (
    <PageViewTracker>
      <main className="space-y-12">
        <header className="">
          <h1>Featured articles</h1>
          {/* <p></p> */}
        </header>

        {!!transformedFeatured?.length && pagination && (pagination?.page as number) <= 1 && (
          <section className="double-wide-cards">
            {transformedFeatured?.map(post => (
              <SmallCard key={post.slug} post={post} baseHref={paginationConfig.baseHref} />
            ))}
          </section>
        )}

        <section className="pt-8">
          <h2 className="text-4xl font-bold">Latest articles</h2>
          {/* <p></p> */}
        </section>

        <CardGrid
          posts={transformedPosts}
          baseHref={paginationConfig.baseHref}
          pagination={pagination}
        />
      </main>
    </PageViewTracker>
  );
}
