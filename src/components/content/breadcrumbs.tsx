import Link from "next/link";

import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

type ComponentProps = {
  className?: string;
  parents?: SimpleLinkItem[];
  includeHome?: boolean;
};

export function Breadcrumbs({ className, parents, includeHome = true }: ComponentProps) {
  // auto add a "Home" record to the breadcrumbs
  if (includeHome) {
    const home: SimpleLinkItem = { href: "/", label: "Home" };

    if (parents?.length) parents.unshift(home);
    else parents = [home];
  }

  return (
    <section className={clsx(`text-base font-medium tracking-wide`, className)}>
      {parents &&
        parents?.length > 0 &&
        parents.map((item, index) => (
          <span key={item.href}>
            <Link href={item.href} className="link-muted">
              {item?.label || item?.title || "Parent"}
            </Link>

            {index < parents.length - 1 && (
              <ChevronDoubleRightIcon className="icon-xs mx-2 inline-block" />
            )}
          </span>
        ))}
    </section>
  );
}
