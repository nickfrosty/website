/*
    Global type declarations
*/

// CSS Modules declarations
declare module "*.css" {
  const content: any;
  export default content;
}

type Option<T> = T | undefined;

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

type Params<TKeys extends string = string, TValues = string> = Promise<Record<TKeys, TValues>>;

type SearchParams<TKeys extends string = string, TValues = string> = Promise<
  Record<TKeys, TValues | undefined>
>;

type PagePropsWithSlug<TExtra extends string = never> = {
  params: Params<"slug" | TExtra>;
};

type PagePropsWithSlugAndSearch<TExtra extends string = never, TSearch extends string = string> = {
  params: Params<"slug" | TExtra>;
  searchParams: SearchParams<TSearch>;
};

type NotFoundResponse = { notFound: true };

type SimpleComponentProps = {
  children?: React.ReactNode;
  className?: string;
};

type ImageSize = {
  width: number;
  height: number;
};

// Flattened post type (used by UI components that expect transformed data)
type FlatPost = {
  slug: string;
  href: string;
  title: string;
  date?: string;
  description?: string;
  draft?: boolean;
  featured?: boolean;
  tags?: string[];
  image?: string;
  imageFocus?: "center" | "left" | "right";
  updatedAt?: string;
  nextPage?: string;
  prevPage?: string;
  blurb?: string;
};

type ZumoConfigRecord = {
  baseHref?: string;
  hrefTemplate?: string;
  tagHrefTemplate?: string;
  maxTagCount?: number;
};

type ProjectRecord = {
  title: string;
  description: string;
  url: string;
  logo?: string;
  dateRange: string;
  status: "";
  meta: PostMetadata;
};

type PostRecord = {
  slug: string;
  href: string;
  meta: PostMetadata;
  content: string;
};

type PostMetadata = {
  slug: string;
  href: string;
  title: string;

  date?: string;
  createdAt?: string;
  updatedAt?: string;

  url?: string;
  dateRange?: string;
  status?: string;

  draft?: boolean;
  blurb?: string;
  description?: string;
  logo?: string;
  image?: string;
  coverImage?: string;
  keywords?: string;
  imageFocus?: "left" | "right" | "center";
  nextPage?: string;
  prevPage?: string;
  tags?: string[] | string;
};

// used for SmallCard, and BlogCard
type CardComponentProps = {
  className?: string;
  children?: React.ReactNode;
  baseHref?: string;
  post: FlatPost;
  imageFocus?: "center" | "left" | "right";
  actionButton?: {
    href: string;
    label: string;
  };
};

type SimpleLinkItem = {
  title?: string;
  href: string;
  label: string;
};

type PaginationProps = {
  className?: string;
  children?: React.ReactNode;
  page?: number;
  totalPages?: number;
  baseHref?: string;
  template?: string;
};

type ProsePageProps = {
  post: FlatPost;
  next?: FlatPost;
  prev?: FlatPost;
};
