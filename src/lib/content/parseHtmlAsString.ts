import { walk } from "estree-walker";
import { unified } from "unified";
import remarkParse from "remark-parse";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkFrontmatter from "remark-frontmatter";
import { MDXRemoteProps } from "next-mdx-remote/rsc";

type ParseMDXasHtmlStringProps = {
  content: string;
};

export async function parseMDXasHtmlString({
  content,
}: ParseMDXasHtmlStringProps) {
  const unknownElements = new Map<string, boolean>();

  const htmlAsString: string = (
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      // !note: must go before `remarkRehype`
      .use(() => (tree) => {
        function recursiveWalk(tree: any) {
          walk(tree as any, {
            enter(node) {
              // @ts-ignore
              if (!Object.hasOwn(node, "value") || !node?.value) return;
              // @ts-ignore
              const value: string = node.value;

              const matcher = value.match(/^<([\w]+)\s?.*>$/i);
              if (matcher?.[1]) unknownElements.set(matcher?.[1], true);

              if (Object.hasOwn(node, "children")) {
                recursiveWalk(node);
              }
            },
          });
        }

        recursiveWalk(tree);
      })
      .use(remarkRehype)
      .use(rehypeRaw)
      .use(rehypeSanitize)
      .use(remarkFrontmatter)
      .use(rehypeStringify)
      .process(content)
  ).value as string;

  const unknownComponents: MDXRemoteProps["components"] = {
    EmptyComponent: () => null,
  };

  unknownElements.forEach((value, key) => {
    unknownComponents[key] = unknownComponents.EmptyComponent;
  });

  return {
    htmlAsString,
    unknownComponents,
    unknownElements,
  };
}
