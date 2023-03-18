---
# featured: true
date: 2023-01-12 00:00 EST
title: Derive Solana Addresses
description: Technical deep dive into how Solana addresses are "generated" for use on the blockchain. Mnemonic, to private key (with a derivation path), to public key.
# blurb:
# keywords: "derivation path, mnemonic to public address, generate wallet address, vanity address"
image: /media/articles/solana/deriving-solana-addresses.jpg
tags: solana
prevPage: intro-to-solana-cli
nextPage: solana-vanity-addresses
---

Every public address on the Solana blockchain uses a string of characters between 32 and 44 characters long. Each of these address follow the BIP44 standard and therefore use the base-58 character set.

These seemingly random string of letters and numbers are known as your "Public Key" (or `pubkey` for short), and are the addresses that people can share freely across the internet. It's your "wallet address".

These public address have a very specific set of one-way relationships that prevent any derived address from computing the secret that derived itself. Hence one-way. This one way relationship is one of the core fundamentals of most cryptography and all blockchains.

It is how us common folk on the internet can have true digital ownership and provenance.

### Base-58 character set

Solana public addresses and transactions function on the base-58 character set. Essentially meaning, there are only 58 possible characters:

- including uppercase A-Z, **excluding** uppercase `O` and `I` (as in `Oscar` and `India`)
- lowercase letters A-Z, **excluding** lowercase `l` (as in `letter`)
- digits 1-9, (which does **NOT** include `0`)

These specific letters are **excluded** from the base-58 character set since they can very easily be mistaken for other characters. And if the wrong character is used, then the blockchain address is completely different!

## How are Solana addresses derived?

> > mnemonic phase -> private key -> public key (aka your wallet's address)

For most people (not programs) the process to get a public address on the blockchain involved installing a web based "browser wallet" like Phantom or Solflare. Which then will generate a random list of words called your **"mnemonic phrase"** which is then used to derive (or **compute**) a public address, in the form of one-way cryptography.

Here I will break down each of these steps:

## Mnemonic phrases

Public addresses on the Solana blockchain are most commonly derived from a `mnemonic phrase`.

For most people, they will commonly use a `mnemonic phrase` that is a randomly generated list of words and is usually 12 or 24 words longs. For Solana, this phrase contains very specific words from the [BIP39 wordlist](https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md).

The very specific combination of these words **AND** their specific order will allow the blockchain to **"derive"** (or **"compute"**) a Private key using the [Ed25519 algorithm](https://en.wikipedia.org/wiki/EdDSA#Ed25519). This private key can then be used to derive a public key, giving us a `keypair` (aka combination of a Private key and a Public key.)

In theory, the mnemonic phrase is used to essentially makes it easier for a human to read than a random string of characters, like a Private key. Thus making it easier for a human to write down this phrase, **without mistakes**, than a random character string.

## Private keys

The derived Private key (or "secret key") is the special key that is the **ONLY** key that will be able to **sign** a transaction for its corresponding Public key, and therefore prove it own the public address.

A private key can always derive it's "child" public keys (and yes that is multiple, more on that in a moment), but a public key cannot derive its private key.

<div class="msg note text">
It is also worth noting that similarly, a Private key cannot derive its owns mnemonic phrase. This too is a one way relationship and key to the cryptographic integrity of blockchain.
</div>

## Derivation path

One of the most commonly misunderstood portion of generating a blockchains addresses is the `derivation path`. This special piece of information is what allows a single Private key to [derive multiple](https://docs.solana.com/wallet-guide/paper-wallet#hierarchical-derivation) Public keys that are impossible to tell they came from the same Private key. Only the owner of the Private key can tell.

These derivation paths are essentially a sequence that looks like this:

Sequence: `m/<PURPOSE>/<COIN_TYPE>/<ACCOUNT>/<CHANGE>`

- each section is separated by a single `/`
- `m` notes the root or "master" key
- each of the other elements after `m` should be a zero or positive integer
- each element may also end in a single `'`, noting it is "hardened"
  - you can read more [here](https://github.com/satoshilabs/slips/blob/master/slip-0010.md) about it, but it is not really necessary
  - just know that Solana uses hardened elements and will enforce this automatically, regardless of if the `'`s are included.

With only specifying a derivation path of the `m/<PURPOSE>/<COIN_TYPE>`, like the one used by the Solana CLI, only the "root key" can be derived. Specifying the `<ACCOUNT>/<CHANGE>` will enable deriving multiple Public keys from the same Private key.

### Derivation paths on Solana

The "standard" derivation paths used on the Solana blockchain are:

- `m/44'/501'` used by the Solana CLI to generate a "root key", and
- `m/44'/501'/0'/0'` used by most web based or browser based wallets (like Phantom and Solflare)

<div class="msg note text">
With these two derivation paths being different, this is why most people attempt to add a CLI generated vanity address into a browser wallet, but get a different address. The derivation paths are different. Therefore, the derived public addresses are different.
</div>

These Solana derivation paths segments basically mean this:

- `44'` - (required) uses the [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) standard
- `501'` - (required) the identifier for coin type of the Solana blockchain
- `0'` - (optional) define the account ID to derive. This is the value that browser wallets (like Phantom and Solflare) will change to enable users to generate new Public addresses on the fly, all while still using their single mnemonic phrase.
- `0'` - (optional) an additional number that is basically always set to `0` for addresses that will be public

## Public keys and wallet addresses

The Public key (aka `pubkey`) that is derived from a private key, using derivation path, is the public address that people have come to know as their "wallet address". This address will allow anyone on the blockchain to transfer tokens or otherwise interact with their account, securely.

### Vanity addresses

Normally, a public Solana address appears as a random string of letters and numbers (like discussed above). But, there is a common technique used to try to generate addresses that start with certain characters in a row (like a word). These addresses are called [Vanity Addresses](./solana-vanity-addresses.md).
