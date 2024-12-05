---
title: Why I run carbon aware checks on the edge
date: 2023-11-30
lang: en
type: post
thumbnail: /assets/img/opengraph-why-i-run-carbon-aware-checks-on-the-edge.png
layout: layouts/post.liquid
tags:
  - note
---

On my personal website, I play around with the idea of implementing a [carbon aware website idea](https://fershad.com/carbon-aware-site/). The tl;dr idea is that when pages on my site are served, the energy intensity of the website visitor's local grid is checked. If the energy intensity is dirtier than normal (more fossil fuels powering the grid) then certain parts of my site's design and functionality adjust to reduce compute on the device.

It's mostly me playing around with an idea, proving something conceptually, and toying with Cloudflare Workers which is something I like to do.

Every now and then, though, someone lands on my website and gets nerd sniped by it. Now as is the way with the internet, you hear less from the folks who agree with what you do and more from those who don't. So most of the feedback about the carbon aware website implementation on my site sound something like this:

> Surely running all this stuff at the edge for tens of thousands of requests produces more CO2 than just serving the website normally?

That's a fair point. But here’s why _I **think**_ this approach is more sustainable than something that might be done on the client-side:

- We have no control over user devices. By removing the JS needed to check and deliver the low carbon site from the user’s device we’re benefiting _all users_. Those on better devices get an even faster experience, and those on low-spec devices don’t get bogged down as the page tries to load.
- Edge workers are hyper-optimised for this kind of task. Running our compute there would take a fraction of the time (and therefore energy) compared to running it on the client.
- We can improve this further by choosing edge providers who are taking steps to try and ensure as much of their network is powered by green energy or are mitigating the emissions of their operations. We’ve got much more control over this decision than we do over what energy is powering the devices our users have.

It’s worth noting that _this is just my (slightly informed) opinion_. Especially the second point isn’t based on any hard data I’ve seen. If you do have data or research around this, [I’d love to hear about it](https://fershad.com/contact/)!
