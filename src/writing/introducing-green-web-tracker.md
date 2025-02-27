---
title: Introducing the Green Web Tracker
published: 2025-02-27
summary: This post introduces the Green Web Tracker, an open source website to track the green hosting of domains.
canonical: "https://www.thegreenwebfoundation.org/news/introducing-the-green-web-tracker/"
---

{% callout "Original" %}
This post was originally published on The Green Web Foundation's blog. You can [read the original post here](https://www.thegreenwebfoundation.org/news/introducing-the-green-web-tracker/).
{% endcallout %}

*At the Green Web Foundation, we build open source tools and platforms which allow people to check individual domains and see which ones are hosted on green providers. This posts introduces a new project we've created called Green Web Tracker, which builds on that and aims to answer the question "how much of the internet runs on green hosting?".*

A question that we find ourselves asked regularly goes something like this – *how much of the web runs on green hosting?* It's a fair question to ask, considering we're an organisation that maintains the largest dataset of green hosting providers. The only thing we've got to refer to when answering this question is to point back to the work done in [2022](https://almanac.httparchive.org/en/2022/sustainability#how-many-of-the-sites-listed-in-the-http-archive-run-on-green-hosting) and [2024](https://almanac.httparchive.org/en/2024/sustainability#how-many-of-the-sites-listed-in-the-http-archive-run-on-green-hosting) by the Web Almanac. But this data is based on a point in time, and relies on the huge effort of the Web Almanac to come to light. Given the data we've got in our dataset, and the [APIs we expose](https://developers.thegreenwebfoundation.org/api/greencheck/v3/check-single-domain/) to allow folks to check domains for green hosting, we feel that this really is a question we should be able to answer for ourselves.

And so, with that question in mind, we've created the [Green Web Tracker](https://tracker.greenweb.org/) – an open source website that tracks green hosting of domains across a number of user submitted indexes. In this post, we'll touch on where the idea for this project came from, how it works, and what we hope for it in the future.

## A Green Web Side Quest

The idea for the Green Web Tracker came in mid-December, at the when we were already busy with multiple large development projects – namely [Carbon.txt](https://www.thegreenwebfoundation.org/tools/carbon-txt/) and [Grid-aware Websites](https://www.thegreenwebfoundation.org/tools/grid-aware-websites/). Most of the team had already gone on their Christmas breaks, and I found myself in Taiwan enjoying the serenity that comes with remote work when everyone else is on holiday.

And then it came. Laurent Devernay Satyagraha, one of the co-leads on the [2024 Web Almanac Sustainability chapter](https://almanac.httparchive.org/en/2024/sustainability), asked in a Slack chat:

> Fershad Irani, is the percentage of websites benefiting from green hosting continuously monitored somewhere? Does it look possible?

First answer, *no*. Does it look possible, *oh brother*. With that one message, Laurent had managed to nerd snipe me into solving that problem. And so, Christmas remote work serenity obliterated, I ventured off away from the main mission to complete a Green Web Side Quest.

## What is the Green Web Tracker?

The Green Web Tracker aims to be an open, regularly refreshed reference point for anyone wanting to answer the question *how much of the web runs on green hosting?* The tracker checks domains that are submitted in various indexes – effectively categorisations of similar domains. Checks are run every two weeks against the Green Web Dataset, with [data uploaded to GitHub](https://github.com/thegreenwebfoundation/green-web-tracker/tree/main/src/_data/checks) and then updated on the website.

![Screenshot of the Green Web Tracker website, which monitors progress towards fossil-free web hosting. The header shows the site is in beta, with a purple status box indicating it's checking 5601 unique domains across 7 indexes, with 2085 domains (37%) using green hosting as of February 22, 2025. Below are seven blue category boxes showcasing different domain indexes: .eco Domains (1282/3187 green hosted, 40%), Moz Top 500 (182/500 green hosted, 36%), Third-party Ad Domains (361/1064 green hosted, 33%), Third-party Analytics Domains (198/581 green hosted, 34%), Third-party Social Media Domains (27/100 green hosted, 27%), Third-party Video Domains (3/15 green hosted, 20%), and UN Country Domains (3/193 green hosted, 1%). A purple 'Submit your own index' box invites user participation.](https://www.thegreenwebfoundation.org/wp-content/uploads/gwt_homepage-1024x626.png "A screenshot of the Green Web Tracker homepage showing a set of public indexes. Each index can be clicked on to show a page of all the domains they contain, and their green hosting status over time. The homepage also includes a total count of how many unique domains are being checked, and what portion of those are hosted on green providers.")

Besides public indexes that are tracked in the way I just described, the site also has a section where anyone can create their own private index of up-to 10 domains. These domains can then be checked or changed any time a user visits the Green Web Tracker website, although at the moment the rechecks need to be manually run. All data for private indexes are stored locally on a user's machine, and cannot be shared.

The project is built with using the Eleventy static site generator, and checks are run using a GitHub Action. All the [code is open source](https://github.com/thegreenwebfoundation/green-web-tracker/tree/main), and we would encourage others to fork the repository and build trackers of their own!

## Hopes and dreams

We would also like to see more community contributed indexes added to the Green Web Tracker. Contributions can be made via a Pull Request on GitHub, or by email. We've outlined the process on the [*Submit an Index*](https://tracker.greenweb.org/submit/) page. For those who can, we would love to see others publishing their own trackers and track sites and indexes that are meaningful to them.

Currently the Green Web Tracker is in beta. We're trying out the idea of tracking green domains in this fashion, and are keen to see what insights it might throw up. If you are using the Green Web Tracker, are finding it useful, or have other ideas for it – then we'd love to hear from you. You can [contact us by email](https://www.thegreenwebfoundation.org/support-form/?wpf2192_9=Another%20subject), or raise an [issue on GitHub](https://github.com/thegreenwebfoundation/green-web-tracker/issues).

And of course, if you really do find this work useful then please do consider [making a donation to the Green Web Foundation](https://www.thegreenwebfoundation.org/donate/). It allows us to keep getting nerd sniped into creating projects like this one 😉.
