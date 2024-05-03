import type { NextRequest } from "next/server";
import { MASKED_DOMAIN, MASKED_DOMAIN_LOCALHOST } from "./constants";

export type ParsedRequestData = {
  domain: string;
  path: string;
  key: string;
};

/**
 *
 */
export function parseRequest(req: NextRequest): ParsedRequestData {
  let domain = (req.headers.get("host") as string)
    .replace(/^www\./i, "")
    .split(":")[0];

  let path = req.nextUrl.pathname;
  let key = decodeURIComponent(path.split("/")[1]).toLowerCase();

  if (domain == MASKED_DOMAIN_LOCALHOST) domain = MASKED_DOMAIN;

  return {
    domain,
    path,
    key,
  };
}
