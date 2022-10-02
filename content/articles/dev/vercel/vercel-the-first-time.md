---
featured: true
title: "24 things I learned deploying to Vercel"
blurb: "A mix of good, and less than good, things I learned while deploying a project to Vercel for the first time."
description: "A mix of good, and less than good, things I learned while deploying a project to Vercel for the first time. Mostly good, but some...weird ones..."
date: 2022-03-09 00:00 EST
image: /media/articles/vercel/vercel-the-first-time-thumb.jpg
# social_image: /media/articles/vercel/vercel-the-first-time.jpg
tags: vercel, devops, nuxt, prisma
---

Recently, a friend turned me onto Vercel. Well, I guess it has been a few months now. A mix of good, and less than good, things I learned while deploying a project to Vercel for the first time. Mostly good, but some...weird ones...

![](/media/articles/vercel/vercel-the-first-time-thumb.jpg)

For starters, I am loving it. But, like everything in life, it is not without its hiccups.

Both on the side of **_the platform_** having things that may work suboptimal, **_and me as a new user_** to their platform trying to get acquainted and learning the ropes.

---

<center><h2>Quick background on Vercel?</h2></center>

### What is Vercel?

It’s a wonderful platform to automatically deploy your projects from a git repo.

Create an account, you connect your git repo, and push changes. Vercel handles the rest.

In the end, Vercel is basically a really fancy layer built on top of Amazon’s AWS platform. You can even use "serverless functions" built on top of AWS lambda functions. Giving your code very high scalability, right out of the box.

### How does Vercel work?

They have a fairly comprehensive continuous deployment (CD) pipeline, Vercel automates the creation of unique builds for every commit to your git repo. Production, staging, or "preview" commits.

With each `git commit` you make, Vercel will automatically build your project and create a unique url to access each individual build. Turning every single git repo commit into a fully functional "preview" deployment.

Anyone on your team can access, use, and review your app from these unique urls. Even password protect the build urls.

Once satisfied with your project changes, you simply `git commit` or merge into to your "production" branch. Vercel will automatically build and make it available on your primary/production domain.

---

With that intro aside, here are **24** this I learned deploying my first project to Vercel (in no particular order):

<div class="text-2xl msg warn">
PS: I am not affiliated with Vercel, other than as a happy user. (but I would not mind a job offer 😇)
</div>

## #1. Almost too easy to use...

The ease of use of using Vercel is just wonderful. Once you get setup\* and your git repo connected, deploying your web app is stupid simple. Just `git commit` and `git push` and you are golden.

## #2. Took me a bit to get a green build

Yeah... it did take me a bit of time to get properly setup with a successful build. I banged my head against the wall for a long time while trying to get my first project working.

I suspect at least some of this was user error (I do dumb things sometimes, who doesn't), some of it due to me using NuxtJS (which is not Vercel's best supported framework), and some due to the platform itself.

<div class="msg note">
To their full credit, multiple awesome people from Vercel did reach out to me on Twitter (<a href="https://twitter.com/steph_dietz_">@steph_dietz</a> and <a href="https://twitter.com/gudmundur">@gudmundur</a>) after me publicly taking about some of my struggles. So that was awesome!
</div>

## #3. auto deployments = wonderful

Each `git commit` you make, Vercel will automatically build your project and create a unique url to access each individual build. Turning each repo commit into a "preview" deployment.

Anyone on your team can access, use, and review your app from these unique urls.

Once satisfied with your project changes, you simply `git commit` or merge into to your "production" branch, and Vercel will automatically build and make it available on your primary/production domain.

Then, after the successful build, Vercel's github bot will attach the link to the specific build url to view the preview or production build of that repo or PR. Very handy when others in your organization want to use GitHub for bug tracking.

### #4. Deleting old builds?

As your project grows, the list of Vercel builds you have in your dashboard will grow.

At first, I could not find a way to manually clear the list of builds on the dashboard. Sad. I would have expected the option as part of the dropdown attached to each build.

But after more exploring, I found it. You can delete builds. But you have to go to the specific page for that build. From this page, and this page only, you can use the options' dropdown to delete this specific build.

1. Navigate to the specific build page
2. click the 3 dot style "more options" dropdown in the top left corner
3. then you can delete the build

<div class="msg note">
<h4>My opinion:</h4>
Users should be able to select the option from the project dashboard page. You know, where it lists out all the recent builds anyway. Just add the same delete option to the more options menu.
</div>

To me, it seems like a better user experience. Plus, it would require at least 3 less page requests to delete a build. And that is just more efficient 😁

## #5. vercel-build command

In your `package.json` file, you can define the `vercel-build` command to trigger any commands or build steps for each of the serverless functions that are built on Vercel.

This come in super handy when you have a certain package that may need to generate a configuration as part of the build, like Prisma for example. See the Prisma section below...

## #6. "zero config" option

While Vercel has a "[zero config](https://vercel.com/guides/upgrade-to-zero-configuration)" option (or at least that's what they used to call it).

You can create a `vercel.json` file in the root of your repo, then use that to define almost all of your project settings. Including routes, headers, and env variables. Quite nifty.

But, it seems like the good people of Vercel are moving away from this config file and trying to encourage developers to use the Vercel dashboard. Normally, I would be all for that. The dashboard is pretty great, and certainly very wholesome.

### #7. Nuxt on Vercel

But, and this is a big butt: to use NuxtJS on Vercel, you have to define your project with a `vercel.json` file. At least to use [NuxtJS SSR](https://nuxtjs.org/docs/concepts/server-side-rendering/) (which is kind of the whole reason Nuxt exists).

The only way that seems to work to deploy a Nuxt SSR app to vercel is using this "[vercel-builder](https://github.com/nuxt/vercel-builder)" project from the Nuxt community.

And on top of this, the built in "_auto generate your API routes with Vercel from the 'api' folder_" thing that Vercel markets also does not seem to work with Nuxt. So in order to create a serverless API for a Nuxt app, I have to manually define each of the API routes in my `vercel.json` file. Annoying, but not the end of the world.

PS: If anyone wants to talk about this, feel free to each out. I am more than happy to talk. Either to help guide you in getting your Nuxt app working on Vercel, or helping people make the process better. DM me on Twitter: [@nickfrosty](https://twitter.com/nickfrosty)

## #8. env vars up the wazoo

To add on to the different types of deployments Vercel can do (e.g. production, staging, etc), you can also specify specific env vars for each build type.

For example, in your production app you want to use your production "live mode" Stripe API keys to process your payments. Great. But on the staging app, you want to use the "test mode" keys to not monkey up your actual Stripe data. No problem.

Also by default, there are tons of env vars that are auto generated for each build. Some of them very useful, some of them less useful for me. But hey, they are available if you need them.

You can read all about them on the Vercel env variable docs: [https://vercel.com/docs/concepts/projects/environment-variables](https://vercel.com/docs/concepts/projects/environment-variables)

<div class="msg warn text">
Although you can set custom env vars for each build type, I did not see a easy way to copy the env variable names between build types. So you will have to manually add them for each build type.
</div>

Kind of annoying, but I can easily live with it. Especially since I only needed to set them up the one time.

### #9. Are you using Axios on Vercel?

When using Axios (at least with Nuxt), you will likely need to specify the `API_URL` env variable. Without it, the Nuxt SSR request will fail (like those made via `nuxt-auth`).

From your Vercel project dashboard, navigate to your project settings -> environment variables page. For each of your build environments (e.g. production, staging, etc): add a new env variable names `API_URL` with a value of the base url you are using for the project.

For example: if your app's API is located at `https://my.other.link/api` -> your `API_URL` should be `https://my.other.link/`.

<div class="msg note text">
Doing this will also solve a problem with `nuxt-auth` on Vercel that appears to log the user out after any page refresh (aka not navigating by the client side rendering). I struggles for hours (maybe days) on this problem.
</div>

## #10. All serverless functions = scale to infinity?

With the way that Vercel works, it seems like every single portion of your app will run on serverless functions (aka AWS lambdas). So in theory, your app code can scale to infinity. Which is super cool.

Honestly, I am not sure if all of the customer apps (or the entire platform) run on top of these serverless functions, but I would not be surprised.

At least for me using NuxtJS, all of my code for [other.link](https://other.link) is running on top of these serverless functions. At first, I did need to make some specific and calculated coding techniques to make my API run on these functions.

The biggest reason is because the serverless functions are limited to 50MBs (zipped) after their build is complete. Making them lightweight enough to run and "cold start" on the AWS lambdas. And I am pretty sure this 50MB is an AWS specific limit, not necessarily Vercel.

If you writing Node js code for your project, read this Vercel doc:

- [https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-request-and-response-objects](https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-request-and-response-objects)

## #11. Serverless functions and databases...

While the whole "serverless" architecture is very interesting to me, there is one big problem with it. Databases. Specifically database connections. Let me explain:

Each serverless function is basically a separate instance of your web app, or at least a portion of it. If that function makes a database connects to your database and makes a request, it is likely leaving that connection open. This way it can more easily connect again and get database records when needed.

But as the traffic to your app/website start to die off, these stateless serverless functions will turn off. Often not properly closing the database connections. If your site has frequent traffic spikes, then you may very quickly reach your database's connection limits. Forcing your database to a halt. Big problem.

From the research I have done, the best solutions to these known stale connection issues is using "connection pools". If you are using [Prisma.io](https://www.prisma.io/) like me, I think there is some database connection pooling support built in (awesome). Postgres fans could try pgBounce (but I'm a MySQL kinda guy).

But if you are handing all your connections yourself, it might get hairy quick.

Right now, there are some VERY cool "serverless database" solutions coming out. Including [Fauna DB](https://fauna.com/) and [PlantScale](https://planetscale.com/). I am planning on using PlanetScale for an upcoming project where I think scaling might become an issue for me: my [custom podcast playlist](https://log.fm) app.

## #12. Vercel CLI

What kind of world would we live in in our hosting platforms did NOT have their own CLI. All the cool, hip platforms do. Vercel is no different.

Here are some of my high level thoughts on the Vercel CLI:

- fairly simple and easy to use
- you can link your terminal and git repo to a Vercel project (visible in the Vercel dashboard) directly from the CLI.
- push your current project's code to be build on Vercel (without making a full `git commit`), you know, to test thing.
  - by default, the CLI will create a development build for testing. But you can the CLI build directly to production with the `--prod` flag. Very handy for hot fixes.
- after the build is complete, you will get clickable links to view the build on your domain

### #13. I have had some issue with the Vercel CL though

When running `vercel dev`, if the vercel cli does not have access to your current working directory, then it may fail to actually build/launch your app locally. Makes sense I guess.

When this failure happens:

- the CLI fails to create the `node_modules_prod` directory
- which for some reason also deletes all the all the dev dependencies for your project from the ‘node_modules’ directory (weird, but okay I guess)
- and then it removes the dev dependencies from your package.json file. (again, super weird)
- all of these will likely result in a LOUD failure of your build command, and your local project

The real problem lies in this: since it deletes all the dev dependencies, you will have to reinstall them and add them back to your package.json...good thing we all use git right?

- I was getting the listing of all my dev dependencies from my git changelog, since these changes were now all pending commits

## #14. Build caches for speed!

The Vercel deployment/build system is pretty nice. It has a built in caching system that tries to make your builds faster by caching the `node_modules` folder after your first build. And yes, it does make the builds noticeably faster. Often by several minutes.

But it does have some limitations/drawbacks:

### #15. Random failed/success builds?

Sometimes my builds will fail, sometimes they will pass. All from the same git commit. My only guess is that this is an issue with the Vercel build cache.

If you run into this sort of problem, check out these articles (they helped me):

- [https://stackoverflow.com/a/66841372/17609674](https://stackoverflow.com/a/66841372/17609674)
- [https://stackoverflow.com/a/61101087/17609674](https://stackoverflow.com/a/61101087/17609674)

### #16. Old caches cause problems

When you push an update to your repo, Vercel will try to use the cached `node_modules` build files. Makes sense. Caching.

But this will always be from an older build. Which means it will likely use the older version of some packages or generated artifacts from packages. Like Prisma (see the Prisma section below)

This can become problematic and give errors if you have a npm package that needs to generate new code each build, or only for some builds when you make certain updates.

For most cases, I recommend adding that particular build step into the `vercel-build` script command to ensure it gets built every time. This will result in your builds taking longer though.

Or, you can also manually force the build without the cache from the Vercel dashboard (only for git repo pushes) or via the Vercel cli using `vercel -f` or `vercel -f --prod`

PS: If you use Prisma and Vercel, read the dedicated Prisma section at the bottom 👇

## #17. npm vs yarn

Vercel will try to auto detect if you like using **npm** or **yarn** for your package manager.

- if your repo has a `package-lock.json`, it will use npm
- if not, then yarn

So if you want to use npm, like me, then make sure your `package-lock.json` file is committed with git.

This may not matter for your project, but it also might _really_ matter. Here is why:

- NPM does **NOT** allow installing global packages, permission denied.
- yarn _does_ allow installing global packages.

If you need to force the Vercel build engine to install a certain non-native dependency, like "bcrypt" (see below), then you will most likely need to install it as a global dependency. But you can only do that with yarn. At least as far as I can tell.

## #18. Don't use bcrypt with Vercel

Don’t use bcrypt. Just don't.

It is not a native javascript library. So it will add lots of bloat to your project. Often making your builds fail.

I have been using the "scrypt" library that is built into Node. It is native, fast, and secure.

If you are already set on using it for an older project, switch to the "bcryptjs" npm package. Without using the javascript version, you will need to make some VERY hacky solutions to get it to work. And honestly, it is not worth the hassle.

Trust me. I tried it for my first project. Not worth it.

## #19. Error logging in Vercel

Vercel does allow your projects to kick out errors and will "catch" then. In fact, each build will get their own error/warnings log. With one big caveat:

<div class="msg warn text">
Vercel error logs are only visible if you are already viewing the logs.
</div>

By default, you will only be able to see any of your console `log`, `warn`, and `error` logs if you are actively viewing the specific builds logs page. They are **_ONLY_** realtime logs.

You can setup Vercel to send all your logs to a separate logger service, like LogRocket. But they you will likely need to pay for another service. Which is obviously unfortunate.

### #20. console.log sometimes does not appear (sometimes?)

When you need to break into troubleshooting or debugging via the `console.log` method, you might miss some logs.

I have noticed that if any serverless function (or my NuxtJS app) sends any data to the console using `console.log`, then it may not get picked up by the realtime function logs. Specifically if my code triggers a log event closer to the beginning.

My best guess is that based on how the serverless functions are spun up from their "cold start" state, the Vercel logging catcher system is not spun up fast enough to catch the early ones. Sounds strange right?

My workaround: use `console.warn` instead of `console.log`. Every `warn` log seem to get captured by the Vercel realtime logs, no problem.

## #21. Vercel and PrismaJS

I really like Prisma. And I really like Vercel. But... they seem to work kinda strangely together.

Yes Vercel can support Prisma JS. But, I have run into several hiccups while trying to do so.

If you are not familiar with Prisma JS, here is a quick snapshot of how it works:

- turn a MySQL or Postgres database into a GraphQL style interface
- you define your database schema in your `prisma.schema`
- create a "migration" file of each database change (allowing you to track database changes via git)
- after a migration, you need to "generate" a new "PrismaClient" (basically just a fancy type-safe adapter for your database)
- you can make database calls like this:

```js
const user = await prisma.user.findUnique({ where: { id: 1 } });
```

Prisma is super great to use. But...

### #22. Vercel/Prisma cache issues...

When you update your schema, you must generate a new "PrismaClient". Normally not a problem, except when the Vercel build cache comes into play.

The Vercel build cache seems to save a copy of your `node_modules` folder after the most recent build (creating a cache of it). But, when Prisma generates its client (via the `prisma generate` command) the client gets stored in the `node_modules` folder. Which is cached.

The problem is here: if you push a schema change to your app (via git), the app gets deployed to Vercel. Who will use the current build cache (and therefore the old PrismaClient) in the new deployment of your app. So your app tries to use any of the updates database schema fields or tables, the older cached version of the client will not find them. Kicking and error and making your app not work. Sad.

This is obviously a problem for Prisma/Vercel users (like myself).

So this is what I have found works, you have two options:

### #23. Option 1: what the PrismaJS team recommends

The wonderful people over at PrismaJS recommend adding the `prisma generate` command into your `vercel-build` command (in your `pacakge.json` file).

So every time your code is deployed, the newest PrismaClient will be generated. Good day right? Well....

This method will force the Vercel builder to run this command for every single one of your serverless functions it builds. Including each of your serverless API routes. Which add up quickly.

So in result, your builds will take WAY longer. Since it will generate the client multiple times in the same build. This is fine if you are making regular changes to your database schema. But be honest, how often do you update your database schema vs how often do your commit new code to your app???

I don't use this method.

### #24. Option 2: what I think works the best

After making database changes and updating my `prisma.schema` file, I know I need to generate a new PrismaClient the next time I push to Vercel (either for production or staging environments).

Before committing my production ready code to the production git branch, I use the Vercel CLI to publish to production first. Why? Because the Vercel CLI can force regenerate the build cache. And push to production.

I run this command: `vercel -f --prod`

Then after that build is complete, I push to git. This does create another complete "production" build in Vercel, but I usually go in and cancel it.

While still being a bit subpar, I personally think this is the best option. Mainly because this only becomes an inefficient solution when you have made a database schema change. Which after the first bit of work on a project is not that often.

PS: I have talked with a Vercel developer advocate about this before, and he understand that it is suboptimal. And they are going to look into ways to make it better 😁 Go Vercel!

---

## So the real question: is Vercel worth it?

In short, yes.

After my few odd months of using Vercel, including testing and deploying my first production app to Vercel (this [url shortener](https://other.link) service), I have to say: Vercel is great.

The platform is well built, the docs and developer experience is great, and the people of Vercel often reach out and try their best to help when users run into issues. (like I said early, several different employees reached out trying to help me already)

The biggest downside for me: NuxtJS. The support for Nuxt is a bit lacking on Vercel, both in documentation and out of the box support. Which I guess is understandable, considering Vercel runs/supports the competing javascript framework NextJS.

But in the end, I am a very happy user of Vercel. And plan to be for the foreseeable future.

And who knows, maybe I will work there one day... ✌

---

## Some useful reads from the web

As I have journey around the Vercel platform (and the internet trying to figure things out), I have collected these very useful resources for people using Vercel. I hope they help you too:

### Official posts and docs from the people of Vercel:

- [https://vercel.com/docs/cli](https://vercel.com/docs/cli)
- [https://vercel.com/docs/concepts/projects/environment-variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [https://vercel.com/docs/runtimes#official-runtimes/node-js](https://vercel.com/docs/runtimes#official-runtimes/node-js)
- [https://vercel.com/docs/runtimes#advanced-usage/advanced-node-js-usage](https://vercel.com/docs/runtimes#advanced-usage/advanced-node-js-usage)
- [https://vercel.com/guides/using-express-with-vercel](https://vercel.com/guides/using-express-with-vercel)

### Assorted other places around the web

- [https://github.com/nuxt/vercel-builder](https://github.com/nuxt/vercel-builder)
- [https://github.com/nuxt/vercel-builder/blob/main/examples/basic/vercel.json](https://github.com/nuxt/vercel-builder/blob/main/examples/basic/vercel.json)
- [https://stackoverflow.com/a/62751586/17609674](https://stackoverflow.com/a/62751586/17609674)
- [https://medium.com/geekculture/deploy-express-project-with-multiple-routes-to-vercel-as-multiple-serverless-functions-567c6ea9eb36](https://medium.com/geekculture/deploy-express-project-with-multiple-routes-to-vercel-as-multiple-serverless-functions-567c6ea9eb36)
- [https://stackoverflow.com/a/6064205/17609674](https://stackoverflow.com/a/6064205/17609674)
- [https://blog.logrocket.com/serverless-deployments-vercel-node-js/](https://blog.logrocket.com/serverless-deployments-vercel-node-js/)
- [https://arunas.dev/nuxt-js-with-an-express-js-api-server-running-on-now-sh/](https://arunas.dev/nuxt-js-with-an-express-js-api-server-running-on-now-sh/)
