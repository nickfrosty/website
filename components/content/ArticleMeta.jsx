/* eslint-disable @next/next/no-img-element */
import { displayDate } from "zumo";
import AvatarImage from "../AvatarImage";
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
      <div className="items-center font-mono tracking-wide text-gray-500 md:space-x-4 md:flex">
        <a
          href="https://twitter.com/nickfrosty"
          target="_blank"
          rel="noreferrer"
          className={"space-x-3 text-lg md:text-base reverse-link flexer"}
          style={{ textDecoration: "none" }}
        >
          <AvatarImage sizeClass={"w-12 h-12"} />
          <span>Nick Frostbutter</span>
        </a>

        <span className="hidden mr-2 w-1 h-1 bg-gray-500 rounded-full md:block"></span>

        <div className="justify-between mt-4 md:mt-0 flexer">
          <DisplayDate
            date={meta?.date}
            updatedAt={meta?.updatedAt}
            createdAt={meta?.createdAt}
          />
          {/* <span>{parseInt("456789").toLocaleString()} views</span> */}
        </div>
      </div>

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

function DisplayDate({
  date = null,
  updatedAt = null,
  createdAt = null,
  className = "",
}) {
  if (date) return <span className={className}>{displayDate(date)}</span>;
  else if (date && updatedAt && updatedAt !== createdAt)
    return <span className={className}>Updated {displayDate(updatedAt)}</span>;
  else if (!date && createdAt)
    return (
      <span className={className}>Published {displayDate(createdAt)}</span>
    );
  else return;
}
