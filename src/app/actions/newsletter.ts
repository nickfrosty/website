"use server";
import { z } from "zod";
import pg from "pg";

import { db, newsletterSubscribers } from "@/db";
import { ActionFormState } from "@/lib/form-types";

const schema = z.object({
  email: z.string().trim().email("Invalid email address"),
});

export async function subscribeToNewsletter(
  _prevState: ActionFormState<typeof schema>,
  formData: FormData,
): Promise<ActionFormState<typeof schema>> {
  const input = schema.safeParse({
    email: formData.get("email"),
  });

  if (!input.success) {
    return {
      message: "Invalid input",
      errors: input.error.flatten().fieldErrors,
    };
  }

  try {
    const dateAdded = new Date();

    const [subscriber] = await db
      .insert(newsletterSubscribers)
      .values({
        email: input.data.email,
        status: "ACTIVE",
        dateAdded: dateAdded,
      })
      .onConflictDoUpdate({
        target: newsletterSubscribers.email,
        set: { updatedAt: new Date() },
      })
      .returning();

    // console.log("subscriber");
    // console.log(subscriber);
    // console.log(dateAdded);
    // console.log(subscriber.dateAdded.toISOString());

    if (!subscriber) throw "Unable to add subscriber";

    // todo: handle if this email is already on the list
    // if they are, what should we do?
    // we return the same generic message to the user so they cannot guess people on the list
    if (dateAdded.getTime() !== subscriber.dateAdded.getTime()) {
      console.warn(`email already on list:`, subscriber.email);
      // todo: maybe we send a different email with a "you have resubscribed" type of message?
      return {
        success: true,
      };
    }

    // const verificationLink = new URL(
    //   `/newsletter/verify/codehere`,
    //   `https://${MASKED_DOMAIN_LOCALHOST}`,
    // ).toString();

    // const resend = new Resend(process.env.RESEND_API_KEY);

    // const emailResponse = await resend.emails.send({
    //   // lots of good details: https://www.litmus.com/blog/email-subdomains
    //   from: NEWSLETTER_FROM,
    //   // todo: generate a custom reply email?
    //   reply_to: NEWSLETTER_REPLY_TO,
    //   to: subscriber.email,
    //   subject: "Newsletter: Please confirm your email address",
    //   // html: "<p>Please confirm your email</p>",
    //   // text: "Please confirm",
    //   react: NewsletterSubscriberVerifyEmail({
    //     verificationLink: verificationLink,
    //   }),
    // });

    // console.log("emailResponse:");
    // console.log(emailResponse);

    // if (emailResponse.error) {
    //   console.log("emailResponse error:", emailResponse.error);
    //   // todo: store the status in the db, including the error

    //   // todo: trigger some error response message since the email did not actually send

    //   // not all errors will provide an `id` (i.e. resend did not create an email)
    //   if (!emailResponse.data?.id) {
    //     console.log("no email id");
    //   }
    // }

    // if (emailResponse.data?.id) {
    //   console.log("emailId:", emailResponse.data?.id);

    //   // note: the api key must have permission
    //   // const email = await resend.emails.get(res.data.id);
    //   // console.log(email);
    // } else {
    //   console.warn("Some unknown data was returned from the resend api");
    // }

    return {
      success: true,
    };
  } catch (err) {
    console.log("error");
    console.log(err);

    let message = "An unknown error occurred";

    // Handle PostgreSQL unique constraint violation (code 23505)
    if (err instanceof pg.DatabaseError && err.code === "23505") {
      /**
       * todo: we should handle the case of a person already existed in the database, but is in a non active state
       */

      // return a success to not allow people to enumerate the email list
      return {
        success: true,
      };
    }

    return {
      message,
    };
  }
}
