import { PaginationProps } from "@@/types";
import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";

import { computePagination } from "zumo";

import { Article, allArticles } from "contentlayer/generated";
import { CardGrid } from "@/components/cards/CardGrid";
import { SmallCard } from "@/components/cards/SmallCard";

// construct the seo meta data for the page
const seo: NextSeoProps = {
  title: "Articles and How-To's",
  description: `Collection of "how-to" style tutorials and technical writings. Mostly centered around coding, devops, and content creators.`,
};

const metaData = {
  baseHref: "/articles",
  paginationTemplate: null, // "/page/{id}",
};

export async function preparePage(currentPage?: number) {
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
      delete post.body;
      return post;
    });

  // get a listing of featured posts
  const featured = allArticles
    .filter((post) => post.featured === true && post?.draft !== true)
    .slice(0, 2)
    // sort newest to oldest
    .sort(
      (a, b) =>
        new Date(b?.date ?? "").getTime() - new Date(a?.date ?? "").getTime(),
    )
    // strip the `body` to send less data to the client
    .map((post) => {
      // @ts-ignore
      delete post.body;
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
  const pagination = computePagination(
    posts.length,
    currentPage ?? 1,
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
  posts: Article[];
  featured?: Article[];
  pagination: PaginationProps;
};

export default function Page({ posts, featured, pagination }: PageProps) {
  return (
    <DefaultLayout seo={seo}>
      {/* {!!featured &&
        !featured?.length &&
        pagination &&
        (pagination?.page as number) <= 1 && ( */}
      <section className="double-wide-cards">
        {featured?.map((post) => {
          return (
            <SmallCard
              key={post.slug}
              post={post}
              baseHref={metaData.baseHref}
            ></SmallCard>
          );
        })}
      </section>
      {/* )} */}

      <CardGrid
        posts={posts}
        baseHref={metaData.baseHref}
        pagination={pagination}
      />
    </DefaultLayout>
  );
}
