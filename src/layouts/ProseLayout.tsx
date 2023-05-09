import type { SimpleLinkItem, ZumoConfigRecord } from "@@/types";
import { NextSeoProps } from "next-seo";
import ColumnLayout from "@/layouts/ColumnLayout";

import { parseTemplate } from "zumo";
import Link from "next/link";

import { ArticleMeta } from "@/components/content/ArticleMeta";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { ArticleContent } from "@/components/content/ArticleContent";
import { NextPrevSection } from "@/components/content/NextPrevSection";

import { DocumentTypes } from "contentlayer/generated";

type LayoutProps = {
  className?: string;
  children?: React.ReactNode;

  config: ZumoConfigRecord;
  post: DocumentTypes;
  next?: DocumentTypes;
  prev?: DocumentTypes;

  breadcrumbParents?: SimpleLinkItem[];
  breadcrumbShowHome?: boolean;
  parentPage?: string;
};

export default function ProseLayout({
  children,
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

  // define the base data
  let seo: NextSeoProps = {
    openGraph: {
      title: post.title,
    },
  };

  // add the image to the article, when defined
  if (post?.image) {
    seo = {
      twitter: {
        cardType: "summary_large_image",
      },
      openGraph: {
        type: "website",
        url: `https://nick.af${href}`,
        title: post.title,
        images: [
          {
            url: `https://nick.af${post.image}`,
            width: 1200,
            height: 728,
            alt: post.title,
          },
        ],
      },
    };
  }

  return (
    <ColumnLayout seo={{ ...post, ...seo }}>
      {/* Bread crumbs area */}
      <Breadcrumbs
        post={post}
        includeHome={breadcrumbShowHome}
        parents={breadcrumbParents}
        href={href}
      />

      {/* Primary content area */}
      <main className="space-y-5">
        <h1>
          <Link
            href={href}
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

      <NextPrevSection next={next} prev={prev} hrefBase={config.baseHref} />
    </ColumnLayout>
  );
}
