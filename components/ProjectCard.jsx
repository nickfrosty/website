import Image from "next/image";
import Link from "next/link";
import styles from "~/styles/project.module.css";

export default function ProjectCard({ project, showDateRange = true }) {
  const isLocalPage = true;

  return (
    <Link href={project.url}>
      <a className={styles.card}>
        <div className={styles.inner}>
          {project?.logo && (
            <Link href={project.url}>
              <a className={styles.icon}>
                <Image
                  src={project.logo}
                  alt={project.title}
                  width={96}
                  height={96}
                />
              </a>
            </Link>
          )}

          <div className={styles.meta}>
            <div className="block items-center space-y-1">
              <h3
                className={styles.link}
                target={!isLocalPage ? "_blank" : undefined}
              >
                {project.title}
              </h3>

              {showDateRange && (
                <div className={styles.date}>{project.dateRange}</div>
              )}
            </div>

            <span
              className={`${styles.status} ${
                styles[`status-${project.status}`]
              }`}
            >
              {project.status}
            </span>
          </div>
        </div>

        {project?.description && (
          <p className={styles.description}>{project.description}</p>
        )}
      </a>
    </Link>
  );
}
