/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export function Breadcrumbs({
  parents = null,
  includeHome = true,
  href = null,
  meta = null,
  className = "",
}) {
  if (!href) href = `${parent?.href || ""}/${meta.slug}`;

  if (!Array.isArray(parents) && typeof parents === "object")
    parents = [parents];

  if (includeHome) {
    const home = { href: "/", label: "Home" };

    if (parents?.length) parents.unshift(home);
    else parents = [home];
  }

  return (
    <section className={clsx(`text-base font-bold tracking-wide`, className)}>
      {parents?.length &&
        parents.map((item) => {
          return (
            <span key={item.href}>
              <Link href={item.href}>
                <a className="link-muted">
                  {item?.label || item?.title || "Parent"}
                </a>
              </Link>

              <ChevronDoubleRightIcon className="inline-block mx-2 icon-xs" />
            </span>
          );
        })}

      <Link href={href}>
        <a className="link-muted">
          {meta?.label || meta?.title || "[unknown]"}
        </a>
      </Link>
    </section>
  );
}
