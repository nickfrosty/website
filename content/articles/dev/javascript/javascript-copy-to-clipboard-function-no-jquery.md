---
title: "JavaScript copy to clipboard function (no jQuery)"
# blurb:
description: "Copy to clipboard with the click of a button. No jQuery, just vanilla JavaScript. Simple. Lightweight."
image: /media/articles/javascript/JavaScript-copy-to-clipboard-function-lightweight-and-with-no-jQuery-2.jpg
date: 2021-06-18 00:00 EST
tags: javascript, snippets
---

No jQuery. Just vanilla JavaScript. It's lightweight and uses no jQuery (keeping it extra light, you know?).

Recently, while working on my [url shortener](https://sizable.io) project, I needed a JavaScript copy to clipboard function. So after some researching and docs online, I came up with a pretty snazzy solution!

So my simple "copy to clipboard" function below is what I have come up with to solve this problem:

There is a **full explanation** of this JavaScript `copy` function below too :)

```javascript
function copy(elem) {
  // get the text to be copied
  if (elem.innerText != undefined) text = elem.innerText;
  else if (elem.value != undefined) text = elem.value;
  else return false;

  // create a temporary box, and stop the viewport scrolling
  var box = document.createElement("textarea");
  box.value = text;
  document.body.appendChild(box);
  box.style.top = "0";
  box.style.left = "0";
  box.style.position = "fixed";

  // select the text in the box and copy it
  box.focus();
  box.select();
  box.setSelectionRange(0, 99999);
  document.execCommand("copy");

  // alert the user of the copy?
  alert("text copied to your clipboard!");
}
```

Don't forget to change the message or method of alerting the user you have copied to their clipboard. Unless you want this alert message I guess. That's cool too :)

## Turns out: the clipboard is annoying...

This might surprise you, but the clipboard is really annoying to work with. It is really hard to actually to copy to clipboard in the browser. For a few reasons:

### every browser is different

browsers really only want you to be able to copy text that is "selected"

For some reason, it seems like the browsers don't want to make it easy to manipulate the clipboard. But that is what hacked together code snippets are for!

## How to clipboard in JavaScript

Add this JavaScript copy function into your web page. Put it anywhere you want, and it should work just fine.

On any text or element you want to copy text with JavaScript, use must call this `copy(this)` function. Like so:

Copy text from a text box or textarea:

```html
<input
  type="text"
  name="text_box"
  value="copy to clipboard"
  onClick="copy(this);"
/>
<textarea cols="50" rows="4">try to copy me</textarea>
```

Copying text from a text box or text area proved to be super easy. The JavaScript `select` and `setSelectionRange` functions were literally designed for it! But... what about copying regular text on the page? A bit more tricky:

Copy text from a div, span, or any other html element:

```html
<span class="my_class" onClick="copy(this);">copy this text</span>
```

When using non-user input text on a page, this copy function will only be able to copy the "[inner text](https://www.w3schools.com/jsref/prop_node_innertext.asp)" of the element. So if you are trying to copy very specific text on the page, I suggest wrapping the text inside of some "span" tags. It makes getting the correct text much easier.

## How this copy to clipboard function works:

This JavaScript function is pretty simple, but let me break it down:

First: using the parameter passed into the function, named `param`, I attempt to get the text/value to be copied. It performs a quick check to try to get the `innerText` or the `value`.

This check must be done since most elements in the DOM will only return the actual text you want with one of these. For example, `input` and `textarea` will use `value` while elements like span and div will use `innerText`.

```javascript
if (elem.innerText != undefined) text = elem.innerText;
else if (elem.value != undefined) text = elem.value;
else return false;
```

Next I create a fake element in the DOM to add the text we want to copy into it. I have to do this because in JavaScript, you can only "select" and copy text inside of an input or text area. So Ill just make a fake one not display it on the page.

Then I add some basic and specific styles to the fake textarea I created. You have to do this because as soon as we "select" the textarea to copy text with JavaScript, the [browser will auto scroll](/articles/css-scroll-animation-and-smooth-scrolling-with-scroll-behavior) to where the textarea is (which is at the bottom of the "body". So we make it fixed and at the top left so we don't see any scrolling. Wins!

```javascript
// create a temporary box, and stop the viewport scrolling
var box = document.createElement("textarea");
box.value = text;
document.body.appendChild(box);
box.style.top = "0";
box.style.left = "0";
box.style.position = "fixed";
```

Lastly, we actually will "focus" on the fake textarea, "select" all the contents, and actually execute the copy with JavaScript. This is effectively like clicking into the textarea, Ctrl+A, and Ctrl+C. You feel?

```javascript
// select the text in the box and copy it
box.focus();
box.select();
box.setSelectionRange(0, 99999);
document.execCommand("copy");
```

So there we have it. The easiest and lightweight way to make a JavaScript copy to clipboard function. With no jQuery, just vanilla javascript. So light and wonderful!
