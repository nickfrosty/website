import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { useMemo, type ComponentProps } from "react";
import Link from "next/link";
import { CalloutProps, rehypePluginConfig } from "./rehypeConfig";
import { CustomMetadataProps } from "./rehypeMetadata";
import { CopyToClipBoard } from "./CopyToClipboard";
import {
  StarIcon,
  BoltIcon,
  SparklesIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { REGEX_CONTENT_DIR_LINK } from "@@/utils/helpers";

function CustomLink({ ref, ...props }: ComponentProps<"a">) {
  let href = (props.href!.toString() as string).replace(
    /^(https?:\/\/)?nick.af\//gi,
    "/",
  );

  if (href.startsWith("/") || href.startsWith(".")) {
    // reformat paths like `/content/article/sub-dir/doc.md`
    href = href.replace(REGEX_CONTENT_DIR_LINK, "/$1/$3");
    return (
      <Link {...props} href={href.replace(/(.mdx?)$/gi, "")}>
        {props.children}
      </Link>
    );
  }

  return <a target="_blank" {...props} />;
}

function Callout(props: ComponentProps<"div"> & CalloutProps) {
  const IconToUse = useMemo(() => {
    switch (props.type) {
      case "warn":
      case "warning":
      case "caution":
      case "yellow":
      case "red":
      case "error":
        return ExclamationTriangleIcon;
      case "green":
      case "success":
        return StarIcon;
      case "blue":
      case "note":
      case "pro":
        return BoltIcon;
      default:
        return InformationCircleIcon;
    }
  }, []);

  return (
    <div
      className={`callout ${(props?.type as string)?.toLowerCase() || "note"} ${
        props.className ? props.className : ""
      }`}
    >
      <div className="callout-icon">
        <IconToUse className="" />
      </div>
      <div {...props} className={"callout-content"}>
        {!!props.title && <h5 className="callout-title">{props.title}</h5>}
        {props.children}
      </div>
    </div>
  );
}

function Blockquote(props: ComponentProps<"blockquote">) {
  return (
    <div className={"callout indigo"}>
      <div className="callout-icon">
        <SparklesIcon className="" />
      </div>
      <blockquote {...props} className={"callout-content"}>
        {!!props.title && <h5 className="callout-title">{props.title}</h5>}
        {props.children}
      </blockquote>
    </div>
  );
}

function Line(props: ComponentProps<"hr">) {
  return (
    <div className="">
      <hr />
    </div>
  );
}

function Pre({
  children,
  ...props
}: ComponentProps<"pre"> & CustomMetadataProps) {
  return (
    <div className="relative border rounded-lg border-slate-700 overflow-clip">
      {!!props.filename && (
        <div className="px-3 pt-3 pb-2 font-mono text-sm font-medium leading-none border-b bg-slate-700 border-slate-700">
          {props.filename}
        </div>
      )}
      <pre
        {...props}
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
  hr: Line,
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
          // @ts-ignore
          rehypePlugins: rehypePluginConfig,
        },
      }}
      components={components}
    />
  );
}
