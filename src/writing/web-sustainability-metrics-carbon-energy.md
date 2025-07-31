---
title: Carbon and energy as metrics for web sustainability
published: 2025-07-31
summary: This blog post aims to flesh out some of my own thoughts on the metrics we use for web sustainability, with a particular focus on carbon emissions and energy use.
---

The [W3C Sustainable Web Interest Group](https://github.com/w3c/sustainableweb-ig) has been doing a heap of work over the last year to update the [Web Sustainability Guidelines](https://w3c.github.io/sustainableweb-wsg/) (WSGs). I'm an Invited Expert in the Interest Group, but due to time zones haven't been able to attend any of the regular meetings in real time. Man's gotta sleep, yo! Instead I catch up with the recordings and occasionally join in on conversations asynchronously.

One thing the Interest Group has been thinking about is how to prioritise the guidelines in a sensible way. This is important, because among the first questions folks normally ask when they learn about web sustainability is _"what are the most impactful actions I can take to improve my website's sustainability today?"_ Having some form of prioritisation for the WSGs to address this would go a long way towards increasing their adoption.

To date, it seems like most of the thinking about how this prioritisation might happen has been based on carbon impact. I had some thoughts about this approach, and that has sparked a healthy discussion which is captured in [this GitHub issue](https://github.com/w3c/sustainableweb-wsg/issues/91).

This blog post aims to flesh out some of my own thoughts on the metrics we use for web sustainability, with a particular focus on carbon emissions and energy use.

## Tracking the impact of a change

Most of the tools that people first encounter in their web sustainability journey (like [Website Carbon](https://www.websitecarbon.com/) or [Ecograder](https://ecograder.com/)) give carbon estimates as the main result. But, I believe, to go further we really need to begin thinking about energy as a key metric in web sustainability.

Thinking back to the question I posed earlier - "_what are the most impactful actions I can take to improve my website's sustainability today?_" - what comes next? After taking whatever steps are recommended to them, people are most likely then going to want some way to track the impacts of those changes.

It'd be easy to say just chuck the website through Website Carbon once a week and see how things go. But that leaves out a lot of the nuance that is worth taking into account. A better approach is based around considering:

- what part of the tech stack (backend/frontend) has been changed,
- the nature of the workload or system that was changed, and
- the kind of optimisation (or change) that has been made.

## Carbon emissions and energy use as metrics

The rest of this post looks at two specific metrics - carbon emissions and energy use - to see where one or the other might be a more suitable metric for tracking the impact of a web sustainability related change. I'll get around to showing how I think about this using the three points I just mentioned.

{% callout 'Carbon tunnel vision' %}
Before continuing, I want to acknowledge that there's more to web sustainability than just carbon emissions. This post focuses on that particular metric because it is one that we have more ability to estimate/measure and report on. That said, other topics such as water, land rights, biodiversity loss, air pollution and many more should also be factors in your decision making when thinking about digital sustainability.
{% endcallout %}

### Why not just use carbon emissions?

To calculate carbon emissions, you need to know how much energy has been used for the thing you're interested in and then multiply that by _carbon intensity_ of that energy. The carbon intensity of energy varies depending on the kinds of fuel sources that are used - renewables and nuclear have a lower carbon intensity than fossil fuel sources. As a result, [carbon intensity varies around the world](https://app.electricitymaps.com/#carbonIntensity) as different energy grids are fuelled by different mixes of renewables, nuclear, and fossil fuels.

This leaves carbon emissions as a metric open to being manipulated based on the carbon intensity that is used in their calculation.

Carbon intensity data can come from a variety of sources, can be [average or marginal figures](https://www.electricitymaps.com/content/marginal-vs-average-real-time-decision-making), and can range in their granularity (hourly, monthly, annual). This presents a few issues:

- People tracking this metric themselves will need to understand and decide the carbon intensity data source to use.
- People using a tool/service to track this metric are relying on the decision made by that tool/service.
- It's not possible to compare like-for-like optimisations across websites if different carbon intensity is used.
- The lower the carbon intensity the lower the resulting emissions, which presents an incentive to select the lowest value.

Using a global average carbon intensity is one means of standardisation, but result in more generalised carbon calculations compared to using more location specific carbon intensity. That's why I feel that we really need to consider where it makes sense to go beyond carbon emissions alone as a metric.

## When to use carbon or energy as a metric

As I touched on above, the decision on whether to use carbon or energy as a metric should be based on a combination of these three points:

- what part of the tech stack (backend/frontend) has been changed,
- the nature of the workload or task that was changed, and
- the kind of optimisation (or change) that has been made.

Each of these steps is influenced by its predecessor. The part of the stack you're in will determine the nature of the workload which, in turn, determines the optimisation options available. Together they should point you in the direction of the most suitable metric to use to track the impact of a given change.

{% callout 'Long post, more later' %}
This post is already pretty long, so I'm not going to touch on specific tools or services that can be used to get and track either metric. That's content for another blog post, especially as the tooling landscape continues to evolve. [RSS](https://fershad.com/feed.xml) is a pretty cool way to know when that blog post lands.
{% endcallout %}

### Backend

#### Nature of the workload

Tasks on the backend can be categorised in three buckets to capture their nature:

- Time sensitive - need to run at/near a fixed time
- Location sensitive - need to run in a fixed location
- Neither time nor location sensitive

#### Optimisation option: Demand shifting

**Workload: Time or location sensitive**

Time and location sensitivity are two sides of the same coin. With workloads like these, the two strategies that are most commonly used to reduce their carbon emissions are [time and location shifting](https://learn.greensoftware.foundation/carbon-awareness/#demand-shifting).

- If your workload is **time sensitive** then you'd use **location shifting** - moving compute to run in a location where there is more low carbon energy available.
- If your workload is **location sensitive** then you'd look at how you can apply **time shifting** - changing when compute is run so that work happens at a time of the day when there's more low carbon energy available.

Since the goal of time/location shifting is to maximise the use of low carbon energy, it feels sensible for carbon emissions to be the key metric when these optimisations have been made.

#### Optimisation option: Code/platform efficiency

**Workload: Any**

Making efficiency improvements to a backend operation is a definite way to improve its sustainability. Efficiency improvements can take a few forms including code changes, platform changes, or infrastructure changes.

The primary goal of efficiency optimisations is to reduce resource consumption, with energy being one of those resources. So tracking energy use (and other resources if you can) as metrics would be the best way to go about assessing the impacts of any backend efficiency optimisations.

#### Optimisation option: Switching to clean providers

**Workload: Any**

I've got biases here. One of the things I do at the [Green Web Foundation](https://www.thegreenwebfoundation.org) is maintaining our [Dataset](https://www.thegreenwebfoundation.org/tools/green-web-dataset/) of verified green hosting providers. We have a [Directory](https://app.greenweb.org/directory/) for finding them and filtering by service/region too. You should check it out.

Here the goal would be to use service providers that are running entirely on carbon-free energy, or that are using as much carbon-free energy as possible and taking meaningful steps to [phase out fossil-fuels](https://www.thegreenwebfoundation.org/news/no-fossil-fuels-in-our-tech-stacks/) from their operations entirely. Carbon emissions is a suitable metric to use here.

### Frontend

#### Nature of workload

The frontend is much more restricted in the nature of the workload it handles. It is inherently time and location sensitive. When people visit a website, they expect it to be there and available for them to use. Turning a website off because the energy grid is using more fossil fuels would be a very hard feature to sell to most stakeholders. Likewise, it's impractical to ask a user to change their location to a cleaner energy grid just so they can use your website.

_On the frontend, we have to meet users where they are._

That's the idea behind the [Grid-aware Websites](https://www.thegreenwebfoundation.org/tools/grid-aware-websites/) which we've been developing at the Green Web Foundation. But this blog post isn't about that.

#### Optimisation strategy: Code/design efficiency

Since we can't time/location shift our website or users, the only lever we can really pull from a web sustainability perspective on the frontend is efficiency. That means taking steps to improve the efficiency of our website code as it runs in the browser, how our designs and interactions behave, as well as optimising any server-side rendering that may be happening.

I feel that carbon emissions is a poor metric for testing these kinds of changes. By focusing on efficiency, we're focusing on reduced resource consumption and energy use. Those should be the metrics we use to track the impact of any frontend changes.

Additionally, the carbon intensity of a grid can change hour-to-hour, day-to-day, week-to-week (you get it ...). This makes it really hard to get consistent, meaningful results. If I test my website at midday in Taiwan and then again at 9pm, I'll get different emissions results for the same site because the grid intensity here changes through the day.

For this reason, energy use should be the metric to use whenever possible for the tracking web sustainability changes made to user interfaces or interactions.

## Too many words, give me a table

There's a lot of words above this, so if you're after a TL;DR then I hope this table helps.

| Segment  | Sensitivity                                                    | Optimisation strategy                                           | Tracking metric                                                        |
| -------- | -------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Backend  | Location sensitive (fixed location or limited ability to move) | Time shifting                                                   | Carbon emissions                                                       |
| Backend  | Time sensitive (fixed time or limited ability to change)       | Location shifting                                               | Carbon emissions                                                       |
| Backend  | N/A                                                            | Time shifting, location shifting, efficiency (code or platform) | Time/location shifting: Carbon emissions<br><br>Efficiency: Energy use |
| Backend  | N/A                                                            | Change hosting provider                                         | Carbon emissions, PUE, WUE, other                                      |
| Frontend | Time & location sensitive                                      | Efficiency (code, platform, or framework)                       | Energy use                                                             |

## Conclusion

The conversation around metrics, estimation, and measurement in digital sustainability is one that is ongoing. As the WSGs get updated, and as assessment tools start to implement them, I'm sure that some of my views will change. The opinions presented in this post are strong yet loosely held.

In the context of the WSGs, the [conversation is in the open](https://github.com/w3c/sustainableweb-wsg/issues/91) on GitHub. Leave a comment there if you feel compelled to, or let me know your thoughts via the [socials or email](/contact).
