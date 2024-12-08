---
title: Lazy-loading embedded iframes
published: 2020/10/22
permalink:  /writing/lazy-loading-embedded-iframes/
summary: >-
  Lazy-loading iframes can lead to data savings for your users, faster page
  loads, and quick interactivity for your site.
---

Lazy-loading has been a fairly common practice in web development for many years now. At it's core it aims to deliver faster page loads by deferring the loading of elements that are outside the initial viewport area. As the user scrolls down the page these elements (normally images) are loaded "just in time".

Often lazy-loading is applied to images. But did you know that you can also apply it to `iframe` elements? With [support in Chromium browsers](https://caniuse.com/loading-lazy-attr) now it's as easy as adding the `loading=lazy` to an iframe tag. And, doing so could give your web pages a nice boost in some Web Vital metrics as well.

> Based off Chrome's research into automatically lazy-loading offscreen iframes for Data Saver users, lazy-loading iframes could lead to 2-3% median data savings, 1-2% First Contentful Paint reductions at the median, and 2% First Input Delay (FID) improvements at the 95th percentile.  
> **~ Addy Osmani ([link](https://web.dev/iframe-lazy-loading))**

I created a quick and dirty test just to see what kind of savings can be gained by lazy-loading a single YouTube embed on a web page. Here's what I found:

**Without lazy-loading ([site](https://unsuitable-cushion.surge.sh/))**

* Requests: 18
* Page size (compressed): 1.8MB

**With lazy-loading ([site](https://unsuitable-cushion.surge.sh/index1.html))**

* Requests: 2
* Initial load size: 2kb

Given, the pages I made to test with were extremely barebones, but the difference a single attribute can make is still stark. Addy Osmani has [more detailed examples](https://web.dev/iframe-lazy-loading/#what-impact-might-we-see-from-lazy-loading-popular-iframe-embeds) and guides to using lazy-loading for iframes.

{% callout "On the other hand ..." %}
On the flip-side, if you've got an embedded iframe at the top of your page and want to make sure it's loaded in a timely manner of page visitors, then use the `loading=eager` attribute instead.
{% endcallout %}
