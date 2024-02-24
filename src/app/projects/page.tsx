import type { Metadata } from "next";
import { allProjects } from "contentlayer/generated";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  alternates: {
    canonical: "/projects",
  },
  title: `Projects`,
  description:
    "I'm always working on something. These are my main active " +
    "projects and previous projects that I stopped working on for various reasons.",
};

export default function Page() {
  // filter for only non `active` projects from the listing
  const projects = allProjects.filter((item) => item.status != "active");

  // extract the `active` projects
  const featured = allProjects.filter((item) => item.status == "active");

  // todo: sort the projects by their `sortDate`

  return (
    <>
      <header className="mb-12 space-y-5 text-center">
        <h1>Active Projects</h1>

        <p className="text-lg">
          I&apos;m always working on something. These are my main active
          projects right now.
        </p>
      </header>

      {!!featured.length && (
        <section className="grid max-w-5xl grid-cols-1 gap-5 mx-auto mt-4 mb-3 md:grid-cols-2 sm:mt-8">
          {featured.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </section>
      )}

      <section>
        <hr />
      </section>

      <section className="max-w-2xl mx-auto mb-12 text-center">
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

      <section className="grid max-w-2xl grid-cols-1 gap-5 mx-auto mt-4 mb-3 sm:mt-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </section>
    </>
  );
}
