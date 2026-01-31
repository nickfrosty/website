import Link from "next/link";

import { CalendarIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { DateTime } from "luxon";
import { generateSlug } from "zumo";

import { SmallCard } from "@/components/cards/small-card";

type ComponentProps = {
  className?: string;
  children?: React.ReactNode;
  featured?: FlatPost | null;
  metadata: FlatPost;
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
    metadata.href = `${baseHref ?? ""}/${metadata.slug ?? generateSlug(metadata.title)}`;

  return (
    <section className="grid-cols-2 gap-12 space-y-10 md:mb-30 md:grid md:space-y-0">
      <section className="w-full place-content-start space-y-4 place-self-center">
        {heading && <h4 className="text-base font-medium uppercase">{heading}</h4>}
        <h1>
          <Link href={metadata.href ?? "#"} className="link-muted text-6xl first-letter:uppercase">
            {metadata.title || metadata.slug?.toString().replace("-", " ") || "[unknown]"}
          </Link>
        </h1>
        <p className="text-2xl">{metadata.description}</p>

        <p className="flexer space-x-6">
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
              <span className="">{DateTime.fromISO(metadata.date).toRelativeCalendar()}</span>
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
