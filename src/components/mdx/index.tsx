import React, { Children, useMemo, type ComponentProps } from "react";

import Link from "next/link";

import {
  StarIcon,
  BoltIcon,
  SparklesIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

import { REGEX_CONTENT_DIR_LINK, slugify } from "@@/utils/helpers";

import { CopyToClipBoard } from "./CopyToClipboard";
import { CalloutProps } from "./rehypeConfig";
import { CustomMetadataProps } from "./rehypeMetadata";


import type { MdxContent } from "@fumadocs/mdx-remote/client";
import type { MDXComponents } from "mdx/types";

function CustomLink({ ref, ...props }: ComponentProps<"a">) {
  let href = (props.href!.toString() as string)
    .replace(/^(https?:\/\/)?nick.af\//gi, "/")
    .replace(/^\/?(content|public)\//i, "/");

  if (href.startsWith("/") || href.startsWith(".") || href.startsWith("#")) {
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

interface AnchorHeadingProps {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  id?: string;
  children: React.ReactNode;
  className?: string;
}

const AnchorHeading: React.FC<AnchorHeadingProps> = ({
  as: Component,
  id,
  children,
  className = "",
  ...props
}) => {
  // Create a slug from the heading text
  const childrenString = Children.toArray(children)
    .map(child => (typeof child === "string" ? child : ""))
    .join("");

  const headingId = id || slugify(childrenString);

  return (
    <Component id={headingId} className={`group ${className}`} {...props}>
      <a
        href={`#${headingId}`}
        style={{
          color: "inherit",
        }}
        className="!no-underline !shadow-none"
      >
        {children}
        <span
          className="absolute ml-3 hidden text-indigo-400 shadow-yellow group-hover:inline-block hover:text-yellow-400"
          style={{
            fontSize: "0.8em",
            transition: "opacity 0.2s",
          }}
        >
          #
        </span>
      </a>
    </Component>
  );
};

function CustomImage({ ref, ...props }: ComponentProps<"img">) {
  let src = (props.src!.toString() as string)
    .replace(/^(https?:\/\/)?nick.af\//gi, "/")
    .replace(/^\/?(content|public)\//i, "/");

  if (src.startsWith("/") || src.startsWith(".")) {
    src = src.replace(REGEX_CONTENT_DIR_LINK, "/$1/$3");
    return (
      <img {...props} src={src.replace(/(.mdx?)$/gi, "")}>
        {props.children}
      </img>
    );
  }

  return <img src={src} {...props} />;
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
      case "blockquote":
      case "sparkles":
        return SparklesIcon;
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

function Blockquote({ ref, ...props }: ComponentProps<"blockquote">) {
  // @ts-ignore
  return <Callout {...props} type="blockquote" className="indigo" />;
}

function Line(props: ComponentProps<"hr">) {
  return (
    <div className="">
      <hr />
    </div>
  );
}

function Pre({ children, ...props }: ComponentProps<"pre"> & CustomMetadataProps) {
  return (
    <div className="relative overflow-clip rounded-lg border border-slate-700">
      {!!props.filename && (
        <div className="border-b border-slate-700 bg-slate-700 px-3 pb-2 pt-3 font-mono text-sm font-medium leading-none">
          {props.filename}
        </div>
      )}
      <pre {...props} className="scroller overflow-auto rounded-b-lg p-3 [&>code]:leading-normal">
        {children}
        <div className="absolute right-2 top-[7px]">
          <CopyToClipBoard />
        </div>
      </pre>
    </div>
  );
}

export const defaultMdxComponents: MDXComponents = {
  // convert h1 to h2 since the layout will ship the h1
  h1: (props: any) => <AnchorHeading as="h2" {...props} />,
  h2: (props: any) => <AnchorHeading as="h2" {...props} />,
  h3: (props: any) => <AnchorHeading as="h3" {...props} />,
  h4: (props: any) => <AnchorHeading as="h4" {...props} />,
  h5: (props: any) => <AnchorHeading as="h5" {...props} />,
  h6: (props: any) => <AnchorHeading as="h6" {...props} />,
  hr: Line,
  pre: Pre,
  a: CustomLink,
  Callout: Callout,
  img: CustomImage,
  blockquote: Blockquote,
};

export function RenderMDX({ body: MDXContent }: { body: MdxContent }) {
  return <MDXContent components={defaultMdxComponents} />;
}
