---
title: Quick Performance Audit - Taiwan COVID Vaccination Website
published: 2021/08/30
permalink:  /writing/quick-performance-audit-taiwan-covid-vaccination-website/
summary: >-
  Taiwan's COVID-19 vaccination website is integral to the government's vaccine
  rollout plans. This post is a quick website performance audit of the site.
---

With COVID-19 still spreading around the globe, governments are striving to vaccinate as many of their citizens as possible. Here in Taiwan, vaccine registration and bookings are made through a government website ([https://1922.gov.tw](https://1922.gov.tw)). Members of the public can use that site to 1) register/change their vaccine preference, and 2) book their vaccination when they are eligible.

The website, therefore, gets a lot of traffic. I used it last weekend to update my registration details since I had moved back to the capital, Taipei. While going through the process, I wondered (as you do ...) "what's going on behind the scenes here?". In this post, I'll take a look at how the site stacks up in terms of performance, what it does well and where improvements can be made.

## Background

Taiwan's Covid-19 vaccination registration website is mostly text based, with a few forms for users to input their details. There's likely a bit of client-side validation which requires JavaScript too. Besides that, it's a pretty simple site on the surface. Yet the homepage still transfers over 450 kB when first visited (caching drops this down a bit more than 150 kB for subsequent visits). For a web page of this nature a page weight of nearly 500 kB seems a bit strange. So, what's going on?

### Scope

For the purpose of this quick audit we're only going to look at the homepage ([https://1922.gov.tw](https://1922.gov.tw/)).

### Real user performance

A page like this, which gets a lot of traffic will almost certainly have Chrome User Experience (CrUX) data available. This is data that's collected from Google Chrome users that have usage statistics reporting enabled on their browser. It's not a complete representation of _all_ users by any means, but it's a helpful reference.

There are a few places we can check CrUX data for a site, the easiest being to run the page URL through Google's [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) (PSI) tool. When we run the [https://1922.gov.tw](https://1922.gov.tw) URL through PSI, we're presented with a "Field Data" section at the top of the report. This shows us the CrUX data for the page's Core Web Vitals metrics. At the time of writing here's how the page performed on mobile:

![Screenshot of PageSpeed Insights results for 1922.gov.tw](../../public/img/blog/aba69c430d0a6143a2f883c3251130258277410b-739x247.png)

- **First Contentful Paint (FCP) 1.6s**  
  Good: 80%, Needs improvement: 11%, Poor: 9%
- **Largest Contentful Paint (LCP) 1.5s**  
  Good: 88%, Needs improvement: 5%, Poor: 6%
- **First Input Delay (FID) 11ms**  
  Good: 98%, Needs improvement: 2%, Poor: 0%
- **Cumulative Layout Shift (CLS)**  
  Good: 100%, Needs improvement: 0%, Poor: 0%

Overall, that's pretty good. It's worth remembering, though, that Taiwan is a very well-connected country. High-speed internet access and 4G mobile connectivity are commonplace. Running a (generous) [simulated test on WebPageTest](https://www.notion.so/4af017ea23beb960afc0793f87d3de2b) using an emulated iPhone X & Fast 3G network sees FCP & LCP times get pushed to 2.7s.

The stats above show us that there's some room to improve the Paint related metrics on the web page. We'll get to what can be done to address these shortly. First, let's take a quick look at some of the things that developers behind Taiwan's vaccination registration site have done well.

## A few good notes

### Self-hosting assets

The first thing that struck me when I saw the WebPageTest waterfall chart for the Taiwan COVID Vaccine Website was that every single request was made to the same domain. Every JavaScript, CSS, image, and font file is self-hosted on the [1922.gov.tw](http://1922.gov.tw) domain.

This small step is one of the most impactful web performance measures you can take early in the life of a project. Now granted, it might be that because this is a government website there are some conditions that forced the developers down this path, but it's the right path to be on.

### Caching with Cloudflare

Almost all the requests on the site are served with cache headers. It looks as though Cloudflare is being used to provide a caching layer for the site. This can help ease the load off the website host during times of high traffic. That said, the cache max-age is set to 4 hours (`max-age=14400`). This could be extended, and we'll touch on how later.

## Improving FCP and LCP

What can be done to improve the First & Largest Contentful Paint metrics for [https://1922.gov.tw](https://1922.gov.tw)? Looking at results from PageSpeed Insights as well my browser's developer tools (DevTools) the main area to address is reducing the amount of unused code that's being shipped with the page.

### CSS accounts for 1/4 of total bytes transferred

For a fairly simple looking web page, CSS manages to account for around 25% of the total page weight (122 kB in total). More than 90% of this comes from two CSS files - `icons.css` and `bootstrap.css` (111 kB).

That's a fair chunk of CSS. Looking at the Coverage tab in DevTools shows us that a lot of the code in these two files is unused. 99.9% of the `icon.css` file, and 96.6% of the `bootstrap.css` file are redundant bytes. Not only are these bytes transferred over the network but, since CSS is render blocking, the browser must parse all the code in each file before it can continue rendering the page.

Ideally, we'd like to remove the unused CSS declarations from these files. For a small site like this, they could be added to `<style>` tags in the HTML document itself. In this way, the browser doesn't even need to spend time downloading external CSS files.

{% callout "Savings" %}
The PageSpeed Insights report tells us that removing the unused bytes from these two files would take their size down from 111 kB to just 1.2 kB. This would bring the overall weight of CSS to a more reasonable 11 kB.
{% endcallout %}

### Bootstrap & jQuery

#### Doubling up on Bootstrap

The web page loads two different bootstrap JavaScript files - `bootstrap.min.js` and `bootstrap.bundle.min.js`. I'm not a CSS frameworks guy, and I haven't touched Bootstrap in a very, _very_ long time so I'm not sure what the difference between these two files are. What I do know is that the DevTools coverage report highlights 82.1% and 77.8% of unused code in these files respectively.

Ideally, when working with a framework, you'd like to be able to remove any unused JavaScript code before shipping a site. This is a practice known as _tree shaking_.

It might be that these two bootstrap files include code that's used in other parts of the website. In those cases, you'd instead look to break your code into modules which are loaded as needed.

The developers have also used Bootbox, a Bootstrap plugin for building alerts and dialogs. Bootbox comes in at around 15 kB with only 3 kB being used on the page. Again, tree-shaking might help to remove the unused functions from this file.

#### Replace jQuery with JavaScript

The homepage also loads about 32 kB of jQuery (compressed). This isn't a lot when transferred over the network, but it more than doubles in size after it's downloaded and parsed.

With the advancements in web APIs in recent years, it's worth considering if this jQuery library can be replaced with plain JavaScript code. [You Might Not Need jQuery](http://youmightnotneedjquery.com/) is a handy resource for anyone looking into this.

If moving away from jQuery isn't an option, then using a tool like [jQuery Builder](http://projects.jga.me/jquery-builder/) to create a minified bundle of only the required modules is a good step. A builder is [also available for jQuery UI](https://jqueryui.com/download/).

### Some other small things

- There are four icons/logos that are loaded as PNG images. These could be replaced with inline SVGs instead. They'd then be included in the main HTML file itself and save a few 100ms in download time.
- Likewise, the one icon that is used from the `icon.css` file could be replaced with an inline SVG.
- Cache max-age could be extended to a much longer duration - like a week or month even. If any files are changed, they can be cache busted using a hash or version number.
- The favicon for the site is close to 70 kB! It's an `.ico` file, so looking to provide an SVG alternative for modern browsers to use could bring down the size.
