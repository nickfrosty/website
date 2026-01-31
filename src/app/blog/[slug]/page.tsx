import type { Metadata } from "next";
import { metadata as layoutMetadata } from "./layout";
import { getAllBlogSlugs, getBlogBySlug, getBlogWithMDX } from "@/lib/content";
import styles from "@/styles/article.module.css";

// load the config/constants file
import zumoConfig from "@@/zumo.config";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArticleMeta } from "@/components/content/ArticleMeta";
import { RenderMDX } from "@/components/mdx";
import { PageViewTracker } from "@/components/content/PageViewTracker";
import { NewsletterSubscribeForm } from "@/components/newsletter/NewsletterSubscribeForm";
const config = zumoConfig.content.blog;

export function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PagePropsWithSlug): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return notFound();
  }

  return {
    title: `${post.frontmatter.title} | Blog`,
    description: post.frontmatter.description || layoutMetadata.description,
    alternates: {
      canonical: post.href,
    },
  };
}

const breadcrumbParents: SimpleLinkItem = {
  href: "/blog",
  label: "Blog",
};

export default async function Page({ params }: PagePropsWithSlug) {
  const { slug } = await params;
  const post = await getBlogWithMDX(slug);

  if (!post) {
    return notFound();
  }

  // give 404 for `draft` pages in all non dev envs
  if (post.frontmatter.draft && process?.env?.NODE_ENV !== "development") {
    return notFound();
  }

  return (
    <PageViewTracker>
      <main className="space-y-5">
        <h1>
          <Link href={`/blog/${slug}`} className="">
            {post.frontmatter.title}
          </Link>
        </h1>

        <ArticleMeta
          post={{
            ...post.frontmatter,
            slug,
            href: `/blog/${slug}`,
          }}
          baseHref={config.baseHref}
          tagHrefTemplate={config.tagHrefTemplate}
        />

        <article className={styles.article}>
          <RenderMDX body={post.body} />
        </article>

        <NewsletterSubscribeForm title="Do you like my antics? Subscribe to me email newsletter!" />
      </main>
    </PageViewTracker>
  );
}
