---
title: A quick guide to easy web performance wins
published: 2020/07/27
---

This post stems from a conversation I had with a good friend of mine last week. We were talking about how to boost website traffic, and conversions. As I explained to him, and as we'll get to in this post, there's more to the game than just fresh, keyword laden content.

Web page performance is one of those things that is easily overlooked when putting together a new landing page, online store, or blog. However, website performance is becoming a [larger metric](https://webmasters.googleblog.com/2018/01/using-page-speed-in-mobile-search.html) within Google’s search ranking algorithm. As a result, optimising websites to be fast for all users (mobile & desktop alike) should be a priority of any new site build. Even if you have an existing website and want to improve your search ranking or conversion rate, web page peformance should form part of any meaningful SEO strategy you have.

Besides the SEO implications, good web page performance is simply _better customer service_. Here are a couple of ways you can look at it:

- Someone has come to your website because they want to find information or want to purchase something. In a physical store you would want to make it as easy as possible for your customer to make that purchase/get that information, right? The same should apply online.
- With more and more people using their mobile phone to surf the web you cannot rely on your visitors having unlimited bandwidth or be running 4G or 5G connections. A lot of people will be on capped data plans, 3G or slower connections, and are likely not using the latest, fastest Apple or Android phone. Serving them a web page that's bloated, processor intensive, or not even optimised for mobile screens leads to a poor customer experience. Heck, the visitor to your site might not come back, and might tell others to avoid your site too.

There's a lot of evidence that shows how even small performance improvements on individual, critical web pages can have a net positive impact on online sales & revenue. I've put one below, and you can find even more at [https://wpostats.com](https://wpostats.com).

> AliExpress reduced load time by 36% and saw a 10.5% increase in orders and a 27% increase in conversion for new customers.

## **Steps you can take to check and improve the performance of your website.**

If you've already got a website, or a in the process of building a new site or landing page, here are a few easy steps you can take to help you improve web page performance. It's worth noting that the list below provides a good place to start and should be easy enough for most people to implement. There's a lot, lot more to web page performance & it's a rabbit hole I'm hoping to get time to dive further down in the months to come.

### 1\. **Get a baseline**

If you've already got a website that you want to optimise it's worth knowing the current performance of the pages on your site. To establish a baseline, I would recommend combining a few tools to give yourself a better overall picture.

- Use [Google's Page Speed Insights](https://developers.google.com/speed/pagespeed/insights/) to see how individual pages perform. The **field data** section shows you how users have experienced your page over the past 28-days, while the **lab data** section gives you a moment-in-time snapshot of your site's performance. I recommend you run this test ~5 times to allow you to get an average of the **lab data** (removing any outliers).
- Run your web page through [GTmetrix test](https://gtmetrix.com/) too. This will give you a wealth of data, but to start with you can focus on the **Page Details** block which shows the **Fully Loaded Time, Total Page Size**, and **Requests**. Again, I'd recommend running this test ~5 times (primarily to account for possible variance in the **Fully Loaded Time**).

### 2\. **Have a look at your page design**

Page design is an easy place to start looking for performance gains. Especially if you're starting a new website or building a landing page from scratch, keeping performance impacts in mind as you do initial designs of your pages will help you start off on the right foot. With Google moving towards [mobile first indexing](https://webmasters.googleblog.com/2020/07/prepare-for-mobile-first-indexing-with.html) across all sites, it's probably worth starting your website design process with the mobile version of your site.

Some design considerations that can impact web page performance are:

- Could you replace a video with an image (especially on mobile)?
- Can you avoid auto-playing a video?
- Do you need a rotating carousel that loads images the user might never see?
- Can you move heavier resources below the fold? (such as videos, large images, sections that rely on JavaScript for interactivity)

### 3\. **Minify your CSS and JavaScript assets**

Minifying assets refers to the process of removing unnecessary characters from code without impacting its functionality. It is considered best practice to minify the CSS and JavaScript assets that are used by your website in production. Minification can reduce file size by as much as 60% in some cases so if you aren't already minifying assets on your page, then this is arguably the easiest area to make significant performance gains.

Minification should be part of your website build process, and there are [many tools that can help](https://developers.google.com/speed/docs/insights/MinifyResources) with this. There are also [VS Code extensions](https://marketplace.visualstudio.com/search?term=minify&target=VSCode&category=Other&sortBy=Relevance) that developers can use to manually minify files.

### 4\. **Optimise the images & videos you use**

#### Images

Images are typically the heaviest resource on any web page. JPEG and PNG images are the most common file types for static images. However, JPEGs and PNGs can be rather large in terms of file size, especially when they are used for the full-width hero images that are common on websites today. To reduce the file size of JPEG and PNG files, consider running them through an image compression service like [Optimizilla](https://imagecompressor.com/). This is a good first step.

WebP is a modern image format for the web that is being [championed by Google](https://developers.google.com/speed/webp). WebP offers [significantly lower file size](https://havecamerawilltravel.com/photographer/webp-website/) compared to traditional image formats, though there are instances where it [might not be optimal](https://siipo.la/blog/is-webp-really-better-than-jpeg). Chrome, Edge & Firefox [all support WebP](https://caniuse.com/#search=webp), and as of July 2020 Safari is almost there too. The good thing is that using the `<picture>` element you can easily use WebP images on your web page, while providing a fallback to traditional image formats on unsupported browsers. Here's some sample code:

{% codeToHtml "html" %}
<!-- markdownlint-disable -->
    <picture>
      <source srcset="yourWebPImage.webp" type="image/webp">
      <source srcset="yourJPEGImage.jpg" type="image/jpeg">
      <img src="yourJPEGImage.jpg" alt="Don't forget ALT text for your images">
    </picture>
<!-- markdownlint-enable -->
{% endcodeToHtml %}

Alternately you can use a service like Cloudinary to host/serve your images. This makes serving images in the right format for any given browser ridiculously easy. There's a lot more detail in this [blog post from the Cloudinary team](https://cloudinary.com/blog/adaptive_browser_based_image_format_delivery), but in summary you can use Cloudinary's `f_auto` flag to do the dirty work for you. That allows the code above to be truncated to:

{% codeToHtml "html" %}
<!-- markdownlint-disable -->
    <img src="https://res.cloudinary.com/demo/image/upload/f_auto/yourJPEGImage.jpg" alt="Don't forget ALT text for your images"/>
<!-- markdownlint-enable -->
{% endcodeToHtml %}

#### Video

The same applies to video. If you're embedding video on your web page, you'll likely have an MP4 version of that video. Just like we have WebP for images, WebM is an alternative, open source, video format that delivers smaller file sizes compared to MP4. To serve up WebM video with a [fallback to MP4 for unsupported browsers](https://caniuse.com/#search=webm) you can use code similar to the below:

{% codeToHtml "html" %}
<!-- markdownlint-disable -->
    <video controls>
      <source src="yourMP4Video.mp4" type="video/mp4">
      <source src="yourWebMVideo.webm" type="video/webm">
      <p>Your browser doesn't support HTML5 video.</p>
    </video>
<!-- markdownlint-enable -->
{% endcodeToHtml %}

### 5\. **Lazy-load content that is below the fold**

#### Images

Lazy-loading images is a term used to describe a technique where images below the fold of a web page are loaded "just in time" as the user scrolls the page. This gives you the potential to slash the initial load time of a web page since you're deferring the downloading of content that's not immediately visible to the visitor. [Implementing lazy-loading](https://web.dev/native-lazy-loading/) is as easy as adding `loading=lazy` to the `<img>` tags on your page. At the time of writing Safari is the only major browser [lacking support](https://caniuse.com/#feat=loading-lazy-attr) for this feature, however the good thing about things like this is that if it's not supported in the browser then the image is simply loaded as normal.

{% callout "Bonus" %}
To avoid "page jank" caused by lazy-loaded images suddenly appearing as the user scrolls it's recommended to use `width` and `height` attributes on your images. Jen Simmons has a good [video explaining this](https://www.youtube.com/watch?v=4-d_SoCHeWE&feature=youtu.be) in detail. Using the `height` and `width` attributes gives the browser an indication of how much space to set aside for the image before it is downloaded. CSS `aspect-ratio` should be a more elegant solution for this, though [support is still limited](https://caniuse.com/#search=aspect-ratio).
{% endcallout %}

#### Video

Just like images, videos can also be lazy-loaded though the technique to do so differs. For most cases in which video playback is initiated by the user you can use the below code:

{% codeToHtml "html" %}
<!-- markdownlint-disable -->
    <video controls preload="none" poster="videoCoverImage.jpg">
      <source src="yourWebMVideo.webm" type="video/webm">
      <source src="yourMP4Video.mp4" type="video/mp4">
    </video>
<!-- markdownlint-enable -->
{% endcodeToHtml %}

By setting `preload="none"` you are telling the browser not to download any video data until the user plays the video. With this in place we use the poster attribute to give the browser a placeholder image to display in place of the video until content is downloaded/playback starts. Jeremy Wagner & Rachel Andrew dive into this a bit deeper [in this article](https://web.dev/lazy-loading-video/).

{% callout "Bonus" %}
Lazy-loading `iframe` elements is also now [supported in all major browsers](https://caniuse.com/#feat=loading-lazy-attr) except Safari. Just like images you can add `loading=lazy` to an `<iframe>` tag to enable this feature. This means you can defer loading of embedded YouTube content until the user gets to that part of the page. Addy Osmani has a few other great [case studies in this article](https://web.dev/iframe-lazy-loading/).
{% endcallout %}

### 6\. **Delay loading external fonts**

Using web fonts is common practice across the web these days. Most of the time fonts are fetched from third-party services like Google Fonts. This results in more cross-origin network requests for the browser, and if there's a delay in getting a response back it can also result in text on the page not being rendered. In most cases text is a pretty critical part of a web page. There are a few methods that can be used for better font loading, which result in better perceived loading times for web page visitors.

The first method is to look at whether you really need to use a web font, or custom font, at all. Could you simply use common system fonts for your website? You can add a range of common system fonts such as `font-family: system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;` which covers standard fonts on Mac and Windows.

If you want to use a custom font, then you can tell the browser to load fallback fonts first and swap in the custom font when it's downloaded. To do this you can use the `font-display: swap;` CSS property in your code. If you'd rather not have fonts swapping after the user may have started reading the page, then you can look into [using other values](https://css-tricks.com/almanac/properties/f/font-display/) such as fallback or optional instead.

One more trick you can use is to a combination of link `preconnect` and `preload` to make an early connection to third-party font sources, and then to download the font stylesheet asynchronously as the page loads. Harry Roberts goes into this in much [greater detail on his website](https://csswizardry.com/2020/05/the-fastest-google-fonts/). In summary what we're looking to do here is:

1. Preconnect to a third-party service like Google fonts. This will kick-off the communication stream between our site and the third-party.
2. We then preload the font stylesheet. In doing this we download the stylesheet from the third-party asynchronously (it doesn't stop the rest of the page from loading).

- Since [browser support for preload](https://caniuse.com/#search=preload) is not still not complete, we use [a trick from Fillament Group](https://www.filamentgroup.com/lab/load-css-simpler/) that achieves a similar result as a fallback.

Putting these together we get a code sample similar to the below:

{% codeToHtml "html" %}
<!-- markdownlint-disable -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" media="print" onload="this.media='all'" />
<!-- markdownlint-enable -->
{% endcodeToHtml %}

### 7\. **Check third-party resources you load on the page**

Third-party resources are things that you load onto your website that are hosted on other domains. Normally these take the shape of tracking and analytics scripts, customer service features, or JavaScript libraries. Each request to a third-party takes time and can adversely impact the loading of your page. What's even worse is that if the third-party is having network issues you may be waiting an incredibly long time for a response and your page load might even timeout. While you can use the `preconnect` and `preload` techniques mentioned above, there are some other strategies you can also use when dealing with third-party resources.

The first thing to do is consider whether you even need the resource at all. Sometimes analytics scripts are added to a page as part of a test or campaign, then just left there. It's good practice to audit your sites on a regular basis to pick up any zombie resources that might have been left lying around.

The next consideration is whether the asset that you're fetching from the third-party could be self-hosted instead. Say you're fetching a version of jQuery that's stored on a Content Delivery Network (CDN). Yes there are some benefits to this approach, but there are [also several risks](https://csswizardry.com/2019/05/self-host-your-static-assets/#self-host-your-static-assets) such as an outage, network disruption, and also the penalty that comes with having a cross-origin connection. Rather than being exposed to these factors you could host the assets locally.

### 8\. **Inline critical CSS and load the rest later**

Each time a browser encounters a CSS file on your web page it must fetch and parse the file before it can continue rendering content on the page. That means having a large stylesheet, or even a series of smaller ones, on your web page will result in a performance penalty. One way around this is to extract CSS that is vital for content that is first visible to website visitors, and to inline that CSS directly into the HTML of the page. Other CSS can be loaded later so as not to block the rendering of page content.

The [most common technique](https://web.dev/extract-critical-css/) is to consider vital content as anything that appears "above the fold". This is content that will be first visible when a given page is loaded. Any CSS required to present this content properly should be removed from any stylesheet, minified, and insert within a style tag within the `<head>` of the page. Other CSS can then be loaded using the preload technique and fallback above.

### 9\. **Can you use SVG or CSS for icons?**

A lot of business link to their social media channels from their website. In doing this they often look to use a font icon library to provide them with the branded social media icons to include on their page. However, font icon libraries can be hefty, and are often hosted by third-parties. An alternative to using them is to consider native CSS or even SVG options. SVG is a vector-based graphic format that is lightweight and can even be embedded directly into your page's HTML (reducing resource requests). There are plenty of options when it comes to CSS or SVG icons. One that I turn to frequently is [CSS.gg](https://css.gg/), though [Tabler Icons](https://tablericons.com/) is another good alternative.

### Conclusion

Applying even a few of the steps above should result in good performance improvements on your website. While there is a lot more to web performance, if you make these part of your regular web page planning and development process you will be going a long way to having a more performant page from the moment it's launched.
