/* eslint-disable @next/next/no-img-element */
import type { DocumentTypes } from "contentlayer/generated";
import { displayDate } from "zumo";
import AvatarImage from "../AvatarImage";
import { FloatLabel } from "./FloatLabel";
import { Tag } from "./Tag";
import Link from "next/link";
import { ViewCounter } from "./ViewCounter";

type ComponentProps = {
  className?: string;
  post: DocumentTypes;
  baseHref?: string;
  tagHrefTemplate?: string;
};

export function ArticleMeta({
  post,
  className = "",
  baseHref = "/",
  tagHrefTemplate,
}: ComponentProps) {
  return (
    <section className={`space-y-4 ${className}`}>
      <div className="items-center tracking-wide text-gray-100 md:space-x-4 md:flex">
        <Link
          href="https://twitter.com/nickfrosty"
          target="_blank"
          className={"transition space-x-3 text-xl font-medium flexer group"}
        >
          <AvatarImage
            sizeClass={"w-14 h-14"}
            className={
              "group-hover:border-indigo-400 border border-transparent"
            }
          />
          <span className="group-hover:shadow-indigo group-hover:text-yellow-400">
            Nick Frostbutter
          </span>
        </Link>

        <span className="hidden w-1 h-1 mr-2 bg-gray-500 rounded-full md:block"></span>

        <div className="flex items-center mt-4 space-x-4 md:justify-between md:mt-0">
          <DisplayDate date={post?.date} updatedAt={post?.updatedAt} />
          {/* <span>{parseInt("456789").toLocaleString()} views</span> */}
          <span className="block w-1 h-1 mr-2 bg-gray-500 rounded-full"></span>
          <ViewCounter slug={post.slug || ""} />
        </div>
      </div>

      {/* Post tags and `draft` status */}
      <p className="flexer">
        {!!post.draft && <FloatLabel overlay={false} />}

        {Array.isArray(post?.tags) && post.tags?.length > 0 && (
          <>
            {post.tags.map((tag) => (
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
