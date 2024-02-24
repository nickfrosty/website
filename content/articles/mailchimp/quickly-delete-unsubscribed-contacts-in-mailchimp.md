---
date: 2021-07-08 00:00 EST
title: "Quickly delete unsubscribed contacts in MailChimp"
# blurb:
description:
  "Trim the fat off your MailChimp email list by removing the unsubscribed or
  bounced contacts."
# keywords:
image: /media/articles/mailchimp/delete-unsubscribed-contacts-in-mailchimp2.jpg
tags: mailchimp, newsletters
imageFocus: center
# nextPage:
---

Turns out, it is not so straightforward to actually delete a large amount of
specific contacts from MailChimp. It took a bit of digging to find an effective
and time efficient way to delete them all in one fail swoop.

![Quickly delete unsubscribed contacts in MailChimp](/media/articles/mailchimp/delete-unsubscribed-contacts-in-mailchimp2.jpg)

Recently I have been debating if I should delete unsubscribed contacts in
MailChimp. I have finally decided to pull the trigger on it and just do it.

Using the free plan of MailChimp, you get to have 2,000 contacts and 1,000
subscribers. If have been fortunate enough to be building a good size mailing
list using MailChimp you might reach the upper limits of your mailing list like
me. And being the cheap-skate that I am, I have no interest in paying for a
MailChimp account yet. The cost is just not worth it to me. I am not generating
money form the list to make it worth paying to have the list. Looks like I need
to purge the unsubscribed contacts from my MailChimp list.

## TLDR

So with all that said, this is
[how to delete the unsubscribed contacts in MailChimp]() I recommend doing this
in 2 major steps:

1. Remove all the contacts that had a "bounced email address". This will cut out
   the emails that are fake and not worth keeping. (create a backup of the
   "unsubscribe" people if you wish)
2. Then, remove them unsubscribed people.

## Step 1. Remove "bounced" email addresses

Create a new `segment` with the `Email Marketing Status` of `cleaned`

![create a new segment for bounced emails](/media/articles/mailchimp/mailchimp-new-segment-for-bounced-emails-1024x726.jpg)

The `cleaned` option will create a segment that is only the email addresses that
had a "bounce back". Think of it as the dead/fake emails that people used to
joined your list. Either on purpose, or they had a typo in their email and it
was on accident.

Personally, I have no interest in trying to keep these bounced email addresses,
so I just remove them all without bias.

### Delete the bounced email contacts

Preview the segment to see the number of emails that will be removed from your
list and figure out if it is worth it to you to keep them. If you save the
segment you can do this process again in the future, should it be needed and
desired.

**Scroll to the bottom of the page** to select the most amount of contacts able
to be displayed at once.

Select all contacts in the segment, then the **Permanently Delete** button. In
the delete popup, you will need to type in the correct words in order to confirm
your decision to delete these contacts from MailChimp. Once successful, all the
selected contacts will be added to a queue for deletion on MailChimp's schedule.

![are you ready to delete them?](/media/articles/mailchimp/mailchimp-confirm-deleting-contacts-popup-1024x601.jpg)

## (2) Create a segment for "unsubscribed" emails

After you remove all the bounded email contacts (or not, live your best life),
create a new segment with the "**Email Marketing Status**" of **unsubscribed**
and **non-subscribed**. This will filter out the rest of your audience that has
opted out of your list (and also not opted-in).

![segment the unsubscribed contacts](/media/articles/mailchimp/mailchimp-segment-for-unsubscribed-contacts-1024x716.jpg)

Then just like before: select the max number of contacts you can and delete the
contacts again just like before. Typing in the delete confirmation words as
needed.

## My thoughts on deleting unsubscribed contacts from MailChimp?

Pruning is good. Doing this every so-often will help to refine your mailing
list. "Trimming the fat" so to speak. Removing all the extra contacts that you
are not mailing to, and likely will not mail to again seems both productive and
efficient.

Not to mention it will prolong the length of time you don't have to pay one of
the paid plans on MailChimp. In turn, saving money.

And I like money.
