import { SmallCard } from "@/components/cards/small-card";
import { Pagination } from "@/components/content/pagination";

type ComponentProps = {
  className?: string;
  baseHref: string;
  posts: FlatPost[];
  pagination?: PaginationProps;
};

export function CardGrid({ className, baseHref, pagination, posts = [] }: ComponentProps) {
  return (
    <>
      <section className="card-listing">
        {posts?.map(item => (
          <SmallCard
            key={`small-${item.slug}`}
            post={item}
            imageFocus={"center"}
            baseHref={baseHref}
          />
        )) ?? null}
      </section>

      {pagination && typeof pagination === "object" ? <Pagination {...pagination} /> : null}
    </>
  );
}
