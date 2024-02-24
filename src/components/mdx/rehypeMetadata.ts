// @ts-nocheck
const CODE_BLOCK_FILENAME_REGEX = /(file|filename)=\"?([^"]+)\"?/;

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
    visit(tree, ["pre"], (preElem) => {
      const [codeElem] = preElem.children;
      const meta: string | undefined = codeElem.data?.meta;

      if (meta) {
        preElem.__filename = meta.match(CODE_BLOCK_FILENAME_REGEX)?.[2];

        preElem.__showCopyCode = meta
          ? (defaultShowCopyCode && !/( |^)copy=false($| )/.test(meta)) ||
            /( |^)copy($| )/.test(meta)
          : defaultShowCopyCode;
      }
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

    node.properties.filename = node.__filename;
    // node.properties.showCopyCode = node.__showCopyCode;
  });
};

/**
 * Listing of the supported custom metadata that can be attached to parsed components via `attachMetadata`
 */
export type CustomMetadataProps = {
  filename?: string;
  showCopyCode?: boolean;
};
