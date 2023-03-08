import ColumnLayout from "@/layouts/ColumnLayout";
import { parseTemplate } from "zumo";
import Link from "next/link";

import { ArticleMeta } from "@/components/content/ArticleMeta";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { ArticleContent } from "@/components/content/ArticleContent";
import { NextPrevSection } from "@/components/content/NextPrevSection";
import { NextSeoProps } from "next-seo";

type LayoutProps = {
  className?: string;
  children?: React.ReactNode;

  config: ZumoConfigRecord;
  post: PostRecord;
  next?: PostRecord;
  prev?: PostRecord;
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
      title: post.meta.title,
    },
  };

  // add the image to the article, when defined
  if (post?.meta?.image)
    seo = {
      twitter: {
        cardType: "summary_large_image",
      },
      openGraph: {
        type: "website",
        url: `https://nick.af${href}`,
        title: post.meta.title,
        images: [
          {
            url: `https://nick.af${post.meta.image}`,
            width: 1200,
            height: 728,
            alt: post.meta.title,
          },
        ],
      },
    };

  return (
    <ColumnLayout seo={{ ...post.meta, ...seo }}>
      {/* Bread crumbs area */}
      <Breadcrumbs
        meta={post.meta}
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
            {post?.meta?.title}
          </Link>
        </h1>

        <ArticleMeta
          meta={post.meta}
          baseHref={config.baseHref}
          tagHrefTemplate={config.tagHrefTemplate}
        />

        <ArticleContent content={post.content} />
      </main>

      <NextPrevSection next={next} prev={prev} hrefBase={config.baseHref} />
    </ColumnLayout>
  );
}
