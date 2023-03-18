/* eslint-disable @next/next/no-img-element */
import { NextSeoProps } from "next-seo";
import DefaultLayout from "@/layouts/default";

import { Blog, allBlogs } from "contentlayer/generated";
import { BlogCard } from "@/components/cards/BlogCard";
import { useState } from "react";

// construct the seo meta data for the page
const seo: NextSeoProps = {
  title: "Blog",
  description:
    "An anthology of me building in public 👷. Writing down and sharing my thoughts and experiences as I go (plus some other goodies too).",
};

export async function getStaticProps() {
  // get a listing of regular posts (hiding drafts)
  const posts = allBlogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter((post) =>
      process?.env?.NODE_ENV == "development" ? true : post.draft !== true,
    );

  // get a listing of featured posts
  // const featured = allBlogs
  //   .filter((post) => post.draft !== false && post.featured === true)
  //   .slice(0, 2);

  return {
    props: { posts },
  };
}

type PageProps = {
  posts: Blog[];
  featured: Blog[];
};

export default function Page({ posts, featured }: PageProps) {
  const [counter, setCounter] = useState(3);

  return (
    <DefaultLayout seo={seo}>
      <main className="max-w-3xl px-3 mx-auto space-y-8">
        <header className="max-w-xl mx-auto space-y-8 text-center">
          {/* <h1 className="mb-2 text-6xl heading">BLOG</h1> */}
          <p className="text-2xl">
            I like to build things 👷
            <br />
            and share my experiences about those things
            <br />
            <span className="text-lg">(and other goodies too)</span>
          </p>
        </header>

        <section className="space-y-10">
          {posts.slice(0, counter).map((post) => (
            <BlogCard key={post.href} post={post} />
          ))}
        </section>

        {counter < posts.length && (
          <section className="">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCounter(counter + 5);
              }}
              className="block w-full btn"
            >
              Load More Posts
            </button>
          </section>
        )}
      </main>
    </DefaultLayout>
  );
}
