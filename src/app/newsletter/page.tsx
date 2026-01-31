import type { Metadata } from "next";
import { getAllBlogs } from "@/lib/content";
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

export default async function Page() {
  const allPosts = await getAllBlogs();

  // get a listing of regular posts (hiding drafts)
  const posts = allPosts
    .filter(
      post =>
        (process?.env?.NODE_ENV == "development" ? true : post.frontmatter.draft !== true) &&
        post.frontmatter.category == "newsletter",
    )
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date ?? "").getTime() - new Date(a.frontmatter.date ?? "").getTime(),
    );

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
                Building in public, sharing as I go.
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
                <span className="bottom-2 right-2 block w-min px-2 font-mono text-3xl font-semibold leading-none text-indigo-400 shadow-indigo group-hover:text-white group-hover:!shadow-none">
                  #{posts.length - id}
                </span>
                <span className="block">{displayDate(post.frontmatter.date)}</span>
              </span>

              <span className="block text-2xl font-semibold shadow-none group-hover:text-yellow-400 group-hover:shadow-indigo">
                {post.frontmatter.title}
              </span>
            </Link>
          ))}
        </section>
      </main>
    </PageViewTracker>
  );
}
