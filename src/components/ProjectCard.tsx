import clsx from "clsx";
import Link from "next/link";
import styles from "@/styles/project.module.css";

type ComponentProps = {
  className?: string;
  metadata: PostMetadata;
  showDateRange?: boolean;
};

export default function metadataCard({
  metadata,
  showDateRange = true,
}: ComponentProps) {
  const isLocalPage = true;

  return (
    <Link href={metadata?.url ?? "#"} className={styles.card}>
      <span className={styles.inner}>
        {metadata?.logo && (
          <img
            className={styles.icon}
            src={metadata.logo}
            alt={metadata.title}
            width={96}
            height={96}
          />
        )}

        <span className={styles.meta}>
          <span className="items-center block space-y-1">
            <h3 className={styles.link}>{metadata?.title}</h3>

            <span className="justify-between w-full flexer">
              {showDateRange && metadata.dateRange && (
                <span className={styles.date}>{metadata.dateRange}</span>
              )}

              <span
                className={clsx(
                  "md:hidden block",
                  styles.status,
                  styles[`status-${metadata?.status}`],
                )}
              >
                {metadata?.status}
              </span>
            </span>
          </span>

          <span
            className={clsx(
              "hidden md:block",
              styles.floater,
              styles.status,
              styles[`status-${metadata?.status}`],
            )}
          >
            {metadata?.status}
          </span>
        </span>
      </span>

      {metadata?.description && (
        <p className={styles.description}>{metadata.description}</p>
      )}
    </Link>
  );
}
