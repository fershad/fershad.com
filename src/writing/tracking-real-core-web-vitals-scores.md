---
title: Tracking real Core Web Vitals scores
published: 2021/10/20
permalink:  /writing/tracking-real-core-web-vitals-scores/
summary: >-
  There are a few options when it comes to keeping track of your website's real
  world Core Web Vitals scores. In this post I'll cover some of the services or
  tools you can use, and some things to be aware of.
---

There's been a lot of talk about Core Web Vitals. Rightly so too. Early data is showing that [Core Web Vitals does seem to be playing a factor in Google Search rankings](https://www.sistrix.com/blog/core-web-vitals-is-a-measurable-ranking-factor/?utm_source=Perf.email&utm_campaign=1c5a924166-Perf+Email+%2384&utm_medium=email&utm_term=0_7cba5dc7bd-1c5a924166-1288835902). So, this week we're going to look at a few different ways you can keep track of your site's own real world Core Web Vitals.

## A Core Web Vitals refresher

If you're reading the term Core Web Vitals for the first time or need a quick reminder of what they are this section is for you.

Put simply, Core Web Vitals are a set of metrics that aim to quantify real-world user experiences across the web. They measure page interactivity, content loading, and content stability during page load. The three metrics that form Core Web Vitals are:

- **Largest Contentful Paint (LCP)**: A timing of how long it takes for the largest above-the-fold element to be painted on screen. This is usually a hero image/video or large text block.
- **First Input Delay (FID):** Measures the time it takes before the browser can react to a user input (like a click or tap).
- **Cumulative Layout Shift (CLS):** Indicates the movement of visible elements as the user loads and interacts with the page. You know when you start reading an article, then an ad loads above it & all the content get pushed down? CLS measures things like that.

Core Web Vitals are "a Google thing". They are metrics that were developed by teams at Google a few years ago. Now, these metrics have become part of Google's search ranking algorithm.

## Real user monitoring

As the name implies, real user monitoring (RUM) collects data from actual user sessions on a website. Since they capture real world usage, RUM is considered the gold-standard when it comes performance monitoring.

RUM data can help expose issues that might not be picked up in synthetic (also called lab or simulated) testing. RUM data can also help serve as a guide when setting up automated performance testing as part of a workflow.

Most importantly when looking through the lens of Core Web Vitals, RUM data is what Google feeds into their search ranking algorithm. So how can your site use RUM?

### Google Search Console

In the Experience section of Google Search Console, you'll find a section entirely focused on your site's Core Web Vitals. This section uses data from the Chrome User Experience (CrUX) Report to present a breakdown of how the indexed URLs of a website perform for the Core Web Vitals metrics.

CrUX data is updated monthly. So, if you want more immediate feedback on any website changes you've made then you'll need wait (or use one of the other sources mentioned below). Also, if your site is new, or doesn't get that much traffic to have a meaningful dataset, then you won't see anything in this tab.

That said, this using Google Search Console to keep track of your site's Core Web Vitals is a free, easy way to get started.

### Treo site speed report

Another really great way to surface CrUX data is the Treo Site Speed report ([https://treo.sh/sitespeed](https://treo.sh/sitespeed)). This free report presents a nice visual breakdown of a site's Core Web Vitals. It's worth noting that the data here is shown at the origin level (e.g. your domain - [www.fershad.com](http://www.fershad.com) in my case). It lets you quickly get a view of the overall health of your website.

At the very top of the report, you'll see Core Web Vitals data for your site aggregated over the past 28 days. This is a great way to get more timely feedback on changes made on your site. This is the same data you'll see if you run a test on [Google's PageSpeed Insights tool](https://developers.google.com/speed/pagespeed/insights/).

Treo's site speed report is free, and you can sign up to get updated when new CrUX data is available for your website. They also have paid services for more regular and detailed monitoring.

### Paid RUM services

There are a host of services that allow you to capture RUM data beyond just Core Web Vitals. They don't come cheap. But when you consider the return on investment that can be gain from web performance improvements, they are worth considering. If you don't know the business gains web performance improvements can bring, I urge you to check out [https://wpostats.com/](https://wpostats.com/).

Here are a few options you can consider and compare:

- Speedcurve: [https://www.speedcurve.com/](https://www.speedcurve.com/)​
- Pingdom: [https://www.pingdom.com/](https://www.pingdom.com/)​
- Sentry: [https://sentry.io/](https://sentry.io/)​
- Datadog: [https://www.datadoghq.com/](https://www.datadoghq.com/)​

### Roll your own script

If you want to keep things in-house, you can write your own script to send custom performance related events to your website analytics platform. Using the browser's own [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance), or libraries like [Perfume.js](https://zizzamia.github.io/perfume/) you can capture a host of data on how your website (and individual pages) perform in the wild.

If you want to focus on Core Web Vitals alone, the Chrome team have released a [Web Vitals library](https://github.com/GoogleChrome/web-vitals) which can be integrated into a website. There are also instructions on how to send this data to analytics endpoints.
