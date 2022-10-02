/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import Image from "next/image";
import { displayDate } from "zumo";
import { FloatLabel } from "./FloatLabel";
import { Tag } from "./Tag";

export function ArticleMeta({
  meta = null,
  className = "",
  baseHref = "/",
  tagHrefTemplate = undefined,
}) {
  return (
    <section className={`space-y-3 ${className}`}>
      <p className="items-center tracking-wider text-gray-500 md:space-x-4 md:flex">
        <a
          href="https://twitter.com/nickfrosty"
          target="_blank"
          rel="noreferrer"
          className={clsx("space-x-3 font-mono link flexer", "no-underline")}
        >
          <Image
            className="place-self-center avatar"
            src="/img/nick.jpg"
            width={48}
            height={48}
            alt={"Nick Frostbutter"}
          />
          <span>Nick Frostbutter</span>
        </a>

        <div className="mt-4 md:mt-0 flexer">
          <span className="hidden mr-2 w-1 h-1 bg-gray-500 rounded-full md:block"></span>

          <DisplayDate
            date={meta?.date}
            updatedAt={meta?.updatedAt}
            createdAt={meta?.createdAt}
          />
        </div>
      </p>

      {/* Post tags and `draft` status */}
      <p className="flexer">
        {meta?.draft === true && <FloatLabel overlay={false} />}

        {meta?.tags?.length && Array.isArray(meta.tags) && (
          <>
            {meta.tags.map((tag) => (
              <Tag
                key={tag}
                tag={tag}
                baseHref={baseHref}
                hrefTemplate={tagHrefTemplate}
              />
            ))}
          </>
        )}
      </p>
    </section>
  );
}

function DisplayDate({ date = null, updatedAt = null, createdAt = null }) {
  if (date) return <span className="">{displayDate(date)}</span>;
  else if (date && updatedAt && updatedAt !== createdAt)
    return <span className="">Updated {displayDate(updatedAt)}</span>;
  else if (!date && createdAt)
    return <span className="">Published {displayDate(createdAt)}</span>;
  else return;
}
