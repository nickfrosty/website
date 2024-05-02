import { NextResponse, type NextRequest } from "next/server";
import { injectViewTrackerHeaders } from "@/lib/views/headers";

export const config = {
  matcher: [
    {
      /*
       * Match all paths except for:
       * 1. /api/ routes
       * 2. /_next/ (Next.js internals)
       * 3. /_proxy/ (special page for OG tags proxying)
       * 4. /_static (inside /public)
       * 5. /_vercel (Vercel internals)
       * 6. /media/ (website media files)
       * 7. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
       */
      source:
        "/((?!api/|_next/|_proxy/|_static|_vercel|media/|[\\w-]+\\.\\w+).*)",
      /**
       * These could be used to ignore prefetch requests from "next/link" components
       */
      // missing: [
      //   { type: "header", key: "next-router-prefetch" },
      //   { type: "header", key: "purpose", value: "prefetch" },
      // ],
    },
  ],
};

export function middleware(req: NextRequest) {
  return NextResponse.next({
    request: {
      headers: injectViewTrackerHeaders(req),
    },
  });
}
