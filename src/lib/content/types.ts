import { z } from "zod";

// Blog categories - accepting any string to be flexible with content
export const BlogCategory = z.string();

// Helper schema for date fields - accepts both Date objects and strings
const dateSchema = z
  .union([z.string(), z.date()])
  .optional()
  .transform(val => {
    if (!val) return undefined;
    if (val instanceof Date) return val.toISOString();
    return val;
  });

// Base frontmatter schema (shared fields)
const baseFrontmatterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().optional(),
  date: dateSchema,
  updatedAt: dateSchema,
  draft: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),
  homepage: z.boolean().optional().default(false),
  description: z.string().optional(),
  blurb: z.string().optional(),
  tags: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform(val => {
      if (!val) return undefined;
      if (typeof val === "string") {
        return val.split(",").map(t => t.trim());
      }
      return val;
    }),
  image: z.string().optional(),
  imageFocus: z.enum(["center", "left", "right"]).optional(),
  nextPage: z.string().optional(),
  prevPage: z.string().optional(),
});

// Blog frontmatter schema
export const blogFrontmatterSchema = baseFrontmatterSchema.extend({
  category: z.string().optional().default("blog"),
});

// Article frontmatter schema
export const articleFrontmatterSchema = baseFrontmatterSchema.extend({
  category: z.string().optional(),
});

// Project frontmatter schema
export const projectFrontmatterSchema = baseFrontmatterSchema.extend({
  status: z.string().optional(),
  url: z.string().optional(),
  logo: z.string().optional(),
  dateRange: z.string().optional(),
  heroImage: z.string().optional(),
});

// Tag frontmatter schema
export const tagFrontmatterSchema = baseFrontmatterSchema;

// Inferred types
export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;
export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;
export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
export type TagFrontmatter = z.infer<typeof tagFrontmatterSchema>;

// Full post types with content
export interface Blog {
  slug: string;
  href: string;
  frontmatter: BlogFrontmatter;
  content: string;
}

export interface Article {
  slug: string;
  href: string;
  frontmatter: ArticleFrontmatter;
  content: string;
}

export interface Project {
  slug: string;
  href: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

export interface ArticleTag {
  slug: string;
  href: string;
  frontmatter: TagFrontmatter;
  content: string;
}

export type DocumentTypes = Blog | Article | Project | ArticleTag;
