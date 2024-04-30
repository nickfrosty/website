"use client";
import { useEffect, Suspense } from "react";
import { load, trackPageview } from "fathom-client";
import { usePathname, useSearchParams } from "next/navigation";
import SITE from "@/lib/config";

function TrackPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!process?.env?.NEXT_PUBLIC_FATHOM_ANALYTICS_SITE_ID) {
      return console.warn("Missing Fathom analytics key");
    }

    if (process?.env?.NODE_ENV !== "production") return;

    load(process.env.NEXT_PUBLIC_FATHOM_ANALYTICS_SITE_ID, {
      auto: false,
      includedDomains: [SITE.domain, `www.${SITE.domain}`],
    });
  }, []);

  // Record a page view when route changes (including params)
  useEffect(() => {
    if (!pathname) return;

    trackPageview({
      url: pathname + searchParams.toString(),
      referrer: document.referrer,
    });
  }, [pathname, searchParams]); //

  return null;
}

export default function FathomAnalytics() {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  );
}
