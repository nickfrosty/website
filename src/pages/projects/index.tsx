import DefaultLayout from "@/layouts/default";
import ProjectCard from "@/components/ProjectCard";
import { NextSeoProps } from "next-seo";
import { Project, allProjects } from "contentlayer/generated";

// construct the seo meta data for the page
const seo: NextSeoProps = {
  title: "Projects",
  description:
    "I'm always working on something. These are my main active projects, and previous projects. All in various states.",
};

export async function getStaticProps() {
  // filter for only non `active` projects from the listing
  const projects = allProjects.filter((item) => item.status != "active");

  // extract the `active` projects
  const featured = allProjects.filter((item) => item.status == "active");

  // todo: sort the projects by their `sortDate`

  return {
    props: { projects, featured },
  };
}

type PageProps = { projects: Project[]; featured?: Project[] };

export default function Page({ projects, featured }: PageProps) {
  return (
    <DefaultLayout seo={seo} className="space-y-16">
      <section className="mb-12 text-center">
        <h1 className="mb-5 text-4xl font-bold">Active Projects</h1>

        <p className="text-lg">
          I&apos;m always working on something. These are my main active
          projects right now.
        </p>
      </section>

      {featured && (
        <section className="grid max-w-5xl grid-cols-1 gap-5 mx-auto mt-4 mb-3 md:grid-cols-2 sm:mt-8">
          {featured?.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </section>
      )}

      <section>
        <hr />
      </section>

      <section className="max-w-2xl mx-auto mb-12 text-center">
        <h1 className="mb-5 text-4xl font-bold">
          Other Projects, <br className="block sm:hidden" />
          Various States
        </h1>

        <p className="text-lg">
          Not every project can be actively and diligently maintained.
          <br className="hidden sm:block" />
          Sometimes I need to set some aside, and let them ride.
        </p>
      </section>

      <section className="grid max-w-2xl grid-cols-1 gap-5 mx-auto mt-4 mb-3 sm:mt-8">
        {projects?.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </section>
    </DefaultLayout>
  );
}
