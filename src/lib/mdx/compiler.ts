import { createCompiler } from "@fumadocs/mdx-remote";
import codeTheme from "shiki/themes/github-dark-dimmed.mjs";

import { attachMetadata, parseMetadata } from "@/components/mdx/rehypeMetadata";

/**
 * Shared MDX compiler instance for the entire application.
 *
 * Uses fumadocs preset with custom configuration:
 * - `remarkImageOptions: { useImport: false }` - Disables static imports for images,
 *   which is required for Vercel serverless environments where the public directory
 *   isn't accessible at runtime. Images still get width/height attributes via HTTP fetch.
 *   See: https://fumadocs.dev/docs/headless/mdx/remark-image
 *
 * - Custom rehype plugins for code block metadata (copy button, etc.)
 */
export const mdxCompiler = createCompiler({
  preset: "fumadocs",
  rehypeCodeOptions: {
    theme: codeTheme,
  },
  remarkImageOptions: { useImport: false },
  rehypePlugins: defaults => [
    ...defaults,
    [parseMetadata, { defaultShowCopyCode: true }],
    attachMetadata,
  ],
});
