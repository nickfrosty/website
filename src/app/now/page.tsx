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
          In March 2023, I started{" "}
          <a
            href="https://twitter.com/nickfrosty/status/1630207372479045637"
            target="_blank"
            className="link"
            rel="noreferrer"
          >
            full time
          </a>{" "}
          at the Solana Foundation, joining the Developer Relations team. Where
          I am focused on improving the official{" "}
          <a
            href="https://solana.com/docs"
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
          <Link
            className="link"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/solana-labs/solana/commits?author=nickfrosty"
          >
            my merged PRs
          </Link>{" "}
          into the Solana monorepo on github.
        </p>

        <p>
          I am also focused on building out the{" "}
          <Link
            className="link"
            target="_blank"
            rel="noreferrer"
            href={"https://solana.com/developers"}
          >
            Solana Developers Hub
          </Link>
          , a one stop shop for anyone to learn how to build on the Solana
          blockchain.
        </p>
      </NowDetailsItem>

      <NowDetailsItem id="solfate" href="#solfate" title="Solfate Podcast">
        <p>
          The{" "}
          <Link
            href="https://solfate.com"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Solfate Podcast
          </Link>{" "}
          is an audio commentary with my friend{" "}
          <Link
            href="https://twitter.com/jamesrp13"
            className="link"
            target="_blank"
            rel="noreferrer"
          >
            @jamesrp13
          </Link>{" "}
          and myself. Each episode, we explore deeper into the Solana ecosystem
          by having conversations with founders and builders in the ecosystem.
        </p>

        <p>
          We have had so many amazing conversations with some of the top teams
          and founders in the Solana community, including founders from Phantom,
          Drip, Solflare, Triton, Helius, Backpack, Dialect, and even Toly
          himself.
        </p>

        <p>
          You can explore the podcast yourself on it&apos;s own website, where
          ever you get your podcasts, or from the links below:
        </p>
        <ul className="mx-3 space-y-2 list-disc list-inside md:mx-10">
          <li className="">
            <Link
              className="link"
              target="_blank"
              rel="noreferrer"
              href="https://solfate.com/podcast"
            >
              Browse all the episodes on Solfate.com
            </Link>
          </li>
          <li className="">
            <Link
              className="link"
              target="_blank"
              rel="noreferrer"
              href="https://feeds.transistor.fm/solfate"
            >
              Good ole&apos; fashion RSS
            </Link>
          </li>
          <li className="">
            <Link
              className="link"
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/SolfatePod"
            >
              @SolfatePod on Twitter
            </Link>
          </li>
          <li className="">
            <Link
              className="link"
              target="_blank"
              rel="noreferrer"
              href="https://youtube.com/@SolfatePod"
            >
              @SolfatePod on YouTube
            </Link>
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
