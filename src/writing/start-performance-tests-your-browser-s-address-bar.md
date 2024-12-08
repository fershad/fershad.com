---
title: Start performance tests from your browser's address bar
published: 2022/02/10
permalink:  /writing/start-performance-tests-your-browser-s-address-bar/
summary: >-
  A small life hack to help get performance tests started faster with some handy
  address bar shortcuts in your browser.
---

Sometimes you land on a web page and just feel compelled to fire up a quick performance test. Well, okay maybe that’s just me. Anyway, in recent months I’ve been using the custom search engine feature in my browser to make this process just a bit quicker.

In the past, I would open up another browser tab, go to the URL for the testing tool I want to use, and then start the process of running a test on the page I want to examine. The first step hasn’t changed. But now I can simply type a keyword into my address bar, hit the `TAB` key and paste in the URL of the page I want to search. It’s a small thing that just helps to make the process to kicking off multiple performance tests on different tools just that little bit quicker.

Here’s how to set it up for yourself, and a few of the search queries that I regularly use.

## Setting up

The steps I’ll be going through below are for Microsoft Edge (Chromium), but you can do the same thing in [Google Chrome](https://support.google.com/chrome/answer/95426) & [Firefox](https://support.mozilla.org/en-US/kb/add-or-remove-search-engine-firefox) browsers.

1. In Settings, navigate to the “_Manage search engines_” section.
    1. You can either search for it, or find it in _Privacy, search and services > Address bar and search > Manage search engines_
2. Once there, you can click the `Add` button to setup your own search engine. You’ll see the following fields:
    1. **Search engine**: Any name you want to use to keep it memorable.
    2. **Keyword:** What you’ll type in the address bar to trigger this search engine.
    3. **permalink:** The URL that will be requested when a search is made. The `%s` placeholder is used in place of your search query.

## Web performance testing search engines

Here are some of the web performance search engines that I have set up. You can set the search engine & keyword fields to whatever you want.

If you use a search engine that isn’t listed below, feel free to [get in touch with me](mailto:itsfish@fershad.com). I’d be happy to check it out and add it to the collection.

### Treo Site Speed Report

Get CrUX data for a domain using Treo’s free site speed report.

1. Search engine: `Treo`
2. Keyword: `@treo`
3. permalink:  `https://treo.sh/sitespeed/%s`​

To use this search engine, type `@treo` into the address bar and press the TAB key. Enter the **domain** (e.g. <www.fershad.com>) you want query, and press enter.

### PageSpeed Insights

Start a test on a URL with Google PageSpeed Insights.

1. Search engine: `PageSpeed Insights`
2. Keyword: `@psi`
3. permalink:  `https://developers.google.com/speed/pagespeed/insights/?url=%s`​

To use this search engine, type `@psi` into the address bar and press the TAB key. Enter the **URL** (e.g. <https://www.fershad.com/writing>) you want query, and press enter.

### Calibre Core Web Vitals Checker

Calibre’s Core Web Vitals Checker allows you to surface CrUX data for a domain.

1. Search engine: `Calibre (Domain)`
2. Keyword: `@calibre`
3. permalink:  `https://calibreapp.com/tools/core-web-vitals-checker/%s?context=origin`​

To use this search engine, type `@calibre` into the address bar and press the TAB key. Enter the **domain** (e.g. <www.fershad.com>) you want query, and press enter.

### The Green Web Foundation

Check if your site is hosted on a green web host using the Green Web Foundation’s online checker.

1. Search engine: `Green Web`
2. Keyword: `@greenweb`
3. permalink:  `https://www.thegreenwebfoundation.org/green-web-check?url=%s`​

To use this search engine, type `@greenweb` into the address bar and press the TAB key. Enter the **URL** (e.g. <https://www.fershad.com/writing>) you want query, and press enter.

### WebPageTest

Check if your site is hosted on a green web host using the Green Web Foundation’s online checker.

1. Search engine: `Web Page Test`
2. Keyword: `@wpt`
3. permalink:  `https://webpagetest.org/?url=%s`​

To use this search engine, type `@wpt` into the address bar and press the TAB key. Enter the **URL** (e.g. <https://www.fershad.com/writing>) you want query, and press enter.

The URL above will setup a WebPageTest simple configuration. If you want to start with the advanced configuration open, use this permalink:  `https://webpagetest.org/?url=%s&advanced`
