/*
    Primary type definitions for the site
*/

import { Blog } from "contentlayer/generated";

//
type ProjectRecord = {
  title: string;
  description: string;
  url: string;
  logo?: string;
  dateRange: string;
  status: "";
  meta: PostMetadata;
  //   slug: string;
  //   href: string;
  //   title: string;

  //   date?: string;
  //   createdAt?: string;
  //   updatedAt?: string;

  //   url?: string;
  //   dateRange?: string;
  //   status?: string;
  // };
};

//
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

// used for SmallCard, LargeCard, and BlogCard
type CardComponentProps = {
  className?: string;
  children?: React.ReactNode;
  baseHref?: string;
  post: Blog;

  // title: string;
  // href: string;
  // slug?: string;
  // description?: string;
  // draft?: boolean;
  // image?: string;
  // date?: string;
  // tags?: string[] | string;
  // featured?: boolean;
  // blurb?: string;
  imageFocus?: "center" | "left" | "right";
  actionButton?: {
    href: string;
    label: string;
  };
};

//
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
  page?: number;
};

type ProsePageProps = {
  post: PostRecord;
  next?: PostRecord;
  prev?: PostRecord;
};
