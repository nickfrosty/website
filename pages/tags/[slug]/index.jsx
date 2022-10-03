/* eslint-disable @next/next/no-img-element */
import {
  generateStaticPaths,
  getDocBySlug,
  getDocsByPath,
  filterDocs,
  computePagination,
  parseTemplate,
} from "zumo";

import Layout from "~/layouts/default";
import { HeroSection } from "~/components/content/HeroSection";
import { CardGrid } from "~/components/cards/CardGrid";

// import { basicMeta } from "~/utils/seoMetaData";
// construct the meta data for the page
// const metaData = basicMeta({
const metaData = {
  title: "Tags",
  description: "",
  baseHref: "/tags/{{tag}}",
  // paginationTemplate: "{{baseHref}}/{{id}}",
};

// export async function getStaticPaths() {
//   // get the listing of all of the markdown files
//   return generateStaticPaths("tags", false);
// }

export async function preparePage(currentPage, slug) {
  // give the 404 page when no `slug` was found
  if (!slug) return { notFound: true };

  // retrieve the current `tag` document, when on exists
  let page = (await getDocBySlug(slug, "tags")) || {
    meta: { slug, title: slug },
    content: false,
  };

  // parse and update the `baseHref` to include the current tag
  metaData.baseHref = parseTemplate(metaData?.baseHref, {
    baseHref: metaData.baseHref,
    tag: slug.toLowerCase(),
  });

  // get the listing of `posts` for the current `tag`
  let posts = await getDocsByPath("articles", {
    tags: { contains: slug },
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
  metaData.title = page.meta.title;

  // chunk out the posts for the current page
  posts = posts.slice(pagination.start, pagination.end);

  return {
    props: {
      metaData,
      meta: page?.meta,
      content: page?.content,
      posts,
      featured,
      pagination,
    },
  };
}

export async function getServerSideProps({ params }) {
  console.warn(params);
  return await preparePage(params?.page, params?.slug);
}

export default function TagPage({
  metaData,
  meta,
  // content,
  posts,
  featured,
  pagination,
}) {
  // TODO: support setting a canonical tag, likely via a util function to standardize the data
  // if (!meta?.canonical) meta.canonical = `${href}`;

  return (
    <Layout seo={metaData}>
      <HeroSection
        {...meta}
        href={metaData?.baseHref}
        heading="tag"
        featured={featured && featured}
      />

      <CardGrid posts={posts} baseHref={"/articles"} pagination={pagination} />
    </Layout>
  );
}
