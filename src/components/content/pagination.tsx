import Link from "next/link";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { parseTemplate } from "@/lib/formatting";

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
          <ArrowLeft className="h-4 w-4 text-white" />
          <span>Prev</span>
        </Link>
      )}

      {nextPage <= totalPages ? (
        <Link href={href(nextPage)} className="pagination-button">
          <span>Next</span>
          <ArrowRight className="h-4 w-4 text-white" />
        </Link>
      ) : null}
    </section>
  );
}
