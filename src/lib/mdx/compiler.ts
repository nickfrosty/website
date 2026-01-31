import { createCompiler } from "@fumadocs/mdx-remote";
import codeTheme from "shiki/themes/github-dark-dimmed.mjs";

import { attachMetadata, parseMetadata } from "@/components/mdx/rehypeMetadata";

// Single shared compiler - excludes remarkImage to work on Vercel serverless
export const compiler = createCompiler({
  preset: "fumadocs",
  rehypeCodeOptions: {
    theme: codeTheme,
  },
  // Disable remarkImage - it reads from disk which fails on Vercel serverless
  remarkImageOptions: false,
  rehypePlugins: defaults => [
    ...defaults,
    [parseMetadata, { defaultShowCopyCode: true }],
    attachMetadata,
  ],
});
