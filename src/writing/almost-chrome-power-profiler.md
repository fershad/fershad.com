---
title: We nearly had power profiling in Chromium
published: 2025-11-25
summary: "Being able to capture the on device power use of a website is a really important step towards making forward progress in web sustainability. Firefox has it, and it looks like Chrome almost did too."
---

One of the things I learnt at [TPAC 2025](/writing/reflections-tpac-2025/) is that the [Chromium Issue Tracker](https://issues.chromium.org/) (also known as "CRBUG") is a thing. More than just being a thing, it is (as the name might suggest) the place where you can raise bugs and issues you might encounter in Chromium browsers. Beyond that, it's also a place where ideas for new Chromium features can be raised, triaged, and tracked.

Chromium is the open source browser project that powers Google Chrome, Microsoft Edge, Samsung Internet, and a host of other browsers. Features built into Chromium might not always make their way into all the browsers that use it immediately (or ever), but it sure does make it much easier to get adoption.

## So what's this about power profiling?

Since 2022 (Firefox 104), the Firefox browser has included the option for developers to [capture "Power Profiles"](/writing/co2e-estimates-in-firefox-profiler/) from within its developer tools. This gives developers the means to get granular information about the energy being consumed by the browser as a website is used. In terms of front-end measurement for web sustainability, it is close to the best possible data folks can work with.

But Firefox is but one browser. Chromium-based browsers have by far the largest market share, and yet have little-to-no sustainability-related features built into their developer tooling at the time of writing.

So I was really surprised to find this [closed issue on CRBUG](https://issues.chromium.org/issues/41085566) from ... wait for it ... 20-friggen-14! In it, there seems to have been work done by folks at Google and Intel to include power profiling into the Chromium DevTools in a way that looks similar to what Firefox has now built. It appears as though code was committed to make this happen, but was then rolled back in 2015 after an "offline discussion".

{% callout "Update" %}
[Let's get Power Profiling into Chromium DevTools](/notes/chrome-power-profiler-feature-request/)
{% endcallout %}

### Why this matters

Having the ability to capture a power profile on a website from within then browser opens up a whole new layer of information from both a sustainability and performance perspective. With power utilisation being shown alongside really detailed information such as stack traces and browser events, developers will be able to actually assess their code is having on real user devices.

Having the ability to capture power profiles across multiple browsers may even help improve the efficiency of those browsers themselves. Profiles of the same site across multiple browsers might shed light on areas in which the same code uses more or less power depending on the browser it is running in.

Probably most importantly though, it will allow us to start presenting the case for improving website sustainability backed by meaningful data rather than models.

I mean look at this screenshot from the case study that's linked in the description of the issue. To have this in the most widely used browsers on the planet would be a **huge** step forward for the frontend web sustainability community.

{% include 'partials/chrome_pp_image.md' %}

And yes, I did choose this screenshot on purpose because I'm all about fish power.

Inside jokes aside, discovering this has given me some hope that we might one day be able to get power profiling into Chromium browsers. It's been done before, why not try and land it again ~
