// import { Resend } from "resend";

// import * as dotenv from "dotenv";
// import { prisma } from "@/lib/prisma/client";
// import type { NewsletterSubscriber, Prisma } from "@prisma/client";
// import { getPostBySlug } from "@/lib/content";
// // import { preparePostForSubscriber } from "@/lib/newsletter";
// import {
//   NEWSLETTER_EMAIL_ADDRESS,
//   NEWSLETTER_FROM,
//   NEWSLETTER_REPLY_TO,
// } from "@/lib/constants";

// import { NewsletterPost } from "@prisma/client";
// import { MDXRemoteProps } from "next-mdx-remote/rsc";
// import { SITE_ADDR } from "@/lib/constants";
// import { REGEX_CONTENT_DIR_LINK } from "@@/utils/helpers";
// import { createId } from "@paralleldrive/cuid2";
// import { compileMDXwithRenderCheck } from "@/lib/mdx";
// import { MASKED_DOMAIN } from "@/lib/views/constants";

// const CONFIG_LINK_MASKER_URL = `https://${MASKED_DOMAIN}`;
// const CONFIG_MASK_LINKS = true;

// dotenv.config();

// const DRAFT_ONLY_MODE: boolean = true;

// const postSlug = "2024-05-05-analytics-for-websites-and-emails";

// const rawPost = getPostBySlug(
//   postSlug,
//   "/home/nick/code/nickfrosty/website/content/blog/newsletter",
// );

// if (!rawPost || !rawPost.content) {
//   console.log("Unable to locate the newsletter file");
//   process.exit(1);
// }

// if (!rawPost.metadata.title) {
//   // todo: frontmatter validation
//   console.log("Unable to locate post title");
//   process.exit(1);
// }

// // auto append the closing statement to the newsletter
// rawPost.content +=
//   "\n\n" +
//   "PS: You can always reply directly to this email or chat on Twitter:\n" +
//   "[@nickfrosty](https://twitter.com/nickfrosty) to share your thoughts and\n" +
//   "comments about the content above.";

// type PreparePostForSubscriberProps = {
//   content: NewsletterPost["content"];
//   maskLinks: boolean;
// };

// export async function preparePostForSubscriber({
//   content,
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

//       const url = new URL(src, SITE_ADDR);

//       return <img {...props} src={url.toString()} />;
//     },
//     a: ({ href, ...props }) => {
//       if (!href) return null;
//       // todo: dynamically use the site's domain
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

//         href = new URL(href, SITE_ADDR).toString();
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
//     content: content,
//     components: componentsForEmail,
//   });

//   return {
//     links,
//     htmlString,
//   };
// }

// // console.log(rawPost);

// const resend = new Resend(process.env.RESEND_API_KEY);

// // if (DRAFT_ONLY_MODE) {
// //   const { htmlString, links } = await preparePostForSubscriber({
// //     content: rawPost.content,
// //     maskLinks: CONFIG_MASK_LINKS,
// //   });

// //   //   console.log(htmlString);

// //   console.log("masked links:");
// //   console.log(links);

// //   const emailResponse = await resend.emails.send({
// //     // lots of good details: https://www.litmus.com/blog/email-subdomains
// //     from: NEWSLETTER_FROM,
// //     // todo: generate a custom reply email?
// //     reply_to: NEWSLETTER_REPLY_TO,
// //     to: NEWSLETTER_EMAIL_ADDRESS,
// //     subject: `Newsletter: ${rawPost.metadata.title}`,
// //     html: htmlString,
// //   });

// //   console.log("emailResponse");
// //   console.log(emailResponse);

// //   console.log("==============================================");
// //   console.log("==============================================");
// //   console.log("  DRAFT ONLY MODE IS ENABLED. STOPPING HERE. ");
// //   console.log("==============================================");
// //   console.log("==============================================");
// //   process.exit();
// // }

// let subscribers = await prisma.newsletterSubscriber.findMany({
//   where: {
//     status: "ACTIVE",
//     id: DRAFT_ONLY_MODE ? 1 : undefined,
//   },
//   orderBy: {
//     id: "asc",
//   },
// });
// console.log("subscriber count:", subscribers.length);

// if (!subscribers.length) {
//   console.warn("There are currently no subscribers. Stopping.");
//   process.exit(1);
// }

// if (DRAFT_ONLY_MODE) {
//   subscribers = subscribers.filter(
//     (item) => item.id == 1 && item.twitter == "nickfrosty",
//   );

//   if (subscribers.length != 1) {
//     console.warn("Failed to filter subscribers for draft mode");
//     process.exit();
//   }

//   console.log(subscribers);
// }

// // todo: check the db to ensure a post has not already been created
// // let newsletterPost = await prisma.newsletterPost.findUnique({where: {
// //   slug:
// // }})
// //
// // if (post) {
// //   console.warn(`This post has already been created...`);
// //   process.exit(1);
// // }

// // process.exit();

// const newsletterPost = await prisma.newsletterPost.create({
//   data: {
//     name: "",
//     content: rawPost.content,
//   },
// });

// if (!newsletterPost) {
//   console.warn("Failed to create new newsletter post record");
//   process.exit(1);
// }

// // @ts-ignore
// if (DRAFT_ONLY_MODE === true) {
//   console.log("Draft mode enabled");
//   console.log("Let's not accidentally send to everyone again");
//   process.exit();
// }

// const errors = new Map<NewsletterSubscriber["id"], "string">();

// for (let i = 0; i < subscribers.length; i++) {
//   let hasDatabaseEntry = false;
//   const subscriber = subscribers[i];

//   console.log("-----------------------------------");
//   console.log(`  To: ${subscriber.email}`);

//   try {
//     const { htmlString, links } = await preparePostForSubscriber({
//       content: newsletterPost.content,
//       maskLinks: CONFIG_MASK_LINKS,
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
//         postId: newsletterPost.id,
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
//       from: NEWSLETTER_FROM,
//       // todo: generate a custom reply email?
//       reply_to: NEWSLETTER_REPLY_TO,
//       to: subscriber.email,
//       subject: `Newsletter: ${rawPost.metadata.title}`,
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
