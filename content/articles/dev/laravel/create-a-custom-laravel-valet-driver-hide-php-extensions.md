---
date: 2021-07-09 00:00 EST
title: "Create a custom Laravel Valet driver"
blurb: This custom Valet driver can get those sweet ".test" websites on any Laravel site
description: Laravel Valet is wonderful, but I don't use Laravel. This is how to created a custom Valet driver to get those sweet ".test" websites. Works like a charm.
image: /media/articles/laravel/create-a-custom-laravel-valet-driver-hide-php-extensions.jpg
tags: laravel, valet, php
---

Valet is wonderful. So wonderful that I use it on custom apps that do NOT use Laravel.
For my custom web apps, I created a custom Valet driver to get those sweet `.test` websites. Works like a charm.

I mean it. Valet is the best! Perfect for a solid, lightweight, and minimal development environment. You can link your project's directory then browse to the project using a ".test" domain. So clean.

![Create a custom Laravel Valet driver to get .test domains](/media/articles/laravel/create-a-custom-laravel-valet-driver-hide-php-extensions.jpg)

The problem that I faced was that I don't use Laravel. A sin for a php developer I know. So in order to be able to use Valet style ".test" domains for my custom web apps, I must create a custom Valet driver for your app. Luckily, if you write it once (or use mine) then you will be set until Valet or Laravel changes a bunch. So basically, forever 🤞

## What is a Valet driver?

Just a single class. Specifically a custom class that extends the `LaravelValetDriver` class. The goal of these custom drivers enables developers to use Valet for other web apps or CMS that are not natively supported in Valet.

You can use these drivers to specifically handle the routes needed for your web app on your local dev environment to speed up and betterify (real word) your dev life.

## Where to save your custom Valet driver?

Really you have a few options. Most of the default drivers that come with Valet are stored inside the local default folder at _~/.config/valet/Drivers_. This is where you can save all of your custom, reusable drivers. They will be automatically loaded by Valet when pages are rendered. No more setup needed.

You can also add the unique driver into your web app's working directory. Say you are building you app in your _C:\xampp\htdocs\mysweetapp_. You place the custom driver inside the root of your apps folder. It However, it must be named `LocalValetDriver.php`. When you link this folder to Valet, it will automatically use this local driver for your site `mysweetapp`.

For this article, I will be doing the second option.

## Create a file named `LocalValetDriver.php`

This local valet driver will be loaded only for the current application. No more, no less.

```php
class LocalValetDriver extends LaravelValetDriver {
    /** your code here */
}
```

Since we extend the builtin Laravel class named `LaravelValetDriver`, we are required to have 2 functions.

- `serves()` and
- `frontControllerPath()`

## "serves" function

The `serves()` function is used to determine if the current web app should use the valet driver. It receives 3 parameters returns true or false. If `serves()` returns a `true`, then Valet will attempt to use the driver to actually load and process your website. We want true.

- `$sitePath` → the absolute path that your linked site inside of valet (e.g. _C:\xampp\htdocs\mysweetapp_)
- `$siteName` → the name that your valet site (e.g. _mysweetapp_); the same name used for your .test site (e.g. _mysweetapp.test_)
- `$uri` → the actual uri from the browser request; say you visit mysweetapp.test/contact, the uri is "contact". If you browse to _mysweetapp.test_, the uri is _empty_

The logic inside the function is simple. We check for specific files that are specific to the web app or CMS you want to use this custom driver for. WordPress for example would check for `wp-config.php`.

```php
/**
* Determine if the driver serves the request.
*
* @param  string  $sitePath
* @param  string  $siteName
* @param  string  $uri
* @return bool
*/
public function serves($sitePath, $siteName, $uri) {
	return ( file_exists($sitePath.'/init.php') && file_exists($sitePath.'/config.ini') );
}
```

For my app, I am checking for 2 files: **init.php\*** and **config.ini**. These files then would need to exist inside in my working directory, _C:\xampp\htdocs\mysweetapp\this-file-here.php_. If they are both found, then the driver will be loaded and used by Valet.

## "frontControllerPath" function

The `frontControllerPath` function returns the full absolute path of the page being loaded on your website. Fully resolved, as they say. This function is the heart of your custom driver. It will perform all the logic to check if the file exists. Even use it to hide php file extensions with Valet (like I do).

The `frontControllerPath()` function takes the same parameters as the `serves()` function. The exact same. How convenient.

In my custom driver's function, I first check if the request uri is the root of a directly (e.g. _mysweetapp.test_) and loading the index.php file by default.

Next checking if the request uri is an actual file that exits with the given extension (e.g. mysweetapp.test/page1.php).

Then checking if the uri exists with the added php extension (e.g. _mysweetapp.test/page_name_ turns into _page_name.php_). This will effectively **hide php extensions inside of Valet**. I love it and use it for every web app.

Finally defaulting to the 404 page that is located inside the `public_html` directory. If no 404.php file exists, then it will default to the default Valet 404 page.

```php
/**
	* Get the fully resolved path to the application's front controller.
	* @param  string  $sitePath
	* @param  string  $siteName
	* @param  string  $uri
	* @return string
*/
public function frontControllerPath($sitePath, $siteName, $uri = 'index.php'){
	// add the public folder to the sitePath
	$sitePath .= '/public_html';

	// smart handle the requests, defaulting to index.php in directories and hiding php extensions
	if ( is_dir($sitePath . $uri) && file_exists ( $sitePath . $uri . '/index.php' ) )
		return $sitePath . $uri . '/index.php';
	else if ( file_exists ( $sitePath . $uri )  )
		return $sitePath . $uri;
	else if ( file_exists ( $sitePath . $uri . '.php')  )
			return $sitePath . $uri . '.php';
	else
		return $sitePath . '/404.php';
}
```

Complete custom Valet driver for a custom web app

The complete working version of my custom Valet driver is below. Of course feel free to modify it to your hearts content. Source available on GitHub.

```php
<?php
/**
*  Local valet driver for a custom framework or web app
*  by Nick Frostbutter (https://frostbutter.com)
*      - loads index.php file by default in all directories
*      - hides "php" extensions by default
*  Tutorial: https://frostbutter.com/articles/create-a-custom-laravel-valet-driver-hide-php-extensions
*/

class LocalValetDriver extends LaravelValetDriver {
	/**
	* Determine if the driver serves the request.
	*
	* @param  string  $sitePath
	* @param  string  $siteName
	* @param  string  $uri
	* @return bool
	*/
	public function serves($sitePath, $siteName, $uri) {
		return ( file_exists($sitePath.'/init.php') && file_exists($sitePath.'/config.ini') );
	}

	/**
	* Get the fully resolved path to the application's front controller.
	*
	* @param  string  $sitePath
	* @param  string  $siteName
	* @param  string  $uri
	* @return string
	*/
	public function frontControllerPath($sitePath, $siteName, $uri = 'index.php'){
		// add the public folder to the sitePath
		$sitePath .= '/public_html';

		// smart handle the requests, defaulting to index.php in directories and hiding php extensions
		if ( is_dir($sitePath . $uri) && file_exists ( $sitePath . $uri . '/index.php' ) )
			return $sitePath . $uri . '/index.php';
		else if ( file_exists ( $sitePath . $uri )  )
			return $sitePath . $uri;
		else if ( file_exists ( $sitePath . $uri . '.php')  )
				return $sitePath . $uri . '.php';
		else
			return $sitePath . '/404.php';
	}
}

?>
```

This driver has been a delight, just like Valet. Making your life as a developer easier is a must.

If you are interested, you can read more about custom Valet drivers from the [Laravel docs here](https://laravel.com/docs/8.x/valet#custom-valet-drivers).
