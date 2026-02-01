import Link from "next/link";

import clsx from "clsx";

import { type ProjectFrontmatter } from "@/lib/content";

type ProjectData = ProjectFrontmatter & {
  href: string;
};

type ComponentProps = {
  className?: string;
  project: ProjectData;
  showDateRange?: boolean;
};

export default function ProjectCard({ project, showDateRange = true }: ComponentProps) {
  return (
    <Link
      href={project.href}
      target={project.href.startsWith("http") ? "_blank" : "_self"}
      className="project-card hover-outline"
    >
      <span className="project-card-inner">
        {project?.logo && (
          <img
            className="project-card-icon"
            src={project.logo}
            alt={project.title}
            width={96}
            height={96}
          />
        )}

        <span className="project-card-meta">
          <span className="block items-center space-y-1">
            <h3 className="project-card-link">{project?.title}</h3>

            <span className="flexer w-full justify-between">
              {showDateRange && project.dateRange && (
                <span className="project-card-date">{project.dateRange}</span>
              )}

              <span
                className={clsx(
                  "block md:hidden",
                  "project-status",
                  `project-status-${project?.status}`,
                )}
              >
                {project?.status}
              </span>
            </span>
          </span>

          <span
            className={clsx(
              "hidden md:block",
              "project-card-floater",
              "project-status",
              `project-status-${project?.status}`,
            )}
          >
            {project?.status}
          </span>
        </span>
      </span>

      {project?.description && <p className="project-card-description">{project.description}</p>}
    </Link>
  );
}
