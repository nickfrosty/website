import { parseTemplate } from "zumo";
import Link from "next/link";
import styles from "@/styles/article.module.css";
import type { MdxContent } from "@fumadocs/mdx-remote/client";

import { ArticleMeta } from "@/components/content/ArticleMeta";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { NextPrevSection } from "@/components/content/NextPrevSection";

import { RenderMDX } from "@/components/mdx";

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
      <Breadcrumbs
        post={post}
        includeHome={breadcrumbShowHome}
        parents={breadcrumbParents}
        href={href}
      />

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

        <article className={styles.article}>
          <RenderMDX body={post.body} />
        </article>
      </main>

      <NextPrevSection next={next} prev={prev} hrefBase={config.baseHref} />
    </>
  );
}
