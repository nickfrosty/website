import "@/styles/globals.css";
import type { Metadata } from "next";
import { SITE, SOCIAL } from "@/lib/config";

import AppHeader from "@/components/core/AppHeader";
import AppFooter from "@/components/core/AppFooter";
import FathomAnalytics from "@/components/core/FathomAnalytics";

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
  openGraph: {
    siteName: SITE.name,
    type: "website",
    images: [
      {
        url: "/img/nick.jpg",
        width: 256,
        height: 256,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    site: `@${SOCIAL.twitter}`,
    creator: `@${SOCIAL.twitter}`,
    card: "summary",
    // card: "summary_large_image",
  },
  category: "technology",
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
        <FathomAnalytics />

        <AppHeader />

        <section className={"container px-6 py-12 mx-auto"}>{children}</section>

        <AppFooter />
      </body>
    </html>
  );
}
