import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

type ComponentProps = {
  className?: string;
  content?: any;
};

export function ArticleContent({ className = "", content = "" }: ComponentProps) {
  return (
    <article className={`article-content ${className}`}>
      <ReactMarkdown rehypePlugins={[rehypeRaw, remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
