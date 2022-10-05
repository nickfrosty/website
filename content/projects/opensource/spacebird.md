---
draft: false
status: opensource
title: "Spacebird"
slug: "spacebird"
url: /projects/spacebird/
dateRange: "Nov 2021 - Jan 2022"
date: 2021-11-15
description: "the first Twitter Spaces search engine"
intro: "The very first public Twitter Spaces search engine. Helping the early adopters of Twitter Spaces to explore active and scheduled Spaces."
logo: "/media/projects/spacebird/spacebird.png"
tags: twitter, audio
---

The very first public Twitter Spaces search engine. Helping the early adopters of Twitter Spaces to explore active and scheduled Spaces.

![](/media/projects/spacebird/header.png)

## The problem

For several months after Twitter released _Spaces_, their live audio chatroom product, there was no way to search for them.

Either active ones or scheduled.

## The goal

Spacebird was created to bridge the gap of what Twitter was seemingly slow to roll out: a way to search and find specific topic based Twitter Spaces.

## Tech stack

- Vue.js - frontend framework
- TailwindCSS - CSS tooling and designing
- Elasticsearch - as a scalable search database to cache the Twitter API calls (to prevent reaching the very low rate limit)
- Node/Express API - RESTful API to communicate between the Twitter API and the Elasticsearch database

## What's next?

This project/repo is no longer maintained and has been open sourced.

After Twitter released their public Spaces search, directly in the app/website, Spacebird was shutdown. In early 2022, the original domain, Spacebird.io, was sold at auction.

I have made the [git repo public](https://github.com/nickfrosty/spacebird) and can be used by anyone.
