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
        `p-0 card group`,
        className,
        "hover-outline",
        // featured ? "featured-outline" : "",
      )}
    >
      {/* {featured && (
          <span className="absolute z-10">
            <div
              className={clsx(
                "inline-block top-0 p-2 text-gray-900 bg-yellow-400 rounded-tl-lg rounded-br-lg",
              )}
            >
              <StarIcon className="icon-md" />
            </div>
          </span>
        )} */}

      <div className="flex-shrink-0 block w-full bg-gray-900 aspect-video">
        {/* TODO: onerror load a default image, or remove the image? */}
        {!!post.draft && <FloatLabel label={"draft"} overlay={true} />}
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
        <h3 className="text-2xl font-bold">
          <span className="">{post?.title || "[unknown]"}</span>
        </h3>

        {children || post?.blurb || post?.description ? (
          <p className="text-gray-500 group-hover:text-gray-100">
            {children || post.blurb || post.description}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
