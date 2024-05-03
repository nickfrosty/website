import { Resend } from "resend";

import * as dotenv from "dotenv";
import { getAllContentFiles, readContentFile } from "@/lib/content";
import { join } from "path";
import { readFileSync } from "fs";
import { compileMDX, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { renderToStaticMarkup } from "react-dom/server";
import { compileMDXwithRenderCheck } from "@/lib/mdx";
import { parseMDXasHtmlString } from "@/lib/content/parseHtmlAsString";
import { MASKED_DOMAIN, MASKED_NEWSLETTER_PATH } from "@/lib/views/constants";

import { createId } from "@paralleldrive/cuid2";

dotenv.config();

const files = getAllContentFiles(join(process.cwd(), "content"));

// /home/nick/code/nickfrosty/website/content/articles/adobe/export-transparent-video-in-premiere-pro-alpha-channel-tutorial.md
// console.log(files[0]);

// const post = readContentFile(files[0]);

const fileContents = readFileSync(files[10], "utf-8");
// console.log(fileContents);

// console.log("files:", files);

// console.log("\nmetadata:", post.metadata);
// console.log("content:", post.content);

// /home/nick/code/nickfrosty/website/content/articles/adobe/export-transparent-video-in-premiere-pro-alpha-channel-tutorial.md

// try {
//   // @ts-ignore
//   const output = render(htmlComponents.content, {
//     plainText: true,
//     // console.log(output);
//   });
// } catch (err) {
//   console.log("\n\n\n");
//   console.log("unable to render with react mail");
//   // console.log(err);
// }

// const html = await compile(post.content);

// const metadata = greyMatter.read(fileContents, {});
// console.log(metadata);

/**
 * functions to keep in mind for reference from mdx libraries:
 * - remarkMarkAndUnravel
 * - recmaJsxRewrite
 */

const links = new Map<string, string>();

const componentsForEmail: MDXRemoteProps["components"] = {
  img: ({ src, ...props }) => {
    // console.log(props);
    if (!src) return null;

    // todo: do we want to mask links for images?
    // links.set(src, "image");

    const url = new URL(src, "https://nick.af");

    return <img {...props} src={url.toString()} />;
  },
  a: ({ href, ...props }) => {
    if (!href) return null;

    /**
     * todo: assorted things
     * - ensure the href will resolve
     * - check for relative links on the platform (i.e. `../content/blog/post.md`)
     * - handle the platform preferred links (i.e. remove `md` and `mdx` extensions)
     * - handle local hash routes for the page being viewed (i.e. `#example`)
     */

    const cuid = createId();
    const maskedUrl = new URL(
      `${MASKED_NEWSLETTER_PATH}/${cuid}`,
      `https://${MASKED_DOMAIN}`,
    );

    links.set(href, maskedUrl.toString());
    return <a {...props} href={maskedUrl.toString()} />;
  },
};

const { htmlString } = await compileMDXwithRenderCheck({
  content: fileContents,
  components: componentsForEmail,
});

console.log(links);

/**
 * todo: list of things
 * - create the database entry for all the links generated unique to the user being sent to
 * -
 */

// const { htmlAsString, unknownComponents } = await parseMDXasHtmlString({
//   content: fileContents,
// });
// const htmlComponents = await compileMDX({
//   source: fileContents,
//   components: {
//     ...unknownComponents,
//   },
//   options: {
//     parseFrontmatter: true,
//     mdxOptions: {
//       // development: true,
//     },
//   },
// });
// console.log(htmlComponents);

// console.log(htmlString);

process.exit();

const resend = new Resend(process.env.RESEND_API_KEY);

const { data, error } = await resend.emails.send({
  // lots of good details: https://www.litmus.com/blog/email-subdomains
  from: "Nick Frostbutter <newsletter@mail.frostbutter.com>",
  // todo: generate a custom reply email?
  reply_to: "Nick Frostbutter <nick@frostbutter.com>",
  to: "nfrostbutter@gmail.com",
  subject: "Hello World with domain",
  // note: tags not supported in batch
  // tags: [
  //   {
  //     name: "category",
  //     value: "newsletter",
  //   },
  // ],
  html: htmlString,
  // react: compiledMDX.content,
  // text: "this is text",
  //   html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  // html: article.body.html,
});

if (error) {
  console.log("Error:", error);

  // not all errors will provide an `id` (i.e. resend did not create an email)
  if (!data?.id) {
    console.log("no email id");
  }
}

if (data?.id) {
  // todo: store the status in the db, including the error
  console.log("emailId:", data?.id);

  // note: the api key must have permission
  // const email = await resend.emails.get(res.data.id);
  // console.log(email);
}
