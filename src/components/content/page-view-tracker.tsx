import { Suspense } from "react";

import { PageViewTrackerLogger } from "./page-view-tracker-logger";

export function PageViewTracker({ children = <></> }: { children?: React.ReactNode }) {
  return (
    <>
      <Suspense>
        <PageViewTrackerLogger />
      </Suspense>
      {children}
    </>
  );
}
