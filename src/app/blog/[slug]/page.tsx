import type { Metadata } from "next";
import type { SimpleLinkItem } from "@@/types";
import { allBlogs } from "contentlayer/generated";

// load the config/constants file
import zumoConfig from "@@/zumo.config";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import Link from "next/link";
import { ArticleMeta } from "@/components/content/ArticleMeta";
import { ArticleContent } from "@/components/content/ArticleContent";
const config = zumoConfig.content.blog;

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return allBlogs
    .filter((post) => post.draft !== false)
    .map((post) => ({
      slug: post.slug as string,
    }));
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const post = allBlogs.filter((post) => post.slug == slug)?.[0];

  if (!post) {
    return notFound();
  }

  return {
    title: `${post.title} | Blog`,
    description:
      post.description || "Read more from this blog post to learn more.",
  };
}

const breadcrumbParents: SimpleLinkItem = {
  href: "/blog",
  label: "Blog",
};

export default function Page({ params: { slug } }: PageProps) {
  // select the currently viewed post
  const post = allBlogs.filter((post) => post.slug == slug)?.[0];

  if (!post) {
    return notFound();
  }

  // give 404 for `draft` pages in all non dev envs
  if (post?.draft === true && process?.env?.NODE_ENV !== "development") {
    return notFound();
  }

  // todo: get the next and prev posts
  // parse out the `next` and `prev` articles, when defined by the current post
  // let next: Blog | null = null;
  // let prev: Blog | null = null;

  // if (post?.nextPage)
  //   next = await getDocMetaBySlug(post.nextPage, metaData.contentDir);
  // if (post?.prevPage)
  //   prev = await getDocMetaBySlug(post.prevPage, metaData.contentDir);

  return (
    <>
      {/* <Breadcrumbs
        post={post}
        includeHome={breadcrumbShowHome}
        parents={breadcrumbParents}
        href={post.href}
      /> */}

      <main className="space-y-5">
        <h1>
          <Link
            href={post.href as string}
            className="text-yellow-400 heading heading-xl hover:underline"
          >
            {post.title}
          </Link>
        </h1>

        <ArticleMeta
          post={post}
          baseHref={config.baseHref}
          tagHrefTemplate={config.tagHrefTemplate}
        />

        <ArticleContent content={post.body.raw} />
      </main>

      {/* <NextPrevSection next={next} prev={prev} hrefBase={config.baseHref} /> */}
    </>
  );
}
