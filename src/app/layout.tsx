import "@/styles/globals.css";
import type { Metadata } from "next";
import { SITE } from "@/lib/config";

import AppHeader from "@/components/core/AppHeader";
import AppFooter from "@/components/core/AppFooter";

// import { Inter } from "next/font/google";

// const font = Inter({
//   subsets: ["latin"],
//   variable: "--font-theme",
// });

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: SITE.name,
    template: `%s – ${SITE.name}`,
  },
  description:
    "Hi! I'm Nick, a full stack developer and submariner working on various " +
    "projects. In my free time I write software, technical articles, and build things.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <style jsx global>
        {`
          :root {
            --font-theme: ${font.style.fontFamily};
          }
        `}
      </style> */}

      <body>
        <AppHeader />

        <section className={"container px-6 py-12 mx-auto"}>{children}</section>

        <AppFooter />
      </body>
    </html>
  );
}
