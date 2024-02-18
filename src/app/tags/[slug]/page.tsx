import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { computePagination, parseTemplate } from "zumo";
import { allArticleTags, allArticles } from "contentlayer/generated";
import { HeroSection } from "@/components/content/HeroSection";
import { CardGrid } from "@/components/cards/CardGrid";
import { PaginationProps } from "@@/types";

const config = {
  baseHref: "/tags/{{tag}}",
  paginationTemplate: "{{baseHref}}/{{id}}",
};

function preparePage(slug: string, currentPage: number = 1) {
  if (!slug) return notFound();

  // retrieve the current `tag` document, when it exists
  const tagMeta = allArticleTags.filter(
    (item) => item.slug?.toLowerCase().replace(/\s+/g, "-") == slug,
  )?.[0] || {
    _id: slug,
    title: slug,
    href: `/tags/${slug.toLowerCase().replace(/\s+/g, "-")}`,
  };

  // parse and update the `baseHref` to include the current tag
  config.baseHref = parseTemplate(config?.baseHref, {
    baseHref: config.baseHref,
    tag: slug.toLowerCase(),
  });

  // get the listing of `posts` for the current `tag`
  let posts = allArticles
    .filter((post) =>
      process?.env?.NODE_ENV == "development" ? true : !!post.draft,
    )
    .filter(({ tags }) => {
      if (typeof tags == "string") {
        tags = tags.split(",") as any;
      }

      if (Array.isArray(tags)) {
        return tags.find(
          (tag: string) =>
            tag.toLowerCase() == slug.toLocaleLowerCase() ||
            tag.toLowerCase().replace(/\s+/g, "-") ==
              slug.toLocaleLowerCase().replace(/\s+/g, "-"),
        );
      }
    })
    // sort newest to oldest
    .sort(
      (a, b) =>
        new Date(b?.date ?? "").getTime() - new Date(a?.date ?? "").getTime(),
    )
    // strip the `body` to send less data to the client
    .map((post) => {
      // @ts-ignore
      delete post.body.html;
      return post;
    });

  // give the 404 page when no `posts` were found
  if (!(posts && Array.isArray(posts))) {
    return notFound();
  }

  // retrieve the latest and featured articles
  const latestPost = posts?.[0] || false;
  const featured =
    posts.filter((item) => item?.featured === true)?.[0] || latestPost;

  // construct the `pagination` data object
  const pagination =
    computePagination(
      posts.length,
      currentPage,
      config?.baseHref,
      config?.paginationTemplate,
    ) || undefined;

  // remove the `featured` article from the overall `posts` listing
  posts = posts.filter((item) => item.slug !== featured?.slug);

  // chunk out the posts for the current page
  // @ts-ignore
  posts = posts.slice(pagination.start, pagination.end);

  return {
    tagMeta,
    posts,
    featured,
    pagination,
  };
}

type PageProps = {
  params: {
    slug: string;
    page?: number;
  };
};

export function generateStaticParams() {
  const hashmap = new Map();

  allArticles
    .filter((post) => !!post.draft)
    .map(({ tags }) => {
      if (typeof tags == "string") {
        tags = tags.split(",") as any;
      }

      if (Array.isArray(tags)) {
        tags.map((tag: string) => {
          tag = tag.toLowerCase().replace(/\s+/g, "-");
          hashmap.set(tag, tag);
        });
      }
    });

  const slugs: Array<{ slug: string }> = [];
  hashmap.forEach((value, key) =>
    slugs.push({
      slug: value,
    }),
  );

  return slugs;
}

export function generateMetadata({ params: { slug } }: PageProps): Metadata {
  let record = allArticleTags.filter((record) => record.slug == slug)?.[0];

  if (!record) {
    record = {
      title: slug.substring(0, 1).toUpperCase() + slug.substring(1),
      href: `/tags/${slug}`,
    } as any;
    record.title = record.title.replaceAll("-", " ");
  }

  return {
    title: `${record.title} articles`,
    description:
      record.description ||
      `Explore all my articles with written about ${record.title}. They are pretty great :)`,
    alternates: {
      canonical: record.href,
    },
  };
}

export default function Page({ params: { page, slug } }: PageProps) {
  const {
    // comment for better diffs
    tagMeta,
    posts,
    featured,
    pagination,
  } = preparePage(slug, page ?? 1);

  if (!tagMeta) notFound();

  // TODO: support setting a canonical tag, likely via a util function to standardize the data
  // if (!meta?.canonical) meta.canonical = `${href}`;

  return (
    <>
      <HeroSection
        metadata={tagMeta}
        baseHref={config?.baseHref}
        heading="tag"
        featured={featured}
      />

      <CardGrid posts={posts} baseHref={"/articles"} pagination={pagination} />
    </>
  );
}
