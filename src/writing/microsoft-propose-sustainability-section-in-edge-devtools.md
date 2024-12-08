---
title: Microsoft propose sustainability section in Edge DevTools
published: 2022/09/02
permalink:  /writing/microsoft-propose-sustainability-section-in-edge-devtools/
summary: >-
  I share some thoughts on the new proposal put forward by the MS Edge DevTools
  team for a new “Sustainability” tab to be included in the Edge browser’s
  DevTools.
---

Getting accurate measurements of a website or app’s carbon impact can be extremely difficult. Ismael Velasco talks through the nuance of digital carbon calculations [on his blog](https://ismaelvelasco.dev/emissions-in-1gb). Even if you just want to [measure how much energy your site or app consumes](https://greensoftware.foundation/articles/how-to-measure-the-energy-consumption-of-your-frontend-application?utm_source=pocket_mylist), you’d probably need to get yourself a watt-meter, and work out a way to run your app in isolation.

The growing number of online website carbon calculators serve as a great entry point for those interested in figuring out their site’s environmental impact. However, they are far from perfect. There are assumptions made about visitors, caching, and even different research and energy intensity figures used in calculations. David Mytton gave a well explained take on this in a recent episode of the [Green.io podcast](https://greenio.gaelduez.com/e/5nzm9wk8-ep6-david-mytton-bringing-reliable-and-transparent-information-to-green-it).

That’s not to throw any shade on website carbon calculators. They are a fantastic starting point, enabling more people to get a first insight into the carbon impacts of their website. With that in mind though, getting more detailed data into the hands of developers could really help progress the push towards more accurate digital carbon calculations. It may also help unlock the door to making digital carbon part of the development and business conversation, much in the same way performance and accessibility are now.

## Exposing more granular data

In Ismael’s article, he covers the complexity of calculating digital carbon emissions since no two devices or circumstances are the same. That’s one of the reasons why a general-purpose website/digital carbon calculator can only ever provide indicative results. But with these calculators, and the methodologies behind them, as a starting point we can start looking for better ways to get more accurate results.

### Using more specific energy intensity figures

To calculate the carbon emissions of an app or website, you’ll need to figure out the energy used for each part of the process and then multiply that by the grid intensity (CO2 per kilowatt hour). What you’ll normally see is that most digital carbon calculations use a global average grid intensity figure when returning results. Again, this is a great start and is probably the right figure to be using for calculating emissions from network traffic.

However, for location specific segments like data centers or end user devices it should be possible to use grid intensity figures for the country or area in which those segments are located. That’s something we’ve got in the works for CO2.js, as we look to make use of open data from [Ember](https://www.notion.so/Microsoft-propose-sustainability-section-in-Edge-DevTools-4ca5cdd814ee42db8b5fdb0b8192e5dc) and the [UNFCCC](https://github.com/thegreenwebfoundation/co2.js/issues/97).

{% callout "Aside" %}
There’s plenty of research around the energy consumption of data centers, networks, and devices. There’s an equal, if not greater, amount of conjecture around the accuracy and validity of some research findings and figures. We’re not going to get into that here.
{% endcallout %}

Most cloud hosting providers aren’t publishing detailed energy consumption figures for their data centers. Industry secrets, competitive advantages, stuff like that I suppose. Some do have average grid intensity values published (see [this example from Google](https://cloud.google.com/sustainability/region-carbon#data)), but we’re still going to be working with a few generalisations and assumptions when working out the emissions attributed to data centers.

### Getting better energy usage data at the device level

For the longest time we’ve also had to work on assumptions when determining how much energy our apps and websites consume on a user’s device. Safari does have some energy usage information surfaced in its DevTools, but I’m not an Apple person so can’t speak to this with any authority. For the main, though, to get detailed energy consumption data you’d have to calculate it yourself which is no mean feat.

That’s why I’m pretty excited by [this proposal](https://github.com/MicrosoftEdge/DevTools/blob/main/explainers/Sustainability/explainer.md) from the Microsoft Edge DevTools team (we finally got to the topic of this post ey!). In it, they outline a new Sustainability tab in DevTools that would surface website sustainability issues, suggestions, and metrics. [I’ve got my questions](https://github.com/MicrosoftEdge/DevTools/issues/92#issuecomment-1226711956) about the issues and suggestions. There are other comments [on the feedback page](https://github.com/MicrosoftEdge/DevTools/issues/92) questioning if publishing a CO2 figure would really be all that helpful.

What interests me the most about this proposal, however, is the possibility that detailed energy usage data could be available at the device level. The current proposal suggests an energy consumption “score”, but I’d really like to see the actual consumption figures also provided. Being able to get this data could:

- Enable developers to see the energy consumption of their apps/sites.
- Allow developers to assess the energy impacts of code changes, and block changes that increase energy usage.
- Pave the way for more detailed device level emissions estimates.

### What _might_ be

Those first two points have some tangible flow on effects as well. The less power an app or site is consuming, the less of a drain it will be on the battery of a mobile device or laptop. Energy consumption information can allow us to identify the sites or apps that might be draining our battery, and look for more effective alternatives. Once marketing teams grab a hold of this, we might even start to see energy consumption become part of an app’s messaging. Heck, Google and Apple might even put up “energy scores” as part of App Store listings.

The final point, about having more detailed device level emissions estimates, is meaningful to me as someone who does the odd website sustainability audit. If we’re able to somehow export this data to analytics and reporting tools, then we’d be able to greatly improve the accuracy of website carbon estimates. I wonder if we might even be able to see the impact of different file types (looking at you JavaScript) on energy consumption. Even without that, being able to get this information on a few different devices that I have on hand would be a great starting point.

The Edge team are at the start of what might be a long journey to get more sustainability data into DevTools. I’m sure that over time the data they can and plan to include will evolve with community feedback. You can read the [full proposal](https://github.com/MicrosoftEdge/DevTools/blob/main/explainers/Sustainability/explainer.md) on GitHub, and submit your own feedback in [this issue](https://github.com/MicrosoftEdge/DevTools/issues/92).

With Edge now running on Chromium, I hope that the work the Microsoft team do here can also find its way into the DevTools of Chrome and other Chromium-based browsers. Because, while some data and assumptions about digital’s carbon impact _may_ be imperfect, raising awareness of digital sustainability among more developers can help drive action for the better. Which is what our industry and our planet needs.
