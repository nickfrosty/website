/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import clsx from "clsx";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

type ComponentProps = {
  className?: string;
  href: string;
  meta: PostMetadata;
  parents?: SimpleLinkItem[];
  includeHome?: boolean;
};

export function Breadcrumbs({
  className,
  parents,
  includeHome = true,
  href,
  meta,
}: ComponentProps) {
  // if (!href) href = `${parent?.href || ""}/${meta.slug}`;

  // if (!Array.isArray(parents) && typeof parents === "object")
  //   parents = [parents];

  // auto add a "Home" record to the breadcrumbs
  if (includeHome) {
    const home = { href: "/", label: "Home" };

    if (parents?.length) parents.unshift(home);
    else parents = [home];
  }

  return (
    <section className={clsx(`text-base font-bold tracking-wide`, className)}>
      {parents &&
        parents?.length > 0 &&
        parents.map((item) => {
          return (
            <span key={item.href}>
              <Link href={item.href} className="link-muted">
                {item?.label || item?.title || "Parent"}
              </Link>

              <ChevronDoubleRightIcon className="inline-block mx-2 icon-xs" />
            </span>
          );
        })}

      <Link href={href} className="link-muted">
        {meta?.title || "[unknown]"}
      </Link>
    </section>
  );
}
