import clsx from "clsx";
import Link from "next/link";
import styles from "~/styles/project.module.css";

export default function ProjectCard({ project, showDateRange = true }) {
  const isLocalPage = true;

  return (
    <Link href={project.url}>
      <a className={styles.card}>
        <span className={styles.inner}>
          {project?.logo && (
            <Link href={project.url}>
              <span className={styles.icon}>
                <img
                  src={project.logo}
                  alt={project.title}
                  width={96}
                  height={96}
                />
              </span>
            </Link>
          )}

          <span className={styles.meta}>
            <span className="block items-center space-y-1">
              <h3
                className={styles.link}
                target={!isLocalPage ? "_blank" : undefined}
              >
                {project.title}
              </h3>

              <span className="justify-between w-full flexer">
                {showDateRange && (
                  <span className={styles.date}>{project.dateRange}</span>
                )}

                <span
                  className={clsx(
                    "md:hidden block",
                    styles.status,
                    styles[`status-${project.status}`],
                  )}
                >
                  {project.status}
                </span>
              </span>
            </span>

            <span
              className={clsx(
                "hidden md:block",
                styles.floater,
                styles.status,
                styles[`status-${project.status}`],
              )}
            >
              {project.status}
            </span>
          </span>
        </span>

        {project?.description && (
          <p className={styles.description}>{project.description}</p>
        )}
      </a>
    </Link>
  );
}
