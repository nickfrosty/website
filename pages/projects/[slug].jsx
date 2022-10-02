import ProseLayout from "~/layouts/ProseLayout";

import { generateStaticPaths, getDocBySlug, getDocMetaBySlug } from "zumo";

// load the config/constants file
const config = require("~/zumo.config").content.projects;

// construct the meta data for the page
// const metaData = basicMeta({
const metaData = {
  title: "Projects",
  description: "",
  contentDir: "projects",
};

const breadcrumbParents = {
  href: "/projects",
  label: "Projects",
};

export async function getStaticPaths() {
  // get the listing of all of the markdown files
  return generateStaticPaths(metaData.contentDir, false);
}

export async function getStaticProps({ params }) {
  // if (process && process.env?.NODE_ENV !== "development")
  //   return { notFound: true };

  const post = await getDocBySlug(params?.slug, metaData.contentDir);

  // give the 404 page when the post is not found
  if (!post) return { notFound: true };

  let [next, prev] = [null, null];

  // parse out the `next` and `prev` articles, when defined by the post's `meta`
  if (post?.meta?.nextPage)
    next = await getDocMetaBySlug(post.meta.nextPage, metaData.contentDir);
  if (post?.meta?.prevPage)
    prev = await getDocMetaBySlug(post.meta.prevPage, metaData.contentDir);

  // strip the tags from the `post`
  post.meta.tags = null;
  // TODO: add the `tag` based post browsing to these blog posts

  return {
    props: { post, next, prev },
  };
}

/*

*/
export default function SingleProjectPage(props) {
  return (
    <ProseLayout
      {...props}
      config={config}
      breadcrumbParents={breadcrumbParents}
      breadcrumbShowHome={false}
    />
  );
}
