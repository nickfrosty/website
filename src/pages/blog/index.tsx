/* eslint-disable @next/next/no-img-element */
import { getDocsByPath, filterDocs } from "zumo";
import DefaultLayout from "@/layouts/default";
import { BlogCard } from "@/components/cards/BlogCard";
import { useState } from "react";

// construct the meta data for the page
const metaData = {
  title: "Blog",
  baseHref: "/blog",
  description:
    "An anthology of me building in public 👷. Writing down and sharing my thoughts and experiences as I go (plus some other goodies too).",
};

export async function getStaticProps() {
  let posts: PostRecord[] = await getDocsByPath("blog");

  // extract the `featured` posts
  const featured: PostRecord[] = filterDocs(posts, { featured: true }, 2);

  // remove the `featured` from the `posts`
  if (Array.isArray(featured) && featured.length > 0)
    posts = posts?.filter(
      (item) =>
        item.slug !==
        featured.filter((ft) => ft.slug === item?.slug)?.[0]?.meta.slug,
    );

  // give the 404 page when the post is not found
  // if (!posts || !posts?.length) return { notFound: true };

  return {
    props: { posts, featured },
  };
}

type PageProps = {
  posts: PostRecord[];
  featured: PostRecord[];
};

export default function Page({ posts, featured }: PageProps) {
  const [counter, setCounter] = useState(3);

  return (
    <DefaultLayout seo={metaData}>
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
          {posts?.slice(0, counter)?.map((post) => {
            if (!post?.meta) return;
            return <BlogCard {...post.meta} key={post.slug} />;
          })}
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
