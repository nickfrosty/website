import { ProsePageProps, SimpleLinkItem } from "@@/types";
import ProseLayout from "@/layouts/ProseLayout";
import { Blog, allBlogs } from "contentlayer/generated";

import { getDocMetaBySlug } from "zumo";

// load the config/constants file
import zumoConfig from "@@/zumo.config";
const config = zumoConfig.content.blog;

// construct the meta data for the page
const metaData = {
  title: "Blog",
  description: "Read more from this blog post as part of my online anthology.",
  contentDir: "blog",
};

const breadcrumbParents: SimpleLinkItem = {
  href: "/blog",
  label: "Blog",
};

export async function getStaticPaths() {
  const paths = allBlogs.map((item) => {
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
  const post = allBlogs.filter((post) => post.slug == slug)?.[0];

  // give the 404 page when the post is not found
  if (!post) return { notFound: true };

  // give 404 for `draft` pages in all non dev envs
  if (post?.draft === true && process?.env?.NODE_ENV !== "development")
    return { notFound: true };

  // parse out the `next` and `prev` articles, when defined by the current post
  let next: Blog | null = null;
  let prev: Blog | null = null;

  // if (post?.nextPage)
  //   next = await getDocMetaBySlug(post.nextPage, metaData.contentDir);
  // if (post?.prevPage)
  //   prev = await getDocMetaBySlug(post.prevPage, metaData.contentDir);

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
