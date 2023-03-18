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
    required: true,
  },
  updatedAt: {
    type: "date",
    description: "The date this content was updated at",
  },
  draft: {
    type: "boolean",
    description: "Draft status of the content",
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
  tags: {
    type: "string",
    // type: "list",
    // of: { type: "string" },
    description: "Comma separated listing of tags",
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
    href: {
      type: "string",
      description: "",
      required: false,
    },
    category: {
      type: "string",
      description: "",
      required: false,
    },
    description: {
      type: "string",
      description: "",
      required: false,
    },
    image: {
      type: "string",
      description: "Social share image to be used for the SEO metadata",
      required: false,
    },
  },
  computedFields: {
    slug: {
      description: "",
      type: "string",
      resolve: (post) => post?.slug ?? createSlug(post._id),
    },
    href: {
      description: "Local url path of the content",
      type: "string",
      resolve: (post) =>
        post.href ?? `/blog/${post.slug ?? createSlug(post._id)}`,
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
      required: true,
    },
    slug: {
      type: "string",
      description: "",
      required: true,
    },
    logo: {
      type: "string",
      description: "",
      required: false,
    },
    intro: {
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
  documentTypes: [Project, Blog],
});
