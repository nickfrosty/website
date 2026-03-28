import Link from "next/link";

import { parseTemplate } from "@/lib/formatting";

import { ArticleMeta } from "@/components/content/article-meta";
import { Breadcrumbs } from "@/components/content/breadcrumbs";
import { NextPrevSection } from "@/components/content/next-prev-section";
import { RenderMDX } from "@/components/mdx";

import type { MdxContent } from "@fumadocs/mdx-remote/client";

type PostData = {
  title: string;
  slug: string;
  href: string;
  date?: string;
  tags?: string[];
  description?: string;
  body: MdxContent;
};

type LayoutProps = {
  className?: string;

  config: ZumoConfigRecord;
  post: PostData;
  next?: PostData;
  prev?: PostData;

  breadcrumbParents?: SimpleLinkItem[];
  breadcrumbShowHome?: boolean;
  parentPage?: string;
};

export default function ProseLayout({
  config,
  post,
  next,
  prev,
  breadcrumbParents,
  breadcrumbShowHome = true,
  parentPage = "/",
}: LayoutProps) {
  // TODO: support setting a canonical tag, likely via a util function to standardize the data

  // compute the `href` based on the template
  const href: string = parseTemplate(config.hrefTemplate, {
    baseHref: config.baseHref,
    slug: post.slug,
  });

  return (
    <>
      {/* Bread crumbs area */}
      <Breadcrumbs includeHome={breadcrumbShowHome} parents={breadcrumbParents} />

      {/* Primary content area */}
      <main className="space-y-6">
        <h1>
          <Link href={href} className="">
            {post.title}
          </Link>
        </h1>

        <ArticleMeta
          post={post}
          baseHref={config.baseHref}
          tagHrefTemplate={config.tagHrefTemplate}
        />

        <article className="article-content">
          <RenderMDX body={post.body} />
        </article>
      </main>

      <NextPrevSection next={next} prev={prev} hrefBase={config.baseHref} />
    </>
  );
}
