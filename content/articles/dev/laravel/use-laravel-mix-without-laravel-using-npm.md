---
date: 2021-05-03 00:00 EST
title: "Use Laravel Mix without Laravel (using npm)"
blurb: "I don't use Laravel. But you can still get the magic sauce of Laravel Mix without Laravel."
description: "Laravel Mix is a great tool. But I don't use Laravel. But you can still get the magic sauce of Laravel Mix without Laravel, using npm."
image: "/media/articles/laravel/laravel-mix-without-laravel-with-npm.jpg"
tags: laravel, npm, tailwind
---

After hours of trial and error, here is how I actually setup and use Laravel mix **WITHOUT** actually using the Laravel framework. Using npm.

![](/media/articles/laravel/laravel-mix-without-laravel-with-npm.jpg)

Literally hours of struggle and errors. Hours trying to figure out how to setup Laravel mix for a Tailwind project, finally got a working result. Here is the most straightforward way to setup Laravel Mix using NPM. As well how to properly configure your webpack config file.

Side note: Even though I love what [Taylor Otwell](https://twitter.com/taylorotwell), and the great peeps over at Laravel do, I still don't use the [Laravel framework](https://laravel.com) in any of my PHP based web apps. It seems like a sin since it is such a popular framework. But that's cool. I just like vanilla PHP.

## Install NodeJS and NPM

For starters, you will need to have node JS and npm installed on your system, whether you are running Windows (like me), Linux (sometimes like me), or Mac (never like me). Laravel Mix relies on npm.

You can find the official installer on the [NodeJS website here](https://nodejs.org/en/). It's a very straightforward installer.

## Create your package.json

Browse on over to your terminal window, and navigate to the directory you want to setup Laravel mix. You need to create your **package.json** file. Either with this command:

```bash
npm init -y
```

Or by using the sample **package.json** file below.

## Add these "devDependencies" to package.json

Since we want to use Laravel Mix with NPM, we need to actually set it to be a dependency to use it in the project. But since I do not want it to load on my production site, I add as a dev dependency.

Mix needs a few other packages to be loaded as well. Listed below are the required **devDependencies** you should add (tailwind and browser sync are optional):

```json
"devDependencies": {
    "cross-env": "^5.1",
    "laravel-mix": "^2.1",
    "laravel-mix-purgecss": "^2.0",
    "laravel-mix-tailwind": "^0.1.0",
    "tailwindcss": "^1.2.0",
    "browser-sync": "latest",
    "browser-sync-webpack-plugin": "^2.0.1"
}
```

**Pro Tip:** In order to get the most out of using Laravel Mix, I also use BrowserSync. And you should to! It will help you auto refresh your project while working on front end code.

## Add the Mix "scripts" to package.json

The big reason to use Laravel Mix is really to use these sweet npm scripts. Each of these scripts (aka commands) have their specific uses, but you should add all of them for your current and/or future use:

```json
"scripts": {
    "dev": "npm run development",
    "development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "watch": "npm run development -- --watch",
    "watch-poll": "npm run watch -- --watch-poll",
    "hot": "cross-env NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js",
    "prod": "npm run production",
    "production": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --no-progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
},
```

If you are new to Laravel Mix and never used these scripts before, here is a brief description of what they do:

- `development`: compiles your CSS and JS into their final public resting place for your project. But in "dev" mode, the files are not minified. Making the build time much faster for your dev work (aka frequent changes)
- `dev`: just short hand for "_development_"
- `watch`: the same as dev, but you will get auto reload and rebuilds on your project (if you have browser sync setup)
- `production\*\*": compiles your CSS and JS into their final public resting place for your project WITH minification
- `prod`: just short hand for "_production_"

And when you want to run each of these commands, you run them in the terminal using npm like so:

```bash
npm run dev
npm run watch
```

## Install Laravel Mix with NPM

With your **package.json** file configured, we want to actually run the npm installer to download the correct versions for each of the packages we need for the project:

```bash
npm install
```

The download may take some time, but that is totally fine. Mine took about 8 minutes. Wowza!

Once your installation command is complete, you should see a new folder created named "**node_modules**". This is good! If you do not see the folder (and it full of files and folders) then something went wrong. Maybe try again?

## Configure your webpack.mix.js file

Now is the time to configure your webpack script. It is **SUPER** important to get this script right, because if you do not then you will for sure get errors (I know from experience).

For the most part, this webpack.config.js file is pretty standard. We tell the processor to use the "laravel-mix" package as well as load up tailwind and purgeCSS.

## But, you MUST update this file to your project!

```javascript
let mix = require("laravel-mix");
require("laravel-mix-tailwind");
require("laravel-mix-purgecss");
/*
|--------------------------------------------------------------------------
| Mix Asset Management
|--------------------------------------------------------------------------
|
| Mix provides a clean, fluent API for defining some Webpack build steps
| for your Laravel applications. By default, we are compiling the CSS
| file for the application as well as bundling up all the JS files.
|
*/
mix.setPublicPath("update_to_your_source_folder");
mix
  .js("location/of/your/site.js", "where/to/save/your/js")
  .postCss("location/of/your/tailwind.css", "where/to/save/your/css", [
    require("tailwindcss"),
  ]);

if (mix.inProduction()) {
  mix.version();
}
```

This config file tells webpack where to look for your CSS and JS files to actually process them for your web app. Be sure to update the following info for your:

- **update_to_your_source_folder**: this location if the folder of your public site (relative to the location of your webpack.config.js file) (e.g. "_public_")
- **location/of/your/site.js**: the relative location of your sites primary javascript file (where you can load the other javascript files as well) (e.g. "_resources/js/site.js_")
- **where/to/save/your/js**: the relative location to save the new compiled JS file. this should most likely be somewhere inside of your public folder (e.g. "_public/assets_")
- **location/of/your/tailwind.css**: the relative location of your sites primary CSS file (where you can load the other CSS libraries as well like tailwind) (e.g. "_resources/js/tailwind.css_")
- **where/to/save/your/css**: the relative location to save the new compiled CSS file. this should most likely be somewhere inside of your public folder (e.g. "_public/assets_")

## Enable BrowserSync via webpack? You should!

If you have made the productive decision to use browser sync, then good for you. It is a super straight forward process. You can add these lines of code directly into your **webpack.config.js** file (I like to put mine just above the "_mix.setPublicPath_" code):

```javascript
let proxy_url = process.env.APP_URL;
mix.browserSync({
  proxy: proxy_url,
  ghostMode: false,
  notify: {
    styles: {
      top: "auto",
      bottom: "1rem",
    },
  },
  files: ["./resources/**/*.js", "./resources/**/*.css", "./public/*"],
});
```

### Before you move on: update the files to auto detect!

You must update the array of "files" listed in the config. These wildcard enabled locations are all the possible locations and types of files that, when their source code is updated, browser sync will make its magic happen. Making the browser auto reload for your.

You will also need to make sure the "proxy_url" variable is correctly set to your site's local testing address. If you are using a tool like Laravel's Valet, then your "proxy_url" might be "project.test". (And yes, I also use Valet from Laravel too. Again, without using the actual Laravel framework...)

Now, with browser sync enabled with Laravel Mix you will be able to use the "npm run watch" command to get the most out of your dev environment.

## Configure the tailwind.config.js file

Since for this article, and my future projects, I am setting up this project using Mix AND tailwind, we need to actually configure tailwind. I run the following command to create the scaffolding of the tailwind.config.js file for me:

```bash
npm tailwind init
```

This will auto-create the default (and pretty empty) tailwind.config.js file. Looking pretty darn near close to this:

```javascript
// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

This barebones structure is great, but you still most update the "purge" attribute. This is an array of all the locations of your source code files that use the tailwind library.

To make purgeCSS to load all the html files in your public folder, use something like this:

```javascript
purge: ['./public/*.html'],
```

Listing out each of the folders and file type here will allow purgeCSS to auto search your source code to smartly find all the used tailwind CSS. In turn, smartly removing the unused CSS making your compiled CSS way small!

## Create your CSS and HTML files

To make use the basic tailwind components and utilities, add this to your `tailwind.css` file:

```javascript
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

## Let's test out Laravel Mix!

You should be ready to go and test out Laravel Mix.

In your terminal, go run the `dev` command to make sure you get no errors:

```bash
npm run dev
```

You should see some action in your terminal, showing you how far along webpack is at parsing and building out your compiled CSS and JS files. If all goes well, you should get a colored output stating the final file size of the compiled scripts.

<div class="msg note">
<b>Don't forget:</b>

when you are ready to move your project up to a production server, you need to run the `prod` command to actually build and minify your scripts. Or else, what was the point of all of this effort?!

</div>

## Enjoy!

With these steps all completed, your fresh Laravel Mix install is complete. And no Laravel framework was used. Looky there!
