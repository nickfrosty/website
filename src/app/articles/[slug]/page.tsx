import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { SimpleLinkItem } from "@@/types";
import ProseLayout from "@/layouts/ProseLayout";
import { type Article, allArticles } from "contentlayer/generated";

// load the config/constants file
import zumoConfig from "@@/zumo.config";
const config = zumoConfig.content.articles;

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return allArticles
    .filter((post) => post.draft !== false)
    .map((post) => ({
      slug: post.slug as string,
    }));
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const post = allArticles.filter((post) => post.slug == slug)?.[0];

  if (!post) {
    return notFound();
  }

  return {
    title: `${post.title} | Article`,
    description: post.description || "Read more article to learn more.",
    alternates: {
      canonical: post.href,
    },
  };
}

const breadcrumbParents: SimpleLinkItem = {
  href: "/articles",
  label: "Articles",
};

export default function Page({ params: { slug } }: PageProps) {
  const post = allArticles.filter((post) => post.slug == slug)?.[0];

  if (!post) {
    return notFound();
  }

  // give 404 for `draft` pages in all non dev envs
  if (post?.draft === true && process?.env?.NODE_ENV !== "development") {
    return notFound();
  }

  // parse out the `next` and `prev` articles, when defined by the current post
  let next: Article | undefined = undefined;
  let prev: Article | undefined = undefined;

  if (!!post.nextPage) {
    next = allArticles.find((record) => record.slug == post.nextPage);
    if (!next) {
      console.warn(
        `\n[warning]`,
        `Article nextPage slug of '${post.nextPage}' not found\n`,
      );
    }
  }

  if (!!post.prevPage) {
    prev = allArticles.find((record) => record.slug == post.prevPage);
    if (!prev) {
      console.warn(
        `\n[warning]`,
        `Article prevPage slug of '${post.prevPage}' not found\n`,
      );
    }
  }

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
