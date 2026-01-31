import type { Metadata } from "next";

import Link from "next/link";

import AvatarImage from "@/components/avatar-image";

// import NowMessageNotice from "@/components/now-message-notice";

export const metadata: Metadata = {
  alternates: {
    canonical: "/now",
  },
  title: "What I'm working on now",
  description:
    "Here are some high level snapshots of what I am working on now. " +
    "From the various side projects, official work projects, and even podcasting.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl space-y-12 text-lg md:space-y-16">
      <div className="mx-auto max-w-xl space-y-8">
        <div className="group mx-auto items-center justify-center md:flex md:space-x-5">
          <div className="mx-auto flex items-center justify-center space-x-5">
            <Link
              href="/now"
              className="rounded-full border-4 border-transparent group-hover:border-indigo-400"
            >
              <AvatarImage sizeClass={"w-30 h-30"} className="" />
            </Link>

            <h1 className="md:hidden">
              <Link href="/now" className="text-6xl text-white hover:text-yellow-400">
                /now
              </Link>
            </h1>
          </div>

          <div className="space-y-3">
            <h1 className="">
              <Link
                href="/now"
                className="hidden text-6xl text-white hover:text-yellow-400 md:inline-block"
              >
                /now
              </Link>
            </h1>

            <p className="text-center md:text-left">
              Here are some high level snapshots of what I am working on right now.
            </p>
          </div>
        </div>

        {/* <NowMessageNotice /> */}
      </div>

      {children}
    </main>
  );
}
