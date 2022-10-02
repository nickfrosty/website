/* eslint-disable @next/next/no-img-element */
import Layout from "~/layouts/default";
// import { basicMeta } from "~/utils/seoMetaData";
import Link from "next/link";
import NowDetailsItem from "~/components/NowDetailsItem";
import NowMessageNotice from "~/components/NowMessageNotice";

// construct the meta data for the page
// const metaData = basicMeta({
const metaData = {
  title: "What I'm working on now",
  description:
    "I am always working on various projects. Here are some high level snapshots of what I am working on now.",
};

export default function HomePage() {
  return (
    <Layout seo={metaData} className="md:space-y-16">
      <main className="mx-auto space-y-12 max-w-3xl text-lg">
        <div className="mx-auto space-y-8 max-w-xl">
          <div className="justify-center items-center mx-auto md:flex md:space-x-5">
            <div className="flex justify-center items-center mx-auto space-x-5">
              <Link href="/now">
                <a className="block overflow-hidden flex-shrink-0 rounded-full border border-gray-600 shadow w-30 h-30">
                  <img
                    alt="Nick Frostbutter"
                    className="w-full h-full"
                    src="/img/nick.jpg"
                  />
                </a>
              </Link>

              <Link href="/now">
                <a>
                  <h1 className="text-6xl font-bold md:hidden">/now</h1>
                </a>
              </Link>
            </div>

            <div className="space-y-3">
              <Link href="/now">
                <a className="hidden text-6xl font-bold md:block">
                  <h1 className="">/now</h1>
                </a>
              </Link>

              <p className="">
                Here are some high level snapshots of what I am working on now:
              </p>
            </div>
          </div>

          <NowMessageNotice />
        </div>

        <NowDetailsItem
          id="solana"
          href="#solana"
          title="Solana Blockchain (Core Docs)"
        >
          <p>
            As an <i>&quot;external developer advocate&quot;</i> for the Solana
            foundation, I am actively working on improving the official{" "}
            <a
              href="https://docs.solana.com"
              className="link"
              target="_blank"
              rel="noreferrer"
            >
              Solana documentation
            </a>
            .
          </p>

          <p>
            Here is the{" "}
            <a
              className="link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/solana-labs/solana/issues/26699"
            >
              Github issue
            </a>{" "}
            for the core docs restructure I am working on. As well as the list
            of all{" "}
            <a
              className="link"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/solana-labs/solana/commits?author=nickfrosty"
            >
              my merged PRs
            </a>{" "}
            into the Solana repo!
          </p>
        </NowDetailsItem>

        <NowDetailsItem id="solfate" href="#solfate" title="Solfate Labs">
          <p>
            <a
              href="https://solfate.com"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              Solfate
            </a>{" "}
            is the umbrella name that I am creating developer tools and assorted
            resources for building on Solana. Currently:
          </p>

          <ul className="mx-3 space-y-2 list-disc list-inside md:mx-10">
            <li className="">
              <a
                className="link"
                target="_blank"
                rel="noreferrer"
                href="https://solfate.com/cli"
              >
                Solfate CLI
              </a>
              <span> - </span>
              Published the first version of the CLI that enables hot
              loading/building of Solana programs. Next, going to add auto words
            </li>
            <li className="">
              <a
                className="link"
                target="_blank"
                rel="noreferrer"
                href="https://solfate.com/extension"
              >
                Browser extension
              </a>
              <span> - </span>
              Just added a simple IPFS browser to this browser extension.
              Working on polishing the source code up to release it as open
              source and for the Solana SummerCamp hackathon.
            </li>
          </ul>
        </NowDetailsItem>

        <NowDetailsItem id="logdotfm" href="#logdotfm" title="log.fm">
          <p>
            Building this podcast exploration app,{" "}
            <a
              href="https://log.fm"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              log.fm
            </a>
            , to help build the podcast exploration experience.
          </p>

          <p>
            Right now, I am finishing up the last of the re-write to swap from a
            NuxtJS(Vue) to a NextJS(React) base app.
          </p>
        </NowDetailsItem>
      </main>
    </Layout>
  );
}
