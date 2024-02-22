// @ts-nocheck
// import { CODE_BLOCK_FILENAME_REGEX } from "../constants";

function visit(node, tagNames, handler) {
  if (tagNames.includes(node.tagName)) {
    handler(node);
    return;
  }
  if ("children" in node) {
    for (const n of node.children) {
      visit(n, tagNames, handler);
    }
  }
}

export type ParseMetadataProps = {
  defaultShowCopyCode?: boolean;
};

export const parseMetadata =
  ({ defaultShowCopyCode }: ParseMetadataProps) =>
  (tree) => {
    visit(tree, ["pre"], (preEl) => {
      const [codeEl] = preEl.children;
      // Add default language `text` for code-blocks without languages
      // codeEl.properties.className ||= ["language-text"];
      const meta = codeEl.data?.meta;
      //   preEl.__nextra_filename = meta?.match(CODE_BLOCK_FILENAME_REGEX)?.[1];

      preEl.__nextra_showCopyCode = meta
        ? (defaultShowCopyCode && !/( |^)copy=false($| )/.test(meta)) ||
          /( |^)copy($| )/.test(meta)
        : defaultShowCopyCode;
    });
  };

export const attachMetadata = () => (tree) => {
  visit(tree, ["div", "pre", "figure"], (node) => {
    if (
      "data-rehype-pretty-code-fragment" in node.properties ||
      "data-rehype-pretty-code-figure" in node.properties
    ) {
      // remove <figure data-rehype-pretty-code-fragment /> element that wraps <pre /> element
      // because we'll wrap with our own <div />
      Object.assign(node, node.children[0]);
    }

    console.log(node.children);

    // node.properties.filename = node.__nextra_filename;
    // node.properties.showCopyCode = node.__nextra_showCopyCode;
  });
};

/**
 * Listing of the supported custom metadata that can be attached to parsed components via `attachMetadata`
 */
export type CustomMetadataProps = {
  filename?: string;
  showCopyCode?: boolean;
};
