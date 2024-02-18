/* eslint-disable @next/next/no-img-element */
import { computePagination, parseTemplate } from "zumo";

import { NextSeoProps } from "next-seo";

import { allArticleTags, allArticles } from "contentlayer/generated";

import { HeroSection } from "@/components/content/HeroSection";
import { CardGrid } from "@/components/cards/CardGrid";
import { PaginationProps } from "@@/types";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// construct the meta data for the page
export const metadata: Metadata = {
  title: "Tags",
  description: "Explore all my articles with written about this topic.",
};

const config = {
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

  // retrieve the current `tag` document, when it exists
  const tagMeta = allArticleTags.filter(
    (item) => item.slug?.toLowerCase().replace(/\s+/g, "-") == slug,
  )?.[0] || {
    _id: slug,
    title: slug,
    href: `/tags/${slug.toLowerCase().replace(/\s+/g, "-")}`,
  };

  // parse and update the `baseHref` to include the current tag
  config.baseHref = parseTemplate(config?.baseHref, {
    baseHref: config.baseHref,
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
  const pagination =
    computePagination(
      posts.length,
      currentPage,
      config?.baseHref,
      config?.paginationTemplate,
    ) || undefined;

  // construct the miscellaneous metadata
  const tagMetadata: TagMetadata = {
    count: posts.length,
    // @ts-ignore
    baseHref: pagination.baseHref,
    countLabel: "articles",
    publishDate: latestPost?.updatedAt || latestPost?.date || false,
  };

  // remove the `featured` article from the overall `posts` listing
  posts = posts.filter((item) => item.slug !== featured?.slug);

  // set the on page metaData meta settings
  metadata.title = tagMeta?.title ?? slug;
  metadata.description = `Explore all my articles with written about ${
    tagMeta?.title ?? slug
  }. They are pretty great :)`;

  // chunk out the posts for the current page
  // @ts-ignore
  posts = posts.slice(pagination.start, pagination.end);

  return {
    tagMetadata,
    tagMeta,
    posts,
    featured,
    pagination,
  };
}

// export async function getStaticPaths() {
//   let paths: object[] = [];

//   // determine the tags from all articles
//   allArticles
//     .filter((post) =>
//       process?.env?.NODE_ENV == "development" ? true : post.draft !== true,
//     )
//     .map((item) => {
//       if (Array.isArray(item.tags)) {
//         item.tags.map((tag: string) => {
//           paths.push({
//             params: {
//               slug: tag.replace(/\s+/g, "-"),
//             },
//           });
//         });
//       }
//       return;
//     });

//   return {
//     paths: paths,
//     fallback: false,
//   };
// }

type PageProps = {
  params: { page?: number; slug: string };
};

export default async function Page({ params: { page, slug } }: PageProps) {
  const {
    // comment for better diffs
    tagMeta,
    tagMetadata,
    posts,
    featured,
    pagination,
  } = await preparePage(slug, page ?? 1);

  if (!tagMeta) notFound();

  // TODO: support setting a canonical tag, likely via a util function to standardize the data
  // if (!meta?.canonical) meta.canonical = `${href}`;

  return (
    <>
      <HeroSection
        metadata={tagMeta}
        baseHref={config?.baseHref}
        heading="tag"
        featured={featured}
      />

      <CardGrid posts={posts} baseHref={"/articles"} pagination={pagination} />
    </>
  );
}
