import type { DocumentTypes } from "contentlayer/generated";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import styles from "@/styles/pagination.module.css";

type ComponentProps = {
  className?: string;
  next?: DocumentTypes;
  prev?: DocumentTypes;
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
    <section className={styles.nextPrevSection}>
      {prev && prev?.slug ? (
        <Link
          href={`${hrefBase}/${prev.slug}`}
          className={`${styles.button} ${styles.prev}`}
        >
          <ArrowLeftIcon className={styles.svg} />
          <span className="line-clamp-1">{prev?.title || "Previous"}</span>
        </Link>
      ) : (
        <div></div>
      )}

      {next && next?.slug ? (
        <Link
          href={`${hrefBase}/${next.slug}`}
          className={`${styles.button} ${styles.next}`}
        >
          <p className="line-clamp-1">{next?.title || "Next"}</p>
          <ArrowRightIcon className={styles.svg} />
        </Link>
      ) : (
        <div></div>
      )}
    </section>
  );
}
