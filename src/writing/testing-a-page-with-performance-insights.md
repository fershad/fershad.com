---
title: Testing a page with Performance Insights
published: 2022/07/21
permalink:  /writing/testing-a-page-with-performance-insights/
summary: >-
  Performance Insights is a tool by Builder.io (http://builder.io/) which, in
  their words, allows you to learn what improvements can have the greatest
  impact on your site's performance.
---

[Performance Insights](https://www.builder.io/c/performance-insights) is a relatively new entrant in the website performance tooling space. Created by the team at [Builder.io](http://Builder.io) it takes a slightly different approach to website performance auditing. Rather than presenting a whole swath of data on your site’s current performance, this tool focuses on what improvements you can make and the impact they could have.

## Getting started

Head over to [https://www.builder.io/c/performance-insights](https://www.builder.io/c/performance-insights) and enter in a web page URL. Hit ‘Analyze’ and the tool will start running the page through a series of emulated mobile Google Lighthouse tests.

## The results

Once the tests have been run, you’ll be presented with a set of five cards showing you the results of the tests.

![Results showing current performance and potential optimisations.](../../public/img/blog/3b899f4252d0ed7eec31bf6195cfe42317559257-1610x703.png "Results shown on Performance Insights")

Only the first card, titled “**Current**”, shows you information about how your website is performing at this point in time. The other four cards show you the _potential_ impact of optimising different parts of your website’s content.

All the scores shown are the Lighthouse Performance Score. While this score isn’t the most representative web performance metric, in this case it does help to provide a nice and neat guide.

Personally, I find the way these results are presented to be very useful when starting out an audit on a website. They allow me to see where I can start looking to potentially find some quick wins. More and more I’ve found myself checking Performance Insights first, before diving into more detailed tools like WebPageTest.

## Suggested improvements

Below the results, you’ll find a section with suggested improvements. To be honest, I don’t really scroll down this far when using Performance Insights.

In this section you’ll find a brief explanation about the suggested improvement, and some related libraries and tools you can use. Suggestions don’t appear to be customised based on your results, other than highlighting any high impact areas to look at.

Since Performance Insights is still in beta, I’m hopeful there’ll be a bit more work done to present suggested improvements that are relevant to your site’s results, and/or the tooling you use to build your site (improvements for a WordPress site _could_ differ from those for a Gatsby site for example).
