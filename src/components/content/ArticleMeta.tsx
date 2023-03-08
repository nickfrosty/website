/* eslint-disable @next/next/no-img-element */
import { displayDate } from "zumo";
import AvatarImage from "../AvatarImage";
import { FloatLabel } from "./FloatLabel";
import { Tag } from "./Tag";

type ComponentProps = {
  className?: string;
  meta: PostMetadata;
  baseHref?: string;
  tagHrefTemplate?: string;
};

export function ArticleMeta({
  meta,
  className = "",
  baseHref = "/",
  tagHrefTemplate,
}: ComponentProps) {
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

        <span className="hidden w-1 h-1 mr-2 bg-gray-500 rounded-full md:block"></span>

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

        {Array.isArray(meta?.tags) && meta.tags?.length > 0 && (
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

type DisplayDateProps = {
  className?: string;
  date?: string;
  updatedAt?: string;
  createdAt?: string;
};

function DisplayDate({
  className = "",
  date,
  updatedAt,
  createdAt,
}: DisplayDateProps) {
  if (date) return <span className={className}>{displayDate(date)}</span>;
  else if (updatedAt && updatedAt !== createdAt)
    return <span className={className}>Updated {displayDate(updatedAt)}</span>;
  else if (!date && createdAt)
    return (
      <span className={className}>Published {displayDate(createdAt)}</span>
    );
  else return <></>;
}
