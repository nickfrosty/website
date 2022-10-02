import { NextSeo } from "next-seo";
import AppHeader from "~/components/core/AppHeader";
import AppFooter from "~/components/core/AppFooter";

export default function Layout({
  footer = true,
  seo = {},
  children,
  className = "",
}) {
  return (
    <>
      <NextSeo {...seo} />

      <AppHeader />

      <section className={`container px-6 py-12 mx-auto ${className}`}>
        {children}
      </section>

      {footer && <AppFooter />}
    </>
  );
}
