"use client";

import clsx from "clsx";
import { useFormState, useFormStatus } from "react-dom";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { ActionFormState } from "@@/types";

export const NewsletterSubscribeForm = ({
  title = "Subscribe for weekly emails",
  className,
}: {
  title?: string;
  className?: string;
}) => {
  const [state, formAction] = useFormState(subscribeToNewsletter, {
    success: false,
    message: "",
  });

  return (
    <form
      action={formAction}
      className={clsx(
        "px-6 py-6 space-y-2 rounded-md shadow-lg card",
        className,
      )}
    >
      {!!state.success ? (
        <>
          <h4 className="!mt-0 text-2xl">Last step: verify your email!</h4>

          <section className="text-lg text-yellow-400">
            {state.message ||
              `Please verify your email address by clicking the "Verify Email" link in the email I just sent you.`}
          </section>
        </>
      ) : (
        <>
          <h4 className="!mt-0 text-2xl">{title}</h4>

          <p>Devlog and assorted tech things. ~5min read.</p>

          <NewsletterSubscribeFormInner state={state} />
        </>
      )}
    </form>
  );
};

const NewsletterSubscribeFormInner = ({
  state,
}: {
  state: ActionFormState<any>;
}) => {
  const { pending } = useFormStatus();

  return (
    <>
      <section className="grid items-center w-full gap-4 md:flex">
        <input
          type="email"
          name="email"
          required={true}
          placeholder="Your email address"
          className={`flex-grow ${
            Object.hasOwn(state.errors || {}, "email") && "!border-red-500"
          }`}
          disabled={pending}
          aria-disabled={pending}
        />
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className="flex-shrink-0"
        >
          Subscribe
        </button>
      </section>

      {state.errors || state.message ? (
        <p className="text-red-500">
          {state.errors?.email?.join(". ") || state.message}
        </p>
      ) : (
        <p className="text-gray-500">
          {/* * after subscribing, you must verify your email address */}
        </p>
      )}
    </>
  );
};
