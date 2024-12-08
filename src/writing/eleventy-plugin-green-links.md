---
title: "Eleventy Plugin: Green Links"
published: 2023/03/18
---

If you want the TL;DR version of this post, check out the readme for this project [on Github](https://github.com/fershad/eleventy-plugin-green-links).

Over a long weekend at the end of February I chipped away at a small Eleventy plugin. Eleventy is the static site generator that I use to build my website. It has a rich [plugin ecosystem](https://www.11ty.dev/docs/plugins/), covering everything from automating sitemap creation to unfurling links.

Building an Eleventy plugin is something I've wanted to do for a very long time, but I've never had a good enough idea to build out. That changed at the end of February 2023. I was poking around the site playing with ideas of a future redesign and had a thought - _what if I could highlight the pages I link to that are hosted on known green web hosts?_

## Sketching out the idea

Eleventy runs through all the pages of my site and builds them before they are chucked up on to Cloudflare. So, it should be possible to hook into the build process to achieve what I want to do. Here's a very rough idea of how it would work:

1. Go through each page of my site at build time, and get all the valid `href` attributes in anchor (`<a>`) tags.
2. Create an array of unique domains from those links.
3. Using The Green Web Foundation's Greencheck API, see if each domain is hosted green.
4. Add a custom attribute to any anchor tags where the domain is returned as being a green web host.

## Turning the idea into code

Transforms in Eleventy really help here. Transforms are a way to modify the output of a page template in Eleventy. With Transforms, I would be able to go through each page and run custom code against the HTML. So that was my starting point. I looked around for other Eleventy plugins that did something similar for a bit of inspiration on how to get this done.

I landed on [`eleventy-plugin-external-links`](https://github.com/sardinedev/eleventy-plugins/tree/main/packages/external-links) by sadinedev. The code repository gave me a perfect boilerplate for how my plugin would be shaped.

### Early on

`eleventy-plugin-external-links` allows users to pass different configuration options into the plugin. I ditched this to begin with, since I wanted to get something working first. Tinkering with the code I'd copied over from that plugin, I was able to successfully find all the links from a page, and then console log out an array of unique domains.

Next up, I needed to go through these domains and see which ones were green. For that, I reached for The Green Web Foundation's Greencheck API. The API checks a domain against the Green Web dataset, which is a curated database of verified green hosting providers.

I tested it out with one page, looping sequentially through the known hosts on that page and getting back results for each. Pretty good so far.

### Multiple domains

Trying the same code out on my entire site, I quickly hit a snag. Querying domains sequentially, like I was, saw me quickly hitting rate limits on the API. A few pages would work, then bang I'd start getting errors back instead.

To get around this, I installed [CO2.js](https://github.com/thegreenwebfoundation/co2.js). I've got the privilege of being a maintainer of that library, and so am familiar with the different functionality it exposes. One, is the ability to perform a lookup of the Green Web dataset using an array of domains.

Using the `check()` function in CO2.js, I was able to pass in an array of domains and get back an array of domains that were hosted on verified green providers. From there, I could go through the collection of links from the page and find the ones who's hostname matched one of those returned by the Greencheck API.

### What to do with green links?

I was now able to find all the links on a page which were served from known green hosts. The next thing to do was to figure out how to separate them from the rest of the links on the page. I settled on adding a custom data attribute (`data-green-link="true"`) to any anchor tag that linked to a site that was hosted green. With this in place, anyone using the plugin could then target those tags using CSS or JS to make those links stand out.

On my own site, I've added an SVG to all external links that have the `data-green-link="true"` attribute. Regular external links look [like this](https://github.com), while those which are green hosted [look a little different](https://thegreenwebfoundation.org).

## Hitting publish

With all that in place, I felt there was enough to put the plugin out into the wild. I've got a bit of experience publishing to NPM through my work on CO2.js, but I'd never put out a package of my own. I don't know why, but in my mind I had an idea that it would be some kind of complicated process of hoops I'd need to jump through. In reality, `npm publish` and a few more keystrokes was all that was needed.

For future patch releases, I've been using `np` to manage the whole process.

## Adding configuration

After dogfooding the plugin on my own site for a bit, I realised that I probably didn't need to be checking internal links. This is because I know that my site is hosted on Cloudflare, a verified green provider. With this in mind I went back to `eleventy-plugin-external-links` to look at allowing some configuration options to be passed into the plugin.

Eleventy transforms are just functions that take in a page's content and output path. Wrapping the transform function in a parent function allows for any number of additional variables to be passed in. For Green Links, I chose to allow a config object that contained a key of `ignore`. `ignore` could contain an array of domains that would not be checked when the transform runs.

The upside of having a configuration object is that it allows for [more options to be added](https://fershad.com/writing/eleventy-plugin-green-links/#future-plans) to the plugin later on.

## Cool story, but why does this matter?

Choosing a green web host for a website is one of the most impactful decisions any website owner can make. Based on peer-reviewed research, the Sustainable Web Design model says hosting accounts for [15% of a website’s total energy usage](https://sustainablewebdesign.org/calculating-digital-emissions/). Beyond making your own site more sustainable, it also sends a message to other hosting providers that their potential customers value services that are powered by renewable energy.

## Future plans

There's no real roadmap for Green Links. I'm open to ideas from the community, and code contributions too. That said, I do have a few ideas which I might get around to working on when time permits.

- TypeScript - I've never written a project in TypeScript, so this could be a nice small playground to learn.
- Caching results - This can help speed up build times slightly, but more importantly means the Green Web Foundation's API won't get slammed each time a site is updated.
- Getting more info - Knowing a host is green is a great start, but there might be ways to surface even more information about a known provider (like what evidence backs up their claims of being a green host).

## Use Eleventy Plugin: Green Links

You can install Green Links into an Eleventy project by running `npm install eleventy-plugin-green-links --save-dev`. You can find more [installation and configuration instructions](https://github.com/fershad/eleventy-plugin-green-links) on Github.
