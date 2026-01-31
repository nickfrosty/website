import { compileMDX } from "@fumadocs/mdx-remote";
import type { MDXComponents } from "mdx/types";

const DEFAULT_MAX_COMPILE_ATTEMPTS = 5;

type CompileMDXwithRenderCheckProps = {
  content: string;
  maxCompileAttempts?: number;
  components?: MDXComponents;
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
  compiledMDX: Awaited<ReturnType<typeof compileMDX>>;
  htmlString: string;
}> {
  // we import link this because next js gives an error when used in react server components
  // even though its on the server side :/
  const ReactDomServer = (await import("react-dom/server")).default;

  const unknownComponents: MDXComponents = {
    EmptyComponent: () => null,
  };

  let i = 0;
  let canRender = false;
  let htmlString = "";
  let compiledResult: Awaited<ReturnType<typeof compileMDX>> | null = null;

  while (++i && i <= maxCompileAttempts && !canRender) {
    try {
      compiledResult = await compileMDX({
        source: content,
        mdxOptions: {
          // Disable the remark-image plugin that causes path resolution issues
          remarkImageOptions: false,
        },
      });

      // Render the MDX body with components
      const MDXContent = compiledResult.body;
      const allComponents = { ...unknownComponents, ...components };
      htmlString = ReactDomServer.renderToStaticMarkup(<MDXContent components={allComponents} />);
      canRender = true;
    } catch (err) {
      const matcher = (err as Error).message.trim().match(/^Expected component `(.*)`/i);
      if (matcher?.[1]) {
        unknownComponents[matcher?.[1]] = unknownComponents.EmptyComponent;
      }
    }
  }

  if (!canRender) throw Error("Unable to render content");

  return {
    // canRender: true,
    htmlString,
    compiledMDX: compiledResult as Awaited<ReturnType<typeof compileMDX>>,
  };
}
