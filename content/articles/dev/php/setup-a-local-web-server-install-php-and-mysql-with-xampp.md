---
date: 2019-07-19 00:00 EST
title: "Install PHP on Windows and Setup a local web server"
blurb:
  "Have better MySQL server security. Update your MySQL server password,
  directly from the command line."
description:
  "Whether you are trying to learn how to create websites, or trying to learn
  WordPress, the best way to learn web development is to setup a local web
  server."
image: /media/articles/php/install-php-on-windows/Setup-a-local-web-server-Install-XAMPP-0-featured.png
tags: php, windows, mysql
---

With a local web server installed on your Windows or Linux computer, you can
start creating and practicing your programming.

![](/media/articles/php/install-php-on-windows/Setup-a-local-web-server-Install-XAMPP-0-featured.png)

Your local web server should at a minimum:

- install php (for back end coding)
- install [MySQL](/tags/mysql) databases
- include phpMyAdmin (to help manage your MySQL databases)
- include the SendMail application to send local emails

For every single one of my local web server that I have setup over the past 10
years, I always use the XAMPP suite. By default, XAMPP comes with more than
enough for even the most skilled web developers to create their own websites.

## How to Setup a Local Web Server

1. Download the XAMPP server software from ApacheFriends.org
2. Install XAMPP (to the default location)
3. Start the Apache and MySQL applications
4. Allow Apache and MySQL though the firewall
5. Browse to your local web server

## Step 1: Download the XAMPP server

Like I said before, I always use XAMPP for my local web servers. It is a free
open source software suite created by the good people at ApacheFriends.org. So
browse over to their website [here](https://apachefriends.org) to download the
latest version of XAMPP.

![Setup a local web server - Install XAMPP - 1 download XAMPP server](/media/articles/php/install-php-on-windows/Setup-a-local-web-server-Install-XAMPP-1-download-XAMPP-server-1024x640.png)

One of the many reasons I love to use XAMPP for my localhost server, is that it
is cross platform. Meaning you can install XAMPP on Linux or install XAMPP on
Windows. And as a user of both, I am grateful for that!

<Callout>

This tutorial will go through the steps to setup a local web server and install
XAMPP on Windows. But the process is mostly the same for Linux and Mac OS.

</Callout>

## Step 2: Install XAMPP server

With your XAMPP installer downloaded, you are ready to open that sucker up and
start installing the XAMPP server software. With XAMPP, you will be able to
install all the web server applications you need to operate your server and
websites.

<Callout>

You will need administrator permission on Windows in order to install XAMPP on
Windows. If you do not already have admin permission, you will need to contact
your administrator.

</Callout>

Go ahead and launch the XAMPP server installer, and accept the UAC message for
admin permissions.

You will get a message from the XAMPP installer reminding you that you **MUST**
install XAMPP with admin permissions. If not, then you will not have a fully
functional local web server. Bummer!

### Select the XAMPP components

On the second screen of the Windows server installer, you will be given the
options for which server applications you want to install. Each one has a
different purpose:

- PHP and Perl (used for web dev programming)
- Apache (this runs the HTTP server)
- MySQL and phpMyAdmin (to create and manage your databases)
- SendMail (to send email from your local server)
- FileZilla (for FTP access to your local server)

<Callout>

At a minimum, I would install: Apache, MySQL, PHP, phpMyAdmin, and SendMail.

</Callout>

![Setup a local web server - Install XAMPP - 2. select XAMPP modules to install for XAMPP server](/media/articles/php/install-php-on-windows/Setup-a-local-web-server-Install-XAMPP-2.-select-XAMPP-modules-1024x874.png)

Honestly, I recommend installing all the server programs that XAMPP give you the
option for. They don't take up a lot of space, and you can always learn about
them later.

After you select all the server programs to install, move onto the next screen.

### Choose your server installation folder

Next, you will be given a choice of where your local web server will be
installed in Windows. By default, your XAMPP server will be installed to:

```bash
C:\xampp
```

I recommend installing your local server to the default location. There is
really no reason to change it.

![Setup a local web server - Install XAMPP - 2.2. xampp server install directory](/media/articles/php/install-php-on-windows/Setup-a-local-web-server-Install-XAMPP-2.2.-xampp-server-install-directory-1024x872.png)

### Complete the XAMPP server installation

Next, you must choose your desired written language for your web server.

Now with all your server programs selected and your installation directory
chosen, you can click through the rest of the XAMPP installer to complete the
installation.

## Step 3: Start the Apache and MySQL applications

Once the XAMPP installation has completed, you are ready to open up the XAMPP
control panel. The control panel will be your go to spot to start and stop the
web server "services" (aka programs).

You can open the XAMPP control panel any time from the Windows start menu. Or if
you already had the program open and minimized it, then check your "more"
section of your taskbar.

![Setup a local web server - Install XAMPP - 3 xampp control panel to open Apache and MySQL](/media/articles/php/install-php-on-windows/Setup-a-local-web-server-Install-XAMPP-3-xampp-control-panel-1024x665.png)

From inside the control panel, you will see options for to start each of your
local server's applications, or "services". Each service is basically just an
application that will run in the background of Windows.

Each time you want to start your local XAMPP server, you simply need to click
the *Start *button for the Apache and MySQL services.

## Step 4: Allow Apache and MySQL though the firewall

The **first** time you start each of the XAMPP services, you will get a Windows
firewall popup. This is totally normal so do not be alarmed. This is simply the
web server programs requesting access to the internet.

![Setup a local web server - Install XAMPP - 4 - xampp installer Windows firewall security popup to allow Apache and MySQL though the firewall](/media/articles/php/install-php-on-windows/Setup-a-local-web-server-Install-XAMPP-4-xampp-installer-Windows-firewall-security-popup-1024x751.png)

Each of the firewall popups must be correctly acknowledged. Be sure to check the
"Private networks" options at a minimum. This will allow the other computers on
your private local network to access your XAMPP web server.

Additionally, you can also select the "Public networks" option if you want other
people on public networks like airports and coffee shops to have access to your
XAMPP server. I do **NOT** recommend this option. But live your best life.

## Step 5: Browse to your local web server

After Apache and MySQL have been granted access though your firewall, you are
just about ready to browse to your local web server.

From the XAMPP control panel, you should see a green status for both Apache and
MySQL. If you do not, then you can simply Stop then Start each of the web server
services. Sometimes, the first time you start each server the do not get a green
status because of the Windows firewall. This is completely normal.

![Setup a local web server - Install XAMPP - 5. xampp control panel with Apache and MySQL running](/media/articles/php/install-php-on-windows/Setup-a-local-web-server-Install-XAMPP-5.-xampp-control-panel-runnin-1024x670.png)

Once you have green status for both Apache and MySQL, you can open your web
browser and navigate to your web server address:

```
http://localhost
```

Alternatively, you can press the Admin button next to Apache in the XAMPP
control panel.

Now your local web server is all setup and ready to go!

## What to do with your local web server?

![Setup a local web server - Install XAMPP - 5.1 open your localhost web server for the first time](/media/articles/php/install-php-on-windows/Setup-a-local-web-server-Install-XAMPP-5.1-open-your-localhost-web-server-for-the-first-time-1024x629.png)

With your local XAMPP server all setup and ready to go, you are fully ready to
embark on your web dev dreams. Start coding out all those sweet websites you
have been dreaming of!

<Callout type="warn" title="Update your root password">

I STRONGLY recommend adding some extra security to your local server by
[changing your MySQL root password](/articles/change-mysql-password-from-command-line).

</Callout>

If you are looking for a good starting place, here is a list of my other
tutorials to help get your started. Some are full projects while others are
quick one off scripts.

- Figure out
  [php string functions](https://heytuts.com/web-dev/php/php-basics-strings)
- Get a starting point for
  [working with MySQL databases](https://heytuts.com/web-dev/php/learn-php-basics-database-operations-with-mysqli)
- Learn about the
  [basics of phpMyAdmin](https://heytuts.com/web-dev/introduction-to-phpmyadmin-what-is-phpmyadmin)
- Make a
  [simple registration form](https://heytuts.com/web-dev/make-a-simple-registration-form-in-php)
  as part of a PHP member website
