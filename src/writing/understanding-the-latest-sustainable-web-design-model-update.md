---
title: Understanding the latest Sustainable Web Design Model update
published: 2024/06/04
permalink:  /writing/understanding-the-latest-sustainable-web-design-model-update/
summary: >-
  This post covers the changes made in version 4 of the Sustainable Web Design
  Model, and how those affect the estimation results for those using this
  methodology.
canonical: "https://www.thegreenwebfoundation.org/news/understanding-the-latest-sustainable-web-design-model-update/"
---

{% callout "Original" %}
This post was originally published on the [Green Web Foundation blog on July 4, 2024](https://www.thegreenwebfoundation.org/news/understanding-the-latest-sustainable-web-design-model-update/).
{% endcallout %}

The [Sustainable Web Design Model](https://sustainablewebdesign.org/) (SWDM) is a widely adopted methodology for estimating digital emissions relating to websites. First formally released publicly in 2020, the model is a multi-organisation collaboration between [Wholegrain Digital](https://wholegraindigital.com/), [Mightybytes](https://www.mightybytes.com/), [Footsprint](https://www.footsprint.co/), [EcoPing](https://ecoping.earth/), and ourselves, [Green Web Foundation](https://www.thegreenwebfoundation.org/).

Version 4 of SWDM, the latest update, has been published for community feedback. The update includes a change to the estimation formula, introduces separation between operational and embodied emissions, and updates the underlying data that forms the foundation of the model.

In this post, we cover why and how these changes have been made by the SWDM team, how that affects the estimation results when using the updated methodology, and how we plan to implement these changes for use in our [open-source CO2.js library](https://www.thegreenwebfoundation.org/co2-js/).

Before going further we strongly recommend that you read the post on the Sustainable Web Design website which [explains the new model in detail](https://sustainablewebdesign.org/estimating-digital-emissions/).

## What's change in SWDM version 4, and why

### Overview of changes

The changes made in version 4 of SWDM include:

- Updates to data sources and research that are used to form the foundations for the methodology to reflect recent research
- Expanded methodology calculation to show operational and embodied emissions for all three system segments (data centers, networks, and user devices).
    - As a result, the “Production” system segment that was present in version 3 of the methodology is now reflected in the methodology through the embodied emissions components in the calculation.
- Addition of a Green Hosting Factor to the methodology calculation, which allows for data center operational emissions to be adjusted for the percentage of hosting that comes from renewable or zero-carbon fuel sources.

This progress in the methodology means the most noticeable change felt by users of the SWDM will be from the figures it produces. When comparable estimations are performed using version 3 and version 4 of the SWDM, the carbon emissions estimates produced by version 4 are two-thirds less than version 3.

### Lower overall emissions estimates

**Why are the estimated carbon emissions returned from the SWDM version 4 methodology on average two-thirds lower than comparable estimates performed using version 3?**

Right now, SWDM uses data transfer as the main proxy for estimating the energy used by each system segment. This approach is used in many of the research papers that underpin the SWDM, which provide figures for total energy consumption and data transfer of systems.

In the absence of other available data, SWDM uses something that _can_ be measured to determine how much of the share to allocate to a given activity. Therefore the core of the methodology’s formulas rely on dividing total energy used (terawatt hours – TWh) by total data transferred (in Zettabytes – ZB). The final value is shown as TWh/ZB.

Based on the updated sources used for SWDM version 4 in the groupings shown in the next section, the total energy consumption of the internet has reduced compared to version 3. This due to a combination of efficiency gains, better measuring capabilities, and improved access to data about energy consumption along the digital value chain. Meanwhile the total data transfer across the internet has increased more than two-fold as our collective thirst for digital products, services, and consumption continues.

This suggests that the internet is operating more efficiently.

As a result, the TWh/ZB value that’s produced from this is significantly lower in version 4 when compared to version 3.

### Updated data sources

As part of the update to SWDM, the underlying data sources for the methodology were reviewed and updated in favour of more recent and accurate research. The system segments covered by the methodology are largely the same (we’ve explained what’s happened to the Production segment in the next section). The methodology still sets the [broadest possible system boundaries](https://www.wholegraindigital.com/blog/website-energy-consumption/), in keeping with the approach taken in version 3.

The below grouping shows the difference in figures used for SWDM version 3 and 4, as well as links to the updated sources for SWDM version 4.

|  | SWDM v3 | SWDM v4 | SWDM v4 Sources |
|---|---|---|---|
| % of energy used by Data Centers | 15% | 22% | [IEA 2022](https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks#tracking), [Andrae 2020](https://pisrt.org/psr-press/journals/easl-vol-3-issue-2-2020/new-perspectives-on-internet-electricity-use-in-2030/), [Malmodin 2023](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4424264) |
| % of energy used by Networks | 14% | 24% | [IEA 2022](https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks#tracking), [Andrae 2020](https://pisrt.org/psr-press/journals/easl-vol-3-issue-2-2020/new-perspectives-on-internet-electricity-use-in-2030/), [Malmodin 2023](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4424264) |
| % of energy used by User Devices | 52% | 54% | [IEA 2022](https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks#tracking), [Andrae 2020](https://pisrt.org/psr-press/journals/easl-vol-3-issue-2-2020/new-perspectives-on-internet-electricity-use-in-2030/), [Malmodin 2023](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4424264) |
| % of energy used by Production | 19% | N/A | N/A |
| Total energy consumption for data centers | N/A | 290 TWh | [IEA 2022](https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks#tracking) |
| Total energy consumption for networks | N/A | 310 TWh | [IEA 2022](https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks#tracking) |
| Total energy consumption for user devices | N/A | 565.6 TWh | [Malmodin 2023](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4424264) |
| Total energy consumption of internet | 1988 TWh | 1165.6 TWh | See above |
| Total data transfer across the internet | 2444 EB (2.444 ZB) | 5.29 ZB | [ITU 2023](https://www.itu.int/itu-d/reports/statistics/2023/10/10/ff23-internet-traffic/) |

### Operational and embodied emissions

In SWDM version 3, embodied emissions from the hardware and device manufacturing were captured in a separate system segment called Production. This approach draws much-needed attention to the need to consider the embodied emissions from using hardware.

But the downside is it prevents users of the methodology from being able to separate embodied emissions information for an individual system segment. For example, users could not extrapolate the embodied emissions for only the data center system segment.

In SWDM version 4, the Production system segment has been deprecated. Embodied emissions are now included in the estimation calculations for each of the main system segments: data centers, networks, and user devices. By making this change, users can estimate the total emissions for a system segment, as well as easily separate that into the respective operational and embodied emissions for that segment if they wish.

### Green Hosting Factor

In SWDM version 3, green hosting is a binary input, either true or false. Version 4 of SWDM changes this, allowing for a more nuanced approach to including green hosting as a factor in the overall estimation of digital emissions.

The _Green Hosting Factor_ in the updated SWDM formula allows for data center operational emissions to be adjusted for the percentage of hosting that comes from renewable or zero-carbon fuel sources. It is represented as a value from 0 to 1.

For instance, you may know that your hosting provider operates in a region where 40% of total electricity production is from renewable sources. In this case, you would use a **green hosting factor** of 0.4 in your estimates.

You can also check if your hosting provider is a known, verified green host by using our [Green Web Check tool](https://www.thegreenwebfoundation.org/green-web-check/), or [Greencheck API](https://www.thegreenwebfoundation.org/tools/green-web-dataset/). If your website returns as hosted green in these checks, then you can use a _green hosting factor_ of 1 in your estimates.

## I've got feedback about SWDM version 4

The Sustainable Web Design Methodology (SWDM) is a collaborative effort as mentioned at the start of this post. If you’ve got feedback on this update, or SWDM in general, the team would like to hear it. Share it via the [SWD website contact form](https://sustainablewebdesign.org/contact/). We’d be grateful if you use that form and do **not** contact Green Web Foundation directly about SWDM.

When sending your feedback to those working on SWD using the form, please be sure that you:

- Understand that there’s another human being receiving your feedback. We accept there are some strong opinions in this space, but that is not an excuse for being rude.
- Are clear as to the part of the model you are providing feedback on, and why you are providing the feedback.
- Provide links to relevant research papers, presentations, or data sources. This is especially important if you disagree with parts of the model, and want to suggest changes.
- If you believe that parts of the methodology are incorrect, then please indicate the alternative approaches that you believe should be considered.

## When will SWDM version 4 be added to CO2.js?

Moving on to something that is within the Green Web Foundation realm solely, let’s get into our [open-source CO2.js library](https://www.thegreenwebfoundation.org/co2-js/). CO2.js exists to enable developers to estimate the emissions related to use of their apps, websites, and software, based on peer reviewed research that’s found in methodologies like the Sustainable Web Design Model and 1byte model. It also provides access to high-quality grid intensity data for countries and regions around the world provided by [Ember Climate](https://ember-climate.org/).

We first coded the SWDM methodology into CO2.js in 2022 to make it easier for others to adopt. Since then we’ve done our best to keep our implementation of SWDM inline with the changes made to the methodology by the working group.

In that spirit, we plan to update CO2.js to make version 4 of the Sustainable Web Design Model available for use. This is likely to happen in the coming weeks. There is an [open issue](https://github.com/thegreenwebfoundation/co2.js/issues/119) and [pull request](https://github.com/thegreenwebfoundation/co2.js/pull/208) on our Github repository that you can track and/or contribute to.

If you have any questions about CO2.js specifically, you are welcome to [drop us a line](https://www.thegreenwebfoundation.org/support-form/).

### Will SWDM version 4 be the default model in CO2.js?

Yes, but not for a while yet.

We plan for SWDM version 4 to become the default model in the future. We’ll continue the approach of giving advance notice of changes, so downstream users can respond on their schedule.

The change to default to version 4 of SWDM is scheduled to be made _not before September 2024_. We will track this via [a Github issue](https://github.com/thegreenwebfoundation/co2.js/issues/209). We will also communicate the upcoming change to developers via all our [regular release channels](https://github.com/thegreenwebfoundation/co2.js?tab=readme-ov-file#release-communication).

Details on how to _opt-in_ to using SWDM version 4 in CO2.js will be provided in the release notes for CO2.js version 0.16.

If you’re keen to learn more about how to use CO2.js to estimate digital carbon emissions in your projects, the [CO2.js section of our website](http://co2.js/) has links to quick start guides, documentation, release notes, and case studies which can help you get started. We also offer [consulting and advisory services](https://www.thegreenwebfoundation.org/services/) to provide guidance and support to your developers.
