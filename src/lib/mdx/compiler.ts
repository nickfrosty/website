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
