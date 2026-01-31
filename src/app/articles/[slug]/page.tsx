import type { Metadata } from "next";
import { metadata as layoutMetadata } from "./layout";
import { notFound } from "next/navigation";
import type { SimpleLinkItem } from "@@/types";
import ProseLayout from "@/layouts/ProseLayout";
import {
  getAllArticleSlugs,
  getArticleBySlug,
  getArticleWithMDX,
  getAllArticles,
} from "@/lib/content";

// load the config/constants file
import zumoConfig from "@@/zumo.config";
import { PageViewTracker } from "@/components/content/PageViewTracker";
import { SOCIAL } from "@/lib/config";
const config = zumoConfig.content.articles;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticleBySlug(slug);

  if (!post) {
    return notFound();
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description || layoutMetadata.description,
    alternates: {
      canonical: post.href,
    },
    openGraph: post.frontmatter.image
      ? {
          images: {
            url: post.frontmatter.image,
            alt: post.frontmatter.title,
          },
        }
      : undefined,
    twitter: {
      card: "summary_large_image",
      site: `@${SOCIAL.twitter}`,
      creator: `@${SOCIAL.twitter}`,
    },
  };
}

const breadcrumbParents: SimpleLinkItem = {
  href: "/articles",
  label: "Articles",
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getArticleWithMDX(slug);

  if (!post) {
    return notFound();
  }

  // give 404 for `draft` pages in all non dev envs
  if (post.frontmatter.draft && process?.env?.NODE_ENV !== "development") {
    return notFound();
  }

  // parse out the `next` and `prev` articles, when defined by the current post
  let next: Awaited<ReturnType<typeof getArticleBySlug>> = null;
  let prev: Awaited<ReturnType<typeof getArticleBySlug>> = null;

  if (post.frontmatter.nextPage) {
    next = await getArticleBySlug(post.frontmatter.nextPage);
    if (!next) {
      console.warn(
        `\n[warning]`,
        `Article nextPage slug of '${post.frontmatter.nextPage}' not found\n`,
      );
    }
  }

  if (post.frontmatter.prevPage) {
    prev = await getArticleBySlug(post.frontmatter.prevPage);
    if (!prev) {
      console.warn(
        `\n[warning]`,
        `Article prevPage slug of '${post.frontmatter.prevPage}' not found\n`,
      );
    }
  }

  return (
    <PageViewTracker>
      <ProseLayout
        post={{
          ...post.frontmatter,
          slug,
          href: `/articles/${slug}`,
          body: post.body,
        }}
        config={config}
        breadcrumbParents={[breadcrumbParents]}
        breadcrumbShowHome={false}
      />
    </PageViewTracker>
  );
}
