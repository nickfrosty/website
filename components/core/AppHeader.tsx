import Link from "next/link";
import AppNav from "@/components/core/AppNav";

type ComponentProps = {
  className?: string;
};

export default function AppHeader({}: ComponentProps) {
  return (
    <>
      <AppNav />

      <div className="text-center">
        <h1 className="pt-6 my-8 text-5xl font-bold tracking-tight text-indigo-500 md:text-6xl">
          <Link href="/" className="">
            Nick Frostbutter
          </Link>
        </h1>
      </div>

      <div
        id="header-divider"
        className="w-full h-px my-4 transform bg-indigo-500 -rotate-1"
      ></div>
    </>
  );
}
