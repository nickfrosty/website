import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Link from "next/link";

function CustomLink(props: any) {
  const href = (props.href.toString() as string).replace(
    /^(https?:\/\/)?nick.af\//gi,
    "/",
  );

  if (href.startsWith("/")) {
    return (
      <Link {...props} href={href}>
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
  return <MDXRemote {...props} components={components} />;
}
