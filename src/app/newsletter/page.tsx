import type { Metadata } from "next";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import { displayDate } from "zumo";
import { PageViewTracker } from "@/components/content/PageViewTracker";
import AvatarImage from "@/components/AvatarImage";
import { NewsletterSubscribeForm } from "@/components/newsletter/NewsletterSubscribeForm";

// construct the seo meta data for the page
export const metadata: Metadata = {
  alternates: {
    canonical: "/newsletter",
  },
  title: `Newsletter`,
  description:
    "Various personal thoughts and anecdotes from over the years, including sharing " +
    "my experiences of building in public and things I find interesting.",
};

export default function Page() {
  // get a listing of regular posts (hiding drafts)
  const posts = allBlogs
    .filter(
      (post) =>
        (process?.env?.NODE_ENV == "development"
          ? true
          : post.draft !== true) && post.category == "newsletter",
    )
    .sort(
      (a, b) =>
        new Date(b?.date ?? "").getTime() - new Date(a?.date ?? "").getTime(),
    );

  return (
    <PageViewTracker>
      <main className="max-w-5xl px-3 mx-auto space-y-20">
        <header className="flex items-center justify-between gap-8">
          <div className="items-center justify-between flex-shrink group md:flex md:space-x-4">
            <div className="flex items-center justify-center mx-auto">
              <Link
                href="/newsletter"
                className="border-4 border-transparent rounded-full group-hover:border-indigo-400"
              >
                <AvatarImage sizeClass={"w-30 h-30"} className="" />
              </Link>

              <h1 className="md:hidden">
                <Link
                  href="/newsletter"
                  className="text-6xl text-white shadow-none link-muted"
                >
                  /newsletter
                </Link>
              </h1>
            </div>

            <div className="space-y-3">
              <h1 className="">
                <Link
                  href="/newsletter"
                  className="hidden text-6xl text-white shadow-none link-muted md:inline-block"
                >
                  /newsletter
                </Link>
              </h1>

              <p className="text-lg text-center text-gray-400 md:text-left">
                Building in public, sharing as I go
              </p>
            </div>
          </div>

          <NewsletterSubscribeForm />
        </header>

        <section className="grid gap-8 md:grid-cols-2">
          {posts.map((post, id) => (
            <Link
              href={post.href as string}
              key={id}
              className={`group relative p-4 space-y-2 border border-transparent hover:border-gray-900/60 hover:shadow-md rounded-md ${
                post.draft === true ? "!border-red-900" : ""
              }`}
            >
              {/* <h4 className="text-sm font-medium tracking-wide uppercase minor">
                Newsletter #{posts.length - id}
              </h4> */}
              <span className="flex items-center gap-2 minor whitespace-nowrap">
                <span className="block leading-none font-mono text-3xl font-semibold text-indigo-400 group-hover:text-white px-2 shadow-indigo group-hover:!shadow-none w-min right-2 bottom-2">
                  #{posts.length - id}
                </span>
                <span className="block">{displayDate(post.date)}</span>
              </span>

              <span className="block text-2xl font-semibold shadow-none group-hover:text-yellow-400 group-hover:shadow-indigo">
                {post.title}
              </span>
            </Link>
          ))}
        </section>
      </main>
    </PageViewTracker>
  );
}
