import Link from "next/link";
import NowDetailsItem from "@/components/NowDetailsItem";

export default function Page() {
  return (
    <>
      <NowDetailsItem
        id="solana"
        href="#solana"
        title="Solana Foundation (DevRel)"
      >
        <p>
          I{" "}
          <a
            href="https://twitter.com/nickfrosty/status/1630207372479045637"
            target="_blank"
            className="link"
            rel="noreferrer"
          >
            recently started
          </a>{" "}
          full time at the Solana Foundation, joining the Developer Relations
          team.{" "}
        </p>
        <p>
          I am actively working on improving the official{" "}
          <a
            href="https://docs.solana.com"
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            Solana blockchain&apos;s documentation
          </a>
          . From writing new articles and content, to reorganizing the content
          itself. And yes, even the janitorial tasks like updating npm packages.
        </p>

        <p>
          PS: Here you can find the list of all{" "}
          <a
            className="link"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/solana-labs/solana/commits?author=nickfrosty"
          >
            my merged PRs
          </a>{" "}
          into the Solana repo on github.
        </p>
      </NowDetailsItem>

      <NowDetailsItem id="solfate" href="#solfate" title="Solfate Podcast">
        <p>
          The{" "}
          <a
            href="https://solfate.com"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Solfate Podcast
          </a>{" "}
          is an audio commentary from{" "}
          <Link
            href="https://twitter.com/jamesrp13"
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            @jamesrp13
          </Link>{" "}
          and myself. Each week we are discussing assorted news in the broader
          Solana ecosystem, as well as giving periodic updates on the projects
          we are building.
        </p>

        <p>
          You can explore the podcast on it&apos;s own website, where ever you
          get your podcasts, or from the links below:
        </p>
        <ul className="mx-3 space-y-2 list-disc list-inside md:mx-10">
          <li className="">
            <a
              className="link"
              target="_blank"
              rel="noreferrer"
              href="https://solfate.com/podcast"
            >
              Explore all the episodes on Solfate.com
            </a>
          </li>
          <li className="">
            <a
              className="link"
              target="_blank"
              rel="noreferrer"
              href="https://feeds.transistor.fm/solfate"
            >
              Good ole&apos; fashion RSS
            </a>
          </li>
        </ul>
      </NowDetailsItem>

      {/* <NowDetailsItem id="logdotfm" href="#logdotfm" title="log.fm">
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
        </NowDetailsItem> */}
    </>
  );
}
