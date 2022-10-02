/* eslint-disable @next/next/no-img-element */
import ProseLayout from "~/layouts/ProseLayout";

import { generateStaticPaths, getDocBySlug, getDocMetaBySlug } from "zumo";

// import { basicMeta } from "~/utils/seoMetaData";

// load the config/constants file
const config = require("~/zumo.config").content.articles;

// construct the meta data for the page
// const metaData = basicMeta({
const metaData = {
  title: "Articles",
  description: "",
  contentDir: "articles",
};

// get the listing of all of the markdown files
export async function getStaticPaths() {
  return generateStaticPaths(metaData.contentDir, false);
}

export async function getStaticProps({ params }) {
  const post = await getDocBySlug(params?.slug, metaData.contentDir);

  // give the 404 page when the post is not found
  if (!post) return { notFound: true };

  // give 404 for `draft` pages in all non dev envs
  if (
    post?.meta?.draft === true &&
    process &&
    process.env?.NODE_ENV !== "development"
  )
    return { notFound: true };

  // parse out the `next` and `prev` articles, when defined by the post's `meta`
  let [next, prev] = [null, null];

  if (post?.meta?.nextPage)
    next = await getDocMetaBySlug(post.meta.nextPage, metaData.contentDir);
  if (post?.meta?.prevPage)
    prev = await getDocMetaBySlug(post.meta.prevPage, metaData.contentDir);

  return {
    props: { post, next, prev },
  };
}

export default function SingleArticlePage(props) {
  return <ProseLayout {...props} config={config} />;
}
