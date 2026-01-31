import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { computePagination, parseTemplate } from "zumo";

import { CardGrid } from "@/components/cards/card-grid";
import { HeroSection } from "@/components/content/hero-section";
import { PageViewTracker } from "@/components/content/page-view-tracker";
import { getAllTags, getAllArticles } from "@/lib/content";

const config = {
  baseHref: "/tags/{{tag}}",
  paginationTemplate: "{{baseHref}}/{{id}}",
};

async function preparePage(slug: string, currentPage: number = 1) {
  if (!slug) return notFound();

  const allTags = await getAllTags();
  const allPosts = await getAllArticles();

  // retrieve the current `tag` document, when it exists
  const tagMeta = allTags.filter(
    item => item.slug?.toLowerCase().replace(/\s+/g, "-") == slug,
  )?.[0] || {
    _id: slug,
    frontmatter: {
      title: slug,
    },
    href: `/tags/${slug.toLowerCase().replace(/\s+/g, "-")}`,
  };

  // parse and update the `baseHref` to include the current tag
  const baseHref = parseTemplate(config?.baseHref, {
    baseHref: config.baseHref,
    tag: slug.toLowerCase(),
  });

  // get the listing of `posts` for the current `tag`
  let posts = allPosts
    .filter(post => (process?.env?.NODE_ENV == "development" ? true : !post.frontmatter.draft))
    .filter(({ frontmatter }) => {
      let tags = frontmatter.tags;
      if (typeof tags == "string") {
        tags = (tags as string).split(",").map(t => t.trim());
      }

      if (Array.isArray(tags)) {
        return tags.find(
          (tag: string) =>
            tag.toLowerCase() == slug.toLocaleLowerCase() ||
            tag.toLowerCase().replace(/\s+/g, "-") == slug.toLocaleLowerCase().replace(/\s+/g, "-"),
        );
      }
    })
    // sort newest to oldest
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date ?? "").getTime() - new Date(a.frontmatter.date ?? "").getTime(),
    );

  // give the 404 page when no `posts` were found
  if (!(posts && Array.isArray(posts))) {
    return notFound();
  }

  // retrieve the latest and featured articles
  const latestPost = posts?.[0] || false;
  const featured = posts.filter(item => item.frontmatter.featured === true)?.[0] || latestPost;

  // construct the `pagination` data object
  const pagination =
    computePagination(posts.length, currentPage, baseHref, config?.paginationTemplate) || undefined;

  // remove the `featured` article from the overall `posts` listing
  posts = posts.filter(item => item.slug !== featured?.slug);

  // chunk out the posts for the current page
  // @ts-ignore
  posts = posts.slice(pagination.start, pagination.end);

  return {
    tagMeta,
    posts,
    featured,
    pagination,
    baseHref,
  };
}

type PageProps = {
  params: Promise<{
    slug: string;
    page?: number;
  }>;
};

export async function generateStaticParams() {
  const allPosts = await getAllArticles();
  const hashmap = new Map();

  allPosts
    .filter(post => !post.frontmatter.draft)
    .map(({ frontmatter }) => {
      let tags = frontmatter.tags;
      if (typeof tags == "string") {
        tags = (tags as string).split(",").map(t => t.trim());
      }

      if (Array.isArray(tags)) {
        tags.map((tag: string) => {
          tag = tag.toLowerCase().replace(/\s+/g, "-");
          hashmap.set(tag, tag);
        });
      }
    });

  const slugs: Array<{ slug: string }> = [];
  hashmap.forEach(value =>
    slugs.push({
      slug: value,
    }),
  );

  return slugs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const allTags = await getAllTags();
  let record = allTags.filter(record => record.slug == slug)?.[0];

  if (!record) {
    const title = slug.substring(0, 1).toUpperCase() + slug.substring(1).replaceAll("-", " ");
    return {
      title: `${title} articles`,
      description: `Explore all my articles with written about ${title}. They are pretty great :)`,
      alternates: {
        canonical: `/tags/${slug}`,
      },
    };
  }

  return {
    title: `${record.frontmatter.title} articles`,
    description:
      record.frontmatter.description ||
      `Explore all my articles with written about ${record.frontmatter.title}. They are pretty great :)`,
    alternates: {
      canonical: record.href,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { page, slug } = await params;
  const result = await preparePage(slug, page ?? 1);

  if (!result || !result.tagMeta) return notFound();

  const { tagMeta, posts, featured, pagination, baseHref } = result;

  // Transform posts for CardGrid (expects old format)
  const transformedPosts = posts.map(p => ({
    ...p.frontmatter,
    slug: p.slug,
    href: p.href,
  }));

  const transformedFeatured = featured
    ? {
        ...featured.frontmatter,
        slug: featured.slug,
        href: featured.href,
      }
    : null;

  const transformedTagMeta = {
    ...tagMeta.frontmatter,
    slug: tagMeta.slug || slug,
    href: tagMeta.href,
  };

  return (
    <PageViewTracker>
      <HeroSection
        metadata={transformedTagMeta}
        baseHref={baseHref}
        heading="tag"
        featured={transformedFeatured}
      />

      <CardGrid posts={transformedPosts} baseHref={"/articles"} pagination={pagination} />
    </PageViewTracker>
  );
}
