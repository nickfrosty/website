---
date: 2021-07-15 00:00 EST
title: "htaccess cache control for a faster website"
# blurb:
description: Make your website load faster by adding these snippets to your .htaccess file
image: /media/articles/htaccess/enable-htaccess-cache-control.jpg
tags: htaccess, cache
# nextPage:
---

One of the nifty ways to speed up a website is using some quick htaccess cache control. If you allow your website to cache page content locally, then users will have faster load times of your website as they browse around.

## Open your htaccess file

To enable cache control on your website, open your primary `.htaccess` file. Usually located inside of the `public_html` folder on your web server. Most website will already have a `.htaccess` file, so you can simply edit yours and add the cache control lines below.

### Don't have a .htaccess file?

No worries. You can create one very quickly. You can either make one locally on your computer and upload the file to your web server, or create one using an online manger like [cPanel](https://www.hostwinds.com/guide/creating-editing-htaccess-file/).

Either way, create a new file on in the root of your **public** website directory and name it `.htaccess`. You may need to enable viewing of hidden extensions and enable editing file extensions, depending on the method you chose to use.

You can also create an empty text file and rename it to "**.htaccess**", without any actual file name. Just the extension. I usually end up doing this a lot.

## Enable htaccess cache control

Inside of your `.htaccess` file, you need to add the following code in order to enable htaccess cache control:

```bash
# Start Cache control
<IfModule mod_expires.c>
    # Turn on the module.
    ExpiresActive on

    # Set the default cache times
    ExpiresDefault "access plus 7 days"
    ExpiresByType image/jpg "access plus 3 month"
    ExpiresByType image/svg+xml "access 3 month"
    ExpiresByType image/gif "access plus 3 month"
    ExpiresByType image/jpeg "access plus 3 month"
    ExpiresByType image/png "access plus 3 month"
    ExpiresByType image/ico "access plus 3 month"
    ExpiresByType image/x-icon "access plus 3 month"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType text/html "access plus 1 month"
</IfModule>
# End cache control
```

Using the `mod_expires` module inside of htaccess, I set the expiration time (aka _cache_) time for each of the file types. Feel free to change the expiration time to your hearts desire.

Typically, I set the CSS/JS cache time to be a month or more and the images to be even longer. My reasoning is that if I am more likely to make changes to the design of my sites far more often than changes to images. You know?
