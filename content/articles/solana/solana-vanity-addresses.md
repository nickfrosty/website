---
featured: true
date: 2023-01-13 00:00 EST
title: Generate Vanity Addresses on Solana
description:
  Generate custom Solana wallet addresses that have any word you want. Including
  how to set the derivation path to use in web and browser wallets.
# keywords: "custom address, name service, sns, ans, derivation path, web wallet"
image: /media/articles/solana/generate-solana-vanity-addresses.jpg
tags: solana
# nextPage: intro-to-solana-cli
prevPage: derive-solana-addresses
---

A vanity addresses give some amount of human readability to the otherwise random
string of letters and numbers known as a Solana wallet address.

[![Generate Vanity Addresses on Solana](/media/articles/solana/generate-solana-vanity-addresses.jpg)](./solana-vanity-addresses)

If you have ever made a single transaction on the Solana blockchain, there is a
very high chance that you have interacted one of these
[vanity address](./solana-vanity-addresses) before. Some of the most well known
programs use a vanity address, like these:

- [TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA](https://solscan.io/account/TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA) -
  SPL Token program
- [TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb](https://solscan.io/account/TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb) -
  SPL Token 2022 program
- [whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc](https://solscan.io/account/whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc) -
  Orca Whirlpools
- [srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX](https://solscan.io/account/srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX) -
  Openbook
  - perviously Serum, now better! and more open. and no FTX.

You will notice that each of the account addresses start with some readable
words (or portions of them). They are all "Vanity Address".

<div class="msg note">

**Technical Deep Dive?**

You can read all about
[how Solana addresses are derived](./derive-solana-addresses) and generated in
my technical deep dive on it. Including understanding the "derivation path" used
to generate vanity address with the Solana CLI. Pretty interesting stuff 😀

</div>

## How to generate a vanity addresses

The easiest and most common way to generate vanity addresses is using the
[Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools). So that is
what I will demonstrate here as well.

<div class="msg warn">

**Install the Solana CLI**

If you do not have the Solana CLI already installed and setup on your computer,
then you can read my other article on
[How to Setup and Configure the Solana CLI](./intro-to-solana-cli)

</div>

Make sure you have the `solana-keygen` program installed and functioning by
running:

```bash
solana-keygen --version

# output (note the version)
# solana-keygen 1.14.11 (src:61876755; feat:3036606309)
```

Note the version you have installed. This will be important if you want to
generate vanity address for use in web/browser wallets like Phantom or Solflare.
More on this in a bit.

Using the solana keygen program, we can `grind` for (aka brute-force generate)
new vanity addresses that start with, end with, or starts AND ends with certain
characters.

To see all the options you can use to generate random Solana vanity addresses,
look at the help for grind:

```bash
solana-keygen grind --help
```

### Unsupported characters

Solana public addresses and transactions function on the base-58 character set.
Essentially meaning, there are only 58 possible characters:

- including uppercase A-Z, excluding uppercase `O` and `I` (as in `Oscar` and
  `India`)
- lowercase letters A-Z, excluding lowercase `l` (as in `letter`)
- digits 1-9, (which does not include `0`)

These specific letters are **excluded** from the base-58 character set since
they can very easily be mistaken for other characters. And if the wrong
character is used, then the blockchain address is completely different!

So when you attempt to generate vanity addresses using one of the 4 unsupported
characters, the Solana CLI will kick out an error.

### Speed of generating vanity addresses

At the current time, the Solana CLI only supports this brute-force method of
generating vanity addresses with all the threads of your computer's CPUs. So the
more powerful your CPU is, the less time it will take.

Data point: my average range laptop with an Intel i7, 8 core CPU can generate
`1,000,000` private key addresses every `~6.3 seconds`

The other big factor of how fast you can generate addresses, is the string match
you are looking for. The longer the string match (e.g. 4 characters vs 8
characters) and if you are ignoring letter case or not (e.g. "nick" vs "NicK"),
the longer it may take.

The last big factor is if you are attempting to generate the mnemonic phrase or
just the private key. Generating the mnemonic phrase will take SIGNIFICANTLY
LONGER that without

Data point: the same computer from the data point above can generate `1,000,000`
mnemonic phrase addresses every `~15-20 minutes`. A lot longer.

## Basic grinding

To start your `grind` process searching for an address that starts with a set
string:

```bash
solana-keygen grind --starts-with nick:1 --ignore-case
```

This simple command will run until `1` vanity address is found that starts with
`nick` (ignoring the letter case). Simple enough.

Also to note, that once a matching address is found, the private key (in the
form of a byte array) will be saved into your terminal's current working
directory with the file named `<GENERATED_PUBKEY>.json`

## Matching multiple strings

The `grind` command also allows you to specify multiple strings you want to
search and match. This is usually a more efficient way to search if you are
looking for more than one possible vanity address.

To search and match multiple strings, simply specify the `--starts-with` or
`--ends-with` or `--starts-and-ends-with` flag (with its value) multiple times.
Like so:

```bash
solana-keygen grind --ignore-case --starts-with nick:2 --starts-with burn:2 --ends-with frost:2
```

This process will continue to run until `2` matches are found for EACH of the
given string comparisons. So in the end, this will eventually generate 6
addresses.

## Generate with mnemonic phrase

### Use a vanity address in a browser wallet

Like I discussed in my technical deep dive on
[how deriving Solana addresses works](/articles/solana/derive-solana-addresses),
the Solana CLI by default is not setup to generate a mnemonic phrase for an
address to use in a web browser wallet. This is because the `derivation path` is
different for the default settings on the CLI and what web browsers wallets
(like Phantom and Solflare) use.

So to use a Solana vanity address in a browser wallet, you must change the
derivation path use in the `grind`.

#### Bad news...

At the time of me writing this (Dec 27, 2022), the current Solana CLI version
[v1.14.11](https://github.com/solana-labs/solana/releases/tag/v1.14.11) does not
support changing the derivation path. So you cannot generate a browser wallet
compatible vanity address... Sorry. 😑

#### Good news!

A [wonderful person](https://github.com/diman-io) has submitted and gotten
approved
[a change](https://github.com/solana-labs/solana/commit/6899af26b07d24254607796d6957fe305d96ba0c)
to the keygen program that adds the ability to change the derivation path to one
usable by browser wallets. It is expected to come out in v1.15.0.

So you can either wait for that version to get officially published.... or...

You can download the official Solana source code,
[build from source](https://docs.solana.com/cli/install-solana-cli-tools#build-from-source),
and get access to this wonderful addition now.

This is what I did to start using new feature. Below is how.

PS: I will update this article when the `derivation-path` flag is available in
the regular Solana CLI.

### Build from source

This section will be short and to the point. I am assuming you have the Rust
compiler installed and `git`. If you are a developer, especially a Solana dev,
then you probably do. (I ran this on Linux, but it should also work find on Mac.
Windows? Just stop.)

These are the complete commands that I ran to build the `solana-keygen` program
from source, directly from the
[Solana repo](https://github.com/solana-labs/solana):

```bash
mkdir solana && cd solana
git clone https://github.com/solana-labs/solana.git ./
cd keygen && ./cargo build --release && cd
./solana/target/release/solana-keygen --version
```

After running all these commands, you should see a final output of the
`solana-keygen` version:

```bash
#output (only the version really matters)
solana-keygen 1.15.0 (src:devbuild; feat:3921999736)
```

Now you can use the `--derivation-path` flag to generate browser wallet
compatible vanity addresses:

```bash
./solana/target/release/solana-keygen grind --use-mnemonic --derivation-path
```

### Vanity with mnemonic and derivation path

Using the `--derivation-path` flag will allow you to set a custom derivation
path within the Solana CLI. If you do not specify a custom derivation path, this
flag will use a hardcoded path of `m/44'/501'/0'/0'` (which is ready to be used
with both Phantom and Solflare).

As apposed to the default the Solana CLI the derivation path of `m/44'/501'`
(which is NOT compatible with browser wallets).

```bash
./solana/target/release/solana-keygen grind --use-mnemonic --derivation-path --starts-with nick:1 --no-passphrase
```

If you want, you can also set a custom derivation path like so:

```bash
./solana/target/release/solana-keygen grind --use-mnemonic --derivation-path m/44/117/0/0 --starts-with nick:1 --no-passphrase
```

### Add your vanity address into your browser wallet

The mnemonic that is output from this command can be input into your browser
wallet of choice and will work!

You can then use any of the other `grind` flags to customize the vanity
addresses you are looking for, and be more usable on the rest of the Solana
blockchain 🙃

## How I generate vanity addresses

The way I like to generate vanity addresses with mnemonics is by creating a
separate `grind_keys` folder on my computer. Then outputting the generated
mnemonics to a text file on my computer.

I then send the process' output to a text file (aka the mnemonics) for later
use.

Like so:

```bash
mkdir grinder_keys && cd grind_keys
mkdir keys && cd keys
./solana/target/release/solana-keygen grind --no-passphrase --use-mnemonic --derivation-path --ignore-case --starts-with nick:100 --starts-with more:100 >> ../mnemonics.txt
```

This allows me to simply run the same `grind` command every time I start my
computer. Making it so I can generate addresses for longer periods of times,
like days and weeks, on my desktop computer. With no fear of losing the
generated mnemonic.

Then pick-and-chose the best vanity address from the ones it found. Like right
now, I am running it looking for a good `nick` address to use on my Solana Saga
Phone (soon) as my new address!
