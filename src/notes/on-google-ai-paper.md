---
title: On Google's AI impact paper
published: 2025-08-26
---

*As with everything on this website, opinions expressed are my own. Also, this might ramble. I'm sorry.*

A recent paper published by a number of Google staff shared some data on the energy and water usage from using their Gemini AI models, as well as carbon emissions information. The paper is here if you want to read it [https://arxiv.org/abs/2508.15734](https://arxiv.org/abs/2508.15734).

Cue polarised debate on LinkedIn and other parts of the web that either:
- This report shows that claims of the negative environmental impacts of AI are overblown. Or,
- This report lacks data and transparency to make the data actually useful.

David Mytton is in the first camp *(environmental impacts overblown)*, and has [written a summary](https://www.devsustainability.com/p/the-environmental-impact-of-google) on Substack. Ketan Joshi is in the second camp *(lacks transparency)* has [written a summary](https://ketanjoshi.co/2025/08/23/big-techs-selective-disclosure-masks-ais-real-climate-impact/?__readwiseLocation=) on his blog as well.

Here's my summary:

<p class="enlarge">
Google employees release paper that paints their employer's AI platform in a positive light.
</p>

Like it's great that someone at Google thought about putting some resources towards this. But come on guys, to make this meaningful open up the data so that it's available for ***independent*** researchers to explore.

Both Ketan and David have gone into the shortcomings of the report's use of median values, and the fact that only data for single text queries was analysed. To be fair though, single text queries might be a suitable lens to use for an analysis of Google's AI system - because that's the kind of query that is triggering the unsolicited AI Summaries that are being forced upon users with almost every search result now. Maybe there just wasn't enough data for the other Gemini applications like video or code generation because people just aren't using those as much. Probably since those features aren't being being forced upon them. Yet.

## Is it bad for the environment, or not?

Ask this question on LinkedIn. Go on, I dare you.

The way I think about it is - *at the level of an individual text query, sure it might seem close to insignificant. But the scale of hundreds of millions of queries per day, that impact probably becomes meaningful.*

(Aside: I think the same way about website sustainability.)

That's just thinking about a single text query. Unfortunately this paper doesn't really give us any real detail about *scale* (despite the title). Nor does it allow us to think about multiple AI use cases.

One environmental argument I definitely don't buy is that we'll efficiency our way out of this as David suggests at the end of his blog post:

> There is a huge buildout of AI infrastructure under way and it’s [likely that total energy consumption related to AI is going to grow](https://www.devsustainability.com/p/data-center-energy-and-ai-in-2025). However, I expect efficiency gains, batching, and load‑placement should temper growth versus extrapolations.

These facilities, which are being built today, have an immediate and real impact on the physical world around them. That's felt in the air, the water, the land, and also the energy grid. No amount of efficiency improvement can restore that. Buildout, sure. But buildout [within bounds](https://www.thegreenwebfoundation.org/news/within-bounds-joint-statement-on-limiting-ais-environmental-impact/).
