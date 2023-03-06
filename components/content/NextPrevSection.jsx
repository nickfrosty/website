/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

export function NextPrevSection({
  className = "",
  next = null,
  prev = null,
  hrefBase = "",
  icon = true,
}) {
  /*
    NOTE: the Next and Prev pages will use the `slug` and `hrefBase` to compute the 
    page's `href`, not the auto computed (and relative filesystem based `next.href` or `prev.href`)
  */

  return (
    <section className="grid w-full gap-8 md:grid-cols-2">
      {prev && prev?.slug ? (
        <Link
          href={`${hrefBase}/${prev.slug}`}
          className="px-5 py-2 text-white bg-indigo-900 border border-indigo-700 place-self-start rounded-xl w-fit flexer hover:bg-indigo-800"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-4 text-white" />
          <span className="line-clamp-1">
            {prev?.meta?.title || "Previous"}
          </span>
        </Link>
      ) : (
        <div></div>
      )}

      {next && next?.slug ? (
        <Link
          href={`${hrefBase}/${next.slug}`}
          className="self-end justify-end px-5 py-2 text-white bg-indigo-900 border border-indigo-700 place-self-end rounded-xl flexer hover:bg-indigo-800 w-fit"
        >
          <div className="">
            {/* <p className="font-mono text-sm font-semibold uppercase">Next:</p> */}
            <p className="line-clamp-1">{next?.meta?.title || "Next"}</p>
          </div>
          <ArrowRightIcon className="w-4 h-4 ml-4 text-white" />
        </Link>
      ) : (
        <div></div>
      )}
    </section>
  );
}
