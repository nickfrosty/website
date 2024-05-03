// import { Resend } from "resend";

// import * as dotenv from "dotenv";
// import { SITE } from "@/lib/config";
// import { prisma } from "@/lib/prisma";
// import { readFileSync } from "fs";
// import type { MDXRemoteProps } from "next-mdx-remote/rsc";
// import { compileMDXwithRenderCheck } from "@/lib/mdx";
// import { createId } from "@paralleldrive/cuid2";
// import type {
//   NewsletterPost,
//   NewsletterSubscriber,
//   Prisma,
// } from "@prisma/client";
// import { REGEX_CONTENT_DIR_LINK } from "@@/utils/helpers";

// dotenv.config();

// console.log("Let's not accidentally send to everyone again");
// process.exit();

// const resend = new Resend(process.env.RESEND_API_KEY);

// // const files = getAllContentFiles(
// //   "/home/nick/code/nickfrosty/newsletter-tmp/",
// // );

// const CONFIG_SITE_URL = `https://${SITE.domain}`;
// const CONFIG_LINK_MASKER_URL = `https://${MASKED_DOMAIN}`;

// const postContent = readFileSync(
//   "/home/nick/code/nickfrosty/newsletter-tmp/2024-04-28-init.md",
//   "utf-8",
// );
// // console.log(postContent);

// const subscribers = await prisma.newsletterSubscriber.findMany({
//   where: {
//     status: "ACTIVE",
//   },
// });
// console.log("subscriber count:", subscribers.length);

// if (!subscribers.length) {
//   console.warn("There are currently no subscribers. Stopping.");
//   process.exit(1);
// }

// // let post = await prisma.newsletterPost.findUnique({where: {
// //   slug:
// // }})
// //
// // if (post) {
// //   console.warn(`This post has already been created...`);
// //   process.exit(1);
// // }

// const post = await prisma.newsletterPost.create({
//   data: {
//     name: "",
//     content: postContent,
//   },
// });

// if (!post) {
//   console.warn("Failed to create new post record");
//   process.exit(1);
// }

// type PreparePostForSubscriberProps = {
//   post: NewsletterPost;
//   subscriber: NewsletterSubscriber;
//   maskLinks: boolean;
// };

// async function preparePostForSubscriber({
//   post,
//   // todo: do we need the subscriber details? I don't think so since cuid is awesome
//   // subscriber,
//   maskLinks,
// }: PreparePostForSubscriberProps) {
//   // list o' links that are in the post
//   let links = new Map<string, string>();

//   const componentsForEmail: MDXRemoteProps["components"] = {
//     img: ({ src, ...props }) => {
//       // console.log(props);
//       if (!src) return null;

//       // todo: do we want to mask links for images?
//       // links.set(src, "image");

//       const url = new URL(src, CONFIG_SITE_URL);

//       return <img {...props} src={url.toString()} />;
//     },
//     a: ({ href, ...props }) => {
//       if (!href) return null;
//       href = href.replace(/^(https?:\/\/)?nick.af\//gi, "/");

//       /**
//        * todo: assorted things
//        * - ensure the href will resolve
//        * - check for relative links on the platform (i.e. `../content/blog/post.md`)
//        * - handle local hash routes for the page being viewed (i.e. `#example`)
//        */

//       if (
//         href.startsWith("/") ||
//         href.startsWith(".") ||
//         href.startsWith("#")
//       ) {
//         // reformat paths like `/content/article/sub-dir/doc.md`
//         href = href
//           .replace(REGEX_CONTENT_DIR_LINK, "/$1/$3")
//           .replace(/(.mdx?)$/gi, "");

//         if (href.startsWith("#")) {
//           console.log("not supported:", href);
//         }

//         href = new URL(href, CONFIG_SITE_URL).toString();
//       }

//       if (maskLinks) {
//         const cuid = createId();
//         const maskedUrl = new URL(
//           `/newsletter/${cuid}`,
//           CONFIG_LINK_MASKER_URL,
//         ).toString();

//         // todo: can and should we note what text is being rendered?
//         links.set(href, maskedUrl);
//         href = maskedUrl;
//       }

//       return <a {...props} href={href} />;
//     },
//   };

//   const { htmlString } = await compileMDXwithRenderCheck({
//     content: post.content,
//     components: componentsForEmail,
//   });

//   return {
//     links,
//     htmlString,
//   };
// }

// const errors = new Map<NewsletterSubscriber["id"], "string">();

// for (let i = 0; i < subscribers.length; i++) {
//   let hasDatabaseEntry = false;
//   const subscriber = subscribers[i];

//   console.log("-----------------------------------");
//   console.log(`  To: ${subscriber.email}`);

//   try {
//     const { htmlString, links } = await preparePostForSubscriber({
//       post,
//       subscriber,
//       maskLinks: false,
//     });

//     // todo: do we need to make sure this user has not already received this post?

//     // console.log(links);
//     // console.log(htmlString);

//     const linksToCreate: Prisma.NewsletterPostLinkForSubscriberCreateManyPostForSubscriberInput[] =
//       [];

//     links.forEach((value, key) => {
//       linksToCreate.push({
//         id: value,
//         destination: key,
//       });
//     });
//     // console.log(linksToCreate);

//     let postForSubscriber = await prisma.newsletterPostForSubscriber.create({
//       data: {
//         postId: post.id,
//         subscriberId: subscriber.id,
//         content: htmlString,
//         status: "IDLE",
//         // links: {
//         //   createMany: {
//         //     data: linksToCreate,
//         //   },
//         // },
//       },
//       // include: {
//       //   links: true,
//       // }
//     });

//     if (!postForSubscriber) {
//       throw Error("Unable to create post for subscriber");
//     }
//     hasDatabaseEntry = true;

//     // let emailResponse:
//     //   | Awaited<ReturnType<typeof resend.emails.send>>
//     //   | null = null;
//     //
//     // await Promise.allSettled([
//     const emailResponse = await resend.emails.send({
//       // lots of good details: https://www.litmus.com/blog/email-subdomains
//       from: "Nick Frostbutter <newsletter@mail.frostbutter.com>",
//       // todo: generate a custom reply email?
//       reply_to: "Nick Frostbutter <nick@frostbutter.com>",
//       to: subscriber.email,
//       subject: "First newsletter!",
//       html: htmlString,
//     });

//     await prisma.newsletterPostForSubscriber.update({
//       where: {
//         id: postForSubscriber.id,
//         // note: we only update from idle state to cover the race condition
//         // - the email provider might give a response faster than we update the db
//         status: "IDLE",
//       },
//       data: {
//         status: "PENDING",
//       },
//     });

//     // ]).then((results) => {
//     //   if (results[0].status == "fulfilled") {
//     //     emailResponse = results[0].value as typeof emailResponse;
//     //   }

//     //   // if (results[1].status == "fulfilled") {
//     //   //   otherVariable = results[1].value
//     //   // }
//     // });

//     if (emailResponse?.error) {
//       console.log("Error:", emailResponse?.error);

//       // not all errors will provide an `id` (i.e. resend did not create an email)
//       if (!emailResponse?.data?.id) {
//         console.log("no email id");
//       }

//       // todo: we need to record this in the db, both cases
//     }

//     if (emailResponse?.data?.id) {
//       // todo: store the status in the db, including the error
//       console.log("emailId:", emailResponse?.data?.id);

//       postForSubscriber = await prisma.newsletterPostForSubscriber.update({
//         where: {
//           id: postForSubscriber.id,
//           // note: we only update from idle state to cover the race condition
//           // - the email provider might give a response faster than we update the db
//           // status: "IDLE",
//         },
//         data: {
//           emailId: emailResponse!.data!.id,
//         },
//       });

//       if (
//         !postForSubscriber ||
//         postForSubscriber.emailId !== emailResponse!.data!.id
//       ) {
//         throw Error(
//           `Unable to store the post's email id: ${emailResponse!.data!.id}`,
//         );
//       }

//       // note: the api key must have permission
//       // const email = await resend.emails.get(res.data.id);
//       // console.log(email);
//     }

//     console.log(`  Email sent: ${subscriber.email}`);
//     console.log(`  Progress: ${i + 1} / ${subscribers.length}`);
//     console.log("-----------------------------------");
//   } catch (err) {
//     console.log("Error while sending to subscriber:");
//     console.log(err);
//   } finally {
//     console.log("moving along...");
//   }
// }

// console.log("\n\n");
// console.log("===================================");
// console.log(`  All emails processed!`);
// console.log(`  Total: ${subscribers.length}`);
// console.log(`  Errors: ${"?"}`);
// console.log(`  Sent: ${"?"}`);
// console.log("===================================");
