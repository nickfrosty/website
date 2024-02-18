import type { Metadata } from "next";
import type { SimpleLinkItem } from "@@/types";
import ProseLayout from "@/layouts/ProseLayout";
import { Project, allProjects } from "contentlayer/generated";

// load the config/constants file
import zumoConfig from "@@/zumo.config";
const config = zumoConfig.content.projects;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "I'm always working on something. These are my main active projects, and previous projects. All in various states.",
  // contentDir: "projects",
};

const breadcrumbParents: SimpleLinkItem = {
  href: "/projects",
  label: "Projects",
};

type PageProps = {
  params: {
    slug: string;
  };
};

export default function Page({ params: { slug } }: PageProps) {
  // if (process && process.env?.NODE_ENV !== "development")
  //   return { notFound: true };

  const post: Project = allProjects.filter((item) => item.slug == slug)?.[0];

  // give the 404 page when the post is not found
  if (!post) return { notFound: true };

  // strip the tags from the `post`
  post.tags = "";
  // TODO: add the `tag` based post browsing to these blog posts

  return (
    <ProseLayout
      post={post}
      // next={next}
      // prev={prev}
      config={config}
      breadcrumbParents={[breadcrumbParents]}
      breadcrumbShowHome={false}
    />
  );
}
