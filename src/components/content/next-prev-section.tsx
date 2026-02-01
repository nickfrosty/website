import Link from "next/link";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

type ComponentProps = {
  className?: string;
  next?: FlatPost;
  prev?: FlatPost;
  hrefBase?: string;
  icon?: boolean;
};

export function NextPrevSection({
  className,
  next,
  prev,
  hrefBase = "",
  icon = true,
}: ComponentProps) {
  /*
    NOTE: the Next and Prev pages will use the `slug` and `hrefBase` to compute the
    page's `href`, not the auto computed (and relative filesystem based `next.href` or `prev.href`)
  */

  return (
    <section className="next-prev-section">
      {prev && prev?.slug ? (
        <Link href={`${hrefBase}/${prev.slug}`} className="pagination-button prev">
          <ArrowLeftIcon className="h-4 w-4 text-white" />
          <span className="line-clamp-1">{prev?.title || "Previous"}</span>
        </Link>
      ) : (
        <div></div>
      )}

      {next && next?.slug ? (
        <Link href={`${hrefBase}/${next.slug}`} className="pagination-button next">
          <p className="line-clamp-1">{next?.title || "Next"}</p>
          <ArrowRightIcon className="h-4 w-4 text-white" />
        </Link>
      ) : (
        <div></div>
      )}
    </section>
  );
}
