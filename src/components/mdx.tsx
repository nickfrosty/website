import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Link from "next/link";

const contentDirLinkRegex = new RegExp(
  /^\/content\/(\w+)(.*)\/([\w+-]*(.mdx?))/gm,
);

function CustomLink(props: any) {
  let href = (props.href.toString() as string).replace(
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

function Callout(props: any) {
  return (
    <div
      className={`callout ${(props?.type as string)?.toLowerCase() || ""} ${
        props?.className && props.className
      }`}
    >
      {!!props.title && <div className="callout-title">{props.title}</div>}
      <div className="callout-content">{props.children}</div>
    </div>
  );
}

function Blockquote(props: any) {
  return (
    <div className={`callout mx-4 md:mx-12 mt-5 mb-9`}>
      <div className="callout-content">{props.children}</div>
    </div>
  );
}

const components: MDXRemoteProps["components"] = {
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
        },
      }}
      components={components}
    />
  );
}
