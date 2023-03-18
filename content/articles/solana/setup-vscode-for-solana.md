---
draft: true
date: "2023"
title: Setup VS Code For Solana Development
description: Get your VS code configured with the best settings and plugins for Solana/Anchor program development.
blurb: The go to settings and plugins for Solana program development
imageFocus: right
# image:
# tags: solana, nft, spl token
---

## VS Codium Tips

If you are like myself, and using VS Codium as your editor of choice, you may run into some extra issues when setting up your editor for Solana development. These are the tips I have from my experience configuring VS Codium:

### Extensions and VSIX files

VS Codium uses the Open VSX marketplace (which is different from the Microsoft run extension marketplace). You may find that some extensions, like the _Prettier formatter for Rust_ extension below, will no be found using the extension search window inside your editor. Fear not!

In this article, I will link to the Microsoft extension marketplace where your can download the extension as a VSIX file. Which you can then manually install in your editor (just search the editor's _command palette_ for "_VSIX_").

## Rust Analyzer

Hands down, the most important VS code extension for building Solana programs is the [Rust Analyzer](https://rust-analyzer.github.io/)

- Open VSX: https://open-vsx.org/extension/matklad/rust-analyzer
- VS Code Marketplace: [rust-lang.rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

NOTE: If you are using VS Codium or the [Open VSX](https://open-vsx.org/extension/matklad/rust-analyzer) marketplace, I would recommend installing the rust analyzer extension manually since the public version on Open VSX is very outdated!

### Common errors with Rust Analyzer

#### Bootstrap error Error: Failed to execute

This is the most common error people get after installing the Rust Analyzer extension! This error will also stop the rust analyzer from even starting.

The specific error message:

`Bootstrap error Error: Failed to execute /home/nick/.config/VSCodium/User/globalStorage/matklad.rust-analyzer/rust-analyzer-x86_64-unknown-linux-gnu --version`

When you install the extension from the marketplace, it comes pre-bundled with a language server binary. But the problem is that often times, the extension will not make the binary executable on its own.

To fix this error, you will need to make the binary executable with `chmod`.

```bash
# change directory to the location given in your error message
cd ~/.config/VSCodium/User/globalStorage/matklad.rust-analyzer/

# grant executable permission to the binary
chmod +x rust-analyzer-x86_64-unknown-linux-gnu

# execute the binary to make sure it worked!
rust-analyzer-x86_64-unknown-linux-gnu --version
```

Once you reload your editor, the rust analyzer and language server should spin up.

#### "failed to run build script ..."

The specific error message(s):

- "failed to switch build data: rust-analyzer failed to run build scripts:"
- "error[E0554]: `#![feature]` may not be used on the stable release channel"
- "error: could not compile `anyhow` due to 2 previous errors"

This error can usually happen with rust language server due to a cargo crate have a version issue (e.g. `anyhow` from the message above). Try migrating to the `nightly` builds channel.

PS: I still have this problem in my editor and it does not appear to affect my Solana/Anchor builds.

#### No code snippets or code hints

For the Rust Analyzer extension to work properly, you will need your editor's workspace open to the root of your program. So ensure you are selected to the root of your Solana/Anchor project, which is usually the same folder as your `package.json` file.

Because of this and how the rust analyzer language server handles detecting the crates used, the extension will also usually not give code hints on many types of mono repos.

For example, the official Anchor lang [repo examples](https://github.com/coral-xyz/anchor/tree/master/examples) will not load correctly from the root of the repo. To fix it, you need to manually select the specific example directory as your VS code editor's workspace directory (e.g. `examples/tutorial/basic-0`).

#### `unresolved-proc-macro`

Sometimes, due to the way that Solana/Anchor programs "import" the crates into your Solana program, you may get this error message from the Rust analyzer VS code extension. Often causing your rust project files to have the `unresolved-proc-macro` error on them.

NOTE: This error message is purely given by the VS Code extension in your editor, and should not cause problems with actually compiling your Solana programs. It is just annoying in the editor!

To get rid of this error, open your VS code editor's config file (aka `settings.json`), and add the following JSON item to it:

```json
{
  "rust-analyzer.diagnostics.disabled": ["unresolved-proc-macro"]
}
```

After saving the `settings.json` file, you will need to reload the editor.

https://rust-analyzer.github.io/manual.html#unresolved-proc-macro

## Prettier (for Rust)

Github Repo: (github.com/jinxdash/prettier-plugin-rust)[https://github.com/jinxdash/prettier-plugin-rust]
VS Code Marketplace: [jinxdash.prettier-rust](https://marketplace.visualstudio.com/items?itemName=jinxdash.prettier-rust)

NOTE: This extension is not currently in the Open VSX registry, so you will have to manually install it via VSIX file :/

## Better TOML

The Better TOML extension will add syntax highlighting and TOML syntax parsing to your VS Code editor.

`toml` files are used to store configuration and project information for rust projects.

VS Code Marketplace: [tamasfe.even-better-toml](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml)
