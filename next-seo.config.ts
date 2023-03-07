import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  // configure the title settings
  title: "Nick Frostbutter",
  titleTemplate: `Nick Frostbutter - %s`,
  defaultTitle: "Nick Frostbutter",
  description:
    "Hi! I'm Nick, a full stack developer and submarine veteran. In my free time, I write software and technical articles.",

  // social media card data
  openGraph: {
    site_name: "Nick Frostbutter",
    locale: "en_US",
    type: "website",
    url: "https://nick.af/",
    images: [
      {
        url: "https://nick.af/img/nick.jpg",
        width: 256,
        height: 256,
        alt: "Nick Frostbutter",
      },
    ],
  },
  twitter: {
    handle: `@nickfrosty`,
    site: `@nickfrosty`,
    cardType: "summary",
    // cardType: "summary_large_image",
  },
};

export default config;
