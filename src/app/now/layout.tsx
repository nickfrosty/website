import type { Metadata } from "next";
import Link from "next/link";
import AvatarImage from "@/components/AvatarImage";
// import NowMessageNotice from "@/components/NowMessageNotice";

export const metadata: Metadata = {
  alternates: {
    canonical: "/now",
  },
  title: "What I'm working on now",
  description:
    "I am always working on various projects. Here are some high level " +
    "snapshots of what I am working on now.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-3xl mx-auto space-y-12 text-lg md:space-y-16">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="items-center justify-center mx-auto md:flex md:space-x-5">
          <div className="flex items-center justify-center mx-auto space-x-5">
            <Link href="/now">
              <AvatarImage sizeClass={"w-30 h-30"} />
            </Link>

            <Link href="/now">
              <h1 className="text-6xl font-bold md:hidden">/now</h1>
            </Link>
          </div>

          <div className="space-y-3">
            <Link href="/now" className="hidden text-6xl font-bold md:block">
              <h1 className="">/now</h1>
            </Link>

            <p className="">
              Here are some high level snapshots of what I am working on right
              now.
            </p>
          </div>
        </div>

        {/* <NowMessageNotice /> */}
      </div>

      {children}
    </main>
  );
}
