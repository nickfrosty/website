import Link from "next/link";
import { HashtagIcon } from "@heroicons/react/24/solid";
import { parseTemplate, generateSlug } from "zumo";

export function Tag({
  className = "",
  tag = "",
  icon = true,
  href = null,
  baseHref = "/",
  hrefTemplate = `/tags/{{tag}}`,
}) {
  tag = tag.trim();

  // create the actual href location (when not already provided)
  if (!href)
    href = parseTemplate(hrefTemplate, {
      baseHref,
      tag: encodeURIComponent(generateSlug(tag)),
    });

  if (tag) {
    return (
      <Link href={href}>
        <a>
          <span
            className={`w-min font-semibold whitespace-nowrap tag flexer ${className}`}
          >
            {icon && <HashtagIcon className="mx-auto w-4 h-4" />}
            <span>{tag}</span>
          </span>
        </a>
      </Link>
    );
  }
}
