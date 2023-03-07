/* eslint-disable @next/next/no-img-element */
// import Link from "next/link";
import { SmallCard } from "../cards/SmallCard";

type ComponentProps = {
  className?: string;
  children?: React.ReactNode;
};

export function RelatedArticles({ className = "" }: ComponentProps) {
  return (
    <section className={`mt-8 ${className} card-listing lg:grid-cols-3`}>
      <SmallCard
        title="Example related article"
        href="/articles/derp"
        description="This is the description for this article"
      />
      <SmallCard
        title="Example related article"
        href="/articles/derp"
        description="Another 1 liner for this related article"
      />
      <SmallCard
        title="Example related article"
        href="/articles/derp"
        description="This is the description for this article"
      />
    </section>
  );
}
