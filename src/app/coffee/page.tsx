import type { Metadata } from "next";

import Link from "next/link";

import { ArrowRightIcon } from "@heroicons/react/24/solid";

import AvatarImage from "@/components/avatar-image";
import { PageViewTracker } from "@/components/content/page-view-tracker";
import { NewsletterSubscribeForm } from "@/components/newsletter/newsletter-subscribe-form";
import SocialIcons from "@/components/social-icons";

export const metadata: Metadata = {
  alternates: { canonical: "/coffee" },
  title: "Buy me a coffee?",
  description:
    "I'm Nick, a full stack developer building in public. " +
    "If you are interested in helping to support my work, " +
    "please consider buying me a coffee :)",
};

export default function Page() {
  return (
    <PageViewTracker>
      <section className="mx-auto mt-4 grid max-w-6xl grid-cols-1 items-center gap-10 md:gap-30 lg:grid-cols-2">
        <section className="grid grid-cols-2 items-center gap-10 sm:gap-5 md:grid-cols-3 md:items-center md:gap-8 lg:block">
          <div className="col-span-2 mx-auto mb-5 block auto-cols-auto text-center sm:col-span-1 md:text-left">
            <Link href="/" className="inline-block">
              <AvatarImage sizeClass={"w-52 h-52 md:w-48 md:h-48 lg:w-32 lg:h-32"} />
            </Link>
          </div>

          <p className="col-span-2 whitespace-pre-line text-2xl sm:col-span-2 sm:text-2xl">
            <span className="mb-5 inline-block text-3xl lg:mb-0 lg:text-2xl">
              Hi! I&apos;m Nick,
            </span>
            <br className="lg:hidden" /> a{" "}
            <Link
              href="https://github.com/nickfrosty"
              target="_blank"
              className="link-active"
              title="@nickfrosty on GitHub"
            >
              full stack developer
            </Link>{" "}
            and submarine veteran.
            {/* Even in my free time, I like to{" "}
            <Link
              href="/projects"
              className="link-active"
              title="View a list of my projects"
            >
              write code
            </Link>{" "}
            and{" "}
            <Link
              href="/articles"
              className="link-active"
              title="View my technical articles"
            >
              technical articles
            </Link>
            . */}
          </p>

          <NewsletterSubscribeForm
            className="col-span-full md:mt-10 xl:mt-14"
            title="Subscribe to my newsletter?"
          />

          {/* <SocialIcons
            className="space-x-6 text-gray-300 md:pt-8"
            iconSize="w-8 h-8"
          /> */}
        </section>

        <section className="grid gap-8 xl:gap-12">
          <div className="space-y-3">
            {/* <hr className="mb-14 md:hidden" /> */}

            <h2 className="my-10 text-3xl font-bold">Buy me a coffee?</h2>

            <p className="text-lg">
              I drink a lot of coffee. A lot. If you are interested in supporting my work, consider
              buying me a coffee
            </p>

            <Link
              target="_blank"
              href="https://dial.to/?action=solana-action:https://nick.af/api/actions/donate"
              className="flexer link-muted inline-flex space-x-3 text-lg font-medium shadow-indigo"
            >
              <span>Buy me a coffee with crypto</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>

            {/* <p className="py-8">
              You can also send any Solana SPL token to this address:{" "}
              <span className="inline-block px-[0.33rem] my-2 py-1 font-mono !bg-gray-900 rounded">
                {TREASURY_PUBKEY.toBase58()}
              </span>
            </p> */}
          </div>

          {/* <NewsletterSubscribeForm
            className="col-span-full md:mt-10 xl:mt-14"
            title="Subscribe to my newsletter?"
          /> */}
        </section>
      </section>
    </PageViewTracker>
  );
}
