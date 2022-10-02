---
title: "Add CSS Scroll Animation and Smooth Scrolling"
# blurb:
description: "Quick UX tips: turn jerky scrolling into smooth scrolling with a the CSS scroll-behavior property."
image: "/media/articles/ux-tips/css-scroll-behavior-scroll-animation-and-smooth-scrolling.jpg"
date: 2021-07-06 00:00 EST
tags: css, ux-tips
---

Make your website's scroll animation _buttery_ smooth with the CSS scroll animation property.

![](/media/articles/ux-tips/css-scroll-behavior-scroll-animation-and-smooth-scrolling.jpg)

## TLDR;

The basic way to add smooth scroll animation is using anchors/indexes on your website. Those are the hashtag urls that you can set inside a link. By default, if someone clicks on of the link their browser will jerk them down to the location of the anchor/id on the page. No so pretty looking. And certainly not a great user experience.

So, how to add the smooth scroll animation you ask?

- add the anchor link on your page: `<a href="#my_link">`
- create the anchor endpoint on the page element: `<div id="my_link">`
- add the CSS scroll animation property, aka `scroll-behavior`
- enjoy

## Add the anchor for smooth scrolling

Assuming you have your website already setup, find whichever link you want to use as your action. Simply assign the href parameter with a hashtag ("#") link of the id the page element to stop scrolling at.

```html
<a href="#myelement">click here to scroll to "myelement"</a>
```

## Create the smooth scroll endpoint element

Next, assign an "id" attribute to the element you want your smooth scroll to stop at. Make sure you give it the exact same name as previously used in the anchor tag. But without the "#" in the id value.

```html
<div class="whatever" id="my_element"></div>
```

## Add CSS scroll animation with "scroll-behavior"

With your page's anchor and endpoint all setup on your website, you can add the smooth scrolling effect by adding this single line into your main CSS file for your website:

```css
html {
  scroll-behavior: smooth;
}
```

**Note:** It is important to add the `scroll-behavior` style on to the `html` tag so your entire website will have the smooth scrolling effect.

Some people, including myself, have tried to set the smooth scrolling on the `body` tag. But that does not work for some reason.

Once you save your changes, and reload the CSS into the browser, your snazzy new smooth scrolling will be in effect.

## CSS scroll animation on old browsers?

The downside of this UX tip, is that the CSS scroll animation does not work in older browsers. But anyone using any reasonable modern browser should be fine. And worst case, they won't get the added UX boost. But let's be honest, if they are using an older browser (cough internet explorer cough) then they already make poor life decisions. And obviously not looking for the best user experience on the web. Right?

![web browser support for css smooth scrolling](/media/articles/ux-tips/Quick-UX-Tips-CSS-Scroll-Animation-with-Smooth-Scrolling-browser-support.png)

The good news is that browser support for the CSS scroll-behavior property has been around for a bit. So that's a plus :)
