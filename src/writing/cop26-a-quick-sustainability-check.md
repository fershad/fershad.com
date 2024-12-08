---
title: 'COP26.org: A quick sustainability check'
published: 2021/10/28
permalink:  /writing/cop26-a-quick-sustainability-check/
summary: >-
  With COP26 about to take place in Glasgow, let's take a quick look at how the
  COP26 homepage holds up in terms digital sustainability. What's its carbon
  footprint, and can it be improved?
---

COP26 is taking place in the first two weeks of November 2021. For two weeks, global leaders (or their representatives) will discuss their climate commitments and how countries can collaborate to ensure emissions reductions. COP26 is important, especially off the back of [the latest IPCC report](https://news.un.org/en/story/2021/08/1097362) which paints a stark outlook for the planet unless huge steps are taken to cut greenhouse gas emissions within the decade.

This isn't a climate blog, though. If you're looking for one, [Heated by Emily Atkin](https://heated.world/) is a good read. Rather, in this post I thought we'd take a look at the COP26 website. Instead of the usual performance and Core Web Vitals focus though, I want to see how the site stacks up in terms of sustainability. What does it do well, and what can it do better? Let's dive in.

{% callout "A quick update" %}
**November 9, 2021**

_Spoiler:_ With the help of Tim Paul from UK Government Digital Services, the large footer image identified in this article has been replaced with an optimised version.
{% endcallout %}

## What we'll look at

When looking at the sustainability for a website, there are three key areas of focus:

- Servers (data centres and hosting)
- Networks (data transferred over the wire to load site content)
- Devices (the devices users use to view the site)

Daniel Hartley has written [a really good explainer](https://www.the-public-good.com/web-development/measuring-the-web) if you want to understand things in more detail.

We'll touch on all three for this quick website sustainability check, but the bulk of our time will be spent looking at sustainability over the network. Too keep things concise as well, I will just look at the homepage ([https://ukcop26.org/](https://ukcop26.org/)) on desktop.

## Making a start

To start with, let's collect some data about the page. We'll use [Beacon](https://digitalbeacon.co/) to get an initial estimate of its sustainability in CO2e terms, and The Green Web Foundation's API to quickly check how the site is hosted. We'll also run the homepage through WebPageTest to collect some site diagnostics. You can play along at home using the links below if you like.

- **Beacon:** [https://digitalbeacon.co/report/ukcop26-org](https://digitalbeacon.co/report/ukcop26-org)​ (tested on _28.Oct.2021_)
- **Green Web Foundation:** [https://www.thegreenwebfoundation.org/green-web-check/?url=https%3A%2F%2Fukcop26.org%2F](https://www.thegreenwebfoundation.org/green-web-check/?url=https%3A%2F%2Fukcop26.org%2F)​
- **WebPageTest**: [https://webpagetest.org/result/211028_BiDcJJ_6e1700968d79e1eb40c40f0bde65d074/​](https://webpagetest.org/result/211028_BiDcJJ_6e1700968d79e1eb40c40f0bde65d074/)

## An initial assessment

A few things stand out from the tests above. They are:

### **Initial visits are large, but caching is very good.**

The results from Beacon don't paint the rosiest of pictures. The page downloads 6.13 MB of data for users on a cold cache (i.e. someone who's never visited the page/site before). That's something we'll look to address later in this article. This equates to an estimated 5.136g of CO2e produced for each pageview (or `5.136 / 6.13 = 0.837g` per MB).

There is some good news though. Our results on WebPageTest show us what things are like for returning visitors to the site. Caching is set up very effectively, with only 717 KB downloaded on a repeat view.

The caching across the site does mean that as a user navigates the site, much less data is downloaded compared to their first pageview.

### **Website hosting could be greener**

Our test from the Green Web Foundation comes back "grey". That serves to hint that the site might not be on a host that is _known_ to use 100% green energy. There is every chance that the site is still hosted in a country that generates a higher amount of clean energy. The UK is decent in this aspect - [https://app.electricitymap.org/zone/GB](https://app.electricitymap.org/zone/GB).

The site does use Amazon Cloudfront as a CDN, which is a good start. Using a CDN means that static assets can be stored closer to end users. This reduces the distance it has to travel when requested, and in turn can reduce the amount of electricity required to transmit the data. Since COP26 is a global event, this is a very effective measure.

## A word on design

Overall, the design of the site is simple. There's a focus on three colours - white, green, and a purple-ish blue which the internet tells me is called [Cosmic Cobalt](https://www.color-name.com/hex/38318c) 🤷🏾. The use of duotone images in parts is a nice touch and can go some way to reducing the size of image files. It would be great to see the sponsors logos also show in duotone or black & white.

Some design modifications around the Twitter & Instagram feeds would go a long way towards improving the sustainability of this webpage. Currently, the scripts and content for these sections are all downloaded when the page first loads. With some redesigning of each section, these could be requested on user interaction instead. In that way, only those website visitors interested in the social content would download the additional data. This has the potential to reduce page size by about 1.4 MB.

## Tackling page size

Okay, design changes aside, there are still a few things we can do to get the webpage size down to something more reasonable. For some perspective, the average weight of a webpage in October 2021 is just over 2 MB ([HTTP Archive](https://httparchive.org/reports/page-weight?start=2017_04_15&end=latest&view=list#bytesTotal)). Let's set that as our target. So, we're looking to reduce at least 4 MB overall.

### One change gets us 75% of the way there

In the footer of the site there is a half-globe image, similar to the one that is used in hero section at the top of the page. _Similar_, but not the same. The image in the hero seems designed specifically for that section and comes in at just over 237 kB.

The image in the footer, however, comes in at 3 MB in size. As a bonus, the image is set as a `background-image` in the footer's CSS declaration. This means we can't defer loading it using the browser's native lazy-loading capabilities.

![Footer of the COP26 website featuring a large globe cut off at the bottom of the page.](../../public/img/blog/824e84eb25ed38f36e502d60421454bd5a6be37e-1180x224.png "The footer image in question.")

{% callout "Update"%}
This image has now been replaced by a 462 kB version. A big thank you to Tim Paul from UK Government Digital Services and the Cabinet office making the update.
{% endcallout %}

There are a handful of ways to go about making the situation better with this image. Here are two that I'd go with:

1. **Move it into an `<img>` tag** Removing the image from the CSS, and instead requesting it using an `<img>` tag within the page's HTML lets us instantly apply the `loading="lazy"` attribute to the image. Since it's in the footer, it most certainly won't be requested when the page first loads. There'd be a tiny bit of CSS added to position the image appropriately.
2. **Re-use the hero image in the footer** The image in the hero could be used in the footer with a little CSS to rotate the image to match the current design.

If done in combination, the two steps above will remove pretty much an entire 3 MB from the total size of the page.

{% callout "An impactful change"%}
Since this image is in the footer, it will be downloaded by every single website visitor the first time they visit any part of the COP26 site. Removing this download would have the single biggest impact on the entire site's sustainability profile.

Let's assume a million unique visitors visit some part of the COP26 site over the next two weeks. We're looking at a potential CO2e reduction of 2500 kg. with this one change alone (`3 MB * 0.837g per MB = 2.511g * 1000000 / 1000 = 2511 kg.` ).
{% endcallout %}

### Almost there with modern image formats

Of the remaining 1.5 MB worth of images on the homepage, most are lazy loaded. However, every image on the page could benefit from some further optimisation. By using newer image formats like WebP or even AVIF we can:

- Take over 300 kB off the initial page load.
- Reduce about 600 kB from the entire page.

This assumes there's nothing we can do about the images that are loaded by the Twitter and Instagram plugins.

### Replacing icon fonts with SVG

Looking through the network requests, there appear to be at least 8 requests for CSS files that relate to icon fonts. Looking around the homepage, I'm not able to see where these icons are used. Running a Coverage test in Edge DevTools confirms just that. Of the 143 kB of icon CSS loaded, only 1.5 kB is used on the homepage.

{% callout "There's caching, but ..." %}
It might be the case that these icons are used in other parts of the website. The site's caching does help here, but users are still being made to download a chunk of data that they might never actually need.
{% endcallout %}

As an alternative, all these icons files could be replaced with SVGs. This would have two benefits:

1. The icons would only be downloaded on the pages where they are actually used.
2. Requesting the SVG icons using either `<img>` tags or through CSS will allow the site's caching policy to still be effective.

Not only would there be a saving made on the CSS loaded by the homepage. As a result of moving off icon fonts we'd eliminate 630 kB worth of font files.

### Using WOFF or WOFF2 for fonts

The main fonts used for text content on the site are Tungsten (Bold) and Rubik (Bold, Medium). These fonts are hosted locally, which is great for performance. That performance gain gets negated somewhat by the fact that the fonts are being transferred in TTF format, totalling 320 kB.

Providing WOFF or WOFF2 alternatives (which both have [very wide browser coverage](https://caniuse.com/?search=woff)) would deliver _at least_ as 50% reduction in file size. That's without going further and subsetting the font files.

## How have we ended up?

Let's recap. Starting out with a page that loads 6.13 MB, we can make the following changes to reduce page weight:

- Remove/replace the 3 MB image in the footer. **Saving 3 MB.**
- Use modern image formats for most images. **Saving 300 kB on page load**.
- Replace icon fonts with SVG. **Saving about 770 kB.**
- Using WOFF/WOFF2 font formats. **Saving _at least_ 160 kB.**

That gets us down to **about 1.9 MB** page weight on first load. 🎉 Hooray! Mission accomplished.

If a design change can be made to load the contents of Twitter and Instagram feeds only after user interaction, then the page weight could go as low as **500 kB.**

### What does this mean in terms of CO2e?

In terms of CO2e, let's do some back of the envelope math. Beacon had one pageview (6.13 MB) generating 5.136g of CO2e. Breaking that down `5.136 / 6.13 = 0.837g per MB`.

Reducing the page size to 1.9 MB would instead generate `0.837 * 1.9 = 1.590g CO2e` per pageview (**a reduction of 3.546g**). Going all the way with the social media design changes, CO2e could be reduced to as little as `0.837 * 0.5 = 0.419g` per pageview (**a reduction of 4.717g**).

{% callout "Incremental gains" %}
Let's bear in mind that the numbers above relate only to visitors who first enter the UKCOP26 website via the homepage. Every 10,000 visits like this would result in _at least_ 35 kg. (up-to 47 kg.) less CO2e being released into the atmosphere.

As we saw with the image in the footer, applying the changes mentioned in this post across the entire site would have an even greater impact.
{% endcallout %}
