---
title: "Redirect http to https: force https with htaccess"
blurb: "Fact: if your site does not force https then it is not secure. So fix it."
description: "These days, if your site does not force https then it may not be secure. Chrome, Brave, and Firefox will give nasty security warnings to your users if you site is not secured with https/ssl."
image: /media/articles/htaccess/force-https-with-htaccess-redirect-http-to-https.jpg
date: 2021-07-10 00:00 EST
tags: htaccess, litespeed
# nextPage: "deploy-an-anchor-program"
---

Using your website's .htaccess file, you can **force https** to all of your users. Securing your site, and getting rid of the annoying "insecure website" message.

![force your website to always have https/ssl](/media/articles/htaccess/force-https-with-htaccess-redirect-http-to-https.jpg)

## What is a htaccess file anyway?

A htaccess file is a special file on your web server that directs how certain actions are handles by the server. Most of the time, the htaccess instructs the server how to write/rewrite web requests (like forcing https or forcing www on your website) or how your server should handle image compression.

The file is simply named `.htaccess` (just the extensions, no actual name) and placed in the root of your public directory for your website.

### htaccess on Apache

The [Apache server](https://www.apache.org/) software has been around forever. Basically since the beginning of the internet. Tons of websites run on an Apache server. Being so old, htaccess files were originally designed for Apache servers. So these files work flawlessly with Apache. All you need is the correct `mod_rewrite` module installed on your Apache server, and you are ready to create and edit your .htaccess file. Lucky for us all, Apache comes with the `mod_rewrite` module installed and enabled.

Apache servers will usually work out of the box with htaccess configurations. All child directories will use the parent directory's htaccess file for itself. Easy day.

### htaccess on LiteSpeed or OpenLiteSpeed

LiteSpeed and [OpenLiteSpeed](https://openlitespeed.org/kb/) servers are a bit different. Since htaccess was designed by Apache, the LiteSpeed server team had to modify it a bit to make it work on their server software. Because of these changes, LiteSpeed handles htaccess files a bit different. LiteSpeed loads the htaccess file once on loading the actual server software.

### Why do you care?

1. For one, you htaccess may not not be auto loaded by default in LiteSpeed. It is a server setting that must be enabled. You can read about how to do it from the [official docs](https://openlitespeed.org/kb/how-to-autoload-htaccess-with-openlitespeed/)

2. And two, when you update a htaccess file on LiteSpeed servers **you must restart the LiteSpeed server software.** This is the only way to reload the changes you made to your htaccess file. Also, each htaccess file will only work for the directory the file is actually located in. The settings do no trickle down to child directories. So you will need another htaccess file for each child directory.

<div class="msg note text">
Because of how it handles `htaccess` (and many other reasons) LiteSpeed servers are usually WAY faster than Apache servers.
</div>

### htaccess on Nginx? Not a chance.

Simply put, **you cannot use htaccess with a Nginx** server. The web server software was not designed for it, and they apparently have no intensions of doing so. Unfortunate.

## Basic .htaccess file

This is a special file, if you couldn't already tell. The actual _file name_ is "**.htaccess**". It has no _actual_ name, just a file extension.

If your site does not already have a htaccess file, then you will need to create one. It should be in the root of your **\*public** directory for your website, (e.g. /home/site.com/public_html or ~/www/site.com/public, etc).

```bash
<Files .htaccess>
order allow,deny
deny from all
</Files>

<IfModule mod_rewrite.c>
	Options +FollowSymLinks
		RewriteEngine on

	# custom config settings here
</IfModule>
```

Each htaccess file on you site will have a similar layout. The beginning will usually restrict access for people browsing to the file and reading it in their browser. Then it may check for a _module_, like **mod_rewrite**. And finally have actual commands and configuration settings for your web server to use to handle web requests

## Redirect http to https

To actually redirect all http requests into https, you only need to add 2 lines of config to your htaccess file. Not including the comment:

```bash
# redirect all http to https
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

`RewriteCond` ... : tells the web server to only rewrite on the condition of https being off (aka _http_)

`RewriteRule` ... : this tells the web server how to rewrite the url based on the previous condition statement. In this case, we take the entire url from the user **"(.\*)"** and send it back to using https.

## Force https on WordPress

If you are trying to force https on WordPress, then you have a few options. You can edit the already included **.htaccess** file in your public website directory just like above. Simply grab those 2 lines of htaccess config above and place it before all the other RewriteCond/RewriteRule statements, and you are ready to go.

If you do not feel comfortable editing this file (and that's cool too), there are a couple of free plugins for WordPress that handle this nicely: like [Really Simple SSL](https://wordpress.org/plugins/really-simple-ssl/) and [WP Force SSL](https://wordpress.org/plugins/wp-force-ssl/).

## Force http on localhost (https everywhere else)

You may start to run into issues while trying to redirect http to https in your localhost server or development environment. Usually for the simple fact that your local dev server likely does not have https/ssl enabled. Unless you are using something cool like Laravel Valet to get a secure local dev environment.

By adding a few extra `RewriteCond` statements before your `RewriteRule` that forces https, you can tell the Apache/LiteSpeed web server to not force https on your local dev environment, aka localhost.

First checking for the remote ip address for localhost (_127.0.0.1_), since some server setups may return this one. Then checking for the other common remote address for local host (_::1_). And finally checking for the remote host being your local _127.0.0.1_ ip address.

```bash
<Files .htaccess>
order allow,deny
deny from all
</Files>

<IfModule mod_rewrite.c>
		Options +FollowSymLinks
		RewriteEngine on

		# force https in the browser (but not on localhost)
		RewriteCond %{REMOTE_ADDR} !^127\.0\.0\.1
		RewriteCond %{REMOTE_ADDR} !^::1
		RewriteCond %{REMOTE_HOST} !^127\.0\.0\.1
		RewriteCond %{HTTPS} off
		RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

</IfModule>
```

Every website or project I work on, I use this. It works like a charm. Keeping the public websites secure for actual users on the internet. While also not trying to force https in my local development environment. Life changing.
