import { computePagination } from "@@/utils/helpers";

type ContentWithFrontmatter = {
  slug: string;
  href: string;
  frontmatter: {
    title: string;
    draft?: boolean;
    featured?: boolean;
    date?: string;
    description?: string;
    tags?: string[];
    image?: string;
    imageFocus?: "center" | "left" | "right";
    updatedAt?: string;
    nextPage?: string;
    prevPage?: string;
    blurb?: string;
    [key: string]: unknown;
  };
};

/**
 * Filter out draft posts in production
 */
export function filterDrafts<T extends ContentWithFrontmatter>(posts: T[]): T[] {
  return posts.filter(post =>
    process?.env?.NODE_ENV === "development" ? true : post.frontmatter.draft !== true,
  );
}

/**
 * Sort posts by date (desc by default, asc if specified)
 */
export function sortByDate<T extends ContentWithFrontmatter>(
  posts: T[],
  direction: "desc" | "asc" = "desc",
): T[] {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.frontmatter.date ?? "").getTime();
    const dateB = new Date(b.frontmatter.date ?? "").getTime();
    return direction === "desc" ? dateB - dateA : dateA - dateB;
  });
}

/**
 * Transform posts for CardGrid component (flattens frontmatter)
 * Returns FlatPost[] compatible format
 */
export function toCardFormat<T extends ContentWithFrontmatter>(posts: T[]): FlatPost[] {
  return posts.map(p => ({
    slug: p.slug,
    href: p.href,
    title: p.frontmatter.title,
    date: p.frontmatter.date,
    description: p.frontmatter.description,
    draft: p.frontmatter.draft,
    featured: p.frontmatter.featured,
    tags: p.frontmatter.tags,
    image: p.frontmatter.image,
    imageFocus: p.frontmatter.imageFocus,
    updatedAt: p.frontmatter.updatedAt,
    nextPage: p.frontmatter.nextPage,
    prevPage: p.frontmatter.prevPage,
    blurb: p.frontmatter.blurb,
  }));
}

/**
 * Extract featured posts from remaining posts
 * Returns tuple of [featured, remaining]
 */
export function extractFeatured<T extends ContentWithFrontmatter>(
  posts: T[],
  limit: number = 2,
): [T[], T[]] {
  const featured = posts
    .filter(post => post.frontmatter.featured === true && !post.frontmatter.draft)
    .slice(0, limit);

  const remaining = posts.filter(post => !featured.some(f => f.slug === post.slug));

  return [featured, remaining];
}

type PaginationConfig = {
  baseHref: string;
  template: string;
  perPage?: number;
};

type PaginatedResult<T> = {
  posts: T[];
  featured: T[];
  pagination: ReturnType<typeof computePagination>;
};

/**
 * Combined helper for paginated listing pages
 * Filters drafts, sorts by date, extracts featured, and applies pagination
 */
export function getPaginatedContent<T extends ContentWithFrontmatter>(
  allPosts: T[],
  currentPage: string | number = 1,
  config: PaginationConfig,
  options: { includeFeatured?: boolean; featuredLimit?: number } = {},
): PaginatedResult<T> {
  const { includeFeatured = true, featuredLimit = 2 } = options;

  // Filter drafts and sort by date
  let posts = sortByDate(filterDrafts(allPosts));

  // Extract featured posts if needed
  let featured: T[] = [];
  if (includeFeatured) {
    [featured, posts] = extractFeatured(posts, featuredLimit);
  }

  // Compute pagination
  const pagination = computePagination(
    posts.length,
    currentPage,
    config.baseHref,
    config.template,
    config.perPage ?? 9,
  );

  // Slice posts for current page
  const paginatedPosts = posts.slice(pagination.start, pagination.end);

  return {
    posts: paginatedPosts,
    featured,
    pagination,
  };
}

/**
 * Filter posts by tag
 */
export function filterByTag<T extends ContentWithFrontmatter>(posts: T[], tag: string): T[] {
  const normalizedTag = tag.toLowerCase().replace(/\s+/g, "-");

  return posts.filter(({ frontmatter }) => {
    let tags = frontmatter.tags as string | string[] | undefined;
    if (typeof tags === "string") {
      tags = tags.split(",").map(t => t.trim());
    }

    if (Array.isArray(tags)) {
      return tags.some(
        (t: string) =>
          t.toLowerCase() === tag.toLowerCase() ||
          t.toLowerCase().replace(/\s+/g, "-") === normalizedTag,
      );
    }
    return false;
  });
}

/**
 * Filter posts by category
 */
export function filterByCategory<T extends ContentWithFrontmatter>(
  posts: T[],
  category: string,
): T[] {
  return posts.filter(post => post.frontmatter.category === category);
}
