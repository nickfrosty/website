import type { Metadata } from "next";

import Link from "next/link";

import { displayDate } from "zumo";

import { PageViewTracker } from "@/components/content/page-view-tracker";
import { getAllBlogs, filterDrafts, sortByDate } from "@/lib/content";

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
  const allPosts = await getAllBlogs();
  const posts = sortByDate(filterDrafts(allPosts));

  return (
    <PageViewTracker>
      <main className="mx-auto max-w-5xl space-y-20 px-3">
        <header className="space-y-3">
          <h1>
            <Link href="/blog" className="text-white hover:text-yellow-400">
              All blog posts
            </Link>
          </h1>
          <p className="minor text-lg">Just a guy, building and sharing.</p>
        </header>

        <section className="grid gap-8 md:grid-cols-2">
          {posts.map((post, key) => (
            <div
              key={key}
              className={`relative rounded-md border border-transparent py-2 ${
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

              <div className="minor mt-2 flex items-center whitespace-nowrap md:inline-block">
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
