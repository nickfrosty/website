import Link from "next/link";

import { Hash } from "lucide-react";
import { parseTemplate, generateSlug } from "@/lib/formatting";

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
    <Link href={href} className={`tag flexer w-min whitespace-nowrap ${className}`}>
      {icon && <Hash className="mx-auto h-4 w-4" />}
      <span className="">{tag}</span>
    </Link>
  );
}
