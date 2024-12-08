---
title: Render-blocking resources
published: 2022/02/18
---

When looking to optimise for paint metrics (First and Largest Contentful Paint for example), we’re almost certainly going to encounter render-blocking resources. In this post I’ll cover what they are, and some general tips on how to mitigate their impact on page performance.

## What is a render-blocking resource?

The name says it all, to be honest. Render-blocking resources are like a roadblock for the browser as it goes about painting web page content to the screen. When encountering render-blocking resources, the browser waits until the code has been completely parsed and executed before it can continue rendering content in the viewport.

### Common render-blocking resources

The most common forms of render-blocking resources are JavaScript and CSS requests that are present in the `HEAD` of a page. This includes inline code (found in `<script>` and `<style>` tags) as well as linked resources (using the `<link>` tag). Third-party requests and tag managers can also be a source of render-blocking requests.

### CSS is _always_ render-blocking

Regardless of what it’s doing at the time, the moment a browser encounters a CSS resource it will stop to download and parse the CSS. Once that’s out the way the browser will continue working on rendering content on the screen.

CSS [can be loaded asynchronously](https://www.filamentgroup.com/lab/load-css-simpler/) to avoid render-blocking though if not carefully managed can result in unstyled content being shown before the stylesheet has been parsed.

### JavaScript is _occasionally_ render-blocking

When the browser finds a synchronous script on the page it will pause and fetch the file (if it’s called via a `<link>` tag), then parse and finally execute the code.

Asynchronous JavaScript won’t be render blocking, however the browser will execute asynchronous requests as soon as they finish downloading. So, there is a chance that asynchronous script execution gets in the way of other processes that are important to your page load.

### CSS will block synchronous JavaScript

Because JavaScript can be used to manipulate CSS, the browser will first try to download and parse any synchronous CSS it has already encountered before coming across a JavaScript resource.

<!-- markdownlint-disable -->
{% codeToHtml "html" %}
    <!-- CSS will download and parse first -->
    <link rel="stylesheet" href="/css/my-styles.css" />
    <script src="/js/important-file.js"></script>

    <!-- JS will download, parse and execute first -->
    <script src="/js/important-file.js"></script>
    <link rel="stylesheet" href="/css/my-styles.css" />

    <!-- JS will start downloading in parallel with the CSS file -->
    <script async src="/js/important-file.js"></script>
    <link rel="stylesheet" href="/css/my-styles.css" />
{% endcodeToHtml %}
<!-- markdownlint-enable -->

## How can you find render-blocking resources?

### PageSpeed Insights

If you’ve [tested a page with Google’s PageSpeed Insights tool](https://fershad.com/writing/testing-a-web-page-with-pagespeed-insights/), then you’ll be able to identify any render-blockng resources in the **Opportunities** section of the test results.

![PageSpeed Insights highlighting render-blocking resources](../../public/img/blog/1088f5900374c44e97a59d7fc48a2b452ee171ae-1080x567.png "PageSpeed Insights highlighting render-blocking resources")

### WebPageTest

The WebPageTest waterfall chart surfaces render-blocking resources, and marks the request row with an orange circle containing a white cross. You can see that in rows 2 and 4 of the truncated waterfall chart below.

![WebPageTest waterfall chart showing render-blocking requests.](../../public/img/blog/6b4e520760ec82859cea3f260372b46e3409df29-826x433.png "WebPageTest waterfall chart showing render-blocking requests.")

## Reducing the impact of render-blocking resources

### Reduce the size of CSS

Since CSS will always be render blocking, the best way to reduce its impact on performance is to reduce the amount of CSS you’re using.

- Are you able to inline critical CSS on a page, and load the rest later?
- Avoid using `@import` statements in your CSS.
- Can you self-host Google Fonts? This eliminates the outbound request for the font stylesheet.
- If you’re using an icon font, try replacing that with SVGs.

### Reduce the size of JS

Reducing the impact of JavaScript is a bit trickier. As with CSS, reducing the amount you’re using is a very good start.

- Can you use [code-splitting](https://developer.mozilla.org/en-US/docs/Glossary/Code_splitting) and [tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) in your build process?
- Can you use the [import on interaction pattern](https://www.patterns.dev/posts/import-on-interaction/)?
- Defer any code you don’t need right away, and load the rest asynchronously.

### Execute code off the main thread

Since JavaScript is single-threaded, execution of scripts gets queued up one after another. To get around this, we can look to move non-essential tasks off the main thread, freeing it up to handle code that is critical to rendering initial page content. There are a few ways to move code execution off the main thread. Some use other processors on the device, while others don’t even send down the code in the first place.

#### Move A/B testing to the server

Client-side A/B testing is a recipe for poor rendering performance. This is because the script to run the A/B test must first download, before it is then parsed an executed. As a result, content is hidden from the user until code execution is completed.

Moving A/B testing to the server prevents this entirely. If you are server-side rendering you site then you can perform all the heavy lifting before sending the page back to the browser. Another approach is to use edge compute like [Cloudflare Workers to perform the A/B tests](https://philipwalton.com/articles/performant-a-b-testing-with-cloudflare-workers/).

#### Use a web worker

Third-party code like analytics, ads, and other tracking scripts probably aren’t critical to rendering content on your page. Sure, they might be important for your business, but you can defer their loading until after the rest of the page’s content has been loaded.

Alternately, you can move the execution of these scripts off the main thread using web workers This is an area I’ve got to explore more, so there could be a post about it later in the year. If you want to learn more, Surma has a [great post & talk](https://web.dev/off-main-thread/) about the topic. There are also tools like [Partytown](https://github.com/BuilderIO/partytown) & [Cloudflare’s Zaraz](https://developers.cloudflare.com/zaraz/) which are worth checking out.
