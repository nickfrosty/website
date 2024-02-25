import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { type ComponentProps } from "react";
import Link from "next/link";
import { CalloutProps, rehypePluginConfig } from "./rehypeConfig";
import { CustomMetadataProps } from "./rehypeMetadata";
import { CopyToClipBoard } from "./CopyToClipboard";

const contentDirLinkRegex = new RegExp(
  /^\/content\/(\w+)(.*)\/([\w+-]*(.mdx?))/gm,
);

function CustomLink({ ref, ...props }: ComponentProps<"a">) {
  let href = (props.href!.toString() as string).replace(
    /^(https?:\/\/)?nick.af\//gi,
    "/",
  );

  if (href.startsWith("/") || href.startsWith(".")) {
    // reformat paths like `/content/article/sub-dir/doc.md`
    href = href.replace(contentDirLinkRegex, "/$1/$3");
    return (
      <Link {...props} href={href.replace(/(.mdx?)$/gi, "")}>
        {props.children}
      </Link>
    );
  }

  return <a target="_blank" {...props} />;
}

function Callout(props: ComponentProps<"div"> & CalloutProps) {
  return (
    <div
      className={`callout ${(props?.type as string)?.toLowerCase() || ""} ${
        props.className ? props.className : ""
      }`}
    >
      {!!props.title && <div className="callout-title">{props.title}</div>}
      <div className="callout-content">{props.children}</div>
    </div>
  );
}

function Blockquote(props: ComponentProps<"blockquote">) {
  return (
    <div className={`callout mx-4 md:mx-12 mt-5 mb-9`}>
      <div className="callout-content">{props.children}</div>
    </div>
  );
}

function Pre({
  children,
  ...props
}: ComponentProps<"pre"> & CustomMetadataProps) {
  // const preRef = useRef<HTMLPreElement | null>(null);

  return (
    <div className="relative border rounded-lg border-slate-700 overflow-clip">
      {!!props.filename && (
        <div className="px-3 pt-3 pb-2 font-mono text-sm font-medium leading-none border-b bg-slate-700 border-slate-700">
          {props.filename}
        </div>
      )}
      <pre
        {...props}
        // ref={preRef}
        className="rounded-b-lg p-3 [&>code]:leading-normal overflow-auto scroller"
      >
        {children}
        <div className="absolute top-[7px] right-2">
          <CopyToClipBoard />
        </div>
      </pre>
    </div>
  );
}

const components: MDXRemoteProps["components"] = {
  pre: Pre,
  a: CustomLink,
  Callout: Callout,
  blockquote: Blockquote,
};

export function RenderMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      options={{
        mdxOptions: {
          development: process.env.NODE_ENV === "development",
          // remarkPlugins: [remarkGfm],
          rehypePlugins: rehypePluginConfig,
        },
      }}
      components={components}
    />
  );
}
