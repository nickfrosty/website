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
    <section className="grid gap-8 w-full md:grid-cols-2">
      {prev && prev?.slug ? (
        <Link href={`${hrefBase}/${prev.slug}`}>
          <a className="place-self-start px-5 py-2 text-white bg-indigo-900 rounded-xl border border-indigo-700 w-fit flexer hover:bg-indigo-800">
            <ArrowLeftIcon className="mr-4 w-4 h-4 text-white" />
            <span className="line-clamp-1">
              {prev?.meta?.title || "Previous"}
            </span>
          </a>
        </Link>
      ) : (
        <div></div>
      )}

      {next && next?.slug ? (
        <Link href={`${hrefBase}/${next.slug}`}>
          <a className="justify-end self-end place-self-end px-5 py-2 text-white bg-indigo-900 rounded-xl border border-indigo-700 flexer hover:bg-indigo-800 w-fit">
            <div className="">
              {/* <p className="font-mono text-sm font-semibold uppercase">Next:</p> */}
              <p className="line-clamp-1">{next?.meta?.title || "Next"}</p>
            </div>
            <ArrowRightIcon className="ml-4 w-4 h-4 text-white" />
          </a>
        </Link>
      ) : (
        <div></div>
      )}
    </section>
  );
}
