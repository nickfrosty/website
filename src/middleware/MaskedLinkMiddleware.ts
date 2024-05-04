/**
 * Middleware used to handling the masked links
 * (like those used with the newsletter and short links)
 */

import SITE from "@/lib/config";
import { MASKED_API_PATH } from "@/lib/views/constants";
import { ParsedRequestData } from "@/lib/views/middleware";
import { NextRequest, NextResponse } from "next/server";

export default async function MaskedLinkMiddleware(
  req: NextRequest,
  parsed: ParsedRequestData,
) {
  const { key, path } = parsed;

  if (key == "newsletter") {
    // note: adding a `/` after the masked api path causes an error with nextjs
    // since `path` starts with a slash (resulting in double slashes)
    return NextResponse.rewrite(new URL(`${MASKED_API_PATH}${path}`, req.url));
  }

  // todo: we should add a default rewrite to show a custom page
  // for now we just show the main site, which will have invalid links
  // todo: we could also wrap everything in a try catch to handle this too

  // masked middleware should always redirect to the master site
  // since we did not find a masked link, it must be the root domain
  return NextResponse.redirect(SITE.url);
}
