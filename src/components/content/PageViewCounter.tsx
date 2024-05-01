import type { PageView } from "@prisma/client";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { getPageViewCount, incrementPageViewCount } from "@/lib/prisma/views";

export async function PageViewCounter({
  route,
  className,
}: {
  route: PageView["route"];
  className?: string;
}) {
  unstable_noStore();
  const views = await getPageViewCount(route);
  incrementPageViewCount(route);

  return (
    <Suspense>
      <div className={className}>{views} views</div>
    </Suspense>
  );
}
