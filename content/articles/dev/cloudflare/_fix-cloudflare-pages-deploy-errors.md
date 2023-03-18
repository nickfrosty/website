---
title: "Fix Cloudflare Pages deploy errors"
date: 2022-01-19 00:00 EST
# blurb:
description: "still a work in progress"
# image: /media/articles/mysql/backup-and-restore-mysql-database-from-command-line.jpg
tags: nuxt, ssg, cloudflare
# nextPage:
---

Since discovering the wonders of Cloudflare Pages, I have shifted most of my static [NuxtJS sites with Cloudflare Pages](/articles/dev/cloudflare/deploy-nuxt-ssg-with-cloudflare-pages.md).

But with them still being the new kid on the block, I have run into a few random errors while deploying with Cloudflare Pages.

## TLDR

If you are having build errors with Cloudflare Pages, try these fixes:

- ensure your packages are up-to-date
- build Cloudflare Pages with a newer version of Node

## Update Node version for Cloudflare Pages

Sometimes when using features only available in newer versions of Node or NPM, you might see errors like "_ExperimentalWarning_":

```
ERROR  (node:1569) ExperimentalWarning: The ESM module loader is experimental.
```

At the time of me writing this article, Cloudflare Pages uses `v12.18.0` of Node, with `v16` already out in the wild. So they are a bit behind.

### Manually set Node version for Cloudflare Pages

To manually set the Node version for your Cloudflare Pages build, create an Environment variable for `NODE_VERSION` in both your `production` and `preview` deployments.

![manually set the Node version for Cloudflare Pages](/dist/media/articles/cloudflare/build-errors/set-node-version-from-env-vars.png)

You can read more about the assorted [build configurations](https://developers.cloudflare.com/pages/platform/build-configuration) in the official docs.
