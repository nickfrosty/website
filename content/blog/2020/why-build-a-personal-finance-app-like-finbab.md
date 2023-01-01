---
date: 2020-10-04 00:00 EST
title: "Why I started finbab. Building a personal finance app"
description: "The past few years I have found so much enjoyment in the world of finance. So I decided to make my own personal finance app, named finbab."
category: devlog
tags: personal, finbab, finance
---

Most web developers spend their free time writing code. We love working on projects. So why not make a personal finance app?

<div class="msg note">
<h4>Update:</h4>
Turns out, building a finance app is hard and time consuming. So I changed my mind and decided not to build this. At least for now 😅 (updated some time in early 2021)
</div>

![building a personal finance app](/media/blog/finbab/finbab-why-i-decided-to-create-the-personal-finance-app-finbabcom.jpg)

Always having had a passion for web dev and coding, over the past few years I have found so much enjoyment in the world of finance. So I decided to bootstrap my own personal finance app, named [finbab](https://finbab.com). So here is the story of why I decided to create a personal finance app.

---

Starting like most due, I made some very simple spreadsheets. Updating them pretty regularly, my wife and I found there was so much more that we wanted out of my _janky_ spreadsheets. Namely a better interface and more sophisticated tracking.

After we bought our first house and we on the cusp of our baby being born, we dove in deep down the rabbit hole of our budget. Turns out kids are expensive. Weird. We even got so deep into the spreadsheeting to make one that we could track all of our grocery purchases with. Complete with itemized receipts to help figure out where we could get the best price on our groceries.

On top of all of our families personal finance trackers, I was also running several other trackers for my side hustles and freelance stuff. You know, the common things that developers do: building websites, rideshare driving, and buying vending machines...the normal stuff.

Needless to say, and like you may imagine, the spreadsheet(s) got... **unwieldy**. So I figured, why not make a web app or sorts to allow me to track all my finance stuff way. **Enter [finbab](https://finbab.com/).**

### Four functionalities for finbab

Naturally, I wanted to cut down the amount of time and effort I would need to maintain all of these spreadsheets. So I made a list of the various features I would need/want to start using this thing:

1. **Add accounts from multiple banks.** I use like 5 different banks for my various finances. Some personal, some business. Some of the accounts are shared with my wife while some are just for business use. So I must be able to add many accounts and control which ones each person can see.
2. **Record transactions.** Be able to easily record bank transactions. Also tagging and categorizing is a must. Since my wife and I will use it together, we must be able to tag each other and save notes to different transactions.
3. **Bill tracker.** Record all our recurring bills and expenses. It must be decently flexible since not all bills are monthly, they range from bi-weekly to annual. I also really wanted to be able to see the month-to-month changes of the bills. To compare them and spot any red flags.
4. **Multiple groups.** Since I want to use this for my small business and personal use, I want the accounts separate for the two. You know, taxes and stuff. I could take the easy way out and just have multiple logins, but I also hate that. So I must have the ability to switch between different "profiles" or "groups" (aka businesses) without logging out.

So with these four basic features, I should be able to start using the app myself. My minimum features to start _"dog fooding" _ it to myself.

### Other "nice to have" things for my personal finance app

Once those basic features are done, the next thing is to get some other people to start using finbab for their stuff. But while getting some alpha/beta users in, I will for sure want to keep working on more features (and bug fixes). Here are my thoughts on other "nice to have" stuff:

- **Gas/mileage tracker.** Taxes will get you if you don't write off your mileage driven for business reasons. This will super help for my vending side business. Lots of miles driving.
- **Automated rules.** Be able to save your own custom/personal rules to process your banking data. Making it match a sort of "if this, then that" process.
- **Plaid Connection.** Ohh yeah, I am going to figure out how to connect to Plaid and get banking/transaction data auto download to help further automate the budgeting process.
- **Speaking of budgeting.** Create and set budgets. Set them for whatever time frame your want (a month, week, year, whatever). But also be able to

PS: Yes, I recognize the irony of spending way more time and effort to build a app instead of updating and maintaining all those spreadsheets. But hey, this is a developer's approach to solving problems. Write code :)
