---
title: Thinking about a way to estimate website energy use
published: 2024/02/06
permalink:  /writing/thinking-about-a-way-to-estimate-website-energy-use/
summary: >-
  In this post, I want to continue building out an incremental model, but rather
  than focusing on emissions calculations I want to create a model to estimate
  energy use.
---

In January, I had some fun [rejigging the Cloud Carbon Footprint (CCF) methodology](https://fershad.com/writing/adapting-cloud-carbon-footprints-methodology-to-website-carbon-estimates/) to see how it might be adapted to calculate server-side emissions in a website carbon estimation model. It was a great little thought experiment, and something that I learnt a lot from in the process.

One of the things I picked up, thanks to Tom Greenwood, was a better understanding of the [differences between attributional and consequential models](https://qt.fershad.com/writing/thinking-about-attributional-consequential-models/). The tl;dr is attributional model take the full energy used by a system & allocate part of that energy to a unit of whatever is being measured. Consequential models are far more granular, estimating energy for individual parts of the system.

Through conversations with a few folks, especially [Cameron Casher](https://github.com/camcash17) a maintainer of the [CCF project](https://github.com/cloud-carbon-footprint/cloud-carbon-footprint), I began to understand that it falls more on the consequential side of the spectrum. It is better suited to examining a system (cloud infrastructure in this case) in detail, and surfacing areas for potential optimsation to reduce those impacts.

## About this post

In this post, I want to continue building out an incremental model, but rather than focusing on emissions calculations I want to create a model to estimate energy use. My hope is that beginning to think about an incremental model like this will help give developers a way in which they can identify parts of their technology stack which could be optimised to reduce energy use.

I will revisit the work I did previously on the data center segment in my previous post. I will then work on the two other segments that make up operational energy use for a website - networks and user devices. As I did in the previous post, I'm going to lean on the work of others here to speed things along. Of course, I'll do my best to provide links and explanations of the things I change along the way.

### Why only energy & not emissions?

Grid intensity (the emissions attributed to the mix of fuels that are powering a grid) can vary so much from region to region. In that way, it can have a considerable impact on the result of calculations, though it is often outside of the developer's control.

Focusing on energy allows us to concentrate on individual parts of the system that developer might actually have some control over. It allows us to highlight areas that could be optimised, and gives a consistent means to measure these changes.

## Segment: Revisiting Data Centers

Let's start by quickly revisiting the calculation I formed when looking at how Cloud Carbon Footprint might be used to estimate website server emissions.

{% callout "Read first"%}
I strongly recommend that you read the previous post - [Adapting Cloud Carbon Footprint's methodology to website carbon estimates](https://fershad.com/writing/adapting-cloud-carbon-footprints-methodology-to-website-carbon-estimates/) - before you read this one. It will set some context which I'm skipping over here.
{% endcallout %}

In that post, I arrived at a formula for data center emissions that was:

<!-- markdownlint-disable -->
{% codeToHtml %}
    Data center CO2e (grams) = (Compute Kilowatt-Hours + Memory Kilowatt-Hours) * PUE * Local grid intensity + (Storage Kilowatt-Hours + Network Kilowatt-Hours) * PUE * Global grid intensity
{% endcodeToHtml %}
<!-- markdownlint-enable -->

So the data center segment has got several sub-segments - Compute (CPU), Memory, Storage (HDD/SSD), and Networking. Since we only want to calculate energy use, we will remove the grid intensity parts of the calculation. We'll also spilt the calculation up so that it's easier to read for each sub-segment.

<!-- markdownlint-disable -->
{% codeToHtml %}
    Data center Energy (kWh) = (Compute Kilowatt-Hours *PUE) + (Memory Kilowatt-Hours* PUE) + (Storage Kilowatt-Hours *PUE) + (Network Kilowatt-Hours* PUE)

    Compute Kilowatt-Hours = (2.292 * server process time (seconds)) / 1000 / 3600

    Storage Kilowatt-Hours = 0.0000000009 kWh/MB * data transfer MB * number of CDN regions

    Network Kilowatt-Hours = 0.000001 kWh/MB * data transfer MB * number of CDN regions

    Memory Kilowatt-Hours = 0.000000392 kWh/MB * data transfer MB
{% endcodeToHtml %}
<!-- markdownlint-enable -->

## Segment: Networks

Network energy is interesting, especially as research now suggests that [network energy doesn't scale linearly with data transfer](https://fershad.com/writing/website-carbon-beyond-data-transfer/#data-transfer-network-energy-usage). That is to say, the more data being transferred over a network does not mean that network is using significantly more energy than it otherwise would. Likewise, transferring less data doesn't result in a reduction in network energy consumption.

The best work I've seen reflecting this comes from a [Carbon Trust report](https://ctprodstorageaccountp.blob.core.windows.net/prod-drupal-files/documents/resource/public/Carbon-impact-of-video-streaming.pdf) into the impacts of video streaming. In the report the cite [research by Jens Malmodin (2020)](https://online.electronicsgoesgreen.org/wp-content/uploads/2020/10/Proceedings_EGG2020_v2.pdf) (page 87 - 96) which looks at power consumption of mobile & fixed data networks.

The carbon trust report allocates a fixed baseline power load to fixed and mobile networks. It then also provides a means to account for the marginal increase in energy use caused by long-duration, data intensive activities like streaming. The folks over at Scope3 have broken down these figures, and I've used their summary below. [Read their docs](https://methodology.scope3.com/data_transfer#power-usage-by-time-and-bandwidth-power-model) to understand how they reached these figures and the changes they've made to Carbon Trust's assumptions.

<!-- markdownlint-disable -->
{% codeToHtml %}
    Fixed Network Energy = 9.55W + 0.03W/Mbps

    Mobile Network Energy = 1.2W + 1.53W/Mbps
{% endcodeToHtml %}
<!-- markdownlint-enable -->

Now there is a baseline and dynamic portion to the energy calculations for both fixed and mobile network energy. The question now becomes, what input should we use for the dynamic portion. The calculation asks use for the bitrate (Mbps), but we don't really measure websites in that way.

For this part, we can use values from the Malmodin research mentioned above. In it, the value of 0.4 Mbps for "web surf". So let's plug that in.

<!-- markdownlint-disable -->
{% codeToHtml %}
    Fixed Network Energy (kWh) = 9.55W + 0.03W x 0.4Mbps = 9.56W / 1000 = 0.00956kWh

    Mobile Network Energy (kWh) = 1.2W + 1.53W x 0.4Mbps = 1.81W / 1000 = 0.00181kWh
{% endcodeToHtml %}
<!-- markdownlint-enable -->

### What about non-web surfing data transfer?

The Malmodin research does provide figures for other activities like YouTube, Netflix, and file download. The Carbon Trust report also provides figures specific to video streaming quality. As do Scope3, who have figures for video and digital audio. So go ahead an pick your poison. You can swap those figures into the calculation above if you need to. Since this post is focused on website carbon estimates, we'll stick to using the figures we can find for website transfer.

### One small change to these figures

There's one more change I'm going to make to the Scope3 figures above. The value of 9.5W for Fixed Network Energy includes 1.3W allocated to CDNs (taken from the Carbon Trust report which labels it as *data centers and content delivery networks*. However it doesn't seem this figure is applied to Mobile Network Energy, so I will include it there.

And, as a final step, we'll covert this value to kilowatt-hours per second. This allows us to multiply the factor by the `transfer time` for the web page or content being measured.

<!-- markdownlint-disable -->
{% codeToHtml %}
    Fixed Network Energy (kWh) = 9.55W + 0.03W x 0.4Mbps = 9.56W / 1000 / 3600 = 0.0000026556kWh/s x transfer time (s)

    Mobile Network Energy (kWh) = 2.5W + 1.53W x 0.4Mbps = 3.11W / 1000 / 3600 = 0.0000008639kWh/s x transfer time (s)
{% endcodeToHtml %}
<!-- markdownlint-enable -->

So now we've got figures to use for the network segment of our calculation. You would only use one of these figures in a calculation, based on the kind of network environment that is being tested for.

## Segment: User Devices

For user devices, it makes logical sense that the time spent on the device would be a factor in overall energy use. I've decided to settle on a mix of device power figures from [Scope3](https://methodology.scope3.com/consumer_devices) and the methodology work done by [DIMPACT](https://dimpact.org/) - a project involving over 20 media, entertainment, and technology companies, as well as members from the University of Bristol.

### Calculating a single web page view using DIMPACT

The DIMPACT model relies on quite a few users inputs, and is designed to calculate emissions for a large number of sessions. For the purpose of the model we're creating, we'll simplify the model and strip it back to just calculating a single session/page view.

We'll use the DIMPACT publishing module, which is suitable for calculating emissions for static content like a website. They also have a video streaming module for dynamic content but that's to explore on another day.

For each type of device (tablet, computer, laptop, mobile), we'll take the following inputs:

- Duration of the page view (seconds)
- Estimated average power of the device type in use. We'll used Scope3's figures here, which are primarily US centric but give a breakdown by mobile & desktop which we can use.
    - **Desktop/Laptop (incl. Monitor):** 53.2W
    - **Tablet:** 3W
    - **Smartphone:** 0.77W

Now using DIMPACT's calculations:

<!-- markdownlint-disable -->
{% codeToHtml %}
    Device Energy (kWh) = Device active power draw (W) / 1000 / 3600 x Duration of pageview (s)
{% endcodeToHtml %}
<!-- markdownlint-enable -->

Now we're normally not viewing web pages for hours. Maybe minutes, but probably seconds. So we've made a slight change to DIMPACT's calculation to reflect this.

To turn the device energy result into a carbon estimate, we then multiply it by the grid intensity of the local grid where the device is being used.

{% callout "What about standby power?" %}
DIMPACT does have additional calculations for allocating the impact of device standby energy usage. However, they state that it is to be excluded for device types such as computers, tablets, and smartphones. Since we're dealing solely with those devices, we'll get to keep this post a bit shorter by skipping that part.
{% endcallout %}

## What this model is & what it isn't

We've now got calculations for all three system segments, and I'll wrap things up soon by putting them together into a single calculation for the model. But first, I want to take a moment to clarify what a model like this is good for, and what it isn't suitable for.

### Good for

The thoughts outlined in this model would best serve developers who want to estimate the energy used by their website or web app. It also serves as a handy means to measure and compare the short-term impact of changes they make to their code or platform on energy use.

### Not good for

A consequential model, such as this one, is not suitable for use as the basis for any carbon accounting or reporting. For that, you are better off using an attributional model such as Sustainable Web Design. As mentioned at the beginning of this post, attributional models look at the total energy used by a system and then attribute part of that to the website being measured.

A model like this is also not suitable for forecasting, or making any predictions of the long-term impacts of specific changes to code or platforms. The impacts it measures are short-term.

## A final calculation

Bringing all the work above together, we arrive at the below calculation combining all three system segments.

<!-- markdownlint-disable -->
{% codeToHtml %}
    Website Energy Use (kWh) = Data Center Energy (kWh) + Network Energy (kWh) + User Device Energy (kWh)
{% endcodeToHtml %}
<!-- markdownlint-enable -->

### Data Center Energy

<!-- markdownlint-disable -->
{% codeToHtml %}
    Data center Energy (kWh) = (Compute Kilowatt-Hours * PUE) + (Memory Kilowatt-Hours * PUE) + (Storage Kilowatt-Hours * PUE) + (Network Kilowatt-Hours * PUE)

    Compute Kilowatt-Hours = (2.292 * server process time (seconds)) / 1000 / 3600

    Storage Kilowatt-Hours = 0.0000000009 kWh/MB * data transfer MB * number of CDN regions

    Network Kilowatt-Hours = 0.000001 kWh/MB * data transfer MB * number of CDN regions

    Memory Kilowatt-Hours = 0.000000392 kWh/MB * data transfer MB
{% endcodeToHtml %}
<!-- markdownlint-enable -->

### Network Energy

Choose the calculation appropriate to the network being tested.

<!-- markdownlint-disable -->
{% codeToHtml %}
    Fixed Network Energy (kWh) = 0.0000026556kWh/s x transfer time (s)

    Mobile Network Energy (kWh) = 0.0000008639kWh/s x transfer time (s)
{% endcodeToHtml %}
<!-- markdownlint-enable -->

### Device Energy

Choose the calculation appropriate for the device being tested.

<!-- markdownlint-disable -->
{% codeToHtml %}
    Computer Device Energy (kWh) = 0.0532 x Duration of pageview (s)

    Tablet Device Energy (kWh) = 0.003 x Duration of pageview (s)

    Smartphone Device Energy (kWh) = 0.00077 x Duration of pageview (s)
{% endcodeToHtml %}
<!-- markdownlint-enable -->

## Have a play around with it

You can play around with the calculation above in [this interactive Observable Notebook](https://observablehq.com/d/1b0b36a7cf6619d8). This environment will allow you to adjust the different inputs, and see how they impact the overall energy use being measured.

### Also see

If you’re interested in this, then also check out [GreenFrame from Marmelab](https://greenframe.io/) which also brings together research to estimate device emissions for website use.

## Let me know what you think

This post is aimed at being a conversation starter. I've tried to use existing data and research and looked at how they might be applied to estimating energy used by a website. I'm interested to know what you think about it. If you know of any other data/research I might have missed please also share it!

Get in touch: [LinkedIn](https://www.linkedin.com/in/fershad/), [Mastodon](https://indieweb.social/@fershad), or by [email](https://fershad.com/contact)

Finally, a big thank you to the folks at Cloud Carbon Footprint, Scope3, DIMPACT, Carbon Trust, and Jens Malmodin & his co-authors for all the work they've done to further this area of research.
