import type { Metadata } from "next";

import Link from "next/link";

import { displayDate } from "@/lib/formatting";

import AvatarImage from "@/components/avatar-image";
import { PageViewTracker } from "@/components/content/page-view-tracker";
import { NewsletterSubscribeForm } from "@/components/newsletter/newsletter-subscribe-form";
import { getAllBlogs, filterDrafts, sortByDate, filterByCategory } from "@/lib/content";

export const metadata: Metadata = {
  alternates: {
    canonical: "/newsletter",
  },
  title: `Newsletter`,
  description:
    "Shipping products, building startups, and sharing it all in public. " +
    "Tech insights and real lessons from the journey of creating software and businesses.",
};

export default async function Page() {
  const allPosts = await getAllBlogs();
  const posts = sortByDate(filterByCategory(filterDrafts(allPosts), "newsletter"));

  return (
    <PageViewTracker>
      <main className="mx-auto max-w-5xl space-y-10 md:space-y-20">
        <header className="grid items-center justify-between gap-8 md:flex">
          <div className="group flex-shrink items-center justify-between md:flex md:space-x-4">
            <div className="mx-auto flex items-center justify-center">
              <Link
                href="/newsletter"
                className="rounded-full border-4 border-transparent group-hover:border-indigo-400"
              >
                <AvatarImage sizeClass={"size-20 md:size-30"} className="" />
              </Link>

              <h1 className="md:hidden">
                <Link
                  href="/newsletter"
                  className="link-muted text-4xl text-white shadow-none md:text-6xl"
                >
                  /newsletter
                </Link>
              </h1>
            </div>

            <div className="space-y-3">
              <h1 className="">
                <Link
                  href="/newsletter"
                  className="link-muted hidden text-6xl text-white shadow-none md:inline-block"
                >
                  /newsletter
                </Link>
              </h1>

              <p className="text-center text-lg text-gray-400 md:text-left">
                Dev logs, building in public, and tech things. ~5min read.
              </p>
            </div>
          </div>

          <NewsletterSubscribeForm />
        </header>

        <section className="grid gap-8 md:grid-cols-2">
          {posts.map((post, id) => (
            <Link
              href={post.href}
              key={id}
              className={`group relative space-y-2 rounded-md border border-transparent p-4 hover:border-gray-900/60 hover:shadow-md ${
                post.frontmatter.draft === true ? "!border-red-900" : ""
              }`}
            >
              {/* <h4 className="text-sm font-medium tracking-wide uppercase minor">
                Newsletter #{posts.length - id}
              </h4> */}
              <span className="minor flex items-center gap-2 whitespace-nowrap">
                <span className="shadow-indigo right-2 bottom-2 block w-min px-2 font-mono text-3xl leading-none font-semibold text-indigo-400 group-hover:text-white group-hover:!shadow-none">
                  #{posts.length - id}
                </span>
                <span className="block">{displayDate(post.frontmatter.date)}</span>
              </span>

              <span className="group-hover:shadow-indigo block text-2xl font-semibold shadow-none group-hover:text-yellow-400">
                {post.frontmatter.title}
              </span>
            </Link>
          ))}
        </section>
      </main>
    </PageViewTracker>
  );
}
