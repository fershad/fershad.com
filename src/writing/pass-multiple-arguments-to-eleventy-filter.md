---
title: Passing multiple arguments to an Eleventy custom filter
published: 2019/09/16
---

While working on a [recent project](https://www.fershad.com/work/rwc-2019-fixtures-kanban/), I came across a small problem. I needed to convert an event time from UTC to a particular time zone. I was building my website project using the Eleventy static site generator, so I felt that a custom filter would be the best solution to this problem.

The filter I made would take the UTC event time and the time zone for conversion as variables. Using javascript's toLocaleString() function, it would export a converted time. I was using Liquid as my templating engine and so first turned to Shopify's docs for a possible solution to the problem of passing multiple variables to a filter. That didn't turn up anything, so I started looking through Eleventy's docs. After quite a bit of digging through I [found the answer](https://www.11ty.io/docs/languages/liquid/#multiple-filter-arguments) hidden away in the Liquid templating section of the docs.

In the end, you pass the first variable to the filter as you normally would, and all subsequent variables after the filter is declared. It looks like this:

{% codeToHtml js, ".eleventy.js" %}
<!-- markdownlint-disable -->
eleventyConfig.addFilter("changeTime", require("./filters/time.js") );
<!-- markdownlint-enable -->
{% endcodeToHtml %}

{% codeToHtml js, "time.js" %}
<!-- markdownlint-disable -->
module.exports = function (match, zone) {
  // ... stuff happens here
};
<!-- markdownlint-enable -->
{% endcodeToHtml %}

{% codeToHtml html, "zones.html" %}
<!-- markdownlint-disable -->
    <p>{{ match.datetime | changeTime: zone | date: "%H:%M" }}</p>
<!-- markdownlint-enable -->
{% endcodeToHtml %}

One interesting aside is that you can join filters to each other. In the example above the changeTime filter is run first, and then the result of that is formatted using Liquid's date filter. Pretty neat!