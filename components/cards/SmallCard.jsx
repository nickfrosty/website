/* eslint-disable @next/next/no-img-element */
// import { StarIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import Link from "next/link";
import { generateSlug } from "zumo";
import { FloatLabel } from "../content/FloatLabel";

export function SmallCard({
  draft = null,
  title,
  image = null,
  slug = null,
  baseHref = null,
  href = null,
  featured = false,
  description = null,
  blurb = null,
  children = null,
  className = "",
  imageFocus = "center",
}) {
  // construct the `href` location, when not provided
  if (!href) href = `${baseHref || ""}/${slug || generateSlug(title)}`;

  return (
    <Link href={href || ""}>
      <a
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

        <div className="block flex-shrink-0 w-full h-60 bg-gray-900">
          {/* TODO: onerror load a default image, or remove the image? */}
          {draft && draft === true && (
            <FloatLabel label={"draft"} overlay={true} />
          )}
          {image && (
            <img
              src={image}
              className={clsx(
                `object-cover`,
                `object-${imageFocus}`,
                `relative left-0 w-full h-full`,
              )}
              alt={title || "[unknown]"}
            />
          )}
        </div>
        <div className="p-5 space-y-3">
          <h2 className="text-2xl font-bold">{title || "[unknown]"}</h2>

          {children || blurb || description ? (
            <p className="text-gray-500">{children || blurb || description}</p>
          ) : (
            ""
          )}
        </div>
      </a>
    </Link>
  );
}
