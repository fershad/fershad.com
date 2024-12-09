---
title: Frontend tips to speed up your WordPress website
published: 2021/06/28
permalink:  /writing/frontend-tips-speed-up-you-wordpress-website/
summary: >-
  WordPress powers over 40% of the internet. It's a powerful platform that makes
  content creation possible for more people. In this post we'll cover some
  simple performance optimisation tips you can use to make your WordPress
  website faster!
---

WordPress powers over 40% of the internet. That's a lot of websites. When it was first released, WordPress revolutionised online publishing. It democratised it, opening up the ability to publish content online to anyone.

WordPress has grown from its early days as a blogging platform to now provide a rich ecosystem of plugins that power some of the web's leading content publishers and ecommerce sites. With that has also come performance issues, as everyday users add multiple plugins to their site only to begin experiencing performance bottlenecks.

## First, understand your site

Before getting started, it's important you determine whether your website features mostly static or dynamic content.

- **Static content:** This is content that is not updated frequently. For example, company information pages, general product pages, blog posts etc.
- **Dynamic content:** Content that's updated frequently/presented in real-time or content that requires user authentication. Examples include product inventory information, membership pages, forums etc.

## Cache, cache, cache

Even if your website has mostly dynamic content, you still almost definitely have static assets that don't change very frequently. Things like logos, JavaScript files, and stylesheets are all perfect caching candidates.

For static sites, you can even cache entire pages. In this way, when a user visits that page the server can serve it straight from the cache, rather than having to build the page from scratch. This can give you a performance boost, as well as reducing the load on your website's server.

Almost all dynamic sites also have pages that can be cached. These would include your privacy policy, company details pages, and FAQ pages. Be sure that you're not caching pages that show content that is unique to a user, or time-sensitive content.

Check with your website host if they have caching options as part of their service. If they don't you can try out one of the plugins below:

- [WP Rocket](https://wp-rocket.me/) (paid - recommended)
- [Comet Cache](https://wordpress.org/plugins/comet-cache/) (freemium)
- [Cache Enabler](https://wordpress.org/plugins/cache-enabler/) (free)
- [W3 Total Cache](https://wordpress.org/plugins/w3-total-cache/) (free)

## Use a CDN

CDNs work by saving cached version of your pages and other assets on a distributed network of servers. With this in place, when someone visits your website from Melbourne, Australia they'll be served with content from the closest server. As a result, you can dramatically reduce the response times when people visit your site. This also helps further reduce the load on your website's server.

Kinsta has a [thorough blog post](https://kinsta.com/knowledgebase/install-cloudflare/) about getting set up with Cloudflare CDN for your WordPress site. Other CDN providers like Fastly also have [plugins for their services](https://wordpress.org/plugins/fastly/).

## Optimise your images

Images are most likely the heaviest resources on your WordPress site. Optimising them is one of the most important steps you can take to improve the performance of your website. We've covered different [image optimisation techniques](https://optimised.email/series/optimising-images) in previous issues of this newsletter. For WordPress specifically, there are a few things to note:

### Upgrade to WordPress 5.5 for native lazy-loading

With the release of WordPress version 5.5, image lazy-loading was added to the core build. With this in place, WordPress will automatically add the loading=lazy attribute to all images. This can be overridden by developers for more control.

### Upgrade to WordPress 5.8 for WebP support

The recent 5.8 release of WordPress [introduces WebP support](https://make.wordpress.org/core/2021/06/07/wordpress-5-8-adds-webp-support/). This allows you to compress and upload WebP images for use on your site. WebP now has really good browser support and delivers quality images at a fraction of the file size when compared to JPEG or PNG.

### Use a plugin if you can't update

If something is stopping you from updating your version of WordPress, then you can still achieve great image compression and optimisations using one of the plugins below.

- [**Imagify**](https://wordpress.org/plugins/imagify/)​
- [**WP Smush**](https://wordpress.org/plugins/wp-smushit/)​
- [**Optimole**](https://wordpress.org/plugins/optimole-wp/)​
- [**EWWW Cloud**](https://wordpress.org/plugins/ewww-image-optimizer-cloud/)​
- [**ShortPixel**](https://wordpress.org/plugins/shortpixel-image-optimiser/)​

## Pick a fast theme

The theme you choose can also make a big difference in terms of site performance. After all, it is the underlying foundation upon which your website is built. You'll want to find a theme that gives you just the features you need, without extra bloat. For example, if you're not using FontAwesome icons (and in 2021 [you really don't need to](https://optimised.email/issues/issue-7-web-icons-in-2021)), then make sure the theme you use does not ship with it (or at least has a way to disable it).

{% callout "Keep in mind"%}
Another important consideration is the design of the template. Those that have feature large, hero/jumbotron images at the top of each page might end up proving problematic to your [Core Web Vital scores](https://optimised.email/issues/issue-4-core-web-vitals-and-googles-search-update). These might require you to take extra care in optimising the images you upload.
{% endcallout %}

If you're after a fast WordPress theme then try out [Granola from Wholegrain Digital](https://www.wholegraindigital.com/blog/granola-starter-theme/). The Wholegrain team is passionate about digital sustainability, and that's part of the ethos behind Granola. For more options, you can check out this [detailed list](https://kinsta.com/blog/fastest-wordpress-theme/) from Kinsta.

## Audit the plugins you're using

Plugins can be another source of performance pain for WordPress sites. Sometimes, they're installed to solve one particular problem but then just left in place even after they're no longer required. This often causes sites to become bloated.

The easiest way to keep on top of this is to set a yearly reminder to review the plugins you have installed on your WordPress site. Ask yourself (or others in your organisation) if those plugins are all required for the site to function. Remove those which are not.
