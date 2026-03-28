import Link from "next/link";

import { displayDate } from "@/lib/formatting";

import AvatarImage from "../avatar-image";
import { FloatLabel } from "./float-label";
import { PageViewCounter } from "./page-view-counter";
import { Tag } from "./tag";

type ComponentProps = {
  className?: string;
  post: FlatPost;
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
      <div className="items-center tracking-wide text-gray-100 md:flex md:space-x-4">
        <Link
          href="https://twitter.com/nickfrosty"
          target="_blank"
          className={"flexer group space-x-3 text-xl font-medium transition"}
        >
          <AvatarImage
            sizeClass={"w-14 h-14"}
            className={"border border-transparent group-hover:border-indigo-400"}
          />
          <span className="group-hover:shadow-indigo group-hover:text-yellow-400">
            Nick Frostbutter
          </span>
        </Link>

        <span className="mr-2 hidden h-1 w-1 rounded-full bg-gray-500 md:block"></span>

        <div className="mt-4 flex items-center space-x-4 md:mt-0 md:justify-between">
          <DisplayDate date={post?.date} updatedAt={post?.updatedAt} />
          {/* <span>{parseInt("456789").toLocaleString()} views</span> */}
          <span className="mr-2 block h-1 w-1 rounded-full bg-gray-500"></span>
          <PageViewCounter route={post.href} />
        </div>
      </div>

      {/* Post tags and `draft` status */}
      <p className="flexer">
        {!!post.draft && <FloatLabel overlay={false} />}

        {Array.isArray(post?.tags) && post.tags?.length > 0 && (
          <>
            {post.tags.map(tag => (
              <Tag key={tag} tag={tag} baseHref={baseHref} hrefTemplate={tagHrefTemplate} />
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

function DisplayDate({ className = "", date, updatedAt, createdAt }: DisplayDateProps) {
  if (date) return <span className={className}>{displayDate(date)}</span>;
  else if (updatedAt && updatedAt !== createdAt)
    return <span className={className}>Updated {displayDate(updatedAt)}</span>;
  else if (!date && createdAt)
    return <span className={className}>Published {displayDate(createdAt)}</span>;
  else return <></>;
}
