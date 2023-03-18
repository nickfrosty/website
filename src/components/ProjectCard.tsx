import clsx from "clsx";
import Link from "next/link";
import styles from "@/styles/project.module.css";

import { Project } from "contentlayer/generated";

type ComponentProps = {
  className?: string;
  project: Project;
  showDateRange?: boolean;
};

export default function ProjectCard({
  project,
  showDateRange = true,
}: ComponentProps) {
  const isLocalPage = true;

  return (
    <Link href={project?.url ?? "#"} className={styles.card}>
      <span className={styles.inner}>
        {project?.logo && (
          <img
            className={styles.icon}
            src={project.logo}
            alt={project.title}
            width={96}
            height={96}
          />
        )}

        <span className={styles.meta}>
          <span className="items-center block space-y-1">
            <h3 className={styles.link}>{project?.title}</h3>

            <span className="justify-between w-full flexer">
              {showDateRange && project.dateRange && (
                <span className={styles.date}>{project.dateRange}</span>
              )}

              <span
                className={clsx(
                  "md:hidden block",
                  styles.status,
                  styles[`status-${project?.status}`],
                )}
              >
                {project?.status}
              </span>
            </span>
          </span>

          <span
            className={clsx(
              "hidden md:block",
              styles.floater,
              styles.status,
              styles[`status-${project?.status}`],
            )}
          >
            {project?.status}
          </span>
        </span>
      </span>

      {project?.description && (
        <p className={styles.description}>{project.description}</p>
      )}
    </Link>
  );
}
