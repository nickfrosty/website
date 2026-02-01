import Link from "next/link";

import AppNav from "@/components/core/app-nav";

type ComponentProps = {
  className?: string;
};

export default function AppHeader({}: ComponentProps) {
  return (
    <>
      <AppNav />

      <div className="text-center">
        <div className="my-8 pt-6 text-4xl font-bold tracking-tight text-indigo-500 sm:text-5xl md:text-6xl">
          <Link href="/" className="">
            Nick Frostbutter
          </Link>
        </div>
      </div>

      <div
        id="header-divider"
        className="my-4 h-0.5 w-full rotate-[0.5deg] transform bg-gray-900"
      ></div>
    </>
  );
}
