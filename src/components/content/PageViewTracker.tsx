import { Suspense } from "react";
import { PageViewTrackerLogger } from "./PageViewTrackerLogger";

export function PageViewTracker({
  children = <></>,
}: {
  children?: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <PageViewTrackerLogger />
      </Suspense>
      {children}
    </>
  );
}
