import type { Metadata } from "next";
import config from "@/lib/config";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import { displayDate } from "zumo";

// construct the seo meta data for the page
export const metadata: Metadata = {
  title: `${config.siteName} - Blog`,
  description:
    "An anthology of me building in public 👷. Writing down and sharing my thoughts and experiences as I go (plus some other goodies too).",
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
      <header className="grid items-center max-w-2xl gap-8 md:flex">
        <h1 className="">
          <Link href={"/blog"} className="text-6xl font-bold">
            /blog
          </Link>
        </h1>
        <p className="text-lg leading-tight text-gray-300">
          I like to build things 👷
          <br />
          and share my experiences about those things
          <br className="hidden md:block" />
          <span className="text-base"> (and other goodies too)</span>
        </p>
      </header>

      <section className="grid gap-8 md:gap-12 md:grid-cols-2">
        {posts.map((post, key) => {
          return (
            <div key={key} className="">
              {!!post.category && (
                <h4 className="text-base font-medium tracking-wide text-gray-500 capitalize">
                  {post.category}
                </h4>
              )}
              <h3 className="">
                <Link
                  className="text-2xl font-semibold hover:underline"
                  href={post.href as string}
                >
                  {post.title}
                </Link>
              </h3>

              <div className="block text-gray-500 whitespace-nowrap md:inline-block">
                {displayDate(post.date)}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
