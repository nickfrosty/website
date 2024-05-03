import SITE from "@/lib/config";
import { MASKED_DOMAIN } from "@/lib/views/constants";
import { getMaskedNewsletterRedirect } from "@/lib/views/masked";
import { parseRequest } from "@/lib/views/middleware";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const parsed = parseRequest(req);

    // only allow on the correct masked domain(s)
    if (parsed.domain !== MASKED_DOMAIN) {
      throw Error("Invalid domain");
    }

    if (parsed.key == "newsletter") {
      const { url } = await getMaskedNewsletterRedirect(parsed);
      return NextResponse.redirect(url);
    }

    throw Error("Unknown masked link condition");
  } catch (err) {
    console.warn("Catch all error:");
    console.warn(err);

    // todo: in the future we might want to add some other support here
    // like going to a specific mask related url and/or `parsed.key`

    // default to redirect to the master site
    return NextResponse.redirect(SITE.url);
  }
};
