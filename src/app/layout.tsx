import "@/styles/globals.css";

import clsx from "clsx";
import AppHeader from "@/components/core/AppHeader";
import AppFooter from "@/components/core/AppFooter";
import { Metadata } from "next";
import config from "@/lib/config";

// import { Inter } from "next/font/google";

// const font = Inter({
//   subsets: ["latin"],
//   variable: "--font-theme",
// });

export const metadata: Metadata = {
  metadataBase: new URL(`https://${config.domain}`),
  title: "Nick Frostbutter",
  // titleTemplate: "%s",
  description:
    "Hi! I'm Nick, a full stack developer and submariner working on various projects. In my free time I write software, technical articles, and build things.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <style jsx global>
        {`
          :root {
            --font-theme: ${font.style.fontFamily};
          }
        `}
      </style> */}

      <AppHeader />

      <section className={clsx("container px-6 py-12 mx-auto")}>
        {children}
      </section>

      <AppFooter />
    </>
  );
}
