/* eslint-disable @next/next/no-img-element */
import {
  generateStaticPaths,
  getDocBySlug,
  getDocsByPath,
  filterDocs,
  computePagination,
  parseTemplate,
} from "zumo";

import { NextSeoProps } from "next-seo";
import Layout from "@/layouts/default";

import {
  Article,
  ArticleTag,
  allArticleTags,
  allArticles,
} from "contentlayer/generated";

import { HeroSection } from "@/components/content/HeroSection";
import { CardGrid } from "@/components/cards/CardGrid";
import { PaginationProps } from "@@/types";

// construct the meta data for the page
const seo: NextSeoProps = {
  title: "Tags",
  description: "Explore all my articles with written about this topic.",
};

const metaData = {
  baseHref: "/tags/{{tag}}",
  paginationTemplate: "{{baseHref}}/{{id}}",
};

type TagMetadata = {
  count: number;
  baseHref: string;
  countLabel: "articles";
  publishDate: string | boolean;
};

export async function preparePage(slug: string, currentPage: number = 1) {
  // give the 404 page when no `slug` was found
  if (!slug) return { notFound: true };

  // retrieve the current `tag` document, when on exists
  const tagMeta = allArticleTags.filter(
    (item) => item.slug?.toLowerCase().replace(/\s+/g, "-") == slug,
  )?.[0] || {
    _id: slug,
    title: slug,
    href: `/tags/${slug.toLowerCase().replace(/\s+/g, "-")}`,
  };

  // parse and update the `baseHref` to include the current tag
  metaData.baseHref = parseTemplate(metaData?.baseHref, {
    baseHref: metaData.baseHref,
    tag: slug.toLowerCase(),
  });

  // get the listing of `posts` for the current `tag`
  let posts = allArticles
    .filter((post) =>
      process?.env?.NODE_ENV == "development" ? true : post.draft !== true,
    )
    .filter((item) => {
      if (Array.isArray(item.tags)) {
        return item.tags.find(
          (tag: string) =>
            tag.toLowerCase() == slug.toLocaleLowerCase() ||
            tag.toLowerCase().replace(/\s+/g, "-") ==
              slug.toLocaleLowerCase().replace(/\s+/g, "-"),
        );
      }
    })
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

  // give the 404 page when no `posts` were found
  if (!(posts && Array.isArray(posts))) return { notFound: true };

  // retrieve the latest and featured articles
  const latestPost = posts?.[0] || false;
  const featured =
    posts.filter((item) => item?.featured === true)?.[0] || latestPost;

  // construct the `pagination` data object
  const pagination = computePagination(
    posts.length,
    currentPage,
    metaData?.baseHref,
    metaData?.paginationTemplate,
  );

  // construct the miscellaneous metadata
  const tagMetadata: TagMetadata = {
    count: posts.length,
    baseHref: pagination.baseHref,
    countLabel: "articles",
    publishDate: latestPost?.updatedAt || latestPost?.date || false,
  };

  // remove the `featured` article from the overall `posts` listing
  posts = posts.filter((item) => item.slug !== featured?.slug);

  // set the on page metaData meta settings
  seo.title = tagMeta?.title ?? slug;
  seo.description = `Explore all my articles with written about ${
    tagMeta?.title ?? slug
  }. They are pretty great :)`;

  // chunk out the posts for the current page
  posts = posts.slice(pagination.start, pagination.end);

  return {
    props: {
      seo,
      tagMetadata,
      tagMeta,
      posts,
      featured,
      pagination,
    },
  };
}

export async function getStaticPaths() {
  let paths: object[] = [];

  // determine the tags from all articles
  allArticles.map((item) => {
    if (Array.isArray(item.tags)) {
      item.tags.map((tag: string) => {
        paths.push({
          params: {
            slug: tag.replace(/\s+/g, "-"),
          },
        });
      });
    }
    return;
  });

  return {
    paths: paths,
    fallback: false,
  };
}

type PageStaticProps = {
  params: { page?: number; slug: string };
};

export async function getStaticProps({
  params: { page, slug },
}: PageStaticProps) {
  return await preparePage(slug, page ?? 1);
}

type PageProps = {
  seo: NextSeoProps;
  posts: Article[];
  tagMeta: ArticleTag;
  tagMetadata: TagMetadata;
  featured?: Article;
  pagination: PaginationProps;
};

export default function Page({
  seo,
  tagMeta,
  tagMetadata,
  posts,
  featured,
  pagination,
}: PageProps) {
  // TODO: support setting a canonical tag, likely via a util function to standardize the data
  // if (!meta?.canonical) meta.canonical = `${href}`;

  return (
    <Layout seo={seo}>
      <HeroSection
        metadata={tagMeta}
        baseHref={metaData?.baseHref}
        heading="tag"
        featured={featured}
      />

      <CardGrid posts={posts} baseHref={"/articles"} pagination={pagination} />
    </Layout>
  );
}
