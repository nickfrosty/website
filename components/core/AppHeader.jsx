import Link from "next/link";
import AppNav from "./AppNav";

export default function AppHeader() {
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
        className="my-4 w-full h-px bg-indigo-500 transform -rotate-1"
      ></div>
    </>
  );
}
