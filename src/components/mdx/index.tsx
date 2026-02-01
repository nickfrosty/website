import React, { Children, type ComponentProps } from "react";

import Link from "next/link";

import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";

import { Callout } from "@/components/ui";

import { REGEX_CONTENT_DIR_LINK, slugify } from "@@/utils/helpers";

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
        className="no-underline! shadow-none!"
      >
        {children}
        <span
          className="shadow-yellow absolute ml-3 hidden text-indigo-400 group-hover:inline-block hover:text-yellow-400"
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

function Line(props: ComponentProps<"hr">) {
  return (
    <div className="">
      <hr />
    </div>
  );
}

export const defaultMdxComponents: MDXComponents = {
  // convert h1 to h2 since the layout will ship the h1
  h1: props => <AnchorHeading as="h2" {...props} />,
  h2: props => <AnchorHeading as="h2" {...props} />,
  h3: props => <AnchorHeading as="h3" {...props} />,
  h4: props => <AnchorHeading as="h4" {...props} />,
  h5: props => <AnchorHeading as="h5" {...props} />,
  h6: props => <AnchorHeading as="h6" {...props} />,
  hr: Line,
  blockquote: props => <Callout type="blockquote">{props.children}</Callout>,
  pre: ({ children, ...props }) => (
    <CodeBlock {...props}>
      <Pre>{children}</Pre>
    </CodeBlock>
  ),
  a: CustomLink,
  Callout: Callout,
  img: CustomImage,
};

export function RenderMDX({ body: MDXBody }: { body: MdxContent }) {
  return <MDXBody components={defaultMdxComponents} />;
}
