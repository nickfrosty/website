/**
 * Site-wide content configuration (replaces zumo.config.js)
 */
const siteConfig = {
  config: {
    dateFormat: "MMM dd, yyyy",
  },
  content: {
    blog: {
      baseHref: "/blog",
      hrefTemplate: "{{baseHref}}/{{slug}}",
      tagHrefTemplate: "{{baseHref}}/tag/{{tag}}",
      maxTagCount: 3,
    },
    articles: {
      baseHref: "/articles",
      hrefTemplate: "{{baseHref}}/{{slug}}",
      tagHrefTemplate: "/tags/{{tag}}",
    },
    projects: {
      baseHref: "/projects",
      hrefTemplate: "{{baseHref}}/{{slug}}",
    },
  },
} as const;

export default siteConfig;
