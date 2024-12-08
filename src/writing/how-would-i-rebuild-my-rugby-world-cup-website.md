---
title: How I would build my 2019 Rugby World Cup fixtures site differently next time.
published: 2019/10/31
permalink:  /writing/how-would-i-rebuild-my-rugby-world-cup-website/
summary: >-
  Mid-September, over a typhoon holiday long weekend in Taipei, I put together a
  very simple website for the 2019 Rugby World Cup. With the 2019 Rugby World
  Cup now almost at an end, I've been thinking about how I might build a similar
  website differently next time.
---

Mid-September, over a typhoon holiday long weekend in Taipei, I put together a [very simple website](https://rwc2019.fershad.com) for the 2019 Rugby World Cup. My goal was to show all the fixtures of a tournament for a range of time zones. I also wanted to challenge my design skills and further refine my JAMStack development skillset. I didn't want it to be overly complicated. And I wanted to build it without using any libraries or frameworks as much as possible.

With the 2019 Rugby World Cup now almost at an end, I've been thinking about how I might build a similar website differently next time. In this post, I'll be focusing on two areas in particular - data storage and usability.

## Updating the site with match scores & fixtures became a little bit of a burden

To keep the site as simple as possible, I created a JSON file to store data about the matches. From the outset, I had planned on updating match scores as games completed, and so score data was also stored within this JSON file. It allowed me to quickly spin up the site with data structured just how I wanted it, and no reliance on an external service.

However, it also meant that to update match details I would need to update the JSON file manually. That update would then needed to be committed using Git for the site to rebuild.

This wouldn't have been an issue had I remained at home during the tournament. But I was regularly making trips to Japan to watch games live, and found myself often in a position where I was unable to complete the update process. This meant that the data on the website was sometimes a day or two behind.

### How would I handle data storage next time?

If I had to build this site again, I would look to use an online data store such as [Airtable](https://airtable.com/invite/r/1p0yKl4x) to store match and score data. This way, I would be able to update scores through the Airtable app quickly. Using webhooks, IFTTT or Zapier, I'd then be able to automate the build process for the site. This would allow me to keep the website static. Since my phone's always with me, it would speed up the update process significantly (even if Zapier or IFTTT take 15 minutes to pick up changes to Airtable bases).

## I might make the time zone conversion more dynamic

One of the core parts of the website was the ability for users to change time zones when viewing the match schedule. To build fast, I borrowed heavily from [Phil Hawksworth's HTML time](https://github.com/philhawksworth/html-time) project. However, next time, I might just use a Javascript library like [moment.js](https://momentjs.com/) to allow for dynamic time zone conversion. I feel this would lead to a smoother user experience since it would remove the need to leave the schedule page to change time zones.

## I've definitely got to learn more about service workers

As a bit of an afterthought when building the website, I decided to try and make it a progressive web app (PWA). This allows the site to be downloaded by a user and run on their device as though it were a native app. However, to be fair, I did this with very little knowledge of setting up service workers.

Since I was using Eleventy as the static site generator to build the site, I found [this plugin](https://www.npmjs.com/package/eleventy-plugin-pwa) that provides PWA capability for Eleventy sites. I [followed the creator's guide](https://okitavera.me/article/turn-your-eleventy-into-offline-first-pwa/) to set it up, and pretty much left it from there. It worked, in that, I was able to download the site to my phone and run it as an app. However, because of the basic implementation, I had used, my app (and website for that matter) was presenting me with cached data and would only update if I manually refreshed the page.

I'd definitely like to build more PWAs in the future, and so learning more about services workers is definitely on my to-do list for this year!

## Perhaps next time I'd add some live score functionality

This would depend on being able to find and access data to pull in live scores. I flirted with the idea of trying to hack the official Rugby World Cup website to either scrape data from their match pages or find JSON data I could use. In the end, it was too much effort, and I also didn't want myself getting into a mess over copyright/data infringements.

A friend of mine also suggested perhaps linking to an official Twitter hashtag for each game, or to an external match centre so that people could follow games live there. Both are ideas I'll explore in the future if I decide to build a similar site.

Build this site for the 2019 Rugby World Cup as a personal project sure did result in more learnings that I was anticipating. It's given me things to learn more about and also showed me that I am capable of spinning up a full site with minimal turnaround without relying on any frameworks. I'm hoping to spin up a website for next year's southern hemisphere rugby season, but that's still some time away. In the meantime, I've got a few more things to study up on.
