/*
	Helper library to create standardized meta data objects for use with the "next-seo" component
*/

// import { config } from "@logdotfm/config";
// import * as profile from "~/utils/profile";

/**
 *	Create the meta data for generic public pages
 *	@param {object} data - object containing keys data for seo
 *	@returns {object} seo meta data ready for use by the "next-seo" component
 */
export function basicMeta(data) {
  // process and set defaults for the meta data
  data = {
    ...data,
    title: data?.title || "Website",
    description: data?.description || data?.desc || "",
    url: data?.url ? `${config?.BASE_URL}${data.url}` : null,
    image: data?.image || `${config?.BASE_URL}`,
  };

  // construct a "next-seo" compatible data object
  const seo = {
    title: data.title,
    description: data.description,
    canonical: data.url || undefined,
    openGraph: {
      url: data.title || undefined,
      title: data.title,
      description: data.description,
      images: [
        {
          url: data.image,
          alt: data.description,
          // width: 800,
          // height: 600,
        },
      ],
      site_name: config.siteName,
    },
    twitter: {
      site: `@${config.twitter}`,
      cardType: "summary",
      // cardType: "summary_large_image",
    },
  };

  return seo;
}
