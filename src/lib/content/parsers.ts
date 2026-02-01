import fs from "fs/promises";
import path from "path";

import { globSync } from "glob";
import matter from "gray-matter";

import { mdxCompiler, stripHtmlComments } from "@/lib/mdx/compiler";

import {
  articleFrontmatterSchema,
  blogFrontmatterSchema,
  projectFrontmatterSchema,
  tagFrontmatterSchema,
  type ArticleFrontmatter,
  type BlogFrontmatter,
  type ProjectFrontmatter,
  type TagFrontmatter,
} from "./types";

import type { MdxContent } from "@fumadocs/mdx-remote/client";
import type { ZodType } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "content");

function createSlug(filename: string): string {
  return filename.toLowerCase().replace(/\s+/g, "-");
}

function parseTags(tags: string | string[] | undefined): string[] | undefined {
  if (typeof tags === "string") {
    return tags.split(",").map(t => t.trim());
  }
  return tags;
}

// Get all slugs for a content type (for generateStaticParams)
export function getAllSlugs(contentType: string): string[] {
  const dir = path.join(CONTENT_DIR, contentType);
  const files = globSync(`${dir}/**/*.md`);
  return files.map(file => {
    const filename = path.basename(file, ".md");
    return createSlug(filename);
  });
}

// Generic content loader
async function getContentBySlug<T>(
  slug: string,
  contentType: string,
  schema: ZodType<T, any, any>,
): Promise<{
  frontmatter: T;
  content: string;
  slug: string;
  href: string;
} | null> {
  const dir = path.join(CONTENT_DIR, contentType);
  const files = globSync(`${dir}/**/*.md`);

  for (const file of files) {
    const filename = path.basename(file, ".md");
    const fileSlug = createSlug(filename);

    if (fileSlug === slug || filename === slug) {
      const source = await fs.readFile(file, "utf-8");
      const { data, content } = matter(source);
      const frontmatter = schema.parse({
        ...data,
        tags: parseTags(data.tags),
      });
      const href = (data.url as string)?.startsWith("http") ? data.url : `/${contentType}/${slug}`;

      return { frontmatter, content, slug, href };
    }
  }
  return null;
}

// Get all content of a type
async function getAllContent<T>(
  contentType: string,
  schema: ZodType<T, any, any>,
): Promise<Array<{ frontmatter: T; content: string; slug: string; href: string }>> {
  const dir = path.join(CONTENT_DIR, contentType);
  const files = globSync(`${dir}/**/*.md`);

  const posts = await Promise.all(
    files.map(async file => {
      const source = await fs.readFile(file, "utf-8");
      const { data, content } = matter(source);
      const filename = path.basename(file, ".md");
      const slug = (data.slug as string) || createSlug(filename);
      const draft = data.draft === true || filename.startsWith("_");
      const frontmatter = schema.parse({
        ...data,
        draft,
        tags: parseTags(data.tags),
      });
      const href = (data.url as string)?.startsWith("http") ? data.url : `/${contentType}/${slug}`;

      return { frontmatter, content, slug, href };
    }),
  );

  return posts;
}

// Get compiled MDX content (for rendering)
export async function getPostWithMDX<T>(
  slug: string,
  contentType: string,
  schema: ZodType<T, any, any>,
): Promise<{ frontmatter: T; body: MdxContent; content: string } | null> {
  const post = await getContentBySlug<T>(slug, contentType, schema);
  if (!post) return null;

  const result = await mdxCompiler.compile({
    source: stripHtmlComments(post.content),
  });

  return {
    frontmatter: post.frontmatter,
    body: result.body,
    content: post.content,
  };
}

// Specific content type exports - slugs
export const getAllBlogSlugs = () => getAllSlugs("blog");
export const getAllArticleSlugs = () => getAllSlugs("articles");
export const getAllProjectSlugs = () => getAllSlugs("projects");
export const getAllTagSlugs = () => getAllSlugs("tags");

// Specific content type exports - by slug
export const getBlogBySlug = (slug: string) =>
  getContentBySlug<BlogFrontmatter>(slug, "blog", blogFrontmatterSchema);
export const getArticleBySlug = (slug: string) =>
  getContentBySlug<ArticleFrontmatter>(slug, "articles", articleFrontmatterSchema);
export const getProjectBySlug = (slug: string) =>
  getContentBySlug<ProjectFrontmatter>(slug, "projects", projectFrontmatterSchema);
export const getTagBySlug = (slug: string) =>
  getContentBySlug<TagFrontmatter>(slug, "tags", tagFrontmatterSchema);

// Specific content type exports - all content
export const getAllBlogs = () => getAllContent<BlogFrontmatter>("blog", blogFrontmatterSchema);
export const getAllArticles = () =>
  getAllContent<ArticleFrontmatter>("articles", articleFrontmatterSchema);
export const getAllProjects = () =>
  getAllContent<ProjectFrontmatter>("projects", projectFrontmatterSchema);
export const getAllTags = () => getAllContent<TagFrontmatter>("tags", tagFrontmatterSchema);

// Compiled MDX getters
export const getBlogWithMDX = (slug: string) =>
  getPostWithMDX<BlogFrontmatter>(slug, "blog", blogFrontmatterSchema);
export const getArticleWithMDX = (slug: string) =>
  getPostWithMDX<ArticleFrontmatter>(slug, "articles", articleFrontmatterSchema);
export const getProjectWithMDX = (slug: string) =>
  getPostWithMDX<ProjectFrontmatter>(slug, "projects", projectFrontmatterSchema);
