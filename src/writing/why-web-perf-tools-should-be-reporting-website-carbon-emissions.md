---
title: Why web perf tools should be reporting website carbon emissions
published: 2023/12/20
permalink:  /writing/why-web-perf-tools-should-be-reporting-website-carbon-emissions/
summary: >-
  This post was originally published as part of the 2023 Web Performance
  Calendar.
---

{% callout "Original" %}
This post was originally published as part of the [2023 Web Performance Calendar](https://calendar.perfplanet.com/2023/why-web-perf-tools-should-be-reporting-website-carbon-emissions/).
{% endcallout %}

Recently, a post from the web performance monitoring tool DebugBear about [why they won’t report website carbon emissions](https://www.debugbear.com/blog/website-carbon-emissions) in their platform caught my attention. It’s a very good post, pulling together information from a lot of sources, and presenting the reasoning behind their decision. As I read it, I found myself nodding along to parts and furrowing my brow to others in equal measure.

This post is partly in response to DebugBear’s piece (so maybe read that first if you haven’t already). It is in no way a criticism of the post, which raises some very valid points about the current state of website carbon emissions calculations. However, contrary to the conclusion made in that post, I believe that despite the current shortcomings of different models the data they provide _should_ be presented to users in a way that allows them to begin to contextualise the emissions associated with their website and digital assets.

In this post, I aim to provide a counter take, that looks at the present and future. I hope to emphasise how web performance tools can start integrating website carbon emissions calculations into their platforms.

## For transparency

Before we start, I should disclose that at the time of writing I work as a contractor for [Green Web Foundation](https://www.thegreenwebfoundation.org/), a Dutch non-profit working for a fossil-free internet by 2030. As part of my role, I am a maintainer of CO2.js, a JavaScript library that enables developers to use different estimation models to calculate the CO2e produced from data transfer. Through that, I have worked to build carbon estimations into a few website carbon calculators and performance tools.

## Website carbon emissions in 2023

The biggest criticism levelled at most website carbon estimation tools is their reliance on data transfer as a proxy for emissions. The article on the DebugBear website covers this extensively in relation to the [Sustainable Web Design](https://sustainablewebdesign.org/) (SWD) model. It’s a criticism which [I’ve written about](https://fershad.com/writing/is-data-the-best-proxy-for-website-carbon-emissions/) in the past as well.

Other models do exist which take into account factors beyond data transfer. The DebugBear article touches on [GreenFrame](https://greenframe.io/) and [DIMPACT](https://dimpact.org/), two examples that can be used for website emissions estimates (DIMPACT can also be used to estimate video streaming). [Scope3](https://methodology.scope3.com/lifecycle) is a model mainly for advertising and publishing, but is another example of one that takes multiple varying inputs into its carbon calculations.

## Understanding the models we have today

To get our bearings, it will help to get an overview how the GreenFrame, DIMPACT, and SWD models work. This will highlight some of their limitations, as well as start to surface areas in which they might be able to be improved. I’ll also touch on alternatives that can be used to measure website carbon emissions, both today and potentially in the future.

### GreenFrame

GreenFrame runs in a Dockerised environment, collecting usage measurements from its container to feed in its carbon calculation. It also includes measurements for a theoretical server container as part of its total calculations.

GreenFrame runs scripted Playwright scenarios, and so can be used to estimate emissions for not just page load but specific page interactions. There is an [open source CLI tool](https://github.com/marmelab/greenframe-cli) which could be easily added to existing tooling or CI/CD pipelines, although at the time of writing it is covered by a somewhat restrictive license.

### DIMPACT

The DIMPACT model relies on inputs that are less readily available in real time, especially in calculating server and user device emissions. Unlike GreenFrame, the DIMPACT model does not perform measurements on an actual web page. Instead it takes user inputted data for things like total GHG emissions from data center processes, total data served by CDN, and user specific information like device type, location, and total data served. Not all of this information is available in realtime, with most figures likely being presented as monthly, quarterly, or annual data.

### Sustainable Web Design

The SWD model’s main input is data transferred. It uses this as the basis for calculating carbon emissions of all the segments that make up a website system – hosting, networks, user devices, and manufacturing. It’s worth noting that manufacturing is captured in the scope of the SWD model, while it is omitted from the scope of the GreenFrame and DIMPACT models.

As the DebugBear post points out, data transfer as a metric has a poor correlation to server utilisation and network energy use. There might be some correlation with device energy use, but not every byte of data is equal (more on this in a bit). So, yes, data transfer is a weak proxy for website carbon emissions. To fix this [“we need a ‘green’ perf. metric”](https://www.youtube.com/watch?v=DXX4hkV7XOI). We need browser APIs that expose more about a webpage and (ideally) energy use so that we can be really accurate emissions measurements. Until those appear, we’ll have to live with an accessible proxy like data transfer or something similar.

#### Not all bytes are equal

There’s long been a belief that 100kb of JavaScript or video content has a much larger device-level impact than 100kb of HTML. Ideally there’s a future where we’ve got a model that allows us to dissect a web page’s content to this level and come up with an even more nuanced carbon emissions estimate for it, based on this information. Having research to back that up will allow for updated models to be created with this information baked in. There’s already [a paper by Alexander Dawson](https://websitesustainability.com/cache/files/research23.pdf) exploring this, but a significant amount of more work would be required to get this to the stage where it’s suitable to include in a carbon estimation model.

### About Firefox Profiler

It is also possible to capture the energy profile of a webpage in the Firefox Profiler. The profile will also show a CO2e estimate, which is something I helped roll in earlier this year. It should be noted that you can now adjust the energy intensity that is used for this CO2e estimate to customise the results for your scenario.

Running the profiler programmatically would allow extremely accurate synthetic carbon measurements to be captured, since it measures actual energy used rather than relying on a model. The folks at Sitespeed are looking into how that can be done. Follow along in [this GitHub issue](https://github.com/sitespeedio/sitespeed.io/issues/3944).

[This talk by Florian Queze](https://share.firefox.dev/green-coding-summit-2023) of Mozilla at the SDIA Green Coding Summit (November 23, 2023) is a good introduction to the Firefox Profiler, as well as other power measurements tools in use today.

### Other possible approaches in the future

If we want a way to measure website and digital carbon in realtime, then we need that information to be available in the browser and/or the platform. Ideally, that information would be actual energy utilisation similar to what can be recorded in the Firefox Profiler. Other proposals include [HTTP headers](https://www.ietf.org/archive/id/draft-martin-http-carbon-emissions-scope-2-00.html) or [utilising parts of the IPv6 protocol](https://www.thegreenwebfoundation.org/publications/extending-ipv6-to-support-carbon-aware-networking/) to capture this information. Right now, though, data transfer serves as one of the more readily accessible bits of information we can access in the browser without requiring a special environment to be configured.

## All models are wrong, some are useful

I took this line from my colleague [Chris Adams](https://www.linkedin.com/in/mrchrisadams), but let’s [attribute it to statistician George Box](https://qt.fershad.com/writing/change-gco2kwh-firefox-profiler/) shall we.

I hope what I’ve written about above helps to give you a better understanding of where each methodology might fall short and how they could be bettered. All models have inherent biases that skew their results one way or the other. There will always be a part of a model that cannot accurately capture the complexity or reality of what it is trying to measure. DIMPACT, GreenFrame, and Sustainable Web Design all have assumptions baked into their calculation methodologies which in turn impact their outputs in different ways. Measuring actual energy usage along the entire tech stack is the only way to get truly accurate website carbon emissions figures. By doing that, you no longer rely on models and the assumptions they make.

Even if updated versions of those models were to land, they’d still have their shortcomings. What’s important is that we understand these, and communicate them effectively when we do use these models in our work.

We need to ask ourselves if we are willing to let a pursuit of the perfect model stop us from making progress. You might be able to guess which camp I sit in.

## The start of the journey

I’d argue that the field of measuring website carbon emissions is today in the same spot that the web performance field was a decade ago. I wasn’t around in the early days of folks measuring website performance, but I know that the metrics they relied on are a far cry from the ones that are referenced today. I can’t speak for those early web perf. pioneers, but I’m guessing at the time they were working with what they had access to through APIs, and whatever limited research was around at the time.

We’re at that point with website carbon calculations today. Of the research available into the impacts of ICT, there’s a small portion that’s focused on websites and digital media. There’s some data that we can capture to use in calculations, but most of this is aggregated in annual reports or requires a specific environment setup in order to be measured. The research into, and our understanding of, the correlation between various metrics and CO2 emissions is still very much in its infancy. The Environment Variables podcast recently aired an episode with Dr Daniel Schien ([_The Week in Green Software: New Research Horizons_](https://podcast.greensoftware.foundation/e/4n9v2qr8-the-week-in-green-software-new-research-horizons)) which provides a summary of research over the past decade, some of the hurdles that have been faced, and also the possible directions for future research.

But, as with web performance, the only way we can keep moving things forward is by implementing what we have and iterating on it. This allows us to capture data that can be used in research. It enables different hypotheses to be tested in the real world. It facilitates a greater awareness around the area of website and digital carbon emissions, which can then further fuel progress.

## Customers will keep requesting it

Customers are going to keep on requesting providers include emissions reporting in the tools they use. They’ll probably be doing so with an eye to incoming legislation in Europe ([Corporate Sustainability Reporting Directive (CSRD)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022L2464)) and California ([Climate Corporate Data Accountability Act (CCDAA](https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240SB253))) which will require companies to report on the carbon emissions from their operations well beyond what they are currently mandated to do. These bills will start taking effect in the coming years.

There’s also an increasing number of companies that have set Net Zero or Climate Neutral targets which they hope to achieve within this decade. In order for them to do that, they need to start measuring the emissions of their operations and that would include their website or digital assets.

## Adding carbon emissions to web perf tools

In adding website carbon emissions to web performance tools, we should acknowledge to users that this is a young area of research and that the models used today will evolve as research and understanding in this space evolves. It’s also important to highlight the models being used for calculations, note their limitations, the fact that they are _estimates_, and to be transparent about any adjustments that have been made to them as part of an implementation.

For the rest of this section, I’ll be focusing on the SWD model, and how its results can be made more accurate despite the limitations of the model. That said, the general themes here are applicable to other models as well.

### Start general and refine

The Sustainable Web Design model is a general model for website carbon emissions calculation. It definitely isn’t a 100% accurate measurement of your website’s carbon emissions, [nor has it ever tried to come across as being this](https://www.wholegraindigital.com/curiously-green/issue-48/). It is, though, probably the best starting point we have today for introducing the idea of estimating website carbon emissions to an individual without overwhelming them with too much detail and complexity.

### Swap in real data when its available

Operational emissions in the SWD model are broken up into individual system segments (data centers, networks, and user devices). This means that the calculated emissions for one segment could be replaced with actual data for that segment, if it is available.

Say, for example, that a user’s hosting provider gives them an annual report showing the carbon emissions associated with hosting their website. Awesome, what a fantastic host! That actual data could be used in the SWD calculation in place of the estimated value for that system segment. Heck, even if you only had access to energy usage data from the hosting provider you could still multiply that by the energy intensity of the server location to get an emissions value which can be swapped into the calculation.

### Get specific about energy intensity

The default SWD calculation uses the global average annual grid (energy) intensity to calculate carbon emissions from energy. Changing this value to that of a specific country will give a result that’s more tailored to that country.

Ideally, though, you’d like to do this separately for each individual system segment. That is because your web host might be in one country, while your users could be in another. By using the appropriate energy intensity for each segment, we’re able to run calculations that include values that more realistically reflect how the website is setup in the real world.

The SWD calculations page gives guidance on how to work out the energy attributed to each segment. These values can then be multiplied by respective energy intensity figures to calculate emissions. This capability is also built into [CO2.js](https://www.thegreenwebfoundation.org/co2-js/), where energy intensity figures can be manually entered or imported from country-level annualised data that is also available in the library. The Italian website carbon calculator [Sitigreen](https://sitigreen.it/) is an example of this approach in action.

#### A note about CO2.js

[CO2.js](https://github.com/thegreenwebfoundation/co2.js) is a JavaScript library that can be used to calculate digital carbon emissions. **It is not an estimation model in its own right.** Instead, it provides access to multiple estimation models that developers can use. Currently, the library contains two models – Sustainable Web Design and OneByte. **We would love to have more!** There are open issues for adding the [GreenFrame](https://github.com/thegreenwebfoundation/co2.js/issues/145) and [DIMPACT](https://github.com/thegreenwebfoundation/co2.js/issues/141) models to the library, but as a small non-profit we rely on grant funding and donations to make this possible. You can [support our work](https://www.thegreenwebfoundation.org/donate) or [engage us for a project](https://www.thegreenwebfoundation.org/services/), which will allow us to set aside time to improve this and other open source tools we maintain.

### Request level emissions

All website carbon calculators I know of perform calculations on total page weight.

However, another way to approach this which improves the accuracy of results is to pass the bytes transferred for each request into the model, and then sum the equivalent carbon estimations. In this way, variables in the calculation can be adjusted for each request (e.g. green hosting, server location energy intensity). This, in turn, leads to a more refined overall emissions estimate for a page. [WebPageTest](https://webpagetest.org/) takes this approach in its Carbon Control feature, while website analytics tool [Statsy](https://statsy.com/) also does this in realtime. Both these tools use CO2.js under the hood to enable this.

## What to do if you still don't like the models we have today

I understand that this topic might be polarising. So hey, if I’ve failed to convince you that web perf tools should report on website carbon emissions then that’s okay. Thank you for taking the time to read through the thoughts above. Before wrapping up, I’d like to leave you with a few other things I think all web performance tools can do that go beyond showing website carbon emissions to users.

- Show whether requests are being [served from green web hosts](https://www.thegreenwebfoundation.org/tools/green-web-dataset/). Yes, [CDNs can get in the way](https://www.thegreenwebfoundation.org/support/im-using-a-cloud-provider-why-is-my-site-showing-as-grey/) of this check but most monitoring tools should be able to check and flag this.
- See if there’s a way to leverage the actual power measurements taken from the Firefox Profiler in any dashboards or reports. Reminder that the folks at Sitespeed are looking at [how to automate this](https://github.com/sitespeedio/sitespeed.io/issues/3944#ref-pullrequest-2011025018).
- As an organisation, fund additional research and projects that further our understanding of the relationship between our tech stacks and climate change.
- Engage with browser vendors to add power profiling and better APIs to the platforms we use. Here’s a [proposal from Microsoft Edge](https://fershad.com/writing/microsoft-propose-sustainability-section-in-edge-devtools/) exploring this.
- Join the [W3C Susty Web Working Group](https://w3c.github.io/sustyweb/) which has a team focused on improving metrics.
- Call for more transparency from browser vendors based on the telemetry they collect. To improve the models we have today, we will need to move away from generalised device data towards anonymised power usage models for device power usage. Carefully curated open data, like we see on the server side (see [SPECPower Model](https://github.com/green-coding-berlin/spec-power-model) or [Cloud Carbon Footprint](https://github.com/cloud-carbon-footprint/cloud-carbon-coefficients)) could help massively here.

In closing, I believe that we should embrace progress over perfection. Implement, understand, and iterate. Because if we wait for the perfect model to come along, we might be waiting until it’s way too late.
