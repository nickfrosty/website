/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { generateSlug } from "zumo";

import {
  CalendarIcon,
  DocumentTextIcon,
  // HeartIcon,
} from "@heroicons/react/24/outline";
import { SmallCard } from "~/components/cards/SmallCard";
import { DateTime } from "luxon";

type ComponentProps = {
  className?: string;
  children?: React.ReactNode;
  featured?: PostRecord;

  heading?: string;
  draft?: string;
  title?: string;
  image?: string;
  slug?: string;
  baseHref?: string;
  href?: string;
  description?: string;
  blurb?: string;
  publishDate?: string;
  count?: string;
  countLabel?: string;
  imageFocus: "center";
};

export function HeroSection({
  className,
  children,
  featured,
  heading,
  draft,
  title,
  image,
  slug,
  baseHref,
  href,
  description,
  blurb,
  count,
  publishDate,
  imageFocus = "center",
  countLabel = "articles",
}: ComponentProps) {
  // construct the `href` location, when not provided
  if (!href) href = `${baseHref || ""}/${slug || generateSlug(title)}`;

  return (
    <section className="grid-cols-2 gap-12 space-y-10 md:space-y-0 md:grid md:mb-30">
      <section className="w-full space-y-6 place-content-start place-self-center">
        {heading && (
          <h4 className="text-sm font-semibold uppercase">{heading}</h4>
        )}
        <h1 className="text-6xl font-semibold first-letter:uppercase">
          <Link href={href}>
            {title || slug?.toString().replace("-", " ") || "[unknown]"}
          </Link>
        </h1>
        <p className="text-2xl">{description}</p>

        <p className="space-x-6 flexer">
          {count && (
            <span className="flexer-spacer">
              <DocumentTextIcon className="icon-md" />
              <span className="">
                {parseInt(count).toLocaleString()} {countLabel}
              </span>
            </span>
          )}

          {publishDate && (
            <span className="flexer-spacer">
              <CalendarIcon className="icon-md" />
              <span className="">
                {DateTime.fromISO(publishDate).toRelativeCalendar()}
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
      {featured && featured?.meta && (
        <section className="w-full place-content-start place-self-center">
          <SmallCard {...featured.meta} baseHref={"/articles"} />
        </section>
      )}
    </section>
  );
}
