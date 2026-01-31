import type { Metadata } from "next";

import { PageViewTracker } from "@/components/content/page-view-tracker";
import ProjectCard from "@/components/project-card";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  alternates: {
    canonical: "/projects",
  },
  title: `Projects`,
  description:
    "I'm always working on something. These are my main active " +
    "projects and previous projects that I stopped working on for various reasons.",
};

export default async function Page() {
  const allPosts = await getAllProjects();

  // filter for only non `active` projects from the listing
  const projects = allPosts.filter(item => item.frontmatter.status != "active");

  // extract the `active` projects
  const featured = allPosts.filter(item => item.frontmatter.status == "active");

  // todo: sort the projects by their `sortDate`

  return (
    <PageViewTracker>
      <header className="mb-12 space-y-5 text-center">
        <h1>Active Projects</h1>

        <p className="text-lg">
          I&apos;m always working on something. These are my main active projects right now.
        </p>
      </header>

      {!!featured.length && (
        <section className="mx-auto mb-3 mt-4 grid max-w-5xl grid-cols-1 gap-5 sm:mt-8 md:grid-cols-2">
          {featured.map(project => (
            <ProjectCard
              key={project.frontmatter.title}
              project={{
                ...project.frontmatter,
                href: project.href,
              }}
            />
          ))}
        </section>
      )}

      <section>
        <hr />
      </section>

      <section className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="mb-5 text-4xl font-bold">
          Other Projects, <br className="block sm:hidden" />
          Various States
        </h2>

        <p className="text-lg">
          Not every project can be actively and diligently maintained.
          <br className="hidden sm:block" />
          Sometimes I need to set some aside, and let them ride.
        </p>
      </section>

      <section className="mx-auto mb-3 mt-4 grid max-w-2xl grid-cols-1 gap-5 sm:mt-8">
        {projects.map(project => (
          <ProjectCard
            key={project.frontmatter.title}
            project={{
              ...project.frontmatter,
              href: project.href,
            }}
          />
        ))}
      </section>
    </PageViewTracker>
  );
}
