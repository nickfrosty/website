---
date: 2021-04-01 00:00 EST
title: 'Fix PHP fatal error "allowed memory size of"'
# blurb: ""
description:
  'Fix the "allowed memory size of" usually only takes a single edit. Even on
  WordPress. PS: Running out of "allowed memory" can cause your website to
  crash.'
image: /media/articles/php-errors/php-memory-limit-thumbnail-1.png
tags: php, wordpress
---

This fatal error occurs when your web app or website is using too much memory.
Plain and simple. Just like a local application running on your computer, your
website takes some amount of memory to run. So at your site runs on your hosting
provider's servers, you are using up some of that server's memory, known as RAM.

![fix the "allowed memory size" error in PHP](/media/articles/php-errors/php-memory-limit-thumbnail-1.png)

Once your website has reached the PHP memory limit that is set in your server's
PHP configuration file, usually 8MB by default, you run out of your available
memory limit.

## Common Fixes for "fatal error allowed memory size of"

There are a couple of quick fixes for the PHP "fatal error allowed memory size
of" error message. The basic gist of these different fixes: your website needs
**MORE** memory and need to be more efficient. Maybe both.

## Raise the PHP memory limit with code

The quickest and easiest way to fix the memory limit error is to raise your PHP
memory limit. By default, the
[php.ini configuration file](https://www.php.net/manual/en/configuration.file.php)
sets the memory limit to a whopping 8MB. This is usually enough for most
websites, but not always.

If you don't have access to the server configuration files, like most people,
you can add a single line of PHP code to your website to boost the memory limit
of php. Just add the line of code below to any and all pages that are giving you
the "php fatal error allowed memory size" error message. And adjust the amount
of memory you need to get the website back up and running again.

```php
<?php
  ini_set("memory_limit", "16M");
?>
```

## Raise the PHP memory limit for server via config files

Alternatively, if you want to boost your memory limit for the entire web server
then you can update the php.ini configuration file. Browse over to your web
server's php directory and find the php.ini file.

Browse around in the config file, with some Ctrl + F action, and locate the
"memory_limit" setting. It will likely be set to "8MB". Just boost that sucker
up to the amount needed to clear the fatal error.

![Raise the PHP memory limit using the php.ini config file](/media/articles/php-errors/php_memory_limit-config-setting.png)

**NOTE:** _You want to keep the memory limit as low as needed to clear the
"allowed memory size" error. It will help your site run faster since it will
take up the least memory needed to successfully operate._

## Set PHP memory limit in WordPress

If you are using a [WordPress](/articles/tag/wordpress) website, don't worry.
You can also raise your PHP memory limit on WordPress too. Just need to make an
update to the wp-config.php file for your website.

Browse on over to the script using your preferred FTP client, or directly from a
cPanel file manager. Once you get it, load up the wp-config.php file into a text
editor.

![update the wp-config.php file to raise the memory limit for WordPress](/media/articles/php-errors/php_memory_limit-wordpress-wp-config-file.png)

You need to add this one line of code into the WordPress config file. (I
recommend adding it right after the similar line of code that sets the
`WP_DEBUG` setting.)

```php
  define( 'WP_MEMORY_LIMIT', '256M' );
```

This line of code will tell WordPress to set the PHP memory limit specifically
for your WordPress website. After you add the new line of code, save your
changes and upload the `wp-config.php` file back where you found it.

You can learn more about the WordPress configuration file from the official
WordPress website.

## Still not Enough Memory Limit??

If you are still getting the "_php fatal error allowed memory size of_" error
message then your website has a much bigger problem. You for sure need to look
into making your website more efficient and taking up less resources.

For those web developers, you need to figure out when the fatal error message
started happening. What changed? Did you push an update to your site? Update
some plugins? Install new services or code?

Try to backtrack in your code, if able, back to the most recent stable version.
Then take a good comb though the newer code and see if you can find that
**memory leak!**
