/* eslint-disable @next/next/no-img-element */
import { CardComponentProps } from "@@/types";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { generateSlug } from "zumo";
import { FloatLabel } from "@/components/content/FloatLabel";
import clsx from "clsx";

export function LargeCard({
  children,
  className,
  post,
  actionButton,
  imageFocus = "center",
}: CardComponentProps) {
  return (
    <Link
      href={post.href ?? "#"}
      className={clsx(
        className,
        `justify-between p-0 md:flex card hover-outline`,
      )}
    >
      <div className="flex-shrink-0 overflow-hidden bg-gray-900 sm:max-h-72 md:max-h-80 md:w-1/2 pb-2/3">
        {post?.draft === true && <FloatLabel label={"draft"} overlay={true} />}

        {!!post?.image && (
          <img
            src={post?.image}
            className={clsx(
              `object-cover`,
              `object-${imageFocus}`,
              `relative left-0 w-full h-full`,
            )}
            alt={post.title || "[unknown]"}
          />
        )}
      </div>
      <div className="flex-grow p-8 space-y-4 md:p-5">
        <h2 className="text-3xl font-bold">{post.title || "[unknown]"}</h2>
        {children || post?.blurb || post?.description ? (
          <p
            className={`text-gray-500 ${
              actionButton ? "line-clamp-4" : "line-clamp-6"
            }`}
          >
            {(children && children) || post.blurb || post.description}
          </p>
        ) : null}

        {actionButton ? (
          <Link
            href={actionButton?.href ?? post.href ?? "#"}
            className="inline-block w-min whitespace-nowrap btn btn-indigo"
          >
            <span>
              {actionButton?.label ||
                (typeof actionButton === "string" && actionButton) ||
                "[unknown]"}
            </span>
            <ArrowRightIcon className="icon-sm" />
          </Link>
        ) : null}
      </div>
    </Link>
  );
}
