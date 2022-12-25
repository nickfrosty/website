import ColumnLayout from "~/layouts/ColumnLayout";
import { parseTemplate } from "zumo";
import Link from "next/link";

import { ArticleMeta } from "~/components/content/ArticleMeta";
import { Breadcrumbs } from "~/components/content/Breadcrumbs";
import { ArticleContent } from "~/components/content/ArticleContent";
import { NextPrevSection } from "~/components/content/NextPrevSection";

export default function ProseLayout({
  config,
  post,
  next,
  prev,
  breadcrumbParents = null,
  breadcrumbShowHome = true,
  parentPage = "/",
  // children
}) {
  // TODO: support setting a canonical tag, likely via a util function to standardize the data

  // const { post, next, prev } = props
  let { meta = {}, content = null, seo = {} } = post;

  // compute the `href` based on the template
  const href = parseTemplate(config.hrefTemplate, {
    baseHref: config.baseHref,
    slug: post.slug,
  });

  return (
    <ColumnLayout seo={{ ...meta, ...seo }}>
      {/* Bread crumbs area */}
      <Breadcrumbs
        meta={meta}
        includeHome={breadcrumbShowHome}
        parents={breadcrumbParents}
        href={href}
      />

      {/* Primary content area */}
      <main className="space-y-5">
        <Link href={href}>
          <a>
            <h1 className="text-yellow-400 heading heading-xl hover:underline">
              {meta?.title}
            </h1>
          </a>
        </Link>

        <ArticleMeta
          meta={meta}
          baseHref={config.baseHref}
          tagHrefTemplate={config.tagHrefTemplate}
        />

        <ArticleContent content={content} />
      </main>

      <NextPrevSection next={next} prev={prev} hrefBase={config.baseHref} />
    </ColumnLayout>
  );
}
