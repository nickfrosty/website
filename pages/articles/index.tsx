import { getDocsByPath, filterDocs, computePagination } from "zumo";

import DefaultLayout from "~/layouts/default";
import { CardGrid } from "~/components/cards/CardGrid";
import { SmallCard } from "~/components/cards/SmallCard";
import { NextSeoProps } from "next-seo";

// construct the meta data for the page
// import { basicMeta } from "~/utils/seoMetaData";
// const metaData = basicMeta({

const seo: NextSeoProps = {
  title: "Articles and How-To's",
  description: `Collection of "how-to" style tutorials and technical writings. Mostly centered around coding, devops, and content creators.`,
};

const metaData = {
  baseHref: "/articles",
  paginationTemplate: null, // "/page/{id}",
};

export async function preparePage(currentPage: number) {
  let posts: PostRecord[] = await getDocsByPath("articles");

  // extract the `featured` posts
  const featured: PostRecord[] = filterDocs(posts, { featured: true }, 2);

  // remove the `featured` from the `posts`
  if (Array.isArray(featured))
    posts = posts?.filter(
      (item) =>
        item.slug !==
        featured.filter((ft) => ft.slug === item?.slug)?.[0]?.meta.slug,
    );

  // construct the `pagination` data object
  const pagination = computePagination(
    posts.length,
    currentPage,
    metaData.baseHref,
    metaData?.paginationTemplate,
  );

  // chunk out the posts for the current page
  posts = posts.slice(pagination.start, pagination.end);

  return {
    props: { posts, featured, pagination },
  };
}

type PageStaticProps = {
  params: {
    page?: number;
  };
};

export async function getStaticProps({ params }: PageStaticProps) {
  return await preparePage(params?.page ?? 1);
}

type PageProps = {
  seo: NextSeoProps;
  posts: PostRecord[];
  featured?: PostRecord[];
  pagination: PaginationProps;
};

export default function ArticlePage({
  seo,
  posts,
  featured,
  pagination,
}: PageProps) {
  return (
    <DefaultLayout seo={seo}>
      {featured?.length && pagination && (pagination?.page as number) <= 1 && (
        <section className="double-wide-cards">
          {featured.map((item) => {
            return (
              <SmallCard
                key={item.slug}
                {...item?.meta}
                baseHref={metaData.baseHref}
              ></SmallCard>
            );
          })}
        </section>
      )}

      <CardGrid
        posts={posts}
        baseHref={metaData.baseHref}
        pagination={pagination}
      />
    </DefaultLayout>
  );
}
