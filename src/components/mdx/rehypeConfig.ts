import {
  ParseMetadataProps,
  attachMetadata,
  parseMetadata,
} from "./rehypeMetadata";
import rehypePrettyCode, {
  Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";
import codeTheme from "shiki/themes/github-dark-dimmed.mjs";

/**
 *
 */
export const rehypePluginConfig: import("unified").PluggableList = [
  // always run `parseMetadata` first to expose the custom metadata
  [parseMetadata, { defaultShowCopyCode: true } as ParseMetadataProps],

  [
    // @ts-ignore
    rehypePrettyCode,
    {
      keepBackground: true,
      defaultLang: {
        block: "text",
        inline: "text",
      },
      theme: codeTheme,
    } as RehypePrettyCodeOptions,
  ],

  // always run `attachMetadata` to finally mutate the nodes,
  // making the metadata accessible via react components
  attachMetadata,
];

/** additional props supported by the Callout component */
export type CalloutProps = {
  type?: string;
};
