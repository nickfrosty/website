---
title: "Setup font awesome in Vue and NuxtJS"
blurb:
  "Fontawesome is pure awesome. Vue and Nuxt are awesome. So why not use
  Fontawesome with Vue JS or Nuxt JS?"
description:
  "Fontawesome is pure awesome. Vue and Nuxt are awesome. So why not use
  Fontawesome with Vue JS or Nuxt JS? Here is how."
image: /media/articles/vue/font-aweseome-in-vue-and-nuxt-js.jpg
date: 2021-12-03 00:00 EST
tags: vue, font-awesome, nuxt
---

If you have been living under a rock for several years and don't know,
Fontawesome a wonderful icon library. It's open source, SVG based, and can be
used on any website like utility classes.

![](/media/articles/vue/font-aweseome-in-vue-and-nuxt-js.jpg)

## Two different options to get awesome

Before the setups steps you should know, there are two ways to use Fontawesome
icons in a Vue or Nuxt project:

- "component" based icons
- or utility "class" based icons

Both options work well, and are really just a matter of preference. But they
have very similar setups, so I'll show both methods here.

With "component" based icons, you can add icons like this:

```jsx
<font-awesome-icon :icon="['fas', 'user']" />
```

With utility "class" based icons, you can icons like this

```html
<i class="fa fas fa-user"></i>
```

With Vue being a componentized framework, some people really love being able to
use Fontawesome icons just like any other component. Personally, I do not.

I really like the utility class method. I find it easier, and I can use other
[Tailwind](/articles/tag/tailwind) utility classes or regular CSS to style icons
further when I want to.

## Install the "_fortawesome_" packages

That's right. The package is actually **_fortawesome_**. Not fontawesome. Don't
ask me why...

Using your favorite package manager, install the `fortawesome` dependencies.

```jsx
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
```

This will install the "**core**" package which you must add. As well as the
"solid" icon pack. This will allow us to use the solid icons from Fontawesome.

If you want to add more icons into your project, then you can also install the
"brands" and "regular" icon packs. (I end up using the same brand icons, like
[Twitter](https://twitter.com/nickfrosty) and GitHub a lot.)

```html
npm install @fortawesome/free-brands-svg-icons
@fortawesome/free-regular-svg-icons
```

You can see the official NPM package here:
[@fortawesome/fontawesome-svg-core](https://www.npmjs.com/package/@fortawesome/fontawesome-svg-core)

## Setup Fontawesome in Vue JS

If you are using a regular Vue JS project, then open up your **_main.js_**
project file, add add the following code to it:

```jsx
/* Import all the font awesome goodness */
import { library } from "@fortawesome/fontawesome-svg-core";

// loads all the "solid" icons
import { fas } from "@fortawesome/free-solid-svg-icons";

// loads only the "twitter" brand icon
// import { faTwitter } from '@fortawesome/free-brands-svg-icons'

// add each of the imported icons into the app
library.add(fas); // can be a list of all the icons e.g. (fas, fab, faTwitter, etc)

// to use component based icons
//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// to use class based icons
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();
```

<Callout>

Specifically, you should add this code before you create your "app" object.

</Callout>

Here we are importing the `library` object from the `fortawesome core`. The
library will allow us to specify which icons we want to use in our project. More
on

Next, I import `fas` from the `solid` icon pack. This is how you import all of
the solid icons from the solid icon pack. The same way works for the brand
icons. To import all the brand icons, import `fab` from the `brand` icon pack.

Make sense?

If you want to only use a specific icon in your project, you can import only the
desired icons from the each icon pack. For example, to only import that twitter
icon from the brand pack, use this line:

```jsx
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
```

<Callout>

The icon names are written in Pascal case (e.g. "faTwitter", **NOT**
"fa-twitter").

</Callout>

After importing all the icons you want for your project, we add them to the
library.

```jsx
library.add(fas); // can be a list of all the icons e.g. (fas, fab, faTwitter, etc)

// addd all solid icons and twitter
library.add(fas, faTwitter);
```

In the `add` function, you can pass the list of all the icons you imported and
want to use in your project.

### To use component based icons:

Import the `FontAwesomeIcon` component on each of your _.vue_ pages you want to
use the component. This way, you can use font awesome icons like any other vue
component. Like this:

```jsx
<font-awesome-icon :icon="['fas', 'user']" />
```

Just pass in an array into the `icon` prop. The first item in the array is the
library you imported, the second item is the icon name itself.

### To use the utility class icons:

We import _dom_ from the fortawesome core. The `dom` will allow us to use the
utility class method of using the icons. the `dom.watch()` function is where the
magic happens for Vue to enable the normal font awesome classes to work
properly.

Using this way, you will be able to add fontawesome icons like regular html:

```jsx
<i class="fa fas fa-user"></i>
```

If you are going to use the component method for the icons, then you do not need
to import `dom` or use `dom.watch()`

But like I said earlier, this is the method that I **REALLY** prefer. It seems
cleaner.

## Setup Fontawesome in NuxtJS

If you are trying to add Fontawesome icons into a Nuxt JS app, the setup is very
similar. The only difference is that in order to actually tell Nuxt to use
Fontawesome icons, you must create a plugin with the code from the section
above, then load the plugin in your `nuxt.config.js` file.

### Create the Fontawesome plugin

From inside your Nuxt app's root directory, create the new file
`~/plugins/fontawesome.js`.

If you do not already have a `plugins` folder, just create it now 🙂

In the exact way I explained above, import and add all the Fortawesome icons you
want to use in your project:

```jsx
/* Import all the font awesome goodness */
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
library.add(fas, faTwitter);
dom.watch();
```

Save the code into your new `fontawesome.js` plugin file.

### Add your new plugin into your `nuxt.config.js` file:

```jsx
plugins: [
  '~/plugins/fontawesome.js',
],
```

All done. Reload your hot server, and give it a test. Enjoy the awesome that is
Fontawesome!
