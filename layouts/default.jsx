import { NextSeo } from "next-seo";
import AppHeader from "~/components/core/AppHeader";
import AppFooter from "~/components/core/AppFooter";
import clsx from "clsx";

export default function Layout({
  footer = true,
  seo = {},
  children,
  className = null,
}) {
  return (
    <>
      <NextSeo {...seo} />

      <AppHeader />

      <section
        className={clsx("container px-6 py-12 mx-auto", className && className)}
      >
        {children}
      </section>

      {footer && <AppFooter />}
    </>
  );
}
