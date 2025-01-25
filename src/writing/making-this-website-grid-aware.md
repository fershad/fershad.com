---
title: Making this website respond to your local energy grid
permalink: /writing/making-this-website-grid-aware/index.html
summary: "This post covers the technical steps I've taken to make this website respond to a visitor's energy grid. It also touches on the design changes that happen as a result, and the performance and energy impacts of those changes."
published: 2025-01-06
---

In a few recent blog posts I've talked about a new project we're working on at the Green Web Foundation called "[Grid-aware Websites](https://www.thegreenwebfoundation.org/news/introducing-our-grid-aware-websites-project/)". At its core, the idea of a "grid-aware website" is one that does less on a user's device when that user is visiting from a location that's powered by more fossil fuel electricity.

Often, when I'm working on stuff like this, I dogfood it here on this website. That's what I've done as part of a [recent website redesign](https://fershad.com/writing/new-year-new-look/). Every time someone visits a page on this website, parts of the page's design/functionality are adjusted depending on the fuel mix of the visitor's energy grid.

{% callout "Jargon: Fuel mix" %}
A term used to describe the balance of renewable, low-carbon, and fossil fuel energy used to generate the electricity of a particular region or electricity grid.
{% endcallout %}

In this post, I'll cover the technical details behind how I've implemented grid-awareness on this website using Cloudflare Workers. I will also touch on what changes are made to the website content when grid-aware design changes are applied. Finally, I'll do some (non-scientific) checks on the impacts these changes make.

## The Grid-aware Websites project

The idea to make websites grid aware stems from the growing body of work and tooling for backend systems which enables them to be shifted to greener regions, or to times of the day when more renewable energy is available. Projects like our own [Grid Intensity Go library](https://github.com/thegreenwebfoundation/grid-intensity-go), [Carbon Aware Scheduler](https://github.com/abel-vs/carbon-scheduler), [Carbon Aware KEDA Operator](https://github.com/Azure/carbon-aware-keda-operator), as well as services from other organisations such as [Electricity Maps](https://www.electricitymaps.com/) and [WattTime](https://watttime.org/) make this possible.

Seeing work in the backend like this got us thinking - *what about frontend developers?* A website user can't really be asked to come back at another time, or to visit from a different location.  *So then what, if anything, can frontend developers do to make the interfaces and apps we build respond to the state of the energy grid they’re being run on?*

Through the Grid-aware Websites project, we ([Green Web Foundation](https://thegreenwebfoundation.org)) plan to build a core open-source library that exposes APIs so developers can retrieve information about the energy grid their users are on.

Around this core library will be a set of plugins that developers can use to get this code working with different platforms. And, most importantly, we’ll be creating a UI/UX catalogue to give ideas and guidance to designers, developers, and product teams about the visual or functional changes they can to make to their websites when implementing grid awareness.

You can [follow the project](https://www.thegreenwebfoundation.org/tools/grid-aware-websites/) on the Green Web Foundation's website.

## So how does grid awareness work on this website?

I host my website on Cloudflare Pages, and my DNS runs through Cloudflare as well. This means that I'm able to use some of their other services, like Cloudflare Workers to run code "at the edge".  The Grid-aware Websites project is still in it's very early days, but one of the deployment environments we're targeting at this early stage *is* the Cloudflare Workers runtime.

The ability of this website to be grid aware is delivered by:

- [`@greenweb/grid-aware-websites`](https://github.com/thegreenwebfoundation/grid-aware-websites) (the core library)
- [`@greenweb/gaw-plugin-cloudflare-workers`](https://github.com/thegreenwebfoundation/gaw-plugin-cloudflare-workers) (a plugin for working with Cloudflare Workers)
- [Electricity Maps API](https://docs.electricitymaps.com/)

To implement grid awareness to this site, I'll get Cloudflare Workers to act almost as a middleware layer - even though my website itself is a pre-built [Eleventy](https://11ty.dev) site.  When a page from this site is requested, that request passes through the Cloudflare Worker which *does some things* (more on those *things* soon) and returns a response back to the visitor. The diagram below shows this process in its simplest form.

![A flow diagram with a browser on the left, an arrow out representing a request that goes to a CDN Edge Worker. The CDN Edge Worker has a "fetch" arrow that goes to the Host/CDN and returns. The CDN Edge Worker then has another arrow returning to the response to the Browser.](../../public/img/blog/gaw-high-level.png 'A very high-level diagram of the request-response flow for this website.')

## Stepping through a web page request

This next section goes into more detail about what goes on *inside* the Cloudflare Worker ("CDN Edge Function" in the diagram above) when someone visits a page on this website. The explanations below provide extra context, but you can also [step through the source code](https://github.com/fershad/fershad.com/blob/main/workers/grid-aware/src/index.js), or [follow a simplified flowchart](#a-visual-walkthrough) if you find those easier.

### A Cloudflare Worker intercepts that request

#### Check for spammy requests

It first checks for whether the request is for a URL that I've deemed to be spammy (like someone looking for the `wp-admin` path on this *static* website). For those, it sends back a 404 status.

#### Not a spammy request

If we're cool, then the Cloudflare Worker will fetch the requested asset (it could be a page, and image, a file).

Once the fetch response comes back, a few more checks are done:

- Is the request a non-HTML page?

This is done by checking for a `Content-Type: text/html` header. If the request is for a non-HTML asset, return the response straight back to the browser.

- Has the user previously indicated they don't want to see the grid-aware page?

This is done by checking for a `Gaw-Status` cookie set to `disabled`. If the user's opted-out of grid-aware checks, return the requested web page back to the browser without any changes.

- Is the user's current session flagged as already having passed grid aware checks?

In this example a user's already visited the site in their current session, and the previous grid aware checks registered that no changes need to be made to web page content (more on this later). This is done by checking for a `GAW-Session` cookie set to `disabled`. If this cookie is found, return the requested web page back to the browser without any changes.

3. Is the request to a special path that we don't want grid-awareness applied to?

I've got a few paths (e.g. `/api/`) that I *don't want* grid-aware code to run on. If the request is for one of those paths, return the response straight back to the browser.

### Using the Grid-aware Websites libraries

If we've got this far then:

- A HTML page being requested,
- It's not spammy, or on a special path,
- The user hasn't opted out of grid awareness,
- And, grid awareness hasn't been disabled for the user's current session.

From here, the [Grid-aware Websites library](https://github.com/thegreenwebfoundation/grid-aware-websites) is used to determine the status of the users energy grid, and raise a flag if grid-aware changes should be made to the web page before it's returned to the browser.

#### Getting the user's country location

To do this, we first need to get an approximation of where the user's visiting from. We can use one of the helper functions (`getLocation`) that the [Cloudflare Workers Plugin for Grid-aware Websites exposes](https://github.com/thegreenwebfoundation/gaw-plugin-cloudflare-workers). The plugin also provides other helpers for saving data (`saveDataToKv` and `fetchDataFromKv`) and responses (`savePageToKv` and `fetchPageFromKv`) to [Cloudflare Workers KV](https://developers.cloudflare.com/kv/) stores, effectively allowing us to cache information we might use repeatedly for future requests.

1. Using the `getLocation` function we can get the country from which the request has been made. We will base our checks of the energy grid on this.
2. The `fetchDataFromKv` function is then used to check if there's already cached data for that country.  
	1. If there's cached data is, we use that!
3. If there's no cached data, we then use the `gridAwarePower` function of the core Grid-aware Websites library to fetch the latest information about the power breakdown of the visitor's national grid.

4. Once we get that data, we cache it for future use using the `saveDataToKv` function. By default, the function stores data for 1 hour.

If at any point along this journey there's an error (normally this would be that there's no data in the Electricity Maps API for the country being checked), the web page response is returned back to the browser.

### Determining the status of a user's grid

In step 3 above, we use the `gridAwarePower` function to get data about a user's energy grid. This same function also does some checks to determine if the "low-carbon" power percentage (i.e. renewables plus nuclear) is above or below 50%.

- If it's below 50%, a flag is set that grid-aware changes should be made to the website.
- If it's above 50%, the same flag is set to `false` indicating that the grid has passed the checks.

50% is the default percentage in the library at this time, though it can be changed by developers when using the function in their own code. The library also allows for checks to be made against only "renewable" energy, as well as by using the carbon intensity of the grid instead. More of that's explained in the [project's readme on GitHub](https://github.com/thegreenwebfoundation/grid-aware-websites/blob/main/README.md).

### Modifying the page based on the nature of the user's grid

At this point, we've got information about the user's national energy grid. The Grid-aware Websites library has also indicated, based on this data, if grid-aware changes should be applied to the page.

If grid-aware changes don't need to be applied, then just return the response as usual. If we do want to make grid-aware changes, then:

1. Use the `fetchPageFromKv` function to check if there's already a cached version of the page with grid-aware changes applied. If there is, return the cached page.
2. If there's no cached page, use the [HTMLRewriter API](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/) to:
	1. Remove all HTML elements on the page that have the `data-gaw-remove` attribute.
	2. Add a class of `"deglitch"` to the body tag of the page. This removes the glitching animation that's used on a few different elements on the regular website.
3. Cache the modified page for 24 hours using the `savePageToKv` function.
4. Return the modified page to the user's browser.

#### What's the `data-gaw-remove` attribute?

When coding my website, rather than create duplicate versions of pages without and with grid-aware changes applied, I've decided to mark any HTML elements that I want to remove from grid-aware pages using the `data-gaw-remove` attribute.

This allows me to really easily see, in my code, what elements are the extra ✨shiny✨ things that I've added to the site. Think of these as bits of progressive functionality that we can afford to have when the grid-aware context allows for it.

One place I've used this is for the grid-aware information banner that's shown on any page that's been returned with changes applied. That banner is coded into the site, but gets hidden on the regular ("non-grid-aware") site because it's a sibling of the website theme toggles. These toggles get removed when grid-aware changes are applied, allowing me to use CSS to hide/show the information banner.
<!-- markdownlint-disable -->
{% codeToHtml "css", "index.css" %}
[data-gaw-remove] + .gaw-banner {
  display: none;
}
{% endcodeToHtml %}
<!-- markdownlint-enable -->

You can see this CSS code [in this file](https://github.com/fershad/fershad.com/blob/6dd90558fb400d5e0d38cdd2cec400eaf8ad8d83/src/_includes/css/index.css#L861-L877), and the corresponding HTML [in this file](https://github.com/fershad/fershad.com/blob/main/src/_includes/layouts/base.liquid).

### A visual walkthrough

That's a lot of written out if statements and steps. If you need a visual hand to guide you along, you can reference the flowchart below as well, or in the [Mermaid Live viewer](https://mermaid.live/edit#pako:eNp1VNtS2zAQ_RWNnh0mvkBiP5QhpMVMSx8KbaeJeRD2JtFgW64ukDTk37u-EaOZxC8Z7dlzds-utKepyIBGdJWL13TDpCYPs6Qk-Bsvf8MTqdgaiIS_BpR-HI0-XbXBq_19xYpi14cuD905QQx5S-gfUAklb-TKXSY0GAcIVJUoFST00YJ-Fy3SQ-QX0OmmJz1CvQY72yf0VhGuCSPxw923prjLhHbaM4twYR33Jc1c5ImZInoDxCiQRFQaspEwmogVWUuejdgrk1CCUgN61yZa2IFOeOZ3AqmRyKKJQiKOzWPBSkE2kCDpBtLnoYp_SsW3VbzWjrqLzjCyEpKwksA2zU2GQhXTmwG3d4rbs7ivcRQ3oFt3UmFKLXc4jR71WUohE9rktwzXTWiOFV0zbCkjGdOMsBfGc_aUD4Y0t5Tm9X78MKVlO8nFmqcnJD_w9K3M6_X5qdDRYwF9ftzltIO6QeA9e4G2Ri3I118WMMY-5gJUz_UCsp5fvR2FyPiKN9bixYAtx91_by62i4qb7kAbWX7MfF_t2PIjrtu4q6G7_u5Z9yZuh3W77Lw-QXzbNuT2E1ocKxGSr3nJ8iE3dWgBsmA8w8dgX6ckFDerwFiEf0swWrI8oU4bytkOr0sbg_w5oUl5QApmtLjflSmNtDTgUFOhxzDnbC1ZQaMVyxWeVqyk0Z5uaeQG52eBP5lOzr1xEE7Di4lDdzTyg7Mw8AJ3EgYTLxwH7sGh_4RAhvHZ9Nz1J_h542kYhhe-QyHjWsi79h1rnjOHSmHWm6Hgokmvqzr8B64Sfjg).

![](https://mermaid.ink/img/pako:eNp1VNtS2zAQ_RWNnh0mvkBiP5QhpMVMSx8KbaeJeRD2JtFgW64ukDTk37u-EaOZxC8Z7dlzds-utKepyIBGdJWL13TDpCYPs6Qk-Bsvf8MTqdgaiIS_BpR-HI0-XbXBq_19xYpi14cuD905QQx5S-gfUAklb-TKXSY0GAcIVJUoFST00YJ-Fy3SQ-QX0OmmJz1CvQY72yf0VhGuCSPxw923prjLhHbaM4twYR33Jc1c5ImZInoDxCiQRFQaspEwmogVWUuejdgrk1CCUgN61yZa2IFOeOZ3AqmRyKKJQiKOzWPBSkE2kCDpBtLnoYp_SsW3VbzWjrqLzjCyEpKwksA2zU2GQhXTmwG3d4rbs7ivcRQ3oFt3UmFKLXc4jR71WUohE9rktwzXTWiOFV0zbCkjGdOMsBfGc_aUD4Y0t5Tm9X78MKVlO8nFmqcnJD_w9K3M6_X5qdDRYwF9ftzltIO6QeA9e4G2Ri3I118WMMY-5gJUz_UCsp5fvR2FyPiKN9bixYAtx91_by62i4qb7kAbWX7MfF_t2PIjrtu4q6G7_u5Z9yZuh3W77Lw-QXzbNuT2E1ocKxGSr3nJ8iE3dWgBsmA8w8dgX6ckFDerwFiEf0swWrI8oU4bytkOr0sbg_w5oUl5QApmtLjflSmNtDTgUFOhxzDnbC1ZQaMVyxWeVqyk0Z5uaeQG52eBP5lOzr1xEE7Di4lDdzTyg7Mw8AJ3EgYTLxwH7sGh_4RAhvHZ9Nz1J_h542kYhhe-QyHjWsi79h1rnjOHSmHWm6Hgokmvqzr8B64Sfjg?type=png 'A flowchart stepping through the process of determining if grid-aware changes should be applied to this website.')

## What changes are made to the website when grid awareness is triggered?

When the grid-aware flag is set on this website, the following changes are made inside the Cloudflare Worker before the page is returned to the user:

- Glitch animations are removed.
- The [Depature Mono webfont](https://departuremono.com/) font is replaced with [System Font alternatives](https://modernfontstacks.com/).
- ***Most* JavaScript is removed**. That includes:
    - Filters and controls on the [/writing](/writing) and [/reading](/reading) pages.
    - Site controls to "deglitch", "depixelate", and switch themes.
    - Functionality that fetches a random image in the Film section of the homepage.
    - Functionality to refresh the list of articles on the [/reading](/reading) page and on the homepage.
    - The silly random emoji favicon code that runs on each page.
- Codepen embeds are replaced with links to the project on Codepen itself.

A banner is also added to the top of the website, letting users know that the page their viewing has been modified. This banner also includes a link that allows users to "opt-out" of seeing the grid-aware website for 24 hours. This is done by setting a cookie, which is then checked for by the Cloudflare Worker described above. I've written another blog post showing these changes visually. You can read that at - *[What visual changes does grid-awareness trigger on this site?](/writing/visual-changes-grid-aware-website)*

{% callout About analytics %}
You might have noticed that disabling analytics is missing from the list above. I use Fathom Analytics on this website, and have decided to keep it on when other grid-aware changes are applied. Why? Because, grid-aware websites is a new idea we're working on at the Green Web Foundation, and I'd like to be able to see how many people are getting that experience, and how many are also opting-out.
{% endcallout %}

## What difference do these changes make?

I looked at website performance metrics and energy usage as two means to assess the "impact" of these changes. As mentioned way back at the start of this post, the key idea behind Grid-aware Websites is to "do less" in the browser when the grid is not running on a lot of clean energy.

I want to emphasise that "*do less*" in this context, does not mean "*give the user a lesser experience*". My website is a content site, the few people who visit come along to read a blog post and occasionally have a nosey around. In the changes I've made, all those things are still possible in the grid-aware version of the site, just without some of the "visual flair".

### Testing web performance

To test if the performance of the website was impacted by the changes (and by the code being run in the cloud for each page view) I used [WebPageTest](https://webpagetest.org).

I ran 9 tests against each version of the website (regular and grid-aware). I ran 9 tests on the regular site with the `gaw-session=disabled` cookie set. I then ran 9 tests with the `gaw-session=enabled` to force the grid-aware site to be returned. The test results can be seen at the links below:

- Regular site: <https://www.webpagetest.org/result/250102_BiDcYJ_4BM/>
- Grid-aware site: <https://www.webpagetest.org/result/250102_AiDc33_4AH/>

There's barely any difference between the results. The grid-aware site returns fractionally slower for time to first byte, and first/largest contentful paint metrics. This  probably reflects the fact that the code to check for an enabled session comes slightly after that of the disabled session. Maybe I can refactor the Cloudflare Worker to check for both cookies earlier.

One other difference in the results is the grid-aware site coming in 23kb lighter! That's probably down to the lack of custom fonts, a bit less CSS, and a tiny bit less HTML as well with the `data-gaw-remove` elements taken out. Still, a win!

### Testing energy usage using Firefox Profiler

To test energy usage, [I turned to the Firefox Profiler](https://fershad.com/writing/co2e-estimates-in-firefox-profiler/). As yet, I'm not aware of any way to automate power profiling in Firefox so I had to run the tests below manually. They're not highly scientific, and I didn't adjust much in my Firefox setup before running them. However, I feel they should give a reasonable pointer as to the impacts of the changes on device energy use.

In these tests, I visited the website's homepage five times and scrolled to the bottom of that page. Before the first visit, I cleared the browser cache and set the `gaw-session` cookie to force the appropriate version of the site to be displayed. For visits 2 - 5 I did not clear any cache.

The results for each test run can be found in the table below. I've also pulled out the key energy usage result and show it alongside as well. The duration for each run is shown in seconds (s), and the energy used for each run is shown in microwatt-hours (µWh). The results only looking at the power used by the process running my web page. While that might exclude some other processes that are involved with loading the web page content, it also excludes a lot of other noise that the power profile picks up.  I feel it's the best way to give a narrow view that *just* looks at the changes made to the page that's shown.

Tests were run on an MacBook Air Apple Silicon M2 Device with 8 physical cores and 8 logical cores, runnning macOS 15.2.0.

#### Regular site

These are test runs with a cookie of `gaw-session=disabled` set.

{% capture tableContent %}

| Test Run | Duration (s) | Energy used (µWh) | Result URL                        |
| -------- | ------------ | ----------------- | --------------------------------- |
| 1        | 10           | 427               | <https://share.firefox.dev/4gB26Br> |
| 2        | 9.7          | 390               | <https://share.firefox.dev/4a3B1Et> |
| 3        | 8.6          | 362               | <https://share.firefox.dev/4h0Ynx5> |
| 4        | 9.1          | 403               | <https://share.firefox.dev/3Pm2Puq> |
| 5        | 9.4          | 395               | <https://share.firefox.dev/4gF1TNK> |
{% endcapture %}

{{ tableContent | markdownTable }}

#### Grid-aware site

These are test runs with a cookie of `gaw-session=enabled` set.

{% capture tableContent %}

| Test Run | Duration (s) | Energy used | Result URL                        |
| -------- | ------------ | ----------- | --------------------------------- |
| 1        | 10           | 49          | <https://share.firefox.dev/3DFbiGs> |
| 2        | 8.5          | 51          | <https://share.firefox.dev/3DGfvK8> |
| 3        | 9.6          | 45          | <https://share.firefox.dev/49ZOYUa> |
| 4        | 10           | 49          | <https://share.firefox.dev/3W43Wm6> |
| 5        | 8.7          | 48          | <https://share.firefox.dev/4iX2TOR> |
{% endcapture %}

{{ tableContent | markdownTable }}

The difference in those results is probably more than I was expecting to see to be honest. Grid-aware changes (even the limited ones I'm making) are showing a pretty sizeable reduction in energy used. The regular site has *a lot* of animation to give the glitch effects which get removed on the grid-aware version. The vibe I'm getting from these results is that these animations make up a fair portion of the energy use.

## What's next?

For this website, I'll probably take a bit of time and see if I can speed up the check for the `gaw-session` cookie in the Cloudflare Worker. Besides that, I don't think I'll be doing too much more tweaking of this website for the next few months at least.

Update - Jan 17, 2025 - I've really been thinking about how to change the approach I've taken to be more of a progressive enhancement approach. That is, how would I start with a low-impact version of the site as default and then *add* extra bits of functionality when a user's grid allows it. It's on my mind, and I might have a crack at implementing it before March.

### Grid-aware Websites project

For the Grid-aware Websites project, there's sooooo much we've got planned for 2025. I'll keep working on the code libraries, plugins, examples, and documentation. We hope to demonstrate this stuff being used on both CDN edge runtimes,  as well as server rendered websites like those delivered by many modern JavaScript frameworks and content management systems (CMSs). The code libraries I've used in this post are ready to be used today, but be aware that they're very pre-alpha so expect changes.

Additionally, we'll soon be kicking off a big bit of work for the project centered around creating a UI/UX catalogue to showcase low-impact, sustainable, web design ideas and patterns. We aim for this to be a thorough resource where any individual or team that's implementing grid awareness on their own site can reference for design inspiration and guidance. I can't wait for this to come together and see what ideas we get from the community. I may even be lured into another website redesign to implement some myself.
