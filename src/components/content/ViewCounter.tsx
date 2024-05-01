import { getPostViewCount, incrementPostViewCount } from "@/lib/prisma/views";
import { PostViews } from "@prisma/client";
import { Suspense } from "react";

export async function ViewCounter({
  slug,
  className,
}: {
  slug: PostViews["slug"];
  className?: string;
}) {
  const views = await getPostViewCount(slug);
  incrementPostViewCount(slug);

  return (
    <Suspense>
      <div className={className}>{views} views</div>
    </Suspense>
  );
}
