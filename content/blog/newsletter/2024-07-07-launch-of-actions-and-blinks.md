---
category: newsletter
date: 2024-07-07 00:00 EST
title: Launch of Solana Actions and blinks
---

My last 2 months or so has been so packed full of all things Solana Actions and
blinks (blockchain links). Figuring out the spec, working through limitations,
writing documentation, creating the SDK, giving workshops, building example
applications, and pushing it all live to the public Solana ecosystem.

Nerd sniping left and right.

I was also so luckily able to work so closely with the amazing
[Dialect](https://dial.to) team on this powerful new primitive for the Solana
ecosystem.

## How to build a blink

If you are interested in building blinks and actions, I live streamed building a
simple "buy me a coffee" blink for my personal website and detailed it in this
[this twitter thread](https://x.com/nickfrosty/status/1809259702003577029)
(video included).

My website is also open source, so you can look at
[this commit](https://github.com/nickfrosty/website/commit/3d8fe782d1897132193e790822c59a961fcab7b6)
to see how easy it is to go from zero to blink.

![entire commit to add the first blink](/public/media/newsletter/blinks-and-actions/how-to-build-a-blink.png)

## What are Solana Actions?

At their code, the Solana Actions specification is effectively a REST API that
returns some a signable transaction and some metadata about it. The metadata
conforms to this spec which allows action-aware client to make standard HTTP
requests and render common UIs for people to connect their wallet and interact
directly.

You can read the official
[docs for actions](https://solana.com/docs/advanced/actions) (which I wrote!) in
the Solana core docs.

## WTF are blinks??

This is the superpower of actions. The goal of these blockchain links - or
blinks - allows client applications (like browser extension wallets and mobile
apps) to auto detect when one of these special links and inject a standardized
user interface into the canvas the user is viewing.

This effectively allows people to share common URL anywhere on the internet that
can provide all the metadata and eventually a blockchain transaction for a user
to sign. Directly on the site they are viewing.

### How do blinks work?

You share a blink url on a website (like your social media feed):

- the blink-client (like your browser extension wallet) gets the metadata about
  the Solana actions this blink knows about
- it renders an interactive UI (_unfurling_) for the user to:
  - connect their Solana wallet (just like any other dApp)
  - click buttons and fill out standard form style user input
- when the user submit the action (by clicking the button):
  - the blink-client sends the user input and wallet address to the action api
    endpoint
  - the action api performs ANY logic it wants
- the action api returns a Solana transaction (or an error message)
- the user signs the transaction and sends it to the blockchain

You can think of a blink as sharing a URL that can auto-magically be converted
into a blockchain dApp widget on any website.

The best part: blinks on desktop web browsers are currently handled by browser
extensions. These extensions handle fetching the metadata, wallet connection,
and transaction signing flows. It is all handled by the browser extension.

So...... we can inject these Solana "dApp widgets" into any website without the
website developers having to do a single thing. Blinks exist on twitter right
now. The Twitter developers did nothing to enable this. So, we can add "Solana
native" features into any website (in theory)

We can truly make the Solana blockchain a common layer on the internet.

## Image these scenarios for blinks

If you still have not made the complete connection of how powerful blinks can
REALLY be (don't worry, I have noticed lots of people not quite getting there),
image these scenarios:

1. You share a link to your personal website on twitter. When people see that
   tweet, it auto-magically shows buttons for anyone to support your work, leave
   a tip/donation, or buy you a coffee.

   - Checkout
     [this tweet of mine](https://x.com/nickfrosty/status/1809259708244537814)
     that does exactly this.
   - I simply share this normal link on my website (nick.af/now) and the blink
     does its magic, unfurling into a donation style dApp widget directly in the
     twitter feed.

2. An artist wants to sell their digital art. They publish their work as NFT
   based collectibles on a platform like [3.land](https://3.land). They share
   the link to their 3.land collection on social media. When anyone sees their
   social post, the blink unfurls and the user can click a single button to
   purchase the art (without ever leaving the social media platform they are
   already viewing).

3. A writer publishes a periodic newsletter. When they release a new edition of
   the newsletter, they share a link to it on social media. When others scroll
   though their timeline, then see a simple UI where they can enter their email
   address and subscribe to the newsletter.
   - the author can even charge a fee to people that subscribe
   - allowing them to more easily earn income from publishing their newsletter

![This is what my "newsletter signup" blink looks like](/public/media/newsletter/blinks-and-actions/newsletter-signup-blink.png)

If you recently joined my email newsletter from my blink, an extra special gm to
you :)

> For my personal website, I created a "newsletter signup" blink and detailed it
> all in
> [this tweet thread](https://x.com/nickfrosty/status/1809387525238063108)
> (source code included). Now, anytime anyone shares a link to my newsletter
> page ([https://nick.af/newsletter](https://nick.af/newsletter)) wherever
> blinks are supported (currently just twitter), it will show a simple
> newsletter signup blink

## More blinks? Updated spec?

I have a growing list of blinks I want to add to my personal website and some of
my other projects. I shipped two this week for my personal site, and a few other
other random examples in the official Solana Actions repo.

Next up, I have some super fun ones for [Solfate](https://solfate.com) based on
what I have been cooking and is about to launch there.

Soon, I will write a long post about ideas for blinks and how they might work. I
have my eyes on helping to push some spec changes that will unlock even more
amazing experiences powered by blinks (and ultimately, Solana Actions).

If you want to nerd about about blinks and actions, feel free to nerd snipe me
on twitter: [@nickfrosty](https://x.com/twitter)
