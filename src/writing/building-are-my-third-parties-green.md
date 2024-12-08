---
title: >-
  Checking the sustainability of third-party requests with “Are my third parties
  green?”
published: 2022/03/01
permalink:  /writing/building-are-my-third-parties-green/
summary: >-
  “Are my third parties green?” is an online tool that checks the sustainability
  of third-party requests made by any web page. This post provides some insights
  into how it was built, and what other features are planned.
---

Over 94% of sites use at least one third-party resource, accounting for over 45% of website requests. This finding [from the 2021 Web Almanac](https://almanac.httparchive.org/en/2021/third-parties#prevalence) absolutely blew my mind. It also got me thinking. “How many of these third-party requests are served from green web hosts?”, I wondered. It wasn’t something I’d seen talked about much or surfaced in other website sustainability tools. So, I decided to build something that would allow me to answer the question - “[Are my third parties green?](https://aremythirdpartiesgreen.com/)”

## A few early decisions

### Building a website

From the outset I wanted to build something that was accessible and usable beyond just developers. A lot of third-party services are added to websites to marketing, sales, and tracking purposes. So, building a tool that folks from non-dev teams could use was a large reason why I chose to build a website, rather than a command line tool or node script.

### Using Google Lighthouse

Although the main aim of the project was to check third-party requests for green hosting, I did also want the ability to surface other details later down the line. I knew Google’s PageSpeed Insights (PSI) API, which uses Google Lighthouse under the hood, was one way to get this kind of information when given a web page URL. For the bulk of the time developing the site I was working with PSI to scan sites.

However, as I got further into building the site, I realised that it would be very handy to have my own instance of Lighthouse. Doing so would allow me to manipulate data before it’s returned, as well as allow me to explore other scenarios like how pages load third-parties for different geographies (think EU, GDPR etc). Now, I needed to work out where to host it.

### Google Cloud Functions

In the end I settled on Google Cloud Functions (GCF) for hosting my Lighthouse instance. I settled on GCF for a few reasons.

- I wanted to host my code sustainably, and know that Google Cloud Platform has published information about the [sustainability of their locations globally](https://cloud.google.com/sustainability/region-carbon).
- I considered services like [Render](https://render.com/), but the limited choice of regions wouldn’t allow me to easily expand to more locations.
- I found a [code repository](https://github.com/matthoffner/lighthouse-cloudfunction) that I could use to get up and running quickly.

I wanted to avoid making too many function requests, however. I’d never used something like GCF before, but have heard plenty of stories about cloud functions running up huge usage bills in the past. In a bid to prevent this, I wanted to cache test results for a reasonable period.

### Cloudflare Workers KV

For caching results, I went with Cloudflare Workers KV (key-value) storage, a simple storage solution that would allow me to easily save results. Workers KV also allows for keys to be set to automatically expire after a set duration. With this I was able to cache results for one week, to limit the number of new test runs that were made to the GCF.

KV also provides a low-complexity ways to persist results. This made it possible to enable results to be shared. Being able to persist results also opens up the possibility to analyse results later. To be able to do more with historical results would require a slightly more refined storage solution. But, for simply persisting results with a unique ID key KV workers perfectly.

### Made with Svelte

I’ve been wanting to use [SvelteKit](https://kit.svelte.dev/) on a project for a very long time. “Are my third parties green?” provided the perfect case for me to do so.

### Determining green hosting

[The Green Web Foundation](https://thegreenwebfoundation.org/) maintains a dataset of known, verified green hosting providers. They provide an API which also allows for URLs to be checked for green hosting. I leverage this to check the third-party domains found in each test run.

## More than green hosting

When setting out to build this project, the aim was to uncover the hosting of third-party services. However, when looking at the results returned from Lighthouse I realised that there would be a chance to show a bit more useful information.

### Carbon impact

Because Lighthouse returns the downloaded size of requests, I decided to also show a carbon estimate for each third-party resource. To achieve this, I used the [calculations presented by Sustainable Web Design](https://sustainablewebdesign.org/calculating-digital-emissions/) - [Wholegrain Digital](https://www.wholegraindigital.com/), [Mightybytes](https://www.mightybytes.com/), [Medina Works](https://www.medina-works.com/), and [Ecoping](https://ecoping.earth/).

Since I was looking at the first load of the page, I refined the calculation to remove the assumptions made about returning visitors. With more time I may look at building in a sliding scale that can reflect the effect caching has on data transfer.

### Effective Caching

Lighthouse also tries to determine if requests are effectively cached. When scanning a page it calculates a `cacheHitProbability` figure for each request. It presents this alongside other information like the cache duration.

For the purpose of “Are my third parties green?” I decided that anything with a `cacheHitProbability` less than 50% (0.5) would be considered to be ineffectively cached. This is an arbitrary determination on my part. Later on, I hope to use the cache duration details to present a more accurate reflection of third-party data transfer over time.

### Categorising third-party requests

During my research for this project, I came across the [third-party-web repository](https://github.com/patrickhulce/third-party-web/). It contains over 2000 third-party entities, attempts to categorise them, and includes other information like sample domains and performance impact. I’ve leaned heavily on third-party-web for this project, and hope to contribute to it later this year.

## One last thing ... where to host it

Originally, I wanted to host the site on Cloudflare Pages. Cloudflare is a green web host, according to The Green Web Foundation, and I’ve been using it for some time now on my own website. However, after initially setting it up there, I just couldn’t get the site to work. After some digging, I learnt that server-side rendering (SSR) was not yet supported by Pages. Bummer.

Instead, I moved to hosting the site on Netlify while still fronting it with Cloudflare’s CDN. Matt Hobbs has a very useful post if you’re [looking to set up the same](https://nooshu.com/blog/2021/09/06/migrating-from-github-pages-to-cloudflare-and-netlify/). With this in place, I was able to get the site up and running. It also provided the added benefit of being able to use Cloudflare’s Page Rules to cache the test result pages on the edge.

## Launching to the world

This is the first time I’ve ever built something like this, so I was a bit apprehensive about sharing it publicly. Were there any bugs I’d not picked up? Did I miss something in the design? How will it go if there’s a few people hitting the API at once?

The reception the site got from the community at large was terrific. It meant a lot that folks in the ClimateAction.Tech community were positive about it (and helped give a few feature requests!). It was also very encouraging to see the response from web performance folks on Twitter. I hope that it got a few more people thinking about the overall impact of the internet.

## A few more ideas

I had achieved the original aim of the project, to build a way to determine the sustainability of third-party resources on a web page. But, after launching I had a few more ideas to add extra value to the tool. There were also some requests for features that came up from folks in the ClimateAction.Tech community and on Twitter.

### European testing

Originally tests were run out of servers in the US. However, with GDPR in place, some websites apply different third-party service based on the region of their visitors. A few people asked for the ability to test from a European location.

I’d thought about this as well, and it was part of the reason I went with using my own instance of Lighthouse on GCF. A few weeks after launching the site, I spun up a new instance hosted in Belgium and included the ability to change regions via an “Advanced settings” menu.

### Green third-party directory

While building out the test results page I was trying to figure out if there was any way to suggest greener alternatives for services that were not on green web hosts. While I couldn’t think of anything at the time, shortly after launching the project I realised that the information from the third-party-web repository could be used for this very purpose.

Rather than being limited to “suggestions” on the results page, I decide to create a “[Green third-party directory](https://aremythirdpartiesgreen.com/directory)”. In this way, people could find sustainable third-party services before implementing them on their website.

The building of this page was a challenge in itself, with over 2000 services. It’s probably worthy of a whole post on its own.

### More for the future

There are still a few more things I want to do with the website before I feel it’s done:

- Allow the ability to set cookies before running tests. This was requested by a few people, since a lot of site load third-party resources based on user interaction (normally accepting/rejecting a cookie consent form).
- Linking to the directory from results pages. This might be in place by the time you read this post.
- Showing past test results for a page. This would require some more work around how results are persisted, perhaps needing to save them to a database so they can be easily accessed and filtered.
- Showing file size and emissions data in the directory. This would be taken from the test results, so there might not be data for a lot of services to begin with. It would also probably need data to be stored in something other than KV to make it easier to retrieve and parse.
- A search filter for the directory. Some categories have a lot of services, so being able to search for a specific service would make things easier to users.
