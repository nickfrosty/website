import Link from "next/link";
import SocialIcons from "@/components/SocialIcons";

type ComponentProps = {
  className?: string;
};

export default function AppFooter({}: ComponentProps) {
  return (
    <footer className="w-full pt-5 pb-8 mt-5 mb-2 overflow-hidden text-lg text-center text-gray-400">
      <div
        id="footer-divider"
        className="w-2/3 h-px mx-auto mb-6 transform shadow-lg bg-slate-800 -rotate-1 md:w-1/2"
      ></div>

      <div className="items-center max-w-md px-3 mx-auto space-y-3 md:space-y-0 md:justify-between md:flex">
        <div className="">
          &copy;{new Date().getFullYear()}{" "}
          <Link
            href="/"
            className="hover:text-black dark:hover:text-white hover:shadow-indigo"
            title="Personal Website for Nick Frostbutter"
          >
            Nick Frostbutter
          </Link>
        </div>

        <SocialIcons
          iconSize="w-5 h-5"
          className="justify-center space-x-6 text-gray-500 md:justify-between"
        />
      </div>
    </footer>
  );
}
