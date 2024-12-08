---
title: Proxying AWS S3 content with Cloudflare Workers
published: 2021/08/16
---

A common use case for proxying requests would be when hosting content in Amazon Web Services S3 buckets. Not only is this handy for performance, but it can also reduce your AWS bill if you cache assets that are delivered by the proxy. Another benefit is that it allows you to use international S3 buckets to serve content to users that might be located in China - which has special conditions in place for storing & delivering AWS content.

From a performance perspective, proxying requests through your own domain can remove the requirement for the browser to open up a new HTTP connection, then go about resolving the DNS, before finally opening a TCP connection and performing SSL negotiation. This can save up-to (sometimes over) a second to a request.

In the example below I use a Cloudflare worker to proxy requests from a website to AWS S3. The workers is set up so that any traffic to the `[website-domain]/file` route gets intercepted & redirected to the S3 bucket being used to fetch data. You can set up something similar on most CDNs that provide edge-compute, or even on your web host.

<!-- markdownlint-disable -->
{% codeToHtml "js" %}
    addEventListener('fetch', event => {
      event.respondWith(handleRequest(event))
    })

    async function handleRequest(event) {
      let requestFolder = '/files'
      let s3Folder = '/uploads'

      let url = new URL(event.request.url)
      const cache = caches.default

      let origPathname = url.pathname
      const filename = url.toString().split('/').pop()

      url.hostname = '[YOUR_S3_BUCKET_URL_HERE]'
      url.pathname = origPathname.replace(new RegExp('^'+escapeRegExp(requestFolder)), s3Folder)

      response = await fetch(url)
      response = new Response(response.body, { ...response})

      return response;
    }

    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&');
    }
{% endcodeToHtml %}
<!-- markdownlint-enable -->

As an additional step, you can set up caching on the returned files, so that subsequent requests for the same file are served using the cache. You can read more about that in this [guide from Cloudflare](https://developers.cloudflare.com/workers/tutorials/configure-your-cdn).
