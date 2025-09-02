---
title: Thinking about network sustainability for frontend developers
published: 2025-09-02
summary: Sure data transfer does not equal network energy use. Yes, but there is still a way for frontend developers to influence network energy consumption by reducing data transfer.
---

*This post started out in a different form three months ago. Between then and now, I've written a draft, got some feedback, engaged with some folks on this topic, and sharpened my thinking. Thank you [Chris](https://www.linkedin.com/in/mrchrisadams/) and [Romain](https://www.linkedin.com/in/romain-jacob-eth/).*

One of the first suggestions that most folks get when asking how to make their website more sustainable is *"reduce the amount of data transferred"*. Hopefully it's not the only advice they'll get, but even today it is still prevalent. That is perhaps because it presents an approachable solution to something that might initially feel daunting.

Before you start thinking *ah here goes Fershad again talking about data transfer being a poor metric*, this post will (I hope) be a bit different. I want to present a "yes, but" argument for reducing data transfer especially when thinking about our impacts on the network.

Nuance. Wild, I know.

## Data transfer and network sustainability

I've written a lot about the use of data transfer as a poor proxy metric in web sustainability. See:

- [Sceptical about website carbon emission figures](https://fershad.com/notes/sceptical-about-website-emissions/)
- [Is data transfer the best proxy for website carbon emissions?](https://fershad.com/writing/is-data-the-best-proxy-for-website-carbon-emissions/)
- [Website carbon: Beyond data transfer](https://fershad.com/writing/website-carbon-beyond-data-transfer/)

As is my policy, those are strong opinions but loosely held. I think there are other things, like animation and JavaScript bloat, that should be a higher concern for a web developer who's thinking about the sustainability of their website. That said, it's normal to see advice like the kind I alluded to in the opening paragraph. That's not to say the advice is wrong. Being judicious in what a web page requires to load and be functional *can* lead to web sustainability (and performance) benefits. But we need to be honest with ourselves that those benefits are more a result of the actual design and development decisions made (e.g. load on interaction patterns), rather than the fact that less data is transferred.

This is especially true when we think about the impact our website might have on the network. If we reduce the amount of data our site transfers, then that would reduce the amount of energy being used by the network, right?

No.

Network devices are _always on_, and their energy consumption is generally independent of their traffic load (especially for fixed networks, mobile and wireless are a bit more dynamic). There’s a spike in energy consumption when the device is first turned on, and then its power usage stays relatively constant even as utilisation increases. The below graph illustrates this. It is taken from a paper titled [The Internet of tomorrow must sleep more and grow old](https://hotcarbon.org/pdf/hotcarbon22-jacob.pdf) by Romain Jacob and Laurent Vanbever.

![A graph showing network utilisation as a steady line moving up at a 45 degree angle, compared to network power draw which rises sharply at the start (at 0 on the x-axis) before immediately leveling off to stay constant at almost full power consumption.](../../public/img/blog/f475f393bc56f10723cf961ce40334a70e57ed26-1034x617.png "Power draw of networks is decoupled from data transfer.")

## Yes, but

So where does that leave us? If we want our websites to be sustainable across the entire stack (i.e. servers, networks, user devices), what can we do to improve the sustainability of the network layer?

My answer? Reduce data transfer.

While data transfer might be a poor proxy for network energy use, it is still a valuable metric to use. For fixed networks, reducing the amount of data a website transfers isn't going to have any immediate impact on the energy used by the network. It's not an "instant sustainability win" that you can claim, but rather it sends a singal that can have longer term results. Meanwhile for mobile networks, where the marginal cost per additional bit of data transferred is higher, reducing data transfer *can have some* [impact on network energy use](https://doi.org/10.1007/s12243-022-00932-9). That's important as more and more internet consumption takes place on mobile devices.

### It takes all of us

The network has to always be on, and over-provisioned, so that it has capacity to handle surges in traffic, outages, or other sudden shocks. Network operators do this provisioning based on a baseline traffic volume that they expect. Again, Romain Jacob covers this wonderfully in his Green IO talk *[The Internet is Getting Emptier; That's a Sustainability Problem](https://www.youtube.com/watch?v=Jhe_QP59QhI)*.

So for us, as web developers, to have an impact on reducing the energy being used by the network we need to lower that baseline traffic volume. That's not something an individual developer can achieve on their own. It takes all of us.

### The signals we send

The median page weight of a mobile page has [risen by 1.8 megabytes in the past 10 years](https://almanac.httparchive.org/en/2024/page-weight#request-bytes). It's around 1 megabyte for desktop over the same period of time.

![A chart showing two lines going up and to the right over time. One shows the median desktop page size, the other shows the median mobile page size. Both lines start well under 1 MB in January 2012, but rise gradually to well over 2 MB in Jan 2024.](../../public/img/blog/median_web_page_size_2024.png 'Median page weight over time. From HTTP Archive')

At the same time, our lives as a whole have become incredibly data-hungry. Streaming services, mobile apps, social media, the rise of video, AI chatbots in everything, the list goes on. We send and receive a lot of data every day, which signals to network operators that more infrastructure should be provisioned to allow all that data to be transferred.

My blog by itself wouldn't even register as a blip on the radar in terms of network traffic. A network of websites, *might* show up as something. The entire web ecosystem though, yeah network operators would probably notice that. That is especially true for sites serving video content, which is taking up an increasing share of internet traffic. More on video in a tick.

As a collective, we need to disincentivise network operators from deploying extra capacity. Because as we saw from the chart earlier, turning on a new network device uses a lot more energy than letting an existing one sit idle on the network. That's before we even consider the embodied environmental costs that come with the production of new devices.

So how do we, as web developers, send this signal to the network operators? In two ways:

1. We reduce the weight of our web pages whenever possible.
2. We set sensible data usage defaults in the sites, apps, and services we build.

#### Reducing page weight

There's plenty of documentation and guidance on this for web developers, yet we still see page weights going in the opposite direction. I feel a large part of this is down to two factors - frameworks and video. My recent [look at the COP30 website](/writing/cop30-website-review/) turned up the use of a framework that bloats the website for no real valuable reason, coupled with limited image and font optimisations. Meanwhile for developers working with video, there's probably some difficult conversations to be had with clients and designers. I'm not saying remove video completely, but rather explore what techniques can be adopted to reduce the amount of video content that is downloaded automatically without a user action triggering it. Those aren't easy conversations to have, as Nic Chan shared in her recent [blog post about Grid-aware Websites](https://nicchan.me/blog/exploring-grid-aware-websites/), but they're important ones to have.

> I once had a client that sold sustainably made household items, and they wanted their website to reflect their commitment to sustainability. I suggested the usual high-impact things like reducing the size of media and using a static site generator. They didn’t mind the statically-generated approach as it helped them save on hosting costs, but they didn’t want to give up their use of background video, a decision that forced every user to download an additional 6MB of video.
>
> <cite>Nic Chan</cite>

#### Sensible defaults

This one probably applies more to larger websites or platforms, and again those serving video content probably can have the largest impact here. Take the example of YouTube, a video platform that is seeing an ever increasing number of podcasts publishing there as well. Podcasts are primarily audio a medium, so a sensible default for YouTube to set for that kind of content would be to provide an "audio only" option, with the ability for viewers to switch to a video feed if there's something they *really* want to see (*thanks Chris for this idea btw*). Likewise other steps, such as having "play the next video automatically" set to *off* by default, or setting "autoplay" to *off* by default in social media apps/platforms can all have a significant impact at scale.

To reiterate, neither of these things (reduced page weights and sensible defaults) will reduce tangibly the network "carbon footprint" of an individual website (okay, perhaps YouTube or Netflix are a different case). What they can do is signal to network operators that we don't need to continually grow capacity, that we can make do with what we have. That signal only gets through, though, if it comes from the collective action of a large part of the web development community.

## Final thoughts

At the level of an individual website, data transfer has no meaningful relationship to the energy consumption of network infrastructure that is serves it. Practically that is true, the impact of an individual website is close enough to zero to be zero. But in another way, the amount of data we transfer *can* have an influence on network energy consumption. Not in the immediate term, but over a longer period of time, the decisions we make today as web developers can have a significant impact on the energy profile of the networks that transport our content.

So sure data transfer does not equal network energy use. Yes, but ...
