---
draft: false
date: 2021-10-25 00:00 EST
title: "Boomerang: Week 1 complete"
description: "With the first week of building Boomerang.link coming to a close, I have made some really good progress."
category: devlog
tags: devlog, boomerang
---

With the first week of building Boomerang.link coming to a close, I think I have made some really good progress. A good portion of the basic functionality and design complete, there is really only once "major" portion left. Actually sending the "boomerang" reminders. You know, the core product...

![](/media/blog/boomerang/week-1-complete/boomerang.link---landing-page.png)

Here is the (mostly full) list of things I got done in Week 1. Some are more "manger" some more "maker" style tasks. But all move me towards the 2 week launch goal:

- created the [@boomeranglink](https://twitter.com/boomeranglink) twitter page
- launched public landing page, with email waitlist signup
- 2 posts on indie hackers: [feedback for the landing page](https://www.indiehackers.com/post/landing-page-for-my-latest-project-thoughts-fc6e4e7784) and a "todo" style [tweet](https://twitter.com/nickfrosty/status/1451213359446114307?s=20)
- basic user system: login, logout, register (which is disabled on production)

For the actual "core product", aka the bookmark manager and reminder system, I am very happy with the progress I made.'

- setup page structures and routes
- created and honed the initial design (designing is far from my strong suit)

![Google analytics report for week 1](/media/blog/boomerang/week-1-complete/boomerang.link---google-analytics.png)

Traffic and signup stats:

- 55 page views to the landing page (according to google analytics)
- 4 waitlist signups (really just 3 since one is clearly a fake email)

For another metric, the two posts on indiehackers got ~140 views. With 27 clicks on the tweet post and 6 comments on the landing page post. My personal blog here also got an extra traffic boost too, but I wont include that.

## Random list of sad and fun things from week 1

Sometimes I hade CSS grid. As a perfectionist, it is hard to make good designs. Fiddling around with some CSS elements like grid always seem to he a struggle for me.

All the time, I love [tailwind CSS](https://tailwindcss.com). It is just wonderful. Enough cannot be said.

While working on a decent chunk of refactoring some code, I broke the dev site. It took me nearly 3 hours to find and fix the problem. Not only did I feel like I was wasting time and bug hunting, but the broken code was **literally the dumbest thing possible.** At the beginning of a function, I had a random "return false;" statement that was not comment out. Their were 2 commented lines surrounding it, but not that line. Yeah... I felt so stupid....

I refactored a lot of the initial dynamic PHP drive code into JavaScript and AlpineJS components. This will make the app easier to port into a Chrome and Firefox plugin for later. And that is where my end goal is!

![Example of a Boomerang.link bookmark](/media/blog/boomerang/week-1-complete/boomerang.link---example-bookmark.png)

## It's a wrap

That basically sums up the first week of this [2 week SaaS challenge](https://nick.af/blog/time-off-work-means-more-time-to-work).

If you stop reading here, then that's cool.

Further down, I dive into more details about the progress and my thoughts.

If you want to share your thoughts on my thoughts (how meta?) then DM on twitter ([@nickfrosty](https://twitter.com/nickfrosty)) or email me (nick at nick.af). Thanks!

---

## Designing is not my strong suit

Yup. I always find myself taking the most amount of time working on designing products and pages. I can usually think up a decent design in my head. Some sort of vague layout or theme, but turning that into a good front end is time consuming. Maybe it's because I am not so "artistic" in my abilities, or maybe because good design takes time. Maybe both.

But after this first week, I am really happy with the theme and progress on design that I have going. It is minimal and lite, while being dark at the same time.

## A custom SaaS framework for speed

One of the things that is helping me to get what I did done, was the ability to reuse some code that I wrote for other projects. Specifically, I have been slowly making my own sort of "PHP SaaS framework". Slowly baking in the common boilerplate code and styles that I find myself using a lot.

Inside this custom framework of mine, I some of the code features most SaaS products need. Mainly a user system, complete with email activation and password resets, and a simple admin panel. But to be honest the admin panel is only a design concept right now. It doesn't actually allow editing data. But someday.

## Should you refactor code while still early on?

It is a trade off. As a developer, I strive to write good code and write code fast. The problem that I find myself seesawing over is: **which is more right?**

Personally, I think it is a trade off. Sometimes you need to quickly hack together the first version of a page or product. Just to get it out the door. Often, I find that after the very first hatchling of a version is written, I learn so much from the process. As I go, I usually think of better ways to write the code or handle edge cases.

On the other hand, quality code takes time to get right. But it will usually scale much better and faster later. Keeping that "technical debt" gorilla off your back for longer.
