import SITE from "@/lib/config";
import prisma from "@/lib/prisma/client";
import { ParsedRequestData } from "@/lib/views/middleware";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
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
    const linkId = parsed.path
      .replace(`/${parsed.key}`, "--")
      .replace(/^--\/?/i, "");

    /**
     * since we want to also record a visit, and prisma will return the record when updating
     * we can simply update and catch an error if it did not exist
     * (1 less database query, yay!)
     */
    const newsletterLink = await prisma.newsletterPostLinkForSubscriber.update({
      where: {
        id: linkId,
      },
      data: {
        clickCount: incrementViewCounter
          ? {
              increment: 1,
            }
          : undefined,
        lastOpened: incrementViewCounter ? new Date() : undefined,
      },
    });

    // we should never trigger this error manually (since prisma will throw first)
    if (!newsletterLink) throw PrismaClientKnownRequestError;

    if (newsletterLink.destination.startsWith("/")) {
      newsletterLink.destination = new URL(
        newsletterLink.destination,
        SITE.url,
      ).toString();
    }

    return { url: newsletterLink.destination };
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      // todo: we should likely create some sort of "link not found" page
      // that is specific to the newsletter post maybe?
      // return new Response("not found");
    }

    console.warn("Error::");
    console.warn(err);

    return { url: `${SITE.url}${MASKED_NEWSLETTER_PATH}` };
  }
}
