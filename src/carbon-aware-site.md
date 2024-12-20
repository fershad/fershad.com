---
title: Carbon aware site
layout: layouts/post.liquid
css: post.css
isPage: true
---

## This site is now grid-aware

{% callout "This site is now grid-aware" %}
Through a new project we're working on at Green Web Foundation, called Grid-aware Websites I've changed the functionality of this site to be grid-aware and respond to the fuel mix of a visitors national energy grid. [Learn more about that here](https://fershad.com/grid-aware-site).
{% endcallout %}

## This website is carbon aware

The concept of a carbon-aware website is one where the content/user experience of a site changes depending on how the grid intensity of the electricity grid. Implementing carbon awareness on this website was inspired by the work of [Branch Magazine](https://branch.climateaction.tech/issues/issue-1/designing-branch-sustainable-interaction-design-principles/).

## Jargon buster

There was a bit of jargon in that first sentence, and there might be more further down the page. So here's a summary of some key terms:

- **Carbon aware:** A carbon-aware product/tool/service reacts to how clean/dirty the electricity grid is. When the grid is powered by more renewable energy, it will do more complicated/energy intensive tasks. When the grid is powered by more fossil-fuels, it defers energy hungry tasks or modifies the experience to reduce their impact.
- **Grid intensity:** A way of measuring how clean electricity generation is. More precisely how much CO2 is emitted by producing a unit of electricity.
- **Cloudflare Workers:** A code execution platform that is globally deployed and runs on CDN edge nodes.

## What makes this site carbon aware?

Most of the magic that makes this website carbon aware is thanks to [Cloudflare Workers](https://developers.cloudflare.com/workers), [CO2signal](https://www.co2signal.com/), and [CO2.js](https://github.com/thegreenwebfoundation/co2.js).

When someone visits this website, the following process is kicked off:

1. A Cloudflare Worker checks the request object for the country a visitor is located in.
2. If a location is found, then a fetch request is made to the CO2signal API.
3. CO2signal sends back data about the *current* grid intensity at the visitor's location.
4. The current grid intensity is checked against the annual average grid intensity for that country (data from CO2.js).
5. If the grid intensity is equal to or greater than the annual average, then the HTML response is modified using the [Cloudflare Workers HTMLRewriter](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/).
    - If the grid intensity is less than the annual average, the regular (unmodified) site is returned to the user.

If at any point along in that process there is no data available or something goes wrong then the original web page will be shown.

### What gets modified on the site?

When the grid intensity at the visitor's location is equal to or greater than 221 g/kWh, the following modifications are made:

- Image quality is greatly reduced.
    - Visitors can click to download better quality versions of any image if they need to.
- Remove AVIF images, since [decoding them can be more CPU intensive](https://www.smashingmagazine.com/2021/09/modern-image-formats-avif-webp/#:~:text=Decoding%20AVIF%20images%20for%20display%20can%20also%20take%20up%20more%20CPU%20power%20than%20other%20codecs%2C%20though%20smaller%20file%20sizes%20may%20compensate%20for%20this).
- Non-critical JavaScript is removed from the site. This includes:
    - Progress bars when reading blog posts.
    - Share links (using the Navigator.share API).
    - Instant.page script.
    - JavaScript that creates CodePen embeds. The embeds are replaced with a link to the pen.

I still keep website analytics on my site, since I like to get a sense for what people are reading and might one day use that data for some kind of carbon accounting.

### Further background, context, and thoughts

If you want more details on this whole project, I've blogged about the idea behind building a carbon-aware website. I go through some examples of carbon-aware digital products, how I got the idea for adding carbon awareness to my site, how I went about doing it and what considerations I made, as well as a bit of future casting on how this could become more mainstream. [Read the blog post](https://fershad.com/writing/making-this-website-carbon-aware/).

## FAQ

### Why compare against annual average grid intensity?

By comparing the current grid intensity for a country against its annual average grid intensity, the carbon awareness of this website is more relative to a user's location. Using a fixed value for all users globally would result in those living in countries with dirtier grids *always* getting served the low-carbon experience, even if their grid might be gradually becoming greener. It also allows carbon awareness to automatically adjust as regional grids decarbonise.

### Why use the visitor's location?

I chose to use the visitor's location to check for grid intensity since my site is a simple website serving up only static assets (HTML, CSS, JS) with no server-side generation or database calls. I did flirt with the idea of checking blocking requests from the server itself, but wasn't sure how to implement a solution for that. It is something I'll come back to.

### Why even bother?

Yep, making my site carbon aware isn't going to make a dent in the fight against climate change. But by doing this, I have:

- A working proof of concept for a really cool idea.
- Found a new API that provides free, real-time grid intensity data (CO2signal).
- Nerdsniped myself for a few days.
- Got to work on my website a bit again.

So, all in all ... why bother? Why not?

## Open source

I've created a starter repository on Github with some of the core code that powers the carbon-aware implementation on this website. It should serve as a launching pad, from which you can begin to play around with the idea of carbon awareness on your own sites or apps.

[View code on Github](https://github.com/fershad/carbon-aware-site-worker).
