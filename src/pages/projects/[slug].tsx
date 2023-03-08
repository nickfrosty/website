import ProseLayout from "@/layouts/ProseLayout";

import { generateStaticPaths, getDocBySlug, getDocMetaBySlug } from "zumo";

// load the config/constants file
import zumoConfig from "@@/zumo.config";
const config = zumoConfig.content.projects;

// construct the meta data for the page
const metaData = {
  title: "Projects",
  description:
    "I'm always working on something. These are my main active projects, and previous projects. All in various states.",
  contentDir: "projects",
};

const breadcrumbParents: SimpleLinkItem = {
  href: "/projects",
  label: "Projects",
};

export async function getStaticPaths() {
  // get the listing of all of the markdown files
  return generateStaticPaths(metaData.contentDir, false);
}

type PageStaticProps = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params: { slug } }: PageStaticProps) {
  // if (process && process.env?.NODE_ENV !== "development")
  //   return { notFound: true };

  const post: PostRecord = await getDocBySlug(slug, metaData.contentDir);

  // give the 404 page when the post is not found
  if (!post) return { notFound: true };

  let next: PostRecord | null = null;
  let prev: PostRecord | null = null;

  // parse out the `next` and `prev` articles, when defined by the post's `meta`
  if (post?.meta?.nextPage)
    next = await getDocMetaBySlug(post.meta.nextPage, metaData.contentDir);
  if (post?.meta?.prevPage)
    prev = await getDocMetaBySlug(post.meta.prevPage, metaData.contentDir);

  // strip the tags from the `post`
  post.meta.tags = "";
  // TODO: add the `tag` based post browsing to these blog posts

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
