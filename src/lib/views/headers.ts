import { NextRequest } from "next/server";

export const HEADER_PATHNAME = "x-view-pathname";
export const HEADER_IP = "x-view-ip";
export const HEADER_GEO = "x-view-geo";
export const HEADER_REFERER = "referer";
export const HEADER_IP_LOCALHOST = "::1";

/**
 * Inject the custom headers for the view tracker
 */
export function injectViewTrackerHeaders(req: NextRequest): NextRequest["headers"] {
  const headers = new Headers(req.headers);
  headers.set(HEADER_PATHNAME, req.nextUrl.pathname);
  // In Next.js 16+, geo and ip are no longer on NextRequest
  // Use Vercel-specific headers or x-forwarded-for
  const country = req.headers.get("x-vercel-ip-country") || "";
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "";
  headers.set(HEADER_GEO, country);
  headers.set(HEADER_IP, ip);
  return headers;
}
