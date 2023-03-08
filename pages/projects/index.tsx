import DefaultLayout from "~/layouts/default";
import { getDocsByPath, filterDocs } from "zumo";

import ProjectCard from "~/components/ProjectCard";

// construct the meta data for the page
const metaData = {
  title: "Projects",
  baseHref: "/projects",
  description:
    "I'm always working on something. These are my main active projects, and previous projects. All in various states.",
  contentDir: "projects",
};

export async function getStaticProps() {
  let projects: ProjectRecord[] = await getDocsByPath(metaData.contentDir);

  // extract the `active` projects
  const featured = filterDocs(projects, { status: "active" });

  // remove the `active` projects from the listing
  projects = projects?.filter((item) => item?.meta?.status !== "active");

  // sort the projects by their `sortDate`

  return {
    props: { projects, featured },
  };
}

type PageProps = { projects: ProjectRecord[]; featured?: ProjectRecord[] };

export default function Page({ projects, featured }: PageProps) {
  return (
    <DefaultLayout seo={metaData} className="space-y-16">
      <section className="mb-12 text-center">
        <h1 className="mb-5 text-4xl font-bold">Active Projects</h1>

        <p className="text-lg">
          I&apos;m always working on something. These are my main active
          projects right now.
        </p>
      </section>

      {featured && (
        <section className="grid max-w-5xl grid-cols-1 gap-5 mx-auto mt-4 mb-3 md:grid-cols-2 sm:mt-8">
          {featured?.map((item) => (
            <ProjectCard key={item.meta.title} metadata={item?.meta} />
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
        {projects?.map((item) => (
          <ProjectCard key={item.meta.title} metadata={item?.meta} />
        ))}
      </section>
    </DefaultLayout>
  );
}
