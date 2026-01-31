import fsSync from "fs";
import path from "path";

import { globSync } from "glob";
import matter from "gray-matter";

function createSlug(filename: string): string {
  return filename.toLowerCase().replace(/\s+/g, "-");
}

// Utility functions for scripts (email-blast, send-email, etc.)
export function getAllContentFiles(directory: string): string[] {
  return globSync(`${directory}/**/*.md`);
}

export function readContentFile(filePath: string) {
  const fileContent = fsSync.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContent);

  return {
    metadata: frontmatter,
    content,
    _filePath: filePath,
  };
}

export function getPostBySlug(slug: string, directory: string) {
  const files = globSync(`${directory}/**/*.md`);

  for (const file of files) {
    const fileContent = fsSync.readFileSync(file, "utf8");
    const { data: frontmatter, content } = matter(fileContent);
    const filename = path.basename(file, ".md");

    const postSlug = (frontmatter.slug as string) || createSlug(filename);

    if (postSlug === slug || filename === slug) {
      return {
        metadata: frontmatter,
        content,
        slug: postSlug,
        _filePath: file,
      };
    }
  }

  return null;
}
