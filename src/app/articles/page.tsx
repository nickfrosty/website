import type { Metadata } from "next";

import { CardGrid } from "@/components/cards/CardGrid";
import { SmallCard } from "@/components/cards/SmallCard";
import { PageViewTracker } from "@/components/content/PageViewTracker";
import { getAllArticles } from "@/lib/content";

import { computePagination } from "@@/utils/helpers";


// construct the seo meta data for the page
export const metadata: Metadata = {
  alternates: {
    canonical: "/articles",
  },
  title: "Articles, Tutorials, and Guides",
  description:
    `Collection of "how-to" style tutorials and technical writings. ` +
    `Mostly centered around coding, devops, and content creators.`,
  twitter: {
    card: "app",
    site: "@nickfrosty",
    app: {
      id: {
        googleplay: "solana:https://nick.af/api/actions/newsletter",
      },
      name: "Solana",
      url: {
        googleplay: "solana:https://nick.af/api/actions/newsletter",
      },
    },
  },
};

const metadataConfig = {
  baseHref: "/articles",
  paginationTemplate: "/articles/browse/{{id}}",
};

async function preparePage(currentPage: string = "1") {
  const allArticles = await getAllArticles();

  // get a listing of regular posts (hiding drafts)
  let posts = allArticles
    .filter(post =>
      process?.env?.NODE_ENV == "development" ? true : post.frontmatter.draft !== true,
    )
    // sort newest to oldest
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date ?? "").getTime() - new Date(a.frontmatter.date ?? "").getTime(),
    );

  // get a listing of featured posts
  const featured = allArticles
    .filter(post => post.frontmatter.featured === true && !post.frontmatter.draft)
    .slice(0, 2)
    // sort newest to oldest
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date ?? "").getTime() - new Date(a.frontmatter.date ?? "").getTime(),
    );

  // remove the selected `featured` from the `posts`
  if (Array.isArray(featured) && featured?.length > 0)
    posts = posts?.filter(
      item => item.slug !== featured.filter(ft => ft.slug === item?.slug)?.[0]?.slug,
    );

  // construct the `pagination` data object
  const pagination = computePagination(
    posts.length, // record length
    currentPage, // current page
    "/articles", // baseHref
    "/articles/browse/{{id}}", // template
    9, // perPage
  );

  // chunk out the posts for the current page
  posts = posts.slice(pagination.start, pagination.end);

  return {
    props: { posts, featured, pagination },
  };
}

type PageProps = {
  params: {
    page?: string;
  };
};

export default async function Page({ params: { page } }: PageProps) {
  const {
    props: { posts, featured, pagination },
  } = await preparePage(page);

  // Transform posts for CardGrid (expects old format)
  const transformedPosts = posts.map(p => ({
    ...p.frontmatter,
    slug: p.slug,
    href: p.href,
  }));

  const transformedFeatured = featured.map(p => ({
    ...p.frontmatter,
    slug: p.slug,
    href: p.href,
  }));

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
              <SmallCard key={post.slug} post={post} baseHref={metadataConfig.baseHref} />
            ))}
          </section>
        )}

        <section className="pt-8">
          <h2 className="text-4xl font-bold">Latest articles</h2>
          {/* <p></p> */}
        </section>

        <CardGrid
          posts={transformedPosts}
          baseHref={metadataConfig.baseHref}
          pagination={pagination}
        />
      </main>
    </PageViewTracker>
  );
}
