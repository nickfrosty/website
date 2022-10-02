/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";

export function NextPrevSection({
  className = "",
  next = null,
  prev = null,
  hrefBase = "",
  icon = true,
}) {
  return (
    <section className="md:grid-cols-2 grid gap-8 w-full">
      {prev && prev?.title ? (
        <Link href={`${hrefBase}/${prev.slug}`}>
          <a className="w-fit flexer hover:bg-indigo-800 place-self-start px-5 py-2 text-white bg-indigo-900 rounded-xl border border-indigo-700">
            <ArrowLeftIcon className="mr-4 w-4 h-4 text-white" />
            <span className="line-clamp-1">{prev.title}</span>
          </a>
        </Link>
      ) : (
        <div></div>
      )}

      {next && next?.title ? (
        <Link href={`${hrefBase}/${next.slug}`}>
          <a className="flexer hover:bg-indigo-800 w-fit justify-end self-end place-self-end px-5 py-2 text-white bg-indigo-900 rounded-xl border border-indigo-700">
            <div className="">
              {/* <p className="font-mono text-sm font-semibold uppercase">Next:</p> */}
              <p className="line-clamp-1">{next.title}</p>
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
