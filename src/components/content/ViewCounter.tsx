import { getPostViewCount, incrementPostViewCount } from "@/lib/prisma/views";
import { PostViews } from "@prisma/client";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";

export async function ViewCounter({
  slug,
  className,
}: {
  slug: PostViews["slug"];
  className?: string;
}) {
  unstable_noStore();
  const views = await getPostViewCount(slug);
  incrementPostViewCount(slug);

  return (
    <Suspense>
      <div className={className}>{views} views</div>
    </Suspense>
  );
}
