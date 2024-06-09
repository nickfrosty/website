---
category: newsletter
date: 2024-06-09 00:00 EST
title: New podcast (pod.dev) and a new project (nickle.app)
---

So....I just launched a new podcast and started a new project....

Over the last few weeks, I started putting out social posts around the theme of
podcasts/developers/startups. In a nutshell, I was looking for some interesting
founders that were building in public, sharing their journey about building
their startups.

Especially developer founders. I love developers.

After not really being able to find much "build in public" type content within
the blockchain space, I decided to start pursuing the creation of some. Both
encouraging others to start their own public chronicle of their startup journey
and also looking for a co-host for me to start one. And I found a fren to join
me :)

## Enter pod.dev

The [pod.dev](https://pod.dev) show will be a developer focused series for my
co-host Scott ([@cloakdDev](https://x.com/cloakdDev)) and I to talk openly about
building startups within the blockchain space. Plus getting nerdy about tech
things along the way. It's "build in public" at its core.

Scott and I had actually never met before decided to start this show together
(aside from an occasional post on twitter, but that was very minimal). We did a
quick call for vibe checks on the idea and conversational tone of the show. We
both decided to do the show together! Even in
[our first episode](https://share.transistor.fm/s/5c77a601), I feel like we were
able to dive into nerdy dev things like what are we building (see below for my
new project).

> PS: You like that domain?? I saw it come available on the open market a few
> months ago and for a pretty low price. So I snagged it (without an exact use
> for it). I know, I know. I have a domain problem. :)

## What will we talk about?

We aim to publish every 2 weeks and chronicle the journey of building software
products. We each are building various products in the Solana ecosystem. Each at
very different stages. Scott is much further into this journey than me (building
[FluxBeam](https://fluxbeam.xyz/), [FluxBot](https://fluxbot.xyz/), and
[Rug Check](https://rugcheck.xyz/)).

With the difference in our current journey points, I think we are able to cover
a lot of the spectrum of thoughts on building software products. And since we
are both developers, with a good bit of knowledge about Solana development, I
plan to lean into that as our niche.

We will get nerdy. We will get technical. I am excited.

If you are interested in following along our journeys to build software business
using blockchain, you can use the links here to find the pod.dev show on the
common platforms:

- [Spotify](https://pod.dev/spotify)
- [YouTube](https://pod.dev/youtube)
- [Apple Podcasts](https://pod.dev/apple)
- [PocketCast](https://pod.dev/pocketcasts)
- [pod.dev show website](https://pod.dev)

## What am I building?

Somewhat in tandem of launching pod.dev, I also broke ground on a new project.
It's a personal finance app for the crypto native called Nickle.app. (I own the
domain but there is no site live yet).

> I know what you might be thinking: "did this guy Nick just name a product
> after himself?". Honestly, no (lol). In my domain scavenging bad habit, I
> stubbled across the domain Nickle.app on the open market for _suuuuper_ cheap
> for a single word domain. Like $16 per year cheap. With "nickle" being a
> financial term, I snagged it with an eventual goal to build something like
> this.

## Personal finance app for the crypto native

I am very excited about this project. Especially for the tech to build it. I
might write up a separate blog post detailing my thoughts on how to actually
build this. I did detail a bunch of my thoughts on how I plan to build some of
Nickle.app on pod.dev, but at a high level here it is too:

- each user gets a separate database (multi-tenant using Turso and SQLite!!!)
- user lists all their Solana accounts
- standard RPC provider webhooks will be used to get watch/record new
  transactions for these accounts
- get historical transactions for each account with a queueing engine based on
  `getSignaturesForAddress` and **A LOT** of RPC calls
- write a parsing engine that can roughly categorize Solana transactions based
  on what instructions did

> Even in our first pod.dev episode, Scott both
> [expressed some concerns](https://youtu.be/gx67GU7RIdE?si=9g8DLeG2qzr3R6KU&t=529)
> about how some of these will scale but also that this would be really cool to
> build. This podcast is going to be so fun!

## Authar or Nickle or Both?

A [few weeks ago](https://nick.af/blog/2024-04-28-init-newsletter), I mentioned
I was working on a content publishing platform called Authar. I do still very
much plan to continue building that (especially since I do have a lot of code
written for it). But for now, I am shifting focus to Nickle.app.

The main reason is straight forward: I really _really_ want a way to be able to
track all of my Solana accounts in a central place. Once cohesive dashboard that
I can see activity across all accounts, categorize all transactions for tax
purposes, and even get insights into cost basis and ROI on doing things in the
crypto space.

This finance app solves a need that I presently have. Whereas a blockchain based
content publishing platform like Authar does not solve a problem I am currently
experiencing (even though it is something that is sorely missing in the Solana
ecosystem).

Limited time, means limited work :/ Plus I am
[cooking some other things](https://solfate.com/blog) with Solfate...
