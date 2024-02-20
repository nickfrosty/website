import type { Metadata } from "next";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import { displayDate } from "zumo";

// construct the seo meta data for the page
export const metadata: Metadata = {
  alternates: {
    canonical: "/blog",
  },
  title: `Blog`,
  description:
    "An anthology of me building in public 👷. Writing down and sharing " +
    "my thoughts and experiences as I go (plus some other goodies too).",
};

export default function Page() {
  // get a listing of regular posts (hiding drafts)
  const posts = allBlogs
    .filter((post) =>
      process?.env?.NODE_ENV == "development" ? true : post.draft !== true,
    )
    .sort(
      (a, b) =>
        new Date(b?.date ?? "").getTime() - new Date(a?.date ?? "").getTime(),
    );

  return (
    <main className="max-w-5xl px-3 mx-auto space-y-20">
      <header className="space-y-3">
        <h1>
          <Link href="/blog" className="text-white link-muted">
            All blog posts
          </Link>
        </h1>
        <p className="text-lg minor">Just a guy, building and sharing.</p>
      </header>

      <section className="grid gap-8 md:grid-cols-2">
        {posts.map((post, key) => {
          return (
            <div
              key={key}
              className={`relative p-2 border border-transparent rounded-md ${
                post.draft === true ? "!border-red-900" : ""
              }`}
            >
              {!!post.category && (
                <h4 className="text-base tracking-wide capitalize minor">
                  {post.category}
                </h4>
              )}
              <h3 className="">
                <Link
                  className="text-2xl font-semibold link-muted"
                  href={post.href as string}
                >
                  {post.title}
                </Link>
              </h3>

              <div className="flex items-center minor whitespace-nowrap md:inline-block">
                {post.draft === true && (
                  <span className="absolute right-0 font-mono text-sm bottom-2 tag">
                    draft
                  </span>
                )}
                {displayDate(post.date)}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
