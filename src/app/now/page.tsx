import Link from "next/link";

import { PageViewTracker } from "@/components/content/page-view-tracker";
import NowDetailsItem from "@/components/now-details-item";

export default function Page() {
  return (
    <PageViewTracker>
      <NowDetailsItem id="decal" href="#decal" title="Decal">
        <p>
          My primary focus these days is{" "}
          <Link href="https://usedecal.com" target="_blank" rel="noreferrer" className="link">
            Decal
          </Link>
          , my own startup! Decal is a Solana-based payments and loyalty platform for local
          merchants &mdash; replacing legacy credit card processing with stablecoin rails. That
          means instant settlement, fees closer to 1% (vs. the 2.5&ndash;3.5% merchants get squeezed
          by today), and no chargebacks.
        </p>

        <p>
          The catch is that none of that should actually be visible to the people using it &mdash;
          merchants don&apos;t need to know what a blockchain is, and neither do their customers.
          The two pieces I&apos;m most proud of so far are{" "}
          <Link
            href="https://usedecal.com/blog/smart-payments"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Smart Payments
          </Link>
          , which aggregates whatever stablecoins a customer has into one spendable balance (no
          thinking about which token to pay with, no wallet switching), and{" "}
          <Link
            href="https://usedecal.com/blog/stored-value"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Stored Value
          </Link>
          , a modern loyalty program where prepaid balances earn yield that funds the rewards. Both
          are live, and we&apos;re shipping more on top of them constantly &mdash; you can see
          what&apos;s new on the{" "}
          <Link
            href="https://usedecal.com/changelog"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            changelog
          </Link>
          , or read longer-form launch posts on the{" "}
          <Link href="https://usedecal.com/blog" target="_blank" rel="noreferrer" className="link">
            blog
          </Link>
          .
        </p>
      </NowDetailsItem>
    </PageViewTracker>
  );
}
