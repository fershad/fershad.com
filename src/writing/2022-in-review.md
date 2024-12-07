---
title: 2022 in review
published: 2022/12/23
---

All in all, 2022 has been a pretty cool year for me. The back half of the year was especially fun, with the opportunity to work on some really cool projects! Here’s a collection of a few notable things that went down over the course of the year.

## Are my third parties green?

At the start of the year, I released [**_Are my third parties green?_**](https://aremythirdpartiesgreen.com/). I built it after reading the [third-parties chapter of the 2021 Web Almanac](https://almanac.httparchive.org/en/2021/third-parties#prevalence) which found that for over 45% of website requests were third-party requests. Reading that, got me wondering how many of those requests were being served from green web hosting.

I built the tool over the course of January and February. In the process I got to play around with Google Cloud Functions, Cloudflare Workers and KV, as well as the pre-1.0 version of SvelteKit. You can read all about that process in [this blog post](https://fershad.com/writing/building-are-my-third-parties-green/). I originally launched **Are my third parties green?** as a website to scan sites. In the months after launch, I [added a directory & API](https://fershad.com/writing/adding-a-directory-and-api-to-are-my-third-parties-green/) to the tool.

### What’s next for this project?

Since launching, there’s been over 1900 tests have been run through the tool, which is waaaaaaay more than I ever anticipated! All these results are stored in Cloudflare Worker’s KV, which was a decision I made to help facilitate caching & sharing. In early 2023 I want to sift through these results and write up my own Web Almanac-ish state of green third-parties review.

I’ve also got it on my to-do list to update the site to SvelteKit 1.0, and do an update of data in the API and directory. I’d also really like to contribute back to [Third Party Web](https://github.com/patrickhulce/third-party-web), the Github repo that powers part of this project.

## Flowty

Around the same time as Are my third parties green? was launched, I got involved in a conversation in the [ClimateAction.tech](http://ClimateAction.tech) community which focused on making sites built in Webflow greener. That led to a conversation with designer [Katy Jackson](https://www.suninthecorner.com/), which in turn led to me exploring how to go about converting a Webflow site to static content that could be easily uploaded to green web hosting.

[That exploration gave birth to Flowty](https://www.suninthecorner.com/). With Flowty, designers could build and maintain sites in Webflow. The Flowty script would take care of converting & optimising the site before uploading it to a connected hosted service. This would allow climate-conscious designers to still use tools they are comfortable with to create low carbon sites, and host them on green web hosting platforms.

However, just before launching Flowty I had someone raise that the tool might be in breach of Webflow’s Terms of Service. I asked around, and couldn’t get a straight answer through Webflow’s support channels. I finally got an answer when Webflow issued cease and desists notices to a couple of other services that operated in similar ways to Flowty.

### Sunsetted

Webflow’s actions led to me deciding to open source [Flowty’s source code](https://github.com/fershad/flowty) and sunsetting the project. By making the code available, I hope that those who do care about web sustainability, but want/need to use Webflow can still have a means to build & host their site sustainably. Despite being discontinued, the project recently made an appearance [in this article](https://thenewstack.io/is-low-code-development-better-for-the-environment/) on the sustainability of low-/no-code platforms.

## A few first - Conference talks. Podcasts. Web Almanac

In the middle of the year, I gave my first ever conference talk as part of [LazyLoad 2022](https://webdirections.org/lazyload/). I talked through an extended version of the [Web Performance and the Planet presentation](https://youtu.be/LD8HiUGdsX0) I gave earlier in the year to the Toronto Web Perf. Meetup.

Both speaking events were virtual, and bloody heck it’s hard just talking into a camera! I’ve got to give a massive shoutout to WebPageTest’s own [Henri Helvetica](https://twitter.com/HenriHelvetica) for encouraging me to take those first steps into the speaking scene.

2022 also saw me guest on a podcast for the first time. I was the interviewee on [Green I/O’s first ever episode](https://anchor.fm/greenio/episodes/Fershad-Irani---Using-website-performance-to-green-the-web-e1f6179)! A big thanks to [Gaël Duez](https://www.linkedin.com/in/gaelduez) for reaching out to me, and entrusting me with the honour of being his first guest.

Through the year, I also did some work as an analyst on the [2022 Web Almanac’s Sustainability chapter](https://almanac.httparchive.org/en/2022/sustainability). This is the first time there’s been a dedicated chapter on web sustainability in the Web Almanac. It’s a huge step for the community, and hopefully we can have enough contributors to have chapters in future editions of the Almanac.

## Working with The Green Web Foundation

Definitely the highlight of the year was having the chance to work with The Green Web Foundation. I saw they had a technical writing position open, but wasn’t too sure if I’d be the a fit for the role as I had no formal technical writing background. I applied anyway, and after a chat with [Chris Adams](https://www.linkedin.com/in/mrchrisadams) I was stoked to find out that they were keen for me to get on board to help build out developer documentation for some of their core tools.

In the past six months we’ve created a [developers docs site](http://developers.thegreenwebfoundation.org/) for some of the foundation’s repositories and APIs. But we didn’t just stop with that. Working with Chris, I started contributing code updates to the [CO2.js library](https://github.com/thegreenwebfoundation/co2.js). We’ve done some cool things with that, including extending the library so that it can run in [Node on the server](https://developers.thegreenwebfoundation.org/co2js/tutorials/getting-started-node/), [in the browser](https://developers.thegreenwebfoundation.org/co2js/tutorials/getting-started-browser/), as well as in other environments like [Cloudflare Workers](https://github.com/fershad/co2js-cloudflare-worker-api), [Deno, and Bun](https://github.com/thegreenwebfoundation/co2.js/issues/115).

I’ve really enjoyed working with The Green Web Foundation team, and it seems like they’ve enjoyed having me around too. I’m super excited to continue working with them in 2023 on a more regular, part-time basis. I’m really looking forward to building more cool stuff, thinking through some interesting problems related to digital sustainability, and sharing those with all of you too.

![Screengrab of The Green Web Foundation team in October, 2022.](../../public/img/blog/afa60cc975b3e09181d9b970dd6049cd061454a4-862x1103.jpeg)
