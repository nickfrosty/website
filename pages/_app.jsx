import React from "react";
import App from "next/app";
import { DefaultSeo } from "next-seo";

import "../styles/globals.css";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <DefaultSeo
          title="Nick Frostbutter"
          titleTemplate="Nick Frostbutter - %s"
          defaultTitle="Nick Frostbutter"
          openGraph={{
            type: "website",
            url: "https://nick.af/",
            site_name: "Nick Frostbutter",
            images: [
              {
                url: "https://nick.af/img/nick.jpg",
                width: 256,
                height: 256,
                alt: "Nick Frostbutter",
              },
            ],
          }}
          twitter={{
            handle: "@nickfrosty",
            site: "@nickfrosty",
            cardType: "summary",
            // cardType: "summary_large_image",
          }}
        />

        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}
