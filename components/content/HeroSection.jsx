/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { generateSlug } from "zumo";

import {
  CalendarIcon,
  DocumentTextIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { SmallCard } from "~/components/cards/SmallCard";
import { DateTime } from "luxon";

export function HeroSection({
  className = "",
  featured = null,
  heading = null,
  draft = null,
  title = null,
  image = null,
  slug = null,
  baseHref = null,
  href = null,
  description = null,
  blurb = null,
  children = null,
  imageFocus = "center",
  count = null,
  countLabel = "articles",
  publishDate = null,
}) {
  // construct the `href` location, when not provided
  if (!href) href = `${baseHref || ""}/${slug || generateSlug(title)}`;

  return (
    <section className="grid grid-cols-2 gap-12 mb-30">
      <section className="place-content-start place-self-center space-y-6 w-full">
        {heading && (
          <h4 className="text-sm font-semibold uppercase">{heading}</h4>
        )}
        <h1 className="text-6xl font-semibold first-letter:uppercase">
          <Link href={href}>
            <a>{title || slug?.toString().replace("-", " ") || "[unknown]"}</a>
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
        <section className="place-content-start place-self-center w-full">
          <SmallCard {...featured.meta} baseHref={"/articles"} />
        </section>
      )}
    </section>
  );
}
