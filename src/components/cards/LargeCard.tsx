/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { generateSlug } from "zumo";
import { FloatLabel } from "@/components/content/FloatLabel";
import clsx from "clsx";

export function LargeCard({
  children,
  className,
  title,
  image,
  baseHref = "",
  href = "",
  slug = "",
  description,
  blurb,
  draft,
  actionButton,
  imageFocus = "center",
}: CardComponentProps) {
  // construct the `href` location, when not provided
  if (!href) href = `${baseHref || ""}/${slug || generateSlug(title)}`;

  return (
    <Link
      href={href}
      className={clsx(
        className,
        `justify-between p-0 md:flex card hover-outline`,
      )}
    >
      <div className="flex-shrink-0 overflow-hidden bg-gray-900 sm:max-h-72 md:max-h-80 md:w-1/2 pb-2/3">
        {draft && draft === true && (
          <FloatLabel label={"draft"} overlay={true} />
        )}

        {image ? (
          <img
            src={image}
            className={clsx(
              `object-cover`,
              `object-${imageFocus}`,
              `relative left-0 w-full h-full`,
            )}
            alt={title || "[unknown]"}
          />
        ) : (
          ""
        )}
      </div>
      <div className="flex-grow p-8 space-y-4 md:p-5">
        <h2 className="text-3xl font-bold">{title || "[unknown]"}</h2>
        {children || blurb || description ? (
          <p
            className={`text-gray-500 ${
              actionButton ? "line-clamp-4" : "line-clamp-6"
            }`}
          >
            {(children && children) || blurb || description}
          </p>
        ) : (
          ""
        )}

        {actionButton ? (
          <Link
            href={actionButton?.href || href || ""}
            className="inline-block w-min whitespace-nowrap btn btn-indigo"
          >
            <span>
              {actionButton?.label ||
                (typeof actionButton === "string" && actionButton) ||
                "[unknown]"}
            </span>
            <ArrowRightIcon className="icon-sm" />
          </Link>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
}
