/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/article.module.css";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

type ComponentProps = {
  className?: string;
  content?: any;
};

export function ArticleContent({
  className = "",
  content = "",
}: ComponentProps) {
  return (
    <article className={`${styles.article} ${className}`}>
      <ReactMarkdown rehypePlugins={[rehypeRaw, remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
