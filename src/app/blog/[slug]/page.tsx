import { SimpleLinkItem } from "@@/types";
import ProseLayout from "@/layouts/ProseLayout";
import { Blog, allBlogs } from "contentlayer/generated";

// load the config/constants file
import zumoConfig from "@@/zumo.config";
import { Metadata } from "next";
const config = zumoConfig.content.blog;

// todo:
// export function generateMetadata(){}

// construct the meta data for the page
export const metadata: Metadata = {
  title: "Blog",
  description: "Read more from this blog post as part of my online anthology.",
  // contentDir: "blog",
};

const breadcrumbParents: SimpleLinkItem = {
  href: "/blog",
  label: "Blog",
};

// export async function getStaticPaths() {
//   const paths = allBlogs.map((item) => {
//     return {
//       params: {
//         slug: item.slug,
//       },
//     };
//   });

//   return {
//     paths: paths,
//     fallback: false,
//   };
// }

export default function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
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

  return (
    <ProseLayout
      post={post}
      // next={next}
      // prev={prev}
      config={config}
      breadcrumbParents={[breadcrumbParents]}
      breadcrumbShowHome={false}
    />
  );
}
