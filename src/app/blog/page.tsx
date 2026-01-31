import type { Metadata } from "next";

import Link from "next/link";

import { displayDate } from "zumo";

import { PageViewTracker } from "@/components/content/page-view-tracker";
import { getAllBlogs } from "@/lib/content";

// construct the seo meta data for the page
export const metadata: Metadata = {
  alternates: {
    canonical: "/blog",
  },
  title: `Blog`,
  description:
    "Various personal thoughts and anecdotes from over the years, including sharing " +
    "my experiences of building in public and things I find interesting.",
};

export default async function Page() {
  // get a listing of regular posts (hiding drafts)
  const allPosts = await getAllBlogs();
  const posts = allPosts
    .filter(post =>
      process?.env?.NODE_ENV == "development" ? true : post.frontmatter.draft !== true,
    )
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date ?? "").getTime() - new Date(a.frontmatter.date ?? "").getTime(),
    );

  return (
    <PageViewTracker>
      <main className="mx-auto max-w-5xl space-y-20 px-3">
        <header className="space-y-3">
          <h1>
            <Link href="/blog" className="link-muted text-white shadow-none">
              All blog posts
            </Link>
          </h1>
          <p className="minor text-lg">Just a guy, building and sharing.</p>
        </header>

        <section className="grid gap-8 md:grid-cols-2">
          {posts.map((post, key) => (
            <div
              key={key}
              className={`relative rounded-md border border-transparent p-2 ${
                post.frontmatter.draft === true ? "!border-red-900" : ""
              }`}
            >
              {!!post.frontmatter.category && (
                <h4 className="minor text-sm font-medium tracking-wide uppercase">
                  {post.frontmatter.category}
                </h4>
              )}
              <h3 className="">
                <Link className="link-muted text-2xl font-semibold shadow-none" href={post.href}>
                  {post.frontmatter.title}
                </Link>
              </h3>

              <div className="minor flex items-center whitespace-nowrap md:inline-block">
                {post.frontmatter.draft === true && (
                  <span className="tag absolute right-0 bottom-2 font-mono text-sm">draft</span>
                )}
                {displayDate(post.frontmatter.date)}
              </div>
            </div>
          ))}
        </section>
      </main>
    </PageViewTracker>
  );
}
