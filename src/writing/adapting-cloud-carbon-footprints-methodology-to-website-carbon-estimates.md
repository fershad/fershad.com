---
title: Adapting Cloud Carbon Footprint's methodology to website carbon estimates
published: 2024/01/05
permalink:  >-
  /writing/adapting-cloud-carbon-footprints-methodology-to-website-carbon-estimates/
summary: >-
  In this post I will look at an possible alternative approach to calculating
  the emissions of the server (data center/hosting) segment for websites using
  the methodology outlined by Cloud Carbon Footprint.
---

There's been some conversation lately about the [shortcomings of different website carbon estimation models](https://www.debugbear.com/blog/website-carbon-emissions). It's something I've [touched on here](https://fershad.com/writing/is-data-the-best-proxy-for-website-carbon-emissions/) [and elsewhere](https://calendar.perfplanet.com/2023/why-web-perf-tools-should-be-reporting-website-carbon-emissions/) in the past too. I think there's a consensus in the community on the need for more accurate models that representative of how the modern web works. This entails a [shift away from data transfer](https://fershad.com/writing/website-carbon-beyond-data-transfer/) as the sole proxy for all the system segments in website emission calculations.

In this post I will look at an possible alternative approach to calculating the emissions of the server (data center/hosting) segment in website carbon calculations. I hope that this can be the first in a series of posts where I lay out possible alternate approaches to estimating emissions for each segment in website carbon calculations. When (read: if ever) the other posts are ready, I will link to them below.

{% callout "Update"%}
I **_did_** get around to writing that post! You can read it at [Thinking about a way to estimate website energy use](https://fershad.com/writing/thinking-about-a-way-to-estimate-website-energy-use/).
{% endcallout %}

## About this post

This post aims to be a conversation starter. In it, I will look at the open methodology published by [Cloud Carbon Footprint (CCF)](https://www.cloudcarbonfootprint.org/docs/methodology), and how it might be adapted for use in website carbon estimate calculations.

I have limited my scope to operational emissions only, and I acknowledge further work would be needed to include embodied emissions factors.

I have tried my best throughout to be clear about the changes and assumptions I've made in adjusting the CCF methodology. You might agree with some, you might disagree with others. That's cool, I'd love to hear your feedback regardless. The best way to do so is on [LinkedIn](https://www.linkedin.com/in/fershad/), [Mastodon](https://indieweb.social/@fershad), or by [email](https://fershad.com/contact).

## The problem with models

> _All models are wrong, but some are useful._  
> George E. Box

We need to acknowledge this from the get go. No matter how detailed we try to make our models, there will inherently be some part of the model that has to rely on generalised assumptions, averages, or estimates. That is part of what makes a model a model.

If you're after 100% accurate figures for website carbon emissions, then you need to be able to measure the emissions attributed to processes running on a server, the energy usage of the internet required to transfer data, and the energy used by the actual device that views the website.

That's not feasible for the large majority of people who want to work out the carbon impact of their websites. And that's why we need models to fill in the gaps.

## A time & location based approach to estimating website server emissions

The scale and complexity of hosting a website can vary wildly. It can be a small as [a single solar powered server](https://scott.ee/project/solar-hosting-raspberry-pi/) at home right through to complex, globally distributed infrastructure. Hosts can perform simple tasks like delivering static HTML pages right through to hosting full applications that build pages and running database queries on demand.

While there are ways to get server utilisation metrics directly, these require at least some setup and configuration on the servers in question. For many, this isn't possible. So what metric could be used instead as a proxy for server utilisation?

### Server Timing Headers

Ideally, we'd be able to get data about the individual processes responsible for serving a web page & how much power they consumed.

It is possible to setup a server so that it responds with information about how long a given task or function took to complete. This can be done through [Server Timing Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing).

This is a great starting point, but to make these time values useful for carbon estimates we need a way to represent it as energy measured over a period of time (kilowatt-hours). These timings also don't factor in the energy associated with hosting sites on distributed platforms like CDNs.

Since we're not able to get actual power figures from the server without some custom setup or tooling installed, we need to create a model which allows us to estimate this conversion.

## ❗An important note before starting

The approach I outline below is a consequential model, in that it tries to look in detail at parts of a system to work out their individual impacts on the overall systems footprint. Such a methodology is suitable for those seeking ways to identify areas for improvement in their site's emissions profile. However, it would not be suitable for carbon accounting or reporting against standards like the Greenhouse Gas Protocol.

## Borrowing from Cloud Carbon Footprint

Cloud Carbon Footprint is an open source tool for measuring the emissions of cloud compute use. It works with data from Amazon Web Services (AWS), Google Cloud Platform (GCP) and Microsoft Azure.

Since a lot of the modern web runs on services that site on top of one of these three providers, I feel that using Cloud Carbon Footprints data and methodologies make sense in helping shape a general model that would be applicable to most of the web.

### Model scope

First, let's scope out what we'll measure:

- Compute - the energy used by server compute to deliver a web page.
- Storage - the energy used to store the web page.
- Networking - the energy used to move data between data centers.
- Memory - the energy used by memory to deliver a web page.

The CCF methodology includes a GPU segment as well, but since we're dealing with web servers I have not included that this in my post.

Let's now look at each individual segment to see what each calculation might look like in the context of a website. We'll aim to create a profile of an "average web server" based on the calculations and data in the CCF methodology.

### Compute

CCF compute calculation looks at virtual CPU utilisation for a moment in time. It methodology for calculating this borrows from [Etsy's Cloud Jewels](https://codeascraft.com/2020/04/23/cloud-jewels-estimating-kwh-in-the-cloud/) methodology.

{% codeToHtml %}
Average Watts = Min Watts + Avg vCPU Utilization \* (Max Watts - Min Watts)
{% endcodeToHtml %}

In our case, since we're looking to build an average server profile, we can use the `Min Watts` and `Max Watts` values that [CCF's calculation defaults to for Google (GCP), Amazon (AWS), and Microsoft (Azure)](https://www.cloudcarbonfootprint.org/docs/methodology#appendix-i-energy-coefficients). We'll also use the default value of 50% (0.5) for `Avg vCPU Utilization`.

{% codeToHtml %}
Average Watts GCP: 0.71 + 0.5 \* (4.26 - 0.71)

Average Watts AWS: 0.74 + 0.5 \* (3.5 - 0.74)

Average Watts Azure: 0.78 + 0.5 \* (3.76 - 0.78)
{% endcodeToHtml %}

We then take the average of these calculations (2.292 Watts) and multiply it by a time value to get a total in Kilowatt-Hours for server utilisation.

{% codeToHtml %}
Compute Kilowatt-Hours = (2.292 W \* server process time in Hours) / 1000
{% endcodeToHtml %}

In this case, server process time would be the value we get via Server Timing Headers. Anyone using this calculation would also need to remember to convert the server timings (sent in milliseconds) to an hourly figure. _This_ is done by multiplying the server timings by 0.00000027777778.

{% callout "What if server timing information is missing?"%}
Server timing information might not always be available. In those cases, we'd need to have a default to fallback on. I've got no idea what a sensible default would be here, especially given the different web architectures that exist.

Picking a number out of thin air, lets go with 100 milliseconds (0.00002778 hours) until someone can share something more compelling.
{% endcallout %}

For reference, here's a link to the [CCF docs for the compute segment](https://www.cloudcarbonfootprint.org/docs/methodology#compute).

### Storage

CCF have calculations to produce coefficients for both HDD and SSD storage types. These are in Watt-hours per Terabyte. For our website server calculation we'll convert these to Kilowatt-hours per Megabyte instead, and use the average of HDD and SSD.

Based on the numbers used in CCF's calculations for these coefficients, [which you can see here](https://www.cloudcarbonfootprint.org/docs/methodology#storage), we get:

{% codeToHtml %}
HDD Kilowatt-Hours per Megabyte-Hour = (6.5 W / 10,000,000) / 1000 = 0.00000000065 kWh/MB

SDD Kilowatt-Hours per Megabyte-Hour = (6 W / 5,000,000) / 1000 = 0.0000000012 kWh/MB
{% endcodeToHtml %}

The average of these figures gives us a storage coefficient of `0.0000000009 kWh/MB`. In our calculation, we'd use this as:

{% codeToHtml %}
Storage Kilowatt-Hours = 0.0000000009 kWh/MB \* data transfer in MB.
{% endcodeToHtml %}

### What about CDNs?

The calculation above would work for a page hosted on a single server. But in today's internet many sites have content replicated across multiple servers, either for redundancy or performance, or both. This is often done by using Content Delivery Networks (CDNs). It's worth thinking about how we'd make it possible to reflect this in our calculation as well.

Unless this is something you've setup yourself, it's hard to know exactly how many servers a site has been replicated across. Information we might have access to, though, is the number of regions a CDN provider is operating. For example, [Vercel list 18 regions that make up their CDN edge network](https://vercel.com/docs/edge-network/regions#region-list). If this information is unknown, we can use a default of `1` in the calculation below.

{% codeToHtml %}
Storage Kilowatt-Hours = 0.0000000009 kWh/MB _data transfer in MB_ number of CDN regions used
{% endcodeToHtml %}

For reference, here's a link to the [CCF docs for the storage segment](https://www.cloudcarbonfootprint.org/docs/methodology#storage).

### Networking

The replication mentioned above requires data to be transferred between multiple data centers. For this, we'll use the coefficient CCF have for their calculation because, as they point out:

> There have not been many studies that deal specifically with estimating the electricity impact of exchanging data across data centers. Cloud Carbon Footprint docs (read more)

The only change we'll make to the CFF value is to convert it into kilowatt-hours per megabyte for consistency with the rest of our calculation. This value then gets multiplied by the amount of data transfer being measured, and the number of CDN regions used (again defaulting to `1` if this is unknown)

{% codeToHtml %}
Network Kilowatt-Hours = 0.000001 kWh/MB _data transfer in MB_ number of CDN regions used
{% endcodeToHtml %}

For reference, here's a link to the [CCF docs for the network segment](https://www.cloudcarbonfootprint.org/docs/methodology#networking).

### Memory

In writing this post, I really wasn't sure if a memory coefficient should be included in the final calculation. I've settled on including it because I think that it could be useful when estimating emissions for server-rendered sites.

My assumption is that serving static assets (HTML, images, etc) uses a negligible amount of memory (close enough to 0 to be 0), but that a site which is server-side rendered probably does use some amount of memory that it's worth counting.

Once again, we'll use the CCF value and convert it to kilowatt-hours per megabyte.

{% codeToHtml %}
Memory Kilowatt-Hours = 0.000000392 kWh/MB \* data transfer in MB
{% endcodeToHtml %}

This value can be set to `Memory Kilowatt-Hours = 0` if the webpage or asset being measured is known to be a static file.

You'll also notice here that we're not using the number of CDN regions as a multiplier. That is because (like the compute segment) memory would only be used in the one region that is serving the web page.

For reference, here's a link to the [CCF docs for the memory segment](https://www.cloudcarbonfootprint.org/docs/methodology#memory).

## Putting it together

Having gone through the exercise above, we've now got calculations for different segments of a web server. We have also taken into account the use of distributed hosting or CDNs. Bringing these together, we have:

{% codeToHtml %}
Compute Kilowatt-Hours = (2.292 \* server process time) / 1000

Storage Kilowatt-Hours = 0.0000000009 kWh/MB _data transfer in MB_ number of CDN regions used

Network Kilowatt-Hours = 0.000001 kWh/MB _data transfer in MB_ number of CDN regions used

Memory Kilowatt-Hours = 0.000000392 kWh/MB \* data transfer in MB
{% endcodeToHtml %}

Combining these into one monster calculation, we get:

{% codeToHtml %}
Server Kilowatt-Hours = ((2.292 W _server process time in Hours) / 1000) + (0.0000000009 kWh/MB_ data transfer in MB _number of CDN regions used) + (0.000001 kWh/MB_ data transfer in MB _number of CDN regions used) + (0.000000392 kWh/MB_ data transfer in MB)
{% endcodeToHtml %}

## Factoring in Power Usage Effectiveness (PUE)

No data center is 100% energy efficient, in that no data center uses 100% of its power intake on its servers alone. The factor used to represent how effectively a data center uses its power is Power Usage Effectiveness (PUE). By including PUE in our calculation we're able to capture some of that data center inefficiency in our final emissions estimate.

Let's incorporate this into our calculation:

{% codeToHtml %}
Server Kilowatt-Hours = ((2.292 W _server process time in Hours) / 1000)_ PUE + (0.0000000009 kWh/MB _data transfer in MB_ number of CDN regions used) _PUE + (0.000001 kWh/MB_ data transfer in MB _number of CDN regions used)_ PUE + (0.000000392 kWh/MB _data transfer in MB)_ PUE
{% endcodeToHtml %}

### What's a suitable PUE value?

The question is, what value should our model use for PUE? If you're operating a single server location, then you might be able to find out the PUE for that location from your hosting provider. Likewise, if you're running exclusively on AWS, GCP or Azure then you can used the values from CCF for those providers:

- **AWS:** 1.135
- **GCP:** 1.1
- **Azure:** 1.185

As a fallback, if PUE is unknown, then I think a good value to use would be that produced by the [Uptime Institute's annual data center survey for 2023](https://journal.uptimeinstitute.com/global-pues-are-they-going-anywhere/). This gives an average PUE value of `1.58`.

{% callout "Uncertainty" %}
I'm uncertain if including PUE into the calculation is the right approach here, and would be keen to hear what others think.
{% endcallout %}

## Turning it into a carbon estimate

To turn this into a carbon estimate, we'd then multiply this figure by a value for the energy intensity of the grid on which the host server operates (the grid intensity in grams CO2e per kilowatt-hour).

To do this, we'll need to split that calculation up, so that the segments which only relate the server delivering a page (Compute and Memory) can use a location specific grid intensity value, while those which include factors for some kind of cross-regional data replication (Storage and Network) use the global average grid intensity. Doing this, our calculation now looks like:

{% codeToHtml %}
Server CO2e (grams) = (Compute Kilowatt-Hours + Memory Kilowatt-Hours) _PUE_ Local grid intensity + (Storage Kilowatt-Hours + Network Kilowatt-Hours) _PUE_ Global grid intensity
{% endcodeToHtml %}

Or in long form:

{% codeToHtml %}
Server CO2e (grams) = (((2.292 W _server process time in Hours) / 1000) + (0.000000392 kWh/MB_ data transfer in MB)) _PUE_ Local grid intensity + ((0.0000000009 kWh/MB _data transfer in MB_ number of CDN regions used) + (0.000001 kWh/MB _data transfer in MB_ number of CDN regions used)) _PUE_ Global grid intensity
{% endcodeToHtml %}

Where local grid intensity for a server is unknown, a regional value can be used as a fallback, otherwise the global grid intensity can be used in its place.

When no CDN is used (i.e. there is no data replication, `number of CDN regions used = 1`) then the global grid intensity can be replaced with local grid intensity if it is known.

### What if its a green web host?

In the case that a site is hosted on a verified green web host or a green CDN is used (checked against the [Green Web Foundation's Green Web Dataset](https://www.thegreenwebfoundation.org/tools/green-web-dataset/)), then the corresponding grid intensity values can be set to 0 gCO2e/kWh accordingly.

## Comparing results with the current Sustainable Web Design model

As a point of comparison, and so that I can see the calculation I've landed on in used, I'll compare it to the results for the data center segment that are produced when using the Sustainable Web Design (SWD) model.

The values used in our calculations are:

- **Data transfer:** 1 MB data transfer
- **Server compute time:** 100ms (0.00000027777778 hours)
- **CDN regions:** 1
- **Global average grid intensity:** 436.33 gCO2e/kWh
- **PUE:** 1.58

I am looking at the first time a page loads, so have removed the assumptions the SWD model makes about caching and return visitors from that calculation.

{% codeToHtml %}
Sustainble Web Design Server Segment = 0.001 _0.81_ 436.33 \* 0.15 = 0.05301 grams

Server CO2e = (((2.292 _0.00000027777778) / 1000) + (0.000000392_ 1)) _1.58_ 436.33 + ((0.0000000009 _1_ 1) + (0.000001 _1_ 1)) _1.58_ 436.33 = 0.00100 grams
{% endcodeToHtml %}

One thing we can do now with this calculation is see how changes (other than adjusting file size) might impact the emissions estimates we get. For example, lets say we put our 1 MB page onto Vercel (18 CDN locations). The resulting calculation produces:

{% codeToHtml %}
Server CO2e = (((2.292 _0.00000027777778) / 1000) + (0.000000392_ 1)) _1.58_ 436.33 + ((0.0000000009 _1_ 18) + (0.000001 _1_ 18)) _1.58_ 436.33 = 0.01273 grams
{% endcodeToHtml %}

## Let me know what you think

This post is aimed at being a conversation starter. I've tried to use an existing open methodology for calculating cloud compute server emissions & looked at how it might be applied to estimating server-side emissions as part of website carbon estimates. I'm interested to know what you think about it. If you know of any other data/research I might have missed please also share it!

Get in touch: [LinkedIn](https://www.linkedin.com/in/fershad/), [Mastodon](https://indieweb.social/@fershad), or by [email](https://fershad.com/contact)

Finally, a big thank you to all the folks who've contributed to Cloud Carbon Footprint for what they have built and for working in the open.
