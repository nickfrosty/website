/* eslint-disable @next/next/no-img-element */
import type { ProsePageProps, SimpleLinkItem } from "@@/types";
import ProseLayout from "@/layouts/ProseLayout";

import { Article, allArticles } from "@@/.contentlayer/generated";
import { getDocMetaBySlug } from "zumo";

// load the config/constants file
import zumoConfig from "@@/zumo.config";
const config = zumoConfig.content.articles;

// construct the meta data for the page
const metaData = {
  title: "Articles",
  description: "Read more about this super cool article I wrote.",
  contentDir: "articles",
};

const breadcrumbParents: SimpleLinkItem = {
  href: "/articles",
  label: "Articles",
};

export async function getStaticPaths() {
  const paths = allArticles.map((item) => {
    return {
      params: {
        slug: item.slug,
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

type PageStaticProps = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params: { slug } }: PageStaticProps) {
  // select the currently viewed post
  const post = allArticles.filter((post) => post.slug == slug)?.[0];

  // give the 404 page when the post is not found
  if (!post) return { notFound: true };

  // give 404 for `draft` pages in all non dev envs
  if (post?.draft === true && process?.env?.NODE_ENV !== "development")
    return { notFound: true };

  // parse out the `next` and `prev` articles, when defined by the current post
  let next: Article | null = null;
  let prev: Article | null = null;

  if (post?.nextPage) {
    next = allArticles.filter((record) => record.slug == post.nextPage)?.[0];
    if (!next)
      console.warn(
        `\n[warning]`,
        `Article nextPage slug of '${post.nextPage}' not found\n`,
      );
  }
  if (post?.prevPage) {
    prev = allArticles.filter((record) => record.slug == post.prevPage)?.[0];
    if (!prev)
      console.warn(
        `\n[warning]`,
        `Article prevPage slug of '${post.prevPage}' not found\n`,
      );
  }

  return {
    props: { post, next, prev },
  };
}

export default function Page({ post, next, prev }: ProsePageProps) {
  return (
    <ProseLayout
      post={post}
      next={next}
      prev={prev}
      config={config}
      breadcrumbParents={[breadcrumbParents]}
      breadcrumbShowHome={false}
    />
  );
}
