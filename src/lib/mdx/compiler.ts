import { createCompiler } from "@fumadocs/mdx-remote";
import codeTheme from "shiki/themes/github-dark-dimmed.mjs";

import { attachMetadata, parseMetadata } from "@/components/mdx/rehypeMetadata";

/**
 * MDX compiler instance for the entire application.
 **/
export const mdxCompiler = createCompiler({
  preset: "fumadocs",
  rehypeCodeOptions: {
    theme: codeTheme,
  },
  // Custom rehype plugins for code block metadata (copy button, etc.)
  rehypePlugins: defaults => [
    ...defaults,
    [parseMetadata, { defaultShowCopyCode: true }],
    attachMetadata,
  ],
  // Disables static imports and ignores filesystem errors for serverless.
  // See: https://fumadocs.dev/docs/headless/mdx/remark-image
  remarkImageOptions: {
    useImport: false,
    onError: "ignore",
  },
});
