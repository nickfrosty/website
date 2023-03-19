/* eslint-disable @next/next/no-img-element */
// import { StarIcon } from "@heroicons/react/24/solid";
import { CardComponentProps } from "@@/types";
import clsx from "clsx";
import Link from "next/link";
import { FloatLabel } from "@/components/content/FloatLabel";

export function SmallCard({
  children,
  className,
  post,
  imageFocus = "center",
}: CardComponentProps) {
  return (
    <Link
      href={post?.href ?? "#"}
      className={clsx(
        `p-0 card`,
        className,
        "hover-outline",
        // featured ? "featured-outline" : "",
      )}
    >
      {/* {featured && (
          <span className="absolute z-10">
            <div
              className={clsx(
                "inline-block top-0 p-2 text-gray-900 bg-yellow-500 rounded-tl-lg rounded-br-lg",
              )}
            >
              <StarIcon className="icon-md" />
            </div>
          </span>
        )} */}

      <div className="flex-shrink-0 block w-full bg-gray-900 h-60">
        {/* TODO: onerror load a default image, or remove the image? */}
        {post?.draft === true && <FloatLabel label={"draft"} overlay={true} />}
        {post?.image && (
          <img
            src={post.image}
            className={clsx(
              `object-cover`,
              `object-${imageFocus}`,
              `relative left-0 w-full h-full`,
            )}
            alt={post.title || "[unknown]"}
          />
        )}
      </div>
      <div className="p-5 space-y-3">
        <h2 className="text-2xl font-bold">{post?.title || "[unknown]"}</h2>

        {children || post?.blurb || post?.description ? (
          <p className="text-gray-500">
            {children || post.blurb || post.description}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
