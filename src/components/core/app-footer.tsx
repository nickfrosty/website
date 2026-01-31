import Link from "next/link";

import SocialIcons from "@/components/social-icons";

type ComponentProps = {
  className?: string;
};

export default function AppFooter({}: ComponentProps) {
  return (
    <footer className="mb-2 mt-5 w-full overflow-hidden pb-8 pt-5 text-center text-lg text-gray-400">
      <div
        id="footer-divider"
        className="mx-auto mb-10 h-px w-2/3 -rotate-1 transform bg-gray-900 shadow-lg md:w-2/3"
      ></div>

      <div className="mx-auto max-w-md items-center space-y-3 px-3 md:flex md:justify-between md:space-y-0">
        <div className="">
          &copy;{new Date().getFullYear()}{" "}
          <Link
            href="/"
            className="hover:text-black hover:shadow-indigo dark:hover:text-white"
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
