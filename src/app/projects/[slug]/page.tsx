import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { SimpleLinkItem } from "@@/types";
import ProseLayout from "@/layouts/ProseLayout";
import { allProjects } from "contentlayer/generated";

// load the config/constants file
import zumoConfig from "@@/zumo.config";
const config = zumoConfig.content.projects;

const breadcrumbParents: SimpleLinkItem = {
  href: "/projects",
  label: "Projects",
};

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return allProjects
    .filter((item) => !item.draft && !item.href.startsWith("http"))
    .map((item) => ({
      slug: item.href.replace(/^\/projects\//gi, ""),
    }));
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const post = allProjects.find((post) => post.slug == slug);

  if (!post) {
    return notFound();
  }

  return {
    title: `${post.title} | Projects`,
    description:
      post.description ||
      "Read more about this project and it's current state of development.",
    alternates: {
      canonical: post.href,
    },
  };
}

export default function Page({ params: { slug } }: PageProps) {
  if (process && process.env?.NODE_ENV !== "development") {
    return notFound();
  }

  const post = allProjects.find((item) => item.slug == slug);

  if (!post) {
    return notFound();
  }

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
