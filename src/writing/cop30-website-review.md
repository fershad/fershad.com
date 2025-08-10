---
title: COP30 website review. Rinse and repeat.
published: 2025-08-10
summary: After taking a year off, I'm back reviewing this year's COP30 website and finding some familiar patterns.
---

COP30 ([Conference of the Parties](https://unfccc.int/process/bodies/supreme-bodies/conference-of-the-parties-cop)) is taking place later this year in Brazil. Which means there's another COP website for me to review. I took a break last year, having done three COPs in a row (read my takes on the [COP26 (Scotland)](https://fershad.com/writing/cop26-a-quick-sustainability-check/), [COP27 (Egypt)](https://fershad.com/writing/cop27-egypt-a-webpage-sustainability-review/), and [COP28 (UAE)](https://fershad.com/writing/cop28-uae-a-low-carbon-website-review/) websites). Coming back to it this year, COP30's website sees some familiar patterns emerge when compared to those previous reviews.

## What we’ll look at

For this review, I'm going to focus mainly on the desktop version of the COP30 English language homepage ([https://cop30.br/en](https://cop30.br/en)), looking at it through a web performance and sustainability lens.

![[/![A screenshot of the COP30 English homepage showing the heading "COP30 Brasil Amazonia Belem 2025" with various news articles shown with images below.](../../public/img/blog/cop30_homepage.png 'A screenshot of the COP30 English homepage')]]

## Real world performance

To get an idea of how folks around the world are experiencing this website, let's use Treo's free [Site Speed Audit](https://treo.sh/sitespeed) tool to explore data from the [Chrome User Experience Report (CrUX)](https://developer.chrome.com/docs/crux). It's worth noting that this data only represents a subset of Chrome browser users and that it covers the entire domain (not just the homepage).

Looking at the data for June 2025 at the 75th percentile, we have:

{% capture tableContent %}
| Metric | All devices | Mobile (50.8% of visits) | Desktop (47.8% of visits) |
| ------------------------------- | ---------------: | -----------------------: | ------------------------: |
| Time to First Byte (TTFB) | 1.4 seconds | 1.3 seconds | 1.6 seconds |
| First Contentful Paint (FCP) | 2.8 seconds | 2.8 seconds | 2.8 seconds |
| Largest Contentful Paint (LCP) | 3.2 seconds | 3.3 seconds | 3.2 seconds |
| Interaction to Next Paint (INP) | 125 milliseconds | 150 milliseconds | 75 milliseconds |
| Cumulative Layout Shift (CLS) | 0 | 0 | 0.05 |
{% endcapture %}

{{ tableContent | markdownTable }}

A few things stand out in the numbers above which we can explore later in this post:

- That's a long TTFB. It probably points to no CDN being used on the site, and it being served from a single location.
- The time gap between the TTFB and the FCP values indicates that there's a bit of content being downloaded in the client before it's displayed. This is also normally an indicator that a client-side framework is being used to render the site.

## A long TTFB

This is a familiar story on COP websites. When I looked at the COP27 website in October 2022, it had a TTFB of 1.3 seconds. [Drilling into that site](https://fershad.com/writing/cop27-egypt-a-webpage-sustainability-review/#servers-hosting-and-cdns) surfaced that it was hosted in Egypt itself, and wasn't using a content delivery network (CDN) to serve assets to visitors from other parts of the world. My guess is that the same thing is happening with this COP website.

### Checking for a CDN

To quickly check for the use of a CDN, I'll use CDN Planet's [CDN Finder](https://www.cdnplanet.com/tools/cdnfinder/) tool. Putting the homepage URL through there returns an "unknown" CDN result. Clicking the "show IPs" option above the results reveals an IP address of `189.9.168.10`.

### Hosted in Brazil

With this IP address, the most obvious next thing to do so we can find out where the site is hosted would be to chuck it into any one of the number of IP to location tools that are on the internet. That's too obvious, so I did not do that. Instead, I did a lookup for the IP address' Autonomous System Number (ASN) - which is a way to tell what network it belongs to.

The [results returned](https://bgpview.io/ip/189.9.168.10) `SERVICO FEDERAL DE PROCESSAMENTO DE DADOS - SERPRO`. That looks like it belongs to a Brazilian government agency of sorts. A [quick look in IPinfo](https://ipinfo.io/189.9.168.10?lookup_source=search-bar#block-geolocation) then confirmed that the IP address is traced back to Brasilia, the capital of Brazil. So yeah, probably hosted at a government facility.

### Server sustainability

Based on this information alone it's hard to say how sustainable the server is. It could be housed in a building running on solar and batteries for all I know. Or it might be using the local grid. Brasilia is located in a part of Brazil that consistently generates [over 75% of its energy from renewable sources](https://app.electricitymaps.com/zone/BR-CS/12mo/monthly) though, so that's a good start at least.

Given that COP is a global event, you'd expect people around the world would be visiting the website for information and updates. It would really be nice to see a CDN being used to help get content to folks just a bit quicker. It would align with the recommendations in the [Web Sustainability Guidelines](https://w3c.github.io/sustainableweb-wsg/#cdn-use-must-be-proportionate-and-sustainable), and could even help _a tiny_ bit with the FCP related issue we'll touch on next.

## A longer time to content

The site appears to use [Plone CMS](https://plone.org/) (`<meta name="generator" content="Plone 6 - https://plone.org">`) for both managing content and for the frontend. I've not heard of Plone before, but from their website and docs I understand that it deploys sites with a React frontend via something they call [Volto UI](https://6.docs.plone.org/volto/index.html).

I kinda guessed it'd be something React-ish the first time I loaded the site and looked at the Network tab in my browser's DevTools. There was a 2.6 MB `client.8227f7bd.js` being downloaded. That's a React smell. This one file made up almost half of the total data transferred for the homepage to load - 5.4 MB on desktop, 4.7 MB on mobile. For reference, the [HTTP Archive State of the Web](https://httparchive.org/reports/state-of-the-web#bytesTotal) have the median web page size for desktop at 2865.6 KB and 2562.5 KB for mobile (July 1, 2025). One JavaScript bundle for this site is around the same size as the median web page. 🤯

This `client.8227f7bd.js` file allows the whole site to then be rendered as a Single Page Application (SPA), with subsequent "page" navigations downloading a few dozen kilobytes of JSON content from the Plone CMS backend (which is on the same server in Brazil we talked about earlier).

### Really? An SPA? For this?

This website, like other COP websites before it, is nearly entirely images and text only. That's it. As far as I can tell, the only real bits of "interactivity" on the site are:

- The language selector
- The cookie notification banner
- The loading of content on some pages (e.g. News, Letters from the Presidency, Speeches)
- A search function in the menu bar

It also seems that content for the website footer and social media links also rely on the `client.8227f7bd.js` file to populate.

But like ... text and images. This entire website could be a static site, or server-side rendered. There's nothing "snappy" about the SPA experience, nor is anything being saved by initially downloading the 2.6 MB `client.8227f7bd.js` file. To be honest, it's probably 10 times more JavaScript than is actually required for a website like this to function. Yet, visitors are forced to download that bundle, parse it, and execute it. That's just waste if you ask me.

The only upside of this approach comes as a result of the Brazilian host server, no CDN situation described above. With an SPA, we only need to fetch and download a 10-30 KB JSON package from the server for each navigation event, rather than waiting for the whole page to come back. But even that can be solved with upcoming web features like [Speculation Rules](https://www.debugbear.com/blog/speculation-rules) or a tiny library like [instant.page](https://instant.page/) instead.

To reiterate - there is no reason for this website to be bloated in the way that it is by React. Plone provides a [Rest API](https://6.docs.plone.org/plone.restapi/docs/source/introduction.html) which allows it to be used as a headless CMS (one where the backend and frontend are decoupled). From there you've got your choice of frameworks many of which support server-side rendering or static site generation out of the box.

## It wouldn't be a COP website without image issues

The first COP websites I reviewed (COP26) got more attention than I expected because of a [3 MB image in the footer](https://fershad.com/writing/cop26-a-quick-sustainability-check/#one-change-gets-us-75-of-the-way-there) of the page. That attention helped get the matter to someone at the UK's Government Digital Services team who could at least optimise the image to reduce its size.

Images have been a constant theme through the other COP website reviews I've done as well. This site keeps that trend going.

Firstly, credit where it's due. The site is loading responsive images, and using native lazy-loading as well. By the looks of it that [comes along with the Volto UI frontend](https://6.docs.plone.org/volto/development/images.html) for Plone CMS. What it lacks, though, is support for delivering modern image formats. This [GitHub issue from 2020](https://github.com/plone/volto/issues/1394) has one of the lead developers on Plone suggesting it should be added to the platform.

Of the 14 images loads on the homepage, 13 are SVG or JPEG format. One happens to be a WebP image. So I guess if the user uploads a WebP in the Plone CMS, that image will still be processed, resized, and served to the frontend. But that leaves it up to the user to do any image optimisations. Not ideal.

I honestly feel that by now this kind of thing should be table stakes when assessing a framework or platform for building a website. If image optimisation, including generating modern web formats, isn't baked into the platform, then it should at least be able to be added through a plugin or extension at the very least. Heck there are even online image optimisation services that can be used (for an eventual cost). It's a solved problem.

## Finally, fonts

The site loads around 530 KB of font files, out of which 380 KB is for the [Google Material Symbols Rounded font family](https://fonts.google.com/icons?icon.size=24&icon.color=%231f1f1f&icon.style=Rounded). That font family, as far as I can find on the homepage, is used to generate just six different icons. I've shown the icons in the table below by importing them from Google Fonts using the optimised code I'll mention in the next paragraph.

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=arrow_forward,close,cookie,keyboard_arrow_down,language,manage_search,newsmode,search&display=block" />

<div class="table-wrapper">
<table>
<tbody>
<tr>
<td><span class="icon material-symbols-rounded bold">keyboard_arrow_down</span></td>
<td><span class="icon material-symbols-rounded bold">search</span> </td>
<td> <span class="icon material-symbols-rounded bold">close</span></td>
<td><span class="icon material-symbols-rounded bold">arrow_forward</span></td>
<td><span class="icon material-symbols-rounded">newsmode</span></td>
<td><span class="icon material-symbols-rounded">cookie</span></td>
<td><span class="icon material-symbols-rounded">manage_search</span></td>
</tr>
</tbody>
</table>
</div>

The COP30 website loads in an entire font family for just these six icons. It is absolutely possible to subset the font instead. In this way _just the required content_ is downloaded. Doing so takes the size of the downloaded font file from 380 KB down to 0.5 KB. Here's the one line code change required to do that:

{% codeToHtml "diff", "client.css" %}
- @import url(https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20,300,0,0&display=block)
+ @import url(https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20,300,0,0&icon_names=arrow_forward,close,cookie,keyboard_arrow_down,language,manage_search,newsmode,search&display=block)
{% endcodeToHtml %}

## Wrapping up

This site is mainly an information portal for COP30 visitors and those around the world interested in the COP process. Some of the recommendations I've made above could be implemented fairly quickly and have a small sized impact on performance and sustainability.

However, the SPA nature of the site is harder to solve, being a decision that is made early in the life of a project like this. There is absolutely no need for React to be used on this website. Now that it's there, it's hard to back out without rebuilding a lot of things from the ground up. I'd love to see that happen here, but won't be holding my breath. Perhaps a better choice will be made for COP31.
