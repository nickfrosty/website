---
title: 'Fix "PHP executable not found" error in VS Code'
# blurb: ""
description: 'Good news: you can easily get rid of that pesky "PHP executable not found" error message in VS Code in a few minutes. Install PHP then, add it to your PATH variable, then error-be-gone!'
image: /media/articles/vs-code/fix-php-executable-not-found/Fix-PHP-executable-not-found-error-in-Visual-Studio-Code-VS-Code.png
date: 2021-04-05 00:00 EST
tags: vs-code, php, windows
imageFocus: right
---

Nobody likes errors, least of all computer programmers!

If you are a PHP developer and recently installed Visual Studio Code (VS Code), then you are most likely getting a pesky "PHP executable not found" error message every time you start the program.

![](/media/articles/vs-code/fix-php-executable-not-found/Fix-PHP-executable-not-found-error-in-Visual-Studio-Code-VS-Code.png)

Some other VS Code error message you will see with the PHP executable not found message includes:

- Install PHP 7 and add to your PATH"
- "set php.executablePath setting"
- "Cannot validate since no PHP executable is set"
- "Use the php.validate.executablePath to configure the PHP executable"

With every single one of these VS Code error messages, you simply need to update your Windows **PATH** setting for your PHP executable location. Doing that will fix all of these PHP executable errors!

## How to fix PHP executable not found error in VS Code

- Install php on your computer (e.g. with XAMPP)
- Locate your php installation directory
- Open Advanced System Settings on Windows
- Update the Windows "PATH" environment variable
- Close VS Code and reopen it

## Step 1: Install php on your computer (e.g. with XAMPP)

The first and very most important step to fix the PHP executable not found error on Visual Studio Code is to actually have PHP installed on your computer. Now that might seem like an obvious starting point, but you would be surprised how many people don't have PHP installed on their local web dev environment (e.g. their localhost server).

![install XAMPP on windows to install php](/media/articles/vs-code/fix-php-executable-not-found/Install-XAMPP-on-localhost-to-fix-PHP-executable-not-found.png)

Personally, I have always been a fan of the XAMPP suite by [ApacheFriends.org](https://apachefriends.org/). I have been using the XAMPP suite to install PHP, MySQL, and phpMyAdmin for my localhost web servers for **years**. I highly recommend.

## Step 2: Locate your php installation directory

Once you have PHP installed on your local computer (as part of your localhost server), you need to find the PHP installation directory. As we need the folder path that holds your **php.exe** file.

![locate your php executable file](/media/articles/vs-code/fix-php-executable-not-found/fix-php-executable-not-found-VS-code-2-find-your-php-installation-directory.png)

If you installed XAMPP, simply browse to your XAMPP installation directory. The default location is at C:\xampp. From inside the XAMPP folder, open the PHP folder and locate the php.exe file. If you can find the php.exe file from in this folder, then this folder will be your php installation directory.

## Step 3: Open Advanced System Settings on Windows

Now that we know your php installation directory, we need to open the actually add the folder path into the Windows' PATH. But to get there, you have to open a few different screens.

From the your file explorer or desktop, right click on "This PC". Then select "Properties" from the drop down. Doing this will open the Windows control panel menu for your system settings.

From the system settings menu, you will see all of your computer's basic information like RAM, CPU size, and your computer name.

On the left hand side of the program, you will see an option to open "Advanced System Settings". Go ahead and open the Windows advanced system settings program.

![open the advanced system settings in Windows control panel](/media/articles/vs-code/fix-php-executable-not-found/fix-php-executable-not-found-VS-code-4-open-advanced-system-properties.png)

**Please note:** this WILL require you to have administrative permissions on your Windows computer. If you do not, then you will have to contact the person that does in order to update the Windows PATH variable.

## Step 4: Update the Windows "PATH" environment variable

Once you have successfully found and opened the Windows advanced system settings popup, you can edit your Windows environment variables. While selected to the Advanced tab in the popup, click on the "Environment variables..." button at the bottom. This will open another program.

![update your path variable to save the location of the php executable](/media/articles/vs-code/fix-php-executable-not-found/fix-php-executable-not-found-VS-code-5-add-a-new-windows-environment-variable-for-path.png)

From here you can update all of your Windows environment variables. But in order to fix the PHP executable not found error message in VS Code, we really only care about the PATH variable.

So, from the list of User variables, select the "Path" option. Then click the Edit button. This will open the variable editor window.

Inside of the variable editor window, you can create a new PATH variable quite easily. Simply click the "New" button on the right hand side. Then enter in your PHP installation directory that we got from the step above.

Be sure to click away from the new path you created to ensure the updated PHP path is correctly saved into Windows.

## Step 5: Close VS Code and reopen it

When you have successfully saved your PHP path location into the Windows PATH variable, you can close out of all of the Windows control panel windows.

You can now close VS code and reopen it. And you will notice that you have gotten rid of the "PHP executable not found" error message that you get on VS code start up. Great success!
