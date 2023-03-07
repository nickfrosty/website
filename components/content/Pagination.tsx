/* eslint-disable @next/next/no-img-element */
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { parseTemplate } from "zumo";

type ComponentProps = {
  className?: string;
  children?: React.ReactNode;
  page?: number;
  totalPages?: number;
  baseHref?: string;
  template?: string;
};

export function Pagination({
  page = 1,
  totalPages = 1,
  baseHref = "",
  template = "",
}: ComponentProps) {
  // compute the href for the links
  const href = (id: number) => {
    if (id <= 1) return baseHref;
    return parseTemplate(template, { baseHref, id });
  };

  // compute the next page value
  const nextPage = page + 1;
  const prevPage = page - 1;

  return (
    <section className="justify-center w-full mx-auto space-x-5 text-center flexer">
      {prevPage >= 1 && (
        <Link href={href(prevPage)} className="space-x-3 btn flexer">
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Prev</span>
        </Link>
      )}

      {nextPage <= totalPages && (
        <Link href={href(nextPage)} className={`space-x-3 btn flexer`}>
          <span>Next</span>
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      )}
    </section>
  );
}
