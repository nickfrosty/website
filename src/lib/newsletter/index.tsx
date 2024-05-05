import { NewsletterPost } from "@prisma/client";
import { MDXRemoteProps } from "next-mdx-remote/rsc";
import { SITE_ADDR } from "../constants";
import { REGEX_CONTENT_DIR_LINK } from "@@/utils/helpers";
import { createId } from "@paralleldrive/cuid2";
import { compileMDXwithRenderCheck } from "../mdx";
import { MASKED_DOMAIN } from "../views/constants";

const CONFIG_LINK_MASKER_URL = `https://${MASKED_DOMAIN}`;

type PreparePostForSubscriberProps = {
  content: NewsletterPost["content"];
  maskLinks: boolean;
};

export async function preparePostForSubscriber({
  content,
  // todo: do we need the subscriber details? I don't think so since cuid is awesome
  // subscriber,
  maskLinks,
}: PreparePostForSubscriberProps) {
  // list o' links that are in the post
  let links = new Map<string, string>();

  const componentsForEmail: MDXRemoteProps["components"] = {
    img: ({ src, ...props }) => {
      // console.log(props);
      if (!src) return null;

      // todo: do we want to mask links for images?
      // links.set(src, "image");

      const url = new URL(src, SITE_ADDR);

      return <img {...props} src={url.toString()} />;
    },
    a: ({ href, ...props }) => {
      if (!href) return null;
      // todo: dynamically use the site's domain
      href = href.replace(/^(https?:\/\/)?nick.af\//gi, "/");

      /**
       * todo: assorted things
       * - ensure the href will resolve
       * - check for relative links on the platform (i.e. `../content/blog/post.md`)
       * - handle local hash routes for the page being viewed (i.e. `#example`)
       */

      if (
        href.startsWith("/") ||
        href.startsWith(".") ||
        href.startsWith("#")
      ) {
        // reformat paths like `/content/article/sub-dir/doc.md`
        href = href
          .replace(REGEX_CONTENT_DIR_LINK, "/$1/$3")
          .replace(/(.mdx?)$/gi, "");

        if (href.startsWith("#")) {
          console.log("not supported:", href);
        }

        href = new URL(href, SITE_ADDR).toString();
      }

      if (maskLinks) {
        const cuid = createId();
        const maskedUrl = new URL(
          `/newsletter/${cuid}`,
          CONFIG_LINK_MASKER_URL,
        ).toString();

        // todo: can and should we note what text is being rendered?
        links.set(href, maskedUrl);
        href = maskedUrl;
      } else {
        links.set(href, href);
      }

      return <a {...props} href={href} />;
    },
  };

  const { htmlString } = await compileMDXwithRenderCheck({
    content: content,
    components: componentsForEmail,
  });

  return {
    links,
    htmlString,
  };
}
