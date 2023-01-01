/* eslint-disable @next/next/no-img-element */
import { displayDate, generateSlug, parseTemplate } from "zumo";

import Link from "next/link";
import styles from "~/styles/project.module.css";

// load the config/constants file
const config = require("~/zumo.config").content.blog;

export function BlogCard({
  title,
  draft = null,
  tags = null,
  slug = null,
  date = null,
  href = null,
}) {
  if (draft === true && process?.env?.NODE_ENV !== "development") return;

  if (!href)
    href = parseTemplate(config.hrefTemplate, {
      baseHref: config.baseHref,
      slug: generateSlug(slug || title),
    });

  return (
    <div className={styles.card}>
      <h2 className={styles.h2}>
        <Link href={href}>
          <a className="underline-none link-active hover:underline">{title}</a>
        </Link>
      </h2>

      <div className="justify-between items-center space-y-4 text-gray-600 md:space-x-5 md:space-y-0 md:flex dark:text-gray-400">
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

/*
  Quick formatter for displaying a single `tag`
*/
function TagsListing({ tags }) {
  if (!tags || !Array.isArray(tags) || tags.length <= 0) return;

  return (
    <div className="flex">
      {tags.slice(0, config.maxTagCount)?.map((tag) => {
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
