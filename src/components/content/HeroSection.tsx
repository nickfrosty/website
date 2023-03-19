/* eslint-disable @next/next/no-img-element */
import type { Article, ArticleTag } from "contentlayer/generated";

import Link from "next/link";
import { DateTime } from "luxon";
import { generateSlug } from "zumo";
import { SmallCard } from "@/components/cards/SmallCard";
import {
  CalendarIcon,
  DocumentTextIcon,
  // HeartIcon,
} from "@heroicons/react/24/outline";

type ComponentProps = {
  className?: string;
  children?: React.ReactNode;
  featured?: Article;
  metadata: ArticleTag;
  heading?: string;
  baseHref?: string;
  count?: string;
  countLabel?: string;
};

export function HeroSection({
  className,
  children,
  featured,
  metadata,
  heading,
  baseHref,
  count,
  countLabel = "articles",
}: ComponentProps) {
  // construct the `href` location, when not provided
  if (!metadata.href)
    metadata.href = `${baseHref ?? ""}/${
      metadata.slug ?? generateSlug(metadata.title)
    }`;

  return (
    <section className="grid-cols-2 gap-12 space-y-10 md:space-y-0 md:grid md:mb-30">
      <section className="w-full space-y-6 place-content-start place-self-center">
        {heading && (
          <h4 className="text-sm font-semibold uppercase">{heading}</h4>
        )}
        <h1 className="text-6xl font-semibold first-letter:uppercase">
          <Link href={metadata.href ?? "#"}>
            {metadata.title ||
              metadata.slug?.toString().replace("-", " ") ||
              "[unknown]"}
          </Link>
        </h1>
        <p className="text-2xl">{metadata.description}</p>

        <p className="space-x-6 flexer">
          {count && (
            <span className="flexer-spacer">
              <DocumentTextIcon className="icon-md" />
              <span className="">
                {parseInt(count).toLocaleString()} {countLabel}
              </span>
            </span>
          )}

          {metadata?.date && (
            <span className="flexer-spacer">
              <CalendarIcon className="icon-md" />
              <span className="">
                {DateTime.fromISO(metadata.date).toRelativeCalendar()}
              </span>
            </span>
          )}

          {/* <span className="flexer-spacer">
            <HeartIcon className="icon-md" />
            <span className="">9 likes</span>
          </span> */}
        </p>
      </section>

      {/* featured / image area */}
      {!!featured && (
        <section className="w-full place-content-start place-self-center">
          <SmallCard post={featured} baseHref={"/articles"} />
        </section>
      )}
    </section>
  );
}
