import type { SimpleLinkItem } from "@@/types";
import ProseLayout from "@/layouts/ProseLayout";
import { AllTypes, Project, allProjects } from "contentlayer/generated";

// load the config/constants file
import zumoConfig from "@@/zumo.config";
const config = zumoConfig.content.projects;

// construct the meta data for the page
const metaData = {
  title: "Projects",
  description:
    "I'm always working on something. These are my main active projects, and previous projects. All in various states.",
  contentDir: "projects",
};

const breadcrumbParents: SimpleLinkItem = {
  href: "/projects",
  label: "Projects",
};

export async function getStaticPaths() {
  const paths = allProjects.map((item) => {
    return {
      params: {
        slug: item.slug,
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
}

type PageStaticProps = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params: { slug } }: PageStaticProps) {
  // if (process && process.env?.NODE_ENV !== "development")
  //   return { notFound: true };

  const post: Project = allProjects.filter((item) => item.slug == slug)?.[0];

  // give the 404 page when the post is not found
  if (!post) return { notFound: true };

  // strip the tags from the `post`
  post.tags = "";
  // TODO: add the `tag` based post browsing to these blog posts

  return {
    props: { post },
  };
}

type ProsePageProps = {
  post: Project;
  next?: AllTypes;
  prev?: AllTypes;
};

export default function Page({ post, next, prev }: ProsePageProps) {
  return (
    <ProseLayout
      post={post}
      next={next}
      prev={prev}
      config={config}
      breadcrumbParents={[breadcrumbParents]}
      breadcrumbShowHome={false}
    />
  );
}
