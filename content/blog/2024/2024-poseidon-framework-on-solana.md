---
date: 2024-12-01 00:00 EST
title: "Why should developers be able to write Solana programs in Typescript?"
description:
  "Easing the Rust transition: Poseidon enables Javascript developers to explore
  Solana blockchain development with gentler learning curves."
tags: oped, devex, devrel
category: newsletter
---

There has been a strong negative opinion in the Solana ecosystem about the
recently released Poseidon framework (write onchain programs in Typescript).
Many passionate and vocal Solana developers outcry about this as blasphemy.

This goal of this post is to address those concerns and why I think they are
wrong. Or at least that they are thinking about Poseidon all wrong.

How I am personally thinking about Poseidon:

- Poseidon is an onboarding tool.
- Poseidon is a gateway drug
- Poseidon is not the final solution.

Learning Solana development is hard. Rust development is complex. Typescript
development is easy. That's the point.

## TLDR on Poseidon

Poseidon is new framework from
[SolanaTurbine](https://x.com/solanaturbine/status/1862567620244918662) that
allows developers to write and deploy onchain Solana programs using Typescript.
Under the hood, you write Javascript/Typescript classes and Poseidon will
transpile them into a Rust equivalent (specifically Anchor) which can then be
deployed on the Solana blockchain.

## Poseidon is an onboarding tool

Hardcore Rust dev, assembly dev, TS/JS dev. Doesn't matter. Learning Solana
development is hard. There are lots of friction points that come into the
journey of "learning Solana development":

- the account model is complex
- wft is rent and rent exempt
- priority fees that are hella unclear of how to get an accurate value of what
  to use
- Rust syntax is just different than other languages
- (not even to mention all the constant breakage of semver and repeated
  dependency version issues)

Poseidon is an onboarding tool. Its a gateway drug. Its not the end-all, be-all
way to build Solana programs.

It removes a single friction point for Solana-curious developers: Rust. Poseidon
enables want-to-be future Solana developers to dive in faster with learning a
new tech stack: the Solana blockchain.

## Meet developers where they are

Like it or not, countless developers that come into the ecosystem have more
experience with Javascript/Typescript. Its a simple language that is basically
supported anywhere (like it or not).

As a new dev, getting thrown into the deep end of "learn these 567 new things"
is a lot. Its a significant barrier, if not a direct deterrent, for many to
experience the wonders of building on the Solana blockchain.

By meeting these existing Javascript developers where they are, (i.e. they know
Javascript, not Rust), it allows them to focus their education time on learning
the core concepts of the Solana blockchain. They can focus on the new
complexities of blockchain, single state, rpc, rent, confirmations, etc etc etc.
They can bring a language they are familiar with (Javascript), and get much
farther than before (deploying custom onchain programs) before adding in another
complexity: learning the Rust language.

Poseidon is a gateway drug to more Solana onchain development.

## Time to developer success

This is one of the north star metrics of myself and fellow Solana Foundation
DevRel team members. The time it takes for a new Solana developer to experience
the minimal success (sometimes referred to as Time to Hello World).

People are busy. People have a short attention span (especially this day and age
with short form content algorithms feeding those dopamine hits). Adults want to
feel that "ahha" moment when they learn something new.

Removing one single complexity (Rust) for these newer devs allows them to focus
on learning less upfront and achieve a "success moment" (like hello world).

## The motives

Don't misconstrue the motives: we want Solana developers to learn the most
effective language for developing onchain Solana programs. Today, that is Rust.
No doubt. Most of the tooling is focused on Rust. I want all Solana developers
to use what ever Solana stack they need to get the job done.

There is an ever growing list of things any developer can build on Solana
without touching Rust, thanks to the ideals of composability that the core
engineers and founders have pushed forward. There are still plenty of use cases
for developers to build new bespoke protocols onchain using Rust or other
languages. With or without frameworks like Anchor.

These are all tools in the tool belt for Solana developers, far and wide.
Optionality. The best tool for the job.

Poseidon's job is not to deploy the next major complex protocol on Solana.
Poseidon's job is onboard more developers to Solana, and show them the unlock of
leveling up into a Rust dev.

---

If you like this type of content (direct and semi-opinionated about Solana
development), let me know. I am thinking of writing more things like this and
publishing them to the world. Taking a single stance on Solana DevEx: strong
opinions, weakly held.
