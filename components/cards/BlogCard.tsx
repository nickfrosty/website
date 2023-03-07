/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "@/styles/project.module.css";

import { displayDate, generateSlug, parseTemplate } from "zumo";

// load the config/constants file
const config = require("~/zumo.config").content.blog;

export function BlogCard({
  title,
  draft,
  slug,
  tags,
  date,
  href,
}: CardComponentProps) {
  if (draft === true && process?.env?.NODE_ENV !== "development") return;

  if (!href)
    href = parseTemplate(config.hrefTemplate, {
      baseHref: config.baseHref,
      slug: generateSlug(slug || title),
    });

  return (
    <div className={styles.card}>
      <h2 className={styles.h2}>
        <Link
          href={href}
          className="underline-none link-active hover:underline"
        >
          {title}
        </Link>
      </h2>

      <div className="items-center justify-between space-y-4 text-gray-600 md:space-x-5 md:space-y-0 md:flex dark:text-gray-400">
        <div className="block whitespace-nowrap md:inline-block">
          {displayDate(date)}
        </div>

        <div className="line-clamp-1">
          <TagsListing tags={tags} />
        </div>
      </div>
    </div>
  );
}

type TagsListingProps = {
  tags?: string[] | string;
};

/*
  Quick formatter for displaying a single `tag`
*/
function TagsListing({ tags }: TagsListingProps) {
  if (tags && typeof tags == "string") tags = tags.split(",");
  if (!tags || !Array.isArray(tags) || tags.length <= 0) return <></>;

  return (
    <div className="flex">
      {tags.slice(0, config.maxTagCount)?.map((tag) => {
        tag = tag.trim();
        return (
          <span className="cursor-default inline-code" key={tag}>
            {tag}
          </span>
        );
        // this site is not ready to handle blog post `tag` based routing routing (one day...)
        // return (
        //   <Link href={computeHref(tag)} key={tag}>
        //     <a className="inline-code-link">{tag}</a>
        //   </Link>
        // );
      })}
    </div>
  );
}
