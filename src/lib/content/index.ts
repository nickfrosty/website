import { readdirSync, readFileSync, statSync } from "fs";
import { extname, join } from "path";
import matter from "gray-matter";
import { parseFrontmatter } from "./parseFrontmatter";

export function getPostBySlug(
  slug: string,
  pathname: string,
  extension: string = ".md",
) {
  try {
    const source = readFileSync(`${pathname}/${slug}${extension}`);
    const { data, content } = matter(source);
    // const excerpt = getExcerpt(content, 200);

    return { data, content };
  } catch (e) {
    return null;
  }
}

export function getAllContentFiles(
  dir: string,
  recursive: boolean = true,
  // todo: support a regex
  extension: string = ".md",
): string[] {
  let files: string[] = [];

  readdirSync(dir).forEach((file) => {
    const filePath = join(dir, file);
    const stats = statSync(filePath);

    if (recursive && stats.isDirectory()) {
      files = files.concat(getAllContentFiles(filePath));
    } else if (stats.isFile() && extname(file) === extension) {
      files.push(filePath);
    }
  });

  return files;
}

export function readContentFile(filePath: string) {
  const rawContent = readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}
