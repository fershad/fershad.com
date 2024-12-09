---
title: Hidden in plain sight
published: 2022/05/26
permalink:  /writing/hidden-in-plain-sight/
summary: >-
  I was recently shown a code snippet that that a designer friend implemented on
  a website to combat flash of unstyled text (FOUT). It did so in a way that
  could possibly have negative impacts on a visitor’s page loading experience.
---

This post looks at a small code snippet that I was shown during a conversation about eliminating flash of unstyled text (FOUT) from a page. It does that, but actually exposes the site to some pretty nasty performance issues.

On a recent call I was shown the below code snippet by a designer.

<!-- markdownlint-disable -->
{% codeToHtml "html" %}
<script>
    var Webflow = Webflow || [];
    Webflow.push(function () {
        $('html').addClass('webflow-loaded')
    });
</script>

<style>
.wf-loading \* {
    opacity: 0;
}
</style>
{% endcodeToHtml %}
<!-- markdownlint-enable -->

Upon seeing it, I broke out into a cold sweat. The designer went on to explain how they were looking for a way to prevent text visually changing as the page was loading (FOUT), and had found this code snippet recommended on a forum. It did the trick. Happy days.

But this code also sets their site up for the possibility of not showing any content at all. Let’s take a look at what it’s doing, and why it’s not so great from a performance perspective.

## An invisibility cloak

To understand what’s going on we’ll start from the bottom.

<!-- markdownlint-disable -->
{% codeToHtml "html" %}
<style>
    .wf-loading * {
        opacity: 0;
    }
</style>
{% endcodeToHtml %}
<!-- markdownlint-enable -->

You might be able to take a guess at what this small style block is doing. It tells the browser that anything (`*`) that lives inside a parent element with a class of `.wf-loading` should be hidden (`opacity: 0`).

On the page we were looking at, the `.wf-loading` class was applied to the `<html>` tag. On a web page, _everything_ is a child of the `<html>` tag. The code above was effectively telling the browser _“just hide everything on the page”._

## The great reveal. Maybe

The script block above the style tag is where the magic happens.

<!-- markdownlint-disable -->
{% codeToHtml "html" %}
<script>
    var Webflow = Webflow || [];
    Webflow.push(function () {
        $('html').addClass('webflow-loaded')
    });
</script>
{% endcodeToHtml %}
<!-- markdownlint-enable -->

This block declares a Webflow variable, and then adds a function to it that adds the `webflow-loaded` class to the `<html>` tag on the page. That class will reveal the page by setting `opacity: 1` for the all children of the `<html>` tag.

As an aside, this is a very similar technique to what most A-B testing services use. That’s a topic for another time, but it’s worth being aware of how they might be impacting your site’s performance as well.

## What could possibly go wrong?

When the page is loaded on a fast, desktop internet connection, things go pretty smoothly. Largest Contentful Paint fires well within the threshold for a “Good” Core Web Vitals score.

Things start getting a little hairy when moving over to mobile though. On a 4G network, testing on a Motorola G4, the Largest Contentful Paint time jumps out to over 5 seconds. On a 3G connection that goes up to almost 9 seconds.

That’s 9 seconds during which the user is presented with no content, despite the fact that most of the page’s CSS, fonts, and images have already been downloaded. This is because the browser is waiting for the Webflow variable to be declared. This declaration relies on the Webflow JavaScript file being downloaded and parsed.

### “All your users are non-JS while they’re downloading your **JS.”**

So said Jake Archibald. And how true that is. As I touched on just above, while the user is waiting for the JavaScript package to finish downloading and executing, they’re looking at a plain white screen for close to 10 seconds.

Research suggests 53% of visits are likely to be abandoned if pages take longer than 3 seconds to load ([Google, 2016](https://blog.google/products/admanager/the-need-for-mobile-speed/)). That 10 second window could be seeing hundreds, or thousands, of visitors abandoning the site.

## What could be done to fix this?

First up, I’d remove the script entirely. Browsers do an amazing job of loading websites, and we should embrace that (plus give them a bit of help occasionally). You’d be surprised how often performance issues are a result of us trying to be too clever for our own good.

But okay, there’s still the desire on the part of the client to reduce/remove FOUT on the page. That could be tackled in a few different ways. We touched on a few during the [series on web font optimisation](https://optimised.email/series/optimising-web-fonts/) last year.

1. Use system fonts for most (or all) of the text content.
2. Limit the number of custom web fonts that are used.
3. Subset the web fonts you’re using. This removes characters that are surplus to requirements, and brings down the file size.
4. Use the `font-display: optional` declaration. This instructs the browser to hide text for 100ms and then load the web font only if it's available. If it's not ready, then the browser will use a fallback font instead for that page view. The custom font will be saved in cache, ready for the next time it’s needed.
5. Set an appropriate fallback font that most closely matches the custom font you’re using.

Using one, or a combination of, the techniques above we can _minimise_ FOUT on the page while also ensuring users are presented with content as soon as possible during page load.
