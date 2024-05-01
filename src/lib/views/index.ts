import { headers as getHeaders } from "next/headers";
import { userAgent as getUserAgent } from "next/server";
import {
  HEADER_GEO,
  HEADER_IP,
  HEADER_PATHNAME,
  HEADER_REFERER,
  IP_LOCALHOST,
} from "./const";

/**
 *
 */
export async function createSHA256hash(input: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Attempt to detect if a given user agent string is from a bot
 */
export function isBot(userAgent: string | undefined = ""): boolean {
  return /bot|chatgpt|facebookexternalhit|WhatsApp|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|MetaInspector/i.test(
    userAgent,
  );
}

/**
 * Create a unique hash of a visitor based on their ip and user agent string
 *
 * By default, we prefix with the current year and month in order to track
 * "unique visitors per month"
 */
export async function createIdentityHash(
  ip: string,
  ua: string,
  prefix?: string,
) {
  if (!prefix) {
    const date = new Date();
    prefix = `${date.getFullYear() + date.getMonth()}`;
  }

  return createSHA256hash(prefix + ip + ua);
}

/**
 *
 */
export async function createPageViewPayload() {
  const headers = getHeaders();
  const pathname = headers.get(HEADER_PATHNAME);
  const referer = headers.get(HEADER_REFERER);
  const ip = headers.get(HEADER_IP) || IP_LOCALHOST;
  const geo = headers.get(HEADER_GEO) || "";
  const userAgent = getUserAgent({ headers });
  const identityHash = await createIdentityHash(ip, userAgent.ua);

  console.log("identityHash:", identityHash);
  console.log("pathname:", pathname);
  console.log("refer:", referer);
  console.log("geo:", referer);
  console.log("refer:", referer);
  console.log("user:", userAgent);

  // for (const key of headers.keys()) {
  //   console.log(key, ":", headers.get(key));
  // }

  return {
    pathname,
    referer,
    ip,
    geo,
    userAgent,
    identityHash,
  };
}
