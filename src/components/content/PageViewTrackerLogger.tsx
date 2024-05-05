import { Suspense } from "react";
import { unstable_noStore } from "next/cache";
import { recordPageView } from "@/lib/prisma/views";
import { createPageViewPayload } from "@/lib/views";

export async function PageViewTrackerLogger() {
  unstable_noStore();

  const payload = await createPageViewPayload();

  if (!payload.userAgent.isBot) {
    await recordPageView({
      route: payload.pathname,
      identityHash: payload.identityHash,
      referer: payload.referer,
      location: payload.geo.toLowerCase(),
      os: payload.userAgent.os.name?.toLowerCase(),
    });
  }

  return (
    <Suspense>
      {/* intentionally do nothing here */}
      <></>
    </Suspense>
  );
}
