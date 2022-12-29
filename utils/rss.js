/*

*/

// import { Feed } from "feed";
const { Feed } = require("feed");
const { DateTime } = require("luxon");
const { writeFileSync } = require("fs");

const {
  getDocsByPath,
  getDateByPriority,
  sortByPriorityDate,
  filterDocs,
} = require("zumo");

// define the base path to save the generated RSS files
const rssBasePath = `./public/`;

// define some reusable author data
const author = {
  name: "Nick Frostbutter",
  email: "hello@frostbutter.com",
  link: "https://nick.af",
  website: "https://nick.af",
};

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

// read in all of the desired posts to generate the feed with
(async () => {
  let [articles, blog] = await Promise.all([
    getDocsByPath("articles", { metaOnly: false, hideDrafts: true }),
    // tokenHelper.getUserToken(username),
  ]);

  console.log("articles found:", articles?.length || "none");

  // process all the articles for the dedicated articles feed
  const articleFeed = { ...feed };

  // TODO: filter out draft articles
  // const drafts = filterDocs(articles, { draft: true });
  // articles
  //   .filter(item => item.slug)

  // sort the posts with newest first
  sortByPriorityDate(articles, "desc")
    // loop over each post in the listing
    .map((post, index) => {
      // console.log(getDateByPriority(post.meta), post.meta.title);
      const url = `${author.website}/articles/${post.slug}`;

      const image = () => {
        if (post?.meta?.coverImage || post?.meta?.image)
          return `${author.website}/media/articles${
            post?.meta?.coverImage || post?.meta?.image
          }`;

        // return nothing when no image was found
        return undefined;
      };

      // construct sanitized content
      let content = null;

      // TODO: convert the content into html, from the provided markdown
      // content = post.content;
      // TODO: convert all relative/internal links to using the absolute urls

      // construct a RSS item to add to the feed
      articleFeed.addItem({
        id: url,
        link: url,
        author: [author],
        date: new Date(getDateByPriority(post.meta)),
        title: post.meta.title,
        image: image(),
        category: post.meta?.tags?.map((name) => ({ name })),
        description: post.meta.description,
        content,
      });
    });

  // console.log(articleFeed.rss2());

  // save the articles feed
  writeFileSync(`${rssBasePath}${"rss-articles"}.xml`, articleFeed.rss2(), {
    encoding: "utf-8",
  });
})();
