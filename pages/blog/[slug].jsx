import ProseLayout from "~/layouts/ProseLayout";

import { generateStaticPaths, getDocBySlug, getDocMetaBySlug } from "zumo";

// load the config/constants file
const config = require("~/zumo.config").content.blog;

// construct the meta data for the page
// const metaData = basicMeta({
const metaData = {
  title: "Blog",
  description: "Read more from this blog post as part of my online anthology.",
  contentDir: "blog",
};

const breadcrumbParents = {
  href: "/blog",
  label: "Blog",
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

  // parse out the `next` and `prev` blog posts, when defined by the post's `meta`
  let [next, prev] = [null, null];

  if (post?.meta?.nextPage)
    next = await getDocMetaBySlug(post.meta.nextPage, metaData.contentDir);
  if (post?.meta?.prevPage)
    prev = await getDocMetaBySlug(post.meta.prevPage, metaData.contentDir);

  // TODO: auto compute next/prev page for when they are not manually set

  // strip the tags from the `post`
  post.meta.tags = null;
  // TODO: add the `tag` based post browsing to these blog posts

  return {
    props: { post, next, prev },
  };
}

export default function SingleBlogPage(props) {
  return (
    <ProseLayout
      {...props}
      config={config}
      breadcrumbParents={breadcrumbParents}
      breadcrumbShowHome={false}
    />
  );
}
