---
title: Proxying Cloudinary image requests with Cloudflare Workers
published: 2021/08/04
permalink:  /writing/proxy-cloudinary-with-cloudflare-workers/
summary: >-
  Using resources hosted by a third-party can seriously hurt website performance
  in a few ways. In this post, we'll cover how you can use a proxy to reduce the
  performance impact when hosting images on Cloudinary.
---

I've written about the perils of relying on third-party resources previously in my newsletter, Optimised (see [Issue 2 - Third-party resources - A cautionary tale](https://optimised.email/issues/issue-2-third-party-resources-a-cautionary-tale)). That said, most of the time you'll be unable to avoid using at least some third-party hosted assets on your website. Whether it's an analytics provider, image hosting, advertising, or even a cookie consent manager.

There are a few ways third-party resources can impact on site performance. But there is one that is common to any and all third-party resources. That is, that for each third-party domain you use the browser must open up a new HTTP connection, then go about resolving the DNS, before finally opening a TCP connection and performing SSL negotiation. This can add up-to (sometimes over) a second to a request. In a world where [milliseconds makes millions](https://www2.deloitte.com/ie/en/pages/consulting/articles/milliseconds-make-millions.html), that's a hefty delay.

One way to get around this is to host resources on your own domain. Barring that, another workaround is to shift the work off the browser, and onto your host/CDN. Since hosts/CDNs process millions of requests a minute they're better optimised to resolve DNS fast, which can shave several hundred milliseconds of request times. By setting up a proxy, you can trick the browser into believing a resources is being requested from your own domain, when in fact it is coming from a third-party.

On this website, I use Cloudinary to host and serve my images. Normally, this would mean that for the first image requested on a page would incur the DNS-TCP-SSL penalty I mentioned earlier. Instead, I can use a Cloudflare Page Rule that routes all traffic from the `fershad.com/image` route to a Cloudflare Worker. The Worker intercepts the request, and fetches the requested asset from Cloudinary. As far as the browser is concerned, it's requesting and receiving a file from my domain.

You can set up something similar on most CDNs that provide edge-compute, or even on your web host.

<!-- markdownlint-disable -->
{% codeToHtml "js" %}
    addEventListener('fetch', event => {
        event.respondWith(handleRequest(event));
    });

    const CLOUD_URL = `https://res.cloudinary.com/${CLOUD_NAME}`;

    async function serveAsset(event) {
        const url = new URL(event.request.url);
        const cloudinaryURL = `${CLOUD_URL}${url.pathname}`;
        response = await fetch(cloudinaryURL);
        const headers = {
            'timing-allow-origin': '*'
        };
        response = new Response(response.body, { ...response, headers });
        return response;
    }

    async function handleRequest(event) {
        if (event.request.method === 'GET') {
            let response = await serveAsset(event);
            if (response.status > 399) {
                response = new Response(response.statusText, { status: response.status });
            }
            return response;
        }
        return new Response('Method not allowed', { status: 405 });
    }
{% endcodeToHtml %}
<!-- markdownlint-enable -->

The script I use in production includes a couple of extra steps to cache the returned images, so that subsequent requests for the same file are served using the cache. You can read more about that in this [guide from Cloudflare](https://developers.cloudflare.com/workers/tutorials/configure-your-cdn). If you're using Netlify to host your site, Tim Kadlec has a tutorial showing how to [do the same thing with Netlify redirects](https://timkadlec.com/remembers/2020-11-17-netlify-proxy-requests/).
