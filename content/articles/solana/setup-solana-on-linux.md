---
featured: true
date: March 17, 2023 EST
title: Setup Solana on Linux
description: Get started with Solana development by setting up your dev environment. Installing the Solana **CLI**, rust, cargo, web3.js, and the local validator on Linux.
blurb: Get your Solana development environment setup on Linux with this complete installation guide.
# keywords: "solana cli, install rust, rustup, anchor framework"
image: /media/articles/solana/setup-solana-on-linux.png
tags: solana, linux
nextPage: intro-to-solana-cli
# prevPage:
---

Installing the tools, create a local wallet, building a sample hello world program to test you setup.

![Get your Solana development environment setup on Linux with this complete installation guide](/media/articles/solana/setup-solana-on-linux.png)

To setup and install Solana on Linux, you will need to install the following:

- NodeJS and Yarn
- various Linux system packages and libraries
- Rust and Cargo (using rustup)
- the Solana CLI tool suite
- the Anchor framework (not truly required, but highly recommended!)

<div class="msg warn text">
You may run into compiler or builder errors throughout your setup process, depending on what libraries and dependencies your Linux system already has installed.
</div>

## Install NodeJS and Yarn

Let's face it, the world of web3 and blockchain is being build with JavaScript based applications. Of which, NodeJS and the NPM package registry are at the forefront of.

So just [install NodeJS](https://nodejs.org) (if you are one of those random crypto curious developers that does not already have it installed). On Linux/Ubuntu, I recommend installing NodeJS using [Node Version Manager](https://github.com/nvm-sh/nvm) (aka NVM). It makes updating Node versions as simple as it can be!

Next, I strongly recommend installing the [Yarn package manager](https://www.npmjs.com/package/yarn). Loads of people are using yarn in the Solana ecosystem (including me and the Anchor team!):

```bash
npm i -g yarn
```

## Install Linux Libraries and Packages

To get this Solana party started, make sure your Linux system is up-to-date:

```bash
sudo apt-get update && sudo apt-get upgrade
```

Every Linux distribution is different. And depending on what flavor of Linux you are running, you may need more or less additional packages to be installed on your system.

Installing the following packages should cover most cases for Ubuntu or Debian based systems:

```bash
sudo apt-get install -y pkg-config build-essential libudev-dev libssl-dev
```

<div class="msg note text">
In the past I used <a href="https://parrotlinux.org/download/?version=home">Parrot OS Home</a> edition (Debian and <em>apt</em>) as my daily driver, and these packages were also needed to get started in Solana development.
</div>

People often run into various errors while setting up the assorted Solana development tooling on Linux based operating system like Ubuntu or Parrot OS (which is what I like to use). This is usually because your system is missing some various dependencies. On the bright side, if you run into any problems while installing or building Solana, Anchor, and/or Solana Programs, your terminal output is usually descriptive enough to tell you which package/dependency you are missing. Beautiful!

## Install Rust and Cargo

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

When going through this rust installation wizard, you will be given a few options when installing. When prompted, I recommend selecting the `nightly` build option. This seems to work better with the Solana CLI tool suite.

<div class="msg note text">
This Rustup install command comes directly from the <a href="https://rustup.rs/">Rustup.rs</a> website.
</div>

## Install the Solana CLI

```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
```

<div class="msg note text">
This installation command for the Solana CLI tool suite comes directly from the Official <a href="https://docs.solana.com/cli/install-solana-cli-tools#use-solanas-install-tool">Solana Docs</a>.
</div>

## Install Anchor Lang for Solana

Anchor is the most popular framework for building Solana Programs. It is an open source project that can help to simplify your programs, on top of making them more sure.

<div class="msg note text">
The Anchor team recommends <a href="https://www.anchor-lang.com/docs/installation">installing Anchor</a> using the Anchor Version Manager tool, AVM, so that is what we shall use here! This process will build AVM from source and can take a bit of time, depending on your computer's hardware.
</div>

Once you have Cargo installed, you can install AVM with the following command:

```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
```

Next, we can use AVM to actually install the Anchor CLI (this may take a bit since Cargo will compile the CLI on install):

```bash
avm install latest
```

Finally, tell set the latest version of Anchor to your system default and check your version:

```bash
avm use latest && anchor --version
```

## Create a local Solana wallet

One of the final things you will need develop (more specifically to deploy) Solana programs is a wallet. I won't go very deep into the details of using the Solana CLI here, but rather a shallow level understanding of the commands to get your started developing.

> > Learn more about using the Solana CLI (including managing your file system wallet) with my other article: [Intro to the Solana CLI](./intro-to-solana-cli)

#### TLDR;

- file system wallets will save your wallet private key in a local file on your computer
- you must select the correct Solana network you desire using the CLI
- you will need to airdrop SOL token to your wallet

### Create a Solana wallet

Create a new file system wallet named "_demo-wallet_":

```bash
solana-keygen new --outfile ~/.config/solana/demo-wallet.json
```

### Select the Solana network

Select the Solana "_testnet_" network and set your new file system wallet as the default:

```bash
solana config set --url testnet --keypair ~/.config/solana/demo-wallet.json
```

### Verify your config settings

Read your Solana CLI configuration settings to verify your wallet is correctly set, and you are on the correct network:

```bash
solana config get
```

Your output should look something like this:

```bash
Config File: /home/nick/.config/solana/cli/config.yml
RPC URL: https://api.testnet.solana.com
WebSocket URL: wss://api.testnet.solana.com/ (computed)
Keypair Path: /home/nick/.config/solana/demo-wallet.json
Commitment: confirmed
```

### Fund your wallet with an Airdrop

Get free SOL token airdropped (aka deposited) to your new wallet:

```bash
solana airdrop 1
```

To check your file system wallet balance:

```bash
solana balance
```

## What's next?

Now that you have all the required Solana developer tooling installed on your local environment, you are ready to start creating your first Solana programs!

[Introduction to the Solana CLI](./intro-to-solana-cli) - learn more about the important commands and how to navigate the Solana CLI

_Deploy a Solana program (coming soon)_ - build, edit, deploy, and redeploy your first Solana program to the blockchain
