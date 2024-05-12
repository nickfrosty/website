---
category: newsletter
date: 2024-05-12 00:00 EST
title: Week full of Solfate things
---

Hello frens :) New week, new newsletter, lots of Solfate things.

Even though
[last week I said](https://nick.af/blog/2024-05-05-analytics-for-websites-and-emails)
I wanted to dedicate more time to Authar (that content platform I am building),
I ended up spending all my free time this week working on various Solfate
initiatives. So this post will talk all about that work:

- Solfate podcast production issues and solutions
- publishing the Solfate Snapshot newsletter
  - generating thumbnails with AI
  - generating tweets threads with AI?
- soft-launch of the profile system

> PS: If you noticed, I also said last week that the newsletter emails should
> use the short link tracking system. It did not. It had bugs lol. This week
> should actually use the short link system for click tracking.

## What is Solfate?

If you don't know, Solfate is a brand that contains a few different things that
all have a focus within the Solana ecosystem. It has changed quite a bit since I
started using the domain and name "Solfate" back in mid-2022.

It started as a random Solana developer tool I built to hot reload programs
during development. Then I also build a browser extension that would help
resolve _".sol"_ names from [Bondifa's](https://bonfida.org) Solana Name Service
(which I submitted for a [Solana hackathon](https://solana.com/hackathon)).

After getting basically no traction on either of those ideas, and having already
convinced my friend [James](https://twitter.com/jamesrp13) that we should start
a Solana themed podcast, we decided to use the Solfate name and domain. Mostly
since I already had a simple website setup and the name is a Solana themed.

> Fun fact: Solfate does not start with "sol" just to try to use "sol" for
> Solana. It is actually a nerdy pun for the common "chewing glass" meme within
> the Solana ecosystem. Sodium sulfate is one of the chemical compounds in
> glass, so I thought "Solana solfate" was a clever homage to "chewing glass"
> (plus the .com domain was available).

## Solfate podcast

This past week, we published our [50th episode](https://solfate.com/podcast/50)
of the podcast! Which I think is huge (because most shows never publish past
10...). With the show, I have been handling all things "production" and even
edited the first many episodes. Not a strong skill set of mine so it was very
time consuming.

Eventually I found an editor with not the best results and then moved on to
trying a different person. Their results were better, but I kept feeling like I
need to REALLY pay attention to the edit and would always find issues. Even the
same issues. Over. And. Over. Production slowed and slowed, but we already had
many recording sessions scheduled with founders across the ecosystem. So we
continued to record and production fell even farther behind.

About a week ago, we found a new editor and gave him the trial run of episode
#50. It was much better, way less error prone, but for sure more expensive. But
he is also taking over an actual "producer" type role for the show vice "just
and editor". [Creating shorts/clips](https://youtube.com/@SolfatePod), uploading
the video and audio, and drafting the show notes. This takes more off my plate
which is really nice so I think it will be well worth it!

So this week I spend a good bit of time clarifying things with our new
editor/producer Ray. Gathering all the show note details and asset files for the
other 8 episodes we have recorded and not published yet. I also refined my
episode scheduling processes.

> PS: We have big things and an amazing partnership for the
> [Solfate Podcast](https://twitter.com/SolfatePod) coming in a few weeks. I
> can't wait to talk about it publicly.

## Expanding Solfate to do more

As of recently, Solfate has been expanding beyond "just a podcast" (even though
that is still a primary focus). Some of the current expansion includes:

- [DevList](https://solfate.com/devlist) - a public directory of Solana
  developer wallet addresses using non-transferrable NFTs as membership tokens
- [Blog](https://solfate.com/blog) - just what you thing: publishing written
  content
- [Snapshot](https://solfate.com/snapshot) - a short newsletter focused on the
  Solana ecosystem
- [Profiles](https://solfate.com/nickfrosty) - this is nearly publicly launched.
  more below.
- [Discover](https://twitter.com/SolfateHQ) - this is a secret project :)

## The DevList

The Devlist started out as one simple idea: we wish there was a publicly
accessible list of Solana developer wallet addresses. We wanted this
[list of developer wallets](https://solfate.com/blog/devlist-launch) to be high
quality and filled with actual developers. Real people that are building on
Solana.

If you're interested, I detailed how the DevList works in
[this tweet](https://twitter.com/SolfateHQ/status/1743314461320978597) if you
want to read it.

I have a laundry list of things I want to implement with the DevList and offer
more value to my fellow Solana developers. I just need to find the time. Soon,
tm.

## Snapshot newsletter

With a general goal of getting more traffic and awareness of the "Solfate
brand", we decided to start a
[short form newsletter](https://solfate.com/snapshot). I have wanted this for a
long time, but did not personally have the time to continuously write one.

So instead, I started having conversations with people to write it for us! As of
today, [Teague](https://twitter.com/teaguesol) is writing this newsletter for us
and is doing amazing job! He sends me a draft, I do a light review, and I
publish it. The Solfate company pays him for the writing and he gets full credit
as the author. I think it is a great arrangement and we just published our
[third Snapshot newsletter](https://solfate.com/snapshot/phantoms-7m-milestone-colosseum-hackathon-winners-gameshift-partners-with-google-3)
post a few days ago.

### AI generated thumbnails

Like any good written content published online, we needed some sort of thumbnail
images. So... AI. I generate each of the Snapshot newsletter thumbnail images
using the Midjourney AI image generator.

Even though its less creative than actually creating images like a graphic
designer (which is NOT a skill set I posses) I do still find it feels creative.
I HATE the term "prompt engineer" but it is an interesting thing to be able to
craft prompts to get images that you like.

For these images, I take some of the topics or companies talked about in the
newsletter post and use those. The last newsletter post is a great example:
Phantom wallet passing 7 million users and the Colosseum hackathon winners were
both topics. Phantoms logo is a purple ghost and the Roman Colosseum is a well
known structure. So I generated
[this fun image](https://twitter.com/SolfateHQ/status/1789016748987150440) with
loads of purple ghosts in the Colosseum. I'm pretty proud of it.

### AI generated tweet threads?

Yeah... I am using ChatGPT to generate summary tweet threads for the newsletters
(and the full length articles) we publish within Solfate. Its a work in
progress, so maybe I will talk about my learnings a different time.

## Profiles on Solfate

As part of the slow-but-sure further expansion of the Solfate brand, I have been
working on a profile system for the website. With the addition of the DevList
system, I had already built most of the underlying system to support a profile
system, but there were still several things that needed to be added.

With me publishing this personal newsletter post, it is the first time I have
talked about this publicly as it is still a work in progress. But you can see an
[example profile](https://solfate.com/nickfrosty) here and if you have a Solfate
account, you can setup your Solfate profile on the
[profile manager page](https://solfate.com/settings/profile).

PS: I have some big experiments I plan to run with these profiles. And of
course, I will share details about them here soon!

## Discover (a secret project)

Nice try, I am not sharing details publicly yet. I hope you like the teaser
though. If you are reeeally interested, [DM me](https://twitter.com/nickfrosty)
and I might be willing to share details though.

Until next time, bye bye fren :)
