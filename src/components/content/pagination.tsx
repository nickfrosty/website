import Link from "next/link";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { parseTemplate } from "zumo";

export function Pagination({
  page = 1,
  totalPages = 1,
  baseHref = "",
  template = "",
}: PaginationProps) {
  // compute the href for the links
  const href = (id: number) => {
    if (id <= 1) return baseHref;
    return parseTemplate(template ?? "", { baseHref, id });
  };

  // compute the next page value
  const nextPage = page + 1;
  const prevPage = page - 1;

  return (
    <section className="pagination-nav">
      {prevPage >= 1 && (
        <Link href={href(prevPage)} className="pagination-button">
          <ArrowLeftIcon className="h-4 w-4 text-white" />
          <span>Prev</span>
        </Link>
      )}

      {nextPage <= totalPages ? (
        <Link href={href(nextPage)} className="pagination-button">
          <span>Next</span>
          <ArrowRightIcon className="h-4 w-4 text-white" />
        </Link>
      ) : null}
    </section>
  );
}
