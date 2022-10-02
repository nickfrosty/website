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

      <div className="flex justify-between items-center mt-4 space-x-5 text-gray-600 dark:text-gray-400">
        <span className="block whitespace-nowrap md:inline-block">
          {displayDate(date)}
        </span>

        <TagsListing tags={tags} />
      </div>
    </div>
  );
}

/*
  Quick formatter for displaying a single `tag`
*/
function TagsListing({ tags }) {
  // split string `tags` into an array
  if (tags && typeof tags === "string")
    tags = tags.split(",").map((tag) => tag.trim());

  // construct a reusable function to compute the `href` for tag links
  // const computeHref = (tag) => {
  //   return parseTemplate(config.tagHrefTemplate, {
  //     baseHref: config.baseHref,
  //     tag: generateSlug(tag),
  //   });
  // };

  return (
    <span>
      {tags?.slice(0, config.maxTagCount)?.map((tag) => {
        return (
          <span className="cursor-default inline-code-link" key={tag}>
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
    </span>
  );
}
