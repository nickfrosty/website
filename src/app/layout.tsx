import type { Metadata, Viewport } from "next";

import { Geist } from "next/font/google";

import "./globals.css";

import AppFooter from "@/components/core/app-footer";
import AppHeader from "@/components/core/app-header";
import FathomAnalytics from "@/components/core/fathom-analytics";
import { SITE, SOCIAL } from "@/lib/config";
import { META_TITLE_SEPARATOR } from "@/lib/constants";

const fontFamily = Geist({ subsets: ["latin"] });

export const viewport: Viewport = {
  // themeColor: META_THEME_COLORS.light,
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: SITE.name,
    template: `%s ${META_TITLE_SEPARATOR} ${SITE.name}`,
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
    <html lang="en" className="dark">
      <body className={`${fontFamily.className} overflow-x-clip`}>
        <FathomAnalytics />

        <AppHeader />

        <section className={"container mx-auto px-6 py-12"}>{children}</section>

        <AppFooter />
      </body>
    </html>
  );
}
