---
title: Thinking about kWh/GB as a metric
published: 2024-01-14
lang: en
type: post
---

The use of kilowatt-hours per gigabyte of data transfer in digital carbon emissions models is something that's been the [source](https://fershad.com/writing/is-data-the-best-proxy-for-website-carbon-emissions/) [of much](https://www.debugbear.com/blog/website-carbon-emissions) [conversation](https://calendar.perfplanet.com/2023/why-web-perf-tools-should-be-reporting-website-carbon-emissions/).

A [LinkedIn comment from Romain Jacob](https://www.linkedin.com/feed/update/urn:li:activity:7148980432062078976?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7148980432062078976%2C7148990576980381697%29&replyUrn=urn%3Ali%3Acomment%3A%28activity%3A7148980432062078976%2C7150229582372143105%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287148990576980381697%2Curn%3Ali%3Aactivity%3A7148980432062078976%29&dashReplyUrn=urn%3Ali%3Afsd_comment%3A%287150229582372143105%2Curn%3Ali%3Aactivity%3A7148980432062078976%29), a researcher from ETH Zurich looking into energy of networks, highlighted that use of this metric is also controversial in academic circles. His comment also shares a handy way to think about the metric next time you see it used in an emissions calculation.

> Just quickly about the kWh/GB metric (which is the center of a heated debate in the research community atm): this is a used and useful metric BUT it must be understood as an "attributive" metric (think of it as "how efficiently am I using the network"). It has no "predictive" value (as in "If I send xGB less, I'll consume ykWh less").
>
> That's completely wrong due to the lack of proportionality I mentioned above.
>
> The problem is, that (wrong) conclusion is the one that is most intuitive :-/
