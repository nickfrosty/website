import { recordPageView } from "@/lib/prisma/views";
import { createPageViewPayload } from "@/lib/views";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";

export async function PageViewTracker({
  children = <></>,
}: {
  children?: React.ReactNode;
}) {
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
    <>
      <Suspense>
        {/* intentionally do nothing here */}
        <></>
      </Suspense>
      {children}
    </>
  );
}
