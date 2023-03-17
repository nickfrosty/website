import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { DefaultSeo } from "next-seo";
import SEO from "@@/next-seo.config";

import { Inter } from "next/font/google";

const font = Inter({
  subsets: ["latin"],
  variable: "--font-theme",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-theme: ${font.style.fontFamily};
          }
        `}
      </style>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}
