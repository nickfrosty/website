import type { Article, Blog } from "contentlayer/generated";

import { Pagination } from "@/components/content/Pagination";
import { SmallCard } from "@/components/cards/SmallCard";

type ComponentProps = {
  className?: string;
  baseHref: string;
  posts: Blog[] | Article[];
  pagination: object;
};

export function CardGrid({
  className,
  baseHref,
  pagination,
  posts = [],
}: ComponentProps) {
  return (
    <>
      <section className="card-listing">
        {posts?.map((item) => (
          <SmallCard
            key={`small-${item.slug}`}
            post={item}
            imageFocus={"center"}
            baseHref={baseHref}
          />
        )) ?? null}
      </section>

      {pagination && typeof pagination === "object" ? (
        <Pagination {...pagination} />
      ) : null}
    </>
  );
}
