import { NextSeo, NextSeoProps } from "next-seo";
import clsx from "clsx";
import AppHeader from "@/components/core/AppHeader";
import AppFooter from "@/components/core/AppFooter";

type LayoutProps = {
  seo?: NextSeoProps;
  children: React.ReactNode;
  className?: string;
  footer?: boolean;
};

export default function Layout({
  footer = true,
  seo,
  children,
  className,
}: LayoutProps) {
  return (
    <>
      <NextSeo {...seo} />

      <AppHeader />

      <section className={clsx("container px-6 py-12 mx-auto", className)}>
        {children}
      </section>

      {footer && <AppFooter />}
    </>
  );
}
