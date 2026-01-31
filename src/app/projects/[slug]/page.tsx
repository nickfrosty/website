import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { PageViewTracker } from "@/components/content/PageViewTracker";
import ProseLayout from "@/layouts/ProseLayout";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getProjectWithMDX,
  getAllProjects,
} from "@/lib/content";

// load the config/constants file
import zumoConfig from "@@/zumo.config";

const config = zumoConfig.content.projects;

const breadcrumbParents: SimpleLinkItem = {
  href: "/projects",
  label: "Projects",
};

export async function generateStaticParams() {
  const allPosts = await getAllProjects();
  return allPosts
    .filter(item => !item.frontmatter.draft && !item.href.startsWith("http"))
    .map(item => ({
      slug: item.href.replace(/^\/projects\//gi, ""),
    }));
}

export async function generateMetadata({ params }: PagePropsWithSlug): Promise<Metadata> {
  const { slug } = await params;
  const post = await getProjectBySlug(slug);

  if (!post) {
    return notFound();
  }

  return {
    title: `Project: ${post.frontmatter.title}`,
    description:
      post.frontmatter.description ||
      "Read more about this project and it's current state of development.",
    alternates: {
      canonical: post.href,
    },
  };
}

export default async function Page({ params }: PagePropsWithSlug) {
  const { slug } = await params;
  const post = await getProjectWithMDX(slug);

  if (!post) {
    return notFound();
  }

  return (
    <PageViewTracker>
      <ProseLayout
        post={{
          ...post.frontmatter,
          slug,
          href: `/projects/${slug}`,
          body: post.body,
          tags: [], // strip tags from projects
        }}
        config={config}
        breadcrumbParents={[breadcrumbParents]}
        breadcrumbShowHome={false}
      />
    </PageViewTracker>
  );
}
