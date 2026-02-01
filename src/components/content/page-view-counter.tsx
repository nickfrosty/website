import { Suspense } from "react";

import { unstable_noStore } from "next/cache";

import { getPageViewCount, incrementPageViewCount } from "@/lib/views/tracking";

export async function PageViewCounter({ route, className }: { route: string; className?: string }) {
  unstable_noStore();
  const views = await getPageViewCount(route);
  incrementPageViewCount(route);

  return (
    <Suspense>
      <div className={className}>{views.toLocaleString()} views</div>
    </Suspense>
  );
}
