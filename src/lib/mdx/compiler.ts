import { createCompiler } from "@fumadocs/mdx-remote";

/**
 * MDX compiler instance for the entire application.
 **/
export const mdxCompiler = createCompiler({
  preset: "fumadocs",
  rehypeCodeOptions: {
    themes: {
      dark: "github-dark-dimmed",
      light: "github-dark-dimmed",
    },
  },
  // Custom rehype plugins for code block metadata (copy button, etc.)
  // rehypePlugins: defaults => [
  //   ...defaults,
  //   // Custom plugins here
  // ],
  // Disables static imports and ignores filesystem errors for serverless.
  // See: https://fumadocs.dev/docs/headless/mdx/remark-image
  remarkImageOptions: {
    useImport: false,
    onError: "ignore",
  },
});

/**
 * Strips HTML comments from markdown content.
 * MDX uses JSX parsing which doesn't support HTML-style comments (`<!-- -->`).
 *
 * This enables using HTML comments in markdown for:
 * - `<!-- prettier-ignore -->` to prevent Prettier from formatting code blocks
 * - `<!-- TODO: notes -->` for author notes that won't render
 */
export function stripHtmlComments(content: string = ""): string {
  return content.trim().replace(/<!--[\s\S]*?-->/g, "");
}
