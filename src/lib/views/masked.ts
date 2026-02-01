import { eq, sql } from "drizzle-orm";

import { db, newsletterPostLinksForSubscribers } from "@/db";
import SITE from "@/lib/config";
import { ParsedRequestData } from "@/lib/views/middleware";

import { MASKED_NEWSLETTER_PATH } from "./constants";

type GetMaskedNewsletterRedirect = {
  url: string;
};

/**
 * Get the details related to a masked newsletter url/redirect
 */
export async function getMaskedNewsletterRedirect(
  parsed: ParsedRequestData,
  incrementViewCounter: boolean = true,
): Promise<GetMaskedNewsletterRedirect> {
  if (parsed.path == MASKED_NEWSLETTER_PATH) {
    return {
      url: `${SITE.url}${MASKED_NEWSLETTER_PATH}`,
    };
  }

  try {
    const linkId = parsed.path.replace(`/${parsed.key}`, "--").replace(/^--\/?/i, "");

    /**
     * since we want to also record a visit, and drizzle will return the record when updating
     * we can simply update and catch an error if it did not exist
     * (1 less database query, yay!)
     */
    const [newsletterLink] = await db
      .update(newsletterPostLinksForSubscribers)
      .set({
        clickCount: incrementViewCounter
          ? sql`${newsletterPostLinksForSubscribers.clickCount} + 1`
          : undefined,
        lastOpened: incrementViewCounter ? new Date() : undefined,
      })
      .where(eq(newsletterPostLinksForSubscribers.id, linkId))
      .returning();

    if (!newsletterLink) {
      // Link not found, redirect to newsletter page
      return { url: `${SITE.url}${MASKED_NEWSLETTER_PATH}` };
    }

    let destination = newsletterLink.destination;
    if (destination.startsWith("/")) {
      destination = new URL(destination, SITE.url).toString();
    }

    return { url: destination };
  } catch (err) {
    console.warn("Error::");
    console.warn(err);

    return { url: `${SITE.url}${MASKED_NEWSLETTER_PATH}` };
  }
}
