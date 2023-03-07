import { NextSeo, NextSeoProps } from "next-seo";
import clsx from "clsx";
import AppHeader from "@/components/core/AppHeader";
import AppFooter from "@/components/core/AppFooter";

import ArticleSidebar from "@/components/sidebars/ArticleSidebar";

type LayoutProps = {
  seo?: NextSeoProps;
  children?: React.ReactNode;
  className?: string;
  footer?: boolean;
};

const SHOW_SIDEBAR = false;

export default function ColumnLayout({
  seo,
  children,
  className,
}: LayoutProps) {
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
