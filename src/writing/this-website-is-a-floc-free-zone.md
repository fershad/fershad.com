---
title: This website is a FLoC-free zone
published: 2021/04/17
permalink:  /writing/this-website-is-a-floc-free-zone/
summary: >-
  I switched analytics away from Google late last year. Now, I've also added
  response headers that will exclude this site from FLoC calculations too.
---

In November 2020 I switched my website analytics away from Google. I now (very happily) [use Fathom Analytics](https://usefathom.com/ref/CEHKLY) - a privacy-focused analytics service from Canada. Unlike Google Analytics, Fathom is a paid service that provides a much simpler collection of data.

So why the switch? Well there's a few reasons:

1. These days Google is first and foremost and advertising company. They collect data on users in a few ways, one of which is via analytics. I'd rather not have data about users from this website being used for that kind of profiling.
2. Fathom shows me pretty much all the information I need, rather than the excessive amount of data available in Google Analytics.

The first of those two reasons played a much bigger role in my decision.

It's also the same reason why I've now made a small change to this site that will exclude it from Google's latest targeted advertising experiment - _Federated Learning of Cohorts_ (FLoC).

FLoC is an attempt to profile and fingerprint users based on their web browsing history. As third-party cookies start to phase out, FLoC is a means of filling that void for the data hungry digital advertising industry.

## Adding headers in Cloudflare

To exclude a website from the FLoC calculation you can add the following HTTP response headers:

`Permissions-Policy: interest-cohort=()`

This website is hosted on Cloudflare (using Cloudflare Pages). I've used a Cloudflare Worker to add the custom response headers. The code for the worker is below. I've assigned this worker to the route `fershad.com/*` so that it applies to every page.

<!-- markdownlint-disable -->
{% codeToHtml "javascript" %}
async function handleRequest(request) {
  // Make the headers mutable by re-constructing the Request.
  request = new Request(request)
  const URL = request.url

  // URL is set up to respond with dummy HTML
  let response = await fetch(URL, request)

  // Make the headers mutable by re-constructing the Response.
  response = new Response(response.body, response)
  response.headers.set("Permissions-Policy", "interest-cohort=()")
  return response
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})
{% endcodeToHtml %}
<!-- markdownlint-enable -->

{% callout "Previously on Netlify ..." %}
When this post was first published, this site is hosted on Netlify. [Their docs](https://docs.netlify.com/routing/headers/) show a couple of ways to add custom response headers. I've decided to make the change in my site's `netlify.toml` file.
{% endcallout %}

<!-- markdownlint-disable -->
{% codeToHtml "toml", "netlify.toml" %}
[[headers]]
  for ="/*"
  [headers.values]
    Permissions-Policy = "interest-cohort=()"
{% endcodeToHtml %}
<!-- markdownlint-enable -->

More information about FLoC can be found here:

- [What is Federated Learning of Cohorts (FLoC)?](https://web.dev/floc/)​
- [Federated Learning of Cohorts (FLoC)](https://github.com/WICG/floc)​
- [Google’s FLoC Is a Terrible Idea](https://www.eff.org/deeplinks/2021/03/googles-floc-terrible-idea)​
- [Block FLoC With Duckduckgo](https://spreadprivacy.com/block-floc-with-duckduckgo/)​
- [Am I FLoCed?](https://www.eff.org/deeplinks/2021/04/am-i-floced-launch)​

{% callout "Disclaimer" %}
This article includes an affiliate link for Fathom Analytics. Using that link will get you $10 off your first month, and I'll also get a small fee from Fathom.
{% endcallout %}
