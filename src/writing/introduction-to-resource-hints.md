---
title: An introduction to HTML resource hints
published: 2021/02/24
permalink:  /writing/introduction-to-resource-hints/
summary: "An easy-to-follow introduction to the different resource hints available to help improve web page performance."
---

This blog post is a consolidation of information from [two newsletter issues](https://optimised.email/issues/issue-9-resource-hints-part-1) that I [sent out recently](https://optimised.email/issues/issue-10-resource-hints-part-2).

As you might be able to guess by the name, resource hints allow developers to indicate to the browser that particular network connections or files might be important for the current (or future) page.

Resource hints come in the form of a single lines of HTML code that you place within the HEAD of your page. They may be small, but they have the potential to improve site performance immensely. That said, if overused they can also degrade performance. I'm going to focus on the four [**most commonly used resource hints**](https://almanac.httparchive.org/en/2020/resource-hints#hints-adoption) - `dns-prefetch`, `preconnect`, `preload`, and `prefetch`.

- `dns-prefetch` - resolves the IP address for a given domain ahead of time.
- `preconnect` - resolves the IP address + opens a TCP/TLS connection for a given domain.
- `preload` - instructs that particular resources be downloaded early.
- `prefetch` - downloads resources that might be needed for subsequent navigations.

These definitions might not mean much now, but once you understand how each of these can be used they'll serve as a quick refresher if you ever need it.

## **DNS-Prefetch**

`dns-prefetch` is handy if you're using third-party resources on your site. For example, if you're hosting your images on Cloudinary, using Fathom for your website analytics, and you've got a YouTube embed on the page. Connecting to each of these providers starts with IP resolution for their domain. This operation can between 80 - 300ms (sometimes longer) for each domain. Normally this would happen when the browser first comes across a resource from an external domain. However, using `dns-prefetch` you can tell the browser that it would be a good idea to start this process early. By doing this the IP resolution step will be (most likely) complete by the time the browser first comes across an external resource from that domain.

### **What it looks like**

Using YouTube as an example, you'd include this line early on in the HEAD of your page

<!-- markdownlint-disable -->
{% codeToHtml "html" %}
<link rel="dns-prefetch" href="https://www.youtube.com">
{% endcodeToHtml %}
<!-- markdownlint-enable -->

### **When to use it**

- If you're using resources hosted on an external domain, and especially if you're using multiple resources from one domain on the same page (e.g. a page with multiple images hosted on Cloudinary).
- `dns-prefetch` has [**browser support**](https://caniuse.com/link-rel-dns-prefetch) all the way back to IE10, so it's useful if you're having to support legacy browsers.

### **Gotchas**

- Google Chrome has a *limit of 6* in-flight DNS requests, so be judicious in which domains you use `dns-prefetch` for. Prioritise domains that host important resources for your site's Largest Contentful Paint (LCP).

## **Preconnect**

`preconnect` gives you the same IP resolution as `dns-prefetch` but goes a step further by 'warming up' the connection as well. What this means is that on top of resolving the IP of the domain, `preconnect` also prompts the browser to establish a TCP/TLS connection with the domain. This means that when a browser first comes across an external resource it can simply start downloading it, rather than first having to establish a connection. There's a saving of somewhere in the range of 100ms here for each domain, though it does vary.

### **What it looks like**

Sticking with the YouTube example above, you can including this line early in the HEAD of your page.

<!-- markdownlint-disable -->
{% codeToHtml "html" %}
<link rel="preconnect" href="https://www.youtube.com">
{% endcodeToHtml %}
<!-- markdownlint-enable -->

### **When to use it**

Same as `dns-prefetch` though [**browser support**](https://caniuse.com/link-rel-preconnect) is not as broad (IE & Firefox don't support `preconnect`). That said, you can use `preconnect` with `dns-prefetch` as a fallback by just putting them one after another in your code.

<!-- markdownlint-disable -->
{% codeToHtml "html" %}
<link rel="preconnect" href="https://www.youtube.com">
<link rel="dns-prefetch" href="https://www.youtube.com">
{% endcodeToHtml %}
<!-- markdownlint-enable -->

### **Gotchas**

- `preconnect` is best used only for resources early in the page load. This is because the browser will close the connection after 10 seconds if it's unused.
- Using `preconnect` can put load on device CPU so try to limit requests (common practice is 3, no more than 6).

## **Preload**

`preload` is probably the most dangerous of all the resource hints. In fact, it isn't a hint at all. It's more of a command to the browser to download a resource that *will* be needed on the current page. This heavy-handedness means that, if used incorrectly, `preload` has the potential to actually negatively impact page load. Why? Well, the more you prioritise for download with `preload` the later other (perhaps more important) resources will be downloaded.

### **What it looks like**

Like all other resource hints, you can include `preload` tags in the HEAD of your document.

You'll notice the `as="image"` attribute in the code below. This tells the browser what kind of resource is being fetched, and thus helps it determine priority. You can find a list of all possible values [**on MDN**](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-as).

<!-- markdownlint-disable -->
{% codeToHtml "html" %}
<link rel="preload" href="main-image.webp" as="image" type="image/webp" />
{% endcodeToHtml %}
<!-- markdownlint-enable -->

### **When to use it**

[**Browser support is pretty good**](https://caniuse.com/link-rel-preload) across modern browsers (IE11 won't recognise `preload` though).

`preload` is best used for bringing forward the download of *late discovered resources*. These are things like **fonts**, **background images**, or your **app CSS bundle**. All these are normally found by the browser after all the HTML, CSS and/or JavaScript has been parsed, which is often > 1 second into the page load. By using `preload` for these resources you can have them ready for the browser to load as soon as it discovers them.

### **Gotchas**

- Just remember - *if everything is a priority, then nothing is a priority.* Overuse of `preload` will often lead to a degradation in site performance. It's best used judiciously.
- Matt Hobbs has [**a very good write-up**](https://nooshu.github.io/blog/2021/01/23/the-importance-of-font-face-source-order-when-used-with-preload/) on an important gotcha to keep in mind when using `preload` for fonts.
- The `crossorigin` attribute is required when preloading web fonts, even if they're hosted on your own domain. Just add `crossorigin` to the end of the preload link tag.

## **Prefetch**

`prefetch` is handy at helping improve perceived performance for website visitors. It allows you to pre-emptively fetch and cache resources that might be required for future navigations. This is very handy when you know (or can predict) your user's journey.

Think of an online store for example. Your analytics tell you that most visitors that go to a products listing page click through to a product details page (which all use the same CSS file for styling). Using `prefetch` **on the product listing page,** you can have the browser download and cache the CSS file for the product details page. Once a user navigates there the CSS is ready to go. This can significantly speed up the rendering time for the page.

### **What it looks like**

As with all other resource hints, you can include `prefetch` in the HEAD of your HTML.

<!-- markdownlint-disable -->
{% codeToHtml "html" %}
<link rel="prefetch" href="/css/product.css" />
{% endcodeToHtml %}
<!-- markdownlint-enable -->

### **When to use it**

`prefetch` is best used when you are almost certain of a user's intended action. Since it downloads resources with a low priority it won't block the current page. However, prefetching too many resources (especially if they aren't used) will eat up your visitors bandwidth for no real gain.

### **Gotchas**

- `prefetch` downloads & caches files. It does not execute them.
- If you need to support IE9, note that it treats `prefetch` like `dns-prefetch`. Go figure 🤷🏾‍♂️.
