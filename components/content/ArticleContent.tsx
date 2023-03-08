/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/article.module.css";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

type ComponentProps = {
  className?: string;
  content?: any;
};

export function ArticleContent({ className, content }: ComponentProps) {
  return (
    <article className={styles.article}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, remarkGfm]}
        components={{ code: CodeBlock }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}

type CodeBlockProps = { className?: string; inline?: boolean; children: any };

/*
  Define a custom reusable code block component
*/
function CodeBlock({ className, inline, children }: CodeBlockProps) {
  // trim white space and extra lines at the end
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      children[i] = children[i].trim();
    }
    // children[children.length - 1] = children[children.length - 1].trim();
  } else if (typeof children === "string") children = children.trim();

  // compute the `language`
  let language = className?.slice("language-".length).toLowerCase() ?? "";

  if (language === "sh") language = "bash";

  if (inline) return <span className="inline-code">{children}</span>;
  else
    return (
      <SyntaxHighlighter
        className={className}
        style={dracula}
        language={language}
        showLineNumbers={true}
      >
        {children}
      </SyntaxHighlighter>
    );
}
