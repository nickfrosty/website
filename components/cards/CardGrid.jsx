import { Pagination } from "~/components/content/Pagination";
import { SmallCard } from "~/components/cards/SmallCard";

export function CardGrid({
  posts = [],
  baseHref,
  className = "",
  pagination = null,
}) {
  return (
    <>
      <section className="card-listing">
        {posts &&
          posts.map((item) => {
            return (
              <SmallCard
                key={`small-${item.slug}`}
                {...item?.meta}
                baseHref={baseHref}
                featured={false}
              />
            );
          })}
      </section>

      {pagination && typeof pagination === "object" && (
        <Pagination {...pagination} />
      )}
    </>
  );
}
