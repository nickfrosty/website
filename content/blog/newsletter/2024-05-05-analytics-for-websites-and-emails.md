---
category: newsletter
date: 2024-05-05 00:00 EST
title: Analytics for websites and emails
---

Hello frens :) Welcome to another newsletter. This week was me bouncing around
between a few projects and tasks for each:

- migrating the Solfate database from MySQL to Postgres
- launching [Solfate Snapshot](https://solfate.com/snapshot) (a periodic Solana
  ecosystem newsletter)
- setting up web analytics on my various sites (and coding a custom system for
  it...)
- adding click tracking to this custom newsletter system

## Solfate Snapshot

Over the course of the last few weeks, I have been working on launching the
[Solfate Snapshot](https://solfate.com/snapshot), a periodic newsletter about
the Solana ecosystem, published every 2 weeks. To help speed up that whole
thing, I am actually using [Beehiiv](https://beehiiv.com) as the newsletter
provider. I like it so far, but I am already finding some weird quirks in it. So
I am taking note of things I do not like so I can bake them into this custom
newsletter system I am working on (which will be included into Authar).

With only having launched Snapshot publicly a few days ago, the traction is much
better than I thought it would be. We have over 100 signups. Not so bad! I am
excited to see some metrics on it when we send out the next edition of the
newsletter in a week or so.

## Web analytics with privacy

I have also been wanting to get better (any) insights into my various
projects/sites. Starting with basic web traffic analytics. I care a lot about
privacy, so I wanted to make sure if I enabled tracking of visitors on my
various websites, it was with a privacy focused solution.
[Plausible](https://plausible.io/) and [Fathom](https://usefathom.com/) came to
mind.

After deciding to go with Fathom (they allow more sites for a lower costs), I
quickly implemented it on about 4 sites. There were some quicks to implementing
it with the NextJS app router. This is also when I realized that even as a
"privacy focused" web analytics solution, there was still a lot of traffic being
missed from the analytics. The reason: ad blockers.

Turns out, ad blockers still block them (including the native ad block in Brave
browser). Which I guess made sense after I thought about it. The issue I have
with this is that based on the more technical nature of the audience for my
various sites, most of them will use various ad blockers. So I will miss out
capturing any details about a large portion of visitors.

So.... I sort of wrote my own simple analytics solutions which I am currently
testing out on [my personal site](https://nick.af). With it, I am able to
capture the simple details I desire and it is not blocked (while still
anonymizing visitors). I am able to more accurately see specific pages viewed,
referrer, country, and operating system.

The cool thing about how this works is that it effectively gets around all ad
block solutions since it is actually logging data on my site's backend. I think
its a pretty elegant.

### How it works

Since all of my sites use NextJS and its app router, I leverage React server
components and the NextJS "no cache" headers. Here is the gist of how it works:

1. A react server component called
   [`PageViewTracker`](https://github.com/nickfrosty/website/blob/4d3117193622f9909742d8f5a948c7491a0703ac/src/components/content/PageViewTracker.tsx#L9-L15)
   wraps
   [each page](https://github.com/nickfrosty/website/blob/4d3117193622f9909742d8f5a948c7491a0703ac/src/app/articles/%5Bslug%5D/page.tsx#L84-L95)
   that I want to record visits.
2. When the page loads, it will record the page visit details in the database
   using the site's backend (via
   [`PageViewTrackerLogger`](https://github.com/nickfrosty/website/blob/4d3117193622f9909742d8f5a948c7491a0703ac/src/components/content/PageViewTrackerLogger.tsx#L12-L18))
3. Since the logger component uses React's `Suspense` and NextJs "no store",
   this will always be rendered in the server, keeping the database operations
   secure. I can record any of the request's details I want (like route,
   referrer, operating system, etc)
4. When storing the visitor's info in the database, they are anonymized by
   creating a SHA-256 hash of some of the visitor's details, effectively
   creating an anonymous fingerprint. This still allows me to see what internal
   pages a person clicks around to but I cannot tell who the person actually is.

My favorite part of this is two things. First, since this system is logging info
via the webpage loading, no cookies are used (lovely for GDPR). Second, as the
site builds and deploys, nearly all of the static content can still be
pre-rendered and cached just like before (keeping page load times as low as
possible). Only the "log this visitor" portion is added in.

I plan to write a more complete [developer article](/articles) about how this
whole thing works, complete with code snippets of course.

## Analytics for the email newsletter

With the even further pursuit of analytics and insights, and me starting up
[this newsletter](/newsletter), I decided to take a shot at gathering some here
too (or at least setting myself up to gather some).

Most email platforms do two kinds of tracking: link clicks and email opens.
These are generally implemented the same way across all email providers and they
each seem pretty straight forward to implement:

1. **tracking link clicks** - simply convert each link in every email you send
   to be a unique link (sort of like a link shortener service). If a person
   clicks the link in email, they are actually clicking a unique "masked" link
   that makes a database entry and redirects to their final destination.
2. **tracking email opens** - this is a pretty similar idea but with embedding a
   small image in the email with a unique url. This is called "pixel" tracking
   since it is usually a 1x1 pixel image included in the email. When the email
   gets rendered, the image is rendered from the unique url, allowing the
   backend to handle this "email was opened" action.

### Starting with click tracking

This past week, I implemented the link click tracking within this newsletter
system. Mostly since the pixel tracking is basically just a layer on top of the
link tracking. So if you are looking at this newsletter post via email (and not
on my website), you will see the "masked" version of each link. Each using my
custom domain: `nicks.link`.

I wanted to implement it directly within NextJS middleware, but turns out
middleware does not really support database connections very well. So instead, I
use the middleware to listen for requests to my short domain (`nicks.link`) and
rewrite them to a normal NextJS `route.ts` file which handles the link unmasking
logic.

The extra nice thing about this is that with the custom newsletter system I
setup last week, the newsletter links can be auto masked by adding a few lines
of code to the email sending script. All from within the same processor that
converts the markdown/mdx to a valid email.

## Next week?

There are some really fun things I am working on within
[Solfate](https://solfate.com) that will be quietly launched next week. So if
you subscribe to this newsletter, you will likely hear about it first.

I have also decided to put extra focus into Authar and submit it for the
Bonkathon hackathon that just started. So I am excited to have another
motivation to make more progress on it.

Until next time, bye bye fren :)
