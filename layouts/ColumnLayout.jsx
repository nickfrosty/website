import clsx from "clsx";
import { NextSeo } from "next-seo";
import AppFooter from "~/components/core/AppFooter";
import AppHeader from "~/components/core/AppHeader";
import ArticleSidebar from "~/components/sidebars/ArticleSidebar";

const SHOW_SIDEBAR = false;

export default function ColumnLayout({
  seo = null,
  children = null,
  className = "",
}) {
  return (
    <>
      <NextSeo {...seo} />

      <AppHeader />

      <section
        className={`container mx-auto w-full ${
          SHOW_SIDEBAR ? "grid grid-cols-12 md:max-w-6xl" : "md:max-w-4xl"
        }`}
      >
        <main
          className={clsx(
            `flex-grow col-span-9 space-y-10 min-h-screen`,
            className,
          )}
        >
          {children}
        </main>

        {SHOW_SIDEBAR ? <ArticleSidebar /> : ""}
      </section>

      <AppFooter />
    </>
  );
}
