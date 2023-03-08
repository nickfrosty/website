/* eslint-disable @next/next/no-img-element */
import ProseLayout from "@/layouts/ProseLayout";
import { generateStaticPaths, getDocBySlug, getDocMetaBySlug } from "zumo";

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

// get the listing of all of the markdown files
export async function getStaticPaths() {
  return generateStaticPaths(metaData.contentDir, false);
}

type PageStaticProps = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params: { slug } }: PageStaticProps) {
  const post: PostRecord = await getDocBySlug(slug, metaData.contentDir);

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
  let next: PostRecord | null = null;
  let prev: PostRecord | null = null;

  if (post?.meta?.nextPage)
    next = await getDocMetaBySlug(post.meta.nextPage, metaData.contentDir);
  if (post?.meta?.prevPage)
    prev = await getDocMetaBySlug(post.meta.prevPage, metaData.contentDir);

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
