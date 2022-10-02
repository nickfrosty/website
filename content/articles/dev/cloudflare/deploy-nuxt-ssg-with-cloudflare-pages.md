---
title: "Deploy NuxtJS SSG with Cloudflare Pages"
blurb: Effortless deployment of NuxtJS static sites directly from your Git repo, automatically
description: "Effortless static site generation directly from your Git repo, with automated deployments and git previews? All for free? Sounds perfect!"
image: /media/articles/cloudflare/deploy-nuxtjs-ssg/deploy-nuxtjs-ssg-with-cloudflare-pages-light3.jpg
tags: nuxt, ssg, cloudflare
date: 2022-01-17 00:00 EST
updatedAt: false
imageFocus: center
# nextPage:
---

After discovering the wonders of [Cloudflare Pages](https://pages.cloudflare.com) and tinkering around a bit, I was hooked.

![](/media/articles/cloudflare/deploy-nuxtjs-ssg/deploy-nuxtjs-ssg-with-cloudflare-pages-light3.jpg)

With the very straightforward "deployment pipeline" I could setup for each of my static NuxtJS websites, I made the move. I shifted all of my [NuxtJS](https://nuxtjs.org) static websites over to Cloudflare Pages.

_PS: This article is **not** sponsored by or affiliated with Cloudflare. They just make **really awesome** products, and give a **very generous** free plan to people. And I like free. 😁_

---

## What is Cloudflare Pages?

In case you have not heard about this newer amazing product from the folks at Cloudflare, Pages are a near effortless JAMstack platform to deploy static Git based websites.

Here's the gist:

- connect your Git account ([GitHub](https://github.com/nickfrosty) or GitLab)
- select your repo to deploy
- set your build steps (aka generate the static site)
- get a live static website at "your-site-name.pages.dev"

### Use Cloudflare Pages (for free)

To actually deploy any repo, you will need a Cloudflare account. If you don't already have one, you will can [signup](https://dash.cloudflare.com/sign-up/pages) for one. Don't worry, it's free. Like _actually_ free. Like _no questions asked_ free.

Once in your Cloudflare account, navigate to the "Pages" page. (I know, this is like rocket science here.)

![Get started with Cloudflare Pages](/media/articles/cloudflare/deploy-nuxtjs-ssg/intro-to-cloudflare-pages.png)

---

## How to Deploy NuxtJS to Cloudflare Pages

From the Pages window, select the `Create a Project` button. You will then be able to connect your GitHub or GitLab account. Either allow access to your entire account, or select the specific repos. You can even select the repos from any of the organizations you are apart of.

### Select the NuxtJS repo to deploy

From the list of repos, select the NuxtJS SSG repo you want to deploy. Then `Begin Setup`.

![Select your NuxtJS repo to deploy with Cloudflare Pages](/media/articles/cloudflare/deploy-nuxtjs-ssg/select-nuxtjs-repo.png)

### Name your project

The project name you choose will automatically give you a `*.pages.dev` url to access the production builds of your NuxtJS SSG site.

![Name your project and select the production branch](/media/articles/cloudflare/deploy-nuxtjs-ssg/name-your-project-and-select-production-branch.png)

### Select your repo's "production" branch

Next, select the "production" branch for your NuxtJS site. This can be any of the branches that your repo has. It is likely "_master_" or "_main_". Any pushes to this "production" branch will automatically build your site, and deploy it to your site's domain.

<div class="msg note text">
At the time of me writing this article, Cloudflare does not currently allow removing this "pages.dev" url from the account.
</div>

This is because that "_pages.dev_" url will also allow you to view all your `preview` deployments for your repo. And "_preview_" meaning any other commits that are not on your `production` branch.

### Enter your NuxtJS build settings

![Enter your NuxtJS build settings](/media/articles/cloudflare/deploy-nuxtjs-ssg/set-your-nuxtjs-build-settings.png)

Inside of the `Build Settings`, select NuxtJS as the framework preset. This will auto populate the build settings to use the default `nuxt generate` build command, with a final output directory of `dist`. If you have manually changed these settings for your Nuxt app, then just update these here. Otherwise, the defaults are likely what you want.

### Are you deploying a monorepo? No problem!

If you are using a monorepo setup, like I am for the [nuxt-seo project](https://github.com/nickfrosty/nuxt-seo), then you can also deploy that to Cloudflare Pages.

Inside the `Build Settings area, click the `Root directory (advanced)` link to view the extra settings.

To build **only the specific potion** of your monorepo, like a "docs" site, then enter the name of that directory as the `path`:

![Deploy a monorepo with Cloudflare Pages](/media/articles/cloudflare/deploy-nuxtjs-ssg/deploy-monorepo-with-cloudflare-pages.png)

In my case of the [npm nuxt-seo](https://npmjs.org/nuxt-seo) package, the [nuxt-seo docs](https://nuxt-seo.frostbutter.com) site is located in the "docs" directory. So my `path` is set to "docs" to only generate the static docs site with Cloudflare Pages.

### Nuxt generate with env vars

If you need to set specific env vars that affect your Nuxt SSG build, then you can enter them in Cloudflare Pages as well:

![Set nuxt generate env vars](/media/articles/cloudflare/deploy-nuxtjs-ssg/nuxt-generate-with-env-vars.png)

To read more about the specific ENV vars that Cloudflare automatically exposes, check their [build configuration docs](https://developers.cloudflare.com/pages/platform/build-configuration)

## Set a custom domain for Cloudflare Pages

Once you have a successful build for your new Cloudflare Pages site, you can set a custom domain.

From inside the Pages manager in the Cloudflare Dashboard, navigate to the `Custom Domains` tab. Enter the domain name you wish to use as your primary domain for your Cloudflare Pages static site.

![Setup a custom domain for Cloudflare Pages](/media/articles/cloudflare/deploy-nuxtjs-ssg/custom-domain-for-cloudflare-pages.png)

You will then be prompted to update your DNS settings, creating a `CNAME` record for your custom domain.

<div class="msg note text">
If your DNS is already managed by Cloudflare, you can update the settings with the one click "save" button. If not, then you will have to manually create a `CNAME` record with your DNS provider.
</div>

## My final thoughts on Cloudflare Pages

With Cloudflare Pages being still fairly new, I have run into a few issues with deployments. Sometimes I will get build failures. Most of the time, these failures were because of Cloudflare Pages using an older version of Node and NPM by default.

Fortunately, you can manually set the Node and NPM version using the build ENV settings, like I discussed above.

Sometimes the builds can be a bit slow, taking ~5-10 minutes to finish the build. But then again, it's free. So I am so very willing to wait for free 😁

With all that said: **they are awesome, but _still_ early on.** I really like the way they are setup and how easy it is to setup an automated deployment pipeline for my static sites (including [my blog here](/)).
