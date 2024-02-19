import Link from "next/link";
import { HashtagIcon } from "@heroicons/react/24/solid";
import { parseTemplate, generateSlug } from "zumo";

type ComponentProps = {
  className?: string;
  tag: string;
  icon?: boolean;
  href?: string;
  baseHref?: string;
  hrefTemplate?: string;
};

export function Tag({
  className = "",
  tag = "",
  icon = true,
  href,
  baseHref = "/",
  hrefTemplate = `/tags/{{tag}}`,
}: ComponentProps) {
  tag = tag.trim();

  // create the actual href location (when not already provided)
  if (!href)
    href = parseTemplate(hrefTemplate, {
      baseHref,
      tag: encodeURIComponent(generateSlug(tag)),
    }) as string;

  return (
    <Link
      href={href}
      className={`w-min  whitespace-nowrap tag flexer ${className}`}
    >
      {icon && <HashtagIcon className="w-4 h-4 mx-auto" />}
      <span className="">{tag}</span>
    </Link>
  );
}
