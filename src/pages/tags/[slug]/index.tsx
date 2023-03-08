/* eslint-disable @next/next/no-img-element */
import {
  generateStaticPaths,
  getDocBySlug,
  getDocsByPath,
  filterDocs,
  computePagination,
  parseTemplate,
} from "zumo";

import Layout from "@/layouts/default";
import { HeroSection } from "@/components/content/HeroSection";
import { CardGrid } from "@/components/cards/CardGrid";
import { NextSeoProps } from "next-seo";

// construct the meta data for the page
const seo: NextSeoProps = {
  title: "Tags",
  description: "Explore all my articles with written about this topic.",
};

const metaData = {
  baseHref: "/tags/{{tag}}",
  paginationTemplate: "{{baseHref}}/{{id}}",
};

export async function preparePage(slug: string, currentPage: number = 1) {
  // give the 404 page when no `slug` was found
  if (!slug) return { notFound: true };
  // console.warn(slug, currentPage);

  // retrieve the current `tag` document, when on exists
  let page = (await getDocBySlug(slug, "tags")) || {
    meta: { slug, title: slug },
    content: false,
  };
  // console.log(page);

  // parse and update the `baseHref` to include the current tag
  metaData.baseHref = parseTemplate(metaData?.baseHref, {
    baseHref: metaData.baseHref,
    tag: slug.toLowerCase(),
  });

  // get the listing of `posts` for the current `tag`
  let posts = await getDocsByPath("articles", {
    metaOnly: true,
    filters: {
      tags: { contains: slug },
    },
  });

  // give the 404 page when no `posts` was found
  if (!(posts && Array.isArray(posts))) return { notFound: true };

  // retrieve the latest and featured articles
  const latestPost = posts?.[0] || false;
  const featured = filterDocs(posts, { featured: true }, 1)?.[0] || latestPost;

  // construct the `pagination` data object
  const pagination = computePagination(
    posts.length,
    currentPage,
    metaData?.baseHref,
    metaData?.paginationTemplate,
  );

  // add extra page `meta` settings
  page.meta.count = posts.length;
  page.meta.baseHref = pagination.baseHref;
  page.meta.countLabel = "articles";
  page.meta.publishDate =
    latestPost?.meta?.updatedAt || latestPost?.meta?.createdAt || false;

  // remove the `featured` article from the overall `posts` listing
  posts = posts.filter((item) => item.slug !== featured?.slug);

  // give 404 for `draft` pages in all non dev envs
  // if (
  //   post?.meta?.draft === true &&
  //   process &&
  //   process.env?.NODE_ENV !== "development"
  // )
  //   return { notFound: true };

  // set the on page metaData meta settings
  seo.title = page.meta.title;
  seo.description = `Explore all my articles with written about ${page.meta.title}. They are pretty great :)`;

  // chunk out the posts for the current page
  posts = posts.slice(pagination.start, pagination.end);

  return {
    props: {
      seo,
      metaData,
      meta: page?.meta,
      content: page?.content,
      posts,
      featured,
      pagination,
    },
  };
}

export async function getStaticPaths() {
  return generateStaticPaths("tags", false);
}

type PageStaticProps = {
  params: { page: number; slug: string };
};

export async function getStaticProps({
  params: { page, slug },
}: PageStaticProps) {
  return await preparePage(slug, page ?? 1);
}

type PageProps = {
  seo: NextSeoProps;
  posts: PostRecord[];
  meta: PostMetadata;
  featured?: PostRecord;
  pagination: PaginationProps;
};

export default function Page({
  seo,
  meta,
  // content,
  posts,
  featured,
  pagination,
}: PageProps) {
  // TODO: support setting a canonical tag, likely via a util function to standardize the data
  // if (!meta?.canonical) meta.canonical = `${href}`;

  return (
    <Layout seo={seo}>
      <HeroSection
        metadata={meta}
        baseHref={metaData?.baseHref}
        heading="tag"
        featured={featured}
      />

      <CardGrid posts={posts} baseHref={"/articles"} pagination={pagination} />
    </Layout>
  );
}