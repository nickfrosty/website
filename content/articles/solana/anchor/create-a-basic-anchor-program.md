---
# draft: true
featured: true
title: Create a Basic Anchor Program
# blurb:
description: Create your very first Solana program with the Anchor framework.
keywords:
image: /media/articles/solana/anchor/get-started/get-started-with-anchor-solana-development.png
imageFocus: left
# nextPage: deploy-an-anchor-program
tags:
  - solana
  - anchor
  # - rust
date: Dec 27, 2022
---

The **Anchor framework** is the most popular rust framework for developing the on-chain Solana smart contracts called **programs**.

![Get started with Anchor development for Solana](/media/articles/solana/anchor/get-started/get-started-with-anchor-solana-development.png)

## Install the Solana and Anchor CLIs

If you have not already setup your Solana development environment, you can view our other articles that go in depth on getting setup and all your tooling installed for Anchor and Solana program development.

- [Install Solana and Anchor on Linux](/articles/setup-solana-on-linux)
<!-- - [Install Solana and Anchor on Windows](/articles/setup-solana-on-windows) -->
- Windows (_coming soon!_)
- Mac OS (_coming eventually?..._)

## Create a new Anchor project

From inside your terminal, you can create a new project using the Anchor CLI:

```bash
anchor init project_name
```

This creates a new directory named `project_name` in your current working directory, then scaffold out an Anchor _workspace_ for you. The `init` command will also initialize a new git repo and NPM repo (using Yarn) for you. How sweet of them :)

You should then `cd` to your new project's root and you can get to work! PS: If you are using VS Code, be sure to open your new project in your editor's workspace.

### Anchor project's structure

Your new Anchor project's has a few very important files and folder that were created during the `init` process.

<div class="msg note text">
You <em>can</em> change the names of some of these folders, but I wouldn't. Just keep them the same as the scaffold and move on :)
</div>

#### Important directories

- `app` - the future home of your project's frontend code (aka the JavaScript)
- `programs` - the home of all your project's Solana/Anchor programs (aka the rust code), but more on this later
- `tests` - home for your JavaScript based end-to-end tests (using the Mocha testing framework)
- `target` - home for your compiled Solana program and Anchor IDL file (more on this later too!)

#### Important files

- `Anchor.toml` - manifest file containing config info and settings for your Anchor workspace
- `Cargo.toml` - contains the _Cargo_ package manager settings (same idea as `package.json` file for Node/NPM projects)
- `package.json` - the standard JavaScript package file that will be used by your frontend

## Build your Anchor program

Unlike _vanilla_ rust based on-chain Solana program development, Anchor projects are built using the Anchor CLI. Which does the same BPF compiling that the native `cargo-build-bpf` command does, but it also adds in the Anchor magic of generating the IDL file (I promise, I will get to it. Just not yet...)

To build your Anchor project:

```bash
anchor build
```

### Initial Anchor build

With every new project, I recommend running the `build` command right after your `init` because it may take some time for the rust compiler to compile all the assorted libraries used. So go get some coffee.

After the initial build is complete, go ahead and re-run the `anchor build` command. I'll wait....

It should be much faster. This is because the all the compiled rust code and packages do not all need to be recompiled from scratch. Each time you rebuild your project, effectively only the changed files will need to be recompiled. Making each subsequent build so much faster than the initial.

### Key files generated from the build

The Anchor build command will not only compile your rust code into a deployable Solana program, but it generates a few other files too.

<div class="msg note text">
For simplicity, I will only cover the directly important files/folders generated from the build command.
</div>

Inside your `target` directory, the following important files are generated:

- `deploy/project_name.so` - the Solana program binary ready to be deployed to the blockchain
- `deploy/project_name-keypair.json` - a brand-new file system keypair file that will be used for your program
- `idl/project_name.json` - a JSON file that will be used by your frontend to make interacting with your on chain program even easier
- `types/project_name.ts` - auto generated typescript definitions that will be used by your frontend

## Anchor.toml file

The `Anchor.toml` manifest file is where certain configuration settings for your Solana programs and Anchor workspace will live.

For simplicity, I will only focus on 2 main sections for this [intro to Anchor]():

- `[programs.cluster]`, and
- `[provider]`

You can read more about the `Anchor.toml` file from the official [Anchor lang docs](https://www.anchor-lang.com/docs/manifest).

### Anchor.toml [programs.cluster]

The "programs" setting will allow you to save the string `program_id` of each of your Solana programs inside your project. Including being able to set a different `program_id` for each cluster, as desired.

For example, the following stores the `program_id` for the `localnet` cluster:

```toml
[programs.localnet]
demo = "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS"
```

To store a different `program_id` for different clusters, you can use something like this:

```toml
[programs.localnet]
demo = "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS"

[programs.testnet]
demo = "3ze6Z4rR8r8PkYAYYV5yZTRLKAHQMBcJj4AZMg4MS1fG"
```

### Anchor.toml [provider]

You can specify a `provider` to store the desired Solana `cluster` and local keypair file (aka `wallet`) you want to have ownership of your deployed program.

```toml
[provider]
cluster = "localnet"
wallet = "~/.config/solana/id.json"
```

## Your actual Solana program code

Solana programs are different from regular rust based programs. Solana programs are created as rust "_libraries_" that are able to be loaded into the Solana blockchain's Sealevel runtime.

By convention, these _libraries_ will typically have their primary code file of `src/lib.rs` inside of the `programs/program_name` directory of your Anchor workspace. (e.g. In the case of our example project, "_project_name_", this file will live at `programs/project_name/src/lib.rs`)

The default Anchor scaffold for `lib.rs` should look something like this:

```rust
use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod demo {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
```

This code, is essentially the most basic Solana Anchor program you can build. It seriously does nothing, except create itself. This code is the equivalent of `return true;` in most languages. Let's break down what the program structure and what is happening.

### Import libraries

Like most other languages, it is also convention to "_import_" all of your desired items/libraries/crates at the top of your rust file. In rust, the `use` keyword is used to specify what crates to import into the specific rust file.

```rust
use anchor_lang::prelude::*;

```

For every Anchor based Solana program, the same basic import of the `anchor_lang` is used to tell the rust compiler to use the Anchor framework inside our code. Including setting it as part of the _namespace_ so we can call the Anchor functions and magic sauce in the "_local scope_".

### declare_id

Next, we are using the `declare_id` macro to statically define the `program_id` (aka _public address_) of our Solana program. This will enable some extra security in our program, courtesy of the Anchor framework.

This line of code should be in every Anchor program (specifically in `lib.rs`), and by convention just below your _imports_ at the top of your file.

```rust
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");
```

By default, the Anchor CLI (and anywhere else you get Anchor program examples) will have a `program_id` set with this macro.

<div class="msg caution text">
You should <b><u>ALWAYS</u></b> change the value inside if your local source code to be the address of the keyfile being used to deploy your program (more on this in a bit).
</div>

### The core logic for our Solana program

Next, we are creating a public **_module_** named `program_name` with the `program` **_attribute_** set on it.

No pun intended but, let's unpack that statement.

```rust
#[program]
pub mod program_name {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}
```

Our public "module" will act as the container for the primary execution of code inside our program. Sort of like functions and methods do in other languages.

The `program` attribute is specially define by Anchor. Not only will handle lots of the boilerplate that is traditionally written in _vanilla_ Solana programs, but it will also add some basic security check on our program.

So in a sense, you can think of defining our module with the `program` attribute like defining the `main()` function in other statically typed languages. Sort of.

```rust
use super::*;
```

Next we bring all the imported libraries from the `program` attribute into our local scope within our `program_name` module.

```rust
pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
  Ok(())
}
```

Finally we define a very simple `initialize` function that we can use to actually execute code on the Solana blockchain (via an RPC call).

For Anchor programs, every _endpoint_ function will take one or more parameters. The first parameter will always be a `Context` of the desired `struct` defined in your Solana program. You can add more parameters, as needed for your program, to your functions.

You can read more about the Anchor context in the Anchor lang [docs](https://www.anchor-lang.com/docs/the-program-module#context). But the gist is that this context will give us a very convenient way to read the accounts submitted to our functions.

We are also stating that our function will always return a `Result` type when it is complete (aka only 2 possible outcomes). This will allow our `initialize` function to return `Ok(())` when it is successful, and `Err()` when an error occurs.

All Solana program functions are required to return a `Result` of some type. The `Ok` outcome is typically a blank value of `()`, while the `Err()` can be be any error you as the developer decide to return. Often times, developers will define a specific `struct` for creating standard/reusable errors. I strongly recommend doing the same, especially if you are going to open source your code. Think of others, be considerate!

### Define our basic `struct`

Like I pointed out earlier, we need to define a `struct` used by our `Context`. This structure will tell Anchor the expected accounts that will be supplied to your function. And since the Solana runtime requires a complete listing of all accounts a program execution [will interact with](https://docs.solana.com/developing/programming-model/transactions#accounts), Anchor can do some useful things.

```rust
#[derive(Accounts)]
pub struct Initialize {}
```

In this specific example, our `initialize` function does not actually interact with any other Solana accounts, so our `Initialize` `struct` can remain effectively empty.

We are also using Anchor's `derive(Accounts)` macro to add some deserialization helpers onto our `Initialize` struct.

I will discuss these more in later tutorials when we really use them, but you can read up on this `Accounts` macro on the Anchor lang [rust docs](https://docs.rs/anchor-lang/latest/anchor_lang/derive.Accounts.html)

<!-- ## What's next?

Now that we have gone over a quick overview of the most basic Anchor program, we will need to make sure we create a Solana wallet and [deploy our program](/articles/deploy-an-anchor-program) to a Solana cluster. -->
