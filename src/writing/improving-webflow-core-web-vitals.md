---
title: Improving Webflow Core Web Vitals
published: 2021/11/20
permalink:  /writing/improving-webflow-core-web-vitals/
summary: >-
  Webflow makes it easy for content creators and marketing teams to build
  stylish websites fast. But this can come with the risk to publishing a site
  with poor Core Web Vitals. This post covers some of the things to look out for
  when building with Webflow.
---

I've recently spent some time diving into a few sites made with [Webflow](https://webflow.com). If you've never heard of Webflow it is an online service for building and hosting websites. At its heart is a visual editing interface that allows anyone to design, build, and launch a website. Webflow also has CMS and e-commerce features.

Webflow makes it remarkably easy to quickly spin up snappy landing pages, websites, and blogs. But with the ease of use also comes the potential for things to get out of hand, and for Core Web Vitals to suffer.

In this post, I'll go over a few of the things to keep in mind to help with Core Web Vitals when building a site on Webflow.

## First, an observation

Webflow has good caching out of the box. It uses hashes to create unique filenames for stylesheets, scripts, and other content that is created in the editor. Caching these files means that they'll be available locally on the next page a user navigates to (or when they next return to the site).

This is important, since Webflow uses global CSS and JavaScript files. These files contain all the styles and scripts required for the entire site. It's a bummer that they are hosted on Webflow's own assets CDN, meaning the first time they're requested we do have to go through DNS lookup and TLS negotiation (see rows 2 & 4 of the waterfall chart below). But, the caching helps speed up subsequent navigation & return visits.

It's worth noting that Webflow's caching rules appear to set cache `max-age` of 1 day for CSS & JS files, and 1 year for image files. I wasn't able to find `cache-control` headers to video.

![Truncated waterfall showing a Webflow site loading global JS and CSS files from the assets-global CDN.](../../public/img/blog/5cc0e68d1f229bab8a42557efbfb8303c4822a94-1080x567.jpg "Truncated waterfall showing a Webflow site loading global JS and CSS files from the assets-global CDN.")

## Bring your own fonts

**Helps with:** Cumulative Layout Shift (CLS)

Webflow allows you pull in fonts from Google Fonts or Adobe Fonts with just a couple of clicks. A couple of sites I've looked into do just that. You can see the initial request on row 3 of the waterfall above. That JS file, then goes off and requests a CSS file which then loads the fonts needed for the page. Below is a truncated waterfall chart of the process.

![Truncated waterfall chart showing Google fonts loading on Webflow.](../../public/img/blog/df5eb4badcbdb938e2fd18732ef86d0fdaa2b801-938x306.png "Truncated waterfall chart showing Google fonts loading on Webflow.")

That's three third-party domain we're having to hit to get the first font file downloaded. There's a couple of ways we can tackle this:

### Option 1: Preconnect to font domains

We _could_ use `preconnect` to warm up the `fonts.googleapis` and `fonts.gstatic` connections (rows 18 & 29 respectively). This would bring forward DNS lookup and TLS negotiation and allow us to start requesting the CSS & font files a bit sooner.

You'd do this by adding the code snippets below as a custom code block in the Head of your page. Here's [a Webflow tutorial](https://university.webflow.com/lesson/custom-code-in-the-head-and-body-tags#head-code) on how to do that.

<!-- markdownlint-disable -->
{% codeToHtml "html" %}
    <!-- preconnect to google font apis -->
    <link rel="preconnect" href="https://fonts.googleapis.com/" crossorigin>
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
{% endcodeToHtml %}
<!-- markdownlint-enable -->

### Option 2: Upload your own fonts

This is the option I'd personally recommend. In part because it gives you more control over the fonts you use. And, in part because the extra effort involved might make you think twice about whether you really need that custom font in the first place.

Let's say you want to use the Merriweather font family from Google Fonts. Here is how you'd go about uploading that to your site.

- **Download the font files** \- Head over to Google Fonts, select the font weights & styles you need, and then download them. Google will give you TTF formats for each.
- **Optimise the fonts** - There's many websites & tools out there for font optimisation. We'll use Fontie and keep things very simple - removing unused characters from the font files and changing them to modern formats. Below is a sample of the settings to set in Fontie.
    - **Formats:** Check only `Web Open Font Format` (WOFF) and `Web Open Font Format 2` (WOFF2).
    - **Subsetting:** If your site is in English only, check `Include Latin characters` and `Include HTML entities`. You can choose any other you might feel apply for multi-lingual sites.
    - **Hinting:** `Keep existing hinting`
    - **Styleheets:** Uncheck `Generate CSS @font-face`
    - Click **Generate & download your @font-face package**. After a short time, a .zip file will be downloaded containing the new fonts.

Next, we have to upload the new fonts we've created to Webflow. You can find out how to do so in [this tutorial](https://university.webflow.com/lesson/custom-fonts​).

When uploading the custom fonts, be sure to upload both the `WOFF` and `WOFF2` versions of the font files, and make sure they have the same Font Family name.

{% callout "Fallback font" %}
Setting a fallback font tells the browser what font to use while a) your custom font downloads, or b) if the custom font isn't available. Select a fallback that closely matches the style of your custom font. Here's [a Webflow tutorial](https://university.webflow.com/lesson/custom-fonts#defining-fallback-fonts) with more information.
{% endcallout %}

{% callout "Font display" %}
When using custom web fonts, we need to tell the browser what to do while the fonts are downloading. That is where the Font Display property comes into play. We have a few choices when setting font display, but the most common are:

- **Swap:** The browser will show a fallback font while the custom font is downloaded. It will then swap in the custom font when it is ready. This can lead to some jank on the page as fonts are swapped.
- **Optional:** The browser will give the custom font a 100 millisecond window to download. If it is not ready in that time, the browser will show a fallback font instead. The custom font is stored in cache, ready to use on the next page view.

I suggest you use the Optional property, since it will ensure a faster page load (LCP) the first time a visitor comes to your site. Subsequent page loads will use your custom font.
{% endcallout %}

## Take a moment for images

**Helps with:** Cumulative Layout Shift (CLS) & Largest Contentful Paint (LCP)

### When (and when not) to lazy-load

Lazy-loading helps us tell the browser to defer the downloading of certain images until just before they're going to be seen. It helps ensure that our page load (and LCP critical path) is not clogged up by the downloading of images that are waaaaay down the page.

Webflow lets you set one of three options for image loading. Here's how I recommend you should approach deciding which one to select for each image:

- **Lazy:** Select this for any image that's _definitely_ off-screen when a page loads (on desktop or mobile).
- **Eager:** Set this for any large images that are going to be visible when the page loads. These will most likely be your LCP element.
- **Auto:** Set this for smaller images that are visible when the page loads (company logos for example).

![Webflow's image settings interface.](../../public/img/blog/2273f16e924347d6a7e055cf6df0ea71de235e63-747x416.png "Webflow's image settings interface.")

### Set width and height

**_I cannot stress how important this is._** Setting the width and height attributes for images helps the browser guestimate how much space it should reserve for images in the layout. This prevents content from shifting around, especially as lazy-loaded images are downloaded and displayed.

You can set the height and width based on your design if you want (e.g. if you know an image will always be 300 x 300px then you can set that). Otherwise, use the dimensions of the original image you uploaded as a guide.

{% callout "Make images accessible" %}
While we're on image settings, please also take a moment to explicitly set Alt Text for images you upload. This helps make your images accessible to people browsing the web with assistive technologies. [This video from HTTP 203](https://www.youtube.com/watch?v=flf2vS0IoRs) is a good guide to setting image alt text.
{% endcallout %}

### Image optimisation before uploading

At the time of writing, Webflow doesn't have support for modern image formats like WebP or AVIF. I'm sure they're working on it, and it will be a huge win for Webflow sites when this is available.

In the meantime, it's advisable to spend some time optimising images before uploading them to Webflow. This helps to ensure the images on your site are as small as they could be, before Webflow applies further optimisations such as image resizing. Here's a few tools (of the many available) that you can use:

- [**Compressor.io**](http://compressor.io/)​
- [**ImageOptim**](https://imageoptim.com/mac) - App for Mac
- [**Optimizilla**](https://imagecompressor.com/)​
- [**Imgbot.ai**](https://www.imgbot.ai/compress-image)​
- [**Squoosh**](https://squoosh.app/) - Use for single images, offers fine-grain control.

{% callout "WebP with JavaScript trickery" %}
It should be possible to use custom JavaScript code to go through a page & apply the [Cloudinary Fetch API](https://cloudinary.com/documentation/fetch_remote_images) (or similar) to image URLs as a means to deliver WebP images to browsers that support it. Since this would run on page load, you'd want to only apply to images that are lazy-loaded (or that are definitely off-screen).

Another alternative would be to use an edge worker (Cloudflare Worker for example) to rewrite image URLs before sending the page back to the client.

⚠️ In theory these should work, but I have yet to try it on a real site. Happy if anyone wants to volunteer their site as a test subject 😉.
{% endcallout %}

### Background video instead of GIFs

If your site is using GIFs for animated content, then swap them out for a background video component. One site I looked at had a 1.9MB animated GIF on their homepage. Converting this to an MP4 video and uploading it as a background video component saw that size come down to 20kB!

Here's a guide from Webflow on [how to use background video](https://university.webflow.com/lesson/background-styles-overview#background-video).

## Go easy on animations & interactions

**Helps with:** Largest Contentful Paint (LCP) & First Input Delay (FID)

The animations and interactions on Webflow sites are mostly JavaScript driven. So the more you use, the larger your site's JavaScript file will be. This has a cascading impact, since a larger file takes the browser longer to download and parse. There's the potential here to block the rendering of LCP elements on a page. Equally as important is the chance that JavaScript execution might prevent user interactions, impacting your site's FID metric.

It's worth regularly checking your site for unused interactions which can be removed. Webflow makes it [really easy to do this](https://webflow.com/feature/clean-up-unused-interactions). You can [do the same for styles](https://university.webflow.com/lesson/style-manager#deleting-all-unused-styles-in-the-style-manager) as well.

## Speed up key site navigation

**Helps with:** Largest Contentful Paint (LCP)

Slow loading pages can confuse, frustrate, and deter users. So, it is even more important that pages on our site which have key user actions are optimised to render and be usable fast.

One way of doing this is by hinting to the browser where we expect the user to navigate next. The browser can then start preparing resources for that page once it's done with the page the visitor is currently on.

{% callout "Use with care" %}
This should be used very selectively since it consumes additional bandwidth which could come at a cost to the end user.
{% endcallout %}

Within the [Link Settings menu in Webflow](https://university.webflow.com/lesson/link-settings) there are three link loading options available to us:

- **Default**: Does nothing until the link is clicked.
- **Prefetch**: The browser will start downloading resources for the linked page once the current one has finished rendering.
- **Prerender**: The browser will start downloading resources for the linked page immediately.

For most links you should leave this property set as **Default**. For links to important action pages you can use **Prefetch**.

{% callout "Resist the temptation" %}
I would almost always advise against using Prerender. With Webflow's caching in place, Prefetch should be enough to get you fast page navigations to critical routes.
{% endcallout %}

These tips should get you a long way to having a Webflow site that meets Google's Core Web Vitals best practice thresholds.
