---
title: Why are you estimating digital carbon emissions?
published: 2024/02/20
permalink:  /writing/why-are-you-estimating-digital-carbon-emissions/
summary: >-
  In this post, I want to look at the two different carbon accounting models
  used for estimation, and in what scenario you might use one over the other.
---

I've had a fair few conversations about calculating digital carbon emissions recently. It's great to see so much interest in this space, it can only be good for the development of the tools and methodologies we have access to. One thing, though, which I've noticed has been missing from a lot of those conversations is a discussion around _why_ folks might want to estimate digital carbon emissions.

In this post, I want to look at the two different carbon accounting models used for estimation, and in what scenario you might use one over the other. In this way, I hope to try to provide a framework people can refer to when they are first approaching the topic, or even if they're deep in the weeds.

## Semantics

I've used the work _estimate_ very carefully here. We're not going to cover _measuring_ digital carbon emissions, because that's a very different thing.

Measuring is a precise practice. It requires setting up detailed instrumentation and tooling. The results of _measuring_ digital carbon emission will give you the actual emissions produced from a given digital service or activity. When measuring digital carbon emissions, you'd look to use tools that allow you to record the _actual_ power or energy used by a process - such as the [Firefox Profiler](https://fershad.com/writing/co2e-estimates-in-firefox-profiler/).

Estimating is an imprecise practice. It relies on models, methodologies, calculations, some assumptions, and some generalisations. Depending on the type of methodology you use, the results of _estimating_ digital carbon emissions will give you results that might under-represent or over-represent the emissions produced from a given digital service or activity.

## Why does _why_ matter?

Understanding why you are measuring digital carbon emissions is very important because it will determine the kind of estimation model you'll end up using. And, the kind of model you use will end up determining where you sit on the over- or underestimating emissions spectrum.

There's two main reasons why you might want to estimate digital carbon emissions:

1. You need to capture and include these emissions for compliance and reporting purposes
2. You are looking where you can make optimisation and improvements to reduce the emissions of your digital product or service

## Estimating for reporting

If you're estimating for reporting, then you're going to be _looking backwards_ over a period of time to estimate emissions.

In most cases, you'll be reporting emissions on an annual basis. You'll probably also be required to use some kind of reporting framework, like the Greenhouse Gas Protocol (GHG Protocol). To the best of my knowledge, all of these reporting frameworks are based on _attributional accounting methods_ to estimate emissions.

### What is an attributional model?

Attributional accounting models are backwards looking. They look at the total emissions of a system, and then try to attribute a part of those emissions to the usage of a system. The simplest example is the emissions per passenger on a plane, is the total emissions of the plane divided by the average number of passengers.

They are useful for understanding the impact of long-lived interventions on the structural evolution of the electricity system. This makes them suitable for reporting, carbon accounting, and raising awareness of the scale of general impacts.

The nature of attributional models lead to a likeliness that emissions are overestimated. Take our plan example where each passenger is counted as one passenger. There's limited nuance there - no accounting for weight, or number of carry-on bags, or what flight class they're seated in.

### Examples of attributional models

In the web development space, the [Sustainable Web Design](https://sustainablewebdesign.org/calculating-digital-emissions/) (SWD) model is perhaps the most well known attributional model. Prior to SWD, the [OneByte](https://theshiftproject.org/en/lean-ict-2/) model was another example.

Both models estimate the emissions of a website across three segments - hosting, networks, and user devices. Both allocate a percentage of the total annual energy used by the internet to each segment. Data transfer (in bytes, megabytes or gigabytes) is then used as the "usage" metric for estimating the emissions resulting from loading a given webpage or online content.

## Estimating for optimisation

When you're estimating for optimisation, you're likely _looking at the present and future_ to estimate emissions. Put another way, you want to see what _consequence_ of a change to part of the system might have on overall emissions. For this, you'll use _consequential accounting methods_.

### What is a consequential model?

A consequential accounting model is forward looking. It looks at the role individual parts of a system play in the overall emissions produced by that system. To take the plane example again, looking at the incremental emissions of a single passenger boarding a plane would take in many more inputs - such as flying class, number of carry-on bags, the weight of these bags, the weight of the passenger, the weather conditions during the flight and so on. These inputs would all have either emissions factors set for them, or would have a specific calculation to estimate their resulting emissions.

Consequential models are much more detailed than attributional models. As you can see from the example above, they require much more information to be fed into the model in order to produce a meaningful result. This makes them suitable for investigating more detailed behaviours within systems, and facilitating nuanced discussion, so that the system can be optimised.

This level of detail might sound like a good thing. But consequential models are still models nonetheless, and to reuse a line from previous posts [_all models are wrong, but some are useful_](https://en.wikipedia.org/wiki/All_models_are_wrong). Due to their detailed nature, consequential models are far less approachable when compared to attributional models. The information gathering required, and the level of detail that goes into them can be daunting to those looking to get started with estimating emissions. This might lead to consequential models including many assumptions, generalisations, or default values to fallback on. It also leads to a greater risk that someone using the model might enter incorrect or inappropriate data.

Consequential models are more likely to produce results that underestimate the emissions of a given activity. Due to the number of inputs involved also makes them far less suitable for measuring the long-term impacts of system changes.

### What are some examples of consequential models?

Consequential models capture the short-term, marginal impact on energy or emissions caused by a change in a particular activity. A good example of this is the Power Model that Carbon Trust introduces in their [Carbon impact of video streaming analysis](https://ctprodstorageaccountp.blob.core.windows.net/prod-drupal-files/documents/resource/public/Carbon-impact-of-video-streaming.pdf) (2021 - see section 5, pages 54 - 67). This model exposes how a change in view patterns (device used, duration, quality of stream etc) impacts the energy required to deliver that content to the viewer.

## Wrapping up

I hope that this post has helped you better understand the differences in the accounting models used to estimate carbon emissions, and why you might use them.

As more organisations start to explore ways to measure, report, and reduce their carbon emissions, understand why you're doing so is an important first step. Not only will it help to clarify your own thinking, but it will help guide you towards the kind of model you should look to use for your purpose.
