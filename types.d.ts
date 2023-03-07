/*
    Primary type definitions for the site
*/

//
type ProjectRecord = {
  title: string;
  description: string;
  url: string;
  logo?: string;
  dateRange: string;
  status: "";
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

  date?: string;
  createdAt?: string;
  updatedAt?: string;

  draft?: boolean;
  title: string;
  blurb?: string;
  description?: string;
  image?: string;
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
  title: string;
  href: string;
  slug?: string;
  description?: string;
  draft?: boolean;
  image?: string;
  date?: string;
  tags?: string[] | string;
  featured?: boolean;
  blurb?: string;
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
