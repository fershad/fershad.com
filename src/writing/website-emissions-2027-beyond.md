---
title: What's next for assessing website environmental impact
published: 2026-09-09
# permalink: /writing//index.html
summary: A look into where I think things are heading in the world of website emissions estimation as new tools and methodologies emerge.
---

It's been a while since I've blogged about the topic of website carbon emissions estimation, measurement, and all that. So before things get too busy in the back part of this year, I want to quickly get some thoughts out about where I see things heading in the next 18-odd months when it comes to quantifying the impact of the web.

## TL;DR

The long and the short of it is this \- in the next year, I'm expecting we will see a move away from estimation models based primarily on data transfer towards more robust, component-based methodologies. These models are more detailed in how they capture information, and are largely based on first measuring power usage of individual system components, and then converting that to emissions. Web sustainability solutions based on using data transfer as a proxy will become less commonplace, and web sustainability guidance will need to be more than just "reduce page weight".

Read on for more detailed reckons.

## Going beyond page load and data transfer

*When we speak about website impact in the future, I expect that we are going to start talking about things in terms of the impact of a "user journey" or "user action".*

To date, most automated tooling for estimating web page emissions do a calculation at page load (or at best after scrolling the page). That's good, but doesn't capture how people really use the web on the daily. An online purchase likely has a different profile to an interactive "scrollytelling" investigative article, which has a different profile to checking in on your fantasy football side.

While including user interaction in website carbon estimates is possible with data-centric models like the Sustainable Web Design Model, we are still limited to only reflecting results based on how many bytes are transferred over the wire. This doesn't capture the nuance of how different online experiences behave on both the server and the user's device. An interactive news article may download all the content it needs once, but require computationally intensive scripting on the user's device; while an online store may load high-res product images one-by-one when a user clicks through the carousel, making a request to the server each time. This is the kind of detail our modelling has to capture in the future.

By presenting web sustainability in the context of these kinds of user interactions, we're also able to tie it to the KPIs through which organisations assess their website's effectiveness. **It helps draw a clearer line from web sustainability to the website "success metrics" organisations care about.** This is one way of getting past the problem that [*Nobody cares*](/writing/nobody-cares/). It will hopefully see sustainability become part a regular part of website testing, and reporting in the future.

For the rest of this post, I'll touch one some of the models and tools that I think can help get us to this future. With each, I'll throw in a summary at the end capturing:

* **Lifecycle:** Does the tool/model capture embodied and/or operational impacts  
* **Segments:** What systems segments does the model cover (Server, Network, Frontend)  
* **Approach:** Does the tool/model apply a top-down or bottom-up approach  
* **Interaction:** Does the tool/model include some user interaction, and how?

## Firefox Profiler

[Committing code to the Firefox Profiler](/writing/co2e-estimates-in-firefox-profiler/) remains one of the things I'm most proud of through all the work I've done in digital sustainability. Regulars on this blog probably knew this would show up, so I'll keep this short(ish).

The Firefox Profiler is the closest thing regular developers can get to on-device power measurement for websites. It allows for a recording to be made as a user navigates a website, and then presents information about those actions in extreme detail. The power measurement track in the profiler includes both power, energy, and carbon emissions figures \- which can be adjusted to give emissions values that reflect the user's location.

The profiler only captures the impact of a website on a user's device, and does not show data about network or server utilisation. However, it *can* be scripted, allowing for it to be used in automated website and user journey testing. This can be done with [sitespeed.io](https://www.sitespeed.io/documentation/sitespeed.io/), and is how Janne Kalliola and colleagues ran a suite of tests on 100 websites for a [recent paper they published](https://www.linkedin.com/feed/update/urn:li:activity:7488201455468929024/).

### Summary

{% capture tableContent %}
| Lifecycle | Segments | Approach | Interaction |
|---|---|---|---|
| Operational impacts | Frontend | Bottom-up | Based on actual user actions, but scriptable via sitespeed.io |
{% endcapture %}
{{ tableContent | markdownTable }}

### Can I use Chrome?

Short answer, no. Medium answer, not right now. Long answer, power profiling was something that was [explored by the Chromium team years ago](/writing/almost-chrome-power-profiler/) but didn't get deployed. That said, there's no reason why this should be a Firefox-only feature. Google Chrome, and the other Chromium-based browsers, have got the resources to get this done if they want to. So, If you're a user of Chrome, Edge, Vivaldi or any of the other Chromium browsers out there then you can help show the browser vendors that there is interest from developers in having this functionality\! Head over to [*Let's get Power Profiling into Chromium DevTools*](/notes/chrome-power-profiler-feature-request/) for more on that.

For now, Firefox is the default browser recommendation you can give to anyone wanting to get browser-level power data for a website.

## Cardamon Web

[Cardamon Web](https://web.cardamon.io) is a set of models and tools  developed by the team at [Root & Branch](https://rootandbranch.io/). The front end model is detailed in [this whitepaper](https://rab-website.s3.fr-par.scw.cloud/rab_website/cardamon_model/cardamon_model.pdf) and produces outputs that align with the [Green Software Foundation's Software Carbon Intensity (SCI)](https://sci.greensoftware.foundation/) standard. It does this through power estimation using a (mostly) bottom-up approach, meaning that it calculates outputs for individual components before combining them into a final result. Cardamon Web also covers Server, Network, and Frontend system segments relying on component level analysis for the server and frontend segments, while using an attributive, top-down approach for the network segment. It also includes estimation calculations for the embodied emissions of each segment.

Cardamon Web is suitable for testing a single page, or set of pages, rather than a dynamic user journey (of specific user action). Below is a short version of how the Cardamon Web Model approaches the operational impacts of each segment. Waaaay more detailed information is provided in the [project's GitHub repository](https://github.com/Root-Branch/cardamon-web-model) and the project page at [cardamon.rootandbranch.io](http://cardamon.rootandbranch.io).

**Server:** The model has three server types that can be used \- high, medium, and low spec. These servers are then further divided into static and dynamic components, which are measured in a test run. There are also affordances made for dedicated and virtual servers (where only part of the server is used to deliver the web page), as well as balancing server hits for the page being tested as a portion of overall website traffic.

**Network:** To estimate network impacts, the Cardamon Model takes the same approach as the widely used Sustainable Web Design Model. It takes a proxy measure of energy used (kWh) per gigabyte of data transferred. This is an approach I've written about before, and it is the [source of much criticism](https://www.debugbear.com/blog/website-carbon-emissions) levelled at website emission modelling in general. This is an area that the Root & Branch team are monitoring, and it’s expected that the Cardamon Web Model’s network methodology will be updated in the next year or two.

**Frontend:** For measuring the frontend segment, the model runs on an x86 server which runs a desktop browser or a browser with resolution size comparable to a mobile phone. Pages are then tested against these configurations. These tests are "interactive" in that the page being tested is loaded and then slowly scrolled to the bottom of the page. Like the server segments, the devices (mobile and desktop) are divided into dynamic and static components for which power consumption is measured during the test.

For each of the segments above, the Cardamon Web Model also has calculations for estimating the associated embodied emissions. These can be found in the [whitepaper published by Root & Branch](https://rab-website.s3.fr-par.scw.cloud/rab_website/cardamon_model/cardamon_model.pdf).

### Summary

{% capture tableContent %}
| Lifecycle | Segments | Approach | Interaction |
|---|---|---|---|
| Embodied and operational impacts   |  Server, Network, Frontend  |  Combination of top-down and bottom-up  | Scroll to bottom of page |
{% endcapture %}
{{ tableContent | markdownTable }}

## webNRG

[webNRG](https://website-tester.green-coding.io) is tool from the [Green Coding Solutions](https://www.green-coding.io) team in Berlin. It is a simplified version of their flagship [Green Metrics Tool](https://www.green-coding.io/products/green-metrics-tool/) (which I'll touch on next). webNRG limits its scope to the frontend (rendering) and network segments. Like Cardamon, the network segment is based largely on an attributive top-down model, however, adapter level measurements from the test device are also included. Frontend measurements are made on a dedicated server in a containerised environment.

Below is a short version of how webNRG works. More information is available on their [methodology page](https://website-tester.green-coding.io/methodology.html).

**Network:** To produce a number for the energy and emissions used by networks to deliver a web page, webNRG also relies on an energy used (kWh) per gigabyte of data transferred factor. However, it should be noted that the number used by webNRG differs from what is used by Cardamon (and also different to what's used by the Sustainable Web Design Model). They detail it all here: [https://www.green-coding.io/co2-formulas/](https://www.green-coding.io/co2-formulas/). They combine the outcome of this gigabytes to energy calculation with measurements taken on the test server's network adapter.

**Frontend:** Frontend energy measurements are made using CPU sampling (2ms intervals). In order to ensure that only the energy cost of rendering the web page is captured, the page is first downloaded, cached in a proxy, and then reloaded in a way that avoids the CPU cycles associated with launching the browser itself being captured in the samples. By default, the page then gets scrolled to the bottom, and after a 5 second wait the test is complete. 

However, it is also possible to include scripted user interaction for testing. So rather than just scrolling the page and waiting, webNRG allows for tests to be run which replicate users clicking on a specific button, interacting with a specific element, or even navigating across multiple pages. These scripts can be run on a page at scheduled intervals, or ad-hoc, making webNRG a potentially valuable addition for teams that want to add power/emissions profiling to CI/CD testing or general website monitoring.

### Summary

{% capture tableContent %}
| Lifecycle | Segments | Approach | Interaction |
|---|---|---|---|
| Operational impacts   |  Network, Frontend  |  Combination of top-down and bottom-up  | Scroll to bottom of page or customisable scripted interaction |
{% endcapture %}
{{ tableContent | markdownTable }}

## Green Metrics Tool

[Green Metrics Tool (GMT)](https://www.green-coding.io/products/green-metrics-tool/) is webNRG on steroids. The Green Coding Solutions guys actually built it *before* creating webNRG. GMT covers the same segments as webNRG, and it largely captures the same data. 

I'm not going to rehash everything in the webNRG section again for GMT. GMT allows for much more flexibility in configuration, meaning that GMT can be run on one of several different server configurations that are suitable for different uses (as opposed to the fixed server and configuration that webNRG operates on). It is can also be self-hosted.

### Summary

{% capture tableContent %}
| Lifecycle | Segments | Approach | Interaction |
|---|---|---|---|
| Operational impacts   |  Network, Frontend  |  Combination of top-down and bottom-up  | Customisable scripting |
{% endcapture %}
{{ tableContent | markdownTable }}

{% callout 'GreenFrame' %}
[GreenFrame](https://greenframe.io) is another tool which runs in a containerised environment and collects usage measurements from this environment to feed in its carbon calculation. It also includes measurements for a theoretical server container as part of its total calculations. It can also be scripted using Playwright. However, the [GreenFrame CLI repository](https://github.com/marmelab/greenframe-cli) was last updated 2 years ago so I'm unsure if it is still being maintained and therefore am not covering it in detail in this post.
{% endcallout %}

## Software Carbon Intensity Web (SCI Web)

Earlier, I mentioned that the Cardamon Web Model is aligned with the [Green Software Foundation's Software Carbon Intensity (SCI)](https://sci.greensoftware.foundation/) standard. That's a general framework for representing the emissions of any software application. As the name suggests, SCI Web is a specific version of the SCI standard that is tailored to the unique characteristics of web applications. SCI Web is still being developed, but my understanding is that it is slated for release in the last few months of 2026. Everything here is based on my understanding of the work being done on SCI Web from conversations with my colleague Chris, and summaries shared with the [Sustainable Web Interest Group](https://github.com/w3c/sustainableweb-wsg/pull/426).

SCI Web will cover the embodied and operational emissions from Server, Network, and Frontend segments. It doesn't really specify how numbers for these segments should be calculated, but rather it creates a framework for how other tooling can be used to generate values that can be input into the SCI Web calculation.

It should be noted that in SCI Web, reporting the operational emissions for the network segment is optional. The guidance being presented is that implementors should **avoid data transfer-based estimation models unless absolutely necessary**, while suggesting direct measurement or alternate time-based models for this segment instead. For a website on the open web, getting direct measurements for the entire network segment is impossible, and time-based models are still not widely used. So (I'm speculating here) with this lack of concrete data in mind, the team working on SCI Web have decided to keep network operational emissions optional for now. It was either that or forcing people to use a model that's rage bait for website emissions sceptics (i.e. energy used (kWh) per gigabyte of data transferred).

One other really important thing about SCI Web is that it looks as though it will be based around calculating an SCI score for a specific user action or journey. This is referred to as the "functional unit" (i.e. what is being measured \- newsletter sign ups, completed transactions etc.). These functional units can then be assessed over a measurement period (one month, one year) for which the SCI score is reported.

SCI Web isn't a methodology in and of itself. Rather you would have to use other tooling (like webNRG, Cardamon etc) to get figures for the different segments captured in SCI Web, which are then combined to calculate an SCI score.

### Summary

{% capture tableContent %}
| Lifecycle | Segments | Approach | Interaction |
|---|---|---|---|
| Embodied and operational impacts   |  Server, Network, Frontend    |  Bottom-up  | Based on user action or journey (functional unit) |
{% endcapture %}
{{ tableContent | markdownTable }}

### Time-based modelling for the network segment

Time-based power modelling isn't present in the current suite of established web estimation models. It's [something I experimented with as an idea back in 2024](/writing/thinking-about-a-way-to-estimate-website-energy-use/#segment-networks), based on research Jens Malmodin and colleagues had done for a Carbon Trust paper.

As part of his work leading the SCI Web project, my colleague Chris has been using more recent [research from Mytton, Lundén & Malmodin](https://doi.org/10.1111/jiec.13512) to create a time-based approach that could be used for the network operational emissions segment. He's [built an online tool](https://rtl.chrisadams.me.uk/wp-content/uploads/non-wp/experimental-network-power-model-calculator/) with an explainer, and some samples that you can play with. You can also bring your own user journey to test if you have a network trace available. *It should be very much noted that this is experimental at this stage\!*

What's important to notice, though, is that most time-based power modelling allows for the distinctions to be made between transfer over fixed networks (which is mostly stable power draw) and cellular networks (which has greater variability in power draw). This can help bring greater accuracy to website emissions estimates when coupled with analytics data about how a website is being accessed.

## Concluding

Here's a table summarising the tools and models mentioned in this post:

{% capture tableContent %}
| Tool/model         | Lifecycle               | Segments                      | Approach                                  | Interaction                                                   |
| ------------------ | ----------------------- | ----------------------------- | ----------------------------------------- | ------------------------------------------------------------- |
| Firefox Profiler   | Operational             | Frontend                      | Bottom-up                                 | Based on actual user actions, but scriptable via sitespeed.io |
| Cardamon Web Model | Embodied<br>Operational | Server<br>Network<br>Frontend | Bottom-up<br>Top-down for Network segment | Scroll to bottom of page                                      |
| webNRG             | Operational             | Network<br>Frontend           | Bottom-up<br>Top-down for Network segment | Scroll to bottom of page                                      |
| Green Metrics Tool | Operational             | Network<br>Frontend           | Bottom-up<br>Top-down for Network segment | Customisable scripting possible                               |
| SCI Web            | Embodied<br>Operational | Server<br>Network<br>Frontend | Bottom-up                                 | Based on user action or journey (functional unit)             |
{% endcapture %}

{{ tableContent | markdownTable }}

Over the next 18 months, I can see SCI Web becoming the standard around which most other tooling is built. Already I am aware that Cardamon Web is planning to align with it, and I believe that webNRG will head in that direction as well. I'm hopeful other platforms like [Ecograder](https://ecograder.com/), [Kastor](https://kastor.green/), and [GreenFrame](https://greenframe.io/) will also do so. 

I expect to see these tools producing outputs that can be plugged into the respective segments of the SCI Web model, or even generating SCI Web results themselves. I'm also hopeful that we will begin to see them being setup to test for very specific usage scenarios, rather than just generating an output for loading a web page.

Importantly, I'm hopeful that in 2027 we no longer have people presenting "reduce your web page size" as a catch all solution for reducing a website's impact. That's [not to say that you shouldn't still reduce page weight](/writing/network-sustainability-for-frontend-devs/), but rather that you should be conscious about what changes you are making, and what impacts they genuinely have on the power profiles of your user's journeys.

{% callout 'Build your tech sustainability literacy' %}
This post covered a lot of technical topics, and includes wonky ideas like top-down and bottom-up methodologies. If your organisation wants to improve literacy in these topics, and digital emissions estimation in general, [get in touch with me through the Green Web Foundation](https://greenweb.org/services) for a workshop, training session, or consultancy.
{% endcallout %}
