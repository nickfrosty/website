/****
	zumo config file
****/

module.exports = {
  config: {
    dateFormat: "MMM dd, yyyy",
  },
  content: {
    // define the `blog` page values
    blog: {
      baseHref: "/blog",
      hrefTemplate: "{{baseHref}}/{{slug}}",
      tagHrefTemplate: "{{baseHref}}/tag/{{tag}}",
      maxTagCount: 3,
    },

    // define the `articles` page values
    articles: {
      baseHref: "/articles",
      hrefTemplate: "{{baseHref}}/{{slug}}",
      tagHrefTemplate: "/tags/{{tag}}",
    },

    // define the `projects` page values
    projects: {
      baseHref: "/projects",
      hrefTemplate: "{{baseHref}}/{{slug}}",
    },
  },
};
