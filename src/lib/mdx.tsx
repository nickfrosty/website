import {
  compileMDX,
  CompileMDXResult,
  MDXRemoteProps,
} from "next-mdx-remote/rsc";

const DEFAULT_MAX_COMPILE_ATTEMPTS = 5;

type CompileMDXwithRenderCheckProps = {
  content: string;
  maxCompileAttempts?: number;
  components?: MDXRemoteProps["components"];
};

/**
 *
 * Results:
 * - `compiledMDX` must be used in a JSX environment (like the browser, not a node runtime).
 */
export async function compileMDXwithRenderCheck({
  content,
  maxCompileAttempts = DEFAULT_MAX_COMPILE_ATTEMPTS,
  components = {},
}: CompileMDXwithRenderCheckProps): Promise<{
  compiledMDX: CompileMDXResult;
  htmlString: string;
}> {
  // we import link this because next js gives an error when used in react server components
  // even though its on the server side :/
  const ReactDomServer = (await import("react-dom/server")).default;

  const unknownComponents: MDXRemoteProps["components"] = {
    EmptyComponent: () => null,
  };

  let i = 0;
  let canRender = false;
  let htmlString = "";
  let htmlComponents: CompileMDXResult | null = null;

  while (++i && i <= maxCompileAttempts && !canRender) {
    try {
      htmlComponents = await compileMDX({
        source: content,
        // ! todo: this is super bad for memory! fix it late!
        components: { ...unknownComponents, ...components },
        options: {
          parseFrontmatter: true,
          mdxOptions: {
            // development: true,
          },
        },
      });

      htmlString = ReactDomServer.renderToStaticMarkup(htmlComponents.content);
      canRender = true;
    } catch (err) {
      const matcher = (err as Error).message
        .trim()
        .match(/^Expected component `(.*)`/i);
      if (matcher?.[1]) {
        unknownComponents[matcher?.[1]] = unknownComponents.EmptyComponent;
      }
    }
  }

  if (!canRender) throw Error("Unable to render content");

  return {
    // canRender: true,
    htmlString,
    compiledMDX: htmlComponents as CompileMDXResult,
  };
}
