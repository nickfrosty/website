import { Pagination } from "@/components/content/Pagination";
import { SmallCard } from "@/components/cards/SmallCard";

type ComponentProps = {
  className?: string;
  baseHref: string;
  posts: PostRecord[];
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
            slug={item.slug}
            href={item.href}
            draft={item.meta.draft}
            title={item.meta.title}
            image={item.meta.image}
            description={item.meta.description}
            blurb={item.meta.blurb}
            imageFocus={"center"}
            baseHref={baseHref}
            featured={false}
          />
        )) ?? null}
      </section>

      {pagination && typeof pagination === "object" ? (
        <Pagination {...pagination} />
      ) : null}
    </>
  );
}
