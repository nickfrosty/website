import { Feed } from "feed";
import { writeFileSync } from "fs";
import { allArticles } from "../.contentlayer/generated/index.mjs";
import { convertRelativeAnchorsToAbsolute } from "./helpers";

// define the base path to save the generated RSS files
const rssBasePath = `./public/`;

// define some reusable author data
const author = {
  name: "Nick Frostbutter",
  email: "hello@frostbutter.com",
  link: "https://nick.af",
  website: "https://nick.af",
};

// display a header in the console
displayHeader();

// construct the base RSS feed settings
const feed = new Feed({
  title: author.name,
  description:
    "Hi! I'm Nick, a full stack developer and submariner working on various projects. " +
    "In my free time I write software, technical articles, and build things.",
  id: author.website,
  link: author.website,
  // generator: "nick.af",
  language: "en",
  favicon: `${author.website}/favicon.ico`,
  copyright: `All rights reserved then, now, and forever, ${author.name}`,
  author,
});

(async () => {
  // copy the base feed for articles
  const articleFeed = { ...feed };

  // process each of the articles
  allArticles
    // remove draft articles (e.g. with a prefix of `_` or `draft=true`)
    .filter((item) => !item.draft)
    // sort the posts with newest first
    .sort((a, b) => parseInt(b.date) - parseInt(a.date))
    // loop over each post in the listing
    .map((post) => {
      // derive the absolute url for the article
      const url = `${author.website}${post.href}`;

      // todo: compute a image location
      const image = () => {
        // if (post?.image)
        //   return `${author.website}/media/articles${post?.image}`;

        // return nothing when no image was found
        return undefined;
      };

      // construct sanitized content
      let content = post.body.html;
      content = convertRelativeAnchorsToAbsolute(
        content,
        `${author.website}/articles`,
      );

      // TODO: convert all relative/internal links to using the absolute urls

      // construct a RSS item to add to the feed
      articleFeed.addItem({
        id: url,
        link: url,
        author: [author],
        date: new Date(post?.date || ""),
        // date: new Date(getDateByPriority(post.meta)),
        title: post.title,
        image: image(),
        // category: post.meta?.tags?.map((name) => ({ name })),
        description: post?.description || "",
        content: content,
      });
    });

  // save the articles feed
  writeFileSync(`${rssBasePath}${"rss-articles"}.xml`, articleFeed.rss2(), {
    encoding: "utf-8",
  });
})();

function displayHeader() {
  console.log("-----------------------------------------------------");
  console.log("Generating RSS feeds...");
  console.log("-----------------------------------------------------");
}
