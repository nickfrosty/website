/* eslint-disable @next/next/no-img-element */
import { PaginationProps } from "@@/types";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { parseTemplate } from "zumo";
import styles from "@/styles/pagination.module.css";

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
    <section className={styles.pagination}>
      {prevPage >= 1 && (
        <Link href={href(prevPage)} className={styles.button}>
          <ArrowLeftIcon className={styles.svg} />
          <span>Prev</span>
        </Link>
      )}

      {nextPage <= totalPages ? (
        <Link href={href(nextPage)} className={styles.button}>
          <span>Next</span>
          <ArrowRightIcon className={styles.svg} />
        </Link>
      ) : null}
    </section>
  );
}
