"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { load, trackPageview } from "fathom-client";
import { useEffect } from "react";

interface FathomAnalyticsProps {
  siteId: string;
  pathname: string;
  searchParams?: string;
  includedDomains?: string[];
  enabled?: boolean;
}

export function FathomAnalyticsCore({
  siteId,
  pathname,
  searchParams = "",
  includedDomains,
  enabled = true,
}: FathomAnalyticsProps) {
  useEffect(() => {
    if (!enabled || !siteId) {
      return;
    }

    load(siteId, {
      auto: false,
      includedDomains,
    });
  }, [siteId, enabled, includedDomains]);

  // Record a page view when route changes (including params)
  useEffect(() => {
    if (!pathname || !enabled) return;

    const url = searchParams ? `${pathname}?${searchParams}` : pathname;

    trackPageview({
      url,
      referrer: document.referrer,
    });
  }, [pathname, searchParams, enabled]);

  return null;
}

function FathomAnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <FathomAnalyticsCore
      siteId={process.env.NEXT_PUBLIC_FATHOM_ID!}
      pathname={pathname}
      searchParams={searchParams.toString()}
      enabled={process.env.NODE_ENV === "production"}
    />
  );
}

export default function FathomAnalytics() {
  return (
    <Suspense fallback={null}>
      <FathomAnalyticsInner />
    </Suspense>
  );
}
