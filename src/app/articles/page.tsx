import type { Metadata } from "next";
import { computePagination } from "zumo";
import { allArticles } from "contentlayer/generated";
import { CardGrid } from "@/components/cards/CardGrid";
import { SmallCard } from "@/components/cards/SmallCard";

// construct the seo meta data for the page
export const metadata: Metadata = {
  alternates: {
    canonical: "/articles",
  },
  title: "Articles, Tutorials, and Guides",
  description:
    `Collection of "how-to" style tutorials and technical writings. ` +
    `Mostly centered around coding, devops, and content creators.`,
};

const metadataConfig = {
  baseHref: "/articles",
  paginationTemplate: "/articles/page/{{id}}",
};

function preparePage(currentPage?: number) {
  // get a listing of regular posts (hiding drafts)
  let posts = allArticles
    .filter((post) =>
      process?.env?.NODE_ENV == "development" ? true : post.draft !== true,
    )
    // sort newest to oldest
    .sort(
      (a, b) =>
        new Date(b?.date ?? "").getTime() - new Date(a?.date ?? "").getTime(),
    )
    // strip the `body` to send less data to the client
    .map((post) => {
      // @ts-ignore
      delete post.body.html;
      return post;
    });

  // get a listing of featured posts
  const featured = allArticles
    .filter((post) => post.featured === true && !post.draft)
    .slice(0, 2)
    // sort newest to oldest
    .sort(
      (a, b) =>
        new Date(b?.date ?? "").getTime() - new Date(a?.date ?? "").getTime(),
    )
    // strip the `body` to send less data to the client
    .map((post) => {
      // @ts-ignore
      delete post.body.html;
      return post;
    });

  // remove the selected `featured` from the `posts`
  if (Array.isArray(featured) && featured?.length > 0)
    posts = posts?.filter(
      (item) =>
        item.slug !==
        featured.filter((ft) => ft.slug === item?.slug)?.[0]?.slug,
    );

  // construct the `pagination` data object
  const pagination =
    computePagination(
      posts.length,
      currentPage ?? 1,
      metadataConfig.baseHref,
      metadataConfig?.paginationTemplate,
    ) || undefined;

  // chunk out the posts for the current page
  // @ts-ignore
  posts = posts.slice(pagination.start || 0, pagination.end);

  return {
    props: { posts, featured, pagination },
  };
}

type PageProps = {
  params: {
    page?: number;
  };
};

export default function Page({ params: { page = 1 } }: PageProps) {
  const {
    props: { posts, featured, pagination },
  } = preparePage(page);

  return (
    <main className="space-y-12">
      <header className="">
        <h1 className="text-5xl font-bold">Featured articles</h1>
        {/* <p></p> */}
      </header>

      {!!featured?.length &&
        pagination &&
        (pagination?.page as number) <= 1 && (
          <section className="double-wide-cards">
            {featured?.map((post) => (
              <SmallCard
                key={post.slug}
                post={post}
                baseHref={metadataConfig.baseHref}
              />
            ))}
          </section>
        )}

      <section className="pt-8">
        <h2 className="text-4xl font-bold">Latest articles</h2>
        {/* <p></p> */}
      </section>

      <CardGrid
        posts={posts}
        baseHref={metadataConfig.baseHref}
        pagination={pagination}
      />
    </main>
  );
}
