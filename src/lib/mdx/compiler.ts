import { createCompiler } from "@fumadocs/mdx-remote";
import { remarkGfm } from "fumadocs-core/mdx-plugins";
import codeTheme from "shiki/themes/github-dark-dimmed.mjs";

import { attachMetadata, parseMetadata } from "@/components/mdx/rehypeMetadata";

// Single shared compiler - excludes remarkImage to work on Vercel serverless
export const compiler = createCompiler({
  preset: "fumadocs",
  rehypeCodeOptions: {
    theme: codeTheme,
  },
  // Exclude remarkImage - it tries to read files from disk which fails on Vercel
  remarkPlugins: [remarkGfm],
  rehypePlugins: defaults => [
    ...defaults,
    [parseMetadata, { defaultShowCopyCode: true }],
    attachMetadata,
  ],
});
