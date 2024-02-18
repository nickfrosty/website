import {
  defineDocumentType,
  makeSource,
  FieldDefs,
} from "contentlayer/source-files";

const slugRegex = new RegExp(/^(.*)(.md|.mdx)/gi);

function createSlug(slug: string) {
  const splitter: string | string[] = slug.toLowerCase().split("/");
  return splitter[splitter.length - 1].split(".md")[0].replace(/\s+/g, "-");
}

/**
 * Standard post fields, for ease of reuse
 */
const postFields: FieldDefs = {
  title: {
    type: "string",
    description: "The primary title of the post",
    required: true,
  },
  slug: {
    type: "string",
    description: "URL slug for the post",
    required: false,
  },
  date: {
    type: "date",
    description: "The public date of the post",
    required: false,
  },
  updatedAt: {
    type: "date",
    description: "The date this content was updated at",
    required: false,
  },
  draft: {
    type: "boolean",
    description: "Draft status of the post",
    required: false,
  },
  featured: {
    type: "boolean",
    description: "Whether or not this content is featured",
    required: false,
  },
  homepage: {
    type: "boolean",
    description: "Whether or not to display this content on the homepage",
    required: false,
  },

  description: {
    type: "string",
    description:
      "Brief description of the content (also used in the SEO metadata)",
    required: false,
  },
  blurb: {
    type: "string",
    description: "One-liner description of the content",
    required: false,
  },
  tags: {
    type: "string",
    // type: "list",
    // of: { type: "string" },
    description: "Comma separated listing of tags",
    required: false,
  },

  image: {
    type: "string",
    description:
      "The primary image of the post (also used in the SEO metadata)",
    required: false,
  },
  imageFocus: {
    type: "enum",
    options: ["center", "left", "right"],
    description: "Focus position of the posts image",
    required: false,
  },

  nextPage: {
    type: "string",
    description: "",
    required: false,
  },
  prevPage: {
    type: "string",
    description: "",
    required: false,
  },
};

/**
 * Blog post schema
 */
export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/**/*.md`,
  fields: {
    // use the standard post fields
    ...postFields,

    // define custom fields now...
    category: {
      type: "string",
      description: "",
      required: false,
    },
  },
  computedFields: {
    draft: {
      description: "Draft status of the post",
      type: "boolean",
      resolve: (post) =>
        post?.draft ?? post._raw.sourceFileName.startsWith("_"),
    },

    slug: {
      description: "Computed slug of the post",
      type: "string",
      resolve: (post) => post?.slug ?? createSlug(post._id),
    },
    href: {
      description: "Local url path of the content",
      type: "string",
      resolve: (post) =>
        post.href ?? `/blog/${post?.slug ?? createSlug(post._id)}`,
    },
  },
}));

/**
 * Article post schema
 */
export const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: `articles/**/*.md`,
  fields: {
    // use the standard post fields
    ...postFields,

    // define custom fields now...
    category: {
      type: "string",
      description: "",
      required: false,
    },
  },
  computedFields: {
    draft: {
      description: "Draft status of the post",
      type: "boolean",
      resolve: (post) =>
        post?.draft ?? post._raw.sourceFileName.startsWith("_"),
    },
    slug: {
      description: "Computed slug of the post",
      type: "string",
      resolve: (post) => post?.slug ?? createSlug(post._id),
    },
    href: {
      description: "Local url path of the content",
      type: "string",
      resolve: (post) =>
        post.href ?? `/articles/${post?.slug ?? createSlug(post._id)}`,
    },
    tags: {
      description: "Array listing of tags",
      type: "list",
      // of: { type: "string" },
      resolve: (item) =>
        item?.tags?.split(",")?.map((tag) => tag.trim()) ?? undefined,
    },
  },
}));

/**
 * ArticleTag schema
 */
export const ArticleTag = defineDocumentType(() => ({
  name: "ArticleTag",
  filePathPattern: `tags/**/*.md`,
  fields: {
    // use the standard post fields
    ...postFields,

    // define custom fields now...
    // category: {
    //   type: "string",
    //   description: "",
    //   required: false,
    // },
  },
  computedFields: {
    slug: {
      description: "Computed slug of the post",
      type: "string",
      resolve: (post) => post?.slug ?? createSlug(post._id),
    },
    href: {
      description: "Local url path of the content",
      type: "string",
      resolve: (post) => `/tags/${post?.slug ?? createSlug(post._id)}`,
    },
  },
}));

/**
 * Project schema
 */
export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.md`,
  fields: {
    // use the standard post fields
    ...postFields,

    // define custom fields now...
    status: {
      type: "enum",
      options: ["active"],
      description: "",
      required: true,
    },
    url: {
      type: "string",
      description: "",
      required: false,
    },
    logo: {
      type: "string",
      description: "",
      required: false,
    },
    dateRange: {
      type: "string",
      description: "",
      required: false,
    },
    heroImage: {
      type: "string",
      description: "",
      required: false,
    },
  },
  computedFields: {
    draft: {
      description: "Draft status of the post",
      type: "boolean",
      resolve: (post) =>
        post?.draft ?? post._raw.sourceFileName.startsWith("_"),
    },
    slug: {
      description: "Computed slug of the project",
      type: "string",
      resolve: (post) => post._raw.sourceFileName.split(".")[0],
    },
    href: {
      description: "Url path of the project (either local or absolute)",
      type: "string",
      resolve: (post) =>
        post.url?.startsWith("http")
          ? new URL(post.url).toString()
          : `/projects/${post.slug}`,
    },
    tags: {
      description: "Array listing of tags",
      type: "list",
      // of: { type: "string" },
      resolve: (item) =>
        item?.tags?.split(",")?.map((tag) => tag.trim()) ?? undefined,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Project, Blog, Article, ArticleTag],
});
